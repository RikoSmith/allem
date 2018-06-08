var express = require('express')
var router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/maptest', function (req, res) {
  res.render('sb-admin/map')
})


router.get('/test', function (req, res) {
  res.render('index')
})

router.get('/ru', function (req, res) {
  res.render('index')
})

router.get('/en', function (req, res) {
  res.render('index')
})

router.get('/kz', function (req, res) {
  res.render('index')
})


//convert-excel-to-json --config='{"sourceFile": "workers.xlsx", "outputJSON": true, "columnToKey": {"A": "lastname", "B": "name", "C": "middlename", "D": "birthdate", "E": "id", "F": "position", "G": "phone", "H": "address", "I": "address_current", "J": "department", "K": "dep_name"}}'

router.get('/db', function (req, res) {
  var testdb = "null";

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('members');

    client.close();
  });
})



module.exports = router
