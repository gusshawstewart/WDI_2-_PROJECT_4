var express      = require("express");
var app          = express();
var env          = require("./config/environment");
var mongoose     = require("mongoose");
var User         = require("./models/user")


app.use(express.static(__dirname +"/public"));
app.use(express.static(__dirname +"/bower_components"));


app.get("/api/users", function(req,res, next){
  User.find({}).then(function(users){
   return res.status(200).json({ users: users});
   });  
 });


app.get("/*", function(req, res, next){
   return res.sendFile(__dirname + "/public/index.html");
 });
 
 connect()
     .on('error', console.log)
     .on('disconnected', connect)
     .once('open', listen);
 
 function listen(){
   return app.listen(env.port, startup);
 }
 
 function connect(){
   return mongoose.connect(env.databaseUrl).connection;
 }
 
 function startup(){
   console.log("listening we are")
 };