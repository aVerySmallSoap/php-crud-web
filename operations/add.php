<?php
require "./Controller/DBConnection.php";

$data = json_decode(file_get_contents("php://input"));
$columns = $data[0];
$rows = $data[1]; //this would be the same size as the # of columns
$table = $data[2];
$notEmpty = true;
header("Content-Type: application/json");
foreach ($rows as $val){
    if($val === "" || $val === null){
        $notEmpty = false;
        echo json_encode(["Type" => "Failed", "Message" => "Please fill out all the fields!"]);
        break;
    }
}

if($notEmpty){
    $a = columnBuilder($columns);
    $b = rowBuilder($rows);
    try{
        $result = $conn->query("INSERT INTO `$table` ($a) VALUES ($b);");
        if($result){
            echo json_encode($rows);
        }
    }catch (Exception $e){
        if($e->getCode() === 1062){
            echo json_encode(["Type" => "Failed", "Message" => "Duplicate Entry!"]);
        }else{
            echo json_encode(["Type" => "Failed", "Message" => $e->getMessage()]);
        }
    }

}

function columnBuilder($columns): string{
    $str = "";
    for ($i = 0; $i < sizeof($columns); $i++) {
        if($i != sizeof($columns)-1){
            $str .= "`".$columns[$i]."`,";
        }else{
            $str .= "`".$columns[$i]."`";
        }
    }
    return $str;
}

function rowBuilder($rows): string {
    $str = "";
    for ($i = 0; $i < sizeof($rows); $i++) {
        if($i != sizeof($rows)-1){
            $str .= "'".$rows[$i]."',";
        }else{
            $str .= "'".$rows[$i]."'";
        }
    }
    return $str;
}