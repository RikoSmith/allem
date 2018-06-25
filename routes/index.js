var express = require('express')
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var bcrypt = require('bcrypt');

//MongoDB Credentials. Extremly confidential information! Don't share this url with anyone!
const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';

/* GET home page. Below are only public pages -------------------------------------------------------------------------*/
router.get('/', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log(req.params.lang);
    const db = client.db(dbName);
    const collection = db.collection('lang');
    collection.findOne({"lang": "ru"}, function(err, doc) {
      if (err) throw err;

      res.render('indexMulti', {lang: doc});
      client.close();
    });
  });
})

//Multilanguage pages
router.get('/:lang', function (req, res, next) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log(req.params.lang);
    const db = client.db(dbName);
    const collection = db.collection('lang');
    if( !['ru', 'en', 'kz'].includes(req.params.lang)) {
      next()
    }else{
      collection.findOne({"lang": req.params.lang}, function(err, doc) {
        if (err) throw err;

        res.render('indexMulti', {lang: doc});
        client.close();
      });
    }
  });
})

router.get('/google271501a1e8bc4a7f.html', function (req, res) {
  res.render('google271501a1e8bc4a7f')
})

router.get('/addMember', function (req, res) {
  res.render('survey')
})

router.get('/sitemap', function (req, res) {
  res.render('sitemap')
})

router.get('/login', function(req, res){
   res.render('sb-admin/login.ejs', {message: ""});
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});

//Login checking
router.post('/login', function(req, res){
   if(!req.body.id || !req.body.password){
      res.render('sb-admin/login', {message: "Пожалуйста, заполните все поля"});
      console.log(req.body.id);
   } else {
     MongoClient.connect(url, function(err, client) {
       assert.equal(null, err);

       console.log(req.body);
       const db = client.db(dbName);
       const collection = db.collection('users');
       collection.findOne({"id": req.body.id }, function(err, doc) {
         if (err) throw err;
         console.log(doc);
         if(doc){
           bcrypt.compare(req.body.password, doc.password, function(err, response) {
              if(response){
                req.session.user = doc;
                req.session.logged = true;
                if(req.session.return_url){
                 var redTo = req.session.return_url;
                 req.session.return_url = "/";
                 res.redirect(redTo);
                 }else {
                   res.redirect('/');
                 }
              }else{
                res.render('sb-admin/login', {message: "Неверный пароль"});
              }
          });
         }else{
           res.render('sb-admin/login', {message: "Неправильное имя пользователя"});
         }
       });
     });
   }
});

module.exports = router
