var fdb = new ForerunnerDB();
var db = fdb.db("mydb");
var accountingCollection = db.collection("accounting");
accountingCollection.load();
$("#sub").click(function(){
	var date=$("#date").val();
	var kind=$("#kind").val();
	var item=$("#item").val();
	var cost=$("#cost").val();
accountingCollection.insert({
    date:date,
    kind:kind,
    item:item,
    cost:cost
});
accountingCollection.save();
alert("儲存成功");
var date=$("#date").val("");
var kind=$("#kind").val("");
var item=$("#item").val("");
var cost=$("#cost").val("");
});