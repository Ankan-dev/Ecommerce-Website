<?php

//header('Access-Control-Allow-Origin: *');
error_reporting(0);
require './includes/db.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET" && isset($_GET['category'])) {
    $category = mysqli_real_escape_string($conn, $_GET['category']);
    $query = "SELECT * FROM product WHERE status=1 AND category_id=(SELECT id FROM category WHERE name='$category')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $arr = array();
        while ($rowArray = mysqli_fetch_assoc($result)) {
            array_push($arr, $rowArray);
        }
        echo json_encode(['product' => $arr]);
    }
}

?>
