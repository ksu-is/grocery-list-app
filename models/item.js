var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  description: String,
  favorite:  Boolean
  // purchased: Boolean
});

var ItemModel = mongoose.model('Item', ItemSchema);

module.exports = {
  schema: ItemSchema,
  model: ItemModel
};
