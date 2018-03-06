import toJSON from './toJSON';
import utils from './utils';

export default function ($node, lib) {
  var $children = $node.childNodes;
  var length = $children.length;
  let children = {};

  if (length === 0) {
    return null;
  }

  for (let i = 0; i < length; i++) {
    let $child = $children[i];
    let uid = utils.uid();

    if ($child.nodeType === 1) {
      uid = $child.getAttribute('id') ? $child.getAttribute('id') : uid;
    }

    children[uid] = toJSON($children[i], $node, lib, uid);
  }

  return children;
};
