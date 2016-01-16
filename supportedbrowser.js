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
                          /(googlebot)/.exec( ua ) ||
                          /(adsbot-google)/.exec( ua ) ||
                          /(mediapartners-google)/.exec( ua ) ||
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
        if(obj.name != 'mobile') {
          $modal += '<div class="sb-browser">';
          $modal += '<a class="sb-browser-icon" href="' + obj.url + '" target="_blank"><img src="' + obj.icon + '"/></a>';
          $modal += '<a href="' + obj.url + '" target="_blank">' + obj.name + '</a>';
          $modal += '<p>' + _self.settings.version_text + ' ' + obj.version + '+</p>';
          $modal += '</div>';
        }
      });

      $modal += '</div>';
      $modal += '</div>';
      $modal += '</div>';
      $modal += '</div>';

        // Append message to body
      $body.append($modal);
    },

    checkSupported: function(current, supported) {
      switch(current.platform) {
        case 'mac':
        case 'win':
        case 'linux':
          if(supported[current.name] != undefined) {
            if(parseInt(supported[current.name].version) > parseInt(current.version)) return false;
            else return true;
          }
          break;
        case 'iphone':
        case 'ipod':
        case 'ipad':
          if(supported['mobile'].ios != undefined) {
            if(parseInt(supported['mobile'].ios.version) > parseInt(current.version)) return false;
            else return true;
          }
          break;
        case'googlebot':
        case'adsbot-google':
        case'mediapartners-google':
          return true;
          break;
        case 'android':
          if(supported['mobile'].android != undefined) {
            if(parseInt(supported['mobile'].android[current.name]) > parseInt(current.version)) return false;
            else return true;
          }
          break;
        case 'playbook':
        case 'silk':
        case 'windows phone':
          if(supported['mobile'].others != undefined) {
            if(parseInt(supported['mobile'].others[current.name]) > parseInt(current.version)) return false;
            else return true;
          }
          break;
      }

//      if(supported[current.name] != undefined) {
//        if(parseInt(supported[current.name].version) > parseInt(current.version)) return false;
//        else return true;
//      }

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

      if(!this.isSupported()) {
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
