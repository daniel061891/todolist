let add = document.querySelector('form button');
let todoList = document.querySelector('section.todoList'); 
add.addEventListener('click',e=>{
    e.preventDefault();
    //提取dom
    let todoText = document.querySelector('.todo').value;
    let month = document.querySelector('.m').value;
    let day = document.querySelector('.d').value;
    let form = document.querySelector('form');
    //設定不能留白
    if((todoText==="")||(month==="")||(day==="")){
        alert('請輸入正確的行程與時間。')
        return;
    }

    if((month>12)||(day>31)){
        alert('輸入的月份不要超過12，日期不要超過31。')
        form.children[0].value="";
        form.children[1].value="";
        form.children[2].value="";
        return;
    }
    
    //新增一筆資料之後把input空格清空
    form.children[0].value="";
    form.children[1].value="";
    form.children[2].value="";
    
    let todoDiv= document.createElement('div');
    todoList.append(todoDiv)
    todoDiv.classList.add('todoDiv')

    let todo = document.createElement('p');
    todoDiv.append(todo)
    todo.classList.add('todo-text')
    todo.innerText = `${todoText}`

    let time = document.createElement('p');
    todoDiv.append(time)
    time.classList.add('todo-time')
    time.innerText = `${month}月${day}日`


    let check = document.createElement('button')
    check.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.append(check);
    check.classList.add('check')

    check.addEventListener('click',e=>{
        todoDiv.classList.toggle('done')
    })

    let trash = document.createElement('button')
    trash.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.append(trash)
    trash.classList.add('trash')

    trash.addEventListener('click',e=>{
        todoDiv.style.animation = 'scaleSmall 0.3s forwards'
        todoDiv.addEventListener('animationend',e=>{
            todoDiv.remove(); 
            
            let deleteText = todoDiv.children[0].innerHTML;
            let listArr = JSON.parse(localStorage.getItem('list'));
            listArr.forEach((item,index)=>{
                if(deleteText===item.todoText){
                    listArr.splice(index,1)
                    localStorage.setItem('list',JSON.stringify(listArr));
                }
            })
        })
    })
    //新增行程動畫
    todoDiv.style.animation = 'scaleBig 0.3s forwards'
    
    let myTodo = {
        todoText : todoText ,
        month : month,
        day : day
    }

    let myList = localStorage.getItem('list')
   
    if(myList == null){
        localStorage.setItem('list',JSON.stringify([myTodo]))
    } else{
        let myListrArr = JSON.parse(myList);
        myListrArr.push(myTodo);
        localStorage.setItem('list',JSON.stringify(myListrArr));
    }
})

//開啟網頁就提取本機資料顯示出來

let myList = localStorage.getItem('list');
if(myList!=null){
    let listArr = JSON.parse(myList);
    listArr.forEach(item => {
    
    let todoDiv= document.createElement('div');
    todoList.append(todoDiv)
    todoDiv.classList.add('todoDiv')

    let todo = document.createElement('p');
    todoDiv.append(todo)
    todo.classList.add('todo-text')
    todo.innerText = `${item.todoText}`

    let time = document.createElement('p');
    todoDiv.append(time)
    time.classList.add('todo-time')
    time.innerText = `${item.month}月${item.day}日`


    let check = document.createElement('button')
    check.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.append(check);
    check.classList.add('check')

    check.addEventListener('click',e=>{
        todoDiv.classList.toggle('done')
    })

    let trash = document.createElement('button')
    trash.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.append(trash)
    trash.classList.add('trash')

    trash.addEventListener('click',e=>{
        todoDiv.style.animation = 'scaleSmall 0.3s forwards'
        todoDiv.addEventListener('animationend',e=>{
            todoDiv.remove();  
            let deleteText = todoDiv.children[0].innerHTML
            let listArr = JSON.parse(myList);

            listArr.forEach((item,index)=>{
                // console.log(deleteText===item.todoText);
                if(deleteText===item.todoText){
                    console.log(index);
                    listArr.splice(index,1)
                    localStorage.setItem('list',JSON.stringify(listArr))
                }
            })
        })
    })
    })
}