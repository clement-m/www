<?php
include_once('../co.php');
$req2 = $pdo->prepare("Call checkReady(:m);");
$req2->bindParam('m', $_POST['matchid'], PDO::PARAM_INT);
$req2->execute();

$row = array();
$row = $req2->fetch();
echo json_encode($row);