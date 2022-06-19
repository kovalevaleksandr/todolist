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
completed.addEventListener('click', function (e) {
    getCompletedTasks()
})
active.addEventListener('click', function (e) {
    getActiveTasks()
})
all.addEventListener('click', function (e) {
    getAllTasks()
})


function getActiveTasks() {
    document.querySelectorAll('.filter__button').forEach(item=>item.classList.remove('button--filter-active'))
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    const completedArr = item.todolist.filter(item => item.completed === false)
    completedArr.forEach(element => item.renderingTask(element))
    active.classList.add('button--filter-active')
}

function getCompletedTasks() {
    document.querySelectorAll('.filter__button').forEach(item=>item.classList.remove('button--filter-active'))
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    const completedArr = item.todolist.filter(item => item.completed === true)
    completedArr.forEach(element => item.renderingTask(element))
    completed.classList.add('button--filter-active')
}

function getAllTasks() {
    document.querySelectorAll('.filter__button').forEach(item=>item.classList.remove('button--filter-active'))
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    item.todolist.forEach(element => item.renderingTask(element))
    all.classList.add('button--filter-active')
}

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


