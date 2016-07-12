var watson = require('watson-developer-cloud');
var fs = require('fs');

var Translation = require('../models/Translation');
 
var speech_to_text = watson.speech_to_text({
  username: '26110915-e3c3-4da9-a16a-134cb69952c0',
  password: 'rBvYFk6PfWOE',
  version: 'v1'
});
 
var params = {
  // From file 
  audio: fs.createReadStream('./resources/test.wav'),
  content_type: 'audio/wav; rate=44100'
};

function getTranslation(request, response) {

  Translation.find({}, function(error, translations) {
    if(error) return response.status(404).send(error);

    response.status(200).send(translations);
  }).select('-__v');
}


function createTranslation(request, response){

  var translation = new Translation(request.body);

  speech_to_text.recognize(params, function(err, watson_res) {
    if (err) return response.status(404).send(err);

    translation.transcript = watson_res.results[0].alternatives[0].transcript;

    translation.save(function(error, translation){

      if(error) return response.status(500).json(error);
      response.status(200).send(translation);
      console.log("saved!")
    });
  });
}


// function usersIndex(req, res){
//   User.find({}, function(err, users) {
//     if (err) return res.status(404).send(err);
//     res.status(200).send(users);
//   });
// }

module.exports = {
  createTranslation: createTranslation,
  getTranslation: getTranslation
}