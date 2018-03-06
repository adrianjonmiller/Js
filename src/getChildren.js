import Js from './js';
import utils from './utils';

export default function ($node, lib, parent) {
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
      children[uid] = new Js({
        $node: $child,
        parent: parent,
        lib: lib,
        uid: uid
      });
    }
  }

  return children;
};
