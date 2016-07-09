


/*
 * show rank with API
 */
function showRankByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "LIB/smLib/API/rank/getRankByApi.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&m="+m,
        success: function(rank) {
            showRank(rank,v,"");
            showKdaByApi(v);
            showLeagueByBdd(v);
        }
    });
}

/*
 * show kda by API
 */
function showKdaByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var gi = $(v).children('.god').attr('data-godId');
    var m = $(v).attr('data-matchId');
    var q = $('#mod').attr('data-idMod');

    $.ajax({
        url: "LIB/smLib/API/kda/getKdaByAPI.php", type: "POST",
        data: "pi="+pi+"&gi="+gi+"&q="+q+"&m="+m,
        success: function(kda) {
            showKda(kda,v,q,"");
        }
    });
}

/*
 * show League API
 */
function showLeagueByApi(v) {
    var pi = $(v).children('.player').attr('data-playerId');
    var m = $(v).attr('data-matchId');

    $.ajax({
        url: "LIB/smLib/API/league/getLeagueByAPI.php", type: "POST",
        data: "pi="+pi+"&m="+m,
        success: function(league) {
            showLeague(league,v,m,"");
        }
    });
}