import {ERROR} from "../../constants.js";

export default class UI {
    constructor() {
        this.list = JSON.parse(localStorage.getItem("todolist")) || []
    }

     addTask(title) {
        const lastId = this.list.length > 0 ? Number(this.list[this.list.length - 1].id) + 1 : 0
        this.list.push({id: lastId.toString(), title, completed: false, est: ""})
        localStorage.setItem("todolist", JSON.stringify(this.list))
        return this.list[this.list.length - 1]
    }

    updateTask(title, index) {
        const thisObj = this.list.find(item=>item.id === index)
        thisObj.title = title
        localStorage.setItem("todolist", JSON.stringify(this.list))
    }

    toggleTask(id) {
        const currentElement = this.list.find(elem => elem.id === id)
        currentElement.completed = !currentElement.completed
        localStorage.setItem("todolist", JSON.stringify(this.list))
    }

    removeTask(id) {
        const removeItemIndex = this.list.findIndex(item => item.id === id)
        this.list.splice(removeItemIndex, 1)
        localStorage.setItem("todolist", JSON.stringify(this.list))
    }

    validate(error) {
        if (error) {
            ERROR.classList.remove('error--show')
        } else {
            ERROR.classList.add('error--show')
        }
    }
}
