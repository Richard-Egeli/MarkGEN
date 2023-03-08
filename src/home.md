# Inline Functions In MarkGEN

## Description

### Basics

Inlining functions simply means inserting them into the HTML when building the page rather than using a separate .js file to contain the functions.

MarkGEN provides a simple way to generate these functions:

```javascript
const myFunc = function () {
  console.log('Hello world');
};
```

Here's the simplest form of a function that can be inlined.

To do so you can call:

```javascript
// You can use any type of DOMElement
const element = new DOMElement('div');
element.addScript(myFunc);
```

That's it! now the next time you open the html it should trigger the script!

### Parameters

Inlining functions also support parameters, so take for example this function:

```javascript
const myFunc = (id, value) => {
  const el = document.getElementById(id);
  el.addEventListener('click', () => {
    console.log('Value: ' + value);
  });
};
```

Here we run into an issue where we want to insert a few parameters, but we don't have access to the parameters in the parenthesis.

So I solved this issue by issuing a replace command on the string, so you've got to insert a object in the **`addScript`** function as follows:

```javascript
element.addScript(myFunc, {
  id: 'my-div-element',
  value: 'Hello, World!',
});
```

This will then replace the variable names with the literal string values when generating the static html pages.
