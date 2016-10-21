var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var ItemSchema = require('./item.js').schema;


var UserSchema = new Schema({
  username: String,
  password: String,
  groceryList: [ItemSchema],
  favorites: [ItemSchema]
});

UserSchema.plugin(passportLocalMongoose);
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
