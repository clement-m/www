<?php

include_once('../co.php');
$req2 = $pdo->prepare("Call recreateMatch(:m);");
$req2->execute();