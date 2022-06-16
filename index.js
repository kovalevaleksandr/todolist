import { todolist, element, newElems, TODO_INPUT, del, ITEM_CLASS, TASC_CLASS, BTN_CLASS, MATERIAL_CLASS, TODO_CLASS, ATRIBUTE_ITEM } from './consts.js'
const errorText = document.querySelector('.error')

element.addEventListener('click', addList)


TODO_INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addList()
  }
})


function addList() {
  let title = document.querySelector(TODO_CLASS).value
  if (title && !todolist.some(i => i === title)) {
    todolist.push(title)
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

  const item = document.createElement('div')
  const task = document.createElement('input')
  const edit = document.createElement('div')
  const del = document.createElement('div')

  item.classList.add(ITEM_CLASS)
  task.classList.add(TASC_CLASS)
  edit.classList.add(BTN_CLASS, MATERIAL_CLASS, 'edit')
  del.classList.add(BTN_CLASS, MATERIAL_CLASS)

  task.setAttribute("readonly", "readonly")

  edit.addEventListener('click', editTask)

  function editTask(e) {
    const editLocal = e.target
    const removedItem = editLocal.parentNode
    const newTask = removedItem.querySelector('.todolist__task-new')

    if (editLocal.classList.contains('success')) {
      const index = removedItem.getAttribute(ATRIBUTE_ITEM)
      todolist[index] = newTask.value
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

  task.value = lastValue
  edit.innerHTML = 'edit'
  del.innerHTML = 'delete'

  newElems.append(item)
  item.append(task, edit, del)

  del.addEventListener('click', remove)


}

function remove(e) {
  const removedItem = e.target.parentNode
  const index = removedItem.getAttribute(ATRIBUTE_ITEM)
  todolist.splice(index, 1)
  removedItem.remove()
}
