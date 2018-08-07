import Js from '../../src';

new Js({
    el: 'body'
  },{
    find: function () {
      var result = this.find('tagName', 'li', function (item) {
        console.log(item);
      })

      console.log(result);
    }
  }
).init();