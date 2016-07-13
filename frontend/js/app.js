angular.module('TranscriberApp', ['ui.router' , 'file-model', 'angularAudioRecorder'])
     .config(MainRouter)
     .config(function (recorderServiceProvider) {
        recorderServiceProvider
          .forceSwf(false)
          // .withMp3Conversion(true)
        ;
      });


     MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];     

     function MainRouter($stateProvider, $urlRouterProvider) {
 
      $stateProvider
             .state('home', {
               url: "/",
               templateUrl: "../views/home.html" 
               })
               .state('translation', {
                 url:"/translation",
                 templateUrl: "../views/translation.html"
               })
     
        $urlRouterProvider.otherwise("/");
     }
