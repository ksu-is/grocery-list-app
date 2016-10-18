(function(){
  var app = angular.module('shopping-list');

  app.controller('MainCtrl', function($http, $state){
    var self = this;

    this.editedItem = null;

    $http.get('/helper/get-user')
      .then(function(response){
        self.user = response.user;
      })
      .catch(function(err){
        console.log(err);
      });

    $http.get('/' + self.user.username + '/home')
      .then(function(response){
        self.items = response.data.groceryList;
      })
      .thcatch(function(err){
        console.log(err);
      });

    function setItemtoEditedItem(item){
        this.editedItem = item;
    };

    function addItem(newItem){
      $http.post('/' + self.user.username + '/add-item', newItem)
        .then(function(response){
          //newItem form needs to be cleared out here
          $state.go('home', {url: '/' + self.user.username + '/home'});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function deleteItem(itemName){
      $http.delete('/:user/delete', itemName)
        .then(function(resopnse){
          console.log(response);
          self.items = response.data.groceryList;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function editItem(item){
      $http.put('/:user/edit-item', item)
        .then(function(response){
          console.log(response);
          $state.go('home', {url: '/:user/home'});
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

    $http.get('/helper/get-user')
      .then(function(response){
        self.user = response.user;
      })
      .catch(function(err){
        console.log(err);
      });

    function login(userPass){
      $http.post('/login', {username: userPass.username, password: userPass.password})
        .then(function(response){
          self.user = response.data.user;

          $state.go('user', {url: '/user', user: response.data.user});
        })
        .catch(function(err){
          console.log(err);
        });
    };

    function signup(userPass){
      $http.post('/register', {username: userPass.username, password: userPass.password})
        .then(function(response) {
          console.log(response);
          $state.go('user', {url: '/user', user: response.data.user});
        })
        .catch(function(err){
          console.log(err);
        });;
    };

    function logout(userPass){
      $http.delete('/logout')
        .then(function(response){
          $state.go('index', {url: '/'})
        })
        .catch(function(err){
          console.log(err);
        });
    };

    this.login = login;
    this.signup = signup;
    this.logout = logout;
  });

})();
