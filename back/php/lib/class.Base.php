<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.MySqlPdo.php";

class Base{
    protected $table='';
    protected $get;
    protected $post;
    protected $pdo;
    public function __construct($get,$post)
    {
        $this->get=$get;
        $this->post=$post;
        $this->pdo=new MysqlPdo();
    }

    public function List(){
        $page=$this->get['page'] ?? 0;
        $pageSize=$this->get['page_size'] ?? 0;
        $sql="select * from {$this->table}";
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
        $sql="select * from {$this->table} where ID={$id};";
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
}