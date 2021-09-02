<?php
if (!defined(__FILE__)) {
    define(__FILE__, 1);
    error_reporting(E_ALL);
    set_time_limit(0);

    umask(0022); //default permission is 644	

    define("DEBUG_MODE", true);

    $server_name = php_uname("n");
    list($short_server_name) = explode(".", $server_name);
    define("SERVER_NAME", $server_name);
    define("SHORT_SERVER_NAME", $short_server_name);

    define("INCLUDE_ROOT", dirname(__DIR__) . "/");
    define("TIME_ZONE", "America/Los_Angeles");
    date_default_timezone_set("America/Los_Angeles");

    define("MYSQL_SET_NAMES", "utf8");

    define("ISMARSTER", 0);
    define("LOG_DIR", dirname(dirname(dirname(__FILE__))) . "/logs/");

    if (ISMARSTER) {
        define("PROD_DB_HOST", "127.0.0.1");
        define("PROD_DB_USER", "root");
        define("PROD_DB_PASS", "Meikai@12345");
        define("PROD_DB_NAME", "affiliate_data_base");
        define("PROD_DB_SOCKET", "/var/lib/mysql/mysql.sock");

        define("PENDINGLINKS_DB_HOST", "127.0.0.1");        //10.28.110.178 bdg_01
        define("PENDINGLINKS_DB_USER", "root");
        define("PENDINGLINKS_DB_PASS", "Meikai@12345");
        define("PENDINGLINKS_DB_NAME", "pendinglinks");
        define("PENDINGLINKS_DB_SOCKET", "/var/lib/mysql/mysql.sock");

        define("BRO1_DB_HOST", "127.0.0.1");
        define("BRO1_DB_USER", "root");
        define("BRO1_DB_PASS", "Meikai@12345");
        define("BRO1_DB_NAME", "bdg_go_base");
        define("BRO1_DB_SOCKET", "/var/lib/mysql/mysql.sock");
    } else {
        define("PROD_DB_HOST", "127.0.0.1:23306"); //br03
        define("PROD_DB_USER", "root");
        define("PROD_DB_PASS", "1234qwer");
        define("PROD_DB_NAME", "affiliate_data_base");
        define("PROD_DB_SOCKET", "/var/lib/mysql/mysql.sock");

        define("PENDINGLINKS_DB_HOST", "127.0.0.1:23306");        //10.28.110.178 bdg_01
        define("PENDINGLINKS_DB_USER", "root");
        define("PENDINGLINKS_DB_PASS", "1234qwer");
        define("PENDINGLINKS_DB_NAME", "pendinglinks");
        define("PENDINGLINKS_DB_SOCKET", "/var/lib/mysql/mysql.sock");

        define("BRO1_DB_HOST", "127.0.0.1:23306");
        define("BRO1_DB_USER", "root");
        define("BRO1_DB_PASS", "1234qwer");
        define("BRO1_DB_NAME", "bdg_go_base");
        define("BRO1_DB_SOCKET", "/var/lib/mysql/mysql.sock");
    }

    define("MESSAGE_EMAIL", "info@couponsnapshot.com");

    define("REDIS_PORT_API_GET", 6379);
    define("REDIS_PORT_API_WRITE", 6380);

    define("REDIS_PORT", 6379);
    define("REDIS_HOST", "127.0.0.1"); //50.22.149.34
    define("EX_CATEGORY", '|||');

    function __autoload2($class)
    {
        $class_file = INCLUDE_ROOT . "lib/class.{$class}.php";
        //        echo $class_file . PHP_EOL;
        if (file_exists($class_file)) include_once($class_file);
    }

    spl_autoload_register("__autoload2");

    function mydie($str = "")
    {
        if ($str) echo $str;
        exit(1);
    }
}
