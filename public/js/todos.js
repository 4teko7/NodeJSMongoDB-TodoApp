// $("#sortable").sortable();
// $("#sortable").disableSelection();

// countTodos();

// // all done btn
// $("#checkAll").click(function(){
//     AllDone();
// });

// //create todo
// $('.add-todo').on('keypress',function (e) {
//       e.preventDefault
//       if (e.which == 13) {
//            if($(this).val() != ''){
//            var todo = $(this).val();
//             createTodo(todo); 
//             countTodos();
//            }else{
//                // some validation
//            }
//       }
// });
// // mark task as done
// $('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
//     if($(this).prop('checked')){
//         var doneItem = $(this).parent().parent().find('label').text();
//         $(this).parent().parent().parent().addClass('remove');
//         done(doneItem);
//         countTodos();
//     }
// });

//delete done task from "already done"
// $('.todolist').on('click','.remove-item',function(){
//     removeItem(this);
// });


$('#closeReg').on("click",function(){
    var reglog = document.getElementById("reg");
    // reglog.style.display = "block";
    reglog.style.display = "none";
});
$('#closeLog').on("click",function(){
    var reglog = document.getElementById("log");
    // reglog.style.display = "block";
    reglog.style.display = "none";
});


$('.reg').on("click",function(){
    var reglog = document.getElementById("reg");
    // reglog.style.display = "block";
    reglog.style.display = "";
    reglog.style.position = "absolute";
    reglog.style.zIndex = "10";
});
$('.log').on("click",function(){
    var reglog = document.getElementById("log");
    // reglog.style.display = "block";
    reglog.style.display = "";
    reglog.style.position = "absolute";
    reglog.style.zIndex = "10";
});

// $('#register').on("click",()=>{
//     reglog.style.display = "none";
// });

function ChangeUrl(){ 
    var image1 = document.getElementById("image1");
    var url = prompt("change image source",image1.src);   
    image1.src= url;
}

//@@@@@@@@@@@@@@@@@   VARIABLES   @@@@@@@@@@@@@@@@


// $('.dil').on("click",function(){
//     var reglog = document.getElementById("dil");
//     var dilForm = document.getElementById("dilForm");
//     if(reglog.textContent == "English") {
//         reglog.textContent = "Türkçe";
//         document.dilForm.action = "/en";

//         var welcome = "Welcome, ";
//         var logout = "Logout";
//         var todos = "Todos";
//         var addTodo = "Add Todo";
//         var pickADate = "Pick a Date";
//         var writeNote = "Write Note";
//         var addTodo = "Add Todo";
//         var dates = "Dates";
//         var todo = "Todo";
//         var readMore = "Read More";
//         var note = "Note";
//         var markAllAsDone = "Mark All As Done";
//         var itemsLeft = "Items Left";
//         var alreadyDone = "Already Done";
//         var removeAll = "Remove All";
//         var itemsCompleted = "Items Completed";
//         var register = "Register";
//         var login = "login";





//     }else{
//         reglog.textContent = "English";
//         document.dilForm.action = "/tr";
//         var welcome = "Hoşgeldiniz, ";
//         var logout = "Çıkış";
//         var todos = "Yapılacaklar";
//         var addTodoPlaceHolder = "Ne Yapmak Istersin ?";
//         var pickADate = "Tarih Seç";
//         var writeNote = "Not Yaz";
//         var addTodo = "Planı Ekle";
//         var dates = "Tarih";
//         var todo = "Yapılacak";
//         var readMore = "Devamını Oku";
//         var note = "Not";
//         var markAllAsDone = "Hepsini Yaptım";
//         var itemsLeft = "Plan Kaldı";
//         var alreadyDone = "Tamamlananlar";
//         var removeAll = "Hepsini Sil";
//         var itemsCompleted = "Plan Tamamlandı.";
//         var register = "Kayıt Ol";
//         var login = "Giriş Yap";


//     } 
// });










// // count tasks
// function countTodos(){
//     var count = $("#sortable li").length;
//     $('.count-todos').html(count);
// }

// //create task
// function createTodo(text){
//     var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
//     $('#sortable').append(markup);
//     $('.add-todo').val('');
// }

// //mark task as done
// function done(doneItem){
//     var done = doneItem;
//     var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//     $('#done-items').append(markup);
//     $('.remove').remove();
// }

// //mark all tasks as done
// function AllDone(){
//     var myArray = [];

//     $('#sortable li').each( function() {
//          myArray.push($(this).text());   
//     });
    
//     // add to done
//     for (i = 0; i < myArray.length; i++) {
//         $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
//     }
    
//     // myArray
//     $('#sortable li').remove();
//     countTodos();
// }

//remove done task from list
// function removeItem(element){
//     $(element).parent().remove();
// }