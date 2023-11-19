<?php declare(strict_types=1);

function sanitize($var) : bool{
    if(hasMinimumLength($var) && notEmpty($var)){
        return true;
    }
    return false;
}

function hasMinimumLength($input) : bool {
    foreach ($input as $str){
        $clean = str_replace(" ", "", $str);
        if(!sizeof(explode(" ", $clean)) >= 18){
            return false;
        }
    }
    return true;
}

function notEmpty($input) : bool{
    foreach ($input as $str){
        $clean = str_replace(" ", "", $str);
        if($clean == "" || $clean == null){
            return false;
        }
    }
    return true;
}

function isLoggedIn() : bool{
    session_start();
    if($_SESSION["isLoggedIn"]){
        session_abort();
        return true;
    }
    return false;
}