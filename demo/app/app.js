import Js from '../../src';

var js = new Js();

js.dash.header = require('./header');
js.dash.main = require('./main');
js.dash.headerLink = require('./headerLink')
js.dash.navList = require('./navList')


// js.dash.form = function () {
//   this.find('class', 'js-input', (input) => {
//     input.data(() => {
//       data: 'success'
//     })
//     this.find('class', 'js-value', (span) => {
//
//     })
//   })
// }
