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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = __webpack_require__(3);

var _data2 = _interopRequireDefault(_data);

var _getChildren = __webpack_require__(4);

var _getChildren2 = _interopRequireDefault(_getChildren);

var _getTagName = __webpack_require__(5);

var _getTagName2 = _interopRequireDefault(_getTagName);

var _styleNode = __webpack_require__(7);

var _styleNode2 = _interopRequireDefault(_styleNode);

var _updateStyles = __webpack_require__(8);

var _updateStyles2 = _interopRequireDefault(_updateStyles);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _obj = __webpack_require__(1);

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _hasJs(val) {
  return val.startsWith('js-');
};

var Js = function () {
  function Js(args) {
    var _this = this;

    _classCallCheck(this, Js);

    var $node = args.$node;
    var jsLib = args.lib;
    var uid = args.uid;
    var libArgs = args.args !== undefined ? args.args : undefined;
    var styleNode = (0, _styleNode2.default)();
    var lib = {};
    var styles = {};
    var attributes = {};

    var parent = args.parent;
    var next = {};

    this.data = {};
    this.watch = {};
    this.tagName = (0, _getTagName2.default)($node);
    this.childNodes = (0, _getChildren2.default)($node, jsLib, this);

    // Pseudo Private
    this._attributes = attributes;
    this._lib = lib;

    if (args.model !== undefined) {
      this.model(function () {
        return args.model;
      });
    }

    // Reference to the vnode parent
    if (parent !== undefined) {
      Object.defineProperty(this, 'parent', {
        get: function get() {
          return parent;
        },
        set: function set(value) {
          parent = value;
        }
      });
    }

    Object.defineProperty(this, 'next', {
      get: function get() {
        return next;
      },
      set: function set(val) {
        next = val;
      },
      configurable: true
    });

    Object.defineProperty(this, 'isVnode', {
      get: function get() {
        return true;
      }
    });

    // Create the UID of the vnode
    if (args.uid !== undefined) {
      // $node.setAttribute('id', uid);

      Object.defineProperty(this, 'uid', {
        get: function get() {
          return uid;
        },
        set: function set() {
          console.log('Can\'t change UID');
        }
      });
    };

    // Referencd to the document node
    Object.defineProperty(this, 'node', {
      get: function get() {
        return $node;
      },
      set: function set() {
        console.log('Can\'t redefine document node');
      }
    });

    // Import the lib from the parent
    Object.defineProperty(this, '_jsLib', {
      get: function get() {
        return jsLib;
      },
      set: function set() {
        console.log('Can\'t set the lib');
      }
    });

    Object.defineProperty(this, 'style', {
      get: function get() {
        return styles;
      },
      set: function set(value) {
        for (var key in value) {
          styles[key] = value[key];
        }

        (0, _updateStyles2.default)(styleNode, styles, this.uid);
      },

      configurable: true
    });

    // Build attributes

    var _loop = function _loop(i) {
      var attributeName = _utils2.default.dashToCamelCase($node.attributes[i].nodeName);
      var attributeValue = $node.attributes[i].nodeValue;

      switch (attributeName) {
        case 'id':
          break;
        case 'value':
          Object.defineProperty(_this, 'value', {
            get: function get() {
              return $node.value;
            },
            set: function set(value) {
              $node.value = value;
            },

            configurable: true
          });
          break;
        case 'style':

          break;
        case 'class':
          attributes['class'] = attributeValue;
          Object.defineProperty(_this, 'class', {
            get: function get() {
              return attributes.class;
            },
            set: function set(value) {
              if (typeof value === 'string') {
                attributes.class = value;
              } else {
                attributes.class = value.join(' ');
              }
              this.node.attributes.class.nodeValue = attributes.class;
            },

            configurable: true
          });

          Object.defineProperty(_this, 'lib', {
            get: function get() {
              return lib;
            },
            set: function set(value) {
              console.log('Can\'t directly set this value');
            },

            configurable: true
          });

          attributeValue.split(' ').filter(_hasJs).forEach(function (functionClass, index, array) {
            var functionName = functionClass.substring('js-'.length);

            if (jsLib[functionName]) {
              lib[functionName] = jsLib[functionName].bind(_this, libArgs);
            }
          });

          break;
        default:
          attributes[attributeName] = $node.attributes[i].nodeValue;
          Object.defineProperty(_this, attributeName, {
            get: function get() {
              return attributes[attributeName];
            },
            set: function set(val) {
              if (attributes[attributeName] !== val) {
                attributes[attributeName] = val;
                _this.node.setAttribute(_utils2.default.camelCaseToDash(attributeName), _this.attributes[attributeName]);
              }
            }
          });
          break;
      }
    };

    for (var i = 0; i < $node.attributes.length; i++) {
      _loop(i);
    }

    if (args.init !== false) {
      this.init(libArgs);
    }
  }

  _createClass(Js, [{
    key: 'addChild',
    value: function addChild($newNodes, args, cb) {
      var _this2 = this;

      var uid;

      if ($newNodes.isVnode) {
        $newNodes.parent = this;
        this.node.appendChild($newNodes.node);
        return $newNodes;
      }

      switch ($newNodes.nodeType) {
        case 1:
          uid = _utils2.default.uid();

          _obj2.default[uid] = new Js({
            $node: $newNodes,
            parent: this,
            lib: this._jsLib,
            uid: uid,
            args: args
          });

          this.childNodes[uid] = _obj2.default[uid];

          requestAnimationFrame(function () {
            _this2.node.appendChild($newNodes);
          });

          if (typeof cb === 'function') {
            cb(this.childNodes[uid]);
          }

          return this.childNodes[uid];

        case 11:
          uid = _utils2.default.uid();

          _obj2.default[uid] = new Js({
            $node: $newNodes,
            parent: this,
            lib: this._jsLib,
            uid: uid,
            args: args
          });

          this.childNodes[uid] = _obj2.default[uid];

          requestAnimationFrame(function () {
            _this2.node.appendChild($newNodes);
          });

          if (typeof cb === 'function') {
            cb(this.childNodes[uid]);
          }

          return this.childNodes[uid];
        default:
          return {};
      }
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      var classes = this.class.split(' ');

      if (!classes.includes(className)) {
        classes.push(className);
        this.class = classes.join(' ');
      }
    }
  }, {
    key: 'bind',
    value: function bind(data) {
      var $node = this.node;

      if (!$node.childNodes.length > 1) {
        while ($node.firstChild) {
          $node.removeChild($node.firstChild);
        }
      }

      var newNode = $node.appendChild(document.createTextNode(''));

      if (data !== undefined && typeof data === 'function') {
        data(function (val, oldval) {
          newNode.nodeValue = val;
        });
      }
    }
  }, {
    key: 'clone',
    value: function clone() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var $cloned = function deepClone(vnode) {
        var $newNode = vnode.node.cloneNode();
        var key = '';

        for (key in vnode.childNodes) {
          $newNode.appendChild(deepClone(vnode.childNodes[key]));
        }
        return $newNode;
      }(this);

      return new Js({
        $node: $cloned,
        lib: this._jsLib,
        uid: _utils2.default.uid(),
        args: args
      });
    }
  }, {
    key: 'createVnode',
    value: function createVnode($node, args) {
      return new Js({
        $node: $node,
        lib: this._jsLib,
        uid: _utils2.default.uid(),
        args: args
      });
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
            cb(e);
          }, false);
        }.bind(this));
      } else {
        this.node.addEventListener(events, function (e) {
          cb(e);
        }, false);
      }
    }
  }, {
    key: 'find',
    value: function find() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
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
            if (childNode.hasOwnProperty(args[0]) || childNode.tagName === args[0]) {
              result.push(childNode);
            }
          });
          break;

        case 2:
          dig(this, function (childNode) {
            if (typeof args[1] === 'function') {
              if (childNode.hasOwnProperty(args[0]) || childNode.tagName === args[0]) {
                args[1](childNode);
                result.push(childNode);
              }
            } else if (childNode[args[0]] !== undefined && childNode[args[0]].split(' ').includes(args[1])) {
              result.push(childNode);
            } else {
              // Error not a good query
            }
          });
          break;

        case 3:
          dig(this, function (childNode) {
            if (childNode[args[0]] === args[1]) {
              args[2](childNode);
              result.push(childNode);
            }
          });
          break;
      }

      return result;
    }
  }, {
    key: 'init',
    value: function init(args) {
      for (var functionName in this._lib) {
        try {
          this._lib[functionName](args);
        } catch (error) {
          console.error(error.stack);
        }
      }
    }
  }, {
    key: 'model',
    value: function model(cb) {
      (function temp(data, parent, watch) {
        for (var key in data) {
          if (_typeof(data[key]) !== 'object') {
            (function () {
              var dataObj = new _data2.default(data, key);

              watch[key] = dataObj.watch.bind(dataObj);

              Object.defineProperty(parent, key, {
                get: function get() {
                  return dataObj.val();
                },
                set: function set(value) {
                  dataObj.set(value);
                },
                configurable: true
              });
            })();
          } else {
            parent[key] = parent[key] || {};
            watch[key] = watch[key] || {};
            temp(data[key], parent[key], watch[key]);
          }
        }
        return parent;
      })(cb(), this.data, this.watch);
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
      var _this3 = this;

      var attributeName = _utils2.default.dashToCamelCase(attribute);

      this._attributes[attributeName] = value;

      Object.defineProperty(this, attributeName, {
        get: function get() {
          return _this3._attributes[attributeName];
        },
        set: function set(val) {
          if (_this3._attributes[attributeName] !== val) {
            _this3._attributes[attributeName] = val;
            _this3.node.setAttribute(_utils2.default.camelCaseToDash(attributeName), _this3._attributes[attributeName]);
          }
        }
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function () {
  function Data(parent, key) {
    _classCallCheck(this, Data);

    this.cb = [];
    this.key = key;
    this.parent = parent;
  }

  _createClass(Data, [{
    key: 'val',
    value: function val() {
      return this.parent[this.key];
    }
  }, {
    key: 'ref',
    value: function ref() {
      return this.parent;
    }
  }, {
    key: 'set',
    value: function set(value) {
      if (this.parent[this.key] !== value) {
        var old = this.parent[this.key];

        this.parent[this.key] = value;
        this.cb.forEach(function (cb) {
          if (typeof cb === 'function') {
            cb(value, old);
          }
        });
      }
    }
  }, {
    key: 'watch',
    value: function watch(cb) {
      this.cb.push(cb);
      cb(this.val());
    }
  }]);

  return Data;
}();

exports.default = Data;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($node, lib, parent) {
  var $children = $node.childNodes;
  var children = {};
  var length = $children.length;

  if (length === 0) {
    return {};
  }

  for (var i = 0; i < length; i++) {
    var $child = $children[i];
    var keys = Object.keys(children);
    var uid = void 0;

    if ($child.nodeType === 1) {
      if (!$child.getAttribute('id')) {
        uid = _utils2.default.uid();
      } else if ($child.getAttribute('id').startsWith('_js')) {
        uid = _utils2.default.uid();
      } else {
        uid = $child.getAttribute('id');
      }

      _obj2.default[uid] = new _js2.default({
        init: false,
        lib: lib,
        $node: $child,
        parent: parent,
        uid: uid
      });

      if (keys.length > 0) {
        children[keys.pop()].next = _obj2.default[uid];
      }

      children[uid] = _obj2.default[uid];
    }
  }

  for (var key in children) {
    children[key].init();
  }

  return children;
};

var _js = __webpack_require__(2);

var _js2 = _interopRequireDefault(_js);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _obj = __webpack_require__(1);

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVnode = createVnode;

var _js = __webpack_require__(2);

var _js2 = _interopRequireDefault(_js);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _obj = __webpack_require__(1);

var _obj2 = _interopRequireDefault(_obj);

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

      _obj2.default[uid] = new _js2.default({ $node: $node, lib: this.dash, uid: uid });

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
function createVnode(args) {
  // console.log(args)
  return new _js2.default(args);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var styleNode = document.createElement('style');

  styleNode.type = 'text/css';
  return styleNode;
};

;
module.exports = exports['default'];

/***/ }),
/* 8 */
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map