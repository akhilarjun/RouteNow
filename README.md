# RouteNow
![Contributions-Welcome][contributions-url]
![experimental][experimental-badge]
![File-Size][size-image]
![Version][version-url]

A new revolutionary small router with no bullshit!

RouteNow is a small library that will help you in developing a SinglePage Application without any dependencies like jQuery, AngularJs, vue.js or any of those bulky frameworks.

## Installation
Installating RouteNow.js is as easy as it gets.

Add the script to the end of your body
```html
<script src="../pathto/route-now.js"></script>
```

Or use the CDN link
```html
<!-- For latest build use @latest -->
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/RouteNow@latest/js/route-now.js"></script>
<!-- For specific version use the version tag -->
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/RouteNow@v2.0.1/js/route-now.js"></script>
<!-- For Minified -->
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/RouteNow@v2.0.1/js/route-now.min.js"></script>
```

Use anchor tags with ```r-href``` property to point to your paths
```html
<a r-href="home">Home</a>
```

Now add the Router outlet where the views should be populated
```html
<div router-outlet></div>
```

Finally, map the paths to your templates and you are done.
```js
$Router.config([
    {path:'home',templateUrl:'partial/home.html'},
    {path:'options',templateUrl:'partial/options.html'},
    {path:'about',templateUrl:'partial/about.html'},
    {path:'thankyou',templateUrl:'partial/thankyou.html'},
    {otherwise:'home'}
]);
```
Check the [API options](https://akhilarjun.github.io/RouteNow/#options) for more customization options

>$Router can be directly used as a browser global. 

### Local Setup

A sample ```server.js``` is added with the repo, which spins up a ```Express``` server at port 8080

Install and start the server by
```js
npm install
npm start
```

## Changelog
* v2.0.1 Introducing HTML5 History API's pushState and popState as the default strategy for routing.
* v1.2.2 Added $Router.hash() method
* v1.2.1 Bug fix to prevent modules.export from breaking the library in script tags
* v1.2 Added common modules export support
* v1.1 First release


[experimental-badge]: https://img.shields.io/badge/Stability-Experimental-orange.svg?style=flat-square
[size-image]: http://img.badgesize.io/akhilarjun/RouteNow/master/js/route-now.min.js.svg?compression=gzip&style=flat-square&label=Minified%20And%20Gzipped%20Size
[contributions-url]: https://img.shields.io/badge/Contributions-Welcome-blue.svg?style=flat-square
[version-url]: https://img.shields.io/github/v/release/akhilarjun/RouteNow?label=Release&style=flat-square
