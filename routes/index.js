var express = require('express');
var router = express.Router();
var request = require('request');
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")
let SingleCategory = require("../models/singleCategory")
let Experience = require("../models/experiences")
let SignUp = require("../models/signup")


let SearchCard = require("../models/searchCards")
let SexualAssault = require('../models/sexualAssault');

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
  category.tags.push("bestiality",
  "animal sex",
  "cow dog ","cat ox goat",
  "penalty for bestiality","laws"
  );
  console.log(category.description);
  let promise = category.save();
  promise.then(()=>{
      console.log("Card added");
      res.redirect('/');
  })
})

//Sub Category Add code
// router.post('/save', function(req, res){
//   const category = new SexualAssault;
//   category.title = "Bestiality";
//   category.actName = "National Penal(Code) 2074, Act number 36, Part 1, Chapter 18, Section 227";
//   category.image = "/images/bestiality.jpg";
//   category.definition.push({title:"What is Bestiality?"},{title:"Bestiality", text:"refers to the sexual intercourse with the animals."})
//   category.lawText.push("What does the Law say?","No person shall have, or cause to be had, sexual intercourse with an animal.");

//   category.filingComplaintText.push("Filing of Complaint");

//   category.punishmentText.push("Penalty for Bestiality","A person who commits bestiality shall be liable to the following sentence:","A sentence of imprisonment for a term not exceeding two years and a fine not exceeding twenty thousand rupees, if the person has committed, or caused to be committed, sexual intercourse with a cow. ","A sentence of imprisonment for a term not exceeding one year and a fine not exceeding ten thousand rupees, in the case of sexual intercourse with any other animal.");

//   category.compensationText.push("Compensation to be Provided","No compensation shall be provided for this offence.");

//   category.limitation.push("Limitation to File a Report","The complaint against the perpetrator should be filed within three months from the date of commission of the offence.");
  
//   let promise = category.save();
//   promise.then(()=>{
//       console.log("sub catergories added");
//       console.log("Category added");
//       res.redirect('/categories');
//   })
// })

/* GET home page. */
router.get('/', async function(req, res, next) {
  let categories = await Categories.find();
  let safetyTips = await SafetyTips.find();
    res.render('index', { title: 'Saral Kanoon', subTitle:'Law Made Easy', categoryList: categories, safetyTipList: safetyTips});
});


// Get to Category Page
router.get('/categories', async function(req, res, next){
  let sexualAssaultCategories = await SexualAssault.find();
  res.render('categories',{title: 'Saral Kanoon', subTitle:'Law Made Easy', sexualAssaultCategoriesList: sexualAssaultCategories});
});

router.get('/single-category', async function(req, res, next){
  let singleCategory = await SingleCategory.find();
  res.render('singleCategory',{title: 'Saral Kanoon', subTitle:'Law Made Easy', singleCategory: singleCategory[0]});
});

router.get('/sexual-assault/:title', function(req, res, next){
  SexualAssault.findOne({title: req.params.title}, function(err, sexualAssault){
    res.render('sexualAssault',{title: 'Saral Kanoon', subTitle:'Law Made Easy', sexualAssault: sexualAssault});
  });
});

router.get('/login', function(req, res, next){
  res.render('login',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/aboutus', function(req, res, next){
  res.render('aboutus',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});
router.get('/signup', function(req, res, next){
  res.render('signup',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

router.get('/experiences', async function(req, res, next){
  let experience = await Experience.find();
  res.render('experiences',{title: 'Saral Kanoon', subTitle:'Law Made Easy', experienceList: experience});
});


router.get('/addExperience', function(req, res, next){
  res.render('addExperience',{title: 'Saral Kanoon', subTitle:'Law Made Easy'});
});

// router.get('/search', async function(req, res, next){
//   var regex = new RegExp(req.query.value,"i");
//   console.log(regex);
//   let searchCards = await SearchCard.find({tags: regex});
//   if (searchCards.length == 0){
//     console.log("Sorry, no result found! Try using another keyword.")
//   }
//   res.render('searchCards',{title: 'Saral Kanoon', subTitle:'Law Made Easy', searchCardList: searchCards});
// });

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
  res.render('searchCards',{title: 'Saral Kanoon', subTitle:'Law Made Easy', searchCardList: uniqueSearchCards});
});

router.get('/searchExp', async function(req, res, next){
  var regex = new RegExp(req.query.value,"i");
  console.log(regex);
  let searchExperience = await Experience.find({tag: regex});
  if (searchExperience.length == 0){
    console.log("Sorry, no result found! Try using another keyword.")
  }
  res.render('experiences',{title: 'Saral Kanoon', subTitle:'Law Made Easy', experienceList: searchExperience});
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
