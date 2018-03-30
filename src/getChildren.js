import Js from './js';
import utils from './utils';
import obj from './obj';

export default function ($node, lib, parent) {
  let $children = $node.childNodes;
  let children = {};
  let length = $children.length;

  if (length === 0) {
    return {};
  }

  for (let i = 0; i < length; i++) {
    let $child = $children[i];
    let keys = Object.keys(children);
    let uid;

    if ($child.nodeType === 1) {
      if (!$child.getAttribute('id')) {
        uid = utils.uid();
      } else if ($child.getAttribute('id').startsWith('_js')) {
        uid = utils.uid();
      } else {
        uid = $child.getAttribute('id');
      }

      obj[uid] = new Js({
        init: false,
        lib: lib,
        $node: $child,
        parent: parent,
        uid: uid
      });

      if (keys.length > 0) {
        children[keys.pop()].next = obj[uid];
      }

      children[uid] = obj[uid];
    }
  }

  for (let key in children) {
    children[key].init();
  }

  return children;
};
