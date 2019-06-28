
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function observer(value) {
      if (!value || typeof value !== "object") {
          return;
      }
      Object.keys(value).forEach(function (key) {
          defineReactive(value, key, value[key]);
      });
  }
  function cb(val) {
      console.log("视图更新啦～", val);
  }
  function defineReactive(obj, key, val) {
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              return val;
          },
          set: function reactiveSetter(newVal) {
              if (newVal === val)
                  return;
              val = newVal;
              cb(newVal);
          }
      });
  }
  var Biu = /** @class */ (function () {
      function Biu(options) {
          this._data = options.data;
          observer(this._data);
      }
      return Biu;
  }());

  var o = new Biu({
      data: {
          test: "I am test."
      }
  });
  // o._data.test = "hello,test.";

}));
//# sourceMappingURL=index.js.map
