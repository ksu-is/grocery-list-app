(function(){
  var app = angular.module('shopping-list', ['ui.router']);

  app.controller('MainCtrl', function($http, $state, $stateParams){
    var self = this;

    self.currentItem = $stateParams.item;
    self.favorites = [];

    $http.get('/helper/get-user')
      .then(function(response){
        console.log("HELPER RESPONSE >>>>", response.data.user);
        self.user = response.data.user;
        self.items = response.data.user.groceryList;
        self.favorites = response.data.user.favorites;
        console.log("current user status", self.user);
        return self.items;
      })
      .catch(function(err){
        console.log(err);
      });


    function addItem(newItem){
      //call add favorite function it favorite was selected
      console.log("new item", newItem);
      $http.post('/user/add-item', newItem)
        .then(function(response){
          console.log("ITEM HAS BEEN ADDED TO USER >>>>>>>", response.data.groceryList);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function addFavorite(item){
      console.log("new favorite", item);
      $http.post('/user/favorite-item', item)
        .then(function(response){
          console.log("ITEM HAS BEEN FAVORITED BY USER >>>>>>>", response.data.groceryList);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteItem(){
      console.log("CURRENT ITEM TO DELETE >>>>>>>", self.currentItem);
      console.log("_id: ", self.currentItem._id);
      $http.delete(`/user/delete/${self.currentItem._id}`)
        .then(function(response){
          console.log("ITEM HAS BEEN DELETED FROM USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function unFavorite(){
      console.log("CURRENT ITEM TO UNFAVORITE >>>>>>>", self.currentItem);
      console.log("_id: ", self.currentItem._id);
      $http.delete(`/user/unfavorite-item/${self.currentItem._id}`)
        .then(function(response){
          console.log("ITEM HAS BEEN UNFAVORITED FROM USER >>>>>>>>", response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(item){
      console.log("CURRENT ITEM TO EDIT >>>>>>>", self.currentItem);
      console.log("EDITED ITEM RESULTS >>>>>>>", item);
      console.log("_id: ", self.currentItem._id);
      $http.put('/user/edit-item', {
          currentItemId: self.currentItem._id,
          editedItem: item
        })
        .then(function(response){
          console.log(response.data);
          $state.go('user', {url: '/user'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.addItem = addItem;
    this.deleteItem = deleteItem;
    this.editItem = editItem;
    this.addFavorite = addFavorite;
    this.unFavorite = unFavorite;
  });

  app.controller('AuthCtrl', function($scope, $http, $state, $stateParams){
    var self = this;

    self.isLoggedIn = false;

    function login(userPass){
      $http.post('/login', {username: userPass.username, password: userPass.password})
        .then(function(response){
          console.log(response);
          self.isLoggedIn = true;
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
          self.isLoggedIn = true;
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
          self.isLoggedIn = false;
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
