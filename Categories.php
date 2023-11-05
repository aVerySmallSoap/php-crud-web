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
    <title>Categories</title>
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
            </ul>
        </div>
    </div>

    <div class="table-container">
        <button class="action-add">Add</button>
        <table id="table-category">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <?php
            $result = $conn->query("SELECT * FROM category");
            while($rows = $result->fetch_array(MYSQLI_NUM)){
                $id = $rows[0];
                echo "<tr class='$id'>";
                foreach ($rows as $item){
                    printf ("<td style='text-align: center'>%s</td>", $item);
                }
                echo "<td><a data-table='category' data-tag='$id' class='action-delete'>Delete</a>";
                echo "<a data-table='category' data-tag='$id' class='action-update'>Update</a></td>";
                echo "</tr>";
            }
            ?>
            </tbody>
        </table>
    </div>

    <script src="./JS/Delete.js"></script>
    <script src="./JS/Add.js"></script>
    <script src="./JS/Update.js"></script>
    <script src="JS/Table-Modal.js"></script>

</body>
</html>