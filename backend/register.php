<?php

require './includes/db.php';

//error_reporting(0);

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "POST") {
    $firstname = $_POST['firstName'];
    $lastname = $_POST['lastName'];
    $username = $_POST['userName'];
    $password = $_POST['password'];

    if (checkUsername($username)) {
        $query = " INSERT INTO user (firstname,lastname,username,password) VALUES ('$firstname', '$lastname', '$username','$password')";

        $result = mysqli_query($conn, $query);
        if ($result) {
            echo json_encode(["status" => true]);
        }
    } else {
        echo json_encode(["status" => false]);
    }
}

function checkUsername($username)
{

    global $conn;

    $query = "SELECT username FROM user WHERE username = '$username'";
    $res = mysqli_query($conn, $query);
    if (mysqli_num_rows($res)==1) {
        return false;
    }
    return true;
}
