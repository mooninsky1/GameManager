<html>
<head>
<title>Bob 's Auto Parts - Order Results </title>
</head>
<body>
<h1> Bob  's Auto Parts </h1>
<h2> 
<?php 
	echo '<p>Order processd at'.date('H:i,jS F Y').'</p>';
	//echo $_POST[ 'usrname'];
	$mongo = new Mongo();
	$dbs = $mongo->listDBs();
	//print_r($dbs);
	$db = $mongo ->selectDB("gamedb"); 
	$collection = $db->selectCollection("player");
	//$obj = array( "name" => "111");
	//$query = array( '{},{"name":1,"passwd":1}');
	$cursor = $collection->findOne(array("name"=>"111"));
	print_r("passwd:");
	print_r($cursor["passwd"]);
	$mongo->close();
?>
</h2>
</body>
</html>