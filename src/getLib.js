export default function getLib (vnode, jsLib) {
  var lib = {};
  var jsClasses = [];
  var func;
  var i = 0;

  function _hasJs (val) {
    return val.startsWith('js-');
  };

  if (vnode.attributes.class !== undefined) {
    jsClasses = vnode.attributes.class.split(' ').filter(_hasJs);

    for (i; i < jsClasses.length; i++) {
      let jsClass = jsClasses[i];
      let f = jsClass.substring('js-'.length);

      if (jsLib[f]) {
        lib[f] = jsLib[f].bind(vnode);
      }
    }

    for (func in lib) {
      try {
        (lib[func])();
      } catch (error) {
        console.error(error.stack);
      }
    }
  }

  return lib;
};
