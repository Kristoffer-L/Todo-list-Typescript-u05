var mainContainer = document.querySelector(".todo-section");
var input = document.querySelector(".desc-input");
var saveBtn = document.querySelector(".btn-save");
var clearBtn = document.querySelector(".btn-clear");
var todoItems = document.querySelectorAll("todo-element");
var count = 0;
var localStorageInfo = [];
saveBtn.addEventListener("click", function () {
    var todo = {
        id: count,
        description: input.value,
        status: true
    };
    createTodo(todo);
});
var smtharray = JSON.parse(localStorage.localStorageInfo);
console.log("smtharray", smtharray);
smtharray.forEach(function (item) {
    createTodo(item);
});
function createTodo(todo) {
    count++;
    console.log(todo);
    localStorageInfo.push(todo);
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo));
    console.log("localStorageInfo", localStorageInfo);
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
        console.log("todo", todo);
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
