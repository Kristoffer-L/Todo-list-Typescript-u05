const mainContainer = document.querySelector(".todo-section")
const input = document.querySelector(".desc-input")
const saveBtn = document.querySelector(".btn-save")
const clearBtn = document.querySelector(".btn-clear")
const todoItems = document.querySelectorAll("todo-element")
let count = 0
let localStorageInfo: Array<Todo> = []

interface Todo {
    id: number;
    description: string;
    status: boolean;
}

saveBtn.addEventListener("click", () => {
    const todo: Todo  = {
        id: count,
        description: input.value,
        status: true
    }
    createTodo(todo)
})

const smtharray: Array<Todo> = JSON.parse(localStorage.localStorageInfo)
console.log("smtharray", smtharray);
smtharray.forEach((item) => {
    createTodo(item)
})

function createTodo(todo) {
    count++
    console.log(todo)
    localStorageInfo.push(todo)
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo))
    console.log("localStorageInfo", localStorageInfo)
    const divs = document.createElement("div")
    mainContainer.appendChild(divs)
    divs.classList.add("todo-element")

    const description = document.createElement("p")
    divs.appendChild(description)
    description.classList.add("description")
    description.textContent = todo.description;
    description.addEventListener("click", () => {
        if(todo.status) {
            description.style.textDecoration = "line-through"
            todo.status = false
        } else {
            description.style.textDecoration = "none"
            todo.status = true
        }
            console.log("todo", todo)
    })
    const edit = document.createElement("button")
    divs.appendChild(edit)
    edit.textContent = "redigera"
    edit.addEventListener("click", () => {
        const editInput = document.createElement("input")
        divs.appendChild(editInput)
        const editSave = document.createElement("button")
        divs.appendChild(editSave)
        editSave.textContent = "save"
        editSave.addEventListener("click", () => {
            description.textContent = editInput.value;
            localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo))
            editInput.remove()
            editSave.remove()
        })
    })


    const remove = document.createElement("p")
    divs.appendChild(remove)
    remove.textContent = "X"
    remove.classList.add("remove")
    remove.addEventListener("click", () => {
            divs.remove()
        })
}

clearBtn.addEventListener("click", () => {
    mainContainer.innerHTML = ""
    localStorage.clear()
})
