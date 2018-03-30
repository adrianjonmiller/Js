export default class Data {
  constructor (parent, key) {
    this.cb = [];
    this.key = key;
    this.parent = parent;
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
