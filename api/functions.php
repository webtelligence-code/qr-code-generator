<?php

include 'DatabaseConnect.php';
include 'session.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GET////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that will fetch session username
function getUsername()
{
  return $_SESSION['USERNAME'];
}
function getDepartment() {
  return $_SESSION['DEPARTAMENTO'];
}
// Function that will fetch all users (guests) from the database
function getUsers()
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE ACT = 1 AND COLABORADOR = 1 ORDER BY NAME ASC';
  $result = $conn->query($sql);

  $users = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }
  } else {
    echo "No data found";
  }

  return $users;
}