var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require("url");
var apiclient = require("omdb-api-client");
var omdb = new apiclient();
var path = require("path");

/* GET home page. *//*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
console.log("in update movie");


router.post("/",function(req,res,next){
	var requestedPath=req.url;
		console.log("requestedPath  " +requestedPath);
		var title = req.query.title;
		var year = req.query.year;
		var writers = req.query.writers;
		var actors = req.query.actors;
		var plot = req.query.plot;
		/*var title = requestedPath.substring(requestedPath.indexOf("title")+6,requestedPath.indexOf("&")).trim().split("%20").join(" ") ;
		var year =  (requestedPath.substring(requestedPath.indexOf("year")+5)).substring(0,requestedPath.substring(requestedPath.indexOf("year")+5).indexOf("&")).split("%20").join(" ");
		var writers = (requestedPath.substring(requestedPath.indexOf("writers")+8)).substring(0,requestedPath.substring(requestedPath.indexOf("writers")+8).indexOf("&")).split("%20").join(" ");
		var actors =  (requestedPath.substring(requestedPath.indexOf("actors")+7)).substring(0,requestedPath.substring(requestedPath.indexOf("actors")+7).indexOf("&")).split("%20").join(" ");
		var plot =  (requestedPath.substring(requestedPath.indexOf("plot")+5)).trim().split("%20").join(" ");
		*/
		console.log(" \ntitle   " +title + "\n");
		console.log("year   " +year + "\n");
		console.log("writers   " +writers + "\n");
		console.log("actors   " +actors + "\n");
		console.log("plot   " +plot + "\n"); 
		
		var jsonFile = fs.readFileSync('data/movies_db.json');
		var json = JSON.parse(jsonFile);

		for (var i = 0;i<json.length;  i++) {
			if(json[i].title == title){
				json[i].writers = writers;
				json[i].year = year;
				json[i].actors = actors;
				json[i].plot = plot;
			}
		}
		var fullJSON = JSON.stringify(json);
		console.log("fullJSON \n" + fullJSON);

		fs.writeFile('data/movies_db.json', fullJSON);
		/*fs.readFile('mainPage.html', function (err, data) {
		    if (err) return console.log(err);
		    res.writeHead(200, { 'Content-Type': 'text/html' });
		    res.send(data, 'utf-8');
		    res.end();
		    console.log("html is read");
		});*/
		//res.sendFile(path.join(__dirname,'/mainPage.html'));    
	});

module.exports = router;


