# Components

## Description

To make the software easier to work with, I've split up the program into smaller components, kind of similar to how React or Vue does it.

I find it to be a much nicer way to work personally, so I created a component based system that enables me to work in a somewhat similar fashion to these other popular technologies.

## Creating a component

To create custom components, or extend the functionality of the software, you can create a class that extends the DOMComponent class, the DOMComponent works as a sort of helper class that allows you to insert javascript or css, and then insert that into a page.

```js
// You can also append multiple components together
// before inserting them into a page!

const component = new DOMComponent('div');
component.id = 'my-component';
component.className = 'my-class';

const text = new DOMComponent('p');
text.innerText = 'Hello, World!';

component.appendChild(text);
```

## Including CSS / Javascript

So the DOMComponent base class supports inline styles, or styles in the `<style>` tag. Scripts however only go in a `<script>` tag at the bottom of them html body.

There's an interface to help you create css code, simply called CSS, and it allows you to create a javascript object that you then insert into the component. For example:

```javascript
const css: CSS = {
    'comp-id': {
        display: 'flex',
        flex-direction: column,
    }
};

const component = new DOMComponent('div');
component.addGlobalStyles(css);
```

Now when can add the component to the page you're creating, like here:

```js
// pageInfo is a object with the hierarchical structure of your srcDir
const page = new Page(pageInfo);
page.appendChild(component);
```

Now when you decide to call **page.serialize()** your component will be rendered inside the page!
