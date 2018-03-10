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
		var query = "SELECT id FROM users WHERE username='" + fields.username + "'";
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
		var query = "INSERT INTO users (firstname, lastname, email, phone, storename, storeaddress, username, password) VALUES ('"+fields.firstname+"', '"+fields.lastname+"', '"+fields.email+"', '"+fields.phone+"', '"+fields.storename+"', '"+fields.storeaddress+"', '"+fields.username+"', '"+fields.password+"')";
		sql.query(query, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
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

app.get('/shopInfo/:id', function(req, res) {
	var query = "SELECT * FROM users WHERE id=" + req.params.id + " LIMIT 1";
	sql.query(query, function (err, result) {
		if (err) throw err;
		console.log("query success");
		res.send(result);
	});
});

app.listen(8080);