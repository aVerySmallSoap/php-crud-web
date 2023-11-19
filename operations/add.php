<?php
require "./Controller/DBConnection.php";
require "./utilities/sanitizer.php";
require "./utilities/stringBuilder.php";

$data = json_decode(file_get_contents("php://input"));
$columns = $data[0];
$rows = $data[1];
$table = $data[2];
header("Content-Type: application/json; charset=utf8");

if(notEmpty($data)){
    $a = columnBuilder($columns);
    $b = rowBuilder($rows);
    try{
        $result = $conn->query("INSERT INTO `$table` ($a) VALUES ($b);");
        if($result){
            echo json_encode($rows);
        }
    }catch (Exception $e){
        switch ($e->getCode()){
            case 1062:
                echo json_encode(["Type" => "Failed", "Message" => "Duplicate Entry!"]);
                break;
            case 1366:
                echo json_encode(["Type" => "Failed", "Message" => "Fill out all fields!"]);
                break;
            default:
                echo json_encode(["Type" => "Failed", "Message" => $e->getMessage(), "Code" => $e->getCode()]);

        }
    }
}else{
    echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
}

