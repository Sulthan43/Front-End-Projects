let input = document.getElementById("input")
let output = document.getElementById("todolist")
let button = document.getElementById("add")

let todos = []
window.onload = () => {
    todos = JSON.parse(localStorage.getItem(`To Do's`)) || []
    todos.forEach(addtodo)
}

button.addEventListener('click',() =>{
    todos.push(input.value)
    localStorage.setItem(`To Do's`,JSON.stringify(todos))
    addtodo(input.value)
    input.value=''
})

function addtodo(val){
    let p = document.createElement("p")
    p.innerHTML = val
    output.appendChild(p)
    p.addEventListener('click',() =>{
        p.style.textDecoration = 'line-through'
        remove(val)
    })
    p.addEventListener('dblclick',() =>{
        output.removeChild(p)
        remove(val)
    })
}
function remove(toDo){
    let index = todos.indexOf(toDo)
    if(index>-1){ 
        todos.splice(index,1)
    }
    localStorage.setItem(`To Do's`,JSON.stringify(todos))
}