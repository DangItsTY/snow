var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');

var sql = mysql.createConnection({
  host: "localhost",
  user: "dbadmin",
  password: "lockSmith123!@#",
  database: "snow"
});

var hostname = "192.168.1.2";
var port = 8080;
//var port = 169;
//ng serve --host 192.168.1.2 --port 168

sql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/login', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var query = "SELECT id, supplier FROM users WHERE username='" + fields.username + "'";
		sql.query(query, function (err, result) {
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
			if (err) throw err;
			res.write('File uploaded and moved!');
			res.end();
		});
		var query = "INSERT INTO items (name, description, price, owner, image) VALUES ('"+fields.name+"', '"+fields.description+"', '"+fields.price+"', "+req.params.id+", '/images/"+file.name+"')";
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	});
});

app.post('/addaccount', function(req, res) {
    var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {		
		console.log(fields);
		/*
		if (fields.supplier == 'true') {
			fields.supplier = true;
		} else {
			fields.supplier = false;
		}
		console.log(fields.supplier);
		*/
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
		var query = "SELECT * FROM subscriptions WHERE subscriber="+req.params.id+" AND subscribed="+fields.id;
		sql.query(query, function (err, result) {
			console.log(err);
			console.log(result);
			if (result.length == 0) {
				// make new request
				var query = "INSERT INTO requests (requestor, item, quantity) VALUES ("+req.params.id+", "+fields.id+", "+fields.amount+")";
				sql.query(query, function (err, result) {
					console.log(err);
					console.log(result);
					var requestId = result.insertId;
					// make new subscription
					var query = "INSERT INTO subscriptions (subscriber, subscribed, request) VALUES ("+req.params.id+", "+fields.id+", "+requestId+")";
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
					var query = "INSERT INTO requests (requestor, item, quantity) VALUES ("+req.params.id+", "+fields.id+", "+fields.amount+")";
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
					var query = "UPDATE requests SET quantity="+fields.amount+" WHERE id="+requestId;
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
	var query = "SELECT * FROM items WHERE owner=" + req.params.id;
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/allSubscribedItems/:id', function(req, res) {
	var query = "SELECT * FROM subscriptions RIGHT JOIN items ON subscriptions.subscribed = items.id WHERE subscriptions.subscriber=" + req.params.id;
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
	var query = "SELECT *, r.id as rid FROM subscriptions as s RIGHT JOIN requests as r ON s.request=r.id RIGHT JOIN items as i ON s.subscribed = i.id WHERE i.owner=" + req.params.id;

	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.get('/getAllRequestedItems/:id', function(req, res) {
	var query = "SELECT *, r.id as rid FROM subscriptions as s RIGHT JOIN requests as r ON s.request=r.id RIGHT JOIN items as i ON s.subscribed = i.id WHERE s.subscriber=" + req.params.id;
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
			res.send(result);
		});						
	});
});

app.listen(port, hostname);