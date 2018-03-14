import Data from './data';
import getAttributes from './getAttributes';
import getChildren from './getChildren';
import getLib from './getLib';
import getTagName from './getTagName';
import getTemplates from './getTemplates';
import createStyleNode from './styleNode';
import updateStyles from './updateStyles';
import utils from './utils';

export default class Js {
  constructor (args) {
    var libArgs = args.args !== undefined ? args.args : null;
    var styles = {};
    var styleNode = createStyleNode();

    this.data = {};
    this.watch = {};

    // Reference to the vnode parent
    if (args.parent !== undefined) {
      Object.defineProperty(this, 'parent', {
        get () {
          return args.parent;
        },
        set () {
          console.log('Can\'t change parent');
        }
      });
    }

    // Create the UID of the vnode
    if (args.uid !== undefined) {
      args.$node.setAttribute('id', args.uid);

      Object.defineProperty(this, 'uid', {
        get () {
          return args.uid;
        },
        set () {
          console.log('Can\'t change UID');
        }
      });
    };

    // Referencd to the document node
    Object.defineProperty(this, 'node', {
      get () {
        return args.$node;
      },
      set () {
        console.log('Can\'t redefine document node');
      }
    });

    // Set styles
    Object.defineProperty(this, 'styles', {
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

    // Import the lib from the parent
    Object.defineProperty(this, '_jsLib', {
      get () {
        return args.lib;
      },
      set () {
        console.log('Can\'t set the lib');
      }
    });

    // Setting value if an input
    if (args.$node.tagName === 'INPUT') {
      Object.defineProperty(this, 'value', {
        get () {
          return this.node.value;
        },
        set (value) {
          this.node.value = value;
        }
      });
    }

    this.attributes = getAttributes(args.$node);
    this.tagName = getTagName(args.$node);
    this.childNodes = getChildren(args.$node, args.lib, this);
    this.templates = getTemplates(args.$node);

    this.lib = getLib(this, args.lib, libArgs);
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
        newNode.nodeValue = val
      })
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
          if (childNode.attributes.hasOwnProperty(args[0])) {
            result.push(childNode);
          }
        });
        break;

      case 2:
        dig(this, (childNode) => {
          if (typeof args[1] === 'function') {
            if (childNode.attributes.hasOwnProperty(args[0])) {
              args[1](childNode);
              result.push(childNode);
            }
          } else if (childNode.attributes[args[0]].split(' ').includes(args[1])) {
            result.push(childNode);
          } else {
            // Error not a good query
          }
        });
        break;

      case 3:
        dig(this, (childNode) => {
          if (childNode.attributes[args[0]] === args[1]) {
            args[2](childNode);
            result.push(childNode);
          }
        });
        break;
    }

    if (result.length === 1) {
      return result[0]
    }

    return result;
  }

  model (cb) {
    (function temp (data, parent, watch) {
      for (let key in data) {
        if (typeof data[key] !== 'object') {
          let dataObj = new Data(data, key);
          watch[key] = dataObj.watch.bind(dataObj)

          Object.defineProperty(parent, key, {
            get: () => {
              dataObj.val()
            },
            set: (value) => {
              dataObj.set(value)
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
