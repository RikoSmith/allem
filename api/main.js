const express = require('express');
var router = express.Router();
var dates = require('../lib/dates');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var keys = require('../config/keys');
const saltRounds = 10;
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validation = require('../config/validation');
const validateLogin = validation.validateLogin;

//Models
const Member = require('../models/Member');
const Department = require('../models/Department');
const User = require('../models/User');

//MongoDB Credentials. Extremly confidential information! Don't share this url with anyone!
const url = keys.MONGO_URI;
const jwt_key = keys.JWT_KEY;
const dbName = 'allemdb';

//This is a middleware function that checks permission to see the pages. Each user has its own array of permission flags.
//This function checks presense of these flags and render page according to them
function permissionCheck(perm) {
  return (
    permissionCheck[perm] ||
    (permissionCheck[perm] = function(req, res, next) {
      if (req.user.permission.indexOf(perm) >= 0) next();
      else
        return res.status(400).json({
          ok: false,
          err: { permission: 'У вас нет доступа к этой странице' }
        });
    })
  );
}

////////////////////////////////////////////////////////////////////////////////
// @route   GET api/members
// @desc    Returns array of all users
// @access  Private
router.get('/lang', (req, res) => {
  var l = '';
  if (req.query.lang) {
    l = req.query.lang;
  } else {
    l = 'ru';
  }
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('lang');
      collection.findOne({ lang: l }, function(err, doc) {
        if (err) {
          res.status(500).json({
            ok: false,
            err
          });
          throw err;
        }
        res.status(200).json({
          ok: true,
          data: doc
        });
        client.close();
      });
    }
  );
});

////////////////////////////////////////////////////////////////////////////////
// @route   POST api/login
// @desc    Logs in user into system
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json({ ok: false, invalid_input: errors });
  }
  const id = req.body.username;
  const password = req.body.password;
  console.log('id: ' + id);
  User.findOne({ id })
    .then(result => {
      if (!result)
        res
          .status(404)
          .json({ ok: false, user_not_found: 'Пользователь не найден' });
      bcrypt.compare(password, result.password, (err, response) => {
        if (response) {
          var payload = Object.assign({}, result._doc);
          delete payload.password;
          jwt.sign(payload, jwt_key, { expiresIn: 3600 }, (err, token) => {
            res.json({
              ok: true,
              token: 'Bearer ' + token
            });
          });
        } else {
          res
            .status(400)
            .json({ ok: false, invalid_password: 'Неверный пароль' });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

////////////////////////////////////////////////////////////////////////////////
// @route   GET api/members
// @desc    Returns array of all users
// @access  Private
router.get(
  '/members',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Member.find((err, result) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
        throw err;
      }
      filtered = [];
      for (let i = 0; i < result.length; i++) {
        if (!req.user.permission_members.includes(result[i].dep_name)) continue;
        filtered.push(result[i]);
      }
      if (req.query.filter) {
        temp = [];
        for (let x = 0; x < filtered.length; x++) {
          if (req.query.filter === filtered[x].dep_name) temp.push(filtered[x]);
        }
        filtered = temp;
      }
      res.status(200).json({
        ok: true,
        data: filtered
      });
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// @route   GET api/history
// @desc    Returns all the events
// @access  Private + Permission
router.get(
  '/history',
  passport.authenticate('jwt', { session: false }),
  permissionCheck('general'),
  (req, res) => {
    MongoClient.connect(
      url,
      function(err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection('history');
        collection
          .find({})
          .sort({ timestamp: -1 })
          .toArray(function(err, result) {
            if (err) throw err;

            res.status(200).json({
              ok: true,
              data: result
            });
            client.close();
          });
      }
    );
  }
);

////////////////////////////////////////////////////////////////////////////////
// @route   GET api/departments
// @desc    Returns all the departments
// @access  Private + Permission
router.get(
  '/departments',
  passport.authenticate('jwt', { session: false }),
  permissionCheck('departments'),
  (req, res) => {
    Department.find((err, result) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
        throw err;
      }
      filtered = [];
      for (let i = 0; i < result.length; i++) {
        if (!req.user.permission_members.includes(result[i].dep_name)) continue;
        filtered.push(result[i]);
      }
      res.status(200).json({
        ok: true,
        data: filtered
      });
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// @route   GET api/handbook
// @desc    Returns all the handbook
// @access  Private + Permission
router.get(
  '/handbook',
  passport.authenticate('jwt', { session: false }),
  permissionCheck('handbook'),
  (req, res) => {
    MongoClient.connect(
      url,
      function(err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection = db.collection('handbook');
        collection.find({}).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).json({
            ok: true,
            data: result
          });
          client.close();
        });
      }
    );
  }
);

module.exports = router;
