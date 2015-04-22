require-styles
==============

Browserify transform to allow calling `require()` on a .css file. Will rewrite the module so that it injects a `<link>` element into the `<head>`. For those times where you want your CSS and your JS separated instead of in a big tangly ball.

```js
// Source
require("./nav.css");
```

```js
// Output
function injectLink(href) {
    "use strict";
    
    var head = document.head || document.getElementsByTagName("head")[0],
        link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.setAttribute("href", href);

    head.appendChild(link);
}


injectLink("../nav/nav.css");
```

**NOTE:** The `injectLink` function will only be added once, the first time a `require("*.css")` is encountered.

## Options

`root` - the root directory to use when calculating file URLs. You want to set this, because without it the generated URLs will almost certainly be wrong.

## Usage

Install from NPM

`npm i require-styles --save-dev`

### CLI
`browserify -t require-styles index.js -o bundle.js`

with `root` option

`browserify -t [ require-styles --root=./Public ] index.js -o bundle.js`

### package.json

```js
{
    ...
    "browserify": {
        "transforms": [
            [ "require-styles", { "root" : "./Public" } ]
        ]
    }
}
```

then invoke via CLI

`browserify index.js -o bundle.js`

### API

`b.transform('require-styles', { root : "./Public" });`
