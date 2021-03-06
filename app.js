
// @@@@@@@@@@@@@@@@ REQUIRING MODULES @@@@@@@@@@@@@@@@@@@@@@@
const express = require("express");
const app = express();

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require("express-session");
const passport = require('passport');
require(__dirname + '/config/passport')(passport);
const authenticate = require(__dirname + "/config/auth.js").authenticate;
const notAuthenticate = require(__dirname + "/config/auth.js").notAuthenticate;
var language = require(__dirname + "/language.js").language;
const bodyParser = require("body-parser");
const request = require("request");
const date = require(__dirname + "/date.js");
const User = require(__dirname + '/models/User');

// @@@@@@@@@@@@@@@@@@ INITIALIZE MODULES @@@@@@@@@@@@@@@@@@@@@



app.use(express.urlencoded({extended : false}));
app.use(express.static("public"));
app.use(expressLayouts);
app.set('view engine','ejs');
app.use(flash());


// @@@@@@@@@@@@@@@@@    DB CONFIG - MongoDb Connect @@@@@@@@@@@@@@@@@@@@@@@@@@
const db = require(__dirname + '/config/keys').MongoURI;

mongoose.connect(db,{ useUnifiedTopology : true,useNewUrlParser: true })
.then(() => console.log('MongoDb Connected'))
.catch(err => console.log(err));


// @@@@@@@@@@@@@@@@   EXPRESS SESSION   @@@@@@@@@@@@@@@@@@@@@@@@@@

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

// Passport Middleware

app.use(passport.initialize());
app.use(passport.session());



//@@@@@@@@@@@@   GLOBAL VARIABLES   @@@@@@@@@@@@@
app.use((req,res,next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.error = req.flash('error');
    next();
});


// @@@@@@@@@@  IMPORTING ROUTES   @@@@@@@@@@@@@@@
const routerIndex = require(__dirname + '/routes/index');
const routerUsers = require(__dirname + '/routes/users');




//    @@@@@@@@@@ GET METHODS  @@@@@@@@@@@@@@@


app.use('/',routerIndex);
app.use('/users',routerUsers);


//    @@@@@@@@@@ POST METHODS  @@@@@@@@@@@@@@@



app.post("/addTodo", authenticate,function (req, res) {

    if (req.body.todo == "") {
        res.redirect("/dashboard");
    } else {
        
            req.user.todos.push({ "date": req.body.date, "todo": req.body.todo, "note": req.body.note });
            req.user.save();
            
        res.redirect("/dashboard");
    
    }
});

app.post("/markAllDone", authenticate,function (req, res) {
   

    for (let i = 0; i < req.user.todos.length; i++) {
        
        req.user.alldone.push(req.user.todos[i]);
    }
    req.user.todos = [];
    req.user.save();
    res.redirect("/dashboard");
});

app.post("/deleteTodo", authenticate,function (req, res) {
    
    req.user.alldone = req.user.alldone.filter(item => item !== req.user.alldone[req.body.todo]);
    req.user.save();
    res.redirect("/dashboard");
});

app.post("/removeAll", authenticate,function (req, res) {
    
    req.user.alldone =  [];
    req.user.save();
    res.redirect("/dashboard");
});

app.post("/todoDetail",authenticate,function(req,res){
    res.render("todoDetail",{todo : req.user.todos[req.body.todo],language:language});
});

app.post("/completeTodo",authenticate,function(req,res){
    
    req.user.alldone.push(req.user.todos[req.body.todo])
    req.user.todos = (req.user.todos).filter(item => item !== (req.user.todos)[req.body.todo]);
    req.user.save();
    res.redirect("/dashboard");
});


app.post("/notcompletetodo",authenticate,function(req,res){
    req.user.todos.push(req.user.alldone[req.body.todo])
    req.user.alldone = (req.user.alldone).filter(item => item !== (req.user.alldone)[req.body.todo]);
    req.user.save();
    res.redirect("/dashboard");
});
app.post("/editTodo",authenticate,function(req,res){

    res.render("editTodo",{todo :  req.user.todos[req.body.todoid],language:language,todoid:req.body.todoid});

});

app.post("/completeEdit",authenticate,function(req,res){
    req.user.todos = (req.user.todos).filter(item => item !== (req.user.todos)[req.body.todoid]);
    req.user.todos.push({ "date": (req.body.date == "") ? "" : req.body.date, "todo": req.body.textAreaTodo, "note": req.body.textAreaNote });
    req.user.save();
    res.redirect("/dashboard");

   
    


});
app.post("/en",authenticate,(req,res)=>{

    language = {welcome : "Welcome, ",
                logout : "Logout",
                todos : "Todos",
                addTodo : "Add Todo",
                pickADate : "Pick a Date",
                writeNote : "Write Note",
                addTodo : "Add Todo",
                dates : "Dates",
                todo : "Todo",
                readMore : "Read More",
                note : "Note",
                markAllAsDone : "Mark All As Done",
                itemsLeft : " Items Left",
                alreadyDone : "Already Done",
                removeAll : "Remove All",
                itemsCompleted : "Items Completed",
                register : "Register",
                login : "Login",
                gotoMainPage : "Go to Main Page",
                usernameexist:"Username is already exist",
                man : "Man",
                woman : "Woman",
                firstname : "First Name",
                lastname : "Last Name",
                password : "Password",
                username : "Username",
                confirmPassword : "Confirm Password",
                language : "Türkçe",
                title:"Todo",
                complete:"not Complete",
                delete:"X",
                edit:"Edit",
                save:"Save",
                date : `${date.getDate}`
    }
    // dic.date = date.getDate;
    res.render('todo',{authenticate:authenticate,user:req.user,language:language});

});

app.post("/tr",authenticate,(req,res)=>{

    language = {welcome : "Hoşgeldiniz, ",
                logout : "Çıkış",
                todos : "Yapılacaklar",
                addTodoPlaceHolder : "Ne Yapmak Istersin ?",
                pickADate : "Tarih Seç",
                writeNote : "Not Yaz",
                addTodo : "Planı Ekle",
                dates : "Tarih",
                todo : "Yapılacak",
                readMore : "Devamını Oku",
                note : "Not",
                markAllAsDone : "Hepsini Yaptım",
                itemsLeft : " Plan Kaldı",
                alreadyDone : "Tamamlananlar",
                removeAll : "Hepsini Sil",
                itemsCompleted : "Plan Tamamlandı.",
                register : "Kayıt Ol",
                login : "Giriş Yap",
                gotoMainPage : "Anasayfaya Git",
                usernameexist:"Kullanıcı Adını Başkası Kullanıyor",
                man : "Bay",
                woman : "Bayan",
                firstname : "İsim",
                lastname : "Soyisim",
                password : "Şifre",
                username : "Kullanıcı Adı",
                confirmPassword : "Şifrenizi Doğrula",
                language : "English",
                title:"Planlarım",
                complete:"Tamamlanmadı",
                delete:"Sil",
                edit:"Düzenle",
                save:"Kaydet",
                date : `${date.tarih}`
    }
    res.render('todo',{authenticate:authenticate,user:req.user,language:language});

});

app.listen(process.env.PORT || 8000, function () {
    console.log("app started");
});