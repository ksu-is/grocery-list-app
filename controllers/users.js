//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Item = require('../models/item').model;
var findItemIndex = require('../public/js/logic.js');


//Adding a new item
router.post('/add-item', function(req, res){
  console.log("new item", req.body);
  User.findOne({
    username: req.user.username
  })
  .then(function(user){
    if(!req.body.favorite){
      var favorite = false;
    }
    user.groceryList.push({
      name: req.body.name,
      description: req.body.descriptionn,
      favorite: favorite,
      purchased: false
    });
    user.save();
    res.json(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

//Edit an existing item
router.put('/edit-item', function(req, res){
  User.findOne({
    username:  req.user.username
  }, function(err, user){
    //function to find Item in groceryList
    var itemIndex = findItemIndex(req.body.currentItemId, user.groceryList);

    user.groceryList[itemIndex] = req.body.editedItem;

    user.save(function(err){
      if(err) console.log(err);
      console.log("Edited Item Saved to User!!!");
    });
    res.json(user);
  });
});

//Deleting an item id=item id
router.delete('/delete', function(req, res){
  User.findOne({
    username: req.user.username
  }, function(err, user){
    var itemIndex = findItemIndex(req.body.currentItemId, user.groceryList);

    user.groceryList.splice(itemIndex, 1);

    user.save(function(err){
      if(err) console.log(err);
      console.log("Item deleted from User");
    });

    res.json(user);
  });
});





module.exports = router;
