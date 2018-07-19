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

function updateStatus(req, res, next) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection('members');
      var data = collection.find({}).toArray(function(err, members) {
        if (err) throw err;
        console.log('Updatestatus found user');
        var now = new Date();
        for (var i = 0; i < members.length; i++) {
          var newValues = { $set: {} };

          //If member has expired status end date -> change status to default
          if (members[i].status_end_date) {
            if (dates.compare(new Date(members[i].status_end_date), now) < 0) {
              if (members[i].status !== 'На работе')
                newValues.$set.status = 'На работе';
            } else {
              newValues.$set.status = null;
            }
          }

          //If member has holiday status -> check if the dates are expired
          if (members[i].holiday_start && members[i].holiday_end) {
            if (
              dates.inRange(
                now,
                new Date(members[i].holiday_start),
                new Date(members[i].holiday_end)
              )
            ) {
              if (members[i].status !== 'В отпуске')
                newValues.$set.status = 'В отпуске';
            } else {
              if (members[i].status_end_date) {
              } else {
                if (members[i].status !== 'На работе')
                  newValues.$set.status = 'На работе';
              }
            }
          }

          //If there is a pending change -> execute the change
          if (newValues.$set.status) {
            //console.log(members[i].lastname + " " + members[i].name);
            collection.updateOne(
              { _id: new ObjectId(members[i]._id) },
              newValues,
              function(err, response) {
                if (err) throw err;
                console.log('1 document updated');
              }
            );
          }
        }
        client.close();
      });
    }
  );
  next();
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
// @desc    Returns array of all employees/members (but for heads all members from parent deprtments: energy, kipia, remont, AHO etc.)
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
// @route   GET api/member/[member_id]
// @desc    Returns specific member data
// @access  Private + Permission specific (e.g. head of Energetics deprtment will see only members under his leading dep.)
router.get(
  '/member/:member_id',
  passport.authenticate('jwt', { session: false }),
  permissionCheck('members'),
  updateStatus,
  function(req, res) {
    Member.findOne({ _id: new ObjectId(req.params.member_id) }, function(
      err,
      doc
    ) {
      if (err) {
        res.status(404).json({
          ok: false,
          err: 'Не найдено'
        });
      }
      if (!req.user.permission_members.includes(doc.dep_name))
        res.status(400).json({
          ok: false,
          err: 'У вас нет доступа к просмотру данных этого сотрудника'
        });
      res.status(200).json({ ok: true, data: doc });
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

//MEMBER FORMS HANDLERS (PRACTICALLY DUPLICATE FROM EXPRESS VERSION OF WEB APP)
// @route   GET api/editMain
// @desc    Requires inputs for main data of members and saves to db
// @access  Private + Permission
router.post('/editMain', permissionCheck('members'), function(req, res, next) {
  console.log(req.body);
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);

      var newValues = { $set: {} };
      var prevDoc = null;
      const db = client.db(dbName);
      const collection = db.collection('members');
      const history = db.collection('history');
      var data = collection.findOne(
        { _id: new ObjectId(req.body.member_id) },
        function(err, doc) {
          if (err) throw err;

          if (req.body.name) newValues.$set.name = req.body.name;
          if (req.body.lastname) newValues.$set.lastname = req.body.lastname;
          if (req.body.middlename)
            newValues.$set.middlename = req.body.middlename;
          if (req.body.position) newValues.$set.position = req.body.position;
          if (req.body.department)
            newValues.$set.department = req.body.department;

          if (req.body.start_date && req.body.end_date) {
            var start = new Date(req.body.start_date);
            var end = new Date(req.body.end_date);
            var now = new Date();

            if (dates.compare(start, end) < 0) {
              newValues.$set.start_date = req.body.start_date;
              newValues.$set.end_date = req.body.end_date;
              //if(dates.compare(end, now) < 0) newValues.$set.status = "На работе";
            } else {
              res.status(400);
              newValues = {};
              res.send(
                'Ошибка! Даты срока сотрудничества введены неправильно. Отмена всех изменении <a href="../../admin/member/' +
                  req.body.member_id +
                  '">Назад</a>'
              );
            }
          }

          if (req.body.status && newValues.$set) {
            console.log('status exists in body');
            if (req.body.status == 'На работе') {
              newValues.$set.status = req.body.status;
              newValues.$set.status_end_date = '';
            } else {
              var now = new Date();
              var status_end = new Date(req.body.status_end_date);
              if (dates.compare(now, status_end) <= 0) {
                newValues.$set.status = req.body.status;
                newValues.$set.status_end_date = req.body.status_end_date;
              } else {
                res.status(400);
                newValues = {};
                res.send(
                  'Ошибка! Даты срока статуса введены неправильно. Отмена всех изменении <a href="../../admin/member/' +
                    req.body.member_id +
                    '">Назад</a>'
                );
              }
            }
          }
          if (req.body.holiday_start && req.body.holiday_end) {
            var h_start = new Date(req.body.holiday_start);
            var h_end = new Date(req.body.holiday_end);

            if (dates.compare(h_start, h_end) < 0) {
              newValues.$set.holiday_start = req.body.holiday_start;
              newValues.$set.holiday_end = req.body.holiday_end;
              var now = new Date();
              if (dates.compare(h_end, now) < 0) {
                newValues.$set.status = 'На работе';
              }
            } else {
              res.status(400);
              newValues = {};
              res.send(
                'Ошибка! Даты срока отпуска введены неправильно. Отмена всех изменении <a href="../../admin/member/' +
                  req.body.member_id +
                  '">Назад</a>'
              );
            }
          }
          if (newValues.$set) {
            Member.updateOne(
              { _id: new ObjectId(req.body.member_id) },
              newValues,
              function(err, response) {
                if (err) throw err;
                console.log('1 document updated ' + response);
                res.send(
                  'Данные успешно изменены <a href="../../admin/member/' +
                    req.body.member_id +
                    '">Назад</a>'
                );
                Member.findOne(
                  { _id: new ObjectId(req.body.member_id) },
                  function(err, m_res) {
                    if (err) {
                      console.log('error: ' + err);
                    }
                    var event = makeEvent(
                      'member_edit',
                      'Основные',
                      req.user,
                      m_res
                    );
                    history.insertOne(event);
                  }
                );
              }
            );
          }
        }
      );
    }
  );
});

module.exports = router;
