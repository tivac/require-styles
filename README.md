require-styles
==============

Browserify transform to allow calling `require()` on a .css file. Will rewrite the module so that it injects a `<link>` element into the `<head>`. For those times where you want your CSS and your JS separated instead of in a big tangly ball.

## Usage

CLI

```
npm i require-styles
browserify -t require-styles index.js -o bundle.js
```

Specifying the root

```
browserify -t [ require-styles --root=./Public ] index.js -o bundle.js
```

or via package.json

```
{
    ...
    "browserify": {
        "transforms": [
            [ "require-styles", { "root" : "./Public" } ]
        ]
    }
}
```

```
browserify index.js -o bundle.js
```
