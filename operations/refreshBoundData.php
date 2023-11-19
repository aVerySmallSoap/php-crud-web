<?php
require_once "../operations/Controller/DBConnection.php";
require_once "./utilities/stringBuilder.php";


$request = json_decode(file_get_contents("php://input"));
$table = $request[0];
$columns = columnBuilder($request[1]);
$conditionColumn = $request[2];
$conditionValue = $request[3];
$result = $conn->query("SELECT $columns from $table where $conditionColumn = '$conditionValue';");

echo json_encode($result->fetch_array(MYSQLI_NUM));

/**
 * array(4)
 * {
 * [0]=> string(5) "items"
 * [1]=> array(2) { [0]=> string(11) "items_price" [1]=> string(13) "category_name" }
 * [2]=> string(10) "items_name" [3]=> string(5) "Pizza"
 * }
 */
