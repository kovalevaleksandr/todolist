import {ITEM_CLASS} from "../common/constants";
import Item from "./Item";

const item = new Item()
const modalInput = document.querySelector('.modal__input')

export default class Modal {
  addToId(id) {
    document.querySelector('.modal-in').id = id
  }

  addToHeader(title) {
    document.querySelector('.modal__title').innerHtml = title
  }

  addToIdInput(id) {
    modalInput.id = id
  }

}


class Search extends Modal {

  getSearchItem() {
    super.addToId('search')
    super.addToHeader('<span>\'Введите строку\'</span>')
    super.addToIdInput('search')
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => item.remove())
    const completedArr = item.todolist.filter(item => item.title === modalInput.value)
    completedArr.forEach(element => item.renderingTask(element))
    document.querySelector('.search').classList.add('search--active')
  }
}

const searchClass = new Search()

const funcInner = debounce(searchClass.getSearchItem, 300)

function debounce(fn, time) {
  let timeout
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time)
  }
}

const searchItem = document.querySelector('.search')

searchItem.addEventListener('click', () => {
  document.querySelector('.modal-in').classList.add('modal--act')
  funcInner()
})

document.querySelector('.modal__overlay').addEventListener('click', ()=> {
  document.querySelector('.modal-auth').style.display = "none"
  // document.querySelector('.modal-in').classList.remove('modal--act')
})


// class Edit extends Modal {
//
//   constructor(title, item) {
//     super(title, item);
//   }
//
//   edit() {
//
//   }
//
// }
// const edit = new Edit()