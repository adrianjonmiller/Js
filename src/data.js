export default class Data {
  constructor (parent, key) {
    this.parent = parent;
    this.key = key;
    this.cb = [];
  }

  val () {
    return this.parent[this.key];
  }

  ref () {
    return this.parent;
  }

  set (value) {
    if (this.parent[this.key] !== value) {
      let old = this.parent[this.key];

      this.parent[this.key] = value;
      this.cb.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(value, old);
        }
      });
    }
  }

  watch (cb) {
    this.cb.push(cb);
    cb(this.val());
  }
}
