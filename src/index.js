import Js from './js';
import utils from './utils';
import obj from './obj';

export default class JsDash {
  constructor (selector) {
    let $node = document.querySelector(selector) || document.body;

    this.dash = {};

    ((cb) => {
      if (document.readyState !== 'loading') {
        cb(this);
      } else {
        document.addEventListener('DOMContentLoaded', cb(this));
      }
    })(() => {
      function boostrap () {
        let t0 = performance.now();
        let uid = $node.getAttribute('id') ? $node.getAttribute('id') : utils.uid();

        obj[uid] = new Js({$node: $node, lib: this.dash, uid: uid});

        let t1 = performance.now();

        console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
      }

      if (Object.keys(this.dash).length === 0) {
        let check = setInterval(function () {
          if (Object.keys(this.dash).length !== 0) {
            boostrap.bind(this)();
            clearInterval(check);
          }
        }.bind(this), 1);
      } else {
        boostrap.bind(this)();
      }
    });
  }
}

export function createVnode (args) {
  // console.log(args)
  return new Js(args);
}
