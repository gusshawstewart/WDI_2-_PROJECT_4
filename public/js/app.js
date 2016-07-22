angular
  .module('TranscriberApp', ['angular-jwt', 'ngResource', 'ui.router','file-model', 'angularAudioRecorder'])
  .constant('API', '/api')
  // .constant('API', 'http://localhost:3000')
  .config(MainRouter)
  .config(function (recorderServiceProvider) {
     recorderServiceProvider
       .forceSwf(false)
       // .withMp3Conversion(true)
     ;
   })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('translation', {
      url:"/translation",
      templateUrl: "./js/views/translation.html"
    })
    .state('transcripts', {
      url:"/transcripts",
      templateUrl: "./js/views/transcripts.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}
