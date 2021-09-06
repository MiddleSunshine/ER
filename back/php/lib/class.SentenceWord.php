<?php

class SentenceWord extends Base{
    public $table="sentence_wor";
    public function updateSentenceWord($sentenceId,$wordIds){
        $sql=sprintf("select Word_ID,ID from {$this->table} where Sentence_ID=%d",$sentenceId);
        $databaseWordIds=$this->pdo->getRows($sql,'Word_ID');
        $insertWordIds=[];
        foreach ($wordIds as $wordId){
            if (isset($databaseWordIds[$wordId])){
                unset($databaseWordIds[$wordId]);
                continue;
            }
            $insertWordIds[]=$wordId;
        }
        $deleteWordIds=array_keys($databaseWordIds);
        if(!empty($deleteWordIds)){
            $sql=sprintf("delete from {$this->table} where Sentence_ID=%d and Word_ID in (%s)",$sentenceId,implode(",",$deleteWordIds));
            $this->pdo->query($sql);
        }
        if (!empty($insertWordIds)){
            foreach ($insertWordIds as $insertWordId){
                $sql=sprintf("insert into sentence_word(Word_ID,Sentence_ID) value(%d,%d)",$insertWordId,$sentenceId);
                $this->pdo->query($sql);
            }
        }
        return self::returnActionResult([
            'delete'=>$deleteWordIds,
            'insert'=>$insertWordIds
        ]);
    }
}