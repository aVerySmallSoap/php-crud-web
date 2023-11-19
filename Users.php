<?php
require_once "./operations/Controller/DBConnection.php";
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
    <link rel="stylesheet" href="CSS/Table-Style.css">
    <link rel="stylesheet" href="./CSS/Modal.css">
    <link rel="stylesheet" href="CSS/Table-Modal.css">
    <title>Users</title>
</head>
<body>

    <div class="nav">
    <div class="nav-content">
        <span id="nav-title">Dashboard</span>
        <ul>
            <li>
                <a href="#">
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

    <div class="table-container">
        <button class="action-add">Add</button>
        <table id="table-users">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $result = $conn->query("SELECT * FROM users");
            while($rows = $result->fetch_array(MYSQLI_NUM)){
                $id = $rows[0];
                echo "<tr class='$id'>";
                foreach ($rows as $item){
                    printf ("<td style='text-align: center'>%s</td>", $item);
                }
                echo "<td><a data-table='users' data-tag='$id' class='action-delete'>Delete</a>";
                echo "<a data-table='users' data-tag='$id' class='action-update'>Update</a></td>";
                echo "</tr>";
            }
            ?>
            </tbody>
        </table>
    </div>

    <script src="JS/Functions/Delete.js"></script>
    <script src="JS/Functions/Update.js"></script>
    <script src="JS/Functions/Add.js"></script>
    <script src="JS/Functions/Modal.js"></script>
    <script src="JS/Functions/Table-Modal.js"></script>
    <script src="JS/Functions/Alert-banner.js"></script>
    <script src="JS/Animations/navigation-setting.js"></script>
    <script src="JS/Functions/ServerRequests.js"></script>
</body>
</html>