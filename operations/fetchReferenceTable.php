<?php
require_once "../operations/Controller/DBConnection.php";

$request = json_decode(file_get_contents("php://input"));
$table = $request[0];
$reference = $request[1];
$refcol = $request[2];
$pt = $conn->prepare(
    "SELECT REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME=? AND REFERENCED_COLUMN_NAME='$refcol';"); //Column to target
$pt->bind_param("s", $reference);
$pt->execute();
$column = $pt->get_result()->fetch_row()[0];
$result= $conn->query("SELECT $column FROM $reference");
$arr = array();
while($rows = $result->fetch_array(MYSQLI_NUM)){
    for ($i = 0; $i < sizeof($rows); $i++) {
        $arr[] = $rows[$i];
    }
}
echo json_encode($arr);
