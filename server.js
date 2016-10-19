//MODULES
//=========================================
pry = require('pryjs')
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOveride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
mongoose.Promise = global.Promise;
var port  = 3000 || process.env.PORT;
var app = express();
var path    = require('path');

//EXTERNAL FILES
//=================================
var User = require('./models/user.js');
var UsersController = require('./controllers/users.js');
var HelperController = require('./controllers/helpers.js');

//DATABASE CONNECTION
//=================================
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/grocery-list' || process.env.MONGODB_URI);

// MIDDLEWARE / CONFIGURATION
// ==================================
app.use(express.static(path.join(__dirname,'public')));
app.use("/:user", UsersController);
app.use("/helper", HelperController);


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

//PASSPORT
//=================================
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//To be used when user is created ********
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//USER HOME REGISTER
//=================================
app.get('/', function(req, res){
    res.render('index');
});

//USER HOME REGISTER
//=================================
app.post('/register',  function(req, res){
  console.log(req.body);
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  function(err, user){
    req.login(user, function(err){
      if (err) {console.log(err); }
      return res.json(user);
    });
  });
});                              

//USER HOME LOGIN
//=================================
app.post('/login', passport.authenticate('local'), function(req, res){
  res.json(req.user);
});


//USER HOME LOGOUT
//=================================
app.delete('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


//PORT LISTENER
//=========================================
app.listen(port, function() {
    console.log('=======================');
    console.log('RUNNING on PORT ' + port);
    console.log('=======================');
});
