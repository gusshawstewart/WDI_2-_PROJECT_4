var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var watsonController = require('../controllers/watson');

router.route('/transcripts')
    .get(watsonController.getTranslation)
    .post(watsonController.createTranslation);


module.exports = router