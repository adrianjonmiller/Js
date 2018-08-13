import Vnode from './vnode';
import Model from './model';

export default class Js {
  constructor (behaviors) {
    this.behaviors = behaviors;
  }
  
  init (el) {
    this.scope = document.querySelector(el) || document.body;
    ;((cb) => {
      if (document.readyState !== 'loading') {
        cb(this);
      } else {
        document.addEventListener('DOMContentLoaded', cb(this));
      }
    })((self) => {
      requestAnimationFrame(() => {
        let t0 = performance.now();
        var model = new Model(this.scope);
        var vdom = new Vnode(model, this.behaviors);

        ;(function start (vnode) {
          vnode.init();

          if (vnode.child !== null) {
            start(vnode.child);
          }

          if (vnode.next !== null) {
            start(vnode.next);
          }
        })(vdom);

        let t1 = performance.now();

        console.log('JSI attached in ' + (t1 - t0) + ' milliseconds.');
      });
    });
  }
}
