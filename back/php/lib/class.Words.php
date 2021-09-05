<?php
require_once __DIR__.DIRECTORY_SEPARATOR."class.Base.php";

class Words extends Base{
    protected $table='words';

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
        empty($sql['AddTime']) && $sql['AddTime']=addslashes(date("Y-m-d H:i:s"));
        empty($sql['LastUpdateTime']) && $sql['LastUpdateTime']=addslashes(date("Y-m-d H:i:s"));
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