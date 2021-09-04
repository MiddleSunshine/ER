<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.Base.php";

class Words extends Base{
    public function List(){
        $page=$this->get['page'] ?? 0;
        $pageSize=$this->get['page_size'] ?? 0;
        $sql="select * from words";
        if ($page && $pageSize){
            $sql=sprintf($sql." limit %d,%d",($page-1)*$pageSize,$pageSize);
        }
        $sql.=" order by ID desc;";
        $words=$this->pdo->getRows($sql);
        self::addKey($words,'ID','key');
        return self::returnActionResult($words);
    }
    public function Detail(){
        $id=$this->get['id'] ?? 0;
        if (!$id){
            return self::returnActionResult([],false,"参数错误，没有ID");
        }
        $sql="select * from words where ID={$id};";
        return self::returnActionResult($this->pdo->getFirstRow($sql));
    }

    public function Save(){
        $id=$this->get['id'] ?? 0;
        $fieldMap=[
            'word'=>'',
            'phonetic_transcription'=>'',
            'related_word_1'=>'',
            'related_word_2'=>'',
            'related_word_3'=>'',
            'note'=>'',
            'explain'=>'',
            'AddTime'=>date("Y-m-d H:i:s"),
            'LastUpdateTime'=>date("Y-m-d H:i:s"),
            'source'=>''
        ];
        $sql=[];
        $this->post=json_decode($this->post,1);
        foreach ($this->post as $filed=>$value){
            switch ($filed){
                case "ID":
                    break;
                case 'explain':
                    $filed=sprintf('`%s`',$filed);
                case "LastUpdateTime":
                    $filed=='LastUpdateTime' && $value=date("Y-m-d H:i:s");
                default:
                    $sql[$filed]=addslashes($value ?? $fieldMap[$filed]);
            }
        }
        if($id){
            $sqlTemplate=[];
            foreach ($sql as $filed=>$value){
                $sqlTemplate[]=sprintf("%s='%s'",$filed,$value);
            }
            $sql=implode(",",$sqlTemplate);
            // udpate
            $sql="update words set {$sql} where ID={$id};";
        }else{
            $sqlTemplate='';
            foreach ($sql as $filed=>$value){
                $sqlTemplate.=sprintf("'%s',",$value);
            }
            $sqlTemplate=substr($sqlTemplate,0,-1);
            // FIXME 这里考虑这word已经存在的情况
            // insert
            $sql=sprintf("insert into words(%s) value(%s)",implode(",",array_keys($sql)),$sqlTemplate);
        }
        $this->pdo->query($sql);
        $sql=sprintf("select ID from words where word='%s';",$this->post['word'] ?? '');
        $word=$this->pdo->getFirstRow($sql);
        return self::returnActionResult([
            'sql'=>$sql,
            'ID'=>$word['ID'] ?? 0
        ]);
    }
}