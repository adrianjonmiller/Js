import utils from './utils';

export default function getAttributes ($node) {
  let attributes = {};

  if (!$node.attributes) {
    return {};
  }

  for (let i = 0; i < $node.attributes.length; i++) {
    let attributeName = $node.attributes[i].nodeName;

    if (attributeName !== 'style') {
      attributes[utils.dashToCamelCase(attributeName)] = $node.attributes[i].nodeValue;
    }
  }

  return attributes;
}
