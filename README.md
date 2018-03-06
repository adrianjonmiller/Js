# JsDash - A JS Framework for Static Sites

JsDash is a Javascript framework designed to bring the speed and power of a virtual DOM and the simplicity of libraries like 'jquery' to static websites.

### How it works
The framework looks through the DOM on DOM load and initiates functions and ties them to specific elements.

_Basic Example:_

```html
<div class="js-functionName"></div>
```
Onload the function 'functionName' will be initialized

```js
var js = new Js();

js.dash.functionName = function () {
  console.log('Hello World');
}
```
---

### Scoped

JsDash will crawl the 'body' element by default but can be scoped to a specific element by passing it a selector

```js
var js = new Js('#main');
```
```html
<body>
  <div id="main">
    <div class="js-functionName"></div> <!--- Initialized -->
  </div>

  <div class="js-functionName"></div> <!--- Ignored -->
</body>
```

### The virtual DOM
When a function is initialized it has its __this__ set to a Virtual DOM node (vnode) representing the element it was initialized on.

```html
<body>
  <div id="elementId" class="elementClass js-functionName"></div>
</body>
```
```js
js.dash.functionName = function () {
  this /* reference to the vnode of the element */
}
```
```js
js.dash.functionName = function () {
  console.log(this.node()) /* This methods returns the actual DOM node */
}
/*
  - Console Log -
  <div id="elementId" class="elementClass js-functionName"></div>
*/

```
To retrieve the element attributes
```js
js.dash.functionName = function () {
  console.log(this.attributes)
}
/*
 - Console Log -
 {
    class: 'elementClass js-functionName',
    id: 'elementId'
  }
*/
```

### Properties on 'this'
* dash - Returns any functions attached to this elements virtual node
* childNodes - Virtual nodes of any children of the element
* value - Value of the element (if its in input)

### Methods attached to 'this'

* addChild(element, callback()) - Adds a child to the element
* setAttribute(attribute, value) - Set any attribute on the element
* emit(eventName) - Emits a custom event
* event(eventName) - Listens for an event
* find(attribute, value, callback()) - Searches virtual DOM
* node() - Returns the actual DOM element
* remove() - Removes the element (and is virtual node)
* setStyle(property, value, callback()) - Adds a scoped style
* text(String) - Sets the text of the element
