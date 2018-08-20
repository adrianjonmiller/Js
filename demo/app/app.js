import Js from '../../src';

new Js({
    global: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 0;
      this.right = 0;
      this.left = 0;

      let main = this.find('id', 'main')[0];
      let sidebar = this.find('id', 'sidebar')[0];

      let list = sidebar.list = (function list (item, result) {
        if (item.id !== 'sizer') {
          result[item.id] = {};
          result[item.id].name = item.id;

          if (item.child) {
            result[item.id].child = item.child.id;
            list(item.child, result)
          }

          if (item.next) {
            result[item.id].next = item.next.id;
            list(item.next, result)
          }
        }
        

        return result;
      })(main.child, {});

      sidebar.list = list;
    },

    sidebar: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 50;
      this.left = 0;
      this.width = 200;
      this.style.backgroundColor = '#ececec';
      this.style.borderRight = 'solid thin #AAAAAA';
      this.style.boxSizing = 'border-box';

      var ul = document.createElement('ul');
      ul.classList.add('unstyle');
      for (let key in this.list) {
        let li = document.createElement('li');
        console.log(this.list[key]);
        li.innerHTML = this.list[key].name;
        ul.appendChild(li);
      }

      this.$node.appendChild(ul);
    },

    properties: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 50;
      this.right = 0;
      this.width = 200;
      this.style.backgroundColor = '#ececec';
      this.style.borderLeft = 'solid thin #AAAAAA';
      this.style.boxSizing = 'border-box';
    },
    toolbar: function () {
      this.style.position = 'absolute';
      this.left = 0;
      this.top = 0;
      this.right = 0;
      this.height = 50;
      this.style.backgroundColor = '#dedede';
      this.style.borderBottom = 'solid thin #AAAAAA';
      this.on('success', () => {
        console.log(this)
      });
    },

    main: function () {
      this.top = 50;
      this.left = 200;
      this.right = 200;
      this.bottom = 0;
      this.style.backgroundColor = '#eee';
      this.style.overflow = 'hidden';
      this.style.position = 'absolute';

      let sizer = this.find('id', 'sizer')[0];
      let sidebar = this.find('id', 'sidebar'[0]);

      this.event('mousedown', (e) => {
        if (e.target.id === this.id) {
          sizer.target = null;
          sizer.show = false;
        }
      });

      this.on('target', (target) => {
        sizer.target = target;
        sizer.show = true;
      });
    },

    buttonTest: function () {
      this.event('click', (e) => {
        this.emit('success')
      })
    },

    sizer: function () {
      this.watch = {
        show: (show) => {
          if (show) {
            this.style.display = 'block';
          } else {
            this.style.display = 'none'
          }
        },
        target: (target) => {
          if (target && Object.keys(target).length > 0) {
            this.top = target.vnode.top;
            this.left = target.vnode.left;
            this.width = target.vnode.width;
            this.height = target.vnode.height;

            var mouseOffX = target.event.clientX - target.vnode.left;
            var mouseOffY = target.event.clientY - target.vnode.top;
            this.style.outline = '1px solid black'

            this.parent.$node.onmousemove = (e) => {
              e.preventDefault();
              this.top = e.clientY - mouseOffY;
              this.left = e.clientX - mouseOffX;
              this.target.vnode.top = e.clientY - mouseOffY;
              this.target.vnode.left = e.clientX - mouseOffX;
            }
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
          this.target.vnode.top = e.clientY - mouseOffY;
          this.target.vnode.left = e.clientX - mouseOffX;
        }
      });

      this.on('dragTopRight.prevent', () => {
        var height = this.height;
        var offsetY = this.top;
        var offsetX = this.left;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.vnode.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.vnode.top = e.clientY - this.parent.top;
          this.width =  e.clientX - offsetX - this.parent.left;
          this.target.vnode.width =  e.clientX - offsetX - this.parent.left;
        }
      })

      this.on('dragTopLeft', () => {
        var height = this.height;
        var offsetY = this.top;
        var offsetX = this.left;
        var width = this.width;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.vnode.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.vnode.top = e.clientY - this.parent.top;


          this.width = offsetX - (e.clientX - this.parent.left) + width;
          this.left = e.clientX - this.parent.left;
          this.target.vnode.width = offsetX - (e.clientX - this.parent.left) + width;
          this.target.vnode.left = e.clientX - this.parent.left; 
        }
      })
      
      this.on('dragTop', () => {
        var height = this.height;
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.vnode.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.vnode.top = e.clientY - this.parent.top;
        }
      })

      this.on('dragLeft', () => {

        var offsetX = this.left;
        var width = this.width;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width = offsetX - (e.clientX - this.parent.left) + width;
          this.target.vnode.width = offsetX - (e.clientX - this.parent.left) + width;
          this.left = e.clientX - this.parent.left;
          this.target.vnode.left = e.clientX - this.parent.left;
        }
      })

      this.on('dragRight', () => {
        var offsetX = this.left;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width =  e.clientX - offsetX - this.parent.left;
          this.target.vnode.width =  e.clientX - offsetX - this.parent.left;
        }
      })
        
      this.on('dragBottomRight', () => {
        var offsetX = this.left;
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width =  e.clientX - offsetX - this.parent.left;
          this.height = e.clientY - offsetY - this.parent.top;
          this.target.vnode.width =  e.clientX - offsetX - this.parent.left;
          this.target.vnode.height = e.clientY - offsetY - this.parent.top;
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
          this.target.vnode.width =  offsetX - (e.clientX - this.parent.left) + width;
          this.target.vnode.height = e.clientY - offsetY - this.parent.top;
          this.target.vnode.left = e.clientX - this.parent.left;
          this.left = e.clientX- this.parent.left;
        }
      })

      this.on('dragBottom', () => {
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.height = e.clientY - offsetY - this.parent.top;
          this.target.vnode.height = e.clientY - offsetY - this.parent.top;
        }
      })

      this.on('release', () => {
        this.parent.$node.onmousemove = null;
      })

      this.parent.event('mouseup', () => {
        this.parent.$node.onmousemove = null;
      })
    },
    dragTopRight: function () {
      this.style.transform = 'translate(50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nesw-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTopRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragTopLeft: function () {
      this.style.transform = 'translate(-50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nwse-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTopLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragTop: function () {
      this.style.transform = 'translate(-50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ns-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTop")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottom: function () {
      this.style.transform = 'translate(-50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ns-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottom")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottomRight: function () {
      this.style.transform = 'translate(50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nwse-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottomRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragRight: function () {
      this.style.transform = 'translate(50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ew-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragLeft: function () {
      this.style.transform = 'translate(-50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ew-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottomLeft: function () {
      this.style.transform = 'translate(-50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nesw-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottomLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    block: function () {
      this.width = 100;
      this.height = 100;
      this.top = 0;
      this.left = 0;
      this.style.backgroundColor = 'blue';
      this.style.position = 'absolute';
      this.style.border = 'solid thin black';

      this.states({
        hover: {
          style: {
            backgroundColor: 'green'
          }
        }
      });

      this.event('mousedown', (e) => {
        this.emit('target', {
          vnode: this,
          event: e
        });
      });
    }
  }
).init('#scope');