const ITEM_CLASS = 'todolist__item'
const TASC_CLASS = 'todolist__task-new'
const BTN_CLASS = 'todolist__button'
const MATERIAL_CLASS = 'material-symbols-outlined'
const ATTRIBUTE_ITEM = 'todo-index'
const TODO_CLASS = 'todolist__input'


const BTN = document.querySelector(`.${BTN_CLASS}`)
const LIST = document.querySelector('.todolist__list')
const INPUT = document.querySelector(`.${TODO_CLASS}`)
const BTN_DEL = document.querySelector('.todolist__button-del')
const ERROR = document.querySelector('.error')
const CHECKBOX = document.querySelector('.todolist__state')
const NEW_TASK = document.querySelector(`.${TASC_CLASS}`)

export {BTN, LIST, INPUT, BTN_DEL, ITEM_CLASS, TASC_CLASS, BTN_CLASS, MATERIAL_CLASS, TODO_CLASS, ATTRIBUTE_ITEM, ERROR, CHECKBOX, NEW_TASK}
