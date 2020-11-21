var express = require('express');
var router = express.Router();
var request = require('request');
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")
let SingleCategory = require("../models/singleCategory")
let Experience = require("../models/experiences")
let CyberLaw = require("../models/cyberlaw");
let SearchCard = require("../models/searchCards")
let SexualAssault = require('../models/sexualAssault');

const {ensureAuthenticated} = require("../config/auth");

router.get('/addExperience', ensureAuthenticated, function(req, res, next){
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('addExperience',{title: 'Saral Kanoon - Add Experience', userName: req.user.username});
});

//Posts User Experiences
router.post('/postExperience', function(req, res){
  const experience = new Experience(req.body);
  console.log(experience);
  let promise = experience.save();
  promise.then(() => {
      console.log('experience posted');
      res.redirect('/experiences');
  })
 
});


router.get('/add', function(req, res, next){
  res.render('test', {
      title: 'Add book',
  });
})


// Search Card add code
router.post('/save', function(req, res){
  // books.push({...req.body, _id: `00${books.length + 1}`});
  const category = new SearchCard(req.body);
  category.tags.push("child abuse",
  "sexual assault",
  "child molestation",
  "assault",
  "sexual assault",
  "penalty for child abuse",
  "bad touch",
  "child harassment",
  "organization for child safety",
  "safety laws");
  console.log(category.description);
  let promise = category.save();
  promise.then(()=>{
      console.log("Card added");
      res.redirect('/');
  })
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.isAuthenticated());
  let categories = await Categories.find();
  let safetyTips = await SafetyTips.find();
    res.render('index', { title: 'Saral Kanoon',subTitle:'Law Made Easy', categoryList: categories, safetyTipList: safetyTips, isLoggedIn: req.isAuthenticated()});
});


// Get to Category Page
router.get('/categories', async function(req, res, next){
  let sexualAssaultCategories = await SexualAssault.find();
  let cyberLawCategories = await CyberLaw.find();
  res.render('categories',{title: 'Saral Kanoon', subTitle:'Law Made Easy', sexualAssaultCategoriesList: sexualAssaultCategories, cyberLawCategoryList: cyberLawCategories, isLoggedIn: req.isAuthenticated()});
});

router.get('/single-category', async function(req, res, next){
  let singleCategory = await SingleCategory.find();
  res.render('singleCategory',{title: 'Saral Kanoon', subTitle:'Law Made Easy', singleCategory: singleCategory[0], isLoggedIn: req.isAuthenticated()});
});

router.get('/sexual-assault/:title', function(req, res, next){
  SexualAssault.findOne({title: req.params.title}, function(err, sexualAssault){
    res.render('sexualAssault',{title: 'Saral Kanoon', subTitle:'Law Made Easy', sexualAssault: sexualAssault, isLoggedIn: req.isAuthenticated()});
  });
});

router.get('/cyber-law/:title', function(req, res, next){
  CyberLaw.findOne({title: req.params.title}, function(err, cyberlaw){
    res.render('cyberlaw',{title: 'Saral Kanoon', subTitle:'Law Made Easy', cyberlaw: cyberlaw, isLoggedIn: req.isAuthenticated()});
  });
});

router.get('/aboutus', function(req, res, next){
  res.render('aboutus',{title: 'Saral Kanoon', subTitle:'Law Made Easy', isLoggedIn: req.isAuthenticated()});
});

router.get('/experiences', async function(req, res, next){
  let experience = await Experience.find();
  res.render('experiences',{title: 'Saral Kanoon', experienceList: experience, isLoggedIn: req.isAuthenticated()});
});




// final search wala

router.get('/search', async function(req, res, next){
  let searchArray = req.query.value.split(" ");
  var searchCards = [];
  console.log(req.query.value.split(" "));
  for(let i =0; i<searchArray.length; i++){
  var regex = new RegExp(searchArray[i],"i");
  searchCards.push(await SearchCard.find({tags: regex}));
  }
  console.log(searchCards);
  let stringSearchCards = searchCards.map(JSON.stringify);
  let uniqueStringSearchCards = new Set(stringSearchCards);
  let uniqueSearchCards = Array.from(uniqueStringSearchCards, JSON.parse);

  if (uniqueSearchCards.length == 0){
    console.log("Sorry, no result found! Try using another keyword.")
  }
  res.render('searchCards',{title: 'Saral Kanoon', isLoggedIn: req.isAuthenticated(), searchCardList: uniqueSearchCards});
});

router.get('/searchExp', async function(req, res, next){
  var regex = new RegExp(req.query.value,"i");
  console.log(regex);
  let searchExperience = await Experience.find({tag: regex});
  if (searchExperience.length == 0){
    console.log("Sorry, no result found! Try using another keyword.")
  }
  res.render('experiences',{title: 'Saral Kanoon', isLoggedIn: req.isAuthenticated(), experienceList: searchExperience});
});

router.get('/safetyTips0',function(req,res,next){
  request("https://supriya090.github.io/SaralKanoonAPIs/self-defense.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var selfDefenseTechniques = JSON.parse(body);
    res.render('safetyTips0',{title: 'Saral Kanoon', isLoggedIn: req.isAuthenticated(), selfDefenseTechniqueList: selfDefenseTechniques});
    }
  })
})

router.get('/safetyTips1',function(req,res,next){
  request("https://supriya090.github.io/SaralKanoonAPIs/safety-equip.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var safetyEquipment = JSON.parse(body);
     res.render('safetyTips1',{title: 'Saral Kanoon', isLoggedIn: req.isAuthenticated(), safetyEquipmentList: safetyEquipment});
    }
  })
})

module.exports = router;
