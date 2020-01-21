var todos = [];
var allDone = [];
var isLogin = false;
var user = {};
var canRegister = true;

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
    date: date(),
    isLogin:isLogin,
    user:user,
    canRegister: canRegister
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
    console.log(dic.user);
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
    dic.todos = dic.todos.filter(item => item !== dic.todos[req.body.todo]);
    res.redirect("/");
});


app.post("/login",(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let query = `SELECT * FROM users where username = '${username}' and password = '${password}'`;
        connection.query(query,(err,result) => {
            if(err){

            }else{
                dic.isLogin = true;
                dic.user = result[0]
                console.log(user);
                res.redirect("/");
            }
        });

});
app.post("/logout",(req,res)=>{

    dic.isLogin = false;
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
            console.log("DIC : " + dic);
            res.render("register",{dic:dic});
        }else{
            dic.canRegister = true;
            dic.user = {name:firstname,surname:surname,username:username,password:password,date:date(),gender:gender};
            let query = "INSERT INTO users SET ?";
            connection.query(query,dic.user,(err,result)=>{
                if(err) throw err;
                console.log("User Added.");
        
            });
            dic.isLogin = true;
            res.redirect("/");
        }
    });


    
});

app.listen(process.env.PORT || 8000, function () {
    console.log("app started");
});