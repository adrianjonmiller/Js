import utils from './utils';

export default function ($node, data) {
  var $children = $node.childNodes;
  var length = $children.length;
  let templates = {};

  if (length === 0) {
    return null;
  }

  for (let i in $children) {
    let $child = $children[i];

    if ($child.tagName === 'TEMPLATE') {
      let uid = $child.getAttribute('id') ? $child.getAttribute('id') : utils.uid();

      templates[uid] = $child.content;
    }
  }

  return templates;
}
