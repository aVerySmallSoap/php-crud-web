<?php
require "./Controller/DBConnection.php";
require "./utilities/sanitizer.php";
require "./utilities/stringBuilder.php";

$request = json_decode(file_get_contents("php://input"));
$columns = $request[0];
$rows = $request[1];
$table = $request[2];
header("Content-Type: application/json; charset=utf8");
if(notEmpty($request)){
    $a = keyValueBuilder($columns, $rows);
    $pt = $conn->prepare("UPDATE $table SET $a WHERE $columns[0] = ?;");
    $pt->bind_param("s",$rows[0]);
    $result = $pt->execute();
    if($result){
        echo json_encode($rows);
    }
}else{
    echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
}
