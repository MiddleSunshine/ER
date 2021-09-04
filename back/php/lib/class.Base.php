<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.MySqlPdo.php";

class Base{
    protected $get;
    protected $post;
    protected $pdo;
    public function __construct($get,$post)
    {
        $this->get=$get;
        $this->post=$post;
        $this->pdo=new MysqlPdo();
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