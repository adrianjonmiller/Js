import Data from './data';
import utils from './utils';
import Model from './model';

export default class Vnode {
  constructor (model, behaviors) {
    this.methods = {};
    this.watch = {};

    this.model(model);

    if (model.child()) {
      model.child().parent(this)
      this.child = new Vnode(model.child(), behaviors);
    }

    if (model.next()) {
      model.next().prev(this);
      model.next().parent(this.parent);
      this.next = new Vnode(model.next(), behaviors);
    }

    if (this.behaviors.length > 0) {
      this.behaviors.filter(val => {
        return Object.keys(behaviors).indexOf(val) > -1
      }).map((behavior, index, array) => {
        this.methods[behavior] = behaviors[behavior].bind(this);
      })
    }
  }

  on (event, cb) {
    this.events = {
      name: event,
      fn: cb
    }
  }

  emit (event) {
    this.emitEvent = event;
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
    (function dig(children) {
      for (let uid in children) {
        let child = children[uid];
        dig(child.children);
        if (child[attrName] !== undefined && child[attrName].indexOf(value) > -1) {
          result.push(child);
          if (typeof cb === 'function') {
            cb(child);
          }
        }
      }
    })(this.children);
    return result;
  }

  removeClass (addedClass) {
    this.class = this.class.replace(new RegExp('(^|\\b)' + addedClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    return this.class;
  }

  offset (args) {

    if (this.prev) {
      this.top = parseInt(args.y, 10) + this.prev.bottom;

      this.prev.event('widthUpdated', (e) => {
        console.log(e)
        if (this.prev.id === e.detail.id) {
          e.preventDefault();
          console.log(e)
          this.top = parseInt(args.y, 10) + this.prev.bottom;
        }
      });
    }
  }

  init () {
    for (let functionName in this.methods) {
      try {
        (this.methods[functionName])();
      } catch (error) {
        console.error(error.stack);
      }
    }
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
          data.set(val)
        },
        configurable: config
      })
    }

    for (let key in model) {
      switch(typeof model[key]) {
        case 'object':
          if (model[key] instanceof HTMLElement) {
            bind(model[key], key, self, false);
          } else {
            bind(model[key], key, self, true);
            self[key] = self[key] || {};
            this.model(model[key], self[key])
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
