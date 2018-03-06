import getAttributes from './getAttributes';
import getChildren from './getChildren';
import getLib from './getLib';
import getStyles from './getStyles';
import getTagName from './getTagName';
import getTemplates from './getTemplates';
import getValue from './getValue';
import styleNode from './styleNode';
import updateStyles from './updateStyles';
import utils from './utils';

export default class Js {
  constructor (args) {
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

    this.attributes = getAttributes(args.$node);
    this.childNodes = getChildren(args.$node, args.lib, this);
    this.styles = getStyles(args.$node, args.uid);
    this.templates = getTemplates(args.$node);

    if (getTagName(args.$node) === 'input') {
      this.value = getValue(args.$node);
    }

    this.lib = getLib(this, args.lib);

    this._styleNode = styleNode(this.styles, this.uid, this.node());
  }

  addChild ($child, cb) {
    let id = '';

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

      this.node().appendChild($child);

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
      lib: this._jsLib(),
      uid: id
    });

    this.node().appendChild(frag.appendChild($child));

    if (typeof cb === 'function') {
      cb(this.childNodes[id]);
    }
  };

  emit (eventName) {
    var event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: false
    });

    event.vnode = function () {
      return this;
    }.bind(this);

    this.node().dispatchEvent(event);
  }

  event (events, cb) {
    if (Array.isArray(events)) {
      events.map(function (event) {
        this.node().addEventListener(event, (e) => {
          e.stopPropagation();
          e.preventDefault();
          cb(e);
        }, false);
      }.bind(this));
    } else {
      this.node().addEventListener(events, (e) => {
        e.stopPropagation();
        e.preventDefault();
        cb(e);
      }, false);
    }
  }

  find (attribute, value, cb) {
    var result = [];

    return (function dig (vnode) {
      if (vnode !== undefined) {
        for (let key in vnode.childNodes) {
          if (vnode.childNodes[key].attributes !== undefined) {
            if (value && vnode.childNodes[key].attributes[utils.dashToCamelCase(attribute)] === value) {
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
    })(this);
  }

  remove () {
    this.node().parentNode.removeChild(this.node());
    delete this.parent().childNodes[this._uid];
  }

  setAttribute (attribute, value) {
    let attributeCamel = utils.dashToCamelCase(attribute);

    this.attributes[attributeCamel] = value;

    if (this.node().attributes[attribute] !== this.attributes[attributeCamel]) {
      this.node().setAttribute(attribute, this.attributes[utils.dashToCamelCase(attribute)]);
    }
  }

  setStyle (prop, value, cb) {
    this.styles[prop] = value;

    updateStyles(this._styleNode(), this.styles, this.uid);
  }

  text (text) {
    var firstNode = false;

    for (let key in this.childNodes) {
      if (!firstNode && this.childNodes[key].nodeType === 3) {
        if (this.childNodes[key].nodeValue !== text) {
          this.childNodes[key].nodeValue = text;
          this.childNodes[key].node().nodeValue = text;
        }
        firstNode = true;
      } else {
        delete this.childNodes[key];
        this.childNodes[key].node().remove();
      }
    }
  }
}
