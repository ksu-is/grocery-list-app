(function(){
  angular.module('shopping-list', ['ui.router'])
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "home.html"
    controller: 'MainCtrl'
  })
  .state('user', {
    url:'/user',
    templateUrl: "user.html"
    controller: 'MainCtrl'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: "favorites.html"
    controller: 'MainCtrl'
  })
  .state('show', {
    url: '/show',
    templateUrl: "show.html"
    controller: 'MainCtrl'
  })
  .state('edit', {
    url: '/edit',
    templateUrl: "edit.html"
    controller: 'MainCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: "register.html"
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/')
  $locationProvider.html5Mode({
   enabled: true,
   requireBase: false,
   rewriteLinks: true
  });

 } //end of routes
})();
