<?php

$m = (isset($_POST['matchid'])) ? $_POST['matchid'] : $_GET['matchid'];
include_once('../API.php');
$API = new API();
$r = $API->getMatchPlayer($m);
echo $r;
