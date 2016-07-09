<?php

// getRankByBdd.php

include_once('../co.php');
$q = $pdo->prepare("CALL getRankByBdd(:pi,:gi);");
$q->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$q->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$q->execute();
if(!$q) { var_dump($pdo->errorInfo()); }

$res = 0;
while ($row = $q->fetch()) {
  $res = intval($row);
  $row = json_encode($row);
  echo $row;
}