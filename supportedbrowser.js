(function($) {
  'use strict';

  $.supportedBrowser = {
    whoami: function(){
      var ua= navigator.userAgent, tem, 
      M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/);
        if(tem!= null) return 'Opera '+tem[1];
      }
      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

      // detect platform
      ua = ua.toLowerCase();
      var platformMatch = /(ipad)/.exec( ua ) ||
                          /(ipod)/.exec( ua ) ||
                          /(iphone)/.exec( ua ) ||
                          /(kindle)/.exec( ua ) ||
                          /(silk)/.exec( ua ) ||
                          /(android)/.exec( ua ) ||
                          /(windows phone)/.exec( ua ) ||
                          /(win)/.exec( ua ) ||
                          /(mac)/.exec( ua ) ||
                          /(linux)/.exec( ua ) ||
                          /(cros)/.exec( ua ) ||
                          /(playbook)/.exec( ua ) ||
                          /(bb)/.exec( ua ) ||
                          /(blackberry)/.exec( ua ) ||
                          [];

      return {
        name: M[0].toLowerCase(),
        version: M[1],
        platform: platformMatch[0] || ""
      };
    },

    registerBox: function() {
      var $doc = $(document)
          , $body = $('body')
          , _self = this
          , $modal
          ;

      // Generate message box
      $modal = '<div class="sb-overlay" style="display: none; background:'+this.settings.background+'">';
      $modal += '<div class="sb-wrapper">';
      $modal += '<h3>' + this.settings.msg.title + '</h3>';
      $modal += '<p>' + this.settings.msg.content + '</p>';
      $modal += '<div class="sb-browser-container sp-clearfix">';

      $.each(this.settings.browser, function(key, obj) {
        $modal += '<div class="sb-browser">';
        $modal += '<a class="sb-browser-icon" href="' + obj.url + '" target="_blank"><img src="' + obj.icon + '"/></a>';
        $modal += '<a href="' + obj.url + '" target="_blank">' + obj.name + '</a>';
        $modal += '<p>' + _self.settings.version_text + ' ' + obj.version + '+</p>';
        $modal += '</div>';    
      });

      $modal += '</div>';
      $modal += '</div>';
      $modal += '</div>';   
      $modal += '</div>';

        // Append message to body
      $body.append($modal);
    },

    checkSupported: function(current, supported) {
      if(supported[current.name] != undefined) {
        if(supported[current.name].version <= current.version) return true;
      }

      return false;
    },
    
    detect: function(options) {
      var defaultSettings = {
        "browser": {

        },
        "msg": {
          "title": "Improve Your Experience",
          "content": "We built our website using latest technology. This makes our website faster and easier to use. Unfortunately, your browser does not support those technology. Download one of these great browsers below and you will be on your way."
        },
        "version_text": "Version",
        "background": "#333333"
      };

      // This is the easiest way to have default options.
      this.settings = $.extend(defaultSettings, options );
      
      this.browser = this.whoami();

      if(!this.checkSupported(this.browser, this.settings.browser)) {
        this.registerBox();
        this.show();
      }
    },

    isSupported: function() {
      return this.checkSupported(this.browser, this.settings.browser);
    },

    getBrowser: function() {
      return this.browser;
    },

    show: function() {
      $('.sb-overlay').show();
    },

    hide: function() {
      $('.sb-overlay').hide();
    }
  };
}(jQuery));