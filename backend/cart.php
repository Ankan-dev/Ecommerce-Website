<?php


header("Access-Control-Allow-Methods:GET,POST,DELETE,PUT");

require './includes/db.php';

//error_reporting(0);

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "POST") {
    
    $input = json_decode(file_get_contents("php://input"),true);

    $username=mysqli_real_escape_string($conn,$input['username']);
    $product_id=mysqli_real_escape_string($conn,$input['id']);
    $name=mysqli_real_escape_string($conn,$input['name']);
    $description=mysqli_real_escape_string($conn,$input['description']);
    $image=mysqli_real_escape_string($conn,$input['image']);
    $price=$input['price'];

    if($presentElm=isPresent($username,$product_id)){
        $newQuantity=$presentElm['quantity']+1;
        $newPrice=$presentElm['price']+$price;
        updateQuantityPrice($username,$product_id,$newQuantity, $newPrice);
    }else{
        $query = " INSERT INTO cart (username,product_id,name,description,price,image,quantity) VALUES ('$username', '$product_id','$name' ,'$description','$price','$image',1)";

        $result = mysqli_query($conn, $query);
        if ($result) {
            echo json_encode(["status" => true]);
        } 
    }

    } 

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['product_id']) && isset($_GET['opr']) && isset($_GET['username'])) {
    $product_id = mysqli_real_escape_string($conn, $_GET['product_id']);
    $opr = mysqli_real_escape_string($conn, $_GET['opr']);
    $username = mysqli_real_escape_string($conn, $_GET['username']);

    if ($opr == "dec") {
        $checkQuery = "SELECT quantity FROM cart WHERE username='$username' AND product_id='$product_id'"; 
        $res = mysqli_query($conn, $checkQuery);
        
        $getPriceQuery="SELECT price FROM product WHERE id='$product_id'";
        $priceSend=mysqli_query($conn, $getPriceQuery);

        if ($res==true && $priceSend==true) {
            $presentQuantity = mysqli_fetch_assoc($res);
            $actualPrice=mysqli_fetch_assoc($priceSend);
            if ($presentQuantity['quantity'] > 1) {
                $newQuantity = $presentQuantity['quantity'] - 1;
                $newPrice=$priceSend['price']*$newQuantity;
                $decreaseQuery = "UPDATE cart SET price='$newPrice', quantity='$newQuantity' WHERE username='$username' AND product_id='$product_id'";
                $result = mysqli_query($conn, $decreaseQuery);

                if ($result) {
                    echo json_encode(["update" => true, "quantity" => $newQuantity, "price"=>$newPrice]);
                } else {
                    echo json_encode(["update" => false]);
                }
            } else {
                echo json_encode(["update" => false, "message" => "Minimum quantity reached"]);
            }
        } else {
            echo json_encode(["update" => false, "message" => "Failed to fetch current quantity"]);
        }
    } else if ($opr == "inc") {
        $stockQuery = "SELECT stock FROM inventory WHERE product_id='$product_id'";
        $stockRes = mysqli_query($conn, $stockQuery);

        $quantityQuery = "SELECT quantity FROM cart WHERE username='$username' AND product_id='$product_id'";
        $quantityRes = mysqli_query($conn, $quantityQuery);

        $getPriceQuery="SELECT price FROM product WHERE id='$product_id'";
        $priceSend=mysqli_query($conn, $getPriceQuery);

        if ($stockRes && $quantityRes && $priceSend) {
            $fetchedStock = mysqli_fetch_assoc($stockRes);
            $presentQuantity = mysqli_fetch_assoc($quantityRes);
            $tempNewQuantity = $presentQuantity['quantity'] + 1;
            $Price=mysqli_fetch_assoc($priceSend);
            $PresentPrice=$Price['price'];

            if ($fetchedStock['stock'] == 0) {
                echo json_encode(["update" => false, "message" => "Stock empty"]);
            } else if ($tempNewQuantity > $fetchedStock['stock']) {
                echo json_encode(["update" => false, "message" => "Stock exceeded"]);
            } else {
                $newPrice=$PresentPrice*$tempNewQuantity;
                $increaseQuery = "UPDATE cart SET quantity='$tempNewQuantity', price='$newPrice' WHERE username='$username' AND product_id='$product_id'";
                $increaseResult = mysqli_query($conn, $increaseQuery);

                if ($increaseResult) {
                    echo json_encode(["update" => true, "quantity" => $tempNewQuantity,"price"=>$newPrice]);
                } else {
                    echo json_encode(["update" => false, "message" => "Failed to update quantity"]);
                }
            }
        } else {
            echo json_encode(["update" => false, "message" => "Failed to fetch stock or current quantity"]);
        }
    }
}

if($requestMethod==="GET" && isset($_GET['user'])){
    $username=mysqli_real_escape_string($conn,$_GET['user']);
    $query="SELECT * FROM cart WHERE username='$username'";

    $result=mysqli_query($conn,$query);
    if($result){
        $arr=array();
        while($rowArray=mysqli_fetch_assoc($result)){
            array_push($arr,$rowArray);
        }
        echo json_encode(['cart' => $arr]);
    }
}



if($requestMethod==="DELETE" && isset($_GET['user']) && isset($_GET['product_id'])){
    $username=mysqli_real_escape_string($conn,$_GET['user']);
    $product_id=mysqli_real_escape_string($conn,$_GET['product_id']);

    $query="DELETE FROM cart WHERE username='$username' AND product_id='$product_id'";

    $result = mysqli_query($conn,$query);

    if($result){
        echo json_encode(["status"=>"deleted"]);
    }else{
        echo json_encode(["status"=>"couldn't delete"]);
    }
}

function isPresent($user,$product){
    global $conn;

    $query="SELECT * FROM cart WHERE product_id='$product' AND username='$user' ";
    $result =mysqli_query($conn,$query);
    if($result && mysqli_num_rows($result) > 0){
        return mysqli_fetch_assoc($result);
    }
    return false;
}


function updateQuantityPrice($user,$product,$quantity, $price){
    global $conn;
    $query="UPDATE cart SET quantity='$quantity', price='$price' WHERE product_id='$product' AND username='$user'  LIMIT 1";
    $result= mysqli_query($conn,$query);
    if($result){
        echo json_encode(["status"=>"updated"]);
    }else{
        echo json_encode(["status"=>"not updated"]);
    }
}
?>