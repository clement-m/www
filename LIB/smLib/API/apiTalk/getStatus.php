<?php
$p = (isset($_POST['player']))? $_POST['player'] : $_GET['player'];
$s = (isset($_POST['session']))? $_POST['session'] : $_GET['session'];

session_start();
$_SESSION['session'] = $s;
$_SESSION['player'] = $p;

include_once('../API.php');
$M = new API();
$r = $M->getPlayerStatus($p);
$r = json_decode($r);
$r = json_encode($r[0]);
echo $r;