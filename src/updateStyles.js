import utils from './utils';
const head = document.head || document.querySelector('head');

export default function (styleNode, styles, uid, cb) {
  var css = '#' + uid + '{';

  return new Promise((resolve, reject) => {
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

        resolve();
      }
    });
  });
}
