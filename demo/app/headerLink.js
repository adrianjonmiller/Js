export default function () {

  var styles = {
    color: 'green',
    height: '1rem'
  };

  this.setStyle('color', 'blue', () => {
    console.log('updated')
  });
}
