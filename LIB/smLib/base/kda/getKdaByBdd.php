<?php

// getKdaByBdd.php

include_once('../co.php');

$qgetKdaByBdd = $pdo->prepare("CALL getKdaByBdd(:pi,:gi,:q);");
$qgetKdaByBdd->bindParam('pi', $_POST['pi'], PDO::PARAM_INT);
$qgetKdaByBdd->bindParam('gi', $_POST['gi'], PDO::PARAM_INT);
$qgetKdaByBdd->bindParam('q', $_POST['q'], PDO::PARAM_INT);
$qgetKdaByBdd->execute();
if(!$qgetKdaByBdd) { var_dump($pdo->errorInfo()); }

while ($row = $qgetKdaByBdd->fetch()) {
  if(isset($row['kills'])) {
    $avgKill = round($row['kills'] / $row['nbMatch'], 2);
    $avgDeath = round($row['deaths'] / $row['nbMatch'], 2);
    $avgAssist = round($row['assists'] / $row['nbMatch'], 2);
    $PMI = "";

    if($avgDeath == 0 && $avgAssist == 0) $PMI = 0 - round($avgDeath, 2);
    else if($avgDeath == 0) $PMI = round(($avgKill + $avgAssist), 2);
    else if($avgKill == 0 && $avgAssist == 0 && $avgDeath == 0) $PMI = 0;
    else $PMI = round(($avgKill + $avgAssist) / $avgDeath, 2);

    echo $avgKill."/".$avgDeath."/".$avgAssist." pmi: ".$PMI;
  } else {
    echo "";
  }
}