// Initialize Supabase client
var createClient = require('@supabase/supabase-js').createClient; // Required for Node.js
// or if using a CDN:
// const { createClient } = supabase;
var SUPABASE_URL = 'https://oztjzscfexuysiadcuzp.supabase.co'; // Replace with your Supabase URL
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGp6c2NmZXh1eXNpYWRjdXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjY0ODYsImV4cCI6MjA1MjYwMjQ4Nn0.xsfo1W0hJSzYREYoBD3PYN79SuLd_8whoEwTECbQLH8'; // Replace with your Supabase Anon key
var supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
var mainContainer = document.querySelector(".todo-section");
var input = document.querySelector(".desc-input");
var saveBtn = document.querySelector(".btn-save");
var clearBtn = document.querySelector(".btn-clear");
var todoItems = document.querySelectorAll("todo-element");
var count = 0;
var localStorageInfo = [];
var smtharray = JSON.parse(localStorage.localStorageInfo);
smtharray.forEach(function (item) {
    count++;
    item.id = count;
    createTodo(item);
});
saveBtn.addEventListener("click", function () {
    var todo = {
        id: count,
        description: input.value,
        status: true
    };
    count++;
    createTodo(todo);
});
function createTodo(todo) {
    localStorageInfo.push(todo);
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
    var divs = document.createElement("div");
    mainContainer.appendChild(divs);
    divs.classList.add("todo-element");
    var description = document.createElement("p");
    divs.appendChild(description);
    description.classList.add("description");
    description.textContent = todo.description;
    description.addEventListener("click", function () {
        if (todo.status) {
            description.style.textDecoration = "line-through";
            todo.status = false;
        }
        else {
            description.style.textDecoration = "none";
            todo.status = true;
        }
    });
    var edit = document.createElement("button");
    divs.appendChild(edit);
    edit.textContent = "redigera";
    edit.addEventListener("click", function () {
        var editInput = document.createElement("input");
        divs.appendChild(editInput);
        var editSave = document.createElement("button");
        divs.appendChild(editSave);
        editSave.textContent = "save";
        editSave.addEventListener("click", function () {
            description.textContent = editInput.value;
            todo.description = editInput.value;
            localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
            editInput.remove();
            editSave.remove();
        });
    });
    var remove = document.createElement("p");
    divs.appendChild(remove);
    remove.textContent = "X";
    remove.classList.add("remove");
    remove.addEventListener("click", function () {
        divs.remove();
    });
}
clearBtn.addEventListener("click", function () {
    mainContainer.innerHTML = "";
    localStorage.clear();
});
