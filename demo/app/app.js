import Js from '../../src';

var js = new Js();

js.dash.header = require('./header');
js.dash.main = require('./main');
js.dash.headerLink = require('./headerLink')
js.dash.navList = require('./navList')


js.dash.form = function () {
  var input = this.find('class', 'js-input');
  var value = this.find('class', 'js-value');

  input.event('keyup', function (e) {
    console.log(e.target.value)
    console.log(input.value)
    value.data.value = input.value
  })
}


js.dash.value = function () {
  this.model(() => {
    return {
      value: ''
    }
  })

  this.bind(this.watch.value)
}
