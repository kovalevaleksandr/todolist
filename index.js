import {INPUT, ERROR, BTN_ADD, completed, ITEM_CLASS, active, all} from './constants.js'
import Item from "./src/classes/Item.js"
import UI from "./src/classes/UI.js";

const item = new Item()
const ui = new UI()

// document.addEventListener("DOMContentLoaded", () => {
//   item.todolist.forEach((element) => item.renderingTask(element))
// })
  window.onload = () => {
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
    INPUT.value = ''
    ui.validate(true)
  } else {
    ui.validate(false)
  }
}

document.querySelectorAll('.filter__button').forEach(item => item.addEventListener('click', function (e) {
  getSortTasks(e)
}))

function getSortTasks(event) {
  document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
  document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
  const listClass = event.currentTarget.className
  switch (listClass) {
    case 'filter__button button--active':
      const completedArr = item.todolist.filter(item => item.completed === false)
      completedArr.forEach(element => item.renderingTask(element))
      break;
    case 'filter__button button--completed':
      const notCompletedArr = item.todolist.filter(item => item.completed === true)
      notCompletedArr.forEach(element => item.renderingTask(element))
      break;
    case 'filter__button button--all':
      item.todolist.forEach(element => item.renderingTask(element))
      break;
  }
  event.currentTarget.classList.add('button--filter-active')
}

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
  modal.style.display = 'none'
}

const funcInner = debounce(getSearchElement, 1000)
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

function login(email, password) {
  const apiKey = "AIzaSyCDqzZku5kbLtho6un9HDM9Jo0oueaX-LY"
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
}


function auth (event) {
  event.preventDefault()

  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value

  login(email, password)
}


/*auth*/
document.querySelector('.modal-auth__form').addEventListener('submit', auth)












