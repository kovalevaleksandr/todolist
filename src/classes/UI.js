import {ERROR} from "../../constants.js";

export default class UI {
  constructor() {
    // this.todolist = new Proxy(JSON.parse(localStorage.getItem('todolist')) || [], initStorage())

    this.list = JSON.parse(localStorage.getItem("todolist")) || []
  }

  addTask(title) {
    this.list.push({title, completed: false, est: ""})
    localStorage.setItem("todolist", JSON.stringify(this.list))
  }

  updateTask(title, index) {
    this.list[index].title = title
    localStorage.setItem("todolist", JSON.stringify(this.list))
  }

  toggleTask(index) {
    this.list[index].completed = !this.list[index].completed
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
