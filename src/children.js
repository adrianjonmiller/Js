import Vnode from './vnode';
import utils from './utils';
import symbols from './vdom';

export default function ($node, parent, behaviors) {
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

      // if (typeof symbols[uid] !== undefined && $child.tagName !== 'SCRIPT') {
      //   console.log(uid);
      //   throw "Duplicate IDs are not allowed"; 
      // }

      console.log(parent)

      parent[uid] = new Vnode({
        init: false,
        $node: $child,
        parent: parent,
        uid: uid
      }, behaviors);

      // if (keys.length > 0) {
      //   parent[uid].prev = children[keys[keys.length - 1]];
      //   children[keys[keys.length - 1]].next = parent[uid];
      // }

      children[uid] = symbols[uid];
    }
  }

  // for (let key in children) {
  //   children[key].init();
  // }

  return children;
};
