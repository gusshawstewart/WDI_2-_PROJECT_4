var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    var multer      = require('multer');
    var upload = multer();

var watsonController = require('../controllers/watson');

router.route('/transcripts')
    .get(watsonController.getTranslation)
    .post(upload.single('file') , watsonController.createTranslation);


module.exports = router