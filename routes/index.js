var express = require('express')
var router = express.Router()

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

module.exports = router
