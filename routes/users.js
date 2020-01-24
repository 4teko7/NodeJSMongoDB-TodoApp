const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');
const notAuthenticate = require("../config/auth.js").notAuthenticate;
const authenticate = require("../config/auth.js").authenticate;

// Mongoose User Model
const User = require('../models/User');

//Login Page
router.get('/login',notAuthenticate,(req,res)=> res.render('login'));

//Register Page
router.get('/register',notAuthenticate,(req,res)=> res.render('register'));

router.post('/register',async (req,res)=>{
    let {name,username,password,confirmPassword} = req.body;
    let err = [];

    if(!name || !username || !password || !confirmPassword){
        err.push({message : "Please fill in all fields !"});
    }

    if(password !== confirmPassword){
        err.push({message : "Passwords do not match !"});
    }

    if(password.length < 6){
        err.push({message : "Password should be at least 6 characters !"});
    }

    if(err.length > 0){
        res.render("register",{
            err:err,
            name:name,
            username:username,
            password:password,
            confirmPassword:confirmPassword
        });
    }else{
        // Register Successful
        User.findOne({username : username})
        .then(user =>{
            if(user){
                err.push({message : "Please select a different 'Username'"});
                res.render("register",{
                    err:err,
                    name:name,
                    username:username,
                    password:password,
                    confirmPassword:confirmPassword
                }); 
            }else{

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                      console.log(err);
                    } else {
                      bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);

                        } else {
                          password = hash;
                          const newUser = new User({
                            name:name,
                            username:username,
                            password: password
                        });
                        console.log(newUser);
                        newUser.save()
                            .then(user => {
                            req.flash("successMessage","Successfully Registered , You Can Login");
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                        }
                      })
                    }
                  }) 
                
            }
        })
        .catch(err => console.log());



    }

});

// @@@@@@@@@@@@ LOGIN POST REQUEST  @@@@@@@@@@@@@@@@@@@@@@@@@@@@

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
    })(req,res,next);
});


// @@@@@@@@@@@@ LOGOUT POST REQUEST  @@@@@@@@@@@@@@@@@@@@@@@@@@@@


router.get('/logout',authenticate,(req,res)=>{
    req.logOut();
    req.flash("successMessage","You Are Successfully Logged Out");
    res.redirect('/');
});





module.exports = router;
