// Generated by CoffeeScript 1.3.3
(function() {
  var exportModule;

  exportModule = function(root, name, factory) {
    if (typeof define === "function" && define.amd) {
      return define([], factory);
    } else {
      return root[name] = factory();
    }
  };

  exportModule(window, "JSONPRequest", function() {
    var JSONPRequest;
    window.callbackbuffer = {};
    return JSONPRequest = (function() {

      function JSONPRequest(url) {
        this.url = url;
        if (this.url.indexOf("?" < 0)) {
          this.url += "?";
        } else {
          this.url += "&";
        }
      }

      JSONPRequest.prototype.send = function(callback) {
        var head;
        this.generateScript(this.generateCallback(callback));
        head = document.getElementsByTagName("head")[0];
        return head.appendChild(this.script);
      };

      JSONPRequest.prototype.generateCallback = function(callback) {
        var chars, exportedName, i, _i,
          _this = this;
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_";
        exportedName = "";
        for (i = _i = 0; _i <= 15; i = ++_i) {
          exportedName += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        window.callbackbuffer[exportedName] = function(json) {
          callback(json);
          delete window.callbackbuffer[exportedName];
          return _this.script.parentNode.removeChild(_this.script);
        };
        return exportedName;
      };

      JSONPRequest.prototype.generateScript = function(exportedName) {
        this.script = document.createElement("script");
        return this.script.src = "" + this.url + "&callback=window.callbackbuffer." + exportedName;
      };

      return JSONPRequest;

    })();
  });

}).call(this);
