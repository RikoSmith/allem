var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;



const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';



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
router.get('/', function (req, res) {
  res.render('sb-admin/index');
})

router.get('/members', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.render('sb-admin/tables', {members: result});
      client.close();
    });



  });
})

router.get('/departments', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.render('sb-admin/departments', {members: result});
      client.close();
    });
  });
})


router.get('/maptest',  function (req, res) {
  res.render('sb-admin/map')
})


router.get('/test', function (req, res) {
  res.render('index')
})


router.get('/map', function (req, res) {
  res.render('sb-admin/map_view')
})


router.get('/member/:member_id', function (req, res) {

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('members');
    var data = collection.findOne({"_id": new ObjectId(req.params.member_id)}, function(err, doc) {
      if (err) throw err;
      //console.log(doc);
      res.render('sb-admin/member', {member: doc});
      client.close();
    });

  });

})


router.post('/editMember', function (req, res) {
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

      if(req.body.name) newValues.$set.name = req.body.name;
      if(req.body.lastname) newValues.$set.lastname = req.body.lastname;
      if(req.body.middlename) newValues.$set.middlename = req.body.middlename;
      if(req.body.position) newValues.$set.position = req.body.position;
      if(req.body.department) newValues.$set.department = req.body.department;
      if(req.body.start_date && req.body.end_date){
        if(req.body.start_date < req.body.end_date){
          newValues.$set.start_date = req.body.start_date;
          newValues.$set.end_date = req.body.end_date;
        }else{
          res.status(400);
          newValues = {};
          res.send("Ошибка! Даты введены неправильно. Отмена всех изменении");
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




module.exports = router
