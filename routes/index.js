var express = require('express');
var router = express.Router();
var request = require('request');
// var safetyEquipment = require('../resources/safetyEquip')
// var selfDefenseTechniques = require('../resources/selfDefense');
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")
let SingleCategory = require("../models/singleCategory")
let SearchCard = require("../models/searchCards");

router.get('/add', function(req, res, next){
  res.render('test', {
      title: 'Add book',
  });
})

router.post('/save', function(req, res){
  // books.push({...req.body, _id: `00${books.length + 1}`});
  const category = new SearchCard(req.body);
  category.tags.push("domestic","violence","women","physical","mental","harm","perpetrator","penalty");
  console.log(category.description);
  let promise = category.save();
  promise.then(()=>{
      console.log("Card added");
      res.redirect('/search');
  })
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  let categories = await Categories.find()
  let safetyTips = await SafetyTips.find()
  console.log(categories[0]._id);
  res.render('index', { title: 'Saral Kanoon', subTitle:'Law Made Easy', categoryList: categories, safetyTipList: safetyTips });
});

// Get to Category Page
router.get('/categories', function(req, res, next){
  res.render('categories',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/single-category', async function(req, res, next){
  let singleCategory = await SingleCategory.find()
  res.render('singleCategory',{title: 'Saral Kanoon', subTitle:'Law Made Easy', singleCategoryList: singleCategory});
});

router.get('/login', function(req, res, next){
  res.render('login',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/signup', function(req, res, next){
  res.render('signup',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/experiences', function(req, res, next){
  res.render('experiences',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});


router.get('/addExperience', function(req, res, next){
  res.render('addExperience',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/search', async function(req, res, next){
  var regex = new RegExp(req.query.value,"i");
  console.log(regex);
  let searchCards = await SearchCard.find({tags: regex});
  res.render('searchCards',{title: 'Saral Kanoon', subTitle:'Law Made Easy', searchCardList: searchCards});
});

router.get('/safetyTips0',function(req,res,next){
  request("https://supriya090.github.io/SaralKanoonAPIs/self-defense.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var selfDefenseTechniques = JSON.parse(body);
    res.render('safetyTips0',{title: 'Saral Kanoon', subTitle:'Law Made Easy', selfDefenseTechniqueList: selfDefenseTechniques});
    }
  })
})

router.get('/safetyTips1',function(req,res,next){
  request("https://supriya090.github.io/SaralKanoonAPIs/safety-equip.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var safetyEquipment = JSON.parse(body);
     res.render('safetyTips1',{title: 'Saral Kanoon', subTitle:'Law Made Easy', safetyEquipmentList: safetyEquipment});
    }
  })
})

module.exports = router;
