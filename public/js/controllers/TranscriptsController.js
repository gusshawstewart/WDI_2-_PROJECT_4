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
  self.deleteTranscript = deleteTranscript;
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

  self.isActive = false;
  self.activeButton = function() {
    console.log("clicked");
    self.isActive = !self.isActive;
    console.log(self.isActive)
  } 


self.wasActive = false;
self.endRecordingAnimation = function(){
  console.log("clicked");
  self.isActive = false;
  console.log(self.isActive)
}



  self.recordAlert = function($scope){
    $scope.isActive = false;
      $scope.activeButton = function() {
        $scope.isActive = !$scope.isActive;
    }

  }

  self.stopRecording = function() {

    console.log('done recording');
    audioRecorder.stopRecording(function(audioURL){

      var blob = audioRecorder.getBlob();

      self.newTranscript.file = blob;

    });

  }

  self.saveRecording = function() {

      audioRecorder.save('output.wav');

  }

  getTranscripts();
  function getTranscripts(){
    $http
      .get('/transcripts')
      .then(function(response){

        self.all = response.data;
    });
  }

  function selectTranscript(tran) {

    self.newTranscript = tran;

  }

  function addTranscript(){

      var form = new FormData();
      form.append("title" , self.newTranscript.title);
      form.append("date" , self.newTranscript.date);
      form.append("file" , self.newTranscript.file);
      console.log(self.newTranscript.file);
      $http
        .post('/transcripts', form, {
          headers: {'Content-Type' : undefined},
          transformRequest: angular.identity
        })
        .then(function(response){
          getTranscripts();
          console.log(response);
      });
  }

  // self.test = function() {
  //   console.log("clicked");
  // }

    function deleteTranscript(tran){
      console.log("transcript delete attempt")
    $http
      .delete("/transcripts/" + tran._id)
      .then(function(response){
        var index = self.all.indexOf(tran);
        self.all.splice(index, 1);
        console.log("transcript delete")
      });
  }


  function recordFinished(){
  
  console.log('hello')

  }

}







