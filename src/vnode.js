import Data from './data';
import Model from './model';
import utils from './utils';

export default class Vnode {
  constructor (model, behaviors) {
    this.methods = {};
    this.watch = {};

    this.model(model);

    if (model.child()) {
      model.child().parent(this);
      this.child = new Vnode(model.child(), behaviors);
    }

    if (model.next()) {
      model.next().prev(this);
      model.next().parent(this.parent);
      this.next = new Vnode(model.next(), behaviors);
    }

    if (this.behaviors.length > 0) {
      this.behaviors.filter(val => {
        return Object.keys(behaviors).indexOf(val) > -1;
      }).map((behavior, index, array) => {
        this.methods[behavior] = behaviors[behavior].bind(this);
      });
    }
  }

  states (value) {
    this.state = value
  }

  on (event, cb) {
    this.events = {
      name: event,
      fn: cb
    };
  }

  emit (event, payload) {
    payload = payload || this;

    this.emitEvent = [event, payload];
  }

  addChild ($newNode, behaviors) {
    let child = new Model($newNode);

    this.children[child.id] = new Vnode(child, behaviors);

    this.$node.appendChild(child.$node);
  }

  addClass (addedClass) {
    let classList = this.class.split(' ');
    let index = classList.indexOf(addedClass);

    if (index === -1) {
      classList.push(addedClass);
      this.class = classList.join(' ').trim();
    }
    return this.class;
  }

  event (event, cb) {
    this.$node.addEventListener(event, cb);
  }

  find (attrName, value, cb) {
    let result = [];

    attrName = utils.dashToCamelCase(attrName);

    (function dig (vnode) {
      if (vnode !== null) {
        if (vnode[attrName] !== undefined && vnode[attrName].indexOf(value) > -1) {
          if (typeof cb === 'function') {
            cb(vnode);
          }

          result.push(vnode);
        }
      }

      if (vnode.child !== null) {
        dig(vnode.child);
      }

      if (vnode.next !== null) {
        dig(vnode.next);
      }

    })(this.child);
    return result;
  }

  removeClass (addedClass) {
    this.class = this.class.replace(new RegExp('(^|\\b)' + addedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    return this.class;
  }

  init () {
    var self = this;

    for (let functionName in this.methods) {
      try {
        (this.methods[functionName])();
      } catch (error) {
        console.error(error.stack);
      }
    }

    this.states({
      default: {
        top: self.top,
        bottom: self.bottom,
        left: self.left,
        right: self.right,
        width: self.width,
        height: self.height,
        style: JSON.parse(JSON.stringify(self.style))
      }
    })
  }

  model (model, self) {
    var root = this;

    self = self || this;

    function bind (d, k, s, config) {
      var data = new Data(d);

      if (typeof root.watch[k] === 'function') {
        data.addWatcher(root.watch[k], self);
      }

      Object.defineProperty(s, k, {
        get: () => {
          return data.get();
        },
        set: (val) => {
          data.set(val);
        },
        configurable: config
      });
    }

    for (let key in model) {
      switch (typeof model[key]) {
        case 'object':
          if (model[key] instanceof HTMLElement) {
            bind(model[key], key, self, false);
          } else {
            bind(model[key], key, self, true);
            self[key] = self[key] || {};
            this.model(model[key], self[key]);
          }
          break;

        case 'function':
          bind(model[key], key, self, true);
          break;

        default:
          bind(model[key], key, self, true);
          break;
      }
    }
  }
}
