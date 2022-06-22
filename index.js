import {INPUT, ERROR, BTN_ADD, completed, ITEM_CLASS, active, all} from './constants.js'
import Item from "./src/classes/Item.js"
import UI from "./src/classes/UI.js";

const item = new Item()
const ui = new UI()

document.addEventListener("DOMContentLoaded", () => {
    item.todolist.forEach((element) => item.renderingTask(element))
})
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

document.querySelectorAll('.filter__button').forEach(item=>item.addEventListener('click', function (e) {
    getCompletedTasks(e)
}))

function getCompletedTasks(event) {
    document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    const listClass = event.currentTarget.className
    switch (listClass) {
        case 'filter__button button--active':
            console.log(1)
            const completedArr = item.todolist.filter(item => item.completed === false)
            completedArr.forEach(element => item.renderingTask(element))
            break;
        case 'filter__button button--completed':
            console.log(1)
            const notCompletedArr = item.todolist.filter(item => item.completed === true)
            notCompletedArr.forEach(element => item.renderingTask(element))
            break;
        case 'filter__button button--all':
            console.log(1)
            item.todolist.forEach(element => item.renderingTask(element))
            break;
    }
    event.currentTarget.classList.add('button--filter-active')
}

document.querySelector('.search').addEventListener('click', ()=>{
    const searchItem = document.createElement('input')
    searchItem.classList.add('search-input__input')
    document.querySelector('.search-input').append(searchItem)
    const v = document.querySelector('.search-input__input')
    v.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
            document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
            const completedArr = item.todolist.filter(item => item.title === v.value)
            completedArr.forEach(element => item.renderingTask(element))
        }
    })
})






