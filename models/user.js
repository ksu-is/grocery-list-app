var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: String,
  password: String,
  groceryList: [itemSchema]
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
