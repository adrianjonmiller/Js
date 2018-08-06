import utils from './utils';

export default function ($node, uid) {
  let styles = {};

  if (!$node.attributes) {
    return {};
  }

  for (let i = 0; i < $node.attributes.length; i++) {
    let attributeName = $node.attributes[i].nodeName;

    if (attributeName === 'style') {
      let styleStrings = $node.attributes[i].nodeValue.split(';');

      for (let i in styleStrings) {
        if (styleStrings[i].trim() !== '') {
          let styleString = styleStrings[i].split(':');
          let value = styleString.slice(1, styleString.length);

          styles[utils.dashToCamelCase(styleString[0].trim())] = value.join('').trim();
        }
      }
    }
  }

  return styles;
}
