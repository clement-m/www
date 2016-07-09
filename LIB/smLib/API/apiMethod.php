<?php

// LIB/smLib/API/apiMethod.php

/**
 * getAPIRank
 * @param $pi
 * @param $gi
 * @return int
 */
function getAPIRank($pi,$gi) {
  $res = 0;

  include_once('../../base/co.php');
  $req2 = $pdo->prepare("Call recRank(:pi,:gi,:r);");

  session_start();
  include_once('API.php');
  $API = new API();
  $rank = $API->getRank($pi, $_SESSION['session']);
  foreach($rank as $aRank) {
    $rRank = $aRank->Rank;
    $rgod_id = $aRank->god_id;
    $rplayer_id = $aRank->player_id;

    $ppi = intval($rplayer_id);
    $ggi = intval($rgod_id);
    $rr = intval($rRank);

    $req2->bindParam('pi', $ppi, PDO::PARAM_INT);
    $req2->bindParam('gi', $ggi, PDO::PARAM_INT);
    $req2->bindParam('r', $rr, PDO::PARAM_INT);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }

    if($rgod_id == $gi) { $res = $rRank; }
  }
  return $res;
}

/*
 * getApiKda
 * @param $pi
 * @param $gi
 * @param $q
 */
function getAPIKda($pi, $gi, $q) {
  include('../../base/co.php');
  $req2 = $pdo->prepare("Call recKda(:pi,:gi,:q,:k,:d,:a,:w,:nb);");

  include_once('API.php');
  $API = new API();
  $r = $API->getKDA($pi, $q);
  foreach($r as $akda) {
    $Assists = $akda->Assists;
    $Deaths = $akda->Deaths;
    $Kills = $akda->Kills;
    $Losses = $akda->Losses;
    $Wins = $akda->Wins;
    $rgi = $akda->GodId;
    $QueueName = $akda->Queue;

    $nbMatch = $Losses + $Wins;
    $avgKills = round($Kills / $nbMatch, 2);
    $avgDeaths = round($Deaths / $nbMatch, 2);
    $avgAssists = round($Assists / $nbMatch, 2);

    if($avgKills == 0 && $avgAssists == 0) $PMI = $avgDeaths;
    else if($avgDeaths == 0) $PMI = round(($avgKills + $avgAssists), 2);
    else if($avgKills == 0 && $avgAssists == 0 && $avgDeaths == 0) $PMI = 0;
    else $PMI = round(($avgKills + $avgAssists / $avgDeaths), 2);

    $ppi = intval($pi);
    $ggi = intval($rgi);
    $qi = queueNameToId($QueueName);
    $kk = intval($Kills);
    $dd = intval($Deaths);
    $aa = intval($Assists);
    $ww = intval($Wins);
    $nbnb = intval($nbMatch);

    $req2->bindParam('pi', $ppi, PDO::PARAM_INT);
    $req2->bindParam('gi', $ggi, PDO::PARAM_INT);
    $req2->bindParam('q', $qi, PDO::PARAM_INT);
    $req2->bindParam('k', $kk, PDO::PARAM_INT);
    $req2->bindParam('d', $dd, PDO::PARAM_INT);
    $req2->bindParam('a', $aa, PDO::PARAM_INT);
    $req2->bindParam('w', $ww, PDO::PARAM_INT);
    $req2->bindParam('nb', $nbnb, PDO::PARAM_INT);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }

    if ($ggi == intval($gi)) {
      echo $avgKills . "/" . $avgDeaths . "/" . $avgAssists . " pmi:" . $PMI;
    }
  }
}

/**
 * getApiLeague
 * @param $pi
 * @return mixed
 */
function getApiLeague($pi) {
  include_once('API.php');
  $API = new API();
  $r = $API->getLeague($pi);

  $league = $r[0];
  $ConqTier = $league->RankedConquest->Tier;
  $JoustTier = $league->RankedJoust->Tier;
  $DuelTier = $league->RankedDuel->Tier;

  include('../../base/co.php');
  $q = $pdo->prepare("CALL recLeague(:pi,:c,:j,:d);");
  $q->bindParam('pi', $pi, PDO::PARAM_INT);
  $q->bindParam('c', $ConqTier, PDO::PARAM_INT);
  $q->bindParam('j', $JoustTier, PDO::PARAM_INT);
  $q->bindParam('d', $DuelTier, PDO::PARAM_INT);
  $q->execute();

  $res['conquest'] = leagueCode($ConqTier);
  $res['joust'] = leagueCode($JoustTier);
  $res['duel'] = leagueCode($DuelTier);

  return $res;
}

/**
 * leagueCode
 * getLeagueCode
 * @param $num
 * @return array
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

/**
 * queueNameToId
 * @param $Q
 * @return int|string
 */
function queueNameToId($Q) {
  // DOIT RETOURNER L4ID PAS LE PUTAIN DE NOM
  if($Q == "Normal: Joust") {
    $Q = 448;
  }
  if($Q == "Normal: Arena") {
    $Q = 435;
  }
  if($Q == "Normal: Assault") {
    $Q = 445;
  }
  if($Q == "Normal: Conquest") {
    $Q = 426;
  }
  if($Q == "Normal: Clash") {
    $Q = 466;
  }
  if($Q == "450") {
    $Q = 'Ranked: Joust'; // not ok
  }
  if($Q == "Normal: Siege") {
    $Q = 459; // not ok
  }
  if($Q == "Ranked: Conquest") {
    $Q = 451; // ok
  }
  if($Q == "Ranked: Joust") {
    $Q = 440; // ok
  }
  if($Q == "Normal: MOTD") {
    $Q = 434;
  }

  return $Q;
}