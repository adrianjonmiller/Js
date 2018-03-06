import updateStyles from './updateStyles';

export default function (styles, uid, $node) {
  let styleNode = document.createElement('style');

  styleNode.type = 'text/css';

  updateStyles(styleNode, styles, uid);

  $node.removeAttribute('style');

  return () => styleNode;
};
