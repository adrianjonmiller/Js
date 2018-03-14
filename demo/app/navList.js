import navItem from './templates/navItem.handlebars';

export default function () {
  var li = document.createElement('li');

  for (let i = 0; i < 10; i++) {
    let newLi = li.cloneNode(true);
    newLi.classList.add("js-headerLink")
    var item = this.addChild(newLi, i);
  }

  this.find('class', 'js-headerLink', function (el) {
    el.data.name = 'not the same'
  })
}
