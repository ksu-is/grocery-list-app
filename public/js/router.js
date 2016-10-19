(function(){
  angular.module('shopping-list')
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "/partials/home.html",
    controller: 'AuthCtrl',
    controllerAs: 'auth'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: "/partials/favorites.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('show', {
    url: '/show',
    params: {
      item: null
    },
    templateUrl: "/partials/show.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('edit', {
    url: '/edit',
    params: {
      item: null
    },
    templateUrl: "/partials/edit.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('register', {
    url: '/register',
    templateUrl: "/partials/register.html",
    controller: 'AuthCtrl',
    controllerAs: 'auth'
  })
  .state('user', {
    url: '/user',
    templateUrl: "/partials/user.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  });

  $urlRouterProvider.otherwise('/')
  $locationProvider.html5Mode({
   enabled: true,
   requireBase: false,
   rewriteLinks: true
  });

  }; //end of routes
})();
