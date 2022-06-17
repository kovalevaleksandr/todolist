import {ATTRIBUTE_ITEM, BTN_CLASS, ITEM_CLASS, LIST, MATERIAL_CLASS, TASK_CLASS} from "../../constants.js";

export default class Item {
  constructor() {
    const handler = function () {
      return {
        get(target, property) {
          if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[property])) > -1) {
            return new Proxy(target[property], handler());
          }
          return target[property]
        },

        set(target, property, value) {
          target[property] = value
          localStorage.setItem('todolist', JSON.stringify(todolist))
          return true
        }
      }
    }
    const todolist = this.todolist = new Proxy(JSON.parse(localStorage.getItem('todolist')) || [], handler())
  }

  add(e, i) {
    const lastIndex = i ?? this.todolist.length - 1
    const lastValue = e || this.todolist[lastIndex]

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

    item.setAttribute(ATTRIBUTE_ITEM, lastIndex.toString())


    task.value = lastValue.title
    edit.innerHTML = 'edit'
    del.innerHTML = 'delete'

    LIST.append(item)
    item.append(state, task, edit, del)

    del.addEventListener('click', (e)=>this.remove(e))
    state.addEventListener('change', (e)=>this.check(e))
  }

  update(event) {

    const currentElement = event.target
    const removedItem = currentElement.parentNode
    const newTask = removedItem.querySelector('.todolist__task-new')

    if (currentElement.classList.contains('save')) {
      const index = removedItem.getAttribute(ATTRIBUTE_ITEM)
      this.todolist[index].title = newTask.value
      newTask.setAttribute("readonly", "readonly")
      currentElement.classList.remove('save')
      currentElement.innerHTML = 'edit'
      return true
    }
    currentElement.innerHTML = 'done'
    currentElement.classList.add('save')

    newTask.removeAttribute("readonly")
  }

  remove (event) {
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