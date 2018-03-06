var js = new Js()

js.dash.test = function () {
  console.log(this.templates.awesomeTemplate.childNodes)
  this.addChild(this.templates.awesomeTemplate)
}
