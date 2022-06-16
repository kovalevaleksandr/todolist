import {element, newElems, TODO_INPUT, del, ITEM_CLASS, TASC_CLASS, BTN_CLASS, MATERIAL_CLASS, TODO_CLASS, ATRIBUTE_ITEM } from './consts.js'
const errorText = document.querySelector('.error')
const CHECKBOX = document.querySelector('.todolist__state')
const NEW_TASK = document.querySelector('.todolist__task-new')
element.addEventListener('click', addList)


TODO_INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addList()
  }
})


function addList() {
  let title = document.querySelector(TODO_CLASS).value
  if (title && !todolist.some(i => i === title)) {
    todolist.push({title, complited: false, est: ''})
    document.querySelector(TODO_CLASS).value = ''
    add()
    validate(true)
  } else {
    validate(false)
  }
} 

function validate(error) {
  if (error) {
    errorText.classList.remove('error--show')
  } else {
    errorText.classList.add('error--show')
  }
}

function add() {
  const lastValue = todolist[todolist.length - 1]

  const state = document.createElement('INPUT')
  const item = document.createElement('div')
  const task = document.createElement('input')
  const edit = document.createElement('div')
  const del = document.createElement('div')

  item.classList.add(ITEM_CLASS)
  task.classList.add(TASC_CLASS)
  edit.classList.add(BTN_CLASS, MATERIAL_CLASS, 'edit')
  del.classList.add(BTN_CLASS, MATERIAL_CLASS)
  state.classList.add('todolist__state')

  task.setAttribute('readonly', 'readonly')
  state.setAttribute('type', 'checkbox')

  edit.addEventListener('click', editTask)

  function editTask(e) {
    const editLocal = e.target
    const removedItem = editLocal.parentNode
    const newTask = removedItem.querySelector('.todolist__task-new')

    if (editLocal.classList.contains('success')) {
      const index = removedItem.getAttribute(ATRIBUTE_ITEM)
      todolist[index].title = newTask.value
      newTask.setAttribute("readonly", "readonly")
      editLocal.classList.remove('success')
      edit.innerHTML = 'edit'
      return true
    }
    edit.innerHTML = 'done'
    editLocal.classList.add('success')
    
    newTask.removeAttribute("readonly")
  }
  
  item.setAttribute(ATRIBUTE_ITEM, todolist.length - 1)

  task.value = lastValue.title
  edit.innerHTML = 'edit'
  del.innerHTML = 'delete'

  newElems.append(item)
  item.append(state, task, edit, del)

  del.addEventListener('click', remove)
  state.addEventListener('change', getCompleted)
}

function getCompleted(e){
  const editLocal = e.target
  const item = editLocal.parentNode
  
  if (editLocal.checked){
    todolist.complited = true
    document.querySelector('.todolist__task-new').classList.add('state--ready')
  } else {
    document.querySelector('.todolist__task-new').classList.remove('state--ready')
  }
}

function remove(e) {
  const removedItem = e.target.parentNode
  const index = removedItem.getAttribute(ATRIBUTE_ITEM)
  todolist.splice(index, 1)
  removedItem.remove()
  localStorage.removeItem(task)
}

let todolist = new Proxy( JSON.parse(localStorage.getItem('todolist')) || [], {
        set (target, property, value) {
            console.log(`Setting value ${property} to ${value}`);
            target[property] = value;
            localStorage.setItem('todolist', JSON.stringify(target))
            return true;
        },
    get: function(target, property) {
    console.log('getting ' + property + ' for ' + target);
    return target[property];
  },
    }); 
