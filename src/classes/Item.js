import {ATTRIBUTE_ITEM, BTN_CLASS, ITEM_CLASS, LIST, MATERIAL_CLASS, TASK_CLASS} from "../../constants.js";
import UI from "./UI.js"

export default class Item {
  constructor() {
    this.store = new UI();

    this.todolist = this.store.list
  }

  add(element, index) {
    const currentIndex = index ?? this.todolist.length - 1
    // const currentElement = element || this.todolist[currentIndex]
    const taskTitle = element

    const item = document.createElement('div')
    const state = document.createElement('INPUT')
    const task = document.createElement('input')
    const edit = document.createElement('div')
    const del = document.createElement('div')

    item.classList.add(ITEM_CLASS)
    task.classList.add(TASK_CLASS)
    edit.classList.add(BTN_CLASS, MATERIAL_CLASS, 'button-edit')
    del.classList.add(BTN_CLASS, MATERIAL_CLASS)
    state.classList.add('todolist__state')

    task.setAttribute('readonly', 'readonly')
    state.setAttribute('type', 'checkbox')

    edit.addEventListener('click', this.update)

    item.setAttribute(ATTRIBUTE_ITEM, currentIndex.toString())

    task.value = taskTitle
    edit.innerHTML = 'edit'
    del.innerHTML = 'delete'

    LIST.append(item)
    item.append(state, task, edit, del)

    del.addEventListener('click', (e) => this.remove(e))
    state.addEventListener('change', (e) => this.check(e))
    this.store.addTask(taskTitle)
  }

  update(event) {
    const currentElement = event.target
    const removedItem = currentElement.parentNode
    const newTask = removedItem.querySelector('.todolist__task-new')

    if (currentElement.classList.contains('save')) {
      const index = removedItem.getAttribute(ATTRIBUTE_ITEM)
      this.store.updateTask(newTask.value, index)
      newTask.setAttribute("readonly", "readonly")
      currentElement.classList.remove('save')
      currentElement.innerHTML = 'edit'
      return true
    }
    currentElement.innerHTML = 'done'
    currentElement.classList.add('save')

    newTask.removeAttribute("readonly")
  }

  remove(event) {
    const removedItem = event.target.parentNode
    const index = removedItem.getAttribute(ATTRIBUTE_ITEM)
    this.todolist.splice(index, 1)
    removedItem.remove()
  }

  check(event) {
    const currentElement = event.target
    const itemParent = currentElement.parentNode
    const item = itemParent.querySelector(`.${TASK_CLASS}`)
    const index = itemParent.getAttribute(ATTRIBUTE_ITEM)

    if (currentElement.checked) {
      this.todolist[index].completed = true
      item.classList.add('state--ready')
    } else {
      this.todolist[index].completed = false
      item.classList.remove('state--ready')
    }
  }
}
