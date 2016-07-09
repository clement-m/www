// ajaxQuery.js

/**
 * createMatch
 * @param m
 * @param s
 */
function createMatch(m,s,t) {
    t++;
    $.ajax({ url: "LIB/smLib/base/match/createMatch.php", type: "POST", data: "matchid="+m,
        success: function (json) {
            var response = JSON.parse(json);
            switch (response.response) {
                case "create": showMatch(m,s); break;
                case "ready":
                    noMatchListener();
                    showQuickMatch(response.res);
                    break;
                case "notfinish":
                    if(t == 2) {
                        recreateMatchError(m,s);
                    }else{
                        setTimeout(function(){
                            createMatch(m,s,t);
                        }, 4000);
                    }
                    break;
            }
        }
    });
}

/**
 * showQuickMatch
 * @param dataMatch
 */
function showQuickMatch(dataMatch) {
    $('#table').empty();

    dataMatch.forEach(function(e){
        e.kda = kdaToString(e.kills,e.deaths,e.assists,e.nbMatch);
        e.queueId = kdaToImgName(e.queueId);
    });

    $.ajax({ url: "LIB/smLib/base/match/quickMatch.php", type: "POST", data: "dataMatch="+JSON.stringify(dataMatch),
        success: function (html) {
            var response = JSON.parse(html);
            response.team1HTML.forEach(function(data){
                $('#team1').append(data);
            });
            response.team2HTML.forEach(function(data){
                $('#team2').append(data);
            });

            bindStartButton();
        }
    });
}

/**
 * recreateMatchError
 * @param m
 */
function recreateMatchError(m,s) {
    $.ajax({ url: "LIB/smLib/base/match/recreateMatch.php", type: "POST", data: "matchid="+m });
    showMatch(m,s);
}



/*
 * show rank with BDD
 * ==> Called avec event htmlChange /!\
 */
function showRankByBDD(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "LIB/smLib/base/rank/getRankByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&m="+m,
        success: function(rank) {
            if(rank == '{"":""}') {
                showRankByApi(v);
            } else {
                rank = JSON.parse(rank);
                rank = rank.rank;
                showRank(rank,v,"");
                showKdaByBdd(v);
            }

        }
    });
}

/*
 * show kda by BDD
 */
function showKdaByBdd(v){
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "LIB/smLib/base/kda/getKdaByBdd.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q+"&m="+m,
        success: function(kda) {
            if(kda == '') {
                showKdaByApi(v);
            } else {
                showKda(kda,v,q,"");
            }
            showLeagueByBdd(v);
        }
    });
}

/*
 * show League BDD
 */
function showLeagueByBdd(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "LIB/smLib/base/league/getLeagueByBdd.php", type: "POST",
        data: "pi="+pi+"&q="+q+"&m="+m,
        success: function(league) {
            if(league == '')
                showLeagueByApi(v);
            else
                showLeague(league,v,m,"");
        }
    });
}