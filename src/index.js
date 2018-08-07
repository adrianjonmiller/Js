import Vnode from './vnode';
import Model from './model';

export default class Js {

  constructor (args, behaviors) {
    this.scope = document.querySelector(args.el) || document.body;
    this.behaviors = behaviors;
  }

  init () {
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

        console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
      });
    });
  }
}
