var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



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
      console.log(result);
      res.render('sb-admin/tables', {members: result});
      client.close();
    });



  });
})


router.get('/maptest', checkSignIn, function (req, res) {
  res.render('sb-admin/map')
})


router.get('/test', function (req, res) {
  res.render('index')
})


router.get('/map', function (req, res) {
  res.render('sb-admin/map_view')
})

module.exports = router
