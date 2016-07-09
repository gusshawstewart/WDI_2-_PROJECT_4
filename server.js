var express      = require("express");
var app          = express();
var env          = require("./config/environment");
var mongoose     = require("mongoose");
var bodyParser   = require("body-parser");
var passport     = require("passport");
var jwt          = require("jsonwebtoken");
var expressJWT   = require("express-jwt");


app.use(express.static(__dirname +"/public"));
app.use(express.static(__dirname +"/bower_components"));

app.get("/*", function(req, res, next){
  return res.sendFile(__dirname + "/public/index.html");
});

app.listen(env.port, startup);
 
 function startup(){
   console.log("listening we are")
 };