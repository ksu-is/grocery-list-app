(function(){
  var app = angular.module('shopping-list', ['ui.router']);

  app.controller('MainCtrl', function($http, $state){
    var self = this;

    this.editedItem = null;

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response);
        self.user = response.user;
      })
      .catch(function(err){
        console.log(err);
      });

    function setItemtoEditedItem(item){
        this.editedItem = item;
    };


    function addItem(newItem){
      $http.post('/user/add-item', newItem)
        .then(function(response){
          //newItem form needs to be cleared out here
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteItem(item){
      $http.delete('/user/delete', item)
        .then(function(resopnse){
          console.log(response);
          self.items = response.data.groceryList;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(item){
      $http.put('/user/edit-item', item)
        .then(function(response){
          console.log(response);
          $state.go('user', {url: '/user'});
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

          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function register(userPass){
      $http.post('/register', {username: userPass.username, password: userPass.password})
        .then(function(response) {
          console.log(response);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });;
    };

    function logout(){
      console.log("LOGOUT CLICKED!!!!");
      $http.delete('/logout')
        .then(function(response){
          console.log("USER IS LOGGED OUT >>>>>>>", response);
          $state.go('home', {url: '/'})
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
