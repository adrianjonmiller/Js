var js = new Js('#main');

js.dash.header = require('./header');
js.dash.main = require('./main');
js.dash.headerLink = require('./headerLink')
js.dash.navList = require('./navList')


js.dash.form = function () {
  this.find('class', 'js-input', (input) => {
    input.value = 'success'
    this.find('class', 'js-value', (span) => {

    })
  })
  // this.find('class', 'js-input', function (el) {
  //   console.log(el)
  //   setInterval(() => {
  //     console.log(el.value)
  //   }, 1000)
  // })
}
