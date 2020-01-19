<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="css/todos.css" rel="stylesheet" id="bootstrap-css">

    <!--Made with love by Mutiullah Samim -->


    <!--Custom styles-->
    <div style="text-align: center; margin-top: 10px;">
        <a href="/"><button class="btn btn-primary">Go to Main Page</button></a>
    </div>
</head>

<body>
    <!-- style = "display:inline-block" -->
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="todolist not-done">
                    <h1>Todos<scan style="right:3%; position: absolute;"><%=date%></scan>
                    </h1>
                    <form action="/addTodo" method="post">
                        <input type="text" name="todo" class="form-control add-todo" placeholder="Add todo"
                            style="height: 50px; margin-bottom: 10px;" required>
                        <scan>Pick a Date : </scan><input type="date" name="date" class="add-todo"
                            style="height: 10%; margin-bottom: 10px;"><br>
                        <scan>Write Note : </scan><input type="text" name="note" class="add-todo"
                            style="height: 10%; margin-bottom: 10px;" placeholder="Write Something">
                        <button id="addTodo" type="submit" name="nameAddTodo" class="form-control btn btn-primary">Add
                            Todo</button>
                    </form>
                    <hr>
                    <div class="row">

                        <div name="date" class="col-md-2 col-xs-2">


                            <label>Dates</label>
                            <hr>
                        </div>
                        <div name="todo" class="col-md-5 col-xs-5">

                            <label>Todos</label>
                            <hr>
                        </div>

                        <div name="note" class="col-md-5 col-xs-5">

                            <label>Notes</label>
                            <hr>
                        </div>

                    </div>


                    <div>


                        <form action="/completeTodo" method="post">

                            <% for(let i = 0; i < todos.length; i++){ %>
                            <div class="row">
                                <ul id="sortable" class="list-unstyled">
                                    <div name="date" class="todoss col-md-2 col-xs-2">
                                        <% if (todos[i]["date"] !== ""){%>
                                        <label><input type="checkbox" value="" /><label
                                                style="margin-left:3rem;"><%=todos[i]["date"]%></label></label>
                                        <%}else{%>
                                        <label><input type="checkbox" value="" /><img
                                                style="margin-left:3rem;width:25%; height:25%;" src="img/infinity.png"
                                                alt="---"></label>
                                        <%}%>
                                  
                                </div>
                                <div name = "todo" class="todoss col-md-5 col-xs-5">
                                        <label style = "word-wrap: break-word;"><%=todos[i].todo.slice(0,40)%><%if(todos[i].todo.length > 40){%>
                                        <form action="/todoDetail" method="post">
                                            <input name="todo" value=<%=i%> type="hidden"></input>
                                            <button type="submit" class="btn btn-default">...Read More</button>
                                        </form>
                                        <%}%>
                                        </label>
                                </div>
                            <div name="note" class="todoss col-md-5 col-xs-5">
                                    <label style = "word-wrap: break-word;"><%=todos[i].note.slice(0,40)%><%if(todos[i].note.length > 40){%>
                                        <form action="/todoDetail" method="post">
                                            <input name="todo" value=<%=i%> type="hidden"></input>
                                            <button type="submit" class="btn btn-default">...Read More</button>
                                        </form>
                                        <%}%>
                                    </label>
                            </div>

                        </ul>
                        <button type="submit" style = "margin-right:2%;" class="remove-item btn btn-danger btn-xs pull-right">X</button>

                    </div>
                            <%}%>
                        </form>

                    </div>

                    <form action="/markAllDone" method="post">
                        <button id="checkAll" style="margin-bottom: 10px;" class="btn btn-success">Mark all as
                            done</button>
                    </form>
                    <div class="todo-footer">
                        <strong><span class="count-todos"></span></strong> <%=todos.length%> Items Left
                    </div>
                </div>
            </div>
            <div class="col-md-12" style="margin-bottom: 10%;">
                <div class="todolist">
                    <h1>Already Done <form style="display: inline;" action="/removeAll" method="post"><button
                                type="submit" class="btn btn-danger pull-right">Remove All</button></form>
                    </h1>

                    <%for(let i = 0; i < allDone.length; i++){%>
                    <form action="/deleteTodo" method="post">

                        <ul id="done-items" class="list-unstyled">

                            <li style="display: inline;" name="todolst"><input name="todolst" type="hidden"
                                    value=<%=allDone[i]%>><%=allDone[i]%></li>
                            <button type="submit" class="remove-item btn btn-danger btn-xs pull-right">X</button>
                        </ul>
                    </form>

                    <%}%>
            <div class="todo-footer">
                <strong><span class="count-todos"></span></strong> <%=allDone.length%> Items Completed
                </div>
            </div>

        </div>
    </div>
    </div>

    <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <!------ Include the above in your HEAD tag ---------->

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

    <!-- <script type="text/javascript" src="js/todos.js"></script> -->
    </bodystyle= "height:100%; position: absolute;">


</html>