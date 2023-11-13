<?php
require "../operations/Controller/DBConnection.php";
session_start();
$user = $_SESSION["Username"];
$result = $conn->query("select profile_id,profile_fname,profile_lname,profile_pass from profiles where profile_user='$user'");
$data = $result->fetch_array(MYSQLI_NUM);
$arr = array(($_SESSION["ID"]=""),
    ($_SESSION["firstName"]=""),
    ($_SESSION["lastName"]=""),
    ($_SESSION["Password"]=""));
for ($i = 0; $i < sizeof($data); $i++) {
    var_dump($arr[$i]);
    $arr[$i] = $data[$i];
}
$_SESSION["profileData"] = $arr;
header("location: ../Profile.php");