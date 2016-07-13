angular.module('TranscriberApp')
.controller('TranscriptsController', TranscriptsController);

TranscriptsController.$inject = ['$http'];

function TranscriptsController($http){
  var self = this;
  self.all = [];
  self.addTranscript = addTranscript;
  self.newTranscript = {};
  self.getTranscripts = getTranscripts;
  self.recordFinished = recordFinished;
  self.timeLimit = 30;
  // self.deleteTranscript = deleteTranscript;
  // self.selectTranscript = selectTranscript;

  var inputPoint;
  var realAudioInput;
  var audioInput;
  var audioRecorder;
  var audioContext = new AudioContext();

  function gotStream(stream) {

      var options = {
        mimeType: 'audio/wav'
      }

      audioRecorder = RecordRTC(stream , options);

  }

  function initAudio() {
          if (!navigator.getUserMedia)
              navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      navigator.getUserMedia(
          {
              "audio": true
          }, gotStream, function(e) {
              alert('Error getting audio');
              console.log(e);
          });
  }

  initAudio();

  self.startRecording = function() {

    console.log('recording');
    audioRecorder.startRecording();

  }

  self.stopRecording = function() {

    console.log('done recording');
    audioRecorder.stopRecording(function(audioURL){

      var blob = audioRecorder.getBlob();

      self.newTranscript.file = blob;

    });

  }

  self.saveRecording = function() {

      audioRecorder.exportWAV(function(blob){

        console.log(blog);

      })

  }


  getTranscripts();
  function getTranscripts(){
    $http
      .get('http://localhost:3000/transcripts')
      .then(function(response){

        self.all = response.data;
    });
  }

  function addTranscript(){

      var form = new FormData();
      form.append("title" , self.newTranscript.title);
      form.append("date" , self.newTranscript.date);
      form.append("file" , self.newTranscript.file);
      console.log(self.newTranscript.file);
      $http
        .post('http://localhost:3000/transcripts', form, {
          headers: {'Content-Type' : undefined},
          transformRequest: angular.identity
        })
        .then(function(response){
          getTranscripts();
          console.log(response);
      });

  }


  function recordFinished(){

    console.log('hello')
  }



}







