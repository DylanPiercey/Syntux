# Syntux

Syntax highlighting for React without the bulk.

[![npm](https://img.shields.io/npm/dm/syntux.svg)](https://www.npmjs.com/package/syntux)

# Supported Languages
All languages and styles from [highlight.js](https://highlightjs.org).

# Installation

#### Npm
```console
npm install syntux
```

# Example
```javascript
// Require a style. (Returns a React style element).
var Theme = require('syntux/style/solarized_dark');

// Require the highlighters.
var XML = require('syntux/xml');
var CSS = require('syntux/css');
var JS = require('syntux/javascript');

// To access the underlying hljs simply require("syntux").
// Use them in a component.
var MyComponent = function () {
    return (
        <div>
            { Theme }
            <XML>
                {'<a href="example.html"> Click me </a>'}
            </XML>
            <CSS>
                {'body { background-color: green }'}
            </CSS>
            <JS>
                {'var x = { y: "hi" };'}
            </JS>
        </div>
    );
});
```
#### Which (when rendered) will output:
![Example](https://raw.githubusercontent.com/DylanPiercey/Syntux/master/example.png)

# Usage with Marked (Markdown)
```javascript
var React = require("react");
var marked = require("marked");
var syntux = require("syntux");

// Ensure needed languages are available.
require("syntusk/javascript");
require("syntusk/css");
require("syntusk/xml");

// Set code renderer.
var renderer = new marked.Renderer();

renderer.code = function(code, lang) {
    lang = lang.toLowerCase();
    code = syntux.highlight(lang, code, true).value;
    return '<pre><code class="hljs ' + lang + '">' + code + '</code></pre>';
};

marked.setOptions({ renderer: renderer });

// Use it!
marked("```javascript var x = 1;```")
```

