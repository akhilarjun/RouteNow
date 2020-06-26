# RouteNow
![experimental][experimental-badge]
![File-Size][size-image]
![Contributions-Welcome][contributions-url]

A new revolutionary small router with no bullshit!

## Installation
Installating RouteNow.js is as easy as it gets.

Add the script to the end of your body
```html
<script src="../pathto/route-now.js"></script>
```

Or use the CDN link
```html
<!-- For Non Minified -->
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/RouteNow@v1.1/js/route-now.js"></script>
<!-- For Minified -->
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/RouteNow@v1.1/js/route-now.min.js"></script>
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
>$Router can be directly used as a browser global. 


[experimental-badge]: https://img.shields.io/badge/Stability-Experimental-orange.svg?style=flat-square
[size-image]: http://img.badgesize.io/akhilarjun/RouteNow/master/js/route-now.min.js.svg?compression=gzip&style=flat-square&label=Minified%20And%20Gzipped%20Size
[contributions-url]: https://img.shields.io/badge/Contributions-Welcome-blue.svg?style=flat-square
