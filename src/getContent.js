import getChildren from './getChildren';
import getTagName from './getTagName';

export default function getContent ($node, lib) {
  if (!$node.content) {
    return null;
  }

  return {
    childNodes: getChildren($node, lib),
    nodeType: $node.nodeType,
    tagName: getTagName($node.content)
  };
};
