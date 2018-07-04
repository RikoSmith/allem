const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: [String],
    required: true
  },
  permission_members: {
    type: [String],
    required: true
  }
});


module.exports = User = Mongoose.model('users', userSchema);
