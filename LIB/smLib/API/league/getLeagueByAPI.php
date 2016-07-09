<?php

// getLeagueByAPI.php

include_once('../apiMethod.php');
$league = getAPILeague($_POST['pi']);
$league = json_encode($league);
echo $league;