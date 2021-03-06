<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.MySqlPdo.php";

class Base{
    public static $table='';
    protected $get;
    protected $post;
    protected $pdo;
    public function __construct($get=[],$post=[])
    {
        $this->get=$get;
        $this->post=$post;
        $this->pdo=new MysqlPdo();
    }

    public function List(){
        $page=$this->get['page'] ?? 0;
        $pageSize=$this->get['page_size'] ?? 0;
        $sql="select * from ".static::$table;
        if ($page && $pageSize){
            $sql=sprintf($sql." limit %d,%d",($page-1)*$pageSize,$pageSize);
        }
        $sql.=" order by ID desc;";
        $data=$this->pdo->getRows($sql);
        self::addKey($data,'ID','key');
        return self::returnActionResult($data);
    }

    public function Detail(){
        $id=$this->get['id'] ?? 0;
        if (!$id){
            return self::returnActionResult([],false,"参数错误，没有ID");
        }
        $sql=sprintf("select * from %s where ID={$id};",static::$table);
        return self::returnActionResult($this->pdo->getFirstRow($sql));
    }

    public static function returnActionResult($returnData=[],$isSuccess=true,$message=''){
        return [
            'Status'=>$isSuccess?1:0,
            'Message'=>$message,
            'Data'=>$returnData
        ];
    }
    public static function addKey(&$data,$keyName,$newKeyName){
        foreach ($data as &$value){
            $value[$newKeyName]=$value[$keyName];
        }
    }
    public function handleSql($sql,$id,$keyName){
        if($id){
            $sqlTemplate=[];
            foreach ($sql as $filed=>$value){
                $sqlTemplate[]=sprintf("%s='%s'",$filed,$value);
            }
            $sql=implode(",",$sqlTemplate);
            // udpate
            $sql=sprintf("update %s set {$sql} where ID={$id};",static::$table);
        }else{
            $sqlTemplate='';
            foreach ($sql as $filed=>$value){
                $sqlTemplate.=sprintf("'%s',",$value);
            }
            $sqlTemplate=substr($sqlTemplate,0,-1);
            // insert 之前已有的值，然后就会变成 update
            $sqlSearch=sprintf("select {$keyName},ID from %s where {$keyName}='%s'",static::$table,$this->post[$keyName]);
            $data=$this->pdo->getFirstRow($sqlSearch);
            if (!empty($data)){
                return $this->handleSql($sql,$data['ID'],$keyName);
            }
            // insert
            $sql=sprintf("insert into %s(%s) value(%s)",static::$table,implode(",",array_keys($sql)),$sqlTemplate);
        }
        $this->pdo->query($sql);
        $sql=sprintf("select ID from %s where {$keyName}='%s';",static::$table,$this->post[$keyName] ?? '');
        $word=$this->pdo->getFirstRow($sql);
        return self::returnActionResult([
            'sql'=>$sql,
            'ID'=>$word['ID'] ?? 0
        ]);
    }
}