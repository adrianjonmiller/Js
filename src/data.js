export default class Data {
  constructor (parent, key) {
    this.parent = parent;
    this.key = key;
    this.cb = '';
  }

  val () {
    return this.parent[this.key];
  }

  ref () {
    return this.parent;
  }

  set (value) {
    this.parent[this.key] = value;
    if (typeof this.cb === 'function') {
      this.cb(value)
    }
  }

  bind (cb) {
    this.cb = cb
    cb(this.val())
  }
}
