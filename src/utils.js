export default {
  id: 0,
  camelCaseToDash: function (myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  dashToCamelCase: function (myString) {
    return myString.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  },
  uid: function () {
    return '_js' + this.id++;
  },
  current: function () {
    return this.id;
  },
  prev: function () {
    return '_js' + (this.id - 1);
  },
  next: function () {
    return '_js' + (this.id);
  }
};
