var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dbadmin",
  password: "lockSmith123!@#",
  database: "snow"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/fileupload', function(req, res) {
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
		
		var sql = "INSERT INTO item (name, description, price, owner) VALUES ('"+fields.name+"', '"+fields.description+"', '"+fields.price+"', 1)";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	});
	
	
});
app.listen(8080);