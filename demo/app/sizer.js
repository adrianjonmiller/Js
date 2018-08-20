export default function () {
  this.watch = {
    show: (show) => {
      if (show) {
        this.style.display = 'block';
      } else {
        this.style.display = 'none'
      }
    },
    target: (target) => {
      if (target) {
        console.log(target.top)
        this.top = target.top;
        this.left = target.left;
        this.width = target.width;
        this.height = target.height;
      }
    }
  }

  this.model({
    target: null,
    show: false
  });

  this.style.position = 'absolute';
  this.style.border = 'solid thin black';
  this.style.display = 'none';

  this.event('mousedown', (e) => {
    e.preventDefault();
    var mouseOffX = e.clientX - this.left;
    var mouseOffY = e.clientY - this.top;
    this.style.outline = '1px solid black'

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();
      this.top = e.clientY - mouseOffY;
      this.left = e.clientX - mouseOffX;
      this.target.top = e.clientY - mouseOffY;
      this.target.left = e.clientX - mouseOffX;
    }
  });

  this.on('dragTopRight.prevent', () => {
    var height = this.height;
    var offsetY = this.top;
    var offsetX = this.left;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();
      this.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.top = e.clientY - this.parent.top;
      this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.target.top = e.clientY - this.parent.top;
      this.width = e.clientX - offsetX - this.parent.left;
      this.target.width = e.clientX - offsetX - this.parent.left;
    }
  })

  this.on('dragTopLeft', () => {
    var height = this.height;
    var offsetY = this.top;
    var offsetX = this.left;
    var width = this.width;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();
      this.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.top = e.clientY - this.parent.top;
      this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.target.top = e.clientY - this.parent.top;


      this.width = offsetX - (e.clientX - this.parent.left) + width;
      this.left = e.clientX - this.parent.left;
      this.target.width = offsetX - (e.clientX - this.parent.left) + width;
      this.target.left = e.clientX - this.parent.left;
    }
  })

  this.on('dragTop', () => {
    var height = this.height;
    var offsetY = this.top;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();
      this.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.top = e.clientY - this.parent.top;
      this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
      this.target.top = e.clientY - this.parent.top;
    }
  })

  this.on('dragLeft', () => {

    var offsetX = this.left;
    var width = this.width;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();

      this.width = offsetX - (e.clientX - this.parent.left) + width;
      this.target.width = offsetX - (e.clientX - this.parent.left) + width;
      this.left = e.clientX - this.parent.left;
      this.target.left = e.clientX - this.parent.left;
    }
  })

  this.on('dragRight', () => {
    var offsetX = this.left;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();

      this.width = e.clientX - offsetX - this.parent.left;
      this.target.width = e.clientX - offsetX - this.parent.left;
    }
  })

  this.on('dragBottomRight', () => {
    var offsetX = this.left;
    var offsetY = this.top;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();

      this.width = e.clientX - offsetX - this.parent.left;
      this.height = e.clientY - offsetY - this.parent.top;
      this.target.width = e.clientX - offsetX - this.parent.left;
      this.target.height = e.clientY - offsetY - this.parent.top;
    }
  })

  this.on('dragBottomLeft', () => {
    var offsetX = this.left;
    var width = this.width;
    var offsetY = this.top;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();

      this.width = offsetX - (e.clientX - this.parent.left) + width;
      this.height = e.clientY - offsetY - this.parent.top;
      this.target.width = offsetX - (e.clientX - this.parent.left) + width;
      this.target.height = e.clientY - offsetY - this.parent.top;
      this.target.left = e.clientX - this.parent.left;
      this.left = e.clientX - this.parent.left;
    }
  })

  this.on('dragBottom', () => {
    var offsetY = this.top;

    this.parent.$node.onmousemove = (e) => {
      e.preventDefault();

      this.height = e.clientY - offsetY - this.parent.top;
      this.target.height = e.clientY - offsetY - this.parent.top;
    }
  })

  this.on('release', () => {
    this.parent.$node.onmousemove = null;
  })

  this.parent.event('mouseup', () => {
    this.parent.$node.onmousemove = null;
  })
}