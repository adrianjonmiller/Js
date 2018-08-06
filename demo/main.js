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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

var _vnode = __webpack_require__(2);

var _vnode2 = _interopRequireDefault(_vnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var head = document.head || document.querySelector('head');

var Model = function () {
  function Model($node) {
    var _this = this;

    _classCallCheck(this, Model);

    var id = $node.getAttribute('id') || _utils2.default.uid();

    this.id = id;
    this.$node = $node;
    this.style = {};
    this.class = $node.getAttribute('class') || '';
    this.$styleNode = document.createElement('style');
    this.$styleNode.type = 'text/css';
    this.events = {
      styleUpdated: [function () {
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
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.child = null;
    this.value = '';
    this.behaviors = $node.getAttribute('data-behavior') ? $node.getAttribute('data-behavior').split(' ') : [];
    this.width = $node.offsetWidth;
    this.height = $node.offsetHeight;
    this.top = $node.offsetTop;
    this.left = $node.offsetLeft;
    this.right = $node.offsetLeft + $node.offsetWidth;
    this.bottom = $node.offsetTop + $node.offsetHeight;

    $node.id = id;

    var model = {
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
      emitEvent: this.eventHandler.bind(this)
    };

    var lastChild = null;

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
          if (val && val !== attributes[attrName]) {
            _this.attrName = val;
            _this.$node.setAttribute(_utils2.default.camelCaseToDash(_this.attrName), val);
          } else {
            return _this[attrName];
          }
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
      } else {
        this.child = child;
      }
    }
  }, {
    key: 'nextHandler',
    value: function nextHandler(next) {
      if (!next) {
        return this.next;
      } else {
        this.next = next;
      }
    }
  }, {
    key: 'prevHandler',
    value: function prevHandler(prev) {
      if (!prev) {
        return this.prev;
      } else {
        this.prev = prev;
      }
    }
  }, {
    key: 'parentHandler',
    value: function parentHandler(parent) {
      if (!parent) {
        return this.parent;
      } else {
        this.parent = parent;
      }
    }

    // Position Handlers ********************************************************

  }, {
    key: 'bottomHandler',
    value: function bottomHandler(bottom) {
      if (bottom) {
        this.bottom = bottom;
        this.style.bottom = this.bottom + 'px';
        this.setStyles();
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
      if (top) {
        this.top = top;
        this.style.top = this.top + 'px';
        this.setStyles();
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
      if (left) {
        this.left = left;
        this.style.left = this.left + 'px';
        this.setStyles();
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
      if (right) {
        this.right = right;
        this.style.right = this.right + 'px';
        this.setStyles();
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
      if (!width) {
        return this.width;
      } else {
        if (this.width !== width) {
          this.width = width;
          this.style.width = this.width + 'px';
          this.setStyles();
        }
      }
    }
  }, {
    key: 'heightHandler',
    value: function heightHandler(height) {
      if (!height) {
        return this.height;
      } else {
        height = parseInt(height, 10);
        if (this.height !== height) {
          this.style.height = this.height + 'px';
          this.setStyles();
        }
      }
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
    }
  }, {
    key: 'queueHandler',
    value: function queueHandler(event) {
      if (!this.events[event.name]) {
        this.events[event.name] = new Array();
      }
      this.events[event.name].push(event.fn);
    }

    // Class ********************************************************

  }, {
    key: 'classHandler',
    value: function classHandler(newClass) {
      if (!newClass) {
        return this.class;
      } else if (this.class !== newClass) {
        this.$node.setAttribute('class', newClass);
        this.class = newClass;
      }
    }

    // Styles ********************************************************

  }, {
    key: 'styleHandler',
    value: function styleHandler(style) {
      if (!style) {
        this.eventHandler('styleUpdated');
        return this.style;
      } else if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') {
        for (var prop in style) {
          this.style[prop] = style[prop];
        }
        this.eventHandler('styleUpdated');
      }
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = __webpack_require__(5);

var _data2 = _interopRequireDefault(_data);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _model2 = __webpack_require__(0);

var _model3 = _interopRequireDefault(_model2);

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
      (function dig(children) {
        for (var uid in children) {
          var child = children[uid];
          dig(child.children);
          if (child[attrName] !== undefined && child[attrName].indexOf(value) > -1) {
            result.push(child);
            if (typeof cb === 'function') {
              cb(child);
            }
          }
        }
      })(this.children);
      return result;
    }
  }, {
    key: 'removeClass',
    value: function removeClass(addedClass) {
      this.class = this.class.replace(new RegExp('(^|\\b)' + addedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      return this.class;
    }
  }, {
    key: 'offset',
    value: function offset(args) {
      var _this2 = this;

      if (this.prev) {
        this.top = parseInt(args.y, 10) + this.prev.bottom;

        this.prev.event('widthUpdated', function (e) {
          console.log(e);
          if (_this2.prev.id === e.detail.id) {
            e.preventDefault();
            console.log(e);
            _this2.top = parseInt(args.y, 10) + _this2.prev.bottom;
          }
        });
      }
    }
  }, {
    key: 'init',
    value: function init() {
      for (var functionName in this.methods) {
        try {
          this.methods[functionName]();
        } catch (error) {
          console.error(error.stack);
        }
      }
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vnode = __webpack_require__(2);

var _vnode2 = _interopRequireDefault(_vnode);

var _model = __webpack_require__(0);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Js = function () {
  function Js(args, behaviors) {
    _classCallCheck(this, Js);

    this.scope = document.querySelector(args.el) || document.body;
    this.behaviors = behaviors;
  }

  _createClass(Js, [{
    key: 'init',
    value: function init() {
      var _this = this;

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

          setInterval(function () {
            (function observe(vnode) {
              var updates = {};
            })(vdom);
          }, 1000);

          var t1 = performance.now();

          console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
        });
      });
    }
  }]);

  return Js;
}();

// function init () {
//   if (Object.keys(this.behaviors).length > 0) {
//     let t0 = performance.now();
//     let uid = utils.uid();
//     let vdom = {};

//     self.vdom[uid] = new Vnode({
//       $node: scope
//     }, self.behaviors);

//     let t1 = performance.now();

//     console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
//     console.log(vdom)
//   } else {
//     count++;
//     if (count > 6000) {
//       console.log('Js Dash timed out, no methods found');
//       return;
//     }
//     requestAnimationFrame(init);
//   }        
// }
// requestAnimationFrame(init);


// console.log(args)
//   this.methods = {};
//   // Vars
//   let scope,
//     classPrefix,
//     methods;

//   // Define accessible methods
//   if (functions !== undefined) {
//     this.methods = functions;
//   }

//   // Arguments boostrapping
//   switch (typeof args) {
//     case 'string':
//       scope = document.querySelector(args);
//       break;

//     case 'object':
//       scope = document.querySelector(args.selector) || document.body;
//       classPrefix = args.classPrefix || 'js-';
//       methods = args.methods || this.methods;
//       break;

//     default:
//       scope = document.body;
//       classPrefix = 'js-';
//       methods = this.methods;
//       break;
//   };


exports.default = Js;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _src = __webpack_require__(3);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var js = new _src2.default({
  el: 'body'
}, {
  widthObserver: function widthObserver() {},
  block: function block() {
    var _this = this;

    this.style.color = 'blue';
    this.style.backgroundColor = 'black';

    this.style = {
      fontSize: '32px'
    };

    this.on('sizeChange', function () {
      console.log(_this);
    });

    this.event('click', function (e) {
      _this.emit('sizeChange');
    });
  }
}).init();

/***/ }),
/* 5 */
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
      if (typeof this.data === 'function') return this.data();
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map