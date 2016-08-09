
# Stylus - Media Queries

`stylus-mq` is a simple mixin to ease the use of media queries in [stylus](http://stylus-lang.com/). A lot of inspiration to this library was gathered from [sass-mq](https://github.com/guardian/sass-mq).

## Installation

With NPM

```
npm install @ardentic/stylus-mq
```

Manual installation can be done by downloading [mq.styl](https://raw.githubusercontent.com/ardentic/stylus-mq/master/mq.styl) to your project.

## Basic example

`stylus-mq` will allow you to write this:

```stylus
@import 'mq.styl';

$mq-breakpoints = {
  small: 768px
};

.className {
  background-color: white;

  +mq($until: 'small') {
    background-color: red;
  }
}
```

and generate this:

```css
.className {
  background-color: white;
}

@media (max-width: 48em) {
  .className {
    background-color: red;
  }
}
```

## Options

**$mq-breakpoints**

Allows you to override the default named breakpoints.

Example:

```stylus
$mq-breakpoints = {
  mobile: 768px,
  tablet: 1024px,
  desktop: 1280px
};
```

Default settings:

```stylus
$mq-breakpoints ?= {
  tiny: 480px,
  small: 768px,
  medium: 992px,
  large: 1200px
};
```

**$mq-responsive**

Allows you to create a separate stylesheet for older browsers that don't support media queries.

Example:

```stylus
$mq-responsive = false;
```

Default settings:

```stylus
$mq-responsive ?= true;
```

**$mq-static-breakpoint**

Breakpoint to be used if `$mq-responsive` is set to false.

Example:

```stylus
$mq-static-breakpoint = 'mobile';
```

Default settings:

```stylus
$mq-static-breakpoint ?= 'desktop';
```

**$mq-base-font-size**

Base font size to calculate media queries from.

Example:

```stylus
$mq-base-font-size = 14px;
```

Default settings:

```stylus
$mq-base-font-size ?= 16px;
```

## Parameters

`mq()` takes up to three optional parameters:

* **$from:** _inclusive_ `min-width` boundary
* **$until:** _exclusive_ `max-width` boundary
* **$and:** additional custom directives

## Breakpoints as JSON data

To enable using the same breakpoint names and widths in both Stylus and JavaScript the breakpoint data can be converted to JSON.

Example:

```stylus
body {
  &:after {
    display: none;
    content: mq-breakpoints-to-json();
  }
}
```

Results:

```css
body:after {
  display: none;
  content: '{ "tiny": "30em", "small": "48em", "medium": "62em", "large": "75em" }';
}
```

This can be read and parsed with something like this:

```javascript
var removeQuotes = function (string) {
  return string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
};

var getBreakpoints = function () {
  var breakpoints = window
    .getComputedStyle(document.body, ':after')
    .getPropertyValue('content');

  return JSON.parse(removeQuotes(breakpoints));
};
```

## Adding custom breakpoints

```stylus
$mq-breakpoints = mq-add-breakpoint('tvscreen', 1920px);

.hide-on-tv {
  +mq('tvscreen') {
    display: none;
  }
}
```

## Testing

Install dependencies.

```
npm install
```

Run tests.

```
npm test
```
