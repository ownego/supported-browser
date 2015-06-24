# Javascript Supported Browser

The javascript detect supported browser to improve user interface

Author : [ownego](http://ownego.com) 

## Installation

### Install with [Bower](http://bower.io) 
```
bower install supported-browser
```

### Adding Noscript tag to header
```
<noscript>
  <div style="position: fixed; top: 0px; left: 0px; z-index: 99999; 
            height: 100%; width: 100%; background-color: #FFFFFF;">
    Your browser does not support JavaScript!
  </div>
</noscript>
```

### Init detect supported browser

``` js
$.supportedBrowser.detect({
"browser": {
  "chrome": {
    "name": "Google Chrome",
    "icon": "./assets/img/browser/chrome.jpg",
    "url": "http://www.google.com/chrome/",
    "version": "4"
  },
  "firefox": {
    "name": "Mozilla Firefox",
    "icon": "./assets/img/browser/firefox.jpg",
    "url": "https:\/\/www.mozilla.org\/en-US\/firefox\/products\/",
    "version": "11"
  },
  "ie": {
    "name": "Internet Explorer",
    "icon": "./assets/img/browser/ie.jpg",
    "url": "http:\/\/windows.microsoft.com\/en-us\/internet-explorer\/download-ie",
    "version": "9"
  },
  "safari": {
    "name": "Safari",
    "icon": "./assets/img/browser/safari.jpg",
    "url": "https:\/\/www.apple.com\/safari\/",
    "version": "3.1"
  },
  "opera": {
    "name": "Opera",
    "icon": "./assets/img/browser/opera.jpg",
    "url": "http:\/\/www.opera.com\/",
    "version": "11.5"
  }
},
"msg": {
  "title": "Your title",
  "content": "Your mesage"
},
"version_text": "Version",
"background": "#fff"
});
```



## MIT license
supported browser is released under the [MIT license](http://desandro.mit-license.org).
