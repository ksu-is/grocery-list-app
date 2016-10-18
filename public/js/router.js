(function(){
  angular.module('shopping-list', ['ui.router'])
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "home.html",
    controller: 'AuthCtrl',
    controllerAs: 'auth'
  })
  .state('user', {
    url:'/user',
    templateUrl: "user.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: "favorites.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('show', {
    url: '/show',
    templateUrl: "show.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('edit', {
    url: '/edit',
    templateUrl: "edit.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('register', {
    url: '/register',
    templateUrl: "register.html",
    controller: 'AuthCtrl',
    controllerAs: 'auth'
  });

  $urlRouterProvider.otherwise('/')
  $locationProvider.html5Mode({
   enabled: true,
   requireBase: false,
   rewriteLinks: true
  });

 } //end of routes
})();
