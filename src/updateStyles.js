import utils from './utils';

export default function (styleNode, styles, uid, cb) {
  var head = document.head || document.querySelector('head');
  var css = '#' + uid + '{';

  Object.keys(styles).forEach((prop, index, array) => {
    if (styles[prop] !== '') {
      css += utils.camelCaseToDash(prop) + ':' + styles[prop] + ';';
    } else {
      delete styles[prop];
    }

    if (index === array.length - 1) {
      css += '}';

      if (styleNode.styleSheet) {
        styleNode.styleSheet.cssText = css;
      } else {
        styleNode.innerHTML = '';
        styleNode.appendChild(document.createTextNode(css));
      }

      if (!styleNode.parentNode) {
        head.appendChild(styleNode);
      }

      if (typeof cb === 'function') {
        cb();
      }
    }
  });
}
