/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/styles/style.scss":
/*!**************************************!*\
  !*** ./src/assets/styles/style.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/styles/style.css":
/*!*************************************!*\
  !*** ./src/assets/styles/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/classes/Item.js":
/*!*****************************!*\
  !*** ./src/classes/Item.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants.js */ "./src/common/constants.js");
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI.js */ "./src/classes/UI.js");



class Item {
    constructor() {
        this.store = new _UI_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
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

        item.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS)
        task.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.TASK_CLASS, checkAfterReload)
        edit.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.MATERIAL_CLASS, _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.EDIT_CLASS)
        del.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.MATERIAL_CLASS, _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.DELETE_CLASS)
        check.classList.add('todolist__state')
        label.classList.add('label')


        // task.setAttribute('readonly', 'readonly')
        // task.setAttribute('value', elem.title)
        // task.setAttribute("readonly", "readonly")
        check.setAttribute('type', 'checkbox')
        check.setAttribute('id', elem.id)
        check.checked = elem.completed
        item.setAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM, elem.id)
        label.setAttribute('for', elem.id)

        label.innerHTML = '<img src="../assets/images/check.svg" alt="check">'
        edit.innerHTML = 'edit'
        del.innerHTML = 'delete'
        task.innerHTML = elem.title

        _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.LIST.append(item)
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
        const index = parentItem.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM)
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
        const id = removedItem.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM)
        // const removeItemIndex = this.todolist.findIndex(item => item.id === id)
        // // this.todolist.splice(removeItemIndex, 1)
        this.store.removeTask(id)
        removedItem.remove()
    }

    check(event) {
        const currentElement = event.target
        const itemParent = currentElement.parentNode
        const item = itemParent.querySelector(`.${_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.TASK_CLASS}`)
        const id = itemParent.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM)
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


/***/ }),

/***/ "./src/classes/UI.js":
/*!***************************!*\
  !*** ./src/classes/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants.js */ "./src/common/constants.js");


class UI {
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
            _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR.classList.remove('error--show')
        } else {
            _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR.classList.add('error--show')
        }
    }
}


/***/ }),

/***/ "./src/common/constants.js":
/*!*********************************!*\
  !*** ./src/common/constants.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADD_CLASS": () => (/* binding */ ADD_CLASS),
/* harmony export */   "ATTRIBUTE_ITEM": () => (/* binding */ ATTRIBUTE_ITEM),
/* harmony export */   "BTN_ADD": () => (/* binding */ BTN_ADD),
/* harmony export */   "DELETE_CLASS": () => (/* binding */ DELETE_CLASS),
/* harmony export */   "EDIT_CLASS": () => (/* binding */ EDIT_CLASS),
/* harmony export */   "ERROR": () => (/* binding */ ERROR),
/* harmony export */   "INPUT": () => (/* binding */ INPUT),
/* harmony export */   "ITEM_CLASS": () => (/* binding */ ITEM_CLASS),
/* harmony export */   "LIST": () => (/* binding */ LIST),
/* harmony export */   "MATERIAL_CLASS": () => (/* binding */ MATERIAL_CLASS),
/* harmony export */   "TASK_CLASS": () => (/* binding */ TASK_CLASS),
/* harmony export */   "TODO_CLASS": () => (/* binding */ TODO_CLASS),
/* harmony export */   "active": () => (/* binding */ active),
/* harmony export */   "all": () => (/* binding */ all),
/* harmony export */   "completed": () => (/* binding */ completed)
/* harmony export */ });
const ITEM_CLASS = 'list__item'
const TASK_CLASS = 'todolist__task-new'
const ADD_CLASS = 'button--add'
const EDIT_CLASS = 'button--edit'
const DELETE_CLASS = 'button--del'
const MATERIAL_CLASS = 'material-symbols-outlined'
const ATTRIBUTE_ITEM = 'todo-id'
const TODO_CLASS = 'add-task__input'


const BTN_ADD = document.querySelector(`.${ADD_CLASS}`)
const LIST = document.querySelector('.list')
const INPUT = document.querySelector(`.${TODO_CLASS}`)
const ERROR = document.querySelector('.error')

const completed = document.querySelector('.button--completed')
const active = document.querySelector('.button--active')
const all = document.querySelector('.button--all')



/***/ }),

/***/ "./src/utils/sort.js":
/*!***************************!*\
  !*** ./src/utils/sort.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSortTasks)
/* harmony export */ });
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants.js */ "./src/common/constants.js");
/* harmony import */ var _classes_Item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/Item.js */ "./src/classes/Item.js");




function getSortTasks(event, item) {
  document.querySelectorAll('.filter__button').forEach(item => item.classList.remove('button--filter-active'))
  document.querySelectorAll(`.${_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS}`).forEach(item => item.remove())
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


/***/ }),

/***/ "./src/assets/images/back.svg":
/*!************************************!*\
  !*** ./src/assets/images/back.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/back.svg";

/***/ }),

/***/ "./src/assets/images/check.svg":
/*!*************************************!*\
  !*** ./src/assets/images/check.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/check.svg";

/***/ }),

/***/ "./src/assets/images/notice/ok.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/notice/ok.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/ok.svg";

/***/ }),

/***/ "./src/assets/images/watch.svg":
/*!*************************************!*\
  !*** ./src/assets/images/watch.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/watch.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/constants.js */ "./src/common/constants.js");
/* harmony import */ var _classes_Item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Item.js */ "./src/classes/Item.js");
/* harmony import */ var _classes_UI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/UI.js */ "./src/classes/UI.js");
/* harmony import */ var _utils_sort_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/sort.js */ "./src/utils/sort.js");
/* harmony import */ var _assets_styles_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/styles/style.css */ "./src/assets/styles/style.css");
/* harmony import */ var _assets_styles_style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/styles/style.scss */ "./src/assets/styles/style.scss");
/* harmony import */ var _assets_images_back_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/images/back.svg */ "./src/assets/images/back.svg");
/* harmony import */ var _assets_images_check_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/images/check.svg */ "./src/assets/images/check.svg");
/* harmony import */ var _assets_images_watch_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/images/watch.svg */ "./src/assets/images/watch.svg");
/* harmony import */ var _assets_images_notice_ok_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/images/notice/ok.svg */ "./src/assets/images/notice/ok.svg");












const item = new _classes_Item_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
const ui = new _classes_UI_js__WEBPACK_IMPORTED_MODULE_2__["default"]()

window.onload = ()=> {
  item.todolist.forEach((element) => item.renderingTask(element))
}

_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.BTN_ADD.addEventListener('click', toDoHandler)
_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    toDoHandler()
  }
})

function toDoHandler() {
  const valueInput = _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.value
  if (valueInput && !item.todolist.some(i => i.title === valueInput)) {
    item.add(valueInput)
    console.log(item.todolist)
    _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.value = ''
    ui.validate(true)
  } else {
    ui.validate(false)
  }
}

document.querySelectorAll('.filter__button').forEach(i => i.addEventListener('click', function (e) {
  (0,_utils_sort_js__WEBPACK_IMPORTED_MODULE_3__["default"])(e, item)
}))

const headerAuth = document.querySelector('.header__auth')
const modalAuth = document.querySelector('.modal-auth')

headerAuth.addEventListener('click', () => {
  modalAuth.style.display = 'block'
})




document.querySelector('.modal-auth__overlay').addEventListener('click', () => {
  document.querySelector('.modal-auth').style.display = "none"
})




const tabsBtn = document.querySelectorAll('.modal-auth__item')
const tabsItem = document.querySelectorAll('.modal-auth__form')


tabsBtn.forEach(currentBtn => {
  currentBtn.addEventListener('click', () => {
    let tabId = currentBtn.getAttribute('data-tab')
    let currentTab = document.querySelector(tabId)

    if (! currentBtn.classList.contains('active')) {
      tabsBtn.forEach(item => {
        item.classList.remove('auth--active')
      })
      tabsItem.forEach(item=>{
        item.classList.remove('modal-auth--active')
      })
      currentBtn.classList.add('auth--active')
      currentTab.classList.add('modal-auth--active')
    }
  })
})

document.querySelector('.modal-auth__item').click()









})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2YrRjtBQUMzRDtBQUNKO0FBQ1c7QUFDVDtBQUNDOztBQUVRO0FBQ0U7QUFDQTtBQUNDOztBQUU5QyxpQkFBaUIsd0RBQUk7QUFDckIsZUFBZSxzREFBRTs7QUFFakI7QUFDQTtBQUNBOztBQUVBLDBFQUF3QjtBQUN4Qix3RUFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiw2REFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQSxJQUFJLDZEQUFXO0FBQ2Y7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSwwREFBWTtBQUNkLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZXMvc3R5bGUuc2Nzcz83MTJmIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2NsYXNzZXMvSXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9jbGFzc2VzL1VJLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2NvbW1vbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXRpbHMvc29ydC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHtcbiAgICBBVFRSSUJVVEVfSVRFTSxcbiAgICBJVEVNX0NMQVNTLFxuICAgIExJU1QsXG4gICAgTUFURVJJQUxfQ0xBU1MsXG4gICAgVEFTS19DTEFTUyxcbiAgICBFRElUX0NMQVNTLFxuICAgIERFTEVURV9DTEFTU1xufSBmcm9tIFwiLi4vY29tbW9uL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuL1VJLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVUkoKVxuICAgICAgICB0aGlzLnRvZG9saXN0ID0gdGhpcy5zdG9yZS5saXN0XG4gICAgfVxuXG4gICAgcmVuZGVyaW5nVGFzayhlbGVtKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJylcbiAgICAgICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBkZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblxuICAgICAgICAvLyBjb25zdCBjaGVja0FmdGVyUmVsb2FkID0gZWxlbS5jb21wbGV0ZWQgPyAnc3RhdGUtLXJlYWR5JyA6ICcxJ1xuICAgICAgICBsZXQgY2hlY2tBZnRlclJlbG9hZCA9ICcxJ1xuXG4gICAgICAgIGlmIChlbGVtLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgY2hlY2tBZnRlclJlbG9hZCA9ICdzdGF0ZS0tcmVhZHknXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoSVRFTV9DTEFTUylcbiAgICAgICAgdGFzay5jbGFzc0xpc3QuYWRkKFRBU0tfQ0xBU1MsIGNoZWNrQWZ0ZXJSZWxvYWQpXG4gICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZChNQVRFUklBTF9DTEFTUywgRURJVF9DTEFTUylcbiAgICAgICAgZGVsLmNsYXNzTGlzdC5hZGQoTUFURVJJQUxfQ0xBU1MsIERFTEVURV9DTEFTUylcbiAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZCgndG9kb2xpc3RfX3N0YXRlJylcbiAgICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnbGFiZWwnKVxuXG5cbiAgICAgICAgLy8gdGFzay5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5JylcbiAgICAgICAgLy8gdGFzay5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZWxlbS50aXRsZSlcbiAgICAgICAgLy8gdGFzay5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpXG4gICAgICAgIGNoZWNrLnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpXG4gICAgICAgIGNoZWNrLnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtLmlkKVxuICAgICAgICBjaGVjay5jaGVja2VkID0gZWxlbS5jb21wbGV0ZWRcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0lURU0sIGVsZW0uaWQpXG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgZWxlbS5pZClcblxuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuLi9hc3NldHMvaW1hZ2VzL2NoZWNrLnN2Z1wiIGFsdD1cImNoZWNrXCI+J1xuICAgICAgICBlZGl0LmlubmVySFRNTCA9ICdlZGl0J1xuICAgICAgICBkZWwuaW5uZXJIVE1MID0gJ2RlbGV0ZSdcbiAgICAgICAgdGFzay5pbm5lckhUTUwgPSBlbGVtLnRpdGxlXG5cbiAgICAgICAgTElTVC5hcHBlbmQoaXRlbSlcbiAgICAgICAgaXRlbS5hcHBlbmQoY2hlY2ssIGxhYmVsLCB0YXNrLCBlZGl0LCBkZWwgKVxuXG4gICAgICAgIGVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy51cGRhdGUoZSkpXG4gICAgICAgIGRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnJlbW92ZShlKSlcbiAgICAgICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHRoaXMuY2hlY2soZSkpXG4gICAgfVxuXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLnN0b3JlLmFkZFRhc2sodmFsdWUpXG4gICAgICAgIHRoaXMucmVuZGVyaW5nVGFzayh0YXNrKVxuICAgIH1cblxuICAgIHVwZGF0ZShldmVudCkge1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0XG4gICAgICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBjdXJyZW50RWxlbWVudC5wYXJlbnROb2RlXG4gICAgICAgIGNvbnN0IHRhc2tGaWVsZCA9IHBhcmVudEl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9saXN0X190YXNrLW5ldycpXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50SXRlbS5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0lURU0pXG4gICAgICAgIGlmIChjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NhdmUnKSkge1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2F2ZScpXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5pbm5lckhUTUwgPSAnZWRpdCdcblxuICAgICAgICAgICAgaWYgKHRoaXMudG9kb2xpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS50aXRsZSA9PT0gdGFza0ZpZWxkLnZhbHVlKSA9PT0gLTEgfHwgdGhpcy50b2RvbGlzdC5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaW5kZXgpLnRpdGxlID09PSB0YXNrRmllbGQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZVRhc2sodGFza0ZpZWxkLnZhbHVlLCBpbmRleClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS52YWxpZGF0ZShmYWxzZSlcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcy50b2RvbGlzdC5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaW5kZXgpXG4gICAgICAgICAgICAgICAgdGFza0ZpZWxkLnZhbHVlID0gdGhpc09iai50aXRsZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgdGhpcy5zdG9yZS52YWxpZGF0ZSh0cnVlKVxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuaW5uZXJIVE1MID0gJ2RvbmUnXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzYXZlJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZShldmVudCkge1xuICAgICAgICBjb25zdCByZW1vdmVkSXRlbSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlXG4gICAgICAgIGNvbnN0IGlkID0gcmVtb3ZlZEl0ZW0uZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9JVEVNKVxuICAgICAgICAvLyBjb25zdCByZW1vdmVJdGVtSW5kZXggPSB0aGlzLnRvZG9saXN0LmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKVxuICAgICAgICAvLyAvLyB0aGlzLnRvZG9saXN0LnNwbGljZShyZW1vdmVJdGVtSW5kZXgsIDEpXG4gICAgICAgIHRoaXMuc3RvcmUucmVtb3ZlVGFzayhpZClcbiAgICAgICAgcmVtb3ZlZEl0ZW0ucmVtb3ZlKClcbiAgICB9XG5cbiAgICBjaGVjayhldmVudCkge1xuICAgICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldFxuICAgICAgICBjb25zdCBpdGVtUGFyZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZVxuICAgICAgICBjb25zdCBpdGVtID0gaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuJHtUQVNLX0NMQVNTfWApXG4gICAgICAgIGNvbnN0IGlkID0gaXRlbVBhcmVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0lURU0pXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnRvZG9saXN0LmZpbmQoZWxlbSA9PiBlbGVtLmlkID09PSBpZClcbiAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnc3RhdGUtLXJlYWR5JylcbiAgICAgICAgICAgIGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLmJ1dHRvbi0tZWRpdGApLmNsYXNzTGlzdC5hZGQoJ2VkaXQtLWRpc2FibGUnKVxuICAgICAgICAgICAgaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuYnV0dG9uLS1kZWxgKS5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtLWRpc2FibGUnKVxuICAgICAgICAgICAgY29uc3QgYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpY2UnKVxuICAgICAgICAgICAgYS5jbGFzc0xpc3QuYWRkKCdub3RpY2UtLWFjdGl2ZScpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWNlX19uYW1lJykuaW5uZXJIVE1MID0gYDxzcGFuPiAke2VsZW1lbnQudGl0bGV9IDwvc3Bhbj5gXG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpY2VfX2J1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXRlLS1yZWFkeScpXG4gICAgICAgICAgICAgICAgaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuYnV0dG9uLS1lZGl0YCkuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC0tZGlzYWJsZScpXG4gICAgICAgICAgICAgICAgaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuYnV0dG9uLS1kZWxgKS5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtLWRpc2FibGUnKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGEuY2xhc3NMaXN0LnJlbW92ZSgnbm90aWNlLS1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudG9nZ2xlVGFzayhpZClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKCdub3RpY2UtLWFjdGl2ZScpXG5cbiAgICAgICAgICAgIH0sIDMwMDApXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY29tcGxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGF0ZS0tcmVhZHknKVxuICAgICAgICAgICAgaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuYnV0dG9uLS1lZGl0YCkuY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC0tZGlzYWJsZScpXG4gICAgICAgICAgICBpdGVtUGFyZW50LnF1ZXJ5U2VsZWN0b3IoYC5idXR0b24tLWRlbGApLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS0tZGlzYWJsZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS50b2dnbGVUYXNrKGlkKVxuICAgIH1cbn1cbiIsImltcG9ydCB7RVJST1J9IGZyb20gXCIuLi9jb21tb24vY29uc3RhbnRzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9saXN0XCIpKSB8fCBbXVxuICAgIH1cblxuICAgICBhZGRUYXNrKHRpdGxlKSB7XG4gICAgICAgIGNvbnN0IGxhc3RJZCA9IHRoaXMubGlzdC5sZW5ndGggPiAwID8gTnVtYmVyKHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoIC0gMV0uaWQpICsgMSA6IDBcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe2lkOiBsYXN0SWQudG9TdHJpbmcoKSwgdGl0bGUsIGNvbXBsZXRlZDogZmFsc2UsIGVzdDogXCJcIn0pXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0KSlcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoIC0gMV1cbiAgICB9XG5cbiAgICB1cGRhdGVUYXNrKHRpdGxlLCBpbmRleCkge1xuICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcy5saXN0LmZpbmQoaXRlbT0+aXRlbS5pZCA9PT0gaW5kZXgpXG4gICAgICAgIHRoaXNPYmoudGl0bGUgPSB0aXRsZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG9saXN0XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdCkpXG4gICAgfVxuXG4gICAgdG9nZ2xlVGFzayhpZCkge1xuICAgICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IHRoaXMubGlzdC5maW5kKGVsZW0gPT4gZWxlbS5pZCA9PT0gaWQpXG4gICAgICAgIGN1cnJlbnRFbGVtZW50LmNvbXBsZXRlZCA9ICFjdXJyZW50RWxlbWVudC5jb21wbGV0ZWRcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvbGlzdFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmxpc3QpKVxuICAgIH1cblxuICAgIHJlbW92ZVRhc2soaWQpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlSXRlbUluZGV4ID0gdGhpcy5saXN0LmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKVxuICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKHJlbW92ZUl0ZW1JbmRleCwgMSlcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvbGlzdFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmxpc3QpKVxuICAgIH1cblxuICAgIHZhbGlkYXRlKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgRVJST1IuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3ItLXNob3cnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRVJST1IuY2xhc3NMaXN0LmFkZCgnZXJyb3ItLXNob3cnKVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IElURU1fQ0xBU1MgPSAnbGlzdF9faXRlbSdcbmV4cG9ydCBjb25zdCBUQVNLX0NMQVNTID0gJ3RvZG9saXN0X190YXNrLW5ldydcbmV4cG9ydCBjb25zdCBBRERfQ0xBU1MgPSAnYnV0dG9uLS1hZGQnXG5leHBvcnQgY29uc3QgRURJVF9DTEFTUyA9ICdidXR0b24tLWVkaXQnXG5leHBvcnQgY29uc3QgREVMRVRFX0NMQVNTID0gJ2J1dHRvbi0tZGVsJ1xuZXhwb3J0IGNvbnN0IE1BVEVSSUFMX0NMQVNTID0gJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnXG5leHBvcnQgY29uc3QgQVRUUklCVVRFX0lURU0gPSAndG9kby1pZCdcbmV4cG9ydCBjb25zdCBUT0RPX0NMQVNTID0gJ2FkZC10YXNrX19pbnB1dCdcblxuXG5leHBvcnQgY29uc3QgQlROX0FERCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0FERF9DTEFTU31gKVxuZXhwb3J0IGNvbnN0IExJU1QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpXG5leHBvcnQgY29uc3QgSU5QVVQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtUT0RPX0NMQVNTfWApXG5leHBvcnQgY29uc3QgRVJST1IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKVxuXG5leHBvcnQgY29uc3QgY29tcGxldGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tY29tcGxldGVkJylcbmV4cG9ydCBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1hY3RpdmUnKVxuZXhwb3J0IGNvbnN0IGFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tLWFsbCcpXG5cbiIsImltcG9ydCB7SVRFTV9DTEFTU30gZnJvbSBcIi4uL2NvbW1vbi9jb25zdGFudHMuanNcIlxuaW1wb3J0IEl0ZW0gZnJvbSBcIi4uL2NsYXNzZXMvSXRlbS5qc1wiXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U29ydFRhc2tzKGV2ZW50LCBpdGVtKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXJfX2J1dHRvbicpLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2J1dHRvbi0tZmlsdGVyLWFjdGl2ZScpKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtJVEVNX0NMQVNTfWApLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlbW92ZSgpKVxuICBjb25zdCBsaXN0Q2xhc3MgPSBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZVxuICAgIGNvbnNvbGUubG9nKGl0ZW0udG9kb2xpc3QpXG4gIHN3aXRjaCAobGlzdENsYXNzKSB7XG4gICAgY2FzZSAnZmlsdGVyX19idXR0b24gYnV0dG9uLS1hY3RpdmUnOlxuICAgICAgY29uc29sZS5sb2coaXRlbS50b2RvbGlzdClcblxuICAgICAgY29uc3QgY29tcGxldGVkQXJyID0gaXRlbS50b2RvbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvbXBsZXRlZCA9PT0gZmFsc2UpXG4gICAgICBjb21wbGV0ZWRBcnIuZm9yRWFjaChlbGVtZW50ID0+IGl0ZW0ucmVuZGVyaW5nVGFzayhlbGVtZW50KSlcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ZpbHRlcl9fYnV0dG9uIGJ1dHRvbi0tY29tcGxldGVkJzpcbiAgICAgIGNvbnN0IG5vdENvbXBsZXRlZEFyciA9IGl0ZW0udG9kb2xpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jb21wbGV0ZWQgPT09IHRydWUpXG4gICAgICBub3RDb21wbGV0ZWRBcnIuZm9yRWFjaChlbGVtZW50ID0+IGl0ZW0ucmVuZGVyaW5nVGFzayhlbGVtZW50KSlcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ZpbHRlcl9fYnV0dG9uIGJ1dHRvbi0tYWxsJzpcbiAgICAgIGl0ZW0udG9kb2xpc3QuZm9yRWFjaChlbGVtZW50ID0+IGl0ZW0ucmVuZGVyaW5nVGFzayhlbGVtZW50KSlcbiAgICAgIGJyZWFrO1xuICB9XG4gIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLS1maWx0ZXItYWN0aXZlJylcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7SU5QVVQsIEVSUk9SLCBCVE5fQURELCBjb21wbGV0ZWQsIElURU1fQ0xBU1MsIGFjdGl2ZSwgYWxsfSBmcm9tICcuL2NvbW1vbi9jb25zdGFudHMuanMnXG5pbXBvcnQgSXRlbSBmcm9tICcuL2NsYXNzZXMvSXRlbS5qcydcbmltcG9ydCBVSSBmcm9tICcuL2NsYXNzZXMvVUkuanMnXG5pbXBvcnQgZ2V0U29ydFRhc2tzIGZyb20gXCIuL3V0aWxzL3NvcnQuanNcIjtcbmltcG9ydCAnLi9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcydcbmltcG9ydCAnLi9hc3NldHMvc3R5bGVzL3N0eWxlLnNjc3MnXG5cbmltcG9ydCBiYWNrIGZyb20gJy4vYXNzZXRzL2ltYWdlcy9iYWNrLnN2ZydcbmltcG9ydCBjaGVjayBmcm9tICcuL2Fzc2V0cy9pbWFnZXMvY2hlY2suc3ZnJ1xuaW1wb3J0IHdhdGNoIGZyb20gJy4vYXNzZXRzL2ltYWdlcy93YXRjaC5zdmcnXG5pbXBvcnQgb2sgZnJvbSAnLi9hc3NldHMvaW1hZ2VzL25vdGljZS9vay5zdmcnXG5cbmNvbnN0IGl0ZW0gPSBuZXcgSXRlbSgpXG5jb25zdCB1aSA9IG5ldyBVSSgpXG5cbndpbmRvdy5vbmxvYWQgPSAoKT0+IHtcbiAgaXRlbS50b2RvbGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiBpdGVtLnJlbmRlcmluZ1Rhc2soZWxlbWVudCkpXG59XG5cbkJUTl9BREQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b0RvSGFuZGxlcilcbklOUFVULmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgIHRvRG9IYW5kbGVyKClcbiAgfVxufSlcblxuZnVuY3Rpb24gdG9Eb0hhbmRsZXIoKSB7XG4gIGNvbnN0IHZhbHVlSW5wdXQgPSBJTlBVVC52YWx1ZVxuICBpZiAodmFsdWVJbnB1dCAmJiAhaXRlbS50b2RvbGlzdC5zb21lKGkgPT4gaS50aXRsZSA9PT0gdmFsdWVJbnB1dCkpIHtcbiAgICBpdGVtLmFkZCh2YWx1ZUlucHV0KVxuICAgIGNvbnNvbGUubG9nKGl0ZW0udG9kb2xpc3QpXG4gICAgSU5QVVQudmFsdWUgPSAnJ1xuICAgIHVpLnZhbGlkYXRlKHRydWUpXG4gIH0gZWxzZSB7XG4gICAgdWkudmFsaWRhdGUoZmFsc2UpXG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcl9fYnV0dG9uJykuZm9yRWFjaChpID0+IGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICBnZXRTb3J0VGFza3MoZSwgaXRlbSlcbn0pKVxuXG5jb25zdCBoZWFkZXJBdXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYXV0aCcpXG5jb25zdCBtb2RhbEF1dGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYXV0aCcpXG5cbmhlYWRlckF1dGguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsQXV0aC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xufSlcblxuXG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWF1dGhfX292ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWF1dGgnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn0pXG5cblxuXG5cbmNvbnN0IHRhYnNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtYXV0aF9faXRlbScpXG5jb25zdCB0YWJzSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC1hdXRoX19mb3JtJylcblxuXG50YWJzQnRuLmZvckVhY2goY3VycmVudEJ0biA9PiB7XG4gIGN1cnJlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHRhYklkID0gY3VycmVudEJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJylcbiAgICBsZXQgY3VycmVudFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFiSWQpXG5cbiAgICBpZiAoISBjdXJyZW50QnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIHRhYnNCdG4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhdXRoLS1hY3RpdmUnKVxuICAgICAgfSlcbiAgICAgIHRhYnNJdGVtLmZvckVhY2goaXRlbT0+e1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLWF1dGgtLWFjdGl2ZScpXG4gICAgICB9KVxuICAgICAgY3VycmVudEJ0bi5jbGFzc0xpc3QuYWRkKCdhdXRoLS1hY3RpdmUnKVxuICAgICAgY3VycmVudFRhYi5jbGFzc0xpc3QuYWRkKCdtb2RhbC1hdXRoLS1hY3RpdmUnKVxuICAgIH1cbiAgfSlcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1hdXRoX19pdGVtJykuY2xpY2soKVxuXG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==