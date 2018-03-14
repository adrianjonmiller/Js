export default function (args) {
  this.model(() => {
    return {
      name: 'Same'
    }
  })

  this.bind(this.watch.name)
}
