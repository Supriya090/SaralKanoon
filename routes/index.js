var express = require('express');
var router = express.Router();
var request = require('request');
// var safetyEquipment = require('../resources/safetyEquip')
let Categories = require("../models/categories");
let SafetyTips = require("../models/safety")
let DomesticViolence = require("../models/DomesticViolence")

router.get('/add', function(req, res, next){
  res.render('test', {
      title: 'Add book',
  });
})

router.post('/save', function(req, res){
  // books.push({...req.body, _id: `00${books.length + 1}`});
  const category = new DomesticViolence;
  category.title = "Domestic Violence";
  category.actName = "Domestic Violence Act, 2066";

  category.definition.push({title:"What is Domestic Violence?"},{title: "Domestic Violence", text:" means any form of physical, mental, sexual and economic harm perpetrated by a person to a person with whom he/she has a family relationship. This word also includes any acts of reprimand or emotional harm."}, {title: "Domestic relationship", text:" means a relationship between two or more persons who are living together in a shared household and are related by blood, marriage, adoption or are family members living together as a joint family. A dependent domestic help living in the same family is also considered as a domestic relationship"}, {title: "Physical harm", text:" means an act of committing or causing bodily harm or injury. Holding as a captive, inflicting physical pain or any other connected acts are also included in physical harm except the act of breaking the limbs of the body (Angabhanga)."},{text:"Note: Laws related to breaking limbs of body(Angabhaga) can be found in Part 2, Chapter 14 of the Penal Code, 2074"}, {title: "Mental harm", text:" means any act of threatening the Victim of physical torture, showing terror, reprimanding him/her, accusing him/her of false blame, forcefully evicting him/her from the house or otherwise causing injury or harm to the Victim emotionally. This expression also includes any discrimination carried out on the basis of thought, religion or culture and customs and traditions."}, {title: "Sexual harm", text:" means sexual misbehaviour, humiliation, discouragement or harm in self respect of any person; or any other act that hampers safe sexual health."}, {title: "Economic harm", text:" means deprivation from using jointly or privately owned property or deprivation of or access to employment opportunities, economic resources or means."});

  category.lawText.push("What does the Law say?","No one shall commit; or help or encourage; or incite for the commission of the act of domestic violence.", "A person who commits such an act shall be deemed to have committed an offence under the Domestic Violence Act, 2066.");

  category.filingComplaintText.push("Filing of Complaint","If a person knows that an act of domestic violence has been committed, or is being committed, or likely to be committed, they may lodge a written or oral complaint setting out the details, to the nearest Police Office, National Women Commission or Local body.","If the complaint is filed before the National Women Commission, necessary action shall be taken in accordance with Prevailing National Women Commission law.","If the complaint is filed before the Police Office, the Police Office has to produce the perpetrator within 24 hours of the complaint, excluding the time of travel. The Police Office has to arrest the perpetrator within the same 24 hrs if they refuse to appear for the statement.","If the complaint is filed in the Local Body, the Local Body has to produce the perpetrator within 24 hours of the complaint, excluding the time of travel. If the perpetrator refuses to appear for the statement, the Local Body has to request the nearest police office to make the arrest within the same 24 hrs.","If the Victim has been physically wounded or mentally tortured as a result of the act of domestic violence, they shall be immediately sent to the nearest hospital or health post for necessary check-up and an injury report shall be drawn up. If the medical report is caused to be prepared by the Local Body, a copy of it shall be sent to the Police Station.","If it is found necessary to provide protection to Victim and his/her dependants from the preliminary investigation on the complaint, it shall be provided immediately with the assistance of the Police Office.","If the victim desires, the police officer or local body (where the complaint has been filed) can conduct the reconciliation between them and the perpetrator, but it should be within 30 days from the date of registration of complaint. After the reconciliation, the case will not be taken to the court.", "The assistance of a psychologist, sociologist, social activist and a family member trusted by the Victim and any other witness as per necessity and availability may be taken while conducting the reconciliation. In the course of such reconciliation psychological and social effects on the Victim, as well as his/her right to privacy shall be taken into consideration.","If the perpetrator fails to appear in the Police Office or Local Body within 24 hrs as mentioned above; or he/she cannot be made present; or the parties fail to settle their dispute through reconciliation, the Police Officer and Local body, with the consent of the complainant shall, within fifteen days after the expiry of Thirty days time for reconciliation, shall forward the case to the court. The case includes the complaint mentioning all details, along with evidence and other legal documents related to the incident.","Upon receiving a complaint, the Court shall proceed the case as follows, on the basis of such complaint.","Notwithstanding anything mentioned in this Section, the Victim may directly file their complaint to the Court.");

  category.protectionText.push("Inbetween Protection Orders","If the Court has reason to believe, on the basis of preliminary investigation of the complaint that the Victim needs to be given immediate protection, it may, till the time the final decision on the complaint is made, pass the following orders against the perpetrator:","To allow the Victim to continue to live in the shared house, to provide him/her with food, clothes, to not cause physical injury to him/her and to behave with him/ her in a civilized and dignified manner.","To manage for necessary treatment or to give money for the treatment of the Victim if he/ she has suffered physical or mental injury.","To make necessary arrangements for the separate stay of the perpetrator in a case that it’s not conducive for them to live together, and make necessary arrangements for the maintenance of the Victim.","To not insult, threaten or behave in an uncivilized manner; or not to cause to do these acts.","To not harass the Victim by entering his/ her place of separate residence; or in public roads; or entering his/ her place of employment; or through the communication media or in any other manner.","To carry out or cause to carry out necessary and relevant actions for the protection and welfare of the Victim.","If it is found necessary to provide any protection like above to minor children or any other dependent of the victim from the preliminary investigation of the complaint, the Court shall issue an appropriate order for that purpose.");

  category.cameraText.push("Proceedings to be held in Camera","If it is so requested by the Victim, the court shall conduct in camera proceedings and hearings of the complaint relating to this Act.","During in camera proceedings and hearings, the claimant(person who lodged the complaint), defendant, their legal practitioners and those who are so permitted by the Court, shall be allowed to enter into the courtroom.");

  category.perpetratorExpensesText.push("Perpetrator to bear expenses of treatment","The total costs of treatment of the victim of the domestic violence, who has sustained physical or mental injuries so as to require medical help in the hospital, shall be borne by the perpetrator.","If the Court has reason to believe that the perpetrator is unable to pay such an amount due to economic reasons, the court may order the Service Center to provide treatment expenses to the Victim.");

  category.compensationText.push("Compensation to be Provided","The Court may, depending on the nature of the act of domestic violence and degree, the pain suffered by the Victim, and also taking into account the economic and social status of the perpetrator and Victim, order the perpetrator to pay appropriate compensation to the Victim.");

  category.serviceCentreText.push("Service Centers","The Government of Nepal, as per necessity, may establish Service Centers for the purpose of immediate protection of the Victim, and for the separate accommodation of the Victim during the course of treatment.","For this purpose, an organization may establish and operate Service Centers upon receiving approval as prescribed in the Domestic Violence Act 2066.","The Service Centre shall provide, as per necessity, legal aid, psycho-consultation service, psychological Service and economic aid to the Victim.","The provisions of management, operation and monitoring of the Service Centre shall be as prescribed in the Domestic Violence Act 2066.","Service Centers operating for this purpose may be given financial aid and other aid from the Service Fund.");
  
  category.serviceFundText.push("Service Funds","The Government of Nepal shall establish a Service Fund for the operation of Service Centers mentioned in the previous section.","The fund shall consist of the following amounts","The amount received from the Government of Nepal,","The amount received from any national or foreign organization, institution or individual,","The amount received from any other source.","The management and operation of the Service Fund shall be as prescribed.");

  category.penaltyText.push("Penalty","A person who commits an act of domestic violence shall be punished with a fine of Three Thousand Rupees upto Twenty Five Thousand Rupees or Six months of imprisonment or both.","A person who attempts to commit domestic violence or abets the crime or incites others to commit the crime shall be liable to half the punishment of the perpetrator.","A person who has been punished once for the offence of domestic violence shall be liable to double the punishment upon every repetition of the offence.","If a person holding a public post commits the offence of domestic violence, he/she shall be liable to an additional ten percent punishment.","A person who disobeys the Court orders to grant interim protection to the victim shall be punished with a fine of Two Thousand Rupees upto Fifteen Thousand Rupees or Four months of imprisonment or both.");

  category.limitation.push("Limitation","The complaint, for an offence committed pursuant to this Act, shall be filed within Ninety days of the commission of the crime.");

  category.organization.push({title:"Organizations Working for this Purpose"},{title:"National Women Commission",link:"https://www.nwc.gov.np/"},{title:"Saathi Women Shelter",link:"https://saathi.org.np/women-shelter/"},{title:"Burns Violence Survivors",link:"https://www.bvsnepal.org.np/about/"});

  console.log(category.definition[0]);
  let promise = category.save();
  promise.then(()=>{
      console.log("Book added");
      res.redirect('/single-category');
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
  res.render('categories',{title:'Category'});
});

router.get('/single-category', async function(req, res, next){
  let singleCategory = await DomesticViolence.find()
  res.render('singleCategory',{title:'Saral Kanoon - Single Category', singleCategoryList: singleCategory});
});

router.get('/login', function(req, res, next){
  res.render('login',{title:'Login'});
});

router.get('/signup', function(req, res, next){
  res.render('signup',{title:'Sign Up'});
});

router.get('/safetyTips0',function(req,res,next){
  res.render('safetyTips0',{title:"Safety Tips"});
})

router.get('/experiences', function(req, res, next){
  res.render('experiences',{title:'Experiences'});
});


router.get('/addExperience', function(req, res, next){
  res.render('addExperience',{title:'Add Experiences'});
});



router.get('/safetyTips1',function(req,res,next){
  request("https://supriya090.github.io/SaralKanoonAPIs/safety-equip.json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var safetyEquipment = JSON.parse(body);
     console.log(safetyEquipment);
     res.render('safetyTips1',{title:"Saral Kanoon - Safety Equipments", safetyEquipmentList: safetyEquipment});
    }
  })
})

module.exports = router;
