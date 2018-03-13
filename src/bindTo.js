export default {
  bound: new Set(),
  to: function (item) {
    this.bound.add(item)
    if (this.bound.size > 0) {
      var self = this;

      function tick () {
        self.bound.forEach((item) => {
          if (item.$node.nodeValue !== item.ref[item.key]) {
            item.$node.nodeValue = item.ref[item.key];
          }
        })
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }
}
