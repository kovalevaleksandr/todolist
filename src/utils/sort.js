import {ITEM_CLASS} from "../common/constants.js"
import Item from "../classes/Item.js"

const item = new Item()

export default function getSortTasks(event) {
  document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
  document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
  const listClass = event.currentTarget.className
    console.log(item.todolist)
  switch (listClass) {
    case 'filter__button button--active':
      console.log(item.todolist)

      const completedArr = item.todolist.filter(item => item.completed === false)
      completedArr.forEach(element => item.renderingTask(element))
      break;
    case 'filter__button button--completed':
      const notCompletedArr = item.todolist.filter(item => item.completed === true)
      notCompletedArr.forEach(element => item.renderingTask(element))
      break;
    case 'filter__button button--all':
      item.todolist.forEach(element => item.renderingTask(element))
      break;
  }
  event.currentTarget.classList.add('button--filter-active')
}