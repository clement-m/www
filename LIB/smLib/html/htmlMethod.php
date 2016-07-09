<?php

/*
 * showMatch
 */
function showMatch($t){
  require_once '../../../twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../../../../SRC/Views');
  $twig = new Twig_Environment($loader, array('cache' => '../../../../SRC/cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('player.html.twig');
  echo $template->render(array('data' => $t));
}

/*
 * quickMatch
 */
function quickMatch($data){
  $data = json_decode($data);
  require_once '../../../twig/lib/Twig/Autoloader.php';
  Twig_Autoloader::register();
  $loader = new Twig_Loader_Filesystem('../../../../SRC/Views');
  $twig = new Twig_Environment($loader, array('cache' => '../../../../SRC/cache'));
  $twig->addExtension(new Twig_Extension_Debug());
  $template = $twig->loadTemplate('quickPlayer.html.twig');

  $dataTeam2 = array();
  $res = array();
  foreach($data as $k => $vData) {
    $vData->conquest = leagueCode($vData->conquest);
    $vData->joust = leagueCode($vData->joust);
    $vData->j1c1 = leagueCode($vData->j1c1);
    if($vData->taskForce == 2) $dataTeam2[] = $vData;
    else $res['team1HTML'][] = $template->render(array('data' => $vData));
  }

  foreach($dataTeam2 as $k => $vData) {
    $res['team2HTML'][] = $template->render(array('data' => $vData));
  }

  echo json_encode($res);
}

/*
 * leagueCode
 * getLeagueCode
 */
function leagueCode($num) {
  $res = Array();
  if($num == "0") {
    $res["name"] = "unranked";
    $res["num"] = "";
  } else {
    $mod = $num % 5;
    $div = round($num / 5);
    if($div == 5) {
      $res["name"] = "master";
      $res["num"] = 1;
    }else{
      switch ($mod) {
        case 0: $res["num"] = 1; break;
        case 1: $res["num"] = 5; break;
        case 2: $res["num"] = 4; break;
        case 3: $res["num"] = 3; break;
        case 4: $res["num"] = 2; break;
      }
    }

    if($mod == 0) $div -= 1;

    switch ($div) {
      case 0: $res["name"] = "bronze"; break;
      case 1: $res["name"] = "silver"; break;
      case 2: $res["name"] = "gold"; break;
      case 3: $res["name"] = "platine"; break;
      case 4: $res["name"] = "diamond"; break;
    }
  }
  return $res;
}