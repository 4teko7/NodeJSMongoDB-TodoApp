
// const date = require(__dirname + "/date.js");
// console.log(date.getDate());


// module.exports.getDate = function(){
//     let today = new Date();
//     let options = {
//         weekday:"long",
//         day:"numeric",
//         month:"long"
//     };
//     return today.toLocaleDateString("tr-TR",options);
// }


module.exports = getDate;


function getDate(){
    let today = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return today.toLocaleDateString("tr-TR",options);
}
