//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');



router.get('/:user', function(req, res){
  res.redirect('/user');
})





module.exports = router;
