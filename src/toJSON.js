import getAttributes from './getAttributes';
import getContent from './getContent';
import getChildren from './getChildren';
import getNodeValue from './getNodeValue';
import getTagName from './getTagName';
import getValue from './getValue';
import Js from './js';

export default function toJSON ($node, parent, lib, uid) {
  switch ($node.nodeType) {
    case 1: // Element
      return new Js({
        $node: $node,
        parent: parent,
        lib: lib,
        uid: uid
      });

    case 3: // Text Node
      return {
        nodeType: $node.nodeType,
        nodeValue: getNodeValue($node),
        tagName: getTagName($node)
      };

    case 8:
      return {
        nodeType: $node.nodeType,
        nodeValue: getNodeValue($node),
        tagName: getTagName($node)
      };

    case 9: // DOCUMENT_NODE
      return {
        attributes: getAttributes($node),
        childNodes: getChildren($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: getTagName($node),
        value: getValue($node)
      };

    case 10: // DOCUMENT_TYPE_NODE
      return {
        attributes: getAttributes($node),
        childNodes: getChildren($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: getTagName($node),
        value: getValue($node)
      };

    case 11: // DOCUMENT_FRAGMENT_NODE
      return {
        attributes: getAttributes($node),
        content: getContent($node.childNodes, lib),
        nodeType: $node.nodeType,
        tagName: getTagName($node),
        value: getValue($node)
      };

    default:
      return null;
  }
}
