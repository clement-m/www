<?php

include_once('../API.php');
$M = new API();
$r = $M->testSession($_POST['session']);
echo $r;