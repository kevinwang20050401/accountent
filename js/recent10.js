var fdb = new ForerunnerDB();
var db = fdb.db("mydb");
var accountingCollection = db.collection("accounting");
accountingCollection.load();
function cahs(date,kind,item,cost){
    return "<tr><td>"+date+"</td><td>"+kind+"</td><td>"+item+"</td><td>"+cost+"</td></tr>"
}
setTimeout(function(){
	var accountings=accountingCollection.find(
	{},
	{
		$orderBy:{date:-1},
		$limit:10
	    }
    );	
    for (var i = 0; i < accountings.length; i++) {
    	$("#accountingTable").append(cahs(accountings[i].date,accountings[i].kind,accountings[i].item,accountings[i].cost))
    }
},500)