/**
 * appel la routine de mise à jours des nouveaux dieux
 * @param m match
 * @param s session
 * @param q queue
 * @param ml masteryLevel
 * @param al account level
 * @param tf taskforce
 * @param gn godname
 * @param pi playerId
 * @param pn playerName
 * @param gi godId
 */
function showMatchProcedure(m, s, q, ml, al, tf, gn, pi, pn, gi) {
    $.ajax({
        url: "LIB/smLib/API/players/showMatchProcedure.php", type: "POST",
        data: "m="+m+"&s="+s+"&q="+q+"&ml="+ml+"&pn="+pn+"&al="+al+"&tf="+tf+"&gi=" + gi + "&gn=" + gn + "&pi=" + pi,
        success: function (html) {
            $('#team'+tf).append(html);
        }
    });
}