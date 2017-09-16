var fdb = new ForerunnerDB();
var db = fdb.db("mydb");
var accountingCollection = db.collection("accounting");
accountingCollection.load();

function cahs(date, kind, item, cost) {
    return "<tr><td>" + date + "</td><td>" + kind + "</td><td>" + item + "</td><td>" + cost + "</td></tr>"
}
$("#lookup").click(function() {
    if ($('input[name=method]:checked').val() == "curmonth") {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var months = date.getUTCMonth() + 2;
        if (month < 10) {
            month = "0" + month;
        }
        var datestring = year + "-" + month + "-" + "01";
        var datestrings = year + "-" + months + "-" + "01";
        console.log(datestring)
        var accountings = accountingCollection.find({
            date: {
                $gte: datestring,
                $lte: datestrings
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(cahs(accountings[i].date, accountings[i].kind, accountings[i].item, accountings[i].cost))
        }
        var eatcost = 0;
        var wearcost = 0;
        var livecost = 0;
        var tracost = 0;
        var educost = 0;
        var funcost = 0;
        var othercost = 0;
        for (var i = 0; i < accountings.length; i++) {
            if (accountings[i].kind == "食") {
                eatcost += accountings[i].cost / 1
            } else if (accountings[i].kind == "衣") {
                wearcost += accountings[i].cost /
                    1
            } else if (accountings[i].kind == "住") {
                livecost += accountings[i].cost / 1
            } else if (accountings[i].kind == "行"){
            	tracost += accountings[i].cost / 1
            } else if (accountings[i].kind == "育"){
            	educost += accountings[i].cost / 1
            } else if (accountings[i].kind == "樂"){
            	funcost += accountings[i].cost / 1
            } else if (accountings[i].kind == "其他") {
            	othercost += accountings[i].cost / 1
            }
        }
        var totalcost = eatcost + wearcost + livecost + tracost + educost + funcost + othercost;
        var eap = Math.round((eatcost/totalcost)*100)+"%";
        var wep = Math.round((wearcost/totalcost)*100)+"%";
        var lip = Math.round((livecost/totalcost)*100)+"%";
        var trp = Math.round((tracost/totalcost)*100)+"%";
        var edp = Math.round((educost/totalcost)*100)+"%";
        var fup = Math.round((funcost/totalcost)*100)+"%";
        var otp = Math.round((othercost/totalcost)*100)+"%";
        $("#eac").text(eatcost)
        $("#eap").text(eap)
        $("#weac").text(wearcost)
        $("#wep").text(wep)
        $("#lic").text(livecost)
        $("#lip").text(lip)
        $("#trc").text(tracost)
        $("#trp").text(trp)
        $("#edc").text(educost)
        $("#edp").text(edp)
        $("#fuc").text(funcost)
        $("#fup").text(fup)
        $("#otc").text(othercost)
        $("#otp").text(otp)
        $("#toc").text(totalcost)
    } else {
        var fromtime = $("#fromtime").val();
        var totime = $("#totime").val();
        var accountings = accountingCollection.find({
            date: {
                $gte: fromtime,
                $lte: totime
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(cahs(accountings[i].date, accountings[i].kind, accountings[i].item, accountings[i].cost))
        }
    }
});