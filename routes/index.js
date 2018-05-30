var express = require('express')
var router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';

/* GET home page. */
router.get('/', function (req, res) {
  res.render('error')
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

router.get('/db', function (req, res) {
  var testdb = "null";

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('lang');

    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);

      res.send(docs);

    });

    client.close();
  });
})



module.exports = router
