/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Item = /*#__PURE__*/function () {
  function Item() {
    _classCallCheck(this, Item);

    this.store = new _UI_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.todolist = this.store.list;
  }

  _createClass(Item, [{
    key: "renderingTask",
    value: function renderingTask(elem) {
      var _this = this;

      var item = document.createElement('div');
      var check = document.createElement('INPUT');
      var task = document.createElement('input');
      var edit = document.createElement('div');
      var del = document.createElement('div');
      var label = document.createElement('label'); // const checkAfterReload = elem.completed ? 'state--ready' : '1'

      var checkAfterReload = '1';

      if (elem.completed) {
        checkAfterReload = 'state--ready';
      }

      item.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS);
      task.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.TASK_CLASS, checkAfterReload);
      edit.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.MATERIAL_CLASS, _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.EDIT_CLASS);
      del.classList.add(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.MATERIAL_CLASS, _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.DELETE_CLASS);
      check.classList.add('todolist__state');
      label.classList.add('label');
      task.setAttribute('readonly', 'readonly');
      task.setAttribute('value', elem.title);
      task.setAttribute("readonly", "readonly");
      check.setAttribute('type', 'checkbox');
      check.setAttribute('id', elem.id);
      check.checked = elem.completed;
      item.setAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM, elem.id);
      label.setAttribute('for', elem.id);
      label.innerHTML = '';
      edit.innerHTML = 'edit';
      del.innerHTML = 'delete';
      _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.LIST.append(item);
      item.append(check, label, task, edit, del);
      edit.addEventListener('click', function (e) {
        return _this.update(e);
      });
      del.addEventListener('click', function (e) {
        return _this.remove(e);
      });
      check.addEventListener('change', function (e) {
        return _this.check(e);
      });
    }
  }, {
    key: "add",
    value: function add(value) {
      var task = this.store.addTask(value);
      this.renderingTask(task);
    }
  }, {
    key: "update",
    value: function update(event) {
      var currentElement = event.target;
      var parentItem = currentElement.parentNode;
      var taskField = parentItem.querySelector('.todolist__task-new');
      var index = parentItem.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM);

      if (currentElement.classList.contains('save')) {
        currentElement.classList.remove('save');
        currentElement.innerHTML = 'edit';

        if (this.todolist.findIndex(function (item) {
          return item.title === taskField.value;
        }) === -1 || this.todolist.find(function (item) {
          return item.id === index;
        }).title === taskField.value) {
          this.store.updateTask(taskField.value, index);
        } else {
          this.store.validate(false);
          var thisObj = this.todolist.find(function (item) {
            return item.id === index;
          });
          taskField.value = thisObj.title;
        }
      } else {
        document.querySelector('.modal').style.display = 'block';
        this.store.validate(true);
        currentElement.innerHTML = 'done';
        currentElement.classList.add('save');
      }
    }
  }, {
    key: "remove",
    value: function remove(event) {
      var removedItem = event.target.parentNode;
      var id = removedItem.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM); // const removeItemIndex = this.todolist.findIndex(item => item.id === id)
      // // this.todolist.splice(removeItemIndex, 1)

      this.store.removeTask(id);
      removedItem.remove();
    }
  }, {
    key: "check",
    value: function check(event) {
      var _this2 = this;

      var currentElement = event.target;
      var itemParent = currentElement.parentNode;
      var item = itemParent.querySelector(".".concat(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.TASK_CLASS));
      var id = itemParent.getAttribute(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ITEM);
      var element = this.todolist.find(function (elem) {
        return elem.id === id;
      });

      if (currentElement.checked) {
        element.completed = false;
        item.classList.add('state--ready');
        itemParent.querySelector(".button--edit").classList.add('edit--disable');
        itemParent.querySelector(".button--del").classList.add('remove--disable');
        var a = document.querySelector('.notice');
        a.classList.add('notice--active');
        document.querySelector('.notice__name').innerHTML = "<span> ".concat(element.title, " </span>");
        document.querySelector('.notice__button').addEventListener('click', function () {
          element.completed = true;
          item.classList.remove('state--ready');
          itemParent.querySelector(".button--edit").classList.remove('edit--disable');
          itemParent.querySelector(".button--del").classList.remove('remove--disable');
          currentElement.checked = false;
          a.classList.remove('notice--active');

          _this2.store.toggleTask(id);
        });
        setTimeout(function () {
          a.classList.remove('notice--active');
        }, 3000);
      } else {
        element.completed = true;
        item.classList.remove('state--ready');
        itemParent.querySelector(".button--edit").classList.remove('edit--disable');
        itemParent.querySelector(".button--del").classList.remove('remove--disable');
      }

      this.store.toggleTask(id);
    }
  }]);

  return Item;
}();



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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);

    this.list = JSON.parse(localStorage.getItem("todolist")) || [];
  }

  _createClass(UI, [{
    key: "addTask",
    value: function addTask(title) {
      var lastId = this.list.length > 0 ? Number(this.list[this.list.length - 1].id) + 1 : 0;
      this.list.push({
        id: lastId.toString(),
        title: title,
        completed: false,
        est: ""
      });
      localStorage.setItem("todolist", JSON.stringify(this.list));
      return this.list[this.list.length - 1];
    }
  }, {
    key: "updateTask",
    value: function updateTask(title, index) {
      var thisObj = this.list.find(function (item) {
        return item.id === index;
      });
      thisObj.title = title;
      localStorage.setItem("todolist", JSON.stringify(this.list));
    }
  }, {
    key: "toggleTask",
    value: function toggleTask(id) {
      var currentElement = this.list.find(function (elem) {
        return elem.id === id;
      });
      currentElement.completed = !currentElement.completed;
      localStorage.setItem("todolist", JSON.stringify(this.list));
    }
  }, {
    key: "removeTask",
    value: function removeTask(id) {
      var removeItemIndex = this.list.findIndex(function (item) {
        return item.id === id;
      });
      this.list.splice(removeItemIndex, 1);
      localStorage.setItem("todolist", JSON.stringify(this.list));
    }
  }, {
    key: "validate",
    value: function validate(error) {
      if (error) {
        _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR.classList.remove('error--show');
      } else {
        _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR.classList.add('error--show');
      }
    }
  }]);

  return UI;
}();



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
var ITEM_CLASS = 'list__item';
var TASK_CLASS = 'todolist__task-new';
var ADD_CLASS = 'button--add';
var EDIT_CLASS = 'button--edit';
var DELETE_CLASS = 'button--del';
var MATERIAL_CLASS = 'material-symbols-outlined';
var ATTRIBUTE_ITEM = 'todo-id';
var TODO_CLASS = 'add-task__input';
var BTN_ADD = document.querySelector(".".concat(ADD_CLASS));
var LIST = document.querySelector('.list');
var INPUT = document.querySelector(".".concat(TODO_CLASS));
var ERROR = document.querySelector('.error');
var completed = document.querySelector('.button--completed');
var active = document.querySelector('.button--active');
var all = document.querySelector('.button--all');

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


var item = new _classes_Item_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
function getSortTasks(event) {
  document.querySelectorAll('.filter__button').forEach(function (item) {
    return item.classList.remove('button--filter-active');
  });
  document.querySelectorAll(".".concat(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS)).forEach(function (item) {
    return item.remove();
  });
  var listClass = event.currentTarget.className;
  console.log(item.todolist);

  switch (listClass) {
    case 'filter__button button--active':
      console.log(item.todolist);
      var completedArr = item.todolist.filter(function (item) {
        return item.completed === false;
      });
      completedArr.forEach(function (element) {
        return item.renderingTask(element);
      });
      break;

    case 'filter__button button--completed':
      var notCompletedArr = item.todolist.filter(function (item) {
        return item.completed === true;
      });
      notCompletedArr.forEach(function (element) {
        return item.renderingTask(element);
      });
      break;

    case 'filter__button button--all':
      item.todolist.forEach(function (element) {
        return item.renderingTask(element);
      });
      break;
  }

  event.currentTarget.classList.add('button--filter-active');
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/styles/inter.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/styles/inter.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/inter/Inter-Regular.ttf */ "./src/assets/fonts/inter/Inter-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: \"Inter\";\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n    font-style: normal;\n    font-weight: normal;\n}", "",{"version":3,"sources":["webpack://./src/assets/styles/inter.css"],"names":[],"mappings":"AAAA;IACI,oBAAoB;IACpB,+DAA+D;IAC/D,kBAAkB;IAClB,mBAAmB;AACvB","sourcesContent":["@font-face {\n    font-family: \"Inter\";\n    src: url(\"../fonts/inter/Inter-Regular.ttf\") format(\"truetype\");\n    font-style: normal;\n    font-weight: normal;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/styles/style.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/styles/style.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_inter_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./inter.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/styles/inter.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_inter_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*nulling*/\n\n*,\n*::before,\n*::after {\n    outline: none;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n}\n\na {\n    text-decoration: none;\n}\n\nul,\nol,\nli {\n    list-style: none;\n}\n\nhtml {\n    height: 100%;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100%;\n    font-family: 'Inter', sans-serif;\n    min-width: 320px;\n    margin: 0;\n    padding: 0;\n    font-size: 16px;\n    line-height: 30px;\n    background-color: #fff;\n    font-weight: 400;\n}\n\nli {\n    list-style: none;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font-weight: inherit;\n    font-size: inherit;\n}\n\n/*common*/\n\n.wrapper {\n    min-height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.main {\n    flex: 1 1 auto;\n}\n\n.container {\n    max-width: 1040px;\n    width: 100%;\n    margin: 0 auto;\n    padding: 0 20px;\n}\n\n/*header*/\n\n.header {\n    padding: 23px 0;\n    box-shadow: inset 0 -1px 0 #F0F0F0;\n    margin-bottom: 60px;\n}\n\n.header > .container {\n    max-width: 1840px;\n}\n\n.header__wrapper {\n    display: flex;\n    justify-content: space-between;\n}\n\n.header__logo {\n\n}\n\n.header__auth {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #464646;\n    cursor: pointer;\n}\n\n.header__link {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 500;\n    font-size: 24px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #464646;\n}\n\n/*main*/\n\n.main__wrapper {\n    display: flex;\n    flex-direction: column;\n}\n\n/*notice*/\n\n.notice {\n    display: none;\n    flex-direction: column;\n    justify-content: center;\n    padding: 16px 26px;\n    background: #F6FFED;\n    border: 1px solid #B7EB8F;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px;\n    position: fixed;\n    top: 80px;\n    right: 20px;\n}\n\n.notice--active {\n    display: flex;\n}\n\n.notice__button {\n    cursor: pointer;\n}\n\n.search {\n    cursor: pointer;\n}\n\n.search--active {\n    color: red;\n}\n\n\n\n/*filter*/\n\n.filter {\n    display: flex;\n    margin-bottom: 20px;\n}\n\n.filter__button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.016);\n    border-radius: 2px;\n    padding: 2px 8px;\n    margin-right: 20px;\n    cursor: pointer;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    text-align: center;\n}\n\n.filter__button:hover {\n    border: 1px solid #1859FF;\n    color: #1859FF;\n}\n\n.button--filter-active {\n    border: 1px solid #1859FF;\n    color: #1859FF;\n}\n\n/*add task*/\n\n.add-task {\n    display: flex;\n    width: 100%;\n    max-width: 1000px;\n    margin-bottom: 40px;\n}\n\n.add-task__input {\n    flex: 1 1;\n    padding: 8px 12px;\n\n    background-color: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px 0 0 2px;\n\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #464646;\n}\n\ninput#input__new-task:focus {\n    border: 1px solid #1859FF;\n}\n\ninput#input__new-task::placeholder {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #B4BAC4;\n}\n\n.add-task__button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 8px 16px 8px 22px;\n\n    cursor: pointer;\n    background-color: #1859FF;\n\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #FFFFFF;\n}\n\n.todolist__button:hover {\n    background-color: #455;\n}\n\n/*list task*/\n.list {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n}\n\n.list__item {\n    display: flex;\n    align-items: center;\n    padding: 20px 16px;\n    width: 100%;\n    max-width: 1000px;\n    margin-bottom: 10px;\n\n    background-color: #FFFFFF;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px;\n}\n\n.todolist__task-new {\n    margin-right: 27px;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #464646;\n    width: 100%;\n}\n\n.button-edit {\n    margin-right: 22px;\n}\n\n.todolist__state {\n    display: none;\n    margin-right: 24px;\n}\n\n.todolist__state + .label {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 18px;\n    height: 16px;\n    background: #FFFFFF;\n    border-radius: 2px;\n    border: 1px solid #DBE0E9;\n    margin-right: 24px;\n}\n\n.todolist__state:checked + label {\n    background: #a3bdff;\n}\n\n.button--edit,\n.button--del {\n    cursor: pointer;\n}\n\n.button--del {\n    color: #D60103;\n}\n\n.button--edit {\n    margin-right: 22px;\n}\n\n/*error*/\n\n.error {\n    color: #f00;\n    display: none;\n}\n\n.error--show {\n    display: block;\n}\n\n.state--ready {\n    color: #464646;\n    text-decoration: line-through;\n}\n\n/*footer*/\n\n.footer {\n    padding: 23px 0;\n    background: #F0F0F0;\n    box-shadow: inset 0 -1px 0 #F0F0F0;\n}\n\n.footer__wrapper {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.footer__logo {\n\n}\n\n.footer__link {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 24px;\n    color: #606060;\n}\n\n.edit--disable {\n    color: #606060;\n    pointer-events: none;\n}\n\n.remove--disable {\n    color: #ef999a;\n}\n\n/*auth*/\n/*.modal-auth {*/\n/*    display: none;*/\n/*    position: fixed;*/\n/*    z-index: 3;*/\n/*    top: 0;*/\n/*    left: 0;*/\n/*    bottom: 0;*/\n/*    right: 0;*/\n/*    width: 100%;*/\n/*    height: 100%;*/\n/*    overflow: auto;*/\n/*}*/\n\n/*modal*/\n\n.modal {\n    display: none;\n    position: fixed;\n    z-index: 3;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n}\n\n.modal__overlay {\n    background-color: rgba(0, 0, 0, 0.4);\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 1;\n}\n\n/*modal-search*/\n\n.modal-search__content {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-content: center;\n    padding: 5px;\n    max-width: 300px;\n    width: 100%;\n    position: absolute;\n    top: 5%;\n    right: 20px;\n    z-index: 2;\n    background-color: #ffffff;\n}\n\n.modal-search__close {\n    cursor: pointer;\n    align-self: flex-start;\n}\n\n.modal-search__title {\n    align-self: flex-end;\n    width: 80%;\n    margin-bottom: 15px;\n}\n\n.modal-search__input {\n    align-self: flex-end;\n    box-shadow: 1px 1px 4px rgb(0 0 0 / 10%);\n    border-radius: 2px 0 0 2px;\n    padding: 4px 6px;\n    border: 1px solid #000000;\n    margin-bottom: 30px;\n    width: 80%;\n}\n\n\n/*modal-edit*/\n.save {\n    color: #B7EB8F;\n}\n\n.modal--active {\n    display: block;\n}\n\n/*modal-auth*/\n\n.modal-auth__content {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 60px;\n    background: #FFFFFF;\n    width: 100%;\n    position: absolute;\n    max-width: 580px;\n    top: 50%;\n    transform: translateY(-50%);\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    z-index: 2;\n}\n\n.modal-auth__title {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 38px;\n    letter-spacing: 0.005em;\n    color: #464646;\n    margin-bottom: 12px;\n}\n\n.modal-auth__desc {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #606060;\n    margin-bottom: 34px;\n}\n\n.modal-auth__list {\n    display: flex;\n    cursor: pointer;\n    margin-bottom: 34px;\n    position: relative;\n}\n\n.modal-auth__list:before {\n    content: '';\n    display: block;\n    height: 2px;\n    background: #F0F2F6;\n    position: absolute;\n    width: 100%;\n    top: 92%;\n    z-index: 1;\n}\n\n\n.modal-auth__item {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #606060;\n    margin-right: 32.5px;\n    border-bottom: 2px solid transparent;\n    z-index: 2;\n}\n\n.modal-auth__wrapper {\n    display: flex;\n    flex-direction: column;\n    max-width: 368px;\n    width: 100%;\n    margin: 0 auto;\n}\n\n.modal-auth__button {\n    display: flex;\n    padding: 8px 160px;\n    background: #1859FF;\n    border-radius: 2px;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    text-align: center;\n    color: #FFFFFF;\n    cursor: pointer;\n}\n\n.modal-auth__input {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #B4BAC4;\n    padding: 8px 12px;\n    max-width: 368px;\n    width: 100%;\n    background: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    border-radius: 2px;\n}\n\n.modal-auth__overlay {\n    background-color: rgba(0, 0, 0, 0.4);\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 1;\n}\n\n.login {\n    margin-bottom: 28px;\n}\n\n.password {\n    margin-bottom: 60px;\n}\n\n.auth--active {\n    color: #1859FF;\n    border-bottom: 2px solid #1859FF;\n}\n\n\n\n\n\n\n\n\n", "",{"version":3,"sources":["webpack://./src/assets/styles/style.css"],"names":[],"mappings":"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","sourcesContent":["@import 'inter.css';\n\n/*nulling*/\n\n*,\n*::before,\n*::after {\n    outline: none;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0;\n}\n\na {\n    text-decoration: none;\n}\n\nul,\nol,\nli {\n    list-style: none;\n}\n\nhtml {\n    height: 100%;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100%;\n    font-family: 'Inter', sans-serif;\n    min-width: 320px;\n    margin: 0;\n    padding: 0;\n    font-size: 16px;\n    line-height: 30px;\n    background-color: #fff;\n    font-weight: 400;\n}\n\nli {\n    list-style: none;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font-weight: inherit;\n    font-size: inherit;\n}\n\n/*common*/\n\n.wrapper {\n    min-height: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.main {\n    flex: 1 1 auto;\n}\n\n.container {\n    max-width: 1040px;\n    width: 100%;\n    margin: 0 auto;\n    padding: 0 20px;\n}\n\n/*header*/\n\n.header {\n    padding: 23px 0;\n    box-shadow: inset 0 -1px 0 #F0F0F0;\n    margin-bottom: 60px;\n}\n\n.header > .container {\n    max-width: 1840px;\n}\n\n.header__wrapper {\n    display: flex;\n    justify-content: space-between;\n}\n\n.header__logo {\n\n}\n\n.header__auth {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #464646;\n    cursor: pointer;\n}\n\n.header__link {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 500;\n    font-size: 24px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #464646;\n}\n\n/*main*/\n\n.main__wrapper {\n    display: flex;\n    flex-direction: column;\n}\n\n/*notice*/\n\n.notice {\n    display: none;\n    flex-direction: column;\n    justify-content: center;\n    padding: 16px 26px;\n    background: #F6FFED;\n    border: 1px solid #B7EB8F;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px;\n    position: fixed;\n    top: 80px;\n    right: 20px;\n}\n\n.notice--active {\n    display: flex;\n}\n\n.notice__button {\n    cursor: pointer;\n}\n\n.search {\n    cursor: pointer;\n}\n\n.search--active {\n    color: red;\n}\n\n\n\n/*filter*/\n\n.filter {\n    display: flex;\n    margin-bottom: 20px;\n}\n\n.filter__button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.016);\n    border-radius: 2px;\n    padding: 2px 8px;\n    margin-right: 20px;\n    cursor: pointer;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    text-align: center;\n}\n\n.filter__button:hover {\n    border: 1px solid #1859FF;\n    color: #1859FF;\n}\n\n.button--filter-active {\n    border: 1px solid #1859FF;\n    color: #1859FF;\n}\n\n/*add task*/\n\n.add-task {\n    display: flex;\n    width: 100%;\n    max-width: 1000px;\n    margin-bottom: 40px;\n}\n\n.add-task__input {\n    flex: 1 1;\n    padding: 8px 12px;\n\n    background-color: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px 0 0 2px;\n\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #464646;\n}\n\ninput#input__new-task:focus {\n    border: 1px solid #1859FF;\n}\n\ninput#input__new-task::placeholder {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    display: flex;\n    align-items: center;\n    color: #B4BAC4;\n}\n\n.add-task__button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 8px 16px 8px 22px;\n\n    cursor: pointer;\n    background-color: #1859FF;\n\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #FFFFFF;\n}\n\n.todolist__button:hover {\n    background-color: #455;\n}\n\n/*list task*/\n.list {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n}\n\n.list__item {\n    display: flex;\n    align-items: center;\n    padding: 20px 16px;\n    width: 100%;\n    max-width: 1000px;\n    margin-bottom: 10px;\n\n    background-color: #FFFFFF;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);\n    border-radius: 2px;\n}\n\n.todolist__task-new {\n    margin-right: 27px;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #464646;\n    width: 100%;\n}\n\n.button-edit {\n    margin-right: 22px;\n}\n\n.todolist__state {\n    display: none;\n    margin-right: 24px;\n}\n\n.todolist__state + .label {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 18px;\n    height: 16px;\n    background: #FFFFFF;\n    border-radius: 2px;\n    border: 1px solid #DBE0E9;\n    margin-right: 24px;\n}\n\n.todolist__state:checked + label {\n    background: #a3bdff;\n}\n\n.button--edit,\n.button--del {\n    cursor: pointer;\n}\n\n.button--del {\n    color: #D60103;\n}\n\n.button--edit {\n    margin-right: 22px;\n}\n\n/*error*/\n\n.error {\n    color: #f00;\n    display: none;\n}\n\n.error--show {\n    display: block;\n}\n\n.state--ready {\n    color: #464646;\n    text-decoration: line-through;\n}\n\n/*footer*/\n\n.footer {\n    padding: 23px 0;\n    background: #F0F0F0;\n    box-shadow: inset 0 -1px 0 #F0F0F0;\n}\n\n.footer__wrapper {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.footer__logo {\n\n}\n\n.footer__link {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 24px;\n    color: #606060;\n}\n\n.edit--disable {\n    color: #606060;\n    pointer-events: none;\n}\n\n.remove--disable {\n    color: #ef999a;\n}\n\n/*auth*/\n/*.modal-auth {*/\n/*    display: none;*/\n/*    position: fixed;*/\n/*    z-index: 3;*/\n/*    top: 0;*/\n/*    left: 0;*/\n/*    bottom: 0;*/\n/*    right: 0;*/\n/*    width: 100%;*/\n/*    height: 100%;*/\n/*    overflow: auto;*/\n/*}*/\n\n/*modal*/\n\n.modal {\n    display: none;\n    position: fixed;\n    z-index: 3;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n}\n\n.modal__overlay {\n    background-color: rgba(0, 0, 0, 0.4);\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 1;\n}\n\n/*modal-search*/\n\n.modal-search__content {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-content: center;\n    padding: 5px;\n    max-width: 300px;\n    width: 100%;\n    position: absolute;\n    top: 5%;\n    right: 20px;\n    z-index: 2;\n    background-color: #ffffff;\n}\n\n.modal-search__close {\n    cursor: pointer;\n    align-self: flex-start;\n}\n\n.modal-search__title {\n    align-self: flex-end;\n    width: 80%;\n    margin-bottom: 15px;\n}\n\n.modal-search__input {\n    align-self: flex-end;\n    box-shadow: 1px 1px 4px rgb(0 0 0 / 10%);\n    border-radius: 2px 0 0 2px;\n    padding: 4px 6px;\n    border: 1px solid #000000;\n    margin-bottom: 30px;\n    width: 80%;\n}\n\n\n/*modal-edit*/\n.save {\n    color: #B7EB8F;\n}\n\n.modal--active {\n    display: block;\n}\n\n/*modal-auth*/\n\n.modal-auth__content {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 60px;\n    background: #FFFFFF;\n    width: 100%;\n    position: absolute;\n    max-width: 580px;\n    top: 50%;\n    transform: translateY(-50%);\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    z-index: 2;\n}\n\n.modal-auth__title {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 38px;\n    letter-spacing: 0.005em;\n    color: #464646;\n    margin-bottom: 12px;\n}\n\n.modal-auth__desc {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #606060;\n    margin-bottom: 34px;\n}\n\n.modal-auth__list {\n    display: flex;\n    cursor: pointer;\n    margin-bottom: 34px;\n    position: relative;\n}\n\n.modal-auth__list:before {\n    content: '';\n    display: block;\n    height: 2px;\n    background: #F0F2F6;\n    position: absolute;\n    width: 100%;\n    top: 92%;\n    z-index: 1;\n}\n\n\n.modal-auth__item {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #606060;\n    margin-right: 32.5px;\n    border-bottom: 2px solid transparent;\n    z-index: 2;\n}\n\n.modal-auth__wrapper {\n    display: flex;\n    flex-direction: column;\n    max-width: 368px;\n    width: 100%;\n    margin: 0 auto;\n}\n\n.modal-auth__button {\n    display: flex;\n    padding: 8px 160px;\n    background: #1859FF;\n    border-radius: 2px;\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    text-align: center;\n    color: #FFFFFF;\n    cursor: pointer;\n}\n\n.modal-auth__input {\n    font-family: 'Inter', sans-serif;\n    font-style: normal;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 24px;\n    color: #B4BAC4;\n    padding: 8px 12px;\n    max-width: 368px;\n    width: 100%;\n    background: #FFFFFF;\n    border: 1px solid #DBE0E9;\n    border-radius: 2px;\n}\n\n.modal-auth__overlay {\n    background-color: rgba(0, 0, 0, 0.4);\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    z-index: 1;\n}\n\n.login {\n    margin-bottom: 28px;\n}\n\n.password {\n    margin-bottom: 60px;\n}\n\n.auth--active {\n    color: #1859FF;\n    border-bottom: 2px solid #1859FF;\n}\n\n\n\n\n\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/styles/style.css":
/*!*************************************!*\
  !*** ./src/assets/styles/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/inter/Inter-Regular.ttf":
/*!**************************************************!*\
  !*** ./src/assets/fonts/inter/Inter-Regular.ttf ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0b1ca2e75a4cbf1762fa.ttf";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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





var item = new _classes_Item_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
var ui = new _classes_UI_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

window.onload = function () {
  item.todolist.forEach(function (element) {
    return item.renderingTask(element);
  });
};

_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.BTN_ADD.addEventListener('click', toDoHandler);
_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    toDoHandler();
  }
});

function toDoHandler() {
  var valueInput = _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.value;

  if (valueInput && !item.todolist.some(function (i) {
    return i.title === valueInput;
  })) {
    item.add(valueInput);
    console.log(item.todolist);
    _common_constants_js__WEBPACK_IMPORTED_MODULE_0__.INPUT.value = '';
    ui.validate(true);
  } else {
    ui.validate(false);
  }
}

document.querySelectorAll('.filter__button').forEach(function (item) {
  return item.addEventListener('click', function (e) {
    (0,_utils_sort_js__WEBPACK_IMPORTED_MODULE_3__["default"])(e);
  });
});
var modal = document.querySelector('.modal');
var modalInput = document.querySelector('.modal__input');
var search = document.querySelector('.search');
search.addEventListener('click', function () {
  if (search.classList.contains('search--active')) {
    search.classList.remove('search--active');
    document.querySelectorAll('.filter__button').forEach(function (item) {
      return item.classList.remove('button--filter-active');
    });
    document.querySelectorAll(".".concat(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS)).forEach(function (item) {
      return item.remove();
    });
    item.todolist.forEach(function (element) {
      return item.renderingTask(element);
    });
  } else {
    modal.style.display = 'block';
  }
});

function getSearchElement() {
  document.querySelectorAll('.filter__button').forEach(function (item) {
    return item.classList.remove('button--filter-active');
  });
  document.querySelectorAll(".".concat(_common_constants_js__WEBPACK_IMPORTED_MODULE_0__.ITEM_CLASS)).forEach(function (item) {
    return item.remove();
  });
  var completedArr = item.todolist.filter(function (item) {
    return item.title === modalInput.value;
  });
  completedArr.forEach(function (element) {
    return item.renderingTask(element);
  });
  search.classList.add('search--active');
}

var funcInner = debounce(getSearchElement, 300);

function debounce(fn, time) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time);
  };
}

modalInput.oninput = funcInner;
document.querySelector('.modal__close').addEventListener('click', function () {
  modal.style.display = "none";
});
document.querySelector('.modal__overlay').addEventListener('click', function () {
  modal.style.display = "none";
});
document.querySelector('.header__auth').addEventListener('click', function () {
  document.querySelector('.modal-auth').style.display = 'block';
});
document.querySelectorAll('.modal-auth__item').forEach(function (item) {
  item.addEventListener('click', function (e) {
    document.querySelectorAll('.modal-auth__item').forEach(function (item) {
      item.classList.remove('auth--active');
    });
    item.classList.add('auth--active');
  });
});
document.querySelector('.modal-auth__overlay').addEventListener('click', function () {
  document.querySelector('.modal-auth').style.display = "none";
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFFBQVEsV0FBVyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxXQUFXLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxXQUFXLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxVQUFVLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxjQUFjLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFlBQVksV0FBVyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxXQUFXLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxVQUFVLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLFdBQVcsS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZ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Y2s6Ly90b2RvbGlzdC8uL3NyYy9jbGFzc2VzL1VJLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2NvbW1vbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXRpbHMvc29ydC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9hc3NldHMvc3R5bGVzL2ludGVyLmNzcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9hc3NldHMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3M/YmM0NiIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBVFRSSUJVVEVfSVRFTSxcbiAgICBJVEVNX0NMQVNTLFxuICAgIExJU1QsXG4gICAgTUFURVJJQUxfQ0xBU1MsXG4gICAgVEFTS19DTEFTUyxcbiAgICBFRElUX0NMQVNTLFxuICAgIERFTEVURV9DTEFTU1xufSBmcm9tIFwiLi4vY29tbW9uL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuL1VJLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBuZXcgVUkoKVxuICAgICAgICB0aGlzLnRvZG9saXN0ID0gdGhpcy5zdG9yZS5saXN0XG4gICAgfVxuXG4gICAgcmVuZGVyaW5nVGFzayhlbGVtKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJylcbiAgICAgICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuXG4gICAgICAgIC8vIGNvbnN0IGNoZWNrQWZ0ZXJSZWxvYWQgPSBlbGVtLmNvbXBsZXRlZCA/ICdzdGF0ZS0tcmVhZHknIDogJzEnXG4gICAgICAgIGxldCBjaGVja0FmdGVyUmVsb2FkID0gJzEnXG5cbiAgICAgICAgaWYgKGVsZW0uY29tcGxldGVkKSB7XG4gICAgICAgICAgICBjaGVja0FmdGVyUmVsb2FkID0gJ3N0YXRlLS1yZWFkeSdcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChJVEVNX0NMQVNTKVxuICAgICAgICB0YXNrLmNsYXNzTGlzdC5hZGQoVEFTS19DTEFTUywgY2hlY2tBZnRlclJlbG9hZClcbiAgICAgICAgZWRpdC5jbGFzc0xpc3QuYWRkKE1BVEVSSUFMX0NMQVNTLCBFRElUX0NMQVNTKVxuICAgICAgICBkZWwuY2xhc3NMaXN0LmFkZChNQVRFUklBTF9DTEFTUywgREVMRVRFX0NMQVNTKVxuICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKCd0b2RvbGlzdF9fc3RhdGUnKVxuICAgICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKCdsYWJlbCcpXG5cblxuICAgICAgICB0YXNrLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAncmVhZG9ubHknKVxuICAgICAgICB0YXNrLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBlbGVtLnRpdGxlKVxuICAgICAgICB0YXNrLnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIilcbiAgICAgICAgY2hlY2suc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94JylcbiAgICAgICAgY2hlY2suc2V0QXR0cmlidXRlKCdpZCcsIGVsZW0uaWQpXG4gICAgICAgIGNoZWNrLmNoZWNrZWQgPSBlbGVtLmNvbXBsZXRlZFxuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfSVRFTSwgZWxlbS5pZClcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBlbGVtLmlkKVxuXG4gICAgICAgIGxhYmVsLmlubmVySFRNTCA9ICcnXG4gICAgICAgIGVkaXQuaW5uZXJIVE1MID0gJ2VkaXQnXG4gICAgICAgIGRlbC5pbm5lckhUTUwgPSAnZGVsZXRlJ1xuXG4gICAgICAgIExJU1QuYXBwZW5kKGl0ZW0pXG4gICAgICAgIGl0ZW0uYXBwZW5kKGNoZWNrLCBsYWJlbCwgdGFzaywgZWRpdCwgZGVsIClcblxuICAgICAgICBlZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMudXBkYXRlKGUpKVxuICAgICAgICBkZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5yZW1vdmUoZSkpXG4gICAgICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB0aGlzLmNoZWNrKGUpKVxuICAgIH1cblxuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB0YXNrID0gdGhpcy5zdG9yZS5hZGRUYXNrKHZhbHVlKVxuICAgICAgICB0aGlzLnJlbmRlcmluZ1Rhc2sodGFzaylcbiAgICB9XG5cbiAgICB1cGRhdGUoZXZlbnQpIHtcblxuICAgICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldFxuICAgICAgICBjb25zdCBwYXJlbnRJdGVtID0gY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZVxuICAgICAgICBjb25zdCB0YXNrRmllbGQgPSBwYXJlbnRJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvbGlzdF9fdGFzay1uZXcnKVxuICAgICAgICBjb25zdCBpbmRleCA9IHBhcmVudEl0ZW0uZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9JVEVNKVxuICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzYXZlJykpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NhdmUnKVxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuaW5uZXJIVE1MID0gJ2VkaXQnXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRvZG9saXN0LmZpbmRJbmRleChpdGVtID0+IGl0ZW0udGl0bGUgPT09IHRhc2tGaWVsZC52YWx1ZSkgPT09IC0xIHx8IHRoaXMudG9kb2xpc3QuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGluZGV4KS50aXRsZSA9PT0gdGFza0ZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVUYXNrKHRhc2tGaWVsZC52YWx1ZSwgaW5kZXgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUudmFsaWRhdGUoZmFsc2UpXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXMudG9kb2xpc3QuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGluZGV4KVxuICAgICAgICAgICAgICAgIHRhc2tGaWVsZC52YWx1ZSA9IHRoaXNPYmoudGl0bGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIHRoaXMuc3RvcmUudmFsaWRhdGUodHJ1ZSlcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmlubmVySFRNTCA9ICdkb25lJ1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2F2ZScpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZEl0ZW0gPSBldmVudC50YXJnZXQucGFyZW50Tm9kZVxuICAgICAgICBjb25zdCBpZCA9IHJlbW92ZWRJdGVtLmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfSVRFTSlcbiAgICAgICAgLy8gY29uc3QgcmVtb3ZlSXRlbUluZGV4ID0gdGhpcy50b2RvbGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBpZClcbiAgICAgICAgLy8gLy8gdGhpcy50b2RvbGlzdC5zcGxpY2UocmVtb3ZlSXRlbUluZGV4LCAxKVxuICAgICAgICB0aGlzLnN0b3JlLnJlbW92ZVRhc2soaWQpXG4gICAgICAgIHJlbW92ZWRJdGVtLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgY2hlY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSBldmVudC50YXJnZXRcbiAgICAgICAgY29uc3QgaXRlbVBhcmVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudE5vZGVcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLiR7VEFTS19DTEFTU31gKVxuICAgICAgICBjb25zdCBpZCA9IGl0ZW1QYXJlbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9JVEVNKVxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy50b2RvbGlzdC5maW5kKGVsZW0gPT4gZWxlbS5pZCA9PT0gaWQpXG4gICAgICAgIGlmIChjdXJyZW50RWxlbWVudC5jaGVja2VkKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3N0YXRlLS1yZWFkeScpXG4gICAgICAgICAgICBpdGVtUGFyZW50LnF1ZXJ5U2VsZWN0b3IoYC5idXR0b24tLWVkaXRgKS5jbGFzc0xpc3QuYWRkKCdlZGl0LS1kaXNhYmxlJylcbiAgICAgICAgICAgIGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLmJ1dHRvbi0tZGVsYCkuY2xhc3NMaXN0LmFkZCgncmVtb3ZlLS1kaXNhYmxlJylcbiAgICAgICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWNlJylcbiAgICAgICAgICAgIGEuY2xhc3NMaXN0LmFkZCgnbm90aWNlLS1hY3RpdmUnKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGljZV9fbmFtZScpLmlubmVySFRNTCA9IGA8c3Bhbj4gJHtlbGVtZW50LnRpdGxlfSA8L3NwYW4+YFxuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWNlX19idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGF0ZS0tcmVhZHknKVxuICAgICAgICAgICAgICAgIGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLmJ1dHRvbi0tZWRpdGApLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtLWRpc2FibGUnKVxuICAgICAgICAgICAgICAgIGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLmJ1dHRvbi0tZGVsYCkuY2xhc3NMaXN0LnJlbW92ZSgncmVtb3ZlLS1kaXNhYmxlJylcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgICBhLmNsYXNzTGlzdC5yZW1vdmUoJ25vdGljZS0tYWN0aXZlJylcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLnRvZ2dsZVRhc2soaWQpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGEuY2xhc3NMaXN0LnJlbW92ZSgnbm90aWNlLS1hY3RpdmUnKVxuXG4gICAgICAgICAgICB9LCAzMDAwKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3RhdGUtLXJlYWR5JylcbiAgICAgICAgICAgIGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcihgLmJ1dHRvbi0tZWRpdGApLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtLWRpc2FibGUnKVxuICAgICAgICAgICAgaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKGAuYnV0dG9uLS1kZWxgKS5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtLWRpc2FibGUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmUudG9nZ2xlVGFzayhpZClcbiAgICB9XG59XG4iLCJpbXBvcnQge0VSUk9SfSBmcm9tIFwiLi4vY29tbW9uL2NvbnN0YW50cy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvbGlzdFwiKSkgfHwgW11cbiAgICB9XG5cbiAgICAgYWRkVGFzayh0aXRsZSkge1xuICAgICAgICBjb25zdCBsYXN0SWQgPSB0aGlzLmxpc3QubGVuZ3RoID4gMCA/IE51bWJlcih0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aCAtIDFdLmlkKSArIDEgOiAwXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKHtpZDogbGFzdElkLnRvU3RyaW5nKCksIHRpdGxlLCBjb21wbGV0ZWQ6IGZhbHNlLCBlc3Q6IFwiXCJ9KVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG9saXN0XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdCkpXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aCAtIDFdXG4gICAgfVxuXG4gICAgdXBkYXRlVGFzayh0aXRsZSwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXMubGlzdC5maW5kKGl0ZW09Pml0ZW0uaWQgPT09IGluZGV4KVxuICAgICAgICB0aGlzT2JqLnRpdGxlID0gdGl0bGVcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvbGlzdFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmxpc3QpKVxuICAgIH1cblxuICAgIHRvZ2dsZVRhc2soaWQpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSB0aGlzLmxpc3QuZmluZChlbGVtID0+IGVsZW0uaWQgPT09IGlkKVxuICAgICAgICBjdXJyZW50RWxlbWVudC5jb21wbGV0ZWQgPSAhY3VycmVudEVsZW1lbnQuY29tcGxldGVkXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0KSlcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZUl0ZW1JbmRleCA9IHRoaXMubGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBpZClcbiAgICAgICAgdGhpcy5saXN0LnNwbGljZShyZW1vdmVJdGVtSW5kZXgsIDEpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0KSlcbiAgICB9XG5cbiAgICB2YWxpZGF0ZShlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIEVSUk9SLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yLS1zaG93JylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVSUk9SLmNsYXNzTGlzdC5hZGQoJ2Vycm9yLS1zaG93JylcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBJVEVNX0NMQVNTID0gJ2xpc3RfX2l0ZW0nXG5leHBvcnQgY29uc3QgVEFTS19DTEFTUyA9ICd0b2RvbGlzdF9fdGFzay1uZXcnXG5leHBvcnQgY29uc3QgQUREX0NMQVNTID0gJ2J1dHRvbi0tYWRkJ1xuZXhwb3J0IGNvbnN0IEVESVRfQ0xBU1MgPSAnYnV0dG9uLS1lZGl0J1xuZXhwb3J0IGNvbnN0IERFTEVURV9DTEFTUyA9ICdidXR0b24tLWRlbCdcbmV4cG9ydCBjb25zdCBNQVRFUklBTF9DTEFTUyA9ICdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJ1xuZXhwb3J0IGNvbnN0IEFUVFJJQlVURV9JVEVNID0gJ3RvZG8taWQnXG5leHBvcnQgY29uc3QgVE9ET19DTEFTUyA9ICdhZGQtdGFza19faW5wdXQnXG5cblxuZXhwb3J0IGNvbnN0IEJUTl9BREQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtBRERfQ0xBU1N9YClcbmV4cG9ydCBjb25zdCBMSVNUID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKVxuZXhwb3J0IGNvbnN0IElOUFVUID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7VE9ET19DTEFTU31gKVxuZXhwb3J0IGNvbnN0IEVSUk9SID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcblxuZXhwb3J0IGNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tLWNvbXBsZXRlZCcpXG5leHBvcnQgY29uc3QgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi0tYWN0aXZlJylcbmV4cG9ydCBjb25zdCBhbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLS1hbGwnKVxuXG4iLCJpbXBvcnQge0lURU1fQ0xBU1N9IGZyb20gXCIuLi9jb21tb24vY29uc3RhbnRzLmpzXCJcbmltcG9ydCBJdGVtIGZyb20gXCIuLi9jbGFzc2VzL0l0ZW0uanNcIlxuXG5jb25zdCBpdGVtID0gbmV3IEl0ZW0oKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTb3J0VGFza3MoZXZlbnQpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcl9fYnV0dG9uJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYnV0dG9uLS1maWx0ZXItYWN0aXZlJykpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0lURU1fQ0xBU1N9YCkuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpXG4gIGNvbnN0IGxpc3RDbGFzcyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lXG4gICAgY29uc29sZS5sb2coaXRlbS50b2RvbGlzdClcbiAgc3dpdGNoIChsaXN0Q2xhc3MpIHtcbiAgICBjYXNlICdmaWx0ZXJfX2J1dHRvbiBidXR0b24tLWFjdGl2ZSc6XG4gICAgICBjb25zb2xlLmxvZyhpdGVtLnRvZG9saXN0KVxuXG4gICAgICBjb25zdCBjb21wbGV0ZWRBcnIgPSBpdGVtLnRvZG9saXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uY29tcGxldGVkID09PSBmYWxzZSlcbiAgICAgIGNvbXBsZXRlZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4gaXRlbS5yZW5kZXJpbmdUYXNrKGVsZW1lbnQpKVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlsdGVyX19idXR0b24gYnV0dG9uLS1jb21wbGV0ZWQnOlxuICAgICAgY29uc3Qgbm90Q29tcGxldGVkQXJyID0gaXRlbS50b2RvbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvbXBsZXRlZCA9PT0gdHJ1ZSlcbiAgICAgIG5vdENvbXBsZXRlZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4gaXRlbS5yZW5kZXJpbmdUYXNrKGVsZW1lbnQpKVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlsdGVyX19idXR0b24gYnV0dG9uLS1hbGwnOlxuICAgICAgaXRlbS50b2RvbGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4gaXRlbS5yZW5kZXJpbmdUYXNrKGVsZW1lbnQpKVxuICAgICAgYnJlYWs7XG4gIH1cbiAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdidXR0b24tLWZpbHRlci1hY3RpdmUnKVxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy9pbnRlci9JbnRlci1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogXFxcIkludGVyXFxcIjtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXNzZXRzL3N0eWxlcy9pbnRlci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxvQkFBb0I7SUFDcEIsK0RBQStEO0lBQy9ELGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiSW50ZXJcXFwiO1xcbiAgICBzcmM6IHVybChcXFwiLi4vZm9udHMvaW50ZXIvSW50ZXItUmVndWxhci50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ludGVyLmNzc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLypudWxsaW5nKi9cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm9yZGVyOiAwO1xcbn1cXG5cXG5hIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG51bCxcXG5vbCxcXG5saSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmh0bWwge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcblxcbmxpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcbn1cXG5cXG4vKmNvbW1vbiovXFxuXFxuLndyYXBwZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDQwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcbn1cXG5cXG4vKmhlYWRlciovXFxuXFxuLmhlYWRlciB7XFxuICAgIHBhZGRpbmc6IDIzcHggMDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgI0YwRjBGMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNjBweDtcXG59XFxuXFxuLmhlYWRlciA+IC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDE4NDBweDtcXG59XFxuXFxuLmhlYWRlcl9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLmhlYWRlcl9fbG9nbyB7XFxuXFxufVxcblxcbi5oZWFkZXJfX2F1dGgge1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogIzQ2NDY0NjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaGVhZGVyX19saW5rIHtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxufVxcblxcbi8qbWFpbiovXFxuXFxuLm1haW5fX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4vKm5vdGljZSovXFxuXFxuLm5vdGljZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxNnB4IDI2cHg7XFxuICAgIGJhY2tncm91bmQ6ICNGNkZGRUQ7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNCN0VCOEY7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogODBweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5ub3RpY2UtLWFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5ub3RpY2VfX2J1dHRvbiB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlYXJjaCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlYXJjaC0tYWN0aXZlIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuXFxuXFxuLypmaWx0ZXIqL1xcblxcbi5maWx0ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uZmlsdGVyX19idXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0RCRTBFOTtcXG4gICAgYm94LXNoYWRvdzogMCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDE2KTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBwYWRkaW5nOiAycHggOHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZmlsdGVyX19idXR0b246aG92ZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTg1OUZGO1xcbiAgICBjb2xvcjogIzE4NTlGRjtcXG59XFxuXFxuLmJ1dHRvbi0tZmlsdGVyLWFjdGl2ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODU5RkY7XFxuICAgIGNvbG9yOiAjMTg1OUZGO1xcbn1cXG5cXG4vKmFkZCB0YXNrKi9cXG5cXG4uYWRkLXRhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5hZGQtdGFza19faW5wdXQge1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjREJFMEU5O1xcbiAgICBib3gtc2hhZG93OiAxcHggMXB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweCAwIDAgMnB4O1xcblxcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBjb2xvcjogIzQ2NDY0NjtcXG59XFxuXFxuaW5wdXQjaW5wdXRfX25ldy10YXNrOmZvY3VzIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzE4NTlGRjtcXG59XFxuXFxuaW5wdXQjaW5wdXRfX25ldy10YXNrOjpwbGFjZWhvbGRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjQjRCQUM0O1xcbn1cXG5cXG4uYWRkLXRhc2tfX2J1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHggMTZweCA4cHggMjJweDtcXG5cXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg1OUZGO1xcblxcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBjb2xvcjogI0ZGRkZGRjtcXG59XFxuXFxuLnRvZG9saXN0X19idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU1O1xcbn1cXG5cXG4vKmxpc3QgdGFzayovXFxuLmxpc3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmxpc3RfX2l0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi50b2RvbGlzdF9fdGFzay1uZXcge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDI3cHg7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNDY0NjQ2O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJ1dHRvbi1lZGl0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMnB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlICsgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxOHB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxuICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0RCRTBFOTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlOmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgIGJhY2tncm91bmQ6ICNhM2JkZmY7XFxufVxcblxcbi5idXR0b24tLWVkaXQsXFxuLmJ1dHRvbi0tZGVsIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYnV0dG9uLS1kZWwge1xcbiAgICBjb2xvcjogI0Q2MDEwMztcXG59XFxuXFxuLmJ1dHRvbi0tZWRpdCB7XFxuICAgIG1hcmdpbi1yaWdodDogMjJweDtcXG59XFxuXFxuLyplcnJvciovXFxuXFxuLmVycm9yIHtcXG4gICAgY29sb3I6ICNmMDA7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5lcnJvci0tc2hvdyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc3RhdGUtLXJlYWR5IHtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG4vKmZvb3RlciovXFxuXFxuLmZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDIzcHggMDtcXG4gICAgYmFja2dyb3VuZDogI0YwRjBGMDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgI0YwRjBGMDtcXG59XFxuXFxuLmZvb3Rlcl9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9vdGVyX19sb2dvIHtcXG5cXG59XFxuXFxuLmZvb3Rlcl9fbGluayB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbn1cXG5cXG4uZWRpdC0tZGlzYWJsZSB7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLnJlbW92ZS0tZGlzYWJsZSB7XFxuICAgIGNvbG9yOiAjZWY5OTlhO1xcbn1cXG5cXG4vKmF1dGgqL1xcbi8qLm1vZGFsLWF1dGggeyovXFxuLyogICAgZGlzcGxheTogbm9uZTsqL1xcbi8qICAgIHBvc2l0aW9uOiBmaXhlZDsqL1xcbi8qICAgIHotaW5kZXg6IDM7Ki9cXG4vKiAgICB0b3A6IDA7Ki9cXG4vKiAgICBsZWZ0OiAwOyovXFxuLyogICAgYm90dG9tOiAwOyovXFxuLyogICAgcmlnaHQ6IDA7Ki9cXG4vKiAgICB3aWR0aDogMTAwJTsqL1xcbi8qICAgIGhlaWdodDogMTAwJTsqL1xcbi8qICAgIG92ZXJmbG93OiBhdXRvOyovXFxuLyp9Ki9cXG5cXG4vKm1vZGFsKi9cXG5cXG4ubW9kYWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5tb2RhbF9fb3ZlcmxheSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbi8qbW9kYWwtc2VhcmNoKi9cXG5cXG4ubW9kYWwtc2VhcmNoX19jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUlO1xcbiAgICByaWdodDogMjBweDtcXG4gICAgei1pbmRleDogMjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuXFxuLm1vZGFsLXNlYXJjaF9fY2xvc2Uge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5tb2RhbC1zZWFyY2hfX3RpdGxlIHtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XFxufVxcblxcbi5tb2RhbC1zZWFyY2hfX2lucHV0IHtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweCAwIDAgMnB4O1xcbiAgICBwYWRkaW5nOiA0cHggNnB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwMDAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgICB3aWR0aDogODAlO1xcbn1cXG5cXG5cXG4vKm1vZGFsLWVkaXQqL1xcbi5zYXZlIHtcXG4gICAgY29sb3I6ICNCN0VCOEY7XFxufVxcblxcbi5tb2RhbC0tYWN0aXZlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qbW9kYWwtYXV0aCovXFxuXFxuLm1vZGFsLWF1dGhfX2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogNjBweDtcXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWF4LXdpZHRoOiA1ODBweDtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubW9kYWwtYXV0aF9fdGl0bGUge1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAzOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMDVlbTtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XFxufVxcblxcbi5tb2RhbC1hdXRoX19kZXNjIHtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgY29sb3I6ICM2MDYwNjA7XFxuICAgIG1hcmdpbi1ib3R0b206IDM0cHg7XFxufVxcblxcbi5tb2RhbC1hdXRoX19saXN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBtYXJnaW4tYm90dG9tOiAzNHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5tb2RhbC1hdXRoX19saXN0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgaGVpZ2h0OiAycHg7XFxuICAgIGJhY2tncm91bmQ6ICNGMEYyRjY7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRvcDogOTIlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5cXG4ubW9kYWwtYXV0aF9faXRlbSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMyLjVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubW9kYWwtYXV0aF9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1heC13aWR0aDogMzY4cHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLm1vZGFsLWF1dGhfX2J1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDhweCAxNjBweDtcXG4gICAgYmFja2dyb3VuZDogIzE4NTlGRjtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRkZGRkZGO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5tb2RhbC1hdXRoX19pbnB1dCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjQjRCQUM0O1xcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcXG4gICAgbWF4LXdpZHRoOiAzNjhweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEQkUwRTk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLm1vZGFsLWF1dGhfX292ZXJsYXkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ubG9naW4ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAyOHB4O1xcbn1cXG5cXG4ucGFzc3dvcmQge1xcbiAgICBtYXJnaW4tYm90dG9tOiA2MHB4O1xcbn1cXG5cXG4uYXV0aC0tYWN0aXZlIHtcXG4gICAgY29sb3I6ICMxODU5RkY7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMTg1OUZGO1xcbn1cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUEsVUFBVTs7QUFFVjs7O0lBR0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsVUFBVTtJQUNWLFNBQVM7QUFDYjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTs7O0lBR0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBOzs7Ozs7SUFNSSxvQkFBb0I7SUFDcEIsa0JBQWtCO0FBQ3RCOztBQUVBLFNBQVM7O0FBRVQ7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsV0FBVztJQUNYLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUVBLFNBQVM7O0FBRVQ7SUFDSSxlQUFlO0lBQ2Ysa0NBQWtDO0lBQ2xDLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7O0FBRUE7O0FBRUE7SUFDSSxnQ0FBZ0M7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Z0M7SUFDaEMsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsb0NBQW9DO0lBQ3BDLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixPQUFPO0lBQ1AsU0FBUztJQUNULFFBQVE7SUFDUixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZ0NBQWdDO0FBQ3BDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ2ludGVyLmNzcyc7XFxuXFxuLypudWxsaW5nKi9cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm9yZGVyOiAwO1xcbn1cXG5cXG5hIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG51bCxcXG5vbCxcXG5saSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbmh0bWwge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcblxcbmxpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYge1xcbiAgICBmb250LXdlaWdodDogaW5oZXJpdDtcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcbn1cXG5cXG4vKmNvbW1vbiovXFxuXFxuLndyYXBwZXIge1xcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMDQwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcbn1cXG5cXG4vKmhlYWRlciovXFxuXFxuLmhlYWRlciB7XFxuICAgIHBhZGRpbmc6IDIzcHggMDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgI0YwRjBGMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNjBweDtcXG59XFxuXFxuLmhlYWRlciA+IC5jb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDE4NDBweDtcXG59XFxuXFxuLmhlYWRlcl9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLmhlYWRlcl9fbG9nbyB7XFxuXFxufVxcblxcbi5oZWFkZXJfX2F1dGgge1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogIzQ2NDY0NjtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaGVhZGVyX19saW5rIHtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxufVxcblxcbi8qbWFpbiovXFxuXFxuLm1haW5fX3dyYXBwZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4vKm5vdGljZSovXFxuXFxuLm5vdGljZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxNnB4IDI2cHg7XFxuICAgIGJhY2tncm91bmQ6ICNGNkZGRUQ7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNCN0VCOEY7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogODBweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5ub3RpY2UtLWFjdGl2ZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5ub3RpY2VfX2J1dHRvbiB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlYXJjaCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlYXJjaC0tYWN0aXZlIHtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuXFxuXFxuXFxuLypmaWx0ZXIqL1xcblxcbi5maWx0ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG4uZmlsdGVyX19idXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0RCRTBFOTtcXG4gICAgYm94LXNoYWRvdzogMCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMDE2KTtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBwYWRkaW5nOiAycHggOHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uZmlsdGVyX19idXR0b246aG92ZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTg1OUZGO1xcbiAgICBjb2xvcjogIzE4NTlGRjtcXG59XFxuXFxuLmJ1dHRvbi0tZmlsdGVyLWFjdGl2ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMxODU5RkY7XFxuICAgIGNvbG9yOiAjMTg1OUZGO1xcbn1cXG5cXG4vKmFkZCB0YXNrKi9cXG5cXG4uYWRkLXRhc2sge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbi5hZGQtdGFza19faW5wdXQge1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjREJFMEU5O1xcbiAgICBib3gtc2hhZG93OiAxcHggMXB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweCAwIDAgMnB4O1xcblxcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBjb2xvcjogIzQ2NDY0NjtcXG59XFxuXFxuaW5wdXQjaW5wdXRfX25ldy10YXNrOmZvY3VzIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzE4NTlGRjtcXG59XFxuXFxuaW5wdXQjaW5wdXRfX25ldy10YXNrOjpwbGFjZWhvbGRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjQjRCQUM0O1xcbn1cXG5cXG4uYWRkLXRhc2tfX2J1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHggMTZweCA4cHggMjJweDtcXG5cXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg1OUZGO1xcblxcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICBjb2xvcjogI0ZGRkZGRjtcXG59XFxuXFxuLnRvZG9saXN0X19idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU1O1xcbn1cXG5cXG4vKmxpc3QgdGFzayovXFxuLmxpc3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmxpc3RfX2l0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAyMHB4IDE2cHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi50b2RvbGlzdF9fdGFzay1uZXcge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDI3cHg7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNDY0NjQ2O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJ1dHRvbi1lZGl0IHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMnB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlICsgLmxhYmVsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxOHB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxuICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0RCRTBFOTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4udG9kb2xpc3RfX3N0YXRlOmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgIGJhY2tncm91bmQ6ICNhM2JkZmY7XFxufVxcblxcbi5idXR0b24tLWVkaXQsXFxuLmJ1dHRvbi0tZGVsIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYnV0dG9uLS1kZWwge1xcbiAgICBjb2xvcjogI0Q2MDEwMztcXG59XFxuXFxuLmJ1dHRvbi0tZWRpdCB7XFxuICAgIG1hcmdpbi1yaWdodDogMjJweDtcXG59XFxuXFxuLyplcnJvciovXFxuXFxuLmVycm9yIHtcXG4gICAgY29sb3I6ICNmMDA7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5lcnJvci0tc2hvdyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc3RhdGUtLXJlYWR5IHtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG4vKmZvb3RlciovXFxuXFxuLmZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDIzcHggMDtcXG4gICAgYmFja2dyb3VuZDogI0YwRjBGMDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDAgI0YwRjBGMDtcXG59XFxuXFxuLmZvb3Rlcl9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uZm9vdGVyX19sb2dvIHtcXG5cXG59XFxuXFxuLmZvb3Rlcl9fbGluayB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbn1cXG5cXG4uZWRpdC0tZGlzYWJsZSB7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLnJlbW92ZS0tZGlzYWJsZSB7XFxuICAgIGNvbG9yOiAjZWY5OTlhO1xcbn1cXG5cXG4vKmF1dGgqL1xcbi8qLm1vZGFsLWF1dGggeyovXFxuLyogICAgZGlzcGxheTogbm9uZTsqL1xcbi8qICAgIHBvc2l0aW9uOiBmaXhlZDsqL1xcbi8qICAgIHotaW5kZXg6IDM7Ki9cXG4vKiAgICB0b3A6IDA7Ki9cXG4vKiAgICBsZWZ0OiAwOyovXFxuLyogICAgYm90dG9tOiAwOyovXFxuLyogICAgcmlnaHQ6IDA7Ki9cXG4vKiAgICB3aWR0aDogMTAwJTsqL1xcbi8qICAgIGhlaWdodDogMTAwJTsqL1xcbi8qICAgIG92ZXJmbG93OiBhdXRvOyovXFxuLyp9Ki9cXG5cXG4vKm1vZGFsKi9cXG5cXG4ubW9kYWwge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5tb2RhbF9fb3ZlcmxheSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHotaW5kZXg6IDE7XFxufVxcblxcbi8qbW9kYWwtc2VhcmNoKi9cXG5cXG4ubW9kYWwtc2VhcmNoX19jb250ZW50IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUlO1xcbiAgICByaWdodDogMjBweDtcXG4gICAgei1pbmRleDogMjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XFxuXFxuLm1vZGFsLXNlYXJjaF9fY2xvc2Uge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5tb2RhbC1zZWFyY2hfX3RpdGxlIHtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XFxufVxcblxcbi5tb2RhbC1zZWFyY2hfX2lucHV0IHtcXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggNHB4IHJnYigwIDAgMCAvIDEwJSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweCAwIDAgMnB4O1xcbiAgICBwYWRkaW5nOiA0cHggNnB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwMDAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgICB3aWR0aDogODAlO1xcbn1cXG5cXG5cXG4vKm1vZGFsLWVkaXQqL1xcbi5zYXZlIHtcXG4gICAgY29sb3I6ICNCN0VCOEY7XFxufVxcblxcbi5tb2RhbC0tYWN0aXZlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qbW9kYWwtYXV0aCovXFxuXFxuLm1vZGFsLWF1dGhfX2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogNjBweDtcXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWF4LXdpZHRoOiA1ODBweDtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubW9kYWwtYXV0aF9fdGl0bGUge1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICBmb250LXNpemU6IDM2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAzOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMDVlbTtcXG4gICAgY29sb3I6ICM0NjQ2NDY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XFxufVxcblxcbi5tb2RhbC1hdXRoX19kZXNjIHtcXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBsaW5lLWhlaWdodDogMjRweDtcXG4gICAgY29sb3I6ICM2MDYwNjA7XFxuICAgIG1hcmdpbi1ib3R0b206IDM0cHg7XFxufVxcblxcbi5tb2RhbC1hdXRoX19saXN0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBtYXJnaW4tYm90dG9tOiAzNHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5tb2RhbC1hdXRoX19saXN0OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgaGVpZ2h0OiAycHg7XFxuICAgIGJhY2tncm91bmQ6ICNGMEYyRjY7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRvcDogOTIlO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG5cXG4ubW9kYWwtYXV0aF9faXRlbSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjNjA2MDYwO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMyLjVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICB6LWluZGV4OiAyO1xcbn1cXG5cXG4ubW9kYWwtYXV0aF9fd3JhcHBlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1heC13aWR0aDogMzY4cHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG59XFxuXFxuLm1vZGFsLWF1dGhfX2J1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDhweCAxNjBweDtcXG4gICAgYmFja2dyb3VuZDogIzE4NTlGRjtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRkZGRkZGO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5tb2RhbC1hdXRoX19pbnB1dCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICAgIGNvbG9yOiAjQjRCQUM0O1xcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcXG4gICAgbWF4LXdpZHRoOiAzNjhweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEQkUwRTk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLm1vZGFsLWF1dGhfX292ZXJsYXkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4ubG9naW4ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAyOHB4O1xcbn1cXG5cXG4ucGFzc3dvcmQge1xcbiAgICBtYXJnaW4tYm90dG9tOiA2MHB4O1xcbn1cXG5cXG4uYXV0aC0tYWN0aXZlIHtcXG4gICAgY29sb3I6ICMxODU5RkY7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMTg1OUZGO1xcbn1cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQge0lOUFVULCBFUlJPUiwgQlROX0FERCwgY29tcGxldGVkLCBJVEVNX0NMQVNTLCBhY3RpdmUsIGFsbH0gZnJvbSAnLi9jb21tb24vY29uc3RhbnRzLmpzJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9jbGFzc2VzL0l0ZW0uanMnXG5pbXBvcnQgVUkgZnJvbSAnLi9jbGFzc2VzL1VJLmpzJ1xuaW1wb3J0IGdldFNvcnRUYXNrcyBmcm9tIFwiLi91dGlscy9zb3J0LmpzXCI7XG5pbXBvcnQgJy4vYXNzZXRzL3N0eWxlcy9zdHlsZS5jc3MnXG5cbmNvbnN0IGl0ZW0gPSBuZXcgSXRlbSgpXG5jb25zdCB1aSA9IG5ldyBVSSgpXG5cbndpbmRvdy5vbmxvYWQgPSAoKT0+IHtcbiAgaXRlbS50b2RvbGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiBpdGVtLnJlbmRlcmluZ1Rhc2soZWxlbWVudCkpXG59XG5cbkJUTl9BREQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b0RvSGFuZGxlcilcbklOUFVULmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgIHRvRG9IYW5kbGVyKClcbiAgfVxufSlcblxuZnVuY3Rpb24gdG9Eb0hhbmRsZXIoKSB7XG4gIGNvbnN0IHZhbHVlSW5wdXQgPSBJTlBVVC52YWx1ZVxuICBpZiAodmFsdWVJbnB1dCAmJiAhaXRlbS50b2RvbGlzdC5zb21lKGkgPT4gaS50aXRsZSA9PT0gdmFsdWVJbnB1dCkpIHtcbiAgICBpdGVtLmFkZCh2YWx1ZUlucHV0KVxuICAgIGNvbnNvbGUubG9nKGl0ZW0udG9kb2xpc3QpXG4gICAgSU5QVVQudmFsdWUgPSAnJ1xuICAgIHVpLnZhbGlkYXRlKHRydWUpXG4gIH0gZWxzZSB7XG4gICAgdWkudmFsaWRhdGUoZmFsc2UpXG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcl9fYnV0dG9uJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICBnZXRTb3J0VGFza3MoZSlcbn0pKVxuXG5cblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuY29uc3QgbW9kYWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9faW5wdXQnKVxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpXG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICBpZiAoc2VhcmNoLmNsYXNzTGlzdC5jb250YWlucygnc2VhcmNoLS1hY3RpdmUnKSkge1xuICAgIHNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKCdzZWFyY2gtLWFjdGl2ZScpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlcl9fYnV0dG9uJykuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYnV0dG9uLS1maWx0ZXItYWN0aXZlJykpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7SVRFTV9DTEFTU31gKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW1vdmUoKSlcbiAgICBpdGVtLnRvZG9saXN0LmZvckVhY2goKGVsZW1lbnQpID0+IGl0ZW0ucmVuZGVyaW5nVGFzayhlbGVtZW50KSlcbiAgfSBlbHNlIHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICB9XG59KVxuXG5mdW5jdGlvbiBnZXRTZWFyY2hFbGVtZW50KCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyX19idXR0b24nKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdidXR0b24tLWZpbHRlci1hY3RpdmUnKSlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7SVRFTV9DTEFTU31gKS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW1vdmUoKSlcbiAgY29uc3QgY29tcGxldGVkQXJyID0gaXRlbS50b2RvbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlID09PSBtb2RhbElucHV0LnZhbHVlKVxuICBjb21wbGV0ZWRBcnIuZm9yRWFjaChlbGVtZW50ID0+IGl0ZW0ucmVuZGVyaW5nVGFzayhlbGVtZW50KSlcbiAgc2VhcmNoLmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC0tYWN0aXZlJylcbn1cblxuY29uc3QgZnVuY0lubmVyID0gZGVib3VuY2UoZ2V0U2VhcmNoRWxlbWVudCwgMzAwKVxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWUpIHtcbiAgbGV0IHRpbWVvdXRcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmbiwgdGltZSlcbiAgfVxufVxuXG5tb2RhbElucHV0Lm9uaW5wdXQgPSBmdW5jSW5uZXJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19vdmVybGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxufSlcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19hdXRoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYXV0aCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtYXV0aF9faXRlbScpLmZvckVhY2goaXRlbT0+IHtcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsLWF1dGhfX2l0ZW0nKS5mb3JFYWNoKGl0ZW09PntcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYXV0aC0tYWN0aXZlJylcbiAgICB9KVxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYXV0aC0tYWN0aXZlJylcbiAgfSlcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1hdXRoX19vdmVybGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1hdXRoJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG59KVxuXG5cblxuXG5cblxuXG5cblxuXG4iXSwibmFtZXMiOlsiQVRUUklCVVRFX0lURU0iLCJJVEVNX0NMQVNTIiwiTElTVCIsIk1BVEVSSUFMX0NMQVNTIiwiVEFTS19DTEFTUyIsIkVESVRfQ0xBU1MiLCJERUxFVEVfQ0xBU1MiLCJVSSIsIkl0ZW0iLCJzdG9yZSIsInRvZG9saXN0IiwibGlzdCIsImVsZW0iLCJpdGVtIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2hlY2siLCJ0YXNrIiwiZWRpdCIsImRlbCIsImxhYmVsIiwiY2hlY2tBZnRlclJlbG9hZCIsImNvbXBsZXRlZCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsInRpdGxlIiwiaWQiLCJjaGVja2VkIiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ1cGRhdGUiLCJyZW1vdmUiLCJ2YWx1ZSIsImFkZFRhc2siLCJyZW5kZXJpbmdUYXNrIiwiZXZlbnQiLCJjdXJyZW50RWxlbWVudCIsInRhcmdldCIsInBhcmVudEl0ZW0iLCJwYXJlbnROb2RlIiwidGFza0ZpZWxkIiwicXVlcnlTZWxlY3RvciIsImluZGV4IiwiZ2V0QXR0cmlidXRlIiwiY29udGFpbnMiLCJmaW5kSW5kZXgiLCJmaW5kIiwidXBkYXRlVGFzayIsInZhbGlkYXRlIiwidGhpc09iaiIsInN0eWxlIiwiZGlzcGxheSIsInJlbW92ZWRJdGVtIiwicmVtb3ZlVGFzayIsIml0ZW1QYXJlbnQiLCJlbGVtZW50IiwiYSIsInRvZ2dsZVRhc2siLCJzZXRUaW1lb3V0IiwiRVJST1IiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibGFzdElkIiwibGVuZ3RoIiwiTnVtYmVyIiwicHVzaCIsInRvU3RyaW5nIiwiZXN0Iiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlbW92ZUl0ZW1JbmRleCIsInNwbGljZSIsImVycm9yIiwiQUREX0NMQVNTIiwiVE9ET19DTEFTUyIsIkJUTl9BREQiLCJJTlBVVCIsImFjdGl2ZSIsImFsbCIsImdldFNvcnRUYXNrcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwibGlzdENsYXNzIiwiY3VycmVudFRhcmdldCIsImNsYXNzTmFtZSIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZWRBcnIiLCJmaWx0ZXIiLCJub3RDb21wbGV0ZWRBcnIiLCJ1aSIsIndpbmRvdyIsIm9ubG9hZCIsInRvRG9IYW5kbGVyIiwia2V5Q29kZSIsInZhbHVlSW5wdXQiLCJzb21lIiwiaSIsIm1vZGFsIiwibW9kYWxJbnB1dCIsInNlYXJjaCIsImdldFNlYXJjaEVsZW1lbnQiLCJmdW5jSW5uZXIiLCJkZWJvdW5jZSIsImZuIiwidGltZSIsInRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJvbmlucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==