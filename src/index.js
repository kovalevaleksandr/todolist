import {INPUT, ERROR, BTN_ADD, completed, ITEM_CLASS, active, all} from './common/constants.js'
import Item from './classes/Item.js'
import UI from './classes/UI.js'
import getSortTasks from "./utils/sort.js"
import './assets/styles/style.css'
import './assets/styles/style.scss'
import Modal from "./classes/Modal"

import back from './assets/images/back.svg'
import check from './assets/images/check.svg'
import watch from './assets/images/watch.svg'
import ok from './assets/images/notice/ok.svg'

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

document.querySelectorAll('.filter__button').forEach(i => i.addEventListener('click', function (e) {
  getSortTasks(e, item)
}))

const headerAuth = document.querySelector('.header__auth')
const modalAuth = document.querySelector('.modal-auth')

headerAuth.addEventListener('click', () => {
  modalAuth.style.display = 'block'
})




document.querySelector('.modal-auth__overlay').addEventListener('click', () => {
  document.querySelector('.modal-auth').style.display = "none"
})




const tabsBtn = document.querySelectorAll('.modal-auth__item')
const tabsItem = document.querySelectorAll('.modal-auth__form')


tabsBtn.forEach(currentBtn => {
  currentBtn.addEventListener('click', () => {
    let tabId = currentBtn.getAttribute('data-tab')
    let currentTab = document.querySelector(tabId)

    if (! currentBtn.classList.contains('active')) {
      tabsBtn.forEach(item => {
        item.classList.remove('auth--active')
      })
      tabsItem.forEach(item=>{
        item.classList.remove('modal-auth--active')
      })
      currentBtn.classList.add('auth--active')
      currentTab.classList.add('modal-auth--active')
    }
  })
})

document.querySelector('.modal-auth__item').click()










