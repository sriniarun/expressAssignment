var express = require("express");
var app = express();
var fs = require('fs');
var url = require("url");
var apiclient = require("omdb-api-client");
var omdb = new apiclient();
var replace = require("replace");
var path = require("path");
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  console.log("requestedPath" + req.url);
	var requestedPath= req.url; 
	  fs.readFile('mainPage.html', function (err, data) {
	    if (err) return console.log(err);
	    res.writeHead(200, { 'Content-Type': 'text/html' });
	    res.end(data, 'utf-8');
	    res.end();
	    console.log("html is read");
	});
});

app.delete('/delete',function(req,res){
	console.log("requestedPath  " +req.url);
	var title =  req.url.substring(req.url.indexOf("title")+6).trim() ;
	var jsonFile = fs.readFileSync('./js/movies_db.json');
	var json = JSON.parse(jsonFile);
	for (var i = 0;i<json.length;  i++) {
		if(json[i].title == title){
			json.splice(i,1);
		}
	}
	console.log("JSON  " +json);
	var fullJSON = JSON.stringify(json);
	fs.writeFileSync('./js/movies_db.json', fullJSON);
	/*fs.readFile('mainPage.html', function (err, data) {
	    if (err) return console.log(err);
	    res.writeHead(200, { 'Content-Type': 'text/html' });
	    res.send(data, 'utf-8');
	    res.end();
	    console.log("html is read");
	});*/
});

app.post("/add",function(req,res){
	var requestedPath=req.url;
	console.log("requestedPath  " +requestedPath);
	//var title =  requestedPath.substring(requestedPath.indexOf("movieName")+10).trim().split("%20").join(" ");
	var title = req.query.movieName;
	console.log("title  " +title);
	omdb({t:title}).list(function(err, movies) {
	    if(err) {
	        return console.error(err);
	    }
	    if(movies.length < 1) {
	        return console.log('No movies were found!');
	    }else {
			console.log("Movie Json  " +movies);
			  var jsonFile = fs.readFileSync('./js/movies_db.json');
			  var json = JSON.parse(jsonFile);
			  json.push(movies);
			  var fullJSON = JSON.stringify(json);
			  fs.writeFileSync('./js/movies_db.json', fullJSON);
	    }
	});
});

app.post("/Update",function(req,res){
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
		
		var jsonFile = fs.readFileSync('./js/movies_db.json');
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
		fs.writeFile('./js/movies_db.json', fullJSON);
		res.redirect("/");
		/*fs.readFile('mainPage.html', function (err, data) {
		    if (err) return console.log(err);
		    res.writeHead(200, { 'Content-Type': 'text/html' });
		    res.send(data, 'utf-8');
		    res.end();
		    console.log("html is read");
		});*/
		//res.sendFile(path.join(__dirname,'/mainPage.html'));    
	});

app.listen(8080, function () {
  console.log('Server on port 8080!');
});
