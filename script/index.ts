// Initialize Supabase client
// const { createClient } = require('@supabase/supabase-js'); // Required for Node.js
// or if using a CDN:
const { createClient } = supabase;

const SUPABASE_URL = 'https://oztjzscfexuysiadcuzp.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGp6c2NmZXh1eXNpYWRjdXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjY0ODYsImV4cCI6MjA1MjYwMjQ4Nn0.xsfo1W0hJSzYREYoBD3PYN79SuLd_8whoEwTECbQLH8'; // Replace with your Supabase Anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getInfoSupa() {
    try {
        const response = await fetch(supabase)
        if(!response.ok) {
            throw new Error(`response status: ${response.status}`)
        }
        const data = await response.json()
        console.log("data", data)
    } catch (error) {
        console.error("Error", error)
    }
}

const mainContainer = document.querySelector(".todo-section")
const input = document.querySelector(".desc-input") as HTMLInputElement
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

const smtharray: Array<Todo> = JSON.parse(localStorage.localStorageInfo)
smtharray.forEach((item) => {
    count++
    item.id = count;
    createTodo(item)
})

saveBtn.addEventListener("click", () => {
    const todo: Todo  = {
        id: count,
        description: input.value,
        status: true
    }
    count++
    createTodo(todo)

})


function createTodo(todo) {
    localStorageInfo.push(todo)
    localStorage.setItem("localStorageInfo", JSON.stringify(localStorageInfo))
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
            todo.description = editInput.value
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
