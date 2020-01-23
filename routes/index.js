
const express = require("express");
const router = express.Router();
const authenticate = require("../config/auth.js").authenticate;
const notAuthenticate = require("../config/auth.js").notAuthenticate;
var language = require("../language.js").language;
router.get('/',notAuthenticate,(req,res)=> res.render('index'))
router.get('/dashboard',authenticate,(req,res)=> {

    res.render("todo", {user:req.user,authenticate:authenticate,language:language});
});




module.exports = router;