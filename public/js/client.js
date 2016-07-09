  angular
  .module("transcriberApp", [
    "ui.router"
  ])
   .config(Router)
   .controller("usersIndexController", usersIndexCtrl)
   ;
 
 Router.$inject =["$stateProvider", "$locationProvider", "$urlRouterProvider"];
 
 function Router($stateProvider, $locationProvider, $urlRouterProvider){
     $locationProvider.html5Mode(true);
     $stateProvider
     .state("home", {
       url: "/",
       templateUrl: "/html/home.html",
     })
     .state("register", {
       url: "/register",
       templateUrl: "/html/register.html"
     })
     .state("usersIndex", {
       url: "/users",
        templateUrl:  "/html/users/index.html",
        controller:   "usersIndexController",
        controllerAs: "usersIndex"
     });
 
       $urlRouterProvider.otherwise("/");
 }

 usersIndexCtrl.$inject = [];


 function usersIndexCtrl(){
    var vm = this;
  
    vm.users = [
        {
          firstName: "Alex", 
         lastName: "Chin",
         email: "alex@alexchin.co.uk",
         passwordHash: "l22$qwewq132" 
          },
        {
          firstName: "Gus", 
         lastName: "SS",
         email: "gus@gus.co.uk",
         passwordHash: "l22$123asd123" 
          },
          {
          firstName: "John", 
         lastName: "McGee",
         email: "john@john.co.uk",
         passwordHash: "l22$qqwsdfaszxvzx" 
          }
    ]
  }


























