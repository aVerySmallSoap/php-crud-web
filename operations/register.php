<?php
require "./Controller/DBConnection.php";
require "./Sanitizer.php";

$data = json_decode(file_get_contents("php://input"));
$id = getLatestID();
header("Content-Type: application/json; charset=utf8");

if(notEmpty($data)){
    try{
        $pt = $conn->prepare("INSERT INTO profiles (profile_id, profile_fname, profile_lname, profile_user, profile_pass) values (?,?,?,?,?)");
        $pt->bind_param("issss", $id, $data[0], $data[1], $data[2],$data[3]);
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
            default: echo $e->getCode();
        }
    }
}else{
    echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
}

function getLatestID(){
    require "./Controller/DBConnection.php";
    $result = $conn->query("SELECT max(profile_id) FROM profiles")->fetch_array(MYSQLI_NUM);
    if($result != null){
        return ++$result[0];
    }
    return 1;
}

