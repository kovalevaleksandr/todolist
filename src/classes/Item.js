import {
    ATTRIBUTE_ITEM,
    BTN_CLASS,
    ITEM_CLASS,
    LIST,
    MATERIAL_CLASS,
    TASK_CLASS,
    EDIT_CLASS,
    DELETE_CLASS
} from "../../constants.js";
import UI from "./UI.js"

export default class Item {
    constructor() {
        this.store = new UI()
        this.todolist = this.store.list
        //this.todolist
    }

    renderingTask(elem) {
        const item = document.createElement('div')
        const check = document.createElement('INPUT')
        const task = document.createElement('input')
        const edit = document.createElement('div')
        const del = document.createElement('div')

        const checkAfterReload = elem.completed ? 'state--ready' : '⠀'

        item.classList.add(ITEM_CLASS)
        task.classList.add(TASK_CLASS, checkAfterReload)
        edit.classList.add(MATERIAL_CLASS, EDIT_CLASS)
        del.classList.add(MATERIAL_CLASS, DELETE_CLASS)
        check.classList.add('todolist__state')

        task.setAttribute('readonly', 'readonly')
        task.setAttribute('value', elem.title)
        check.setAttribute('type', 'checkbox')
        check.checked = elem.completed
        item.setAttribute(ATTRIBUTE_ITEM, elem.id)

        edit.innerHTML = 'edit'
        del.innerHTML = 'delete'

        LIST.append(item)
        item.append(check, task, edit, del)

        edit.addEventListener('click', (e) => this.update(e))
        del.addEventListener('click', (e) => this.remove(e))
        check.addEventListener('change', (e) => this.check(e))
    }

    add(value) {
        const task = this.store.addTask(value)
        this.renderingTask(task)
    }

    update(event) {
        const currentElement = event.target
        const parentItem = currentElement.parentNode
        const taskField = parentItem.querySelector('.todolist__task-new')
        const index = parentItem.getAttribute(ATTRIBUTE_ITEM)
        if (currentElement.classList.contains('save')) {
            taskField.setAttribute("readonly", "readonly")
            currentElement.classList.remove('save')
            currentElement.innerHTML = 'edit'

            if (this.todolist.findIndex(item => item.title === taskField.value) === -1 || this.todolist.find(item=>item.id === index).title === taskField.value)  {
                this.store.updateTask(taskField.value, index)
                console.log(this.todolist.find(item=>item.id === index).title === taskField.value )
            } else {
                this.store.validate(false)
                const thisObj = this.todolist.find(item=>item.id === index)
                taskField.value = thisObj.title
            }

        } else {
            this.store.validate(true)
            currentElement.innerHTML = 'done'
            currentElement.classList.add('save')
            taskField.removeAttribute("readonly")
        }
    }

    remove(event) {
        const removedItem = event.target.parentNode
        const id = removedItem.getAttribute(ATTRIBUTE_ITEM)
        const removeItemIndex = this.todolist.findIndex(item => item.id === id)
        this.todolist.splice(removeItemIndex, 1)
        removedItem.remove()
        this.store.removeTask(id)
    }

    check(event) {
        const currentElement = event.target
        const itemParent = currentElement.parentNode
        const item = itemParent.querySelector(`.${TASK_CLASS}`)
        const id = itemParent.getAttribute(ATTRIBUTE_ITEM)
        const element = this.todolist.find(elem => elem.id === id)
        if (currentElement.checked) {
            element.completed = false
            item.classList.add('state--ready')
        } else {
            element.completed = true
            item.classList.remove('state--ready')
        }
        this.store.toggleTask(id)
    }
}
