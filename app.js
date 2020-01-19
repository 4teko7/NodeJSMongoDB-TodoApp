const todos = [];
var allDone = ["merhaba"];

module.export = todos;
module.export = allDone;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");
//    @@@@@@@@@@ GET METHODS  @@@@@@@@@@@@@@@

app.get("/",function(req,res){
    res.render("index",{todos:todos});
});

app.get("/signup", function (req, res) {
    res.render("signup",{todos:todos});
});

app.get("/success", function (req, res) {
    res.render("success",{todos:todos});
});
app.get("/failure", function (req, res) {
    res.render("failure",{todos:todos});
});
app.get("/todo", function (req, res) {
    res.render("todo", {
        todos: todos,
        allDone: allDone
    });
});
//    @@@@@@@@@@ POST METHODS  @@@@@@@@@@@@@@@

app.post("/success", function (req, res) {

    var firstName = req.body.username;
    var pass = req.body.pass;
    if (firstName == "bilal" && pass == "123") {
        res.redirect("/success");
    } else {
        // res.write("There is an error");
        res.redirect("/failure");
    }

});


app.post("/addTodo", function (req, res) {
    if (req.body.todo == "") {
        res.redirect("/todo");
    } else {
        todos.push(req.body.todo);
        res.redirect("/todo");
    }
});

app.post("/markAllDone", function (req, res) {
    for(let i = 0; i < todos.length; i++){
        allDone.push(todos[i]);
    }
    todos.length = 0;
    res.redirect("/todo");
});

app.post("/deleteTodo",function(req,res){
    
    allDone = allDone.filter(item => item !== req.body.todolst);
    res.redirect("/todo");
});

app.post("/removeAll",function(req,res){
    allDone.length = 0;
    res.redirect("/todo");
});

app.listen(process.env.PORT || 8000, function () {
    console.log("app started");
});