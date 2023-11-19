<?php
require_once "../operations/Controller/DBConnection.php";

$request = json_decode(file_get_contents("php://input"));
$table = $request[1];
$id = $request[0];
$table_id = $table."_id";
$result = $conn->query("SELECT * FROM $table WHERE $table_id=$id");
$columns = array();
$rows = $result->fetch_row();
while($col = $result->fetch_field()){
    $columns[] = $col->name;
}
if($rows == null){
    echo "error";
}else{
    $json = ["Columns" => $columns, "Rows" => $rows];
    echo json_encode($json);
}

