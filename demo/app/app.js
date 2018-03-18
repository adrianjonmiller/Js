import Js from '../../src';

var js = new Js();

js.dash.header = require('./header');
js.dash.main = require('./main');
js.dash.headerLink = require('./headerLink')
js.dash.navList = require('./navList')


js.dash.form = function () {
  var input = this.find('class', 'js-input')[0];
  var value = this.find('class', 'js-value')[0];

  input.event('keyup', function (e) {
    value.data.value = input.value;
  })
}

js.dash.body = function () {
  console.log(this)
}


js.dash.value = function () {
  this.model(() => {
    return {
      value: ''
    }
  })

  this.bind(this.watch.value)
}
