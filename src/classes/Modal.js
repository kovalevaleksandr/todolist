const title_modal = document.querySelector('.modal-search__title')

export default class Modal {
  constructor(id) {
    this.modalHtml = renderModal(id)
  }

  renderModal(id) {
    //html
    title_modal.innerHTML = this.title
    const modal = document.createElement('div')
    modal.id = id
    modal.classList.add('modal')
    return document.querySelector(`#${id}`)
  }

  addToHeader(title) {
    this.modalHtml.querySelector('.title')
innerHtml = title
  }

  addToContent() {

  }

  //в конец боди
  toggle() {

  }


}


class Search extends Modal {

  constructor() {
    super('search');
    this.addToHeader('<span>Введите строку</span>')
  }

  search() {

  }

}

class Edit extends Modal {

  constructor(title, item) {
    super(title, item);
  }

  edit()

}

const search = new Search()
const edit = new Edit()

