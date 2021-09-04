<?php
require_once __DIR__.DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."config.php";

$action=ucwords($_GET['action'] ?? '');
$method=ucwords($_GET['method'] ?? '');

try {
    $instance=new $action($_GET,$_POST);
    echo json_encode($instance->$method());
}catch (\Exception $e){
    echo json_encode(Base::returnActionResult(
        [
            'Exception'=>$e->getMessage(),
            'File'=>$e->getFile(),
            'Line'=>$e->getLine()
        ],
        false
    ));
}
catch (\Throwable $e){
    echo json_encode(Base::returnActionResult(
        [
            'Throwable'=>$e->getMessage(),
            'File'=>$e->getFile(),
            'Line'=>$e->getLine()
        ],
        false
    ));
}

