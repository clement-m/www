<?php

// LIB/smLib/base/match/finishMatch.php

include_once('../co.php');
$req2 = $pdo->prepare("Call finishMatch(:m);");
$req2->bindParam('m', $_POST['m'], PDO::PARAM_INT);
$req2->execute();