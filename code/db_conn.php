<?php
$host = 'localhost';      
$db_user = 'root';       
$db_pass = '';            
$db_name = 'team013';     
$conn = mysqli_connect($host, $db_user, $db_pass, $db_name);

if (!$conn) {die("DB 연결 실패: " . mysqli_connect_error());}

mysqli_set_charset($conn, "utf8");

?>
