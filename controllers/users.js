//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Item = require('../models/item').model;


router.get('/home', function(req, res){
  User.findOne({
    username: req.params.user
  }, function(err, user){
    res.json({groceryList: user.groceryList});
  });
});


//Adding a new item
router.post('/add-item', function(req, res){
  User.findOne({
    username: req.params.user
  }, function(err, user){
    user.groceryList.push(new Item({
         name: req.body.name,
         description: req.body.description,
         favorite: req.body.favorite
      }))
    user.save(function(err){
      if(err) console.log(err);
      console.log("Item Saved to User!!!");
    });
  });
});

//Edit an existing item
router.post('/edit-item', function(req, res){
  User.findOne({
    username: req.params.user
  }, function(err, user){
    user.groceryList.push(new Item({
         name: req.body.name,
         description: req.body.description,
         favorite: req.body.favorite
      }))
    user.save(function(err){
      if(err) console.log(err);
      console.log("Item Saved to User!!!");
    });
  });
});

//Deleting an item id=item id
router.delete('/delete', function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    var itemIndex = user.groceryList.indexOf({name: req.body.item.name});
    user.groceryList.splice(itemIndex, 1);

    user.save(function(err){
      if(err) console.log(err);
      console.log("Item deleted from User");
    });
  });
});





module.exports = router;
