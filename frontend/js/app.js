angular.module('TranscriberApp', ['ui.router'])
     .config(MainRouter);

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
