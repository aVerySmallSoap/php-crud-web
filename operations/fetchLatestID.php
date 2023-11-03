<?php
require "./Controller/DBConnection.php";

$table = $_POST["table"];
$table_id = $table."_id";
$columns = array();
$result = $conn->query("SELECT * FROM $table");
while($col = $result->fetch_field()){
    $columns[] = $col->name;
}
$result = $conn->query("SELECT MAX($table_id) FROM $table");
echo json_encode(["Columns" => $columns, "ID" => ++$result->fetch_row()[0]]);