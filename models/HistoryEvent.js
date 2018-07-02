const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const EventSchema = new Schema({
  object: {
    name: String,
    lastname: String,
    username: String
  },
  object: {
    name: String,
    lastname: String,
    id: Schema.Types.ObjectId
  },
  type: String,
  edit_type: String,
  timestamp: Date,
  text: String
});


module.exports = User = Mongoose.model('history', EventSchema);
