<?php
require "./Controller/DBConnection.php";
require "./sanitizer.php";

session_start();

$data = json_decode(file_get_contents("php://input"));
header("Content-Type: application/json; charset=utf8");

if(notEmpty($data)){
    $pt = $conn->prepare("select * from profiles where profile_user=? and profile_pass=?");
    $pt->bind_param("ss", $data[0], $data[1]);
    $pt->execute();
    $result = $pt->get_result();
    if($result->num_rows > 0){
        $_SESSION["isLoggedIn"] = true;
        $_SESSION["Username"] = $data[0];
        echo json_encode(["Type" => "Success"]);
    }else{
        echo json_encode(["Type" => "Failed", "Message" => "User does not exist!"]);
    }
}else{
    echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
}
