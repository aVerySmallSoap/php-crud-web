<?php
require "../operations/Controller/DBConnection.php";

$json = json_decode(file_get_contents("php://input"));
foreach ($json as $item) {
    echo $item;
}