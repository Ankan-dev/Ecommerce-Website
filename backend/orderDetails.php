<?php

require './includes/db.php';

$requestMethod=$_SERVER["REQUEST_METHOD"];

if($requestMethod==="GET" && isset($_GET['username'])){
    $username=mysqli_real_escape_string($conn,$_GET['username']);

    $query="SELECT * FROM orders WHERE username='$username'";
    $result=mysqli_query($conn,$query);
    if($result){
        $arr=array();
        while($resArray=mysqli_fetch_assoc($result)){
            array_push($arr,$resArray);
        }
        echo json_encode(["orders"=>$arr]);
    }
}

?>