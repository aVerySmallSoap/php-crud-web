<?php
session_start();
unset($_SESSION["isLoggedIn"]);
unset($_SESSION["Username"]);
header("location: ../login.html");