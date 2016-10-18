//MODULES
//=========================================
pry = require('pryjs')
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOveride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
mongoose.Promise = global.Promise;
var port  = 3000 || process.env.PORT;
var app = express();
var path    = require('path');

//DATABASE CONNECTION
//=================================
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/grocery-list' || process.env.MONGODB_URI);

// MIDDLEWARE / CONFIGURATION
// ==================================
app.use(express.static(path.join(__dirname,'public')));


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', function(req, res){
    res.render('index');
});

//PASSPORT
//=================================
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//To be used when user is created ********
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


//PORT LISTENER
//=========================================
app.listen(port, function() {
    console.log('=======================');
    console.log('RUNNING on PORT ' + port);
    console.log('=======================');
});
