    var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    var multer      = require('multer');
    var upload = multer();
    var watsonController = require('../controllers/watson');
    var usersController = require('../controllers/usersController');
    var authenticationsController = require('../controllers/authenticationsController');



router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);


  router.route('/transcripts')
      .get(watsonController.getTranslation)
      .post(upload.single('file') , watsonController.createTranslation);  

router.route('/transcripts/:id')
.delete(watsonController.removeTranslation)



module.exports = router;
