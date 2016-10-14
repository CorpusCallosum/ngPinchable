# ngPinchable
An Angular 1 directive for making HTML elements pinchable, zoomable, and panable using multi-touch gestures. Requires hammer.js

##Usage:
1.  Download and install hammer.js here: http://hammerjs.github.io/
2.  Download the js file ngPinchable.js
2.  Include the js in your project like ```<script src="ngPinchable.js"></script>```
3.  Add the ngPinchable module to your angular app like ```var app = angular.module('ngApp', ['ngPinchable']);```
4.  Add the directive to any HTML element like ```<div ng-pinchable>Put whatever content u want here!</div>```

##Options
###max-zoom
limit zooming level. Takes an integer. 2 = 2x, 3 = 3x, etc
####Usage:
```<div ng-pinchable max-zoom="2"></div>```
