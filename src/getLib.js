export default function getLib (vnode, jsLib, args) {
  var lib = {};

  function _hasJs (val) {
    return val.startsWith('js-');
  };

  if (vnode.attributes.class !== undefined) {
    let jsClasses = vnode.attributes.class.split(' ').filter(_hasJs);

    for (let i = 0; i < jsClasses.length; i++) {
      let jsClass = jsClasses[i];
      let f = jsClass.substring('js-'.length);

      if (jsLib[f]) {
        lib[f] = jsLib[f].bind(vnode, args);
      }
    }

    for (let func in lib) {
      try {
        (lib[func])();
      } catch (error) {
        console.error(error.stack);
      }
    }
  }

  return lib;
};
