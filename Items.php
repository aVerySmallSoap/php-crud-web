<?php
require_once "./operations/Controller/DBConnection.php";
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./CSS/navigation.css">
    <link rel="stylesheet" href="./CSS/table-style.css">
    <link rel="stylesheet" href="CSS/Table-Modal.css">
    <title>Items</title>
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
                    <a href="#">
                        <div class="nav-item">
                            <span>Items</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="nav-item">
                            <span>Categories</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <table id="table-user">
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $result = $conn->query("SELECT * FROM users");
                while($rows = $result->fetch_assoc()){
                    $id = $rows['users_id'];
                    $name = $rows['users_alias'];
                    $user = $rows['users_name'];
                    $pass = $rows['users_pass'];
                    echo "<tr class='$id'>";
                    foreach ($rows as $item){
                        printf ("<td data-value='tag' style='text-align: center'>%s</td>", $item);
                    }
                    echo "<td><a data-table='users' data-tag='$id' class='action-delete'>Delete</a></td>";
                    echo "<td> <a data-table='users' data-tag='$id' class='action-update'>Update</a></td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
    </table>

    <script src="./JS/Delete.js"></script>
    <script src="./JS/Update.js"></script>
    <script src="JS/Table-Modal.js"></script>

</body>
</html>