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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  uid: function uid() {
    return '_js' + this.id++;
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getAttributes = __webpack_require__(6);

var _getAttributes2 = _interopRequireDefault(_getAttributes);

var _getChildren = __webpack_require__(7);

var _getChildren2 = _interopRequireDefault(_getChildren);

var _getLib = __webpack_require__(8);

var _getLib2 = _interopRequireDefault(_getLib);

var _getStyles = __webpack_require__(9);

var _getStyles2 = _interopRequireDefault(_getStyles);

var _getTagName = __webpack_require__(10);

var _getTagName2 = _interopRequireDefault(_getTagName);

var _getTemplates = __webpack_require__(11);

var _getTemplates2 = _interopRequireDefault(_getTemplates);

var _styleNode = __webpack_require__(12);

var _styleNode2 = _interopRequireDefault(_styleNode);

var _updateStyles = __webpack_require__(3);

var _updateStyles2 = _interopRequireDefault(_updateStyles);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Js = function () {
  function Js(args) {
    _classCallCheck(this, Js);

    args.$node.setAttribute('id', args.uid);

    // Reference to the vnode parent
    if (args.parent !== undefined) {
      Object.defineProperty(this, 'parent', {
        get: function get() {
          return args.parent;
        },
        set: function set() {
          console.log('Can\'t change parent');
        }
      });
    }

    // Create the UID of the vnode
    if (args.uid !== undefined) {
      Object.defineProperty(this, 'uid', {
        get: function get() {
          return args.uid;
        },
        set: function set() {
          console.log('Can\'t change UID');
        }
      });
    };

    // Referencd to the document node
    Object.defineProperty(this, 'node', {
      get: function get() {
        return args.$node;
      },
      set: function set() {
        console.log('Can\'t redefine document node');
      }
    });

    // Import the lib from the parent
    Object.defineProperty(this, '_jsLib', {
      get: function get() {
        return args.lib;
      },
      set: function set() {
        console.log('Can\'t set the lib');
      }
    });

    // Setting value if an input
    if (args.$node.tagName === 'INPUT') {
      Object.defineProperty(this, 'value', {
        get: function get() {
          return this.node.value;
        },
        set: function set(value) {
          this.node.value = value;
        }
      });
    }

    this.attributes = (0, _getAttributes2.default)(args.$node);
    this.tagName = (0, _getTagName2.default)(args.$node);
    this.childNodes = (0, _getChildren2.default)(args.$node, args.lib, this);
    this.styles = (0, _getStyles2.default)(args.$node, args.uid);
    this.templates = (0, _getTemplates2.default)(args.$node);

    this._styleNode = (0, _styleNode2.default)(this.styles, this.uid, this.node);

    this.lib = (0, _getLib2.default)(this, args.lib);
  }

  _createClass(Js, [{
    key: 'addChild',
    value: function addChild($child, cb) {
      var _this = this;

      var id = '';

      if (typeof $child === 'string') {
        $child = document.createRange().createContextualFragment($child);
      }

      if ($child.nodeType === 11) {
        for (var i = 0; i < $child.childNodes.length; i++) {
          var $node = $child.childNodes[i];

          id = _utils2.default.uid();

          if ($node.nodeType === 1) {
            this.childNodes[id] = new Js({
              $node: $node,
              parent: this,
              lib: this._jsLib,
              uid: id
            });
          }
        }

        requestAnimationFrame(function () {
          _this.node.appendChild($child);
        });

        if (typeof cb === 'function') {
          cb(this.childNodes[id]);
        }
        return;
      }

      id = _utils2.default.uid();
      var frag = document.createDocumentFragment();

      this.childNodes[id] = new Js({
        $node: $child,
        parent: this,
        lib: this._jsLib,
        uid: id
      });

      requestAnimationFrame(function () {
        _this.node.appendChild(frag.appendChild($child));
      });

      if (typeof cb === 'function') {
        cb(this.childNodes[id]);
      }
    }
  }, {
    key: 'bind',
    value: function bind() {
      var $node = this.node;

      while ($node.firstChild) {
        $node.removeChild($node.firstChild);
      }

      return $node.appendChild(document.createTextNode(''));
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      var event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: false
      });

      event.vnode = function () {
        return this;
      }.bind(this);

      this.node.dispatchEvent(event);
    }
  }, {
    key: 'event',
    value: function event(events, cb) {
      if (Array.isArray(events)) {
        events.map(function (event) {
          this.node.addEventListener(event, function (e) {
            e.stopPropagation();
            e.preventDefault();
            cb(e);
          }, false);
        }.bind(this));
      } else {
        this.node.addEventListener(events, function (e) {
          e.stopPropagation();
          e.preventDefault();
          cb(e);
        }, false);
      }
    }
  }, {
    key: 'find',
    value: function find() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = [];

      function dig(vnode, cb) {
        for (var key in vnode.childNodes) {
          cb(vnode.childNodes[key]);
          dig(vnode.childNodes[key], cb);
        }
      }

      switch (args.length) {
        case 1:
          dig(this, function (childNode) {
            if (childNode.attributes.hasOwnProperty(args[0])) {
              result.push(childNode);
            }
          });
          break;

        case 2:
          dig(this, function (childNode) {
            if (typeof args[1] === 'function') {
              if (childNode.attributes.hasOwnProperty(args[0])) {
                args[1](childNode);
                result.push(childNode);
              }
            } else if (childNode.attributes[args[0]] === args[1]) {
              result.push(childNode);
            } else {
              // Error not a good query
            }
          });
          break;

        case 3:
          dig(this, function (childNode) {
            if (childNode.attributes[args[0]] === args[1]) {
              args[2](childNode);
              result.push(childNode);
            }
          });
          break;
      }

      return result;
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.node.parentNode.removeChild(this.node);
      delete this.parent.childNodes[this._uid];
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(attribute, value) {
      var attributeCamel = _utils2.default.dashToCamelCase(attribute);

      this.attributes[attributeCamel] = value;

      if (this.node.attributes[attribute] !== this.attributes[attributeCamel]) {
        this.node.setAttribute(attribute, this.attributes[_utils2.default.dashToCamelCase(attribute)]);
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle() {
      var _this2 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      switch (args.length) {
        case 1:
          if (_typeof(args[0]) === 'object') {
            Object.keys(args[0]).map(function (key, index, array) {
              _this2.styles[_utils2.default.dashToCamelCase(key)] = args[0][key];

              if (index === array.length - 1) {
                (0, _updateStyles2.default)(_this2._styleNode(), _this2.styles, _this2.uid);
              }
            });
          }
          break;

        case 2:
          if (_typeof(args[0]) === 'object') {
            Object.keys(args[0]).map(function (key, index, array) {
              _this2.styles[_utils2.default.dashToCamelCase(key)] = args[0][key];

              if (index === array.length - 1) {
                (0, _updateStyles2.default)(_this2._styleNode(), _this2.styles, _this2.uid, function () {
                  if (typeof args[1] === 'function') {
                    args[1]();
                  }
                });
              }
            });
          } else if (typeof args[0] === 'string') {
            this.styles[args[0]] = args[1];

            (0, _updateStyles2.default)(this._styleNode(), this.styles, this.uid);
          }
          break;

        case 3:
          if (typeof args[0] === 'string') {
            this.styles[args[0]] = args[1];

            (0, _updateStyles2.default)(this._styleNode(), this.styles, this.uid, function () {
              args[2]();
            });
          }
          break;
      }
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (styleNode, styles, uid, cb) {
  var head = document.head || document.querySelector('head');
  var css = '#' + uid + '{';

  Object.keys(styles).forEach(function (prop, index, array) {
    if (styles[prop] !== '') {
      css += _utils2.default.camelCaseToDash(prop) + ':' + styles[prop] + ';';
    } else {
      delete styles[prop];
    }

    if (index === array.length - 1) {
      css += '}';

      if (styleNode.styleSheet) {
        styleNode.styleSheet.cssText = css;
      } else {
        styleNode.innerHTML = '';
        styleNode.appendChild(document.createTextNode(css));
      }

      if (!styleNode.parentNode) {
        head.appendChild(styleNode);
      }

      if (typeof cb === 'function') {
        cb();
      }
    }
  });
};

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(2);

var _js2 = _interopRequireDefault(_js);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsDash = function JsDash(selector) {
  var _this = this;

  _classCallCheck(this, JsDash);

  var $node = document.querySelector(selector) || document.body;

  this.dash = {};

  (function (cb) {
    if (document.readyState !== 'loading') {
      cb(_this);
    } else {
      document.addEventListener('DOMContentLoaded', cb(_this));
    }
  })(function () {
    function boostrap() {
      var t0 = performance.now();
      var uid = $node.getAttribute('id') ? $node.getAttribute('id') : _utils2.default.uid();

      this.vnode = new _js2.default({ $node: $node, lib: this.dash, uid: uid });

      var t1 = performance.now();

      console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
    }

    if (Object.keys(_this.dash).length === 0) {
      var check = setInterval(function () {
        if (Object.keys(this.dash).length !== 0) {
          boostrap.bind(this)();
          clearInterval(check);
        }
      }.bind(_this), 1);
    } else {
      boostrap.bind(_this)();
    }
  });
};

exports.default = JsDash;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAttributes;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAttributes($node) {
  var attributes = {};

  if (!$node.attributes) {
    return {};
  }

  for (var i = 0; i < $node.attributes.length; i++) {
    var attributeName = $node.attributes[i].nodeName;

    if (attributeName !== 'style') {
      attributes[_utils2.default.dashToCamelCase(attributeName)] = $node.attributes[i].nodeValue;
    }
  }

  return attributes;
}
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($node, lib, parent) {
  var $children = $node.childNodes;
  var length = $children.length;
  var children = {};

  if (length === 0) {
    return null;
  }

  for (var i = 0; i < length; i++) {
    var $child = $children[i];
    var uid = _utils2.default.uid();

    if ($child.nodeType === 1) {
      uid = $child.getAttribute('id') ? $child.getAttribute('id') : uid;
      children[uid] = new _js2.default({
        $node: $child,
        parent: parent,
        lib: lib,
        uid: uid
      });
    }
  }

  return children;
};

var _js = __webpack_require__(2);

var _js2 = _interopRequireDefault(_js);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLib;
function getLib(vnode, jsLib) {
  var lib = {};
  var jsClasses = [];
  var func;
  var i = 0;

  function _hasJs(val) {
    return val.startsWith('js-');
  };

  if (vnode.attributes.class !== undefined) {
    jsClasses = vnode.attributes.class.split(' ').filter(_hasJs);

    for (i; i < jsClasses.length; i++) {
      var jsClass = jsClasses[i];
      var f = jsClass.substring('js-'.length);

      if (jsLib[f]) {
        lib[f] = jsLib[f].bind(vnode);
      }
    }

    for (func in lib) {
      try {
        lib[func]();
      } catch (error) {
        console.error(error.stack);
      }
    }
  }

  return lib;
};
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($node, uid) {
  var styles = {};

  if (!$node.attributes) {
    return {};
  }

  for (var i = 0; i < $node.attributes.length; i++) {
    var attributeName = $node.attributes[i].nodeName;

    if (attributeName === 'style') {
      var styleStrings = $node.attributes[i].nodeValue.split(';');

      for (var _i in styleStrings) {
        if (styleStrings[_i].trim() !== '') {
          var styleString = styleStrings[_i].split(':');
          var value = styleString.slice(1, styleString.length);

          styles[_utils2.default.dashToCamelCase(styleString[0].trim())] = value.join('').trim();
        }
      }
    }
  }

  return styles;
};

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTagName;
function getTagName($node) {
  return $node.tagName ? $node.tagName.toLowerCase() : $node.nodeName;
};
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($node, data) {
  var $children = $node.childNodes;
  var length = $children.length;
  var templates = {};

  if (length === 0) {
    return null;
  }

  for (var i in $children) {
    var $child = $children[i];

    if ($child.tagName === 'TEMPLATE') {
      var uid = $child.getAttribute('id') ? $child.getAttribute('id') : _utils2.default.uid();

      templates[uid] = $child.content;
    }
  }

  return templates;
};

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (styles, uid, $node) {
  var styleNode = document.createElement('style');

  styleNode.type = 'text/css';

  (0, _updateStyles2.default)(styleNode, styles, uid);

  $node.removeAttribute('style');

  return function () {
    return styleNode;
  };
};

var _updateStyles = __webpack_require__(3);

var _updateStyles2 = _interopRequireDefault(_updateStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=js.js.map