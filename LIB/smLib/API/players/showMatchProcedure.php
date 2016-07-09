<?php

$templateParams['playerId'] = $_POST['pi'];
$templateParams['godId'] = $_POST['gi'];
$templateParams['godName'] = $_POST['gn'];
$templateParams['taskForce'] = $_POST['tf'];
$templateParams['Account_Level'] = $_POST['al'];
$templateParams['playerName'] = $_POST['pn'];
$templateParams['mastery_Level'] = $_POST['ml'];
$templateParams['matchId'] = $_POST['m'];

include('../../base/baseMethod.php');
updatePlayer($_POST['pi'],$_POST['pn']);
updateGod($_POST['gi'],$_POST['gn']);
insertPlayerInMatch($_POST['q'],$_POST['pi'],$_POST['gi'],$_POST['tf'],$_POST['al'],$_POST['ml'],$_POST['m']);

include('../../html/htmlMethod.php');
showMatch($templateParams);