<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

include 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // GET REQUESTS
  case 'GET':
    $get_action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($get_action) {
      case 'get_session_data':
        $response = getSessionData();
        break;
      case 'get_current_user':
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $response = getCurrentUser($username);
        break;
      case 'get_users':
        $concessions = isset($_GET['concessions']) ? $_GET['concessions'] : '';
        $response = getUsers($concessions);
        break;
      case 'get_sales_boss_concessions':
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $response = getSalesBossConcessions($username);
        break;
      default:
        if ($get_action == '') {
          $response = 'Get action not specified. Please add an action type to the request.';
        } else {
          $response = 'Get action "' . $get_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response);
    break;

    // POST REQUESTS
  case 'POST':
    $post_action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($post_action) {
      default:
        if ($post_action == '') {
          $response = 'POST action not specified. Please add an action type to the request.';
        } else {
          $response = 'POST action "' . $post_action . '" does not exist in the API.';
        }
        break;
    }

    echo json_encode($response); // return $response
    break;
}
