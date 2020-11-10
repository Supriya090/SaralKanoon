var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Saral Kanoon', subTitle:'Law Made Easy' });
});

// Get to Category Page
router.get('/categories', function(req, res, next){
  res.render('categories',{title:'Category'});
});

router.get('/login', function(req, res, next){
  res.render('login',{title:'Login'});
});

router.get('/signup', function(req, res, next){
  res.render('signup',{title:'Sign Up'});
});


router.get('/experiences', function(req, res, next){
  res.render('experiences',{title:'Experiences'});
});


router.get('/addExperience', function(req, res, next){
  res.render('addExperience',{title:'Add Experiences'});
});




module.exports = router;
