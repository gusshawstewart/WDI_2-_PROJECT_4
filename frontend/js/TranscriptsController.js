angular.module('TranscriberApp')
.controller('TranscriptsController', TranscriptsController);

TranscriptsController.$inject = ['$http'];

function TranscriptsController($http){
  var self = this;
  self.all = [];
  self.addTranscript = addTranscript;
  self.newTranscript = {};
  self.getTranscripts = getTranscripts;
  // self.deleteTranscript = deleteTranscript;
  // self.selectTranscript = selectTranscript;



  getTranscripts();
  function getTranscripts(){
    $http
      .get('http://localhost:3000/transcripts')
      .then(function(response){
        console.log(response.data.transcripts);
        self.all = response.data;
    });
  }

  function addTranscript(){

      $http
        .post('http://localhost:3000/transcripts', self.newTranscript)
        .then(function(response){
          getTranscripts();
      });

    self.newTranscript = {};
    console.log(self.newTranscript);
  }
}







