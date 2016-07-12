var express     =   require('express');
var bodyParser  =   require('body-parser');
var cors        = require('cors');
var app         =   express();
var routes      = require('./config/routes');
var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transcriberApp');

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes);

app.listen(3000, console.log("We are up and running...The price of this is ONE beer - of my choice..."));