import {INPUT, ERROR, BTN_ADD} from './constants.js'
import Item from "./src/classes/Item.js"
import UI from "./src/classes/UI.js"

const item = new Item()
const ui = new UI()

document.addEventListener("DOMContentLoaded", () => {
  item.todolist?.forEach((element, index) => item.add(element, index))
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
    // item.todolist.push({title: valueInput, completed: false, est: ''})
    item.add(valueInput)

    INPUT.value = ''
    ui.validate(true)
  } else {
    ui.validate(false)
  }
}


