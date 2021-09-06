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
        return $this->handleSql($sql,$id,'sentence');
    }

    public function saveWords(){
        $this->post=json_decode($this->post,1);
        $sentenceId=$this->post['sentence_id'] ?? 0;
        if (!$sentenceId){
            return self::returnActionResult($this->post,false,"参数错误");
        }
        if(empty($this->post['word_list'])){
            return self::returnActionResult($this->post,false,"words列表不能为空");
        }
        $wordInstance=new Words();
        $wordIds=[];
        foreach ($this->post['word_list'] as $wordItem){
            $sql=sprintf("select ID from words where word='%s';",$wordItem);
            $word=$this->pdo->getFirstRow($sql);
            if (!empty($word)){
                $wordId=$wordInstance->addNewWord($wordItem);
                if (!$wordId){
                    return self::returnActionResult($this->post,false,"代码错误");
                }
            }else{
                $wordId=$word['ID'];
            }
            $wordIds[]=$wordId;
        }
        $sentenceWord=new SentenceWord();
        return $sentenceWord->updateSentenceWord($sentenceId,$wordIds);
    }
}