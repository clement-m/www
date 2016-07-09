/**
 * start
 * @param e
 */
function start(e) {
    e.preventDefault();

    initReachTotal();
    blockStart();

    $('#team1').off('DOMSubtreeModified');
    $('#team2').off('DOMSubtreeModified');
    $('#team1').unbind('DOMSubtreeModified');
    $('#team2').unbind('DOMSubtreeModified');

    $('#team1').on('DOMSubtreeModified', function(e) { changeTeamEvent(1); });
    $('#team2').on('DOMSubtreeModified', function(e) { changeTeamEvent(2); });
    clearBoard();
    getConnection($('#session').val());
}

/**
 *
 */
function noMatchListener() {
    $('#team1').off('DOMSubtreeModified');
    $('#team2').off('DOMSubtreeModified');
    $('#team1').unbind('DOMSubtreeModified');
    $('#team2').unbind('DOMSubtreeModified');
}
/**
 * bindStartButton
 */
function bindStartButton() {
    $('#startInput').on('click', function(e) { if (e.which == 13) start(e); });
    $('#startBtn').on('click', function(e) { start(e); });
}

/**
 * blockStart
 */
function blockStart() {
    $('#startInput').off('click');
    $('#startBtn').off('click');
}

/**
 * document ready
 */
$(document).ready(function() {
    $('#startInput').focus();
    bindStartButton();
    $('#tutorial').on('click',function() {
        $('#tutorial').hide();
        bindStartButton();
    });
    $('#panelMatch').hide();
});

