import Vnode from './vnode';
import Model from './model';

export default class Js {
  
  constructor (args, behaviors) {
    this.scope = document.querySelector(args.el) || document.body;
    this.behaviors = behaviors;
  }

  init() {
    ;((cb) => {
      if (document.readyState !== 'loading') {
        cb(this)
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
            start (vnode.child)
          }

          if (vnode.next !== null) {
            start (vnode.next)
          }          
        })(vdom)

        setInterval(() => {
          (function observe (vnode) {
            let updates = {};
            
          })(vdom);
        }, 1000);

        let t1 = performance.now();

        console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
      })
    });
  }
}





// function init () {
//   if (Object.keys(this.behaviors).length > 0) {
//     let t0 = performance.now();
//     let uid = utils.uid();
//     let vdom = {};

//     self.vdom[uid] = new Vnode({
//       $node: scope
//     }, self.behaviors);

//     let t1 = performance.now();

//     console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
//     console.log(vdom)
//   } else {
//     count++;
//     if (count > 6000) {
//       console.log('Js Dash timed out, no methods found');
//       return;
//     }
//     requestAnimationFrame(init);
//   }        
// }
// requestAnimationFrame(init);


// console.log(args)
//   this.methods = {};
//   // Vars
//   let scope,
//     classPrefix,
//     methods;

//   // Define accessible methods
//   if (functions !== undefined) {
//     this.methods = functions;
//   }
  
//   // Arguments boostrapping
//   switch (typeof args) {
//     case 'string':
//       scope = document.querySelector(args);
//       break;

//     case 'object':
//       scope = document.querySelector(args.selector) || document.body;
//       classPrefix = args.classPrefix || 'js-';
//       methods = args.methods || this.methods;
//       break;

//     default:
//       scope = document.body;
//       classPrefix = 'js-';
//       methods = this.methods;
//       break;
//   };