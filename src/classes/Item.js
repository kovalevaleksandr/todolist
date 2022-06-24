import {
    ATTRIBUTE_ITEM,
    ITEM_CLASS,
    LIST,
    MATERIAL_CLASS,
    TASK_CLASS,
    EDIT_CLASS,
    DELETE_CLASS
} from "../common/constants.js";
import UI from "./UI.js"

export default class Item {
    constructor() {
        this.store = new UI()
        this.todolist = this.store.list
    }

    renderingTask(elem) {
        const item = document.createElement('div')
        const check = document.createElement('INPUT')
        const task = document.createElement('div')
        const edit = document.createElement('div')
        const del = document.createElement('div')
        const label = document.createElement('label')

        // const checkAfterReload = elem.completed ? 'state--ready' : '1'
        let checkAfterReload = '1'

        if (elem.completed) {
            checkAfterReload = 'state--ready'
        }

        item.classList.add(ITEM_CLASS)
        task.classList.add(TASK_CLASS, checkAfterReload)
        edit.classList.add(MATERIAL_CLASS, EDIT_CLASS)
        del.classList.add(MATERIAL_CLASS, DELETE_CLASS)
        check.classList.add('todolist__state')
        label.classList.add('label')


        // task.setAttribute('readonly', 'readonly')
        // task.setAttribute('value', elem.title)
        // task.setAttribute("readonly", "readonly")
        check.setAttribute('type', 'checkbox')
        check.setAttribute('id', elem.id)
        check.checked = elem.completed
        item.setAttribute(ATTRIBUTE_ITEM, elem.id)
        label.setAttribute('for', elem.id)

        label.innerHTML = '<img src="../assets/images/check.svg" alt="check">'
        edit.innerHTML = 'edit'
        del.innerHTML = 'delete'
        task.innerHTML = elem.title

        LIST.append(item)
        item.append(check, label, task, edit, del )

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
            currentElement.classList.remove('save')
            currentElement.innerHTML = 'edit'

            if (this.todolist.findIndex(item => item.title === taskField.value) === -1 || this.todolist.find(item => item.id === index).title === taskField.value) {
                this.store.updateTask(taskField.value, index)
            } else {
                this.store.validate(false)
                const thisObj = this.todolist.find(item => item.id === index)
                taskField.value = thisObj.title
            }

        } else {
            document.querySelector('.modal').style.display = 'block'
            this.store.validate(true)
            currentElement.innerHTML = 'done'
            currentElement.classList.add('save')
        }
    }

    remove(event) {
        const removedItem = event.target.parentNode
        const id = removedItem.getAttribute(ATTRIBUTE_ITEM)
        // const removeItemIndex = this.todolist.findIndex(item => item.id === id)
        // // this.todolist.splice(removeItemIndex, 1)
        this.store.removeTask(id)
        removedItem.remove()
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
            itemParent.querySelector(`.button--edit`).classList.add('edit--disable')
            itemParent.querySelector(`.button--del`).classList.add('remove--disable')
            const a = document.querySelector('.notice')
            a.classList.add('notice--active')
            document.querySelector('.notice__name').innerHTML = `<span> ${element.title} </span>`

            document.querySelector('.notice__button').addEventListener('click', ()=>{
                element.completed = true
                item.classList.remove('state--ready')
                itemParent.querySelector(`.button--edit`).classList.remove('edit--disable')
                itemParent.querySelector(`.button--del`).classList.remove('remove--disable')
                currentElement.checked = false
                a.classList.remove('notice--active')
                this.store.toggleTask(id)
            })

            setTimeout(function() {
                a.classList.remove('notice--active')

            }, 3000)

        } else {
            element.completed = true
            item.classList.remove('state--ready')
            itemParent.querySelector(`.button--edit`).classList.remove('edit--disable')
            itemParent.querySelector(`.button--del`).classList.remove('remove--disable')
        }
        this.store.toggleTask(id)
    }
}
