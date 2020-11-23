var express = require('express');
var router = express.Router();
var request = require('request');

//Databases
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")
let SingleCategory = require("../models/singleCategory")
let Experience = require("../models/experiences")
let CyberLaw = require("../models/cyberlaw");
let SearchCard = require("../models/searchCards")
let SexualAssault = require('../models/sexualAssault');

//Authentication
const {ensureAuthenticated} = require("../config/auth");


//Adding Search Cards
router.get('/add', function(req, res){
  res.render('test', {
      title: 'Add Search Cards',
  });
})

//Saving Search Cards
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

//Gets Homepage
router.get('/', async function(req, res) {
  console.log(req.isAuthenticated());
  let categories = await Categories.find();
  let safetyTips = await SafetyTips.find();
    res.render('index', { title: 'Saral Kanoon', categoryList: categories, safetyTipList: safetyTips, isLoggedIn: req.isAuthenticated()});
});


// Gets Category Page
router.get('/categories', async function(req, res){
  let sexualAssaultCategories = await SexualAssault.find();
  let cyberLawCategories = await CyberLaw.find();
  res.render('categories',{title: 'Saral Kanoon - Category Page', sexualAssaultCategoriesList: sexualAssaultCategories, cyberLawCategoryList: cyberLawCategories, isLoggedIn: req.isAuthenticated()});
});

//Gets Domestic Violence Law
router.get('/single-category', async function(req, res){
  let singleCategory = await SingleCategory.find();
  res.render('singleCategory',{title: 'Saral Kanoon - Domestic Violence Laws', singleCategory: singleCategory[0], isLoggedIn: req.isAuthenticated()});
});

//Gets Sexual Assault Laws
router.get('/sexual-assault/:title', function(req, res){
  SexualAssault.findOne({title: req.params.title}, function(err, sexualAssault){
    res.render('sexualAssault',{title: 'Saral Kanoon - Sexual Assault Laws', sexualAssault: sexualAssault, isLoggedIn: req.isAuthenticated()});
  });
});

//Gets Cyber Laws
router.get('/cyber-law/:title', function(req, res){
  CyberLaw.findOne({title: req.params.title}, function(err, cyberlaw){
    res.render('cyberlaw',{title: 'Saral Kanoon - Cyber Laws', cyberlaw: cyberlaw, isLoggedIn: req.isAuthenticated()});
  });
});

//Gets Law Search Cards
/* Refining to be done */
router.get('/search', async function(req, res){
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
  res.render('searchCards',{title: 'Saral Kanoon - Search Cards', isLoggedIn: req.isAuthenticated(), searchCardList: uniqueSearchCards});
});

//Gets Self Defense Techniques
router.get('/safetyTips0',function(req,res){
  request("https://supriya090.github.io/SaralKanoonAPIs/self-defense.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var selfDefenseTechniques = JSON.parse(body);
    res.render('safetyTips0',{title: 'Saral Kanoon - Self Defense Techniques', isLoggedIn: req.isAuthenticated(), selfDefenseTechniqueList: selfDefenseTechniques});
    }
  })
})

//Gets Self Defense Equipments
router.get('/safetyTips1',function(req,res){
  request("https://supriya090.github.io/SaralKanoonAPIs/safety-equip.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var safetyEquipment = JSON.parse(body);
     res.render('safetyTips1',{title: 'Saral Kanoon - Self Defense Equipments', isLoggedIn: req.isAuthenticated(), safetyEquipmentList: safetyEquipment});
    }
  })
})

//Gets User Experiences
router.get('/experiences', async function(req, res){
  let experience = await Experience.find();
  res.render('experiences',{title: 'Saral Kanoon - Read User Experiences', experienceList: experience, isLoggedIn: req.isAuthenticated()});
});

//Searches User Experiences by Tag
router.get('/searchExp', async function(req, res){
  var regex = new RegExp(req.query.value,"i");
  console.log(regex);
  let searchExperience = await Experience.find({tag: regex});
  if (searchExperience.length == 0){
    console.log("Sorry, no result found! Try using another keyword.")
  }
  res.render('experiences',{title: 'Saral Kanoon - Read User Experiences', isLoggedIn: req.isAuthenticated(), experienceList: searchExperience});
});

//Gets User Add Experiences Page
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

//Gets About Us Page
router.get('/aboutus', function(req, res){
  res.render('aboutus',{title: 'Saral Kanoon - About Us', subTitle:'Law Made Easy', isLoggedIn: req.isAuthenticated()});
});

module.exports = router;
