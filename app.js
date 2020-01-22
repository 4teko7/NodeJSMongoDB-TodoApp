var todos = [];
var allDone = [];
var isLogin = false;
var user = {};
var canRegister = true;
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
                itemsLeft : "Items Left",
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
                language : "Türkçe"
    }
module.export = todos;
module.export = allDone;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
var mysql = require("mysql");
const date = require(__dirname + "/date.js");
var dic = {todos: todos,
    allDone: allDone,
    date: date.getDate,
    isLogin:isLogin,
    user:user,
    canRegister: canRegister,
    language:language
}




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : "tododb"
});

connection.connect((err)=>{
    if(err) console.log(err);
});

// app.get("/createdb",(req,res)=>{
//     let sql = 'CREATE DATABASE tododb';
//     connection.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log("DB CREATED.");
//         res.send("tododb CREATED.");
//     });
// });


// app.get("/createtable",(req,res)=>{
//     let sql = 'CREATE TABLE users(id int AUTO_INCREMENT,username VARCHAR(255), password VARCHAR(255),PRIMARY KEY id)'
//     connection.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send("USERS TABLE CREATED");
//     });

// });

//    @@@@@@@@@@ GET METHODS  @@@@@@@@@@@@@@@



app.get("/", function (req, res) {
    dic.canRegister = true;
    
    res.render("todo", {dic:dic});
});


app.get("/register",(req,res)=>{
    res.render("register");
});

//    @@@@@@@@@@ POST METHODS  @@@@@@@@@@@@@@@



app.post("/addTodo", function (req, res) {
    
    if (req.body.todo == "") {
        res.redirect("/todo");
    } else {
        dic.todos.push({ "date": req.body.date, "todo": req.body.todo, "note": req.body.note });
        res.redirect("/");
    }
});

app.post("/markAllDone", function (req, res) {
    for (let i = 0; i < dic.todos.length; i++) {
        dic.allDone.push(dic.todos[i]);
    }
    dic.todos.length = 0;
    res.redirect("/");
});

app.post("/deleteTodo", function (req, res) {
    dic.allDone = dic.allDone.filter(item => item !== dic.allDone[req.body.todo]);
    res.redirect("/");
});

app.post("/removeAll", function (req, res) {
    dic.allDone.length = 0;
    res.redirect("/");
});

app.post("/todoDetail",function(req,res){
    res.render("todoDetail",{
        dic : dic,
        i:req.body.todo});
});

app.post("/completeTodo",function(req,res){

    dic.allDone.push(dic.todos[req.body.todo])
    dic.todos = (dic.todos).filter(item => item !== (dic.todos)[req.body.todo]);
    res.redirect("/");
});


app.post("/login",(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let query = `SELECT * FROM users where username = '${username}' and password = '${password}'`;
        connection.query(query,(err,result) => {
            if(err){
                res.redirect("/");
            }else{
                dic.user = result[0]
                logged(res);
            }
        });

});

function logged(res){
    
    dic.isLogin = true;

    let query = `Select todos From users where username = '${dic.user.username}'`;
    connection.query(query,(err,result)=>{
        if(err) {
            res.redirect("/");
        }
        if(result[0] != undefined){
            if(result[0].todos != null){
                var parsed = JSON.parse(result[0].todos);
 
                for(var i = 0; i < parsed.length; i++){
                    dic.todos.push(parsed[i]);
                }
        }
        }
    });

    query = `Select allDone from users where username = '${dic.user.username}'`;
    connection.query(query,(err,result)=>{
        if(err){
            res.redirect('/');
        }
        if(result[0] != undefined){
            if(result[0].allDone != null){
                parsed = JSON.parse(result[0].allDone);
                
                for(var i = 0; i < parsed.length; i++){
                    dic.allDone.push(parsed[i]);
                }
                 
            }
        }
    });
    res.redirect("/");
            
}
app.post("/logout",(req,res)=>{
    dic.isLogin = false;
    
    let stringifyTodos = JSON.stringify(dic.todos);
    let stringifyAllDone = JSON.stringify(dic.allDone);
    let query = `Update users set todos = '${stringifyTodos}' where username = '${dic.user.username}'`;
    connection.query(query,(err,result)=>{
        
    });
    query = `update users set allDone = '${stringifyAllDone}' where username = '${dic.user.username}'`;
    connection.query(query,(err,result)=>{

    });
    dic.todos.length = 0;
    dic.allDone.length = 0;
    res.redirect("/");
});

app.post("/register",(req,res)=>{
    console.log(req.body)
    let firstname = req.body.firstname;
    let surname = req.body.surname;
    let username = req.body.username;
    let password = req.body.password;
    let gender = "";
    if(req.body.man){
        gender = "Man";
    }else if(req.body.woman){
        gender = "Woman";
    }else{
        gender = "No Gender"
    }

    let queryFirst = `SELECT * FROM users WHERE username = '${username}'`;
    connection.query(queryFirst,(err,result)=>{

        if(result[0] != undefined){
            dic.canRegister = false;
            dic.isLogin = false;
            dic.user = {};
            dic.gender = "";
            dic.date = "";
            res.render("register",{dic:dic});
        }else{
            dic.canRegister = true;
            dic.user = {name:firstname,surname:surname,username:username,password:password,date:date(),gender:gender};
            let query = "INSERT INTO users SET ?";
            connection.query(query,dic.user,(err,result)=>{
                if(err) throw err;
                console.log("User Added.");
        
            });
            logged(res);
        }
    });

});

app.post("/en",(req,res)=>{

    dic.language = {welcome : "Welcome, ",
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
                itemsLeft : "Items Left",
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
                language : "Türkçe"
    }
    dic.date = date.getDate;
    res.redirect('/');

});

app.post("/tr",(req,res)=>{

    dic.language = {welcome : "Hoşgeldiniz, ",
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
                itemsLeft : "Plan Kaldı",
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
                language : "English"
    }
    dic.date = date.tarih;
    res.redirect('/');

});

app.listen(process.env.PORT || 8000, function () {
    console.log("app started");
});