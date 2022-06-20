import {ERROR} from "../../constants.js";

export default class UI {
    constructor() {
        this.list = JSON.parse(localStorage.getItem("todolist")) || []
    }

     addTask(title) {
        const lastIndex = this.list.length > 0 ? Number(this.list[this.list.length - 1].id) + 1 : 0
        this.list.push({id: lastIndex.toString(), title, completed: false, est: ""})
        localStorage.setItem("todolist", JSON.stringify(this.list))
        return this.list[this.list.length - 1]
    }

    updateTask(title, index) {
        this.list[index].title = title
        localStorage.setItem("todolist", JSON.stringify(this.list))
    }

    toggleTask(id) {
        const element = this.list.find(elem => elem.id === id)
        element.completed = !element.completed
        localStorage.setItem("todolist", JSON.stringify(this.list))
    }

    removeTask(id) {
        const arrayLocal = JSON.parse(localStorage.getItem("todolist"))
        const removeItemIndex = arrayLocal.findIndex(item => item.id === id)
        arrayLocal.splice(removeItemIndex, 1)
        localStorage.setItem("todolist", JSON.stringify(arrayLocal))
    }

    validate(error) {
        if (error) {
            ERROR.classList.remove('error--show')
        } else {
            ERROR.classList.add('error--show')
        }
    }
}
