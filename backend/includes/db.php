<?php
   
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

   session_start(["cookie_samesite"=>"none", "cookie_secure"=>true]);
   
   $host="localhost";
    $username="root";
    $password="";
    $dbname="eshop";

    $conn=mysqli_connect($host,$username,$password,$dbname);

    if(!$conn){
        die("connection failed".mysqli_connect_error());
    }
?>