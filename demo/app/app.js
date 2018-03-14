import Js from '../../src';

var js = new Js();

js.dash.header = require('./header');
js.dash.main = require('./main');
js.dash.headerLink = require('./headerLink')
js.dash.navList = require('./navList')


js.dash.form = function () {
  var inputs = this.find('class', 'js-input');
  console.log(inputs)
}
