var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');

var sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lockSmith123!@#",
  database: "snow"
});

var sslOptions = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}

var hostname = "localhost";
var port = 3000;

//	for default local setup
//var hostname = "localhost";
///var port = 3000;

//var hostname = "192.168.1.2";
//var port = 8080;

//var hostname = "96.231.60.21";
//var hostname = "108.31.106.35";
//var port = 169;
//ng serve --host 192.168.1.2 --port 168

sql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/'));
//app.use(express.static(__dirname + '/dist'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/login', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var query = "SELECT id, supplier FROM users WHERE username='" + fields.username + "' AND password='" + fields.password + "'";
		sql.query(query, function (err, result) {
			console.log(err);
			console.log(result);
			if (err) throw err;
			res.send(result);
		});
	});
});

app.post('/fileupload/:id', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var file = files[Object.keys(files)[0]];
		var oldpath = file.path;
		var newpath = __dirname + '/images/' + file.name;
		fs.rename(oldpath, newpath, function (err) {
			if (err) {
				console.log(err);
			}
			console.log('File uploaded and moved!');
		});
		for (var key in fields) {
			fields[key] = fields[key].replace("'", "''");
		}
		for (var key in fields) {
			if (fields[key] == "null") {
				fields[key] = "default";
			} else {
				fields[key] = "'" + fields[key] + "'";
			}
		}
		var query = "INSERT INTO items (name, description, category, price, owner, image, barcode) VALUES ("+fields.name+", "+fields.description+", "+fields.category+", "+fields.price+", "+req.params.id+", '/images/"+file.name+"', "+fields.barcode+")";
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			res.send(result);
		});
	});
});

app.post('/edititem/:id', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		for (var key in fields) {
			fields[key] = fields[key].replace("'", "''");
		}
		var query = "UPDATE items SET name='"+fields.name+"', description='"+fields.description+"', category='"+fields.category+"', price='"+fields.price+"', stock='"+fields.stock+"' WHERE id="+req.params.id;
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record updated");
			res.send(result);
		});
	});
});

app.post('/addaccount', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {		
		console.log(fields);
		for (var key in fields) {
			fields[key] = fields[key].replace("'", "''");
		}
		var query = "INSERT INTO users (firstname, lastname, email, phone, storename, storeaddress, username, password, supplier) VALUES ('"+fields.firstname+"', '"+fields.lastname+"', '"+fields.email+"', '"+fields.phone+"', '"+fields.storename+"', '"+fields.storeaddress+"', '"+fields.username+"', '"+fields.password+"', "+fields.supplier+")";
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			res.send(result);
		});
	});
});

app.post('/subscribe/:id', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var query = "SELECT * FROM subscriptions WHERE subscriber="+req.params.id+" AND subscribed="+fields.iid;
		sql.query(query, function (err, result) {
			console.log(err);
			console.log(result);
			console.log(fields);
			if (result.length == 0) {
				// make new request
				var query = "INSERT INTO requests (requestor, requested, quantity) VALUES ("+req.params.id+", "+fields.iid+", "+fields.quantity+")";
				sql.query(query, function (err, result) {
					console.log(err);
					console.log(result);
					var requestId = result.insertId;
					// make new subscription
					var query = "INSERT INTO subscriptions (subscriber, subscribed, request) VALUES ("+req.params.id+", "+fields.iid+", "+requestId+")";
					sql.query(query, function (err, result) {
						console.log(err);
						console.log(result);
						res.send(result);
					});
				});
			} else {
				var requestId = result[0].request;
				var subscriptionId = result[0].id;
				if (requestId == null) {
					// make new request
					var query = "INSERT INTO requests (requestor, requested, quantity) VALUES ("+req.params.id+", "+fields.iid+", "+fields.quantity+")";
					sql.query(query, function (err, result) {
						console.log(err);
						console.log(result);
						var requestId = result.insertId;
						// update subscription
						var query = "UPDATE subscriptions SET request="+requestId+" WHERE id="+subscriptionId;
						sql.query(query, function (err, result) {
							console.log(err);
							console.log(result);
							res.send(result);
						});
					});
				} else {
					// update existing request
					var query = "UPDATE requests SET quantity="+fields.quantity+" WHERE id="+requestId;
					sql.query(query, function (err, result) {
						console.log(err);
						console.log(result);
						res.send(result);
					});
				}
			}
		});
	});
});

app.get('/allShopItems/:id', function(req, res) {
	var query = "SELECT * FROM items WHERE owner=" + req.params.id + " ORDER BY category";

	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

/*
app.get('/allSubscribedItems/:id', function(req, res) {
	var query = "SELECT * FROM subscriptions RIGHT JOIN items ON subscriptions.subscribed = items.id WHERE subscriptions.subscriber=" + req.params.id;
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});
*/

app.get('/item/:id', function(req, res) {
	var query = "SELECT * FROM items WHERE id=" + req.params.id;
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/itemByBarcode/:barcode', function(req, res) {
	var query = "SELECT * FROM items WHERE barcode=" + req.params.barcode;
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/allItems', function(req, res) {
	var query = "SELECT * FROM items";
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/allItemsAndOwner/:filter', function(req, res) {
	var query = "SELECT *, items.id as iid, users.id as uid FROM snow.items LEFT JOIN users on items.owner=users.id WHERE price <=" + req.params.filter;
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});


app.get('/shopInfo/:id', function(req, res) {
	var query = "SELECT * FROM users WHERE id=" + req.params.id + " LIMIT 1";
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/shopperInfo/:id', function(req, res) {
	var query = "SELECT * FROM users WHERE id=" + req.params.id + " LIMIT 1";
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/requests/:id', function(req, res) {
	var query = "SELECT *, r.id as rid FROM subscriptions as s LEFT JOIN requests as r ON s.request=r.id LEFT JOIN users as u ON r.requestor=u.id LEFT JOIN items as i ON s.subscribed = i.id WHERE i.owner=" + req.params.id + " ORDER BY r.requestor";

	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/getAllRequestedItems/:id', function(req, res) {
	var query = "SELECT *, r.id as rid, i.id as iid FROM subscriptions as s LEFT JOIN requests as r ON s.request=r.id LEFT JOIN items as i ON s.subscribed = i.id LEFT JOIN users as u ON i.owner=u.id WHERE s.subscriber=" + req.params.id + " ORDER BY i.owner";

	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});





app.post('/setBy/:id', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var newDate = fields.by;
		newDate = new Date(newDate);
		newDate = newDate.toISOString();
		newDate = newDate.replace('T', ' ');
		newDate = newDate.split('.');
		newDate = newDate[0];
		var query = "UPDATE requests SET `by`='"+newDate+"', `status`='accepted', state=1 WHERE id="+req.params.id;
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			console.log(result);
			res.send(result);
		});						
	});
});

app.post('/setReceived/:id', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var newDate = new Date();
		newDate = newDate.toISOString();
		newDate = newDate.replace('T', ' ');
		newDate = newDate.split('.');
		newDate = newDate[0];
		console.log(newDate);
		var query = "UPDATE requests SET `received`='"+newDate+"', `status`='received', state=2 WHERE id="+req.params.id;
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			console.log(result);
			//	auto renew
			var query = "INSERT INTO requests (requestor, requested, quantity) VALUES ("+fields.requestor+", "+fields.iid+", "+fields.quantity+")";
			sql.query(query, function (err, result) {
				console.log(err);
				console.log(result);
				var requestId = result.insertId;
				// update subscription
				var query = "UPDATE subscriptions SET request="+requestId+" WHERE subscriber="+fields.requestor+" AND subscribed="+fields.iid;
				sql.query(query, function (err, result) {
					console.log(err);
					console.log(result);
					res.send(result);
				});
			});
		});						
	});
});

app.listen(port, hostname);
//https.createServer(sslOptions, app).listen(port, hostname);