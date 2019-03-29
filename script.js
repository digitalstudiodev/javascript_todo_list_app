//Select Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-times-circle";
const LINE_THROUGH = "linethrough";

//Variables
let LIST, id;

//Get from Local Storage
let data = localStorage.getItem("TODO");

//Check if data is in local storage
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length;   //set the id to the last one in the list 
    loadList(LIST); //load the list to the user interface
}
else
{
    //If data is not in local storage
    LIST = [];
    id = 0;
}

//Load items to the user's interface
function loadList(array)
{
    array.forEach(function(item)
    {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

//Clear Button
clear.addEventListener("click", function()
{
    localStorage.clear();
    location.reload();
});

//Add to Local Storage (this code must be added where the list array is updated)
localStorage.setItem("TODO", JSON.stringify(LIST));

//Show date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//addTodo function
function addTodo(todo, id, done, trash)
{
    if(trash)
    {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-trash-alt de" job="delete" id="${id}"></i>
                   </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Enter key function
document.addEventListener("keyup", function(even)
{
    if(event.keyCode == 13)
    {
        const todo = input.value;
        
        if(todo)
        {
            addTodo(todo);

            LIST.push({name: todo, id: id, done: false, trash: false});
            
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//Complete Todo
function completeTodo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done? false : true;
}


//Remove Todo
function removeTodo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//Target the items created dynamically
list.addEventListener("click", function(event)
{
    const element = event.target;   //return the clicked element inside list
    const elementJob = element.attributes.job.value;    //complete or delete

    if(elementJob == "complete")
    {
        completeTodo(element);
    }
    else if(elementJob == "delete")
    {
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});