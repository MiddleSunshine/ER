<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.Base.php";

class Sentence extends Base{
    protected $table='sentences';

    public function Save(){
        $id=$this->get['id'] ?? 0;
        $fieldMap=[
            'sentence'=>'',
            'note'=>'',
            'source'=>'',
            'AddTime'=>date("Y-m-d H:i:s"),
            'LastUpdateTime'=>date("Y-m-d H:i:s")
        ];
        $sql=[];
        $this->post=json_decode($this->post,1);
        foreach ($this->post as $fileld=>$value){
            switch ($fileld){
                case 'ID':
                    break;
                case 'LastUpdateTime':
                    $value=date("Y-m-d H:i:s");
                default:
                    $sql[$fileld]=$value;
            }
        }
        empty($sql['AddTime']) && $sql['AddTime']=addslashes(date("Y-m-d H:i:s"));
        empty($sql['LastUpdateTime']) && $sql['LastUpdateTime']=addslashes(date("Y-m-d H:i:s"));
        return $this->handleSql($sql,$id);
    }
}