import {todolist, element, newElems, TODO_INPUT, del, ITEM_CLASS, TASC_CLASS, BTN_CLASS, MATERIAL_CLASS, TODO_CLASS, ATRIBUTE_ITEM} from './consts.js'

element.addEventListener('click', addList)

TODO_INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addList()
  }
})

function addList() {
  let title = document.querySelector(TODO_CLASS).value
  if (title !== '' && !todolist.some(i=>i===title)){
    todolist.push(title)
    document.querySelector(TODO_CLASS).value = ''
    add()
    validate('')
  } else {
    validate('Вы вводите пустую или уже имеющуюся задачу!')
  } 
}

function validate(error){
  const errorText = document.createElement('p') 
  console.log(errorText)
  errorText.innerHTML=error 
  document.querySelector('.todolist__container').append(errorText)
}

function add() {
  const lastValue = todolist[todolist.length - 1]

  const item = document.createElement('div')
  const task = document.createElement('div')
  const edit = document.createElement('div')
  const del = document.createElement('div')

  item.classList.add(ITEM_CLASS)
  task.classList.add(TASC_CLASS)
  edit.classList.add(BTN_CLASS, MATERIAL_CLASS)
  del.classList.add(BTN_CLASS, MATERIAL_CLASS)

  item.setAttribute(ATRIBUTE_ITEM, todolist.length - 1)

  task.append(lastValue)
  edit.innerHTML = 'edit'
  del.innerHTML = 'delete'

  newElems.append(item)
  item.append(task, edit, del)

  del.addEventListener('click', remove)
}

function remove(e) {
  const removedItem = e.target.parentNode
  console.log(removedItem)
  const index = removedItem.getAttribute(ATRIBUTE_ITEM)
 
  todolist.splice(index, 1)

  removedItem.remove()
} 




