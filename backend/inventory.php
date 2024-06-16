<?php

//header('Access-Control-Allow-Origin: *');
error_reporting(0);
require './includes/db.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET" && isset($_GET['id'])) {
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    $query = "SELECT stock FROM inventory WHERE product_id='$id' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($result) {
        //$arr = array();
        $rowArray = mysqli_fetch_assoc($result);
        //array_push($arr, $rowArray);
        echo json_encode($rowArray);
    }
}

?>
