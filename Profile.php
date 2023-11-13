<?php
require "./operations/sanitizer.php";
if(!isLoggedIn()){
    header("location: ./login.html");
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Profile</title>
</head>
<body>

    <div class="container-card">
        <form id="form-profile">
            <div class="form-row">
                <label for="field-firstname">ID:</label>
                <span><?php echo $_SESSION["profileData"][0]?></span>
            </div>
            <div class="form-row">
                <label for="field-firstname">First Name:</label>
                <input type="text" name="username" id="field-firstname" value=<?php echo $_SESSION["profileData"][1]?>>
            </div>
            <div class="form-row">
                <label for="field-lastname">Last Name:</label>
                <input type="text" name="password" id="field-lastname" value=<?php echo $_SESSION["profileData"][2]?>>
            </div>
            <div class="form-row">
                <label for="field-username">Username</label>
                <input type="text" name="username" id="field-username" value=<?php echo $_SESSION["Username"]?>>
            </div>
            <div class="form-row">
                <label for="field-password">Password</label>
                <input type="text" name="password" id="field-password" value=<?php echo $_SESSION["profileData"][3]?>>
            </div>
            <div class="form-control">
                <button>Update</button>
            </div>
        </form>
    </div>

    <script src="./JS/ServerRequests.js"></script>
    <script src="./JS/Alert-banner.js"></script>
    <script src="./JS/Profile.js"></script>

</body>
</html>