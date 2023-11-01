<?php
require_once "../operations/Controller/DBConnection.php";

$table = $_GET["table"];
$table_id = $table."_id";
$id = $_GET["id"];
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

