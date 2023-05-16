<?php

include 'DatabaseConnect.php';

include 'session.php';

use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;

require 'vendor/autoload.php';

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
// Function that will fetch all users (guests) from the database
function getUsers()
{
  global $conn;
  $sql = 'SELECT * FROM users WHERE ACT = 1 AND COLABORADOR = 1 ORDER BY CONCESSAO ASC';
  $result = $conn->query($sql);

  $users = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $name = $row['NAME'];
      $concessao = $row['CONCESSAO'];
      $funcao = $row['FUNCAO'];

      // Filename path
      $filename = 'assets/qrcodes/qrcode_' . $name . '_' . $concessao . '_' . $funcao . '.png';

      // Check if the QR code image file already exists
      if (file_exists($filename)) {
        // Retrieve the data URI of the existing QR code image
        $dataUri = 'data:image/png;base64,' . base64_encode(file_get_contents($filename));
      } else {
        // Grab the return value of generated QR code image
        $dataUri = generateQrCode($filename, $name);
      }

      // Specify user fields
      $user = array(
        "NAME" => $name,
        "CONCESSAO" => $concessao,
        "FUNCAO" => $funcao,
        "QRCODE" => $dataUri
      );

      array_push($users, $user); // push users to array
    }
  } else {
    return "No data found";
  }

  return $users;
}

function generateQrCode($filename, $name)
{
  // Initialize the writer
  $writer = new PngWriter();

  // Create QR code
  $qrCode = QrCode::create($name)
    ->setEncoding(new Encoding('UTF-8'))
    ->setErrorCorrectionLevel(new ErrorCorrectionLevelLow())
    ->setSize(100)
    ->setMargin(0)
    ->setRoundBlockSizeMode(new RoundBlockSizeModeMargin())
    ->setForegroundColor(new Color(0, 0, 0))
    ->setBackgroundColor(new Color(255, 255, 255));

  // Create generic logo
  $logo = Logo::create('https://amatoscar.pt/assets/media/general/logoamatoscar.webp')
    ->setResizeToWidth(100);

  // Create generic label
  $label = Label::create('')
    ->setTextColor(new Color(237, 99, 55));

  // Add logo and label to the QR code
  $qrCodeResult = $writer->write($qrCode, $logo, $label);

  // Save it to a file
  $qrCodeResult->saveToFile($filename);

  // REturn the generated QR Code URI
  return $qrCodeResult->getDataUri();
}
