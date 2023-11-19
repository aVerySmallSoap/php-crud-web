<?php
require "./Controller/DBConnection.php";
require "./utilities/sanitizer.php";
$data = json_decode(file_get_contents("php://input"));
if(notEmpty($data)){
    try{
        $pt = $conn->prepare(
            "update profiles set profile_fname = ?, profile_lname = ?, profile_user = ?, profile_pass = ?
            where profile_fname= ?");
        $pt->bind_param("sssss", $data[0], $data[1], $data[2], $data[3], $data[0]);
        if($pt->execute() == 1){
            echo json_encode(["Type" => "Success"]);
        }else{
            throw new Exception;
        }
    }catch (Exception $e){
        switch ($e->getCode()){
            case 1062:
                echo json_encode(["Message" => "Duplicate entry"]);
                break;
            default: echo $e->getCode() ."<br>" . $e->getMessage();
        }
    }
}else{
    echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
}