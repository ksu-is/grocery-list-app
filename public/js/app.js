(function(){
  var app = angular.module('shopping-list', ['ui.router']);

  app.controller('MainCtrl', function($http, $state, $stateParams){
    var self = this;

    self.currentItem = $stateParams.item;

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response.data.user);
        self.user = response.data.user;
        self.items = response.data.user.groceryList;
        console.log("current user status", self.user);
      })
      .catch(function(err){
        console.log(err);
      });

    function addItem(newItem){
      console.log("new item", newItem);
      $http.post('/user/add-item', newItem)
        .then(function(response){
          console.log("ITEM HAS BEEN ADDED TO USER >>>>>>>", response.data.groceryList);
          //newItem form needs to be cleared out here
          // self.items = response.data.groceryList;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteItem(item){
      $http.delete('/user/delete', item)
        .then(function(response){
          console.log("ITEM HAS BEEN DELETED FROM USER >>>>>>>>", response.data);
          // self.items = response.data.groceryList;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(item){
      console.log("CURRENT ITEM TO EDIT >>>>>>>", self.currentItem);
      console.log("_id's type: ", typeof self.currentItem._id);
      $http.put('/user/edit-item', {
          currentItemId: self.currentItem._id,
          editedItem: item
        })
        .then(function(response){
          console.log(response.data);
          // self.items = response.data.groceryList;
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addItem = addItem;
    this.deleteItem = deleteItem;
    this.editItem = editItem;
  });

  app.controller('AuthCtrl', function($http, $state, $stateParams){
    var self = this;

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response.data.user);
        self.user = response.data.user;
        console.log("current user status", self.user);
      })
      .catch(function(err){
        console.log(err);
      });

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
        });
    };

    function logout(){
      console.log("LOGOUT CLICKED!!!!");
      $http.delete('/logout')
        .then(function(response){
          console.log(response);
          $state.go('home', {url: '/'});
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
