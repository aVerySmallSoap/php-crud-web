<?php
require_once "../operations/Controller/DBConnection.php";

$request = json_decode(file_get_contents("php://input"));
$table = $request[0];
$column = $request[3];
$reference = $request[1];
$value = $request[2];
$result = $conn->query("SELECT $column from $table where $reference = '$value'");
echo json_encode($result->fetch_array(MYSQLI_NUM));