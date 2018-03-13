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
    var styles = {};
    var styleNode = createStyleNode();
    this.data = {}

    var libArgs = args.args !== undefined ? args.args : null;

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
    var children = {}

    switch ($newNodes.nodeType) {
      case 1:
        let uid = utils.uid();
        let frag = document.createDocumentFragment();

        this.childNodes[uid] = new Js({
          $node: $newNodes,
          parent: this,
          lib: this._jsLib,
          uid: uid,
          args: args
        });

        requestAnimationFrame(() => {
          this.node.appendChild(frag.appendChild($newNodes));
        });

        return this.childNodes[uid]
        break;

      case 11:

        break;
    }
  };

  bind (data) {
    var $node = this.node;

    while ($node.firstChild) {
      $node.removeChild($node.firstChild);
    }

    return $node.appendChild(document.createTextNode(''));
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
          e.stopPropagation();
          e.preventDefault();
          cb(e);
        }, false);
      }.bind(this));
    } else {
      this.node.addEventListener(events, (e) => {
        e.stopPropagation();
        e.preventDefault();
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
          } else if (childNode.attributes[args[0]] === args[1]) {
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

    return result;
  }

  model (cb) {
    (function temp (data, parent) {
      for (let key in data) {
        if (typeof data[key] !== 'object') {
          let dataObj = new Data(data, key);

          Object.defineProperty(parent, key, {
            get: () => dataObj,
            configurable: true
          });
        } else {
          parent[key] = parent[key] || {};
          temp(data[key], parent[key]);
        }
      }
      return parent;
    })(cb(), this.data);
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
