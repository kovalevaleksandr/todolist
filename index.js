import {
    BTN,
    LIST,
    INPUT,
    BTN_DEL,
    ITEM_CLASS,
    TASC_CLASS,
    BTN_CLASS,
    MATERIAL_CLASS,
    TODO_CLASS,
    ATTRIBUTE_ITEM,
    ERROR,
    CHECKBOX,
    NEW_TASK
} from './consts.js'

document.addEventListener("DOMContentLoaded", ()=>{
    JSON.parse(localStorage.getItem('todolist'))?.forEach((e, i)=>add(e, i))
})

const handler = function () {
  return {
    get (target, property) {
      if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[property])) > -1) {
        return new Proxy(target[property], handler());
      }
      return target[property]
    },

    set(target, property, value) {
      target[property] = value
      localStorage.setItem('todolist', JSON.stringify(todolist))
      return true
    }
  }
}

let todolist = new Proxy(JSON.parse(localStorage.getItem('todolist')) || [], handler())

BTN.addEventListener('click', toDoHandler)

INPUT.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        toDoHandler()
    }
})

function toDoHandler() {
    let valueInput = INPUT.value
    console.log(valueInput)
    if (valueInput && !todolist.some(i => i === valueInput)) {
        todolist.push({title: valueInput, completed: false, est: ''})
        INPUT.value = ''
        console.log(valueInput)
        add()
        validate(true)
    } else {
        validate(false)
    }
}

function validate(error) {
    if (error) {
        ERROR.classList.remove('error--show')
    } else {
        ERROR.classList.add('error--show')
    }
}

function add(e, i) {

    const lastIndex = i  ?? todolist.length - 1
    const lastValue = e || todolist[lastIndex]

    const item = document.createElement('div')
    const state = document.createElement('INPUT')
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


    item.setAttribute(ATTRIBUTE_ITEM, lastIndex)


    task.value = lastValue.title
    edit.innerHTML = 'edit'
    del.innerHTML = 'delete'

    LIST.append(item)
    item.append(state, task, edit, del)

    del.addEventListener('click', remove)
    state.addEventListener('change', getCompleted)
}

function getCompleted(e) {
    const editLocal = e.target
    const item = editLocal.parentNode.querySelector(`.${TASC_CLASS}`)
const itemParent = editLocal.parentNode
    const index = itemParent.getAttribute(ATTRIBUTE_ITEM)


    if (editLocal.checked) {
        todolist[index].completed = true
        item.classList.add('state--ready')
    } else {
        todolist[index].completed = false
        console.log(todolist)
        item.classList.remove('state--ready')
    }
}

function editTask(e) {
    const editLocal = e.target
    const removedItem = editLocal.parentNode
    const newTask = removedItem.querySelector('.todolist__task-new')

    if (editLocal.classList.contains('success')) {
        const index = removedItem.getAttribute(ATTRIBUTE_ITEM)
        todolist[index].title = newTask.value
        newTask.setAttribute("readonly", "readonly")
        editLocal.classList.remove('success')
        editLocal.innerHTML = 'edit'
        return true
    }
    editLocal.innerHTML = 'done'
    editLocal.classList.add('success')

    newTask.removeAttribute("readonly")
}

function remove(e) {
    const removedItem = e.target.parentNode
    const index = removedItem.getAttribute(ATTRIBUTE_ITEM)
    todolist.splice(index, 1)
    removedItem.remove()
}

