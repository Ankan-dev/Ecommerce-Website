<?php

error_reporting(0);

//header("Access-Control-Allow-Origin:*");

require "./includes/db.php";

$requestMethod=$_SERVER["REQUEST_METHOD"];

if($requestMethod==="GET"){
     $query="SELECT * FROM product WHERE status=1 ORDER BY added_on DESC LIMIT 4";
     $result = mysqli_query($conn,$query);
     if($result){
        $arr=array();
     while($res=mysqli_fetch_assoc($result)){
        array_push($arr,$res);
     }
     echo json_encode(["Recent"=>$arr]);
     }
     
}

?>