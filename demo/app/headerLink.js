export default function (args) {
  this.model(() => {
    return {
      name: 'Same'
    }
  })

  this.event('mouseover', function () {
    this.addClass('is-active')
  }.bind(this))

  this.bind(this.watch.name)
}
