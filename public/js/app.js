(function(){
  angular.module('shopping-list', ['ui.router'])
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "home.html"
  })
  .state('user', {
    url:'/user',
    templateUrl: "user.html"
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: "favorites.html"
  })
  .state('frequently', {
    url: '/frequently',
    templateUrl: "frequently.html"
  })

  $urlRouterProvider.otherwise('/')
  $locationProvider.html5Mode({
   enabled: true,
   requireBase: false,
   rewriteLinks: true
  });

 } //end of routes
})();
