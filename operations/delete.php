<?php
require "../operations/Controller/DBConnection.php";

$id = $_GET["id"];
$table = $_GET["table"];
header("Content-Type: application/json; charset=utf8");
try{
    $result = $conn->query("DELETE FROM $table WHERE {$table}_id='$id'");
    $arr = array("id" => $id);
    echo json_encode($arr);
}catch (Exception $e){
    if($e->getCode() === 1451){
        echo json_encode(["Type" => "Failed", "Message" => "Row is in use in another table! Please delete entities first!"]);
    }else{
        echo json_encode(["Type" => "Failed", "Message" => $e->getMessage()]);
    }
}
