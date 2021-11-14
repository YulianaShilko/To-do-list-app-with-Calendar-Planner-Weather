"use strict";
exports.__esModule = true;
var todoList;
var todoListTotal = [];
function buildTodo(visible) {
    if (visible === true) {
        document.querySelectorAll('td').forEach(function (el) {
            el.addEventListener('click', function () {
                var isClickedTD = this.dataset.trigger;
                var dataToDo = this.dataset.text;
                if (isClickedTD) {
                    deleteRepeatAppDivToDo();
                    createTodoApp(dataToDo);
                    deleteIfDataWithTodo(todoList);
                }
            });
            addSignIfDataWithTodo();
        });
    }
    else {
        deleteRepeatAppDivToDo();
    }
}
exports.buildTodo = buildTodo;
function createAppDivToDo() {
    var appDivToDo = (document.createElement('div'));
    appDivToDo.id = 'divCal2';
    appDivToDo.classList.add('todo');
    return appDivToDo;
}
function deleteRepeatAppDivToDo() {
    var divCal2 = document.getElementById("divCal2");
    if (divCal2) {
        divCal2.parentNode.removeChild(divCal2);
    }
}
function createAppTitle(title) {
    var titleA = document.createElement('h2');
    titleA.classList.add('todo__header');
    titleA.innerHTML = title;
    return titleA;
}
function createTodoItemForm() {
    var form = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('button');
    form.classList.add('todo__form');
    button.classList.add('form__add-todo');
    button.textContent = 'Add';
    input.classList.add('form__input-todo');
    input.placeholder = 'Add ToDo-Item';
    input.value = '';
    form.append(button);
    form.append(input);
    button.disabled = true;
    return {
        form: form,
        input: input,
        button: button
    };
}
function createTodoList(datatext) {
    var listTodo = document.createElement('ul');
    listTodo.dataset.text = datatext;
    return listTodo;
}
function createTodoItem(name) {
    var item = document.createElement('li');
    var doneButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    item.classList.add('todo__item');
    doneButton.classList.add('button__done-todo');
    deleteButton.classList.add('button__delete-todo');
    item.textContent = name;
    item.append(doneButton);
    item.append(deleteButton);
    return {
        item: item,
        doneButton: doneButton,
        deleteButton: deleteButton
    };
}
function createTodoApp(data) {
    var appDivToDo = createAppDivToDo();
    document.getElementById("calendarApp").append(appDivToDo);
    var todoAppTitle = createAppTitle(data);
    var todoItemForm = createTodoItemForm();
    todoList = createTodoList(data);
    document.getElementById("divCal2").append(todoAppTitle);
    document.getElementById("divCal2").append(todoItemForm.form);
    document.getElementById("divCal2").append(todoList);
    todoItemForm.input.addEventListener('keyup', function () {
        if (todoItemForm.input.value == "") {
            todoItemForm.button.disabled = true;
        }
        else {
            todoItemForm.button.disabled = false;
        }
    });
    if (localStorage.getItem(data)) {
        todoListTotal = JSON.parse(localStorage.getItem(data));
        displayToDoMessage();
    }
    function displayToDoMessage() {
        var displayMes = [];
        todoListTotal.forEach(function (task, i) {
            displayMes[i] = createTodoItem(task.name);
            todoList.append(displayMes[i].item);
            if (task.done == true) {
                displayMes[i].item.classList.toggle("todo__item_done");
            }
            displayMes[i].doneButton.addEventListener('click', function () {
                var doneItems = document.querySelectorAll('li');
                var valDoneItems = [];
                for (var i_1 = 0; i_1 < doneItems.length; i_1++) {
                    valDoneItems[i_1] = doneItems[i_1].textContent;
                }
                task.done = !task.done;
                displayMes[i].item.classList.toggle("todo__item_done");
                localStorage.setItem(data, JSON.stringify(todoListTotal));
            });
            displayMes[i].deleteButton.addEventListener('click', function () {
                if (confirm('Are you shure?')) {
                    var deleteItems = document.querySelectorAll('li');
                    var valDeleteItems = [];
                    for (var i_2 = 0; i_2 < deleteItems.length; i_2++) {
                        valDeleteItems[i_2] = deleteItems[i_2].textContent;
                    }
                    var index = todoListTotal.indexOf(task);
                    todoListTotal.splice(index, 1);
                    displayMes[i].item.remove();
                    localStorage.setItem(data, JSON.stringify(todoListTotal));
                    deleteIfDataWithTodo(todoList);
                }
            });
            addSignIfDataWithTodo();
        });
    }
    todoItemForm.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var todoItem = createTodoItem(todoItemForm.input.value);
        var newTodo = {
            name: todoItem.item.textContent,
            done: false
        };
        todoListTotal.push(newTodo);
        localStorage.setItem(data, JSON.stringify(todoListTotal));
        todoItem.doneButton.addEventListener('click', function () {
            todoItem.item.classList.toggle("todo__item_done");
            newTodo.done = !newTodo.done;
            localStorage.setItem(data, JSON.stringify(todoListTotal));
        });
        todoItem.deleteButton.addEventListener('click', function () {
            if (confirm('Are you shure?')) {
                if (newTodo.name === todoItem.item.textContent) {
                    var indexPevious = todoListTotal.indexOf(newTodo);
                    todoListTotal.splice(indexPevious, 1);
                    todoItem.item.remove();
                    localStorage.setItem(data, JSON.stringify(todoListTotal));
                    deleteIfDataWithTodo(todoList);
                }
            }
        });
        todoList.append(todoItem.item);
        addSignIfDataWithTodo();
    });
}
function addSignIfDataWithTodo() {
    document.querySelectorAll('td').forEach(function (el) {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(localStorage.key(i)).length != 2 && el.dataset.text == localStorage.key(i) && el.childNodes.length == 1) {
                var cropIfDataWithTodo = document.createElement('span');
                cropIfDataWithTodo.innerText = '!';
                el.append(cropIfDataWithTodo);
            }
        }
    });
}
function deleteIfDataWithTodo(ul) {
    document.querySelectorAll('td').forEach(function (el) {
        if (ul.childNodes.length == 0 && el.childNodes.length == 2 && el.dataset.text == ul.dataset.text) {
            el.removeChild(el.childNodes[1]);
        }
    });
}
