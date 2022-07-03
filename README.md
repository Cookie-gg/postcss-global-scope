# postcss-global-scope

PostCSS plugin that supports global scoping in nested rules.

## Install

```bash
npm i -D postcss @cookie_gg/postcss-global-scope
# or
yarn add -D postcss @cookie_gg/postcss-global-scope
```

## Usage

You have to use this plugin with [postcss-nested](https://github.com/postcss/postcss-nested) and set it after postcss-global-scope.

```js:postcss.config.js
module.exports = {
  ...
  plugins: [
    // other plugins...
    ['@cookie_gg/postcss-global-scope', {
        skip: "*",
        classes: ["dark", "light"]
      }
    ]
  ]
  ...
}
```

```css:style.css
/* before */
main {
  h1 {
    :global(.dark) {
      color: blue;
    }
  }
}

/* after */
[class="dark"] main h1 {
  color: blue;
}
```

## Options

**skip: `String`**

> default: '\*'

Define the skip syntax used to ignore portions of the shorthand.

**classes: `Array<String>`**

> default: 'undefined'

You can use global scope on short type libe below.

```css:style.css
/* before */
main {
  h1 {
    color: white ^ black;
  }
}

/* after */
[class="dark"] main h1 {
  color: dark;
}
[class="light"] main h1 {
  color: white;
}
```
