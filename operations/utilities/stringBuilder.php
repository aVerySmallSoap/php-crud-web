<?php
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

function keyValueBuilder($columns, $rows): string{
    $str = "";
    for ($i = 0; $i < sizeof($columns); $i++) {
        if($i != sizeof($columns)-1){
            $str .= "`".$columns[$i]."` = '".$rows[$i]."' ,";
        }else{
            $str .= "`".$columns[$i]."` = '".$rows[$i]."' ";
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