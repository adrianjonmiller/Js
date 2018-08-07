import utils from './utils';

const head = document.head || document.querySelector('head');

export default class Model {
  constructor ($node) {
    const id = $node.getAttribute('id') || utils.uid();
    var model = {};
    var lastChild = null;

    this.id = id;
    this.$node = $node;
    this.style = {};
    this.class = $node.getAttribute('class') || '';
    this.$styleNode = document.createElement('style');
    this.$styleNode.type = 'text/css';
    this.attributes = {};
    this.events = {
      styleUpdated: [() => {
        var style = `#${this.id}{`;

        for (let prop in this.style) {
          style += `${utils.camelCaseToDash(prop)}:${this.style[prop]};`;
        }

        style += '}';

        if (this.$styleNode.parentNode === null) {
          head.appendChild(this.$styleNode);
        }

        this.$styleNode.innerHTML = style;
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

    model = {
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

    for (let i = 0; i < $node.childNodes.length; i++) {
      let $child = $node.childNodes[i];

      if ($child.nodeType === 1) {
        let child = new Model($child);

        if (lastChild === null) {
          this.child = child;
        } else {
          lastChild.next(child);
        }
        lastChild = child;
      }
    }

    for (let i = 0; i < $node.attributes.length; i++) {
      let attrName = utils.dashToCamelCase($node.attributes[i].nodeName);
      let $attrValue = $node.attributes[i].nodeValue;

      if (attrName !== 'id' && attrName !== 'dataBehavior' && attrName !== 'style' && attrName !== 'value') {
        this[attrName] = $attrValue;

        model[attrName] = (val) => {
          if (!val) {
            return this[attrName];
          } else if (val !== this.attributes[attrName]) {
            this.attrName = val;
            this.$node.setAttribute(utils.camelCaseToDash(this.attrName), val);
          }

          return this[attrName];
        };
      }
    }

    if (model.tagName === 'input') {
      model.value = this.valueHandler.bind(this);
    }

    return model;
  }

  // DOM Handlers ********************************************************

  childHandler (child) {
    if (!child) {
      return this.child;
    }

    this.child = child;
    return this.child;
  }

  nextHandler (next) {
    if (!next) {
      return this.next;
    }

    this.next = next;
    return this.next;
  }

  prevHandler (prev) {
    if (!prev) {
      return this.prev;
    }

    this.prev = prev;
    return this.prev;
  }

  parentHandler (parent) {
    if (!parent) {
      return this.parent;
    }

    this.parent = parent;
    return this.parent;
  }

  // Position Handlers ********************************************************

  bottomHandler (bottom) {
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

  topHandler (top) {
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

  leftHandler (left) {
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

  rightHandler (right) {
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

  widthHandler (width) {
    if (!width) {
      return this.width;
    }

    if (this.width !== width) {
      this.width = width;
      this.style.width = this.width + 'px';
      this.setStyles();
    }

    return this.width;
  }

  heightHandler (height) {
    if (!height) {
      return this.height;
    }

    height = parseInt(height, 10);
    if (this.height !== height) {
      this.style.height = this.height + 'px';
      this.setStyles();
    }

    return this.height;
  }

  // Events ********************************************************

  eventHandler (event) {
    if (this.events[event] !== undefined) {
      this.events[event].map((fn) => {
        requestAnimationFrame(fn);
      });
    }
  }

  queueHandler (event) {
    if (!this.events[event.name]) {
      this.events[event.name] = [];
    }
    this.events[event.name].push(event.fn);
  }

  // Class ********************************************************

  classHandler (newClass) {
    if (!newClass) {
      return this.class;
    }

    if (this.class !== newClass) {
      this.$node.setAttribute('class', newClass);
      this.class = newClass;
    }

    return this.class;
  }

  // Styles ********************************************************

  styleHandler (style) {
    if (!style) {
      this.eventHandler('styleUpdated');
      return this.style;
    }

    if (typeof style === 'object') {
      for (let prop in style) {
        this.style[prop] = style[prop];
      }
      this.eventHandler('styleUpdated');
    }

    return this.style;
  }

  // Value Handler ********************************************************

  valueHandler (value) {
    if (!value) {
      return this.value;
    } else if (this.value !== value) {
      this.value = value;
      this.$node.value = this.value;
    }
    return this.value;
  }
}
