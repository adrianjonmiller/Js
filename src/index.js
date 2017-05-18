export default class JsDash {
  constructor(scope) {
    this.lib = {};
    this._scope = scope || this.lib;

    this._ready(() => {
      this._init(document);
    });
  }

  _ready(cb) {
    if (document.readyState !== 'loading') {
      cb();
    } else {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  _init(context) {
    function _hasJs(val) {
      return val.startsWith('js-');
    }

    let els = context.querySelectorAll('[class*="js-"]');

    if (els.length > 0) {
      els.forEach((el)=>{
        el.getAttribute('class').split(' ').filter(_hasJs).forEach((behavior) => {
          var proto = behavior.substring('js-'.length);

          if (!el[proto] && this._scope[proto]) {
            try {
              (el[proto] = this._scope[proto].bind(el))();
            } catch (error) {
              console.log(error.stack);
            }
          }
        });
      });
    }
  }
}
