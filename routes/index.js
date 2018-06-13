var express = require('express')
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



const url = 'mongodb://admin:Zxc159Zxc159@ds139690.mlab.com:39690/allemdb';
const dbName = 'allemdb';

/* GET home page. Only public pages -------------------------------------------------------------------------*/
router.get('/', function (req, res) {
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

router.get('/login', function(req, res){
   res.render('sb-admin/login.ejs', {message: ""});
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});


router.post('/login', function(req, res){
   if(!req.body.id || !req.body.password){
      res.render('sb-admin/login', {message: "Пожалуйста, заполните все поля"});
      console.log(req.body.id);
   } else {
       if( ("admin" === req.body.id && "Zxc159Zxc159" === req.body.password) || ("kadr" === req.body.id && "Qwerty123" === req.body.password)
     || ("boss" === req.body.id && "Qwerty123654789" === req.body.password)){
         req.session.username = req.body.id;
         req.session.logged = true;
         console.log("Return to: " + req.return_url);
         if(req.session.return_url){
           var redTo = req.session.return_url;
           req.session.return_url = "/";
           res.redirect(redTo);
         }else {
           res.redirect('/');
         }
       }
      res.render('sb-admin/login', {message: "Неправильные данные"});
   }
});
/* Pages that are restricted -------------------------------------------------------------------------------*/




//convert-excel-to-json --config='{"sourceFile": "workers.xlsx", "outputJSON": true, "columnToKey": {"A": "lastname", "B": "name", "C": "middlename", "D": "birthdate", "E": "id", "F": "position", "G": "phone", "H": "address", "I": "address_current", "J": "department", "K": "dep_name"}}'




module.exports = router
