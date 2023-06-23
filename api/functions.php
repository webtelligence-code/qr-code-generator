<?php

include '../DatabaseConnect.php';
include 'session.php';

$databaseObj = new DatabaseConnect;
$conn = $databaseObj->connect();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////GET////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that will user's session data
function getSessionData()
{
  $sessionData = array(
    'USERNAME' => $_SESSION['USERNAME'],
    'DEPARTAMENTO' => $_SESSION['DEPARTAMENTO'],
    'FUNCAO' => $_SESSION['FUNCAO']
  );

  return $sessionData;
}
// Function that will fetch all users (guests) from the database
function getUsers($concessions)
{
  global $conn;

  if (is_array($concessions)) {
    $concessionsList = "'" . implode("', '", array_column($concessions, 'concessao')) . "'";
  } else {
    $concessionsList = "'" . $concessions . "'";
  }

  if ($_SESSION['USERNAME'] == 'pedromatos@AM098') {
    $sql = "SELECT nameDisplay, userIcar, concessao, funcao, departamento FROM tbusers 
            WHERE ativo = 1 
            AND colaborador = 1
            AND departamento = 'Pós Venda'
            AND funcao IN ('Pintor', 'Lavador', 'Mecânico', 'Bate Chapas')
            ORDER BY nameDisplay ASC";
  } else {
    $sql = "SELECT nameDisplay, userIcar, concessao, funcao, departamento FROM tbusers 
          WHERE ativo = 1 
          AND colaborador = 1
          AND departamento = 'Pós Venda'
          AND funcao IN ('Pintor', 'Lavador', 'Mecânico', 'Bate Chapas')
          AND concessao IN ($concessionsList)
          ORDER BY nameDisplay ASC";
  }

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

function getCurrentUser($username)
{
  global $conn;

  $sql = "SELECT * FROM tbusers 
          WHERE username = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $stmt->execute();
  $result = $stmt->get_result();

  $user = null;
  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
  } else {
    echo "No data found";
  }

  return $user;
}

function getSalesBossConcessions($username)
{
  global $conn;
  $sql = "SELECT concessao FROM tbconcessoes 
          WHERE GerentePosVenda = ?
          OR DiretorPosVenda = ?
          OR GerenteConcessao = ?
          GROUP BY concessao";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $username, $username);
  $stmt->execute();
  $result = $stmt->get_result();

  $concessions = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $concessions[] = $row;
    }
  } else {
    echo "No data found";
  }

  return $concessions;
}
