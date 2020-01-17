const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//    @@@@@@@@@@ GET METHODS  @@@@@@@@@@@@@@@

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/success",function(req,res){
    res.sendFile(__dirname + "/success.html");
});
app.get("/failure",function(req,res){
    res.sendFile(__dirname + "/failure.html");
});

//    @@@@@@@@@@ POST METHODS  @@@@@@@@@@@@@@@

app.post("/success",function(req,res){

    var firstName = req.body.username;
    var pass = req.body.pass;
    if(firstName == "bilal" && pass == "123"){
        res.redirect("/success");
    }else{
        res.redirect("/failure");
    }
    
});


app.listen(8000,function(){
    console.log("port 8000 is opened.");
});