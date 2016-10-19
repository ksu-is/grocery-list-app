(function(){
  var app = angular.module('shopping-list', ['ui.router']);

  app.controller('MainCtrl', function($http, $state){
    var self = this;

    this.editedItem = null;

    // $http.get('/helper/get-user')
    //   .then(function(response){
    //     self.user = response.user;
    //     displayUserHome(self.user);
    //   })
    //   .catch(function(err){
    //     console.log(err);
    //   });

    //route to send loggd in user to their home
    $http.get('/a')
      .then(function(response){
        self.items = response.data.groceryList;
      })
      .catch(function(err){
        console.log(err);
      });

    function setItemtoEditedItem(item){
        this.editedItem = item;
    };


    function addItem(newItem){
      $http.post('/a/add-item', newItem)
        .then(function(response){
          //newItem form needs to be cleared out here
          $state.go('home', {url: '/a'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteItem(item){
      $http.delete('/a/delete', item)
        .then(function(resopnse){
          console.log(response);
          self.items = response.data.groceryList;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(item){
      $http.put('/a/edit-item', item)
        .then(function(response){
          console.log(response);
          $state.go('home', {url: '/a'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addItem = addItem;
    this.deleteItem = deleteItem;
    this.editItem = editItem;
    this.setItemtoEditedItem = setItemtoEditedItem;

  });

  app.controller('AuthCtrl', function($http, $state, $stateParams){
    var self = this;

    function login(userPass){
      $http.post('/login', {username: userPass.username, password: userPass.password})
        .then(function(response){
          console.log(response);
          self.user = response.data.user;

          $state.go('user', {url: '/' + response.data.username});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function register(userPass){
      $http.post('/register', {username: userPass.username, password: userPass.password})
        .then(function(response) {
          console.log(response);
          $state.go('user', {url: '/' + response.data.username});
        })
        .catch(function(err){
          console.log(err);
        });;
    };

    function logout(){
      $http.delete('/logout')
        .then(function(response){
          $state.go('index', {url: '/'})
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.login = login;
    this.register = register;
    this.logout = logout;
  });

})();
