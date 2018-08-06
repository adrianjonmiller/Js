import Js from '../../src';

const js = new Js({
    el: 'body'
  },{
    widthObserver: function () {

    },
    block: function () {
      this.style.color = 'blue';
      this.style.backgroundColor = 'black';

      this.style = {
        fontSize: '32px'
      };

      this.on('sizeChange', () => {
        console.log(this)
      });

      this.event('click', (e) => {
        this.emit('sizeChange');
      });
    }
  }
).init();