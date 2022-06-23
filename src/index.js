import {INPUT, ERROR, BTN_ADD, completed, ITEM_CLASS, active, all} from './common/constants.js'
import Item from './classes/Item.js'
import UI from './classes/UI.js'
import getSortTasks from "./utils/sort.js";
import './assets/styles/style.css'

const item = new Item()
const ui = new UI()

window.onload = ()=> {
  item.todolist.forEach((element) => item.renderingTask(element))
}

BTN_ADD.addEventListener('click', toDoHandler)
INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    toDoHandler()
  }
})

function toDoHandler() {
  const valueInput = INPUT.value
  if (valueInput && !item.todolist.some(i => i.title === valueInput)) {
    item.add(valueInput)
    console.log(item.todolist)
    INPUT.value = ''
    ui.validate(true)
  } else {
    ui.validate(false)
  }
}

document.querySelectorAll('.filter__button').forEach(item => item.addEventListener('click', function (e) {
  getSortTasks(e)
}))



const modal = document.querySelector('.modal')
const modalInput = document.querySelector('.modal__input')
const search = document.querySelector('.search')

search.addEventListener('click', () => {

  if (search.classList.contains('search--active')) {
    search.classList.remove('search--active')
    document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    item.todolist.forEach((element) => item.renderingTask(element))
  } else {
    modal.style.display = 'block'
  }
})

function getSearchElement() {
  document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
  document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
  const completedArr = item.todolist.filter(item => item.title === modalInput.value)
  completedArr.forEach(element => item.renderingTask(element))
  search.classList.add('search--active')
}

const funcInner = debounce(getSearchElement, 300)
function debounce(fn, time) {
  let timeout
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time)
  }
}

modalInput.oninput = funcInner
document.querySelector('.modal__close').addEventListener('click', () => {
  modal.style.display = "none"
})
document.querySelector('.modal__overlay').addEventListener('click', () => {
  modal.style.display = "none"
})


document.querySelector('.header__auth').addEventListener('click', () => {
document.querySelector('.modal-auth').style.display = 'block'
})

document.querySelectorAll('.modal-auth__item').forEach(item=> {
  item.addEventListener('click', (e) => {
    document.querySelectorAll('.modal-auth__item').forEach(item=>{
      item.classList.remove('auth--active')
    })
    item.classList.add('auth--active')
  })
})

document.querySelector('.modal-auth__overlay').addEventListener('click', () => {
  document.querySelector('.modal-auth').style.display = "none"
})










