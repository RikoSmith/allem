var express = require('express');
var router = express.Router();
var dates =   require('../lib/dates');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var keys = require('../config/keys');
const saltRounds = 10;
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Models
const Member = require('../models/Member');
const Department = require('../models/Department');
const User = require('../models/User');

//MongoDB Credentials. Extremly confidential information! Don't share this url with anyone!
const url = keys.MONGO_URI;
const jwt_key = keys.JWT_KEY;
const dbName = 'allemdb';


////////////////////////////////////////////////////////////////////////////////
// @route   POST api/login
// @desc    Logs in user into system
// @access  Public
router.post('/login', (req, res) => {
  const id = req.body.username;
  const password = req.body.password;
  console.log("id: " + id);
  User.findOne( {id})
    .then( result => {
      if(!result) res.status(404).json({ok: false, err: "Пользователь не найден"})
      bcrypt.compare(password, result.password, (err, response) => {
         if(response){
           var payload =  Object.assign({}, result._doc);
           delete payload.password;
           jwt.sign(payload, jwt_key, {expiresIn: 3600}, (err, token) => {
             res.json({
               ok: true,
               token: 'Bearer ' + token
             })
           })
         }else{
           res.status(400).json({ok: false, err: "Неверный пароль"});
         }
      });


    })
    .catch((err) => {console.log(err)})
})


////////////////////////////////////////////////////////////////////////////////
// @route   GET api/members
// @desc    Returns array of all users
// @access  Private
router.get('/members', (req, res) => {
    Member.find( function(err, members) {
      if (err) throw err;
      res.json(members);
    });
})

module.exports = router
