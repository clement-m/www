<?php

/*
 * createMatchPlayer
 */
function createMatchPlayer($pi,$gi,$m) {
  include('co.php');
  $req2 = $pdo->prepare("Call createMatchPlayer(:pi,:gi,:m);");
  $req2->bindParam('pi', $pi, PDO::PARAM_INT);
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('m', $m, PDO::PARAM_INT);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

/**
 * insertPlayerInMatch
 */
function insertPlayerInMatch($q,$pi,$gi,$tf,$acc,$ml,$m){
  include('co.php');
  $req2 = $pdo->prepare("Call insertPlayerInMatch(:m,:q,:pi,:gi,:acc,:ml,:tf);");
  $req2->bindParam('m', $m, PDO::PARAM_INT);
  $req2->bindParam('q', $q, PDO::PARAM_INT);
  $req2->bindParam('pi', $pi, PDO::PARAM_INT);
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('acc', $acc, PDO::PARAM_INT);
  $req2->bindParam('ml', $ml, PDO::PARAM_INT);
  $req2->bindParam('tf', $tf, PDO::PARAM_INT);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}

/*
 * updatePlayer
 */
function updatePlayer($pi,$pn) {
  if($pn != null) {
    include('co.php');
    $req2 = $pdo->prepare("Call updatePlayer(:pi,:pn);");
    $req2->bindParam('pi', $pi, PDO::PARAM_INT);
    $req2->bindParam('pn', $pn, PDO::PARAM_STR);
    $req2->execute();
    if(!$req2) { var_dump($pdo->errorInfo()); }
  }
}

/*
 * updateGod
 */
function updateGod($gi,$gn) {
  include('co.php');
  $req2 = $pdo->prepare("Call updateGod(:gi,:gn);");
  $req2->bindParam('gi', $gi, PDO::PARAM_INT);
  $req2->bindParam('gn', $gn, PDO::PARAM_STR);
  $req2->execute();
  if(!$req2) { var_dump($pdo->errorInfo()); }
}