import getAttributes from './getAttributes';
import getChildren from './getChildren';
import getContent from './getContent';
import getLib from './getLib';
import getNodeValue from './getNodeValue';
import getStyles from './getStyles';
import getTagName from './getTagName';
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
    this.childNodes = getChildren(args.$node, args.lib);
    this.content = getContent(args.$node);
    this.styles = getStyles(args.$node, args.uid);
    this.nodeType = args.$node.nodeType;
    this.tagName = getTagName(args.$node);
    this.nodeValue = getNodeValue(args.$node);
    this.value = getValue(args.$node);

    this.styleNode = styleNode(this.styles, this.uid, this.node());
    this.lib = getLib(this, args.lib);
  }

  addChild ($child, cb) {
    var id = utils.uid();
    var frag = document.createDocumentFragment();

    this.childNodes[id] = new Js({
      $node: $child,
      parent: this,
      lib: this._jsLib(),
      uid: utils.uid()
    });

    this.node().appendChild(frag.appendChild($child));

    if (typeof cb === 'function') {
      cb(this.childNodes[id]);
    }
  };

  addAttribute (attribute, value) {
    let attributeCamel = utils.dashToCamelCase(attribute);

    this.attributes[attributeCamel] = this.attributes[attributeCamel] !== undefined ?
    (this.attributes[attributeCamel] + ' ' + value).trim() : value;

    if (this.node().attributes[attribute] !== this.attributes[utils.dashToCamelCase(attribute)]) {
      this.node().setAttribute(attribute, this.attributes[utils.dashToCamelCase(attribute)]);
    }
  }

  setStyle (prop, value, cb) {
    this.styles[prop] = value;

    updateStyles(this.styleNode(), this.styles, this.uid);
  }

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

  removeAttribute (attribute, value) {
    if (value !== undefined && this.attributes[utils.dashToCamelCase(attribute)] !== undefined) {
      let attributeList = this.attributes[utils.dashToCamelCase(attribute)].split(' ');
      let index = attributeList.indexOf(value);

      if (index > -1) {
        attributeList.splice(index, 1);
        this.attributes[utils.dashToCamelCase(attribute)] = attributeList.join(' ');
      }

      if (this.node().getAttribute(attribute) !== this.attributes[utils.dashToCamelCase(attribute)]) {
        this.node().setAttribute(attribute, this.attributes[utils.dashToCamelCase(attribute)]);
      }
    } else {
      delete this.attributes[utils.dashToCamelCase(attribute)];
      this.node().removeAttribute(attribute);
    }
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
