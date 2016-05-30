var express = require('express');
var router = express.Router();

var fs = require('fs');
var url = require("url");
var apiclient = require("omdb-api-client");
var omdb = new apiclient();

var path = require("path");
/* GET home page. */
router.delete('/', function(req, res, next) {
	console.log("requestedPath  " +req.url);
	var title =  req.url.substring(req.url.indexOf("title")+6).trim() ;
	var jsonFile = fs.readFileSync('data/movies_db.json');
	var json = JSON.parse(jsonFile);
	for (var i = 0;i<json.length;  i++) {
		if(json[i].title == title){
			json.splice(i,1);
		}
	}
	console.log("JSON  " +json);
	var fullJSON = JSON.stringify(json);
	fs.writeFileSync('data/movies_db.json', fullJSON);
	/*fs.readFile('mainPage.html', function (err, data) {
	    if (err) return console.log(err);
	    res.writeHead(200, { 'Content-Type': 'text/html' });
	    res.send(data, 'utf-8');
	    res.end();
	    console.log("html is read");
	});*/
	res.render('index', { title: 'Express' });
});
module.exports = router;
