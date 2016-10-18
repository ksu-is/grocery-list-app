//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var User = require('../models/item');


router.get('/', function(req, res){
  res.redirect('/user');
})


//Creating a new item
router.post('/items', function(req, res){
  User.findById(req.params.id, function(err, user){
    user.items.push(new Item(
       {name: req.body.name,
        description: req.body.description,
        favorite: req.body.favorite
      }))
      user.save(function(err){
        res.redirect(`/${user.id}`); //Check in this route
      });
  });
});

//Deleting an item id=item id
router.delete('/:userId/show/:id', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull: {
      items: {_id: req.params.id}
    }
  },function(err){
    res.redirect(`/${req.params.userId}`);
  });
});





module.exports = router;
