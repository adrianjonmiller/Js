export default function getTagName ($node) {
  return $node.tagName ? $node.tagName.toLowerCase() : $node.nodeName;
};
