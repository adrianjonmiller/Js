// Look into doing local and global styles maybe..?
// Ability to apply a global class and a specific ID

export default function () {
  let styleNode = document.createElement('style');

  styleNode.type = 'text/css';
  return styleNode;
};
