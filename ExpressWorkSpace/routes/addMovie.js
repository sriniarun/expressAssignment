var express = require('express');
var router = express.Router();

var fs = require('fs');
var url = require("url");
var omdb = require("node-movie");

var path = require("path");
/* GET home page. */
router.post('/', function(req, res, next) {
	var requestedPath=req.url;
	console.log("requestedPath  " +requestedPath);
	//var title =  requestedPath.substring(requestedPath.indexOf("movieName")+10).trim().split("%20").join(" ");
	var title = req.query.movieName;
	console.log("title  " +title);
	omdb(title,function(err, movies) {
	    if(err) {
	        return console.error("this error :   "+err);
	    }
	    if(movies.length < 1) {
	        return console.log('No movies were found!');
	    }else {
			console.log("Movie Json  " +movies);
			  var jsonFile = fs.readFileSync('data/movies_db.json');
			  var json = JSON.parse(jsonFile);
			  json.push(movies);
			  var fullJSON = JSON.stringify(json);
			  fs.writeFileSync('data/movies_db.json', fullJSON);

  res.render('index', { title: 'Express' });
	    }
	});
});

module.exports = router;
