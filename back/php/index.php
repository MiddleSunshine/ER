<?php

require_once __DIR__.DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."config.php";

$sql="select * from words;";
$mysqlPdo=new MysqlPdo();
$rows=$mysqlPdo->getRows($sql);

print_r($rows);