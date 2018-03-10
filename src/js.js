import getAttributes from './getAttributes';
import getChildren from './getChildren';
import getLib from './getLib';
import getStyles from './getStyles';
import getTagName from './getTagName';
import getTemplates from './getTemplates';
import styleNode from './styleNode';
import updateStyles from './updateStyles';
import utils from './utils';

export default class Js {
  constructor (args) {
    args.$node.setAttribute('id', args.uid);

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
    this.styles = getStyles(args.$node, args.uid);
    this.templates = getTemplates(args.$node);

    this._styleNode = styleNode(this.styles, this.uid, this.node);

    this.lib = getLib(this, args.lib);
  }

  addChild ($child, cb) {
    let id = '';

    if (typeof $child === 'string') {
      $child = document.createRange().createContextualFragment($child);
    }

    if ($child.nodeType === 11) {
      for (let i = 0; i < $child.childNodes.length; i++) {
        let $node = $child.childNodes[i];

        id = utils.uid();

        if ($node.nodeType === 1) {
          this.childNodes[id] = new Js({
            $node: $node,
            parent: this,
            lib: this._jsLib,
            uid: id
          });
        }
      }

      requestAnimationFrame(() => {
        this.node.appendChild($child);
      });

      if (typeof cb === 'function') {
        cb(this.childNodes[id]);
      }
      return;
    }

    id = utils.uid();
    let frag = document.createDocumentFragment();

    this.childNodes[id] = new Js({
      $node: $child,
      parent: this,
      lib: this._jsLib,
      uid: id
    });

    requestAnimationFrame(() => {
      this.node.appendChild(frag.appendChild($child));
    });

    if (typeof cb === 'function') {
      cb(this.childNodes[id]);
    }
  };

  bind () {
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

  setStyle (...args) {

    switch (args.length) {
      case 1:
        if (typeof args[0] === 'object') {
          Object.keys(args[0]).map((key, index, array) => {
            this.styles[utils.dashToCamelCase(key)] = args[0][key];

            if (index === array.length - 1) {
              updateStyles(this._styleNode(), this.styles, this.uid);
            }
          });
        }
        break;

      case 2:
        if (typeof args[0] === 'object') {
          Object.keys(args[0]).map((key, index, array) => {
            this.styles[utils.dashToCamelCase(key)] = args[0][key];

            if (index === array.length - 1) {
              updateStyles(this._styleNode(), this.styles, this.uid, () => {
                if (typeof args[1] === 'function') {
                  args[1]();
                }
              });
            }
          });
        } else if (typeof args[0] === 'string') {
          this.styles[args[0]] = args[1];

          updateStyles(this._styleNode(), this.styles, this.uid);
        }
        break;

      case 3:
        if (typeof args[0] === 'string') {
          this.styles[args[0]] = args[1];

          updateStyles(this._styleNode(), this.styles, this.uid, () => {
            args[2]();
          });
        }
        break;
    }
  }
}
