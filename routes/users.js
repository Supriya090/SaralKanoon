const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');

//Login Page
router.get('/login', function(req, res, next){
  res.render('login',{title: 'Saral Kanoon - Login', subTitle:'Law Made Easy'});
});

//SignUp Page
router.get('/signup', function(req, res, next){
  res.render('signup',{title: 'Saral Kanoon - SignUp'});
});

router.post('/signup',function(req,res){
  console.log(req.body);
  const {username,email, gender, password, password2} = req.body;
  let errors = [];

  //Check required fields
  if(!username || !email || !password || !password2|| !gender){
    errors.push({msg:"Please fill in all fields"});
  }

  //Check passwords match
  if(password !== password2){
    errors.push({msg:"Passwords do not match"});
  }
  //Check pass length
  if(password.length < 6){
    errors.push({msg:"Password should be at least 6 characters"});
  }  

  if(errors.length > 0){
    res.render('signup',{
      errors,
      username,
      email,
      gender,
      password,
      password2
    });
  }else{
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          username,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          username,
          email,
          gender,
          password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
  }
})

//Logs the User In
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/addExperience',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
