let todoList: HTMLUListElement; 
let todoListTotal: Array<TodoListTotal> = [];

interface TodoListTotal {
    name: string, 
    done: boolean
}

function buildTodo(visible: boolean): void {
    if (visible === true) {
      document.querySelectorAll('td').forEach(el => {
        el.addEventListener('click', function () {
          const isClickedTD = this.dataset.trigger;
          const dataToDo = this.dataset.text;
          if (isClickedTD) {
            deleteRepeatAppDivToDo();
            createTodoApp(dataToDo);
            deleteIfDataWithTodo(todoList);
          }
        });
          addSignIfDataWithTodo();
        });
    } else {
      deleteRepeatAppDivToDo();
    }
} 

function createAppDivToDo(): HTMLDivElement {
    const appDivToDo = <HTMLDivElement>(document.createElement('div'));
    appDivToDo.id = 'divCal2';
    appDivToDo.classList.add('todo');
    return appDivToDo;
}
  
function deleteRepeatAppDivToDo(): void {
    let divCal2: HTMLElement = document.getElementById("divCal2");
    if (divCal2) {
      divCal2.parentNode.removeChild(divCal2);
    }
}
  
function createAppTitle(title: string): HTMLHeadingElement {
    const titleA = document.createElement('h2');
    titleA.classList.add('todo__header');
    titleA.innerHTML = title;
    return titleA;
}
  
function createTodoItemForm(): { form: HTMLFormElement;
                                input: HTMLInputElement;
                                button: HTMLButtonElement;} {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
  
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
      form,
      input,
      button,
    };
}

function createTodoList(datatext: string): HTMLUListElement  {
    const listTodo = document.createElement('ul');
    listTodo.dataset.text = datatext;
    return listTodo;
}

interface TodoItem {
    item: HTMLLIElement;
    doneButton: HTMLButtonElement;
    deleteButton: HTMLButtonElement;
}

function createTodoItem(name: string): TodoItem {
    const item = document.createElement('li');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    item.classList.add('todo__item');
    doneButton.classList.add('button__done-todo');
    deleteButton.classList.add('button__delete-todo');
    item.textContent = name;
    item.append(doneButton);
    item.append(deleteButton);
  
    return {
      item,
      doneButton,
      deleteButton,
    }
}

function createTodoApp(data: string) {
    let appDivToDo = createAppDivToDo();
    document.getElementById("calendarApp").append(appDivToDo);
    let todoAppTitle = createAppTitle(data);
    let todoItemForm = createTodoItemForm();
    todoList = createTodoList(data);
    document.getElementById("divCal2").append(todoAppTitle);
    document.getElementById("divCal2").append(todoItemForm.form);
    document.getElementById("divCal2").append(todoList);
  
    todoItemForm.input.addEventListener('keyup', function () {
        if (todoItemForm.input.value == "") {
            todoItemForm.button.disabled = true;
        } else {
            todoItemForm.button.disabled = false;
        }
    });
  
    if (localStorage.getItem(data)) {
        todoListTotal = JSON.parse(localStorage.getItem(data));
        displayToDoMessage();
    }
  
    function displayToDoMessage() {
      let displayMes: Array<TodoItem>  = [];
      todoListTotal.forEach(function (task: {name: string; done: boolean;}, i: number) {
        displayMes[i] = createTodoItem(task.name);
        todoList.append(displayMes[i].item);
        if (task.done == true) {
            displayMes[i].item.classList.toggle("todo__item_done");
        }
  
        displayMes[i].doneButton.addEventListener('click', function () {
            const doneItems = document.querySelectorAll('li');
            let valDoneItems = [];
            for (let i = 0; i < doneItems.length; i++) {
                valDoneItems[i] = doneItems[i].textContent;
            }
            task.done = !task.done;
            displayMes[i].item.classList.toggle("todo__item_done");
            localStorage.setItem(data, JSON.stringify(todoListTotal));
        });
  
        displayMes[i].deleteButton.addEventListener('click', function () {
            if (confirm('Are you shure?')) {
                const deleteItems = document.querySelectorAll('li');
                let valDeleteItems = [];
                for (let i = 0; i < deleteItems.length; i++) {
                    valDeleteItems[i] = deleteItems[i].textContent;
                }
                let index = todoListTotal.indexOf(task);
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
        const todoItem = createTodoItem(todoItemForm.input.value);
        const newTodo = {
            name: todoItem.item.textContent,
            done: false
        }
        todoListTotal.push(newTodo);
        localStorage.setItem(data, JSON.stringify(todoListTotal));
    
        todoItem.doneButton.addEventListener('click', function() {
            todoItem.item.classList.toggle("todo__item_done");
            newTodo.done = !newTodo.done;	
            localStorage.setItem(data, JSON.stringify(todoListTotal));
        });
  
        todoItem.deleteButton.addEventListener('click', function() {
            if (confirm('Are you shure?')) {
                if (newTodo.name === todoItem.item.textContent) {
                    const indexPevious = todoListTotal.indexOf(newTodo);
                    todoListTotal.splice(indexPevious, 1); 
                    todoItem.item.remove();
                    localStorage.setItem(data, JSON.stringify(todoListTotal));
                    deleteIfDataWithTodo(todoList)
                }
            }
        });
        todoList.append(todoItem.item);
        addSignIfDataWithTodo();
    });
}

function addSignIfDataWithTodo(): void {
    document.querySelectorAll('td').forEach(el => {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(localStorage.key(i)).length != 2 && el.dataset.text == localStorage.key(i) && el.childNodes.length == 1) {
                const cropIfDataWithTodo = document.createElement('span');
                cropIfDataWithTodo.innerText = '!';
                el.append(cropIfDataWithTodo); 
            }
        }
    });
}
  
function deleteIfDataWithTodo(ul: HTMLUListElement): void {
    document.querySelectorAll('td').forEach(el => { 
        if (ul.childNodes.length == 0 && el.childNodes.length == 2 && el.dataset.text == ul.dataset.text) {
           el.removeChild(el.childNodes[1]); 
        } 
    }); 
}


export {buildTodo};