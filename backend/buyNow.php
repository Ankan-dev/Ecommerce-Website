<?php


require './includes/db.php';

$requestMethod=$_SERVER["REQUEST_METHOD"];

if($requestMethod==="POST"){
    $username=$_POST['username'];
    $house=$_POST['house'];
    $area=$_POST['area'];
    $city=$_POST['city'];
    $state=$_POST['state'];
    $pin=$_POST['pin'];

    $address = $house . " , " . $area . " , " . $city . " , " . $state . " , " . $pin;
    $cartQuery="SELECT * FROM cart WHERE username='$username'";
    $result =mysqli_query($conn,$cartQuery);
    if($result){
        $arr=array();
        while($resArray=mysqli_fetch_assoc($result)){
            array_push($arr,$resArray);
        }
        $status;
        foreach($arr as $elm){
            $product_id=$elm["product_id"];
            $product_name=$elm["name"];
            $image=$elm["image"];
            $price=$elm["price"];
            $quantity=$elm["quantity"];
            $orderQuery="INSERT INTO orders (username,address,product_id,product_name,image,price,quantity) VALUES ('$username','$address','$product_id','$product_name','$image','$price','$quantity')";
            $statusResult=mysqli_query($conn,$orderQuery);
            if($statusResult){
                $getstock="SELECT stock FROM inventory WHERE product_id='$product_id'";
                $getstockRes=mysqli_query($conn,$getstock);
                if($getstockRes){
                    $presentStock=mysqli_fetch_assoc($getstockRes);
                    $newStock=$presentStock["stock"]-$quantity;
                    $updateStock="UPDATE inventory SET stock = '$newStock' WHERE product_id='$product_id'";
                    $updateStockRes=mysqli_query($conn,$updateStock);
                    if($updateStockRes){
                        $status=true;
                    }
                }
                
            }
        }
        if($status==true){
            $deleteCartQuery="DELETE FROM cart WHERE username='$username'";
            $deleteResult=mysqli_query($conn,$deleteCartQuery);
            if($deleteCartQuery){
                echo json_encode(["status"=>"order is placed"]);
            }
        }
    }
}

?>