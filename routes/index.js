var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saral Kanoon', subTitle:'Law Made Easy' });
});

module.exports = router;
