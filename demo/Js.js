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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($node, lib) {
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
    }

    children[uid] = (0, _toJSON2.default)($children[i], $node, lib, uid);
  }

  return children;
};

var _toJSON = __webpack_require__(13);

var _toJSON2 = _interopRequireDefault(_toJSON);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getAttributes = __webpack_require__(4);

var _getAttributes2 = _interopRequireDefault(_getAttributes);

var _getChildren = __webpack_require__(1);

var _getChildren2 = _interopRequireDefault(_getChildren);

var _getContent = __webpack_require__(5);

var _getContent2 = _interopRequireDefault(_getContent);

var _getLib = __webpack_require__(9);

var _getLib2 = _interopRequireDefault(_getLib);

var _getNodeValue = __webpack_require__(6);

var _getNodeValue2 = _interopRequireDefault(_getNodeValue);

var _getStyles = __webpack_require__(10);

var _getStyles2 = _interopRequireDefault(_getStyles);

var _getTagName = __webpack_require__(2);

var _getTagName2 = _interopRequireDefault(_getTagName);

var _getValue = __webpack_require__(7);

var _getValue2 = _interopRequireDefault(_getValue);

var _styleNode = __webpack_require__(12);

var _styleNode2 = _interopRequireDefault(_styleNode);

var _updateStyles = __webpack_require__(8);

var _updateStyles2 = _interopRequireDefault(_updateStyles);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Js = function () {
  function Js(args) {
    _classCallCheck(this, Js);

    args.$node.setAttribute('id', args.uid);

    if (args.parent !== undefined) {
      this.parent = function () {
        return args.parent;
      };
    }

    if (args.uid !== undefined) {
      this.uid = args.uid;
    }

    this.node = function () {
      return args.$node;
    };

    this._jsLib = function () {
      return args.lib;
    };

    this.attributes = (0, _getAttributes2.default)(args.$node);
    this.childNodes = (0, _getChildren2.default)(args.$node, args.lib);
    this.content = (0, _getContent2.default)(args.$node);
    this.styles = (0, _getStyles2.default)(args.$node, args.uid);
    this.nodeType = args.$node.nodeType;
    this.tagName = (0, _getTagName2.default)(args.$node);
    this.nodeValue = (0, _getNodeValue2.default)(args.$node);
    this.value = (0, _getValue2.default)(args.$node);

    this.styleNode = (0, _styleNode2.default)(this.styles, this.uid, this.node());
    this.lib = (0, _getLib2.default)(this, args.lib);
  }

  _createClass(Js, [{
    key: 'addChild',
    value: function addChild($child, cb) {
      var id = _utils2.default.uid();
      var frag = document.createDocumentFragment();

      this.childNodes[id] = new Js({
        $node: $child,
        parent: this,
        lib: this._jsLib(),
        uid: _utils2.default.uid()
      });

      this.node().appendChild(frag.appendChild($child));

      if (typeof cb === 'function') {
        cb(this.childNodes[id]);
      }
    }
  }, {
    key: 'addAttribute',
    value: function addAttribute(attribute, value) {
      var attributeCamel = _utils2.default.dashToCamelCase(attribute);

      this.attributes[attributeCamel] = this.attributes[attributeCamel] !== undefined ? (this.attributes[attributeCamel] + ' ' + value).trim() : value;

      if (this.node().attributes[attribute] !== this.attributes[_utils2.default.dashToCamelCase(attribute)]) {
        this.node().setAttribute(attribute, this.attributes[_utils2.default.dashToCamelCase(attribute)]);
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(prop, value, cb) {
      this.styles[prop] = value;

      (0, _updateStyles2.default)(this.styleNode(), this.styles, this.uid);
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

      this.node().dispatchEvent(event);
    }
  }, {
    key: 'event',
    value: function event(events, cb) {
      if (Array.isArray(events)) {
        events.map(function (event) {
          this.node().addEventListener(event, function (e) {
            e.stopPropagation();
            e.preventDefault();
            cb(e);
          }, false);
        }.bind(this));
      } else {
        this.node().addEventListener(events, function (e) {
          e.stopPropagation();
          e.preventDefault();
          cb(e);
        }, false);
      }
    }
  }, {
    key: 'find',
    value: function find(attribute, value, cb) {
      var result = [];

      return function dig(vnode) {
        if (vnode !== undefined) {
          for (var key in vnode.childNodes) {
            if (vnode.childNodes[key].attributes !== undefined) {
              if (value && vnode.childNodes[key].attributes[_utils2.default.dashToCamelCase(attribute)] === value) {
                result.push(vnode.childNodes[key]);

                if (typeof cb === 'function') {
                  cb(vnode.childNodes[key]);
                }
              } else if (attribute in vnode.childNodes[key].attributes) {
                result.push(vnode.childNodes[key]);

                if (typeof value === 'function') {
                  value(vnode.childNodes[key]);
                }
              }
            }

            if (vnode.childNodes !== undefined) {
              dig(vnode.childNodes[key]);
            }
          }
        }

        return result;
      }(this);
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.node().parentNode.removeChild(this.node());
      delete this.parent().childNodes[this._uid];
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(attribute, value) {
      if (value !== undefined && this.attributes[_utils2.default.dashToCamelCase(attribute)] !== undefined) {
        var attributeList = this.attributes[_utils2.default.dashToCamelCase(attribute)].split(' ');
        var index = attributeList.indexOf(value);

        if (index > -1) {
          attributeList.splice(index, 1);
          this.attributes[_utils2.default.dashToCamelCase(attribute)] = attributeList.join(' ');
        }

        if (this.node().getAttribute(attribute) !== this.attributes[_utils2.default.dashToCamelCase(attribute)]) {
          this.node().setAttribute(attribute, this.attributes[_utils2.default.dashToCamelCase(attribute)]);
        }
      } else {
        delete this.attributes[_utils2.default.dashToCamelCase(attribute)];
        this.node().removeAttribute(attribute);
      }
    }
  }, {
    key: 'text',
    value: function text(_text) {
      var firstNode = false;

      for (var key in this.childNodes) {
        if (!firstNode && this.childNodes[key].nodeType === 3) {
          if (this.childNodes[key].nodeValue !== _text) {
            this.childNodes[key].nodeValue = _text;
            this.childNodes[key].node().nodeValue = _text;
          }
          firstNode = true;
        } else {
          delete this.childNodes[key];
          this.childNodes[key].node().remove();
        }
      }
    }
  }]);

  return Js;
}();

exports.default = Js;
module.exports = exports['default'];

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContent;

var _getChildren = __webpack_require__(1);

var _getChildren2 = _interopRequireDefault(_getChildren);

var _getTagName = __webpack_require__(2);

var _getTagName2 = _interopRequireDefault(_getTagName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContent($node, lib) {
  if (!$node.content) {
    return null;
  }

  return {
    childNodes: (0, _getChildren2.default)($node, lib),
    nodeType: $node.nodeType,
    tagName: (0, _getTagName2.default)($node.content)
  };
};
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeValue;
function getNodeValue($node) {
  return $node.nodeValue ? $node.nodeValue : null;
};
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValue;
function getValue($node) {
  return $node.value ? $node.value : null;
};
module.exports = exports["default"];

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

/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _js = __webpack_require__(3);

var _js2 = _interopRequireDefault(_js);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsDash = function JsDash(selector) {
  var _this = this;

  _classCallCheck(this, JsDash);

  var $node = document.querySelector(selector) || document.body;

  this.lib = {};

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

      this.vnode = new _js2.default({ $node: $node, lib: this.lib, uid: uid });

      var t1 = performance.now();

      console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
    }

    if (Object.keys(_this.lib).length === 0) {
      var check = setInterval(function () {
        if (Object.keys(this.lib).length !== 0) {
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

var _updateStyles = __webpack_require__(8);

var _updateStyles2 = _interopRequireDefault(_updateStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toJSON;

var _getAttributes = __webpack_require__(4);

var _getAttributes2 = _interopRequireDefault(_getAttributes);

var _getContent = __webpack_require__(5);

var _getContent2 = _interopRequireDefault(_getContent);

var _getChildren = __webpack_require__(1);

var _getChildren2 = _interopRequireDefault(_getChildren);

var _getNodeValue = __webpack_require__(6);

var _getNodeValue2 = _interopRequireDefault(_getNodeValue);

var _getTagName = __webpack_require__(2);

var _getTagName2 = _interopRequireDefault(_getTagName);

var _getValue = __webpack_require__(7);

var _getValue2 = _interopRequireDefault(_getValue);

var _js = __webpack_require__(3);

var _js2 = _interopRequireDefault(_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toJSON($node, parent, lib, uid) {
  switch ($node.nodeType) {
    case 1:
      // Element
      return new _js2.default({
        $node: $node,
        parent: parent,
        lib: lib,
        uid: uid
      });

    case 3:
      // Text Node
      return {
        nodeType: $node.nodeType,
        nodeValue: (0, _getNodeValue2.default)($node),
        tagName: (0, _getTagName2.default)($node)
      };

    case 8:
      return {
        nodeType: $node.nodeType,
        nodeValue: (0, _getNodeValue2.default)($node),
        tagName: (0, _getTagName2.default)($node)
      };

    case 9:
      // DOCUMENT_NODE
      return {
        attributes: (0, _getAttributes2.default)($node),
        childNodes: (0, _getChildren2.default)($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: (0, _getTagName2.default)($node),
        value: (0, _getValue2.default)($node)
      };

    case 10:
      // DOCUMENT_TYPE_NODE
      return {
        attributes: (0, _getAttributes2.default)($node),
        childNodes: (0, _getChildren2.default)($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: (0, _getTagName2.default)($node),
        value: (0, _getValue2.default)($node)
      };

    case 11:
      // DOCUMENT_FRAGMENT_NODE
      return {
        attributes: (0, _getAttributes2.default)($node),
        content: (0, _getContent2.default)($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: (0, _getTagName2.default)($node),
        value: (0, _getValue2.default)($node)
      };

    default:
      return null;
  }
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Js.js.map