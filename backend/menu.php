<?php

//header('Access-Control-Allow-Origin:*');

error_reporting(0);

    require './includes/db.php';

    $requestMethod=$_SERVER["REQUEST_METHOD"];

    if($requestMethod==="GET"){
        $query="SELECT name FROM category WHERE status=1";
        $result = mysqli_query($conn,$query);
        if($result){
            $arr=array();
            while($name=mysqli_fetch_assoc($result)['name']){
                array_push($arr,$name);
            }
            echo json_encode(['categories'=>$arr]);
        }
    }
?>