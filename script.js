document.addEventListener("DOMContentLoaded",()=>{
    const todoInput = document.getElementById('todo-input')
    const add_button = document.getElementById('add-task-btn')
    const todolist = document.getElementById('todo-list')

    let list = JSON.parse(localStorage.getItem("tasks")) || [];

    renderlist();

    add_button.addEventListener(('click'),function(){
        txtvalue = todoInput.value.trim()
        if(txtvalue === ""){return;}
        txtobj = {
            id:Date.now(),
            text:txtvalue,
            completed:false
        }

        list.push(txtobj)
        console.log(list);
        saveitem()
        todoInput.value = ""
        
        renderlist();
    })

    function render(task){
        let li = document.createElement('li');
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>`
        if(task.completed){
            li.classList.add("completed");
        }
        li.addEventListener('click',function(e){
            if(e.target.tagName == "BUTTON")return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveitem()
        })

        li.querySelector("button").addEventListener('click',function(e){
            e.stopPropagation() //to stop event propogation to higher elements
            list = list.filter(obj => obj.id !== task.id); 
            renderlist()
            saveitem()
        })

        todolist.appendChild(li);
        saveitem()
    }

    function renderlist(){
        todolist.innerHTML = ``;
        list.forEach(element => {
            render(element);
        });
    }

    function saveitem(){
        localStorage.setItem("tasks",JSON.stringify(list));
    }
})
