<?php
require "../operations/Controller/DBConnection.php";

$id = $_GET["id"];
$table = $_GET["table"];
$result = $conn->query("SELECT {$table}_id FROM $table WHERE {$table}_id='$id'");
if($result->num_rows > 0){
    $conn->query("DELETE FROM $table WHERE {$table}_id='$id'");
    header("Content-Type: application/json");
    $arr = array("Response" => "Success", "id" => $id);
}else{
    header("Content-Type: application/json");
    $arr = array("Response" => "Error");
}
echo json_encode($arr);
