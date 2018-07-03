const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dep_name: {
    type: String,
    required: true
  },
  member_count: {
    type: Number,
    required: true
  },
  head_id: {
    type: String,
    required: true
  },
  room: {
    type: String
  },
  folder_url_dep: {
    type: String,
    required: true
  },
  folder_url_members: {
    type: String,
    required: true
  },
  internal_phone: {
    type: String
  },
  external_phone: {
    type: String
  },
  image:{
    type: String,
    required: true
  }
});


module.exports = Department = Mongoose.model('departments', MemberSchema);
