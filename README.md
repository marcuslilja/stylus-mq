# Media Queries
This is a fork from [https://github.com/guardian/sass-mq](https://github.com/guardian/sass-mq). A simple conversion from Sass to Stylus.

`mq()` is a [Stylus](http://learnboost.github.io/stylus/) mixin that helps manipulating media queries in an elegant way.

## How to Use It

1. Install with [Bower](http://bower.io/ "BOWER: A package manager for the web"): `bower install stylus-mq --save-dev` OR [Download mq.styl](https://bitbucket.org/ardentic/ardentic-stylus-mq/raw/master/mq.styl) to your Stylus project.

2. Import the partial in your Stylus files and override default settings with your own preferences before the file is imported:

        // To enable support for browsers that do not support @media queries,
        // (IE <= 8, Firefox <= 3, Opera <= 9) set mq-responsive to false
        // Create a separate stylesheet served exclusively to these browsers,
        // meaning @media queries will be rasterized, relying on the cascade itself
        mq-responsive = true;

        // Name your breakpoints in a way that creates a ubiquitous language
        // across team members. It will improve communication between
        // stakeholders, designers, developers, and testers.
        mq-breakpoints = {
            mobile: 320px,
            tablet: 740px,
            desktop: 980px,
            wide: 1300px,

            // Tweakpoints
            desktopAd: 810px,
            mobileLandscape: 480px
        };

        // Define the breakpoint from the $mq-breakpoints list that should
        // be used as the target width when outputting a static stylesheet
        // (i.e. when $mq-responsive is set to 'false').
        mq-static-breakpoint = 'desktop';

        // If you want to display the currently active breakpoint in the top
        // right corner of your site during development, add the breakpoints
        // to this list, ordered by width, e.g. (mobile, tablet, desktop).
        mq-show-breakpoints = ('mobile' 'mobileLandscape' 'tablet' 'desktop' 'wide');

        @import 'path/to/mq';

3. Play around with `mq()` (see below)

### Responsive mode ON (default)

`mq()` takes up to three optional parameters:

- `from`: _inclusive_ `min-width` boundary
- `until`: _exclusive_ `max-width` boundary
- `extra`: additional custom directives

Note that `until` as a keyword is a hard limit. It's not applying styles to the
device (see examples below).

    .responsive {
        // Apply styling to mobile and upwards
        +mq(from: 'mobile') {
            color: red;
        }

        // Apply styling up to devices smaller than tablets (exclude tablets)
        +mq(until: 'tablet') {
            color: blue;
        }

        // Same thing, in landscape orientation
        +mq(until: 'tablet', extra: '(orientation: landscape)') {
            color: hotpink;
        }

        // Apply styling to tablets up to desktop (exclude desktop)
        +mq('tablet', 'desktop') {
            color: green;
        }
    }

### Responsive mode OFF

To enable support for browsers that do not support `@media` queries, (IE <= 8, Firefox <= 3, Opera <= 9) set `mq-responsive = false`.

Tip: create a separate stylesheet served exclusively to these browsers, for example with conditional comments.

When `@media` queries are rasterized, browsers rely on the cascade itself. Learn more about this technique on [Jake’s blog](http://jakearchibald.github.io/sass-ie/ "IE-friendly mobile-first CSS with Sass 3.2").

To avoid rasterizing styles intended for displays larger than what those older browsers typically run on, set `mq-static-breakpoint` to match a breakpoint from the `mq-breakpoints` list. The default is `desktop`.

The static output will only include `@media` queries that start at or span this breakpoint and which have no custom `extra` directives:

    mq-responsive = false;
    mq-static-breakpoint = 'desktop';

    .static {
        // Queries that span or start at desktop are compiled:
        +mq(from: 'mobile') {
            color: lawngreen;
        }

        +mq('tablet', 'wide') {
            color: seagreen;
        }

        +mq(from: 'desktop') {
            color: forestgreen;
        }

        // But these queries won’t be compiled:
        +mq(until: 'tablet') {
            color: indianred;
        }

        +mq(until: 'tablet', extra: '(orientation: landscape)') {
            color: crimson;
        }

        +mq('mobile', 'desktop') {
            color: firebrick;
        }
    }

### Adding custom breakpoints

    mq-breakpoints = mq-add-breakpoint('tvscreen', 1920px);

    .hide-on-tv {
        +mq('tvscreen') {
            display: none;
        }
    }

### Seeing the currently active breakpoint

While developing, it can be nice to always know which breakpoint is active. To achieve this, set the `mq-show-breakpoints` variable to be a list of the breakpoints you want to debug, ordered by width. The name of the active breakpoint and its pixel and em values will
then be shown in the top right corner of the viewport.

## Test

1. cd into the `test` folder
2. run `stylus test.styl`
3. if `test.css` hasn’t changed (run a `git diff` on it), tests pass

## Inspired By...

- https://github.com/alphagov/govuk_frontend_toolkit/blob/master/stylesheets/_conditionals.scss
- https://github.com/bits-sass/helpers-responsive/blob/master/_responsive.scss
- https://gist.github.com/magsout/5978325

## On Mobile-first CSS With Legacy Browser Support

- http://jakearchibald.github.io/sass-ie/
- http://nicolasgallagher.com/mobile-first-css-sass-and-ie/
- http://cognition.happycog.com/article/fall-back-to-the-cascade
- http://www.theguardian.com/info/developer-blog/2013/oct/14/mobile-first-responsive-ie8
