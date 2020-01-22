
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


module.exports.getDate = getDate();

module.exports.tarih = tarih();
function tarih(){
    let today = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return today.toLocaleDateString("tr-TR",options);
}
function getDate(){
    let today = new Date();
    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return today.toLocaleDateString("en-EN",options);
}
