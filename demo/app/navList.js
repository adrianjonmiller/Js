import navItem from './templates/navItem.handlebars';

export default function () {
  var styles = {
    background: 'blue'
  }

  for (var i = 0; i < 1; i++) {
    var li = navItem({
      link: i
    });
    this.addChild(li)
  }

  this.setStyle(styles)
}
