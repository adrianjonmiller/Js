(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Js", [], factory);
	else if(typeof exports === 'object')
		exports["Js"] = factory();
	else
		root["Js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var head = document.head || document.querySelector('head');

var Model = function () {
  function Model($node) {
    var _this = this;

    _classCallCheck(this, Model);

    var id = $node.getAttribute('id') || _utils2.default.uid();
    var model = {};
    var lastChild = null;

    this.id = id;
    this.$node = $node;
    this.style = {};
    this.class = $node.getAttribute('class') || '';
    this.$styleNode = document.createElement('style');
    this.$styleNode.type = 'text/css';
    this.attributes = {};
    this.events = {
      styleUpdated: [function () {
        if (Object.keys(_this.style).length === 0) {
          _this.$styleNode.innerHTML = '';
          return;
        }

        var style = '#' + _this.id + '{';

        for (var prop in _this.style) {
          style += _utils2.default.camelCaseToDash(prop) + ':' + _this.style[prop] + ';';
        }

        style += '}';

        if (_this.$styleNode.parentNode === null) {
          head.appendChild(_this.$styleNode);
        }

        _this.$styleNode.innerHTML = style;
      }]
    };
    this.states = {};
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.child = null;
    this.behaviors = $node.getAttribute('data-behavior') ? $node.getAttribute('data-behavior').split(' ') : [];

    this.state = 'default';
    this.value = '';
    this.width = $node.offsetWidth;
    this.height = $node.offsetHeight;
    this.top = $node.offsetTop;
    this.left = $node.offsetLeft;
    this.right = $node.offsetLeft + $node.offsetWidth;
    this.bottom = $node.offsetTop + $node.offsetHeight;

    $node.id = id;

    model = {
      id: id,
      tagName: $node.tagName.toLowerCase(),
      $node: $node,
      behaviors: this.behaviors,
      class: this.classHandler.bind(this),
      style: this.styleHandler.bind(this),
      next: this.nextHandler.bind(this),
      prev: this.prevHandler.bind(this),
      parent: this.parentHandler.bind(this),
      child: this.childHandler.bind(this),
      width: this.widthHandler.bind(this),
      height: this.heightHandler.bind(this),
      bottom: this.bottomHandler.bind(this),
      top: this.topHandler.bind(this),
      left: this.leftHandler.bind(this),
      right: this.rightHandler.bind(this),
      events: this.queueHandler.bind(this),
      emitEvent: this.eventHandler.bind(this),
      state: this.stateHandler.bind(this)
    };

    for (var i = 0; i < $node.childNodes.length; i++) {
      var $child = $node.childNodes[i];

      if ($child.nodeType === 1) {
        var child = new Model($child);

        if (lastChild === null) {
          this.child = child;
        } else {
          lastChild.next(child);
        }
        lastChild = child;
      }
    }

    var _loop = function _loop(_i) {
      var attrName = _utils2.default.dashToCamelCase($node.attributes[_i].nodeName);
      var $attrValue = $node.attributes[_i].nodeValue;

      if (attrName !== 'id' && attrName !== 'dataBehavior' && attrName !== 'style' && attrName !== 'value') {
        _this[attrName] = $attrValue;

        model[attrName] = function (val) {
          if (!val) {
            return _this[attrName];
          } else if (val !== _this.attributes[attrName]) {
            _this.attrName = val;
            _this.$node.setAttribute(_utils2.default.camelCaseToDash(_this.attrName), val);
          }

          return _this[attrName];
        };
      }
    };

    for (var _i = 0; _i < $node.attributes.length; _i++) {
      _loop(_i);
    }

    if (model.tagName === 'input') {
      model.value = this.valueHandler.bind(this);
    }

    return model;
  }

  // DOM Handlers ********************************************************

  _createClass(Model, [{
    key: 'childHandler',
    value: function childHandler(child) {
      if (!child) {
        return this.child;
      }

      this.child = child;
      return this.child;
    }
  }, {
    key: 'nextHandler',
    value: function nextHandler(next) {
      if (!next) {
        return this.next;
      }

      this.next = next;
      return this.next;
    }
  }, {
    key: 'prevHandler',
    value: function prevHandler(prev) {
      if (!prev) {
        return this.prev;
      }

      this.prev = prev;
      return this.prev;
    }
  }, {
    key: 'parentHandler',
    value: function parentHandler(parent) {
      if (!parent) {
        return this.parent;
      }

      this.parent = parent;
      return this.parent;
    }

    // Position Handlers ********************************************************

  }, {
    key: 'bottomHandler',
    value: function bottomHandler(bottom) {
      if (typeof bottom === 'number') {
        this.bottom = bottom;
        this.style.bottom = this.bottom + 'px';
        this.eventHandler('styleUpdated');
      } else {
        if (this.$node.offsetTop + this.$node.offsetHeight !== this.bottom) {
          this.bottom = this.$node.offsetTop + this.$node.offsetHeight;
        }
      }
      return this.bottom;
    }
  }, {
    key: 'topHandler',
    value: function topHandler(top) {
      if (typeof top === 'number') {
        this.top = top;
        this.style.top = this.top + 'px';
        this.eventHandler('styleUpdated');
      } else {
        if (this.$node.offsetTop !== this.top) {
          this.right = this.$node.offsetTop;
        }
      }
      return this.top;
    }
  }, {
    key: 'leftHandler',
    value: function leftHandler(left) {
      if (typeof left === 'number') {
        this.left = left;
        this.style.left = this.left + 'px';
        this.eventHandler('styleUpdated');
      } else {
        if (this.$node.offsetLeft !== this.right) {
          this.right = this.$node.offsetLeft;
        }
      }
      return this.right;
    }
  }, {
    key: 'rightHandler',
    value: function rightHandler(right) {
      if (typeof right === 'number') {
        this.right = right;
        this.style.right = this.right + 'px';
        this.eventHandler('styleUpdated');
      } else {
        if (this.$node.offsetLeft + this.$node.offsetWidth !== this.right) {
          this.right = this.$node.offsetLeft + this.$node.offsetWidth;
        }
      }
      return this.right;
    }
  }, {
    key: 'widthHandler',
    value: function widthHandler(width) {
      if (typeof width !== 'number') {
        return this.width;
      }

      if (this.width !== width) {
        this.width = width;
        this.style.width = this.width + 'px';
        this.eventHandler('styleUpdated');
      }

      return this.width;
    }
  }, {
    key: 'heightHandler',
    value: function heightHandler(height) {
      if (typeof height !== 'number') {
        return this.height;
      }

      height = parseInt(height, 10);

      if (this.height !== height) {
        this.height = height;
        this.style.height = this.height + 'px';
        this.eventHandler('styleUpdated');
      }

      return this.height;
    }

    // Events ********************************************************

  }, {
    key: 'eventHandler',
    value: function eventHandler(event) {
      if (this.events[event] !== undefined) {
        this.events[event].map(function (fn) {
          requestAnimationFrame(fn);
        });
      }

      if (this.parent) {
        this.parent.emit(event);
      }
    }
  }, {
    key: 'queueHandler',
    value: function queueHandler(event) {
      if (!this.events[event.name]) {
        this.events[event.name] = [];
      }
      this.events[event.name].push(event.fn);
    }

    // Class ********************************************************

  }, {
    key: 'classHandler',
    value: function classHandler(newClass) {
      if (!newClass) {
        return this.class;
      }

      if (this.class !== newClass) {
        this.$node.setAttribute('class', newClass);
        this.class = newClass;
      }

      return this.class;
    }

    // Styles ********************************************************

  }, {
    key: 'styleHandler',
    value: function styleHandler(style) {
      if (!style) {
        this.eventHandler('styleUpdated');
        return this.style;
      }

      if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') {
        if (Object.keys(style).length > 0) {
          for (var prop in style) {
            this.style[prop] = style[prop];
          }
        } else {
          this.style = {};
        }

        this.eventHandler('styleUpdated');
      }

      return this.style;
    }

    // Value Handler ********************************************************

  }, {
    key: 'valueHandler',
    value: function valueHandler(value) {
      if (!value) {
        return this.value;
      } else if (this.value !== value) {
        this.value = value;
        this.$node.value = this.value;
      }
      return this.value;
    }

    // State Handler ********************************************************

  }, {
    key: 'stateHandler',
    value: function stateHandler(value) {
      var _this2 = this;

      var stateKeys = ['top', 'bottom', 'left', 'right', 'value', 'width', 'height'];

      if (!value) {
        return this.state;
      }

      if (typeof value === 'string') {
        this.state = value;
        if (this.states[value] !== undefined) {
          stateKeys.forEach(function (key) {
            _this2[key + 'Handler'](_this2.states[value][key]);
          });

          if (this.states[value].style !== undefined) {
            if (value === 'default') {
              this.style = this.states[value].style;
            } else {
              for (var prop in this.states[value].style) {
                this.style[prop] = this.states[value].style[prop];
              }
            }

            this.eventHandler('styleUpdated');
          }

          if (this.states[value].methods !== undefined) {
            for (var func in this.states[value].methods) {
              this.states[value].methods[func]();
            }
          }
        }
      }

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        for (var key in value) {
          this.states[key] = value[key];
        }
      }

      return this.state;
    }
  }]);

  return Model;
}();

exports.default = Model;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Store IDs in an array so they can be retrieved more accurate with the before and after functions

exports.default = {
  id: 0,
  camelCaseToDash: function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  dashToCamelCase: function dashToCamelCase(myString) {
    return myString.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  },
  createStyleNode: function createStyleNode() {
    var styleNode = document.createElement('style');

    styleNode.type = 'text/css';

    return styleNode;
  },
  uid: function uid() {
    return '_js' + this.id++;
  },
  current: function current() {
    return this.id;
  },
  prev: function prev() {
    return '_js' + (this.id - 1);
  },
  next: function next() {
    return '_js' + this.id;
  }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vnode = __webpack_require__(5);

var _vnode2 = _interopRequireDefault(_vnode);

var _model = __webpack_require__(0);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Js = function () {
  function Js(behaviors) {
    _classCallCheck(this, Js);

    this.behaviors = behaviors;
  }

  _createClass(Js, [{
    key: 'init',
    value: function init(el) {
      var _this = this;

      this.scope = document.querySelector(el) || document.body;
      ;(function (cb) {
        if (document.readyState !== 'loading') {
          cb(_this);
        } else {
          document.addEventListener('DOMContentLoaded', cb(_this));
        }
      })(function (self) {
        requestAnimationFrame(function () {
          var t0 = performance.now();
          var model = new _model2.default(_this.scope);
          var vdom = new _vnode2.default(model, _this.behaviors);

          ;(function start(vnode) {
            vnode.init();

            if (vnode.child !== null) {
              start(vnode.child);
            }

            if (vnode.next !== null) {
              start(vnode.next);
            }
          })(vdom);

          var t1 = performance.now();

          console.log('JSI attached in ' + (t1 - t0) + ' milliseconds.');
        });
      });
    }
  }]);

  return Js;
}();

exports.default = Js;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _src = __webpack_require__(2);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _src2.default({
  global: function global() {
    this.style.position = 'absolute';
    this.bottom = 0;
    this.top = 0;
    this.right = 0;
    this.left = 0;
  },
  sidebar: function sidebar() {
    this.style.position = 'absolute';
    this.bottom = 0;
    this.top = 50;
    this.left = 0;
    this.width = 200;
    this.style.backgroundColor = '#ececec';
    this.style.borderRight = 'solid thin #AAAAAA';
    this.style.boxSizing = 'border-box';
  },
  properties: function properties() {
    this.style.position = 'absolute';
    this.bottom = 0;
    this.top = 50;
    this.right = 0;
    this.width = 200;
    this.style.backgroundColor = '#ececec';
    this.style.borderLeft = 'solid thin #AAAAAA';
    this.style.boxSizing = 'border-box';
  },
  toolbar: function toolbar() {
    var _this = this;

    this.style.position = 'absolute';
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.height = 50;
    this.style.backgroundColor = '#dedede';
    this.style.borderBottom = 'solid thin #AAAAAA';
    this.on('success', function () {
      console.log(_this);
    });
  },
  main: function main() {
    this.top = 50;
    this.left = 200;
    this.right = 200;
    this.bottom = 0;
    this.style.backgroundColor = '#eee';
    this.style.overflow = 'hidden';
    this.style.position = 'absolute';
  },
  buttonTest: function buttonTest() {
    var _this2 = this;

    this.event('click', function (e) {
      _this2.emit('success');
    });
  },
  sizer: function sizer(target) {
    var _this3 = this;

    this.style.position = 'absolute';
    this.top = 0;
    this.left = 0;
    this.width = 100;
    this.height = 100;
    this.style.border = 'solid thin black';

    this.on('dragTopRight', function () {
      var height = _this3.height;
      var offsetY = _this3.top;
      var offsetX = _this3.left;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();
        _this3.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.top = e.clientY - _this3.parent.top;
        _this3.next.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.next.top = e.clientY - _this3.parent.top;
        _this3.width = e.clientX - offsetX - _this3.parent.left;
        _this3.next.width = e.clientX - offsetX - _this3.parent.left;
      };
    });

    this.on('dragTopLeft', function () {
      var height = _this3.height;
      var offsetY = _this3.top;
      var offsetX = _this3.left;
      var width = _this3.width;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();
        _this3.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.top = e.clientY - _this3.parent.top;
        _this3.next.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.next.top = e.clientY - _this3.parent.top;

        _this3.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.left = e.clientX - _this3.parent.left;
        _this3.next.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.next.left = e.clientX - _this3.parent.left;
      };
    });

    this.on('dragTop', function () {
      var height = _this3.height;
      var offsetY = _this3.top;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();
        _this3.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.top = e.clientY - _this3.parent.top;
        _this3.next.height = offsetY - (e.clientY - _this3.parent.top) + height;
        _this3.next.top = e.clientY - _this3.parent.top;
      };
    });

    this.on('dragLeft', function () {

      var offsetX = _this3.left;
      var width = _this3.width;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();

        _this3.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.next.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.left = e.clientX - _this3.parent.left;
        _this3.next.left = e.clientX - _this3.parent.left;
      };
    });

    this.on('dragRight', function () {
      var offsetX = _this3.left;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();

        _this3.width = e.clientX - offsetX - _this3.parent.left;
        _this3.next.width = e.clientX - offsetX - _this3.parent.left;
      };
    });

    this.on('dragBottomRight', function () {
      var offsetX = _this3.left;
      var offsetY = _this3.top;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();

        _this3.width = e.clientX - offsetX - _this3.parent.left;
        _this3.height = e.clientY - offsetY - _this3.parent.top;
        _this3.next.width = e.clientX - offsetX - _this3.parent.left;
        _this3.next.height = e.clientY - offsetY - _this3.parent.top;
      };
    });

    this.on('dragBottomLeft', function () {
      var offsetX = _this3.left;
      var width = _this3.width;
      var offsetY = _this3.top;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();

        _this3.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.height = e.clientY - offsetY - _this3.parent.top;
        _this3.next.width = offsetX - (e.clientX - _this3.parent.left) + width;
        _this3.next.height = e.clientY - offsetY - _this3.parent.top;
        _this3.next.left = e.clientX - _this3.parent.left;
        _this3.left = e.clientX - _this3.parent.left;
      };
    });

    this.on('dragBottom', function () {
      var offsetY = _this3.top;

      _this3.parent.$node.onmousemove = function (e) {
        e.preventDefault();

        _this3.height = e.clientY - offsetY - _this3.parent.top;
        _this3.next.height = e.clientY - offsetY - _this3.parent.top;
      };
    });

    this.on('release', function () {
      _this3.parent.$node.onmousemove = null;
    });

    this.parent.event('mouseup', function () {
      _this3.parent.$node.onmousemove = null;
    });
  },
  dragTopRight: function dragTopRight() {
    var _this4 = this;

    this.style.transform = 'translate(50%, -50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'nesw-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this4.emit("dragTopRight");
    });

    this.event('mouseup', function (e) {
      _this4.emit("release");
    });
  },
  dragTopLeft: function dragTopLeft() {
    var _this5 = this;

    this.style.transform = 'translate(-50%, -50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'nwse-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this5.emit("dragTopLeft");
    });

    this.event('mouseup', function (e) {
      _this5.emit("release");
    });
  },
  dragTop: function dragTop() {
    var _this6 = this;

    this.style.transform = 'translate(-50%, -50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'ns-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this6.emit("dragTop");
    });

    this.event('mouseup', function (e) {
      _this6.emit("release");
    });
  },
  dragBottom: function dragBottom() {
    var _this7 = this;

    this.style.transform = 'translate(-50%, 50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'ns-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this7.emit("dragBottom");
    });

    this.event('mouseup', function (e) {
      _this7.emit("release");
    });
  },
  dragBottomRight: function dragBottomRight() {
    var _this8 = this;

    this.style.transform = 'translate(50%, 50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'nwse-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this8.emit("dragBottomRight");
    });

    this.event('mouseup', function (e) {
      _this8.emit("release");
    });
  },
  dragRight: function dragRight() {
    var _this9 = this;

    this.style.transform = 'translate(50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'ew-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this9.emit("dragRight");
    });

    this.event('mouseup', function (e) {
      _this9.emit("release");
    });
  },
  dragLeft: function dragLeft() {
    var _this10 = this;

    this.style.transform = 'translate(-50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'ew-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this10.emit("dragLeft");
    });

    this.event('mouseup', function (e) {
      _this10.emit("release");
    });
  },
  dragBottomLeft: function dragBottomLeft() {
    var _this11 = this;

    this.style.transform = 'translate(-50%, 50%)';
    this.width = 10;
    this.height = 10;
    this.style.border = 'solid thin black';
    this.style.cursor = 'nesw-resize';
    this.style.backgroundColor = 'black';

    this.event('mousedown', function (e) {
      _this11.emit("dragBottomLeft");
    });

    this.event('mouseup', function (e) {
      _this11.emit("release");
    });
  },
  block: function block() {
    var _this12 = this;

    this.width = 100;
    this.height = 100;
    this.style.backgroundColor = 'blue';
    this.style.position = 'absolute';

    this.emit('target');

    this.event('mousedown', function (e) {
      e.preventDefault();
      var mouseOffX = e.clientX - _this12.left;
      var mouseOffY = e.clientY - _this12.top;
      _this12.style.outline = '1px solid black';

      _this12.parent.$node.onmousemove = function (e) {
        e.preventDefault();
        _this12.top = e.clientY - mouseOffY;
        _this12.left = e.clientX - mouseOffX;
        _this12.prev.top = e.clientY - mouseOffY;
        _this12.prev.left = e.clientX - mouseOffX;
      };
    });

    this.event('mouseup', function (e) {
      _this12.parent.$node.onmousemove = null;
    });
  }
}).init('#scope');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function () {
  function Data(data) {
    _classCallCheck(this, Data);

    this.watchers = [];
    this.data = data;
  }

  _createClass(Data, [{
    key: 'get',
    value: function get() {
      if (typeof this.data === 'function') {
        return this.data();
      }

      return this.data;
    }
  }, {
    key: 'set',
    value: function set(value) {
      if (typeof this.data === 'function') {
        this.data(value);

        this.watchers.forEach(function (cb) {
          if (typeof cb === 'function') {
            cb(value);
          }
        });
      } else if (this.data !== value) {
        var old = this.data;

        this.data = value;
        this.watchers.forEach(function (cb) {
          if (typeof cb === 'function') {
            cb(value, old);
          }
        });
      }
    }
  }, {
    key: 'addWatcher',
    value: function addWatcher(watcher, self) {
      this.watchers.push(watcher.bind(self));
    }
  }]);

  return Data;
}();

exports.default = Data;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = __webpack_require__(4);

var _data2 = _interopRequireDefault(_data);

var _model2 = __webpack_require__(0);

var _model3 = _interopRequireDefault(_model2);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vnode = function () {
  function Vnode(model, behaviors) {
    var _this = this;

    _classCallCheck(this, Vnode);

    this.methods = {};
    this.watch = {};

    this.model(model);

    if (model.child()) {
      model.child().parent(this);
      this.child = new Vnode(model.child(), behaviors);
    }

    if (model.next()) {
      model.next().prev(this);
      model.next().parent(this.parent);
      this.next = new Vnode(model.next(), behaviors);
    }

    if (this.behaviors.length > 0) {
      this.behaviors.filter(function (val) {
        return Object.keys(behaviors).indexOf(val) > -1;
      }).map(function (behavior, index, array) {
        _this.methods[behavior] = behaviors[behavior].bind(_this);
      });
    }
  }

  _createClass(Vnode, [{
    key: 'states',
    value: function states(value) {
      this.state = value;
    }
  }, {
    key: 'on',
    value: function on(event, cb) {
      this.events = {
        name: event,
        fn: cb
      };
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      this.emitEvent = event;
    }
  }, {
    key: 'addChild',
    value: function addChild($newNode, behaviors) {
      var child = new _model3.default($newNode);

      this.children[child.id] = new Vnode(child, behaviors);

      this.$node.appendChild(child.$node);
    }
  }, {
    key: 'addClass',
    value: function addClass(addedClass) {
      var classList = this.class.split(' ');
      var index = classList.indexOf(addedClass);

      if (index === -1) {
        classList.push(addedClass);
        this.class = classList.join(' ').trim();
      }
      return this.class;
    }
  }, {
    key: 'event',
    value: function event(_event, cb) {
      this.$node.addEventListener(_event, cb);
    }
  }, {
    key: 'find',
    value: function find(attrName, value, cb) {
      var result = [];

      attrName = _utils2.default.dashToCamelCase(attrName);

      (function dig(vnode) {
        if (vnode !== null) {
          if (vnode[attrName] !== undefined && vnode[attrName].indexOf(value) > -1) {
            if (typeof cb === 'function') {
              cb(vnode);
            }

            result.push(vnode);
          }
        }

        if (vnode.child !== null) {
          dig(vnode.child);
        }

        if (vnode.next !== null) {
          dig(vnode.next);
        }
      })(this.child);
      return result;
    }
  }, {
    key: 'removeClass',
    value: function removeClass(addedClass) {
      this.class = this.class.replace(new RegExp('(^|\\b)' + addedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      return this.class;
    }
  }, {
    key: 'init',
    value: function init() {
      var self = this;

      for (var functionName in this.methods) {
        try {
          this.methods[functionName]();
        } catch (error) {
          console.error(error.stack);
        }
      }

      this.states({
        default: {
          top: self.top,
          bottom: self.bottom,
          left: self.left,
          right: self.right,
          width: self.width,
          height: self.height,
          style: JSON.parse(JSON.stringify(self.style))
        }
      });
    }
  }, {
    key: 'model',
    value: function model(_model, self) {
      var root = this;

      self = self || this;

      function bind(d, k, s, config) {
        var data = new _data2.default(d);

        if (typeof root.watch[k] === 'function') {
          data.addWatcher(root.watch[k], self);
        }

        Object.defineProperty(s, k, {
          get: function get() {
            return data.get();
          },
          set: function set(val) {
            data.set(val);
          },
          configurable: config
        });
      }

      for (var key in _model) {
        switch (_typeof(_model[key])) {
          case 'object':
            if (_model[key] instanceof HTMLElement) {
              bind(_model[key], key, self, false);
            } else {
              bind(_model[key], key, self, true);
              self[key] = self[key] || {};
              this.model(_model[key], self[key]);
            }
            break;

          case 'function':
            bind(_model[key], key, self, true);
            break;

          default:
            bind(_model[key], key, self, true);
            break;
        }
      }
    }
  }]);

  return Vnode;
}();

exports.default = Vnode;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map