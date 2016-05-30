var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(process.cwd());
  console.log(__dirname+"/data/movies_db.json");
  var path = process.cwd()+'/data/movies_db.json';
  console.log(path);
  var jsonFile ;
  fs.readFile(path,function(err,data){
  	console.log("am in");
  	if(err)  console.log(err);

  	jsonFile = JSON.parse(data);
  console.log(jsonFile);
  res.json(jsonFile.toString());
  });
});


module.exports = router;

