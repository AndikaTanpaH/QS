# QS

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

Simple Query Selector its realy fast, wraping `querSelectorAll('.selector')`  
No ~need~ for any dependencies, just a javascript script under 1KB.

## 🚀 Features
- Returns the first matching element, or null if none found.  
  `qs('selector')`
- Always **returns an array**, even if only one element is matched.  
  `qs('selector', true)`
- Accepts HTMLElement, NodeList, window, or document and returns them directly (or wrapped in array if true).  
  `qs(element)`
- Supports direct child selectors like `> .child` via `:scope` when used from an element.  
  `element.qs('> .first-child')`
- Build in `.on()` for handling event listener.

## ⛏️ How Use
Just add qs.min.js or paste above your code before you start the selector.

```html
<script src="/script-folder/qs.min.js"></script>

<script>
let el = qs('.books');
</script>
```

or

```html
<script>
/* qs.min.js content */

let el = qs('.books');
</script>
```

## Example of Use


```html
<div class="box">
    <div>
        <span>Item 1</span>
    </div>
</div>
```

### 1. **Take Element**
```js
const box = qs('.box');                  // 1 element or null
const allItems = qs('.box span', true);  // always return array, even if only 1 element
```

### 2. **Chaining Selektor**
```javascript
const title = box.qs('> div:first-child').qs('span');
```

### 4. **Delegated Event Listener**
Yup this libary has .on(), where it is usually used for event delegation or for listening to events.
This can read elements added by DOM inserts. 
```javascript
/*
    (EventNmae, Target Element, Function)
*/
document.on('click', 'div',  (e) => {
    console.log('You clicked:', this);
});
```

### 5. **Event Listener**
```js
const el = qs('.box');
el.on('mouseenter', function () {
    this.classList.add('hover');
});
```
  
For more complex example send me your DOM HTML.
  
------------

©2025 AndikaTanpaH - Created out of necessity.
