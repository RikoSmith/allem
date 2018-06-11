var express = require('express')
var router = express.Router()



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

router.get('/tables', function (req, res) {
  res.render('sb-admin/tables');
})


router.get('/maptest', checkSignIn, function (req, res) {
  res.render('sb-admin/map')
})


router.get('/test', function (req, res) {
  res.render('index')
})

module.exports = router
