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
        $sql.=";";
        return self::returnActionResult($this->pdo->getRows($sql));
    }
}