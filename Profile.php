<?php
require "./operations/utilities/sanitizer.php";
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
    <link rel="stylesheet" href="./CSS/navigation.css">
    <link rel="stylesheet" href="./CSS/drop-menu.css">
    <link rel="stylesheet" href="./CSS/form-card.css">
    <title>Profile</title>
</head>
<body>

    <div class="nav">
    <div class="nav-content">
        <span id="nav-title">Dashboard</span>
        <ul>
            <li>
                <a href="./Users.php">
                    <div class="nav-item">
                        <span>Users</span>
                    </div>
                </a>
            </li>
            <li>
                <a href="./Items.php">
                    <div class="nav-item">
                        <span>Items</span>
                    </div>
                </a>
            </li>
            <li>
                <a href="./Categories.php">
                    <div class="nav-item">
                        <span>Categories</span>
                    </div>
                </a>
            </li>
            <li>
                <a href="./Orders.php">
                    <div class="nav-item">
                        <span>Orders</span>
                    </div>
                </a>
            </li>
            <li>
                <div data-toggled="false" class="nav-item" id="Setting">
                    <span>Settings</span>
                    <img src="./misc/images/arrow_down.png" id="setting-arrow" width="24" height="24">
                </div>
            </li>
        </ul>
    </div>
</div>

    <div class="body-grid">
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
    </div>

    <script src="JS/Functions/ServerRequests.js"></script>
    <script src="JS/Functions/Alert-banner.js"></script>
    <script src="JS/Animations/navigation-setting.js"></script>
    <script src="JS/Functions/Profile.js"></script>

</body>
</html>