var todos = [];
var allDone = [];

module.export = todos;
module.export = allDone;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const date = require(__dirname + "/date.js");


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");
//    @@@@@@@@@@ GET METHODS  @@@@@@@@@@@@@@@

app.get("/", function (req, res) {
    res.render("todo", {
        todos: todos,
        allDone: allDone,
        date: date()
    });
});


//    @@@@@@@@@@ POST METHODS  @@@@@@@@@@@@@@@



app.post("/addTodo", function (req, res) {
    if (req.body.todo == "") {
        res.redirect("/todo");
    } else {
        todos.push({ "date": req.body.date, "todo": req.body.todo, "note": req.body.note });
        res.redirect("/");
    }
});

app.post("/markAllDone", function (req, res) {
    for (let i = 0; i < todos.length; i++) {
        allDone.push(todos[i]);
    }
    todos.length = 0;
    res.redirect("/");
});

app.post("/deleteTodo", function (req, res) {
    allDone = allDone.filter(item => item !== allDone[req.body.todo]);
    res.redirect("/");
});

app.post("/removeAll", function (req, res) {
    allDone.length = 0;
    res.redirect("/");
});

app.post("/todoDetail",function(req,res){
    res.render("todoDetail",{
        todos: todos,
        allDone: allDone,
        date: date(),
        i:req.body.todo});
});

app.post("/completeTodo",function(req,res){

    allDone.push(todos[req.body.todo])
    todos = todos.filter(item => item !== todos[req.body.todo]);
    res.redirect("/");
});
app.listen(process.env.PORT || 8000, function () {
    console.log("app started");
});