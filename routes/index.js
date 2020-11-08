var express = require('express');
var router = express.Router();
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")

router.get('/add', function(req, res, next){
  res.render('test', {
      title: 'Add book',
  });
})

router.post('/save', function(req, res){
  // books.push({...req.body, _id: `00${books.length + 1}`});
  const category = new SafetyTips(req.body);
  let promise = category.save();
  promise.then(()=>{
      console.log("Book added");
      res.redirect('/');
  })
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  let categories = await Categories.find()
  let safetyTips = await SafetyTips.find()
  console.log(categories[0]._id);
  res.render('index', { title: 'Saral Kanoon', subTitle:'Law Made Easy', categoryList: categories, safetyTipList: safetyTips });
});

router.get('/categories', function(req, res, next){
  res.render('categories',{title:'Category'});
});

router.get('/single-category', function(req, res, next){
  res.render('singleCategory',{title:'Single Category'});
});

module.exports = router;
