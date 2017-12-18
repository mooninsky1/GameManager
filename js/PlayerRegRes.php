<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<head>
<title>统计在玩家注册 </title>
</head>
<body>
<h1> 统计在玩家注册 </h1>
<h2> 
<?php 
	error_reporting(0);
	echo '<p>Order processd at'.date('H:i,jS F Y').'</p>';
	$mongo = new Mongo();
	$dbs = $mongo->listDBs();
	$db = $mongo ->selectDB("TraceOne"); 
	$collection = $db->selectCollection("PlayerRegRes");
	$cursor = $collection->find();
	if($cursor == NULL)
	{
		print_r("sorry not found");
	}
	else
	{
		var_dump(iterator_to_array($cursor));
		//print_r("day_login_num:".$cursor["day_login_num"]."\n");
		//print_r("week_login_num:".$cursor["week_login_num"]."\n");
		//print_r("month_login_num:".$cursor["month_login_num"]."\n");
	}
	$mongo->close();
	echo "<a href='./ossmanu.html'>点击返回</a>";
?>
</h2>
</body>
</html>