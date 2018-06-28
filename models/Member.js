const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MemberSchema = new Schema({
  lastname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: false
  },
  birthdate: {
    type: Date,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    default: "г. Астана"
  },
  address_current: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  dep_name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  folder_url: {
    type: String,
    required: true
  },
  delo_url: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  status_end_date: {
    type: Date,
    required: true
  },
  is_active: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  family_status: {
    type: String,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  children_18: {
    type: Number,
    required: true
  },
  s_ed: {
    type: String,
    required: true
  },
  h_ed: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  ed_finish:{
    type: Number,
    requied: true
  }
});


module.exports = User = Mongoose.model('members', MemberSchema);
