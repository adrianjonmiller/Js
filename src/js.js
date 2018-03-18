import Data from './data';
import getChildren from './getChildren';
import getTagName from './getTagName';
import getTemplates from './getTemplates';
import createStyleNode from './styleNode';
import updateStyles from './updateStyles';
import utils from './utils';

export default class Js {
  constructor (args) {
    const $node = args.$node;
    const parent = args.parent;
    const jsLib = args.lib;
    const uid = args.uid;
    const libArgs = args.args !== undefined ? args.args : null;
    const styleNode = createStyleNode();
    const lib = {};
    const styles = {};
    const attributes = {};

    this.data = {};
    this.watch = {};
    this.tagName = getTagName($node);
    this.childNodes = getChildren($node, jsLib, this);

    // Reference to the vnode parent
    if (parent !== undefined) {
      Object.defineProperty(this, 'parent', {
        get () {
          return parent;
        },
        set () {
          console.log('Can\'t change parent');
        }
      });
    }

    // Create the UID of the vnode
    if (args.uid !== undefined) {
      $node.setAttribute('id', uid);

      Object.defineProperty(this, 'uid', {
        get () {
          return uid;
        },
        set () {
          console.log('Can\'t change UID');
        }
      });
    };

    // Referencd to the document node
    Object.defineProperty(this, 'node', {
      get () {
        return $node;
      },
      set () {
        console.log('Can\'t redefine document node');
      }
    });

    // Import the lib from the parent
    Object.defineProperty(this, '_jsLib', {
      get () {
        return jsLib;
      },
      set () {
        console.log('Can\'t set the lib');
      }
    });

    // Build attributes
    for (let i = 0; i < $node.attributes.length; i++) {
      let attributeName = utils.dashToCamelCase($node.attributes[i].nodeName);
      let attributeValue = $node.attributes[i].nodeValue

      function _hasJs (val) {
        return val.startsWith('js-');
      };

      function _notHasJs (val) {
        return !val.startsWith('js-');
      };

      switch (attributeName) {
        case 'id':
          break;
        case 'style':
          Object.defineProperty(this, 'style', {
            get () {
              return styles;
            },
            set (value) {
              for (let key in value) {
                styles[key] = value[key];
              }

              updateStyles(styleNode, styles, this.uid);
            },
            configurable: true
          });
          break;
        case 'class':
          attributes['class'] = attributeValue;
          Object.defineProperty(this, 'class', {
            get () {
              return attributes.class
            },
            set (value) {
              if (typeof value === 'string') {
                attributes.class = value;
              } else {
                attributes.class = value.join(' ')
              }
              this.node.attributes.class.nodeValue = attributes.class
            },
            configurable: true
          });

          Object.defineProperty(this, 'lib', {
            get () {
              return lib
            },
            set (value) {
              console.log('Can\'t directly set this value')
            },
            configurable: true
          });

          attributeValue.split(' ').filter(_hasJs).forEach((functionClass, index, array) => {
            let functionName = functionClass.substring('js-'.length);

            if (jsLib[functionName]) {
              lib[functionName] = jsLib[functionName].bind(this, args);
            }
          })

          break;
        default:
          attributes[attributeName] = $node.attributes[i].nodeValue;
          Object.defineProperty(this, attributeName, {
            get: () => {
              return attributes[attributeName]
            },
            set: (val) => {
              if (attributes[attributeName] !== val) {
                attributes[attributeName] = val
                this.node.setAttribute(attribute, this.attributes[utils.dashToCamelCase(attribute)]);
              }
            }
          })
          break;
      }
    }

    for (let functionName in lib) {
      try {
        (lib[functionName])();
      } catch (error) {
        console.error(error.stack);
      }
    }
  }

  addChild ($newNodes, args, cb) {
    var uid;

    switch ($newNodes.nodeType) {
      case 1:
        uid = utils.uid();

        this.childNodes[uid] = new Js({
          $node: $newNodes,
          parent: this,
          lib: this._jsLib,
          uid: uid,
          args: args
        });

        requestAnimationFrame(() => {
          this.node.appendChild($newNodes);
        });

        if (typeof cb === 'function') {
          cb(this.childNodes[uid]);
        }

        return this.childNodes[uid];

      case 11:
        uid = utils.uid();

        this.childNodes[uid] = new Js({
          $node: $newNodes,
          parent: this,
          lib: this._jsLib,
          uid: uid,
          args: args
        });

        requestAnimationFrame(() => {
          this.node.appendChild($newNodes);
        });

        if (typeof cb === 'function') {
          cb(this.childNodes[uid]);
        }

        return this.childNodes[uid];
      default:
        return {};
    }
  };

  addClass (className) {
    let classes = this.class.split(' ');

    console.log();

    if (!classes.includes(className)) {
      classes.push(className);
      this.class = classes.join(' ');
    }
  }

  bind (data) {
    var $node = this.node;

    if (!$node.childNodes.length > 1) {
      while ($node.firstChild) {
        $node.removeChild($node.firstChild);
      }
    }

    let newNode = $node.appendChild(document.createTextNode(''));

    if (data !== undefined && typeof data === 'function') {
      data((val, oldval) => {
        newNode.nodeValue = val;
      });
    }
  }

  emit (eventName) {
    var event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: false
    });

    event.vnode = function () {
      return this;
    }.bind(this);

    this.node.dispatchEvent(event);
  }

  event (events, cb) {
    if (Array.isArray(events)) {
      events.map(function (event) {
        this.node.addEventListener(event, (e) => {
          cb(e);
        }, false);
      }.bind(this));
    } else {
      this.node.addEventListener(events, (e) => {
        cb(e);
      }, false);
    }
  }

  find (...args) {
    var result = [];

    function dig (vnode, cb) {
      for (let key in vnode.childNodes) {
        cb(vnode.childNodes[key]);
        dig(vnode.childNodes[key], cb);
      }
    }

    switch (args.length) {
      case 1:
        dig(this, (childNode) => {
          if (childNode.hasOwnProperty(args[0])) {
            result.push(childNode);
          }
        });
        break;

      case 2:
        dig(this, (childNode) => {
          if (typeof args[1] === 'function') {
            if (childNode.hasOwnProperty(args[0])) {
              args[1](childNode);
              result.push(childNode);
            }
          } else if (childNode[args[0]].split(' ').includes(args[1])) {
            result.push(childNode);
          } else {
            // Error not a good query
          }
        });
        break;

      case 3:
        dig(this, (childNode) => {
          if (childNode[args[0]] === args[1]) {
            args[2](childNode);
            result.push(childNode);
          }
        });
        break;
    }

    return result;
  }

  model (cb) {
    (function temp (data, parent, watch) {
      for (let key in data) {
        if (typeof data[key] !== 'object') {
          let dataObj = new Data(data, key);

          watch[key] = dataObj.watch.bind(dataObj);

          Object.defineProperty(parent, key, {
            get: () => {
              return dataObj.val();
            },
            set: (value) => {
              dataObj.set(value);
            },
            configurable: true
          });
        } else {
          parent[key] = parent[key] || {};
          watch[key] = watch[key] || {};
          temp(data[key], parent[key], watch[key]);
        }
      }
      return parent;
    })(cb(), this.data, this.watch);
  };

  remove () {
    this.node.parentNode.removeChild(this.node);
    delete this.parent.childNodes[this._uid];
  }

  setAttribute (attribute, value) {
    let attributeCamel = utils.dashToCamelCase(attribute);

    this.attributes[attributeCamel] = value;

    if (this.node.attributes[attribute] !== this.attributes[attributeCamel]) {
      this.node.setAttribute(attribute, this.attributes[utils.dashToCamelCase(attribute)]);
    }
  }
}
