<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<head>
<title>look up usr info </title>
</head>
<body>
<h1> usr info </h1>
<h2> 
<?php 
	error_reporting(0);

	echo '<p>Order processd at'.date('H:i,jS F Y').'</p>';
	//echo $_POST[ 'usrname'];
	$mongo = new Mongo();
	$dbs = $mongo->listDBs();
	//print_r($dbs);
	$db = $mongo ->selectDB("gamedb"); 
	$collection = $db->selectCollection("player");
	//$obj = array( "name" => "111");
	//$query = array( '{},{"name":1,"passwd":1}');
	$cursor = $collection->findOne(array("name"=>$_POST[ 'usrname']));
	if($cursor == NULL)
	{
		print_r("sorry not found");
	}
	else
	{
		print_r("name:".$cursor["name"]."\n");
		print_r("passwd:".$cursor["passwd"]."\n");
		print_r("id:".$cursor["id"]."\n");
		print_r("sex:".$cursor["sex"]."\n");
		print_r("mail:".$cursor["mail"]."\n");
	}
	$mongo->close();
	echo "<a href='./ossmanu.html'>点击返回</a>";
?>
</h2>
</body>
</html>