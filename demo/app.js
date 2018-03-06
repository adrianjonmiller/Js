var js = new Js()

js.lib.test = function () {
  var left = 0;
  var self = this;
  setInterval(function () {
    self.setStyle('transform', 'translateX('+ (left += 10) +'px)');
  }, 100)
}

// js.lib.test = function () {
//   console.log(this.styles)
//
//   this.setStyle('background', 'blue');
//
//   console.log(this.styles)
// }
//
// js.lib.body = function () {
//   console.log(this)
// }
