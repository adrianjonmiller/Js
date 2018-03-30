import Js from '../../src';

var js = new Js();

js.dash.body = function () {
  var el = this.find('class', 'js-form')[0];

  console.log(el);
};
