
// www/SRC/js/html/html.js

/**
 * showPanelMatch
 */
function showPanelMatch() {
    $('#panelMatch').show();
}

/**
 * setNbMatchReach
 * @param q
 */
function setNbMatchReach(q){
    switch (q) {
        case "440": q = 2; break;
        case "448": q = 6; break;
        case "450": q = 6; break;
        case "459": q = 8; break;
        case "435": q = 10; break;
        case "451": q = 10; break;
        case "426": q = 10; break;
        case "466": q = 10; break;
        case "445": q = 10; break;
    }
    $('#nbTotalReach').val(q);
}

/**
 * showMatch
 * @param m
 * @param s
 */
function showMatch(m,s) {
    $.ajax({
        url: "LIB/smLib/API/players/getPlayers.php", type: "POST",
        data: "matchid="+m,
        success: function(json) {
            var players = JSON.parse(json);
            players.forEach(function(player) {
                var Account_Level = player.Account_Level;
                var GodName = player.GodName;
                var mastery_Level = player.Mastery_Level;
                var Queue = player.Queue;
                var playerName = player.playerName;
                var playerId = player.playerId;
                var godId = player.GodId;
                var taskForce = player.taskForce;

                setNbMatchReach(Queue);

                setMod(Queue);

                playerId = parseInt(playerId);
                showMatchProcedure(m,s,Queue,mastery_Level, Account_Level, taskForce, GodName, playerId, playerName, godId);
            });
        }
    });
}





/*
 * clearBoard
 * vide le tableau de match
 */
function clearBoard() {
    $('#team1').empty();
    $('#team2').empty();
}

/*
 * emptyTableMatch
 * vide la table de match
 */
function emptyTableMatch() { $('#match').empty(); }

/**
 * showHelpBox
 */
function showHelpBox() {
    $('#helpBox').show();
}

/**
 * hideHelpBox
 */
function hideHelpBox() {
    $('#helpBox').hide();
}

/**
 * showTutorial
 */
function showTutorial() {
    $("#tutorial").show();
}

/**
 * displayStatus
 * @param t
 */
function displayStatus(t) {
    if(t == "Unknown") t = 'Player profile is hidden';
    else if(t == null) t = 'Player\'s status is changing retry';
    $('#playerStatus').text(t);
}

/**
 * setMod
 * @param Q
 */
function setMod(Q) {
    $('#mod').attr('data-idMod',Q);
    $text = Q;
    switch (Q) {
        case "435": $text = 'Normal: Arena'; break;
        case "448": $text = 'Normal: Joust'; break;
        case "426": $text = 'Normal: Conquest'; break;
        case "466": $text = 'Normal: Clash'; break;
        case "445": $text = 'Normal: Assault'; break;
        case "459": $text = 'Normal: Siege'; break;

        case "440": $text = 'Ranked: Duel'; break;
        case "450": $text = 'Ranked: Joust'; break;
        case "451": $text = 'Ranked: Conquest'; break;
        //case "434": $text = 'Normal: MOTD'; break;
        //case "438": $text = 'Custom: Arena'; break;
    }

    if($text == Q) {
        $text = "mod not done for smite-pantheon";
        bindStartButton();
    }

    $('#mod').text($text);
}

/**
 * changeTeamEvent
 * @param $team
 */
function changeTeamEvent($team) {
    var mod = $('#mod').text();

    var len = (mod == 'Ranked: Duel')
        ? $('.table'+' tr').length
        : $('#team'+$team+' tr').length;

    if ((mod == 'Ranked: Duel' && len > 1)
        || ((mod == 'Normal: Joust' || mod == 'Ranked: Joust') && len > 2)
        || (mod == 'Normal: Siege' && len > 3)
        || ((mod == 'Ranked: Conquest' || mod == 'Normal: Clash' || mod == 'Normal: Arena' || mod == 'Normal: Assault' || mod ==  "Normal: Conquest") && len > 4)
    ) {
        $('#team'+$team).off("DOMSubtreeModified");

        $('#team'+$team+' tr').each(function(k,v) {
            var playerName = $(v).children('.player').text();
            if(playerName != 'Player profile hidden') showRankByBDD(v);
            else addHiddenPlayerInMatch(v);
        });
    }
}

/**
 * incPlayerReady
 */
function incPlayerReady() {
    $('#nbTotalReached').val(parseInt($('#nbTotalReached').val())+1);
}

/**
 * checkFinish
 */
function checkFinish(m) {
    if($('#nbTotalReached').val() == $('#nbTotalReach').val()) {
        bindStartButton();
        $.ajax({ url: "LIB/smLib/base/match/finishMatch.php", type: "POST", data: "m="+m });
    }
}

/**
 * initReachTotal
 */
function initReachTotal() {
    $('#nbTotalReach').val("");
    $('#nbTotalReached').val("0");
}

/**
 * addHiddenPlayerInMatch
 * ajoute un utilisateur caché avec les valeurs à "joueur caché"
 * @param v
 */
function addHiddenPlayerInMatch(v) {
    $(v).children('.godrank').empty();
    $(v).children('.kda').empty();
    $(v).children('.leagueWrapper').empty();

    $(v).children('.godrank').append('<img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />');
    $(v).children('.kda').append('<img class="masteryLevel img-responsive newLeague" src="SRC/IMG/hidden.jpg" />');
    $(v).children('.leagueWrapper').append('<div class="leagueName"></div><img class="masteryLevel img-responsive" src="SRC/IMG/hidden.jpg" />');
    incPlayerReady();
}

/**
 * showRank
 * @param rank
 * @param v
 */
function showRank(rank,v,way) {
    $(v).children('.godrank').empty();
    $(v).children('.godrank').append('<img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m'+rank+'.jpg" alt="level '+rank+'" />' + way);
}

/**
 * showKda
 * @param kda
 * @param v
 * @param q
 */
function showKda(kda,v,q,way) {
    $(v).children('.kda').empty();
    $(v).children('.kda').append((kda == "" || kda == "0") ? '<img class="masteryLevel img-responsive newLeague" src="SRC/IMG/modNoKda/'+kdaToImgName(q)+'.jpg" alt="new" />' + way: kda + way);
}

/**
 * kdaToString
 * @param k
 * @param d
 * @param a
 * @param nb
 * @param q
 * @returns {string}
 */
function kdaToString(k,d,a,nb) {
    var K = (k == 0) ? 0 : k / nb;
    var D = (d == 0) ? 0 : d / nb;
    var A = (a == 0) ? 0 : a / nb;

    K = parseFloat(K.toFixed(2));
    D = parseFloat(D.toFixed(2));
    A = parseFloat(A.toFixed(2));

    var PMI = (D == 0)
        ? K + A
        : (K + A) / D;

    PMI = parseFloat(PMI).toFixed(2);

    return K + "/" + D + "/" + A + " pmi: " + PMI;
}

/**
 * kdaToImgName
 * @param q
 * @returns {*}
 */
function kdaToImgName(q) {
    switch(q) {
        case "448": return 'joust'; break;
        case "440": return 'joust'; break;
        case "450": return 'joust'; break;
        case "459": return 'siege'; break;
        case "435": return 'arena'; break;
        case "451": return 'conquest'; break;
        case "426": return 'conquest'; break;
        case "466": return 'clash'; break;
        case "445": return 'assault'; break;
    }
}

/**
 * leagueNameToImg
 * @param name
 * @returns {*}
 */
function leagueNameToImg(name){
    switch (name) {
        case "unranked": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/unranked.jpg" alt="unranked" />'; break;
        case "bronze": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/bronze.jpg" alt="bronze" />'; break;
        case "silver": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/silver.jpg" alt="silver" />'; break;
        case "gold": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/gold.jpg" alt="gold" />'; break;
        case "platine": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/platinium.jpg" alt="platinium" />'; break;
        case "platinium": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/platinium.jpg" alt="platinium" />'; break;
        case "diamond": return '<img class="masteryLevel img-responsive leftFloat" src="SRC/IMG/ranks_icons/diamond.jpg" alt="diamond" />'; break;
    }
}

/**
 * leagueNumToImg
 * @param num
 * @returns {string}
 */
function leagueNumToImg(num) {
    return (num != "")
        ? '<img class="masteryLevel img-responsive" src="SRC/IMG/masteryLvl/m'+num+'.jpg" alt="'+num+'" />'
        : "";
}

/**
 * showLeague
 * @param league
 * @param v
 */
function showLeague(league,v,m,way) {
    league = JSON.parse(league);

    $(v).children('.conquest').empty();
    $(v).children('.joust').empty();
    $(v).children('.duel').empty();

    $(v).children('.conquest').append(leagueNameToImg(league.conquest.name) + leagueNumToImg(league.conquest.num) + way);
    $(v).children('.joust').append(leagueNameToImg(league.joust.name) + leagueNumToImg(league.joust.num) + way);
    $(v).children('.duel').append(leagueNameToImg(league.duel.name) + leagueNumToImg(league.duel.num) + way);

    $(v).attr('data-done','done');
    incPlayerReady();
    checkFinish(m);
}