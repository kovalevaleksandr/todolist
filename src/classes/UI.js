import {ERROR, INPUT} from "../../constants.js";

export default class UI {
  constructor() {
  }

  validate(error) {
    if (error) {
      ERROR.classList.remove('error--show')
    } else {
      ERROR.classList.add('error--show')
    }
  }
}
