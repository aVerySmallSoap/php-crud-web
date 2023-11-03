<?php
require "./Controller/DBConnection.php";

$data = json_decode(file_get_contents("php://input"));
$columns = $data[0];
$rows = $data[1]; //this would be the same size as the # of columns
$table = $data[2];
$notEmpty = true;
//Sanitize inputs for blanks then return an error json type
foreach ($rows as $data){
    if($data === "" || $data === null){
        $notEmpty = false;
        echo json_encode(["Type" => "Failed"]);
        break;
    }
}

if($notEmpty){
    //String build
    $str = "";
    for ($i = 1; $i < sizeof($columns); $i++) {
        if($i != sizeof($columns)-1){
            $str .= "`".$columns[$i]."` = '".$rows[$i]."' ,";
        }else{
            $str .= "`".$columns[$i]."` = '".$rows[$i]."' ";
        }
    }
    $pt = $conn->prepare("UPDATE $table SET $str WHERE $columns[0] = ?;");
    $pt->bind_param("s",$rows[0]);
    $result = $pt->execute();
    if($result){
        echo json_encode($rows);
    }
}
