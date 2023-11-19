<?php
require "../operations/Controller/DBConnection.php";

$request = json_decode(file_get_contents("php://input"));
$id = $request[1];
$table = $request[0];
$conditionColumn = $table."_id";
header("Content-Type: application/json; charset=utf8");
try{
    $result = $conn->query("DELETE FROM $table WHERE $conditionColumn='$id'");
    $arr = array("id" => $id);
    echo json_encode($arr);
}catch (Exception $e){
    if($e->getCode() === 1451){
        echo json_encode(["Type" => "Failed", "Message" => "Row is in use in another table! Please delete entities first!", "Asagi" => $e->getMessage()]);
    }else{
        echo json_encode(["Type" => "Failed", "Message" => $e->getMessage()]);
    }
}
