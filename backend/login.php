<?php

//header('Access-Control-Allow-Origin: *');
error_reporting(0);
require './includes/db.php';

$requestMethod=$_SERVER["REQUEST_METHOD"];

if($requestMethod === 'GET' && isset($_GET['query']) && $_GET['query'] === 'check_status'){
    if(isset($_SESSION['logged_user'])){
        echo json_encode(["user"=>$_SESSION['logged_user']['username']]);
    }else{
        echo json_encode(["user"=>"guest"]);
    }
}

if($requestMethod==='GET' && !isset($_GET['query'])){
    if(isset($_SESSION['logged_user'])){
        session_unset();
        session_destroy();
        echo json_encode(['logout'=>true]);
    }else{
        echo json_encode(['logout'=>false]);
    }
    exit();
}

if($requestMethod==='POST'){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $query="SELECT * FROM user WHERE username='$username' AND password ='$password'";
    $result = mysqli_query($conn,$query);
    if($result){
        $userArray=mysqli_fetch_assoc($result);
        $_SESSION['logged_user']['username']=$userArray['username'];
        $_SESSION['logged_user']['password']=$userArray['id'];
        echo json_encode(["user"=>$_SESSION['logged_user']['username']]);
    }
}

?>