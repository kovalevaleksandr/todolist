const title_modal = document.querySelector('.modal-search__title')

export default class Modal {
  constructor(title, item) {
    this.title = title
    this.item = item
  }

  renderModal() {
    title_modal.innerHTML = this.title

  }

  callModal() {
    document.querySelector(`${this.item}`).addEventListener('click', (e) => {
      e.target.classList.add('modal--active')
    })
  }


}

class Search extends Modal {

  constructor(title, item) {
    super(title, item);
  }

}

