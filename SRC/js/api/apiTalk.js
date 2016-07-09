/**
 * getConnection
 * @param s
 */
function getConnection(s) {
    $.ajax({
        url: "LIB/smLib/API/apiTalk/testSession.php", type: "POST",
        data: "session="+s,
        success: function(r) {
            if(r.substr(1,8) == "This was") getStatus($('input[name="player"]').val(),s);
            else
                $.ajax({
                    url: "LIB/smLib/API/apiTalk/connection.php", type: "POST",
                    success: function(r) {
                        var r = JSON.parse(r);
                        var response = r.ret_msg;
                        var session = r.session_id;
                        switch (response) {
                            case "Approved":
                                getStatus($('input[name="player"]').val(),session);
                                break;
                            case "Maximum number of active sessions reached.":
                                displayStatus("Smite Pantheon has been too much used today, wait later...");
                                break;
                        }
                    }
                });
        }
    });
}

/**
 * getStatus
 * @param p
 * @param s
 */
function getStatus(p,s) {
    $.ajax({
        url: "LIB/smLib/API/apiTalk/getStatus.php", type: "POST",
        data: "player="+p+"&session="+s,
        success: function(json) {
            var r = JSON.parse(json);
            var statusId = r.status;
            var statusString = r.status_string;
            var matchId = r.Match;
            if(r.ret_msg == "Invalid session id.") return getConnection("");

            displayStatus(statusString);

            switch (statusString) {
                case "In Lobby": showTutorial(); break;
                case "In Game":
                    hideHelpBox();
                    showPanelMatch();
                    break;
                case "God Selection":
                    showHelpBox();
                    bindStartButton();
                    break;
                default:
                    hideHelpBox();
                    bindStartButton();
                    break;
            }

            emptyTableMatch();
            if(statusId == 3) {
                clearBoard();
                createMatch(matchId, s, 0);
            }
        }
    });
}