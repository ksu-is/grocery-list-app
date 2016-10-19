//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Item = require('../models/item').model;
var findItemIndex = require('../public/js/logic.js');


router.get('/', function(req, res){
  User.findOne({
    username: req.user.username
  }, function(err, user){
    res.json({groceryList: user.groceryList});
  });
});


//Adding a new item
router.post('/add-item', function(req, res){
  console.log("new item", req.body);
  User.findOne({
    username: req.user.username
  })
  .then(function(user){
    user.groceryList.push(req.body);
    user.save();
    res.status("item added to list").send(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

//Edit an existing item
router.post('/edit-item', function(req, res){
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
