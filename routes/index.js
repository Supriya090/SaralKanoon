var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saral Kanoon' });
});

router.get('/categories', function(req, res, next){
  res.render('categories',{title:'Category'});
});


router.get('/rape', function(req, res, next){
  res.render('rape',{title:'Rape'});
});

router.get('/bestiality', function(req, res, next){
  res.render('bestiality',{title:'Bestiality'});
});


router.get('/childSA', function(req, res, next){
  res.render('childSA',{title:'Child Sexual Abuse'});
});

router.get('/detainneeSI', function(req, res, next) {
  res.render('detainneeSI', { title: 'Sexual Intercourse with Detainee' });
});

router.get('/harrassment', function(req, res, next){
  res.render('harrassment',{title:'Harrassment'});
});


router.get('/incest', function(req, res, next){
  res.render('incest',{title:'Incest'});
});

router.get('/underProtectionSI', function(req, res, next){
  res.render('underProtectionSI',{title:'Sexual Intercourse with Person in One\'s protection ' });
});


router.get('/unnaturalSI', function(req, res, next){
  res.render('unnaturalSI',{title:'Un-natural Sexual Intercourse'});
});


module.exports = router;
