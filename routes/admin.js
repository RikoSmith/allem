var express = require('express');
var router = express.Router();
const dates =   require('../lib/dates');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
const saltRounds = 10;



const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';

function permissionCheck(perm){
  return permissionCheck[perm] || (permissionCheck[perm] = function(req, res, next) {
    if (req.session.user.permission.indexOf(perm) >= 0) next();
    else res.render("sb-admin/denied");
  })
}

function updateStatus(req, res, next){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.find({}).toArray(function(err, members) {
      if (err) throw err;
      //console.log(result);
      var now = new Date();
      for(var i = 0; i < members.length; i++){
        var newValues = { $set: {} };

        if(members[i].status_end_date){
          console.log("end date has");
          if(dates.compare(new Date(members[i].status_end_date), now) < 0){
            if(members[i].status !== "На работе") newValues.$set.status = "На работе";
          }else{
            newValues.$set.status = null;
          }
        }

        if(members[i].holiday_start && members[i].holiday_end){
          if(dates.inRange(now, new Date(members[i].holiday_start), new Date(members[i].holiday_end))){
            if(members[i].status !== "В отпуске") newValues.$set.status = "В отпуске";
          }else{
            if(members[i].status_end_date){

            }else{
              if(members[i].status !== "На работе") newValues.$set.status = "На работе";
            }
          }
        }

        if(newValues.$set.status){
          console.log(members[i].lastname + " " + members[i].name);
          collection.updateOne({"_id": new ObjectId(members[i]._id)}, newValues, function(err, response) {
            if (err) throw err;
            console.log("1 document updated  |" + response);
          });
        }

      }
      client.close();
    });
  });
  next();
}

function checkSignIn(req, res, next){
   if(req.session.logged){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.originalUrl);
      req.session.return_url = req.originalUrl;
      res.redirect('/login');
   }
}

router.use(checkSignIn);

/* GET users listing. */
router.get('/', permissionCheck('general'), function (req, res) {
  res.render('sb-admin/index', {user: req.session.user});
})

router.get('/members', permissionCheck('members'), updateStatus, function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var filter = null;
    if(req.query.filter){
      filter = req.query.filter;
    }
    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.find({}).sort({lastname: 1}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.render('sb-admin/tables', {members: result, user: req.session.user, filter: filter});
      client.close();
    });
  });
})

router.get('/addAdminUser', permissionCheck('add_user'), function (req, res) {
  res.render('sb-admin/signup');
})

router.post('/signup', permissionCheck('add_user'), function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    console.log(req.body);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.findOne({$or: [{"id": req.params.id },{ "email": req.body.email }]}, function(err, doc) {
      if (err) throw err;
      if(doc){
        res.send('There is already user registered with such username or email.')
      }else{
        if(req.body.password !== req.body.password2) res.send("Passwords does not match")

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          var newUser = {};
          newUser.name = req.body.name;
          newUser.lastname = req.body.lastname;
          newUser.group = req.body.group;
          newUser.id = req.body.id;
          newUser.email = req.body.email;
          newUser.password = hash;
          newUser.permission = req.body.permission;
          newUser.permission_members = req.body.permission_members;
          try {
             collection.insertOne(newUser);
          } catch (e) {
             res.send(e);
          }
          res.send('New user added')
          client.close();
        });

      }
    });
  });
})



router.get('/departments', permissionCheck('departments'), function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('departments');
    const collection2 = db.collection('members');
    var data = collection.find({}).sort({dep_name: 1}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      var promises = 0;
      for(let i=0; i<result.length; i++){
        collection2.findOne({"_id": new ObjectId(result[i].head_id)}, function(err, doc) {
          result[i].head_info = doc;
          promises++;
          if(promises === result.length){
            res.render('sb-admin/departments', {deps: result, user: req.session.user});
            client.close();
          }
        })
      }
    });
  });
})

router.get('/handbook', permissionCheck('handbook'), function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.render('sb-admin/help' , {user: req.session.user});
      client.close();
    });
  });
})


router.get('/maptest',  function (req, res) {
  res.render('sb-admin/map.ejs')
})

router.get('/maptest2',  function (req, res) {
  res.render('sb-admin/map.ejs')
})


router.get('/test', function (req, res) {
  res.render('index')
})


router.get('/map', permissionCheck('map'), function (req, res) {
  res.render('sb-admin/map_view' , {user: req.session.user})
})


router.get('/member/:member_id', permissionCheck('members'), updateStatus, function (req, res) {

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.params.member_id)}, function(err, doc) {
      if (err) throw err;
      //console.log(doc);

      if (req.session.user.permission_members.indexOf(doc.dep_name) < 0) res.render('sb-admin/denied');
      res.render('sb-admin/member', {member: doc, user: req.session.user});
      client.close();
    });

  });

})


router.post('/editMember', permissionCheck('members'), function (req, res, next) {
  console.log(req.body);
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var newValues = { $set: {} };
    var prevDoc = null;
    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.body.member_id)}, function(err, doc) {
      if (err) throw err;

      if(req.body.name) newValues.$set.name = req.body.name;
      if(req.body.lastname) newValues.$set.lastname = req.body.lastname;
      if(req.body.middlename) newValues.$set.middlename = req.body.middlename;
      if(req.body.position) newValues.$set.position = req.body.position;
      if(req.body.department) newValues.$set.department = req.body.department;

      if(req.body.start_date && req.body.end_date){
        var start = new Date(req.body.start_date);
        var end = new Date(req.body.end_date);


        if(dates.compare(start, end) > 0){

          newValues.$set.start_date = req.body.start_date;
          newValues.$set.end_date = req.body.end_date;
        }else{
          res.status(400);
          newValues = {};
          res.send("Ошибка! Даты срока сотрудничества введены неправильно. Отмена всех изменении");
        }
      }

      if(req.body.status){

        if(req.body.status == "На работе"){
          newValues.$set.status = req.body.status;
          newValues.$set.status_end_date = '';
        }else{
          var now = new Date();
          var status_end = new Date(req.body.status_end_date);


          if( dates.compare(now, status_end) <= 0 ){
                newValues.$set.status = req.body.status;
                newValues.$set.status_end_date = req.body.status_end_date;
          }else {
            res.status(400);
            newValues = {};
            res.send("Ошибка! Даты срока статуса введены неправильно. Отмена всех изменении");
          }
        }

      }

      if(req.body.holiday_start && req.body.holiday_end){
        var h_start = new Date(req.body.holiday_start);
        var h_end = new Date(req.body.holiday_end);
        console.log("Start: " + h_start);
        console.log("End: " + h_end);

        if(dates.compare(h_start, h_end) < 0){
          newValues.$set.holiday_start = req.body.holiday_start;
          newValues.$set.holiday_end = req.body.holiday_end;
        }else{
          res.status(400);
          newValues = {};
          res.send("Ошибка! Даты срока отпуска введены неправильно. Отмена всех изменении");
        }
      }


      console.log(newValues);
      if(newValues.$set){
        collection.updateOne({"_id": new ObjectId(req.body.member_id)}, newValues, function(err, response) {
          if (err) throw err;
          console.log("1 document updated " + response);
          res.send("Данные успешно изменены");
          client.close();
        });
      }

    });
  });

})



router.post('/editMemberPrivate', function (req, res) {
  //console.log(req.body);
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var newValues = { $set: {} };
    var prevDoc = null;
    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.body.member_id)}, function(err, doc) {
      if (err) {
        throw err;
        res.send("Ошибка с соединением с БД");
      }

      if(req.body.sex) newValues.$set.sex = req.body.sex;
      if(req.body.id) newValues.$set.id = req.body.id;
      if(req.body.birthdate) newValues.$set.birthdate = req.body.birthdate;
      if(req.body.phone) newValues.$set.phone = req.body.phone;
      if(req.body.address) newValues.$set.address = req.body.address;
      if(req.body.address_current) newValues.$set.address_current = req.body.address_current;
      if(req.body.family_status) newValues.$set.family_status = req.body.family_status;
      if(req.body.children && req.body.children_18){
        if(req.body.children >= req.body.children_18){
          newValues.$set.children = req.body.children;
          newValues.$set.children_18 = req.body.children_18;
        }else{
          res.status(400);
          newValues = {};
          res.send("Ошибка! Неправильно введен число детей");
        }
      }
      //console.log(newValues);
      if(newValues.$set){
        collection.updateOne({"_id": new ObjectId(req.body.member_id)}, newValues, function(err, response) {
          if (err) throw err;
          console.log("1 document updated " + response);
          res.send("Данные успешно изменены");
          client.close();
        });
      }

    });
  });
})



router.post('/editMemberEdu', function (req, res) {
  //console.log(req.body);
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var newValues = { $set: {} };
    var prevDoc = null;
    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.body.member_id)}, function(err, doc) {
      if (err) {
        throw err;
        res.send("Ошибка с соединением с БД");
      }

      if(req.body.s_ed) newValues.$set.s_ed = req.body.s_ed;
      if(req.body.h_ed) newValues.$set.h_ed = req.body.h_ed;
      if(req.body.institute) newValues.$set.institute = req.body.institute;
      if(req.body.specialty) newValues.$set.specialty = req.body.specialty;
      if(req.body.ed_finish) newValues.$set.ed_finish = req.body.ed_finish;

      //console.log(newValues);
      if(newValues.$set){
        collection.updateOne({"_id": new ObjectId(req.body.member_id)}, newValues, function(err, response) {
          if (err) throw err;
          console.log("1 document updated " + response);
          res.send("Данные успешно изменены");
          client.close();
        });
      }

    });
  });
})


router.post('/editMemberShtat', function (req, res) {
  //console.log(req.body);
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var newValues = { $set: {} };
    var prevDoc = null;
    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.body.member_id)}, function(err, doc) {
      if (err) {
        throw err;
        res.send("Ошибка с соединением с БД");
      }

      if(doc.is_active === "Да"){
        newValues.$set.is_active = "Нет"
      }else{
        newValues.$set.is_active = "Да"
      }

      //console.log(newValues);
      if(newValues.$set){
        collection.updateOne({"_id": new ObjectId(req.body.member_id)}, newValues, function(err, response) {
          if (err) throw err;
          console.log("1 document updated " + response);
          res.send("Данные успешно изменены");
          client.close();
        });
      }

    });
  });
})


router.get('/update', updateStatus, function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    var filter = null;
    if(req.query.filter){
      filter = req.query.filter;
    }
    const db = client.db(dbName);
    const departments = db.collection('departments');
    const members = db.collection('members');
    var data = departments.find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      var prom = 0;
      for(let i = 0; i<result.length; i++){
          members.find({"dep_name": result[i].dep_name}).toArray(function(err, ress) {
            var newValues = { $set: {member_count: ress.length}};
            console.log(result[i].dep_name + " | " + ress.length);
            departments.updateOne({"_id": new ObjectId(result[i]._id)}, newValues, function(err, response) {
              if (err) throw err;
              prom++;
              if(prom === result.length){
                res.send("Данные успешно изменены");
                client.close();
              }
            });
          })
      }
    });
  });
})




module.exports = router
