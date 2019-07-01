
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var Dep = /** @class */ (function () {
      function Dep() {
          this.subs = [];
      }
      Dep.prototype.addSub = function (sub) {
          this.subs.push(sub);
      };
      Dep.prototype.notify = function () {
          this.subs.forEach(function (sub) {
              sub.update();
          });
      };
      return Dep;
  }());
  Dep.target = null;
  var Watcher = /** @class */ (function () {
      function Watcher() {
          Dep.target = this;
      }
      Watcher.prototype.update = function () {
          console.log("视图更新啦～");
      };
      return Watcher;
  }());
  function observer(value) {
      if (!value || typeof value !== "object") {
          return;
      }
      Object.keys(value).forEach(function (key) {
          defineReactive(value, key, value[key]);
      });
  }
  function defineReactive(obj, key, val) {
      var dep = new Dep();
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              dep.addSub(Dep.target);
              return val;
          },
          set: function reactiveSetter(newVal) {
              if (newVal === val)
                  return;
              val = newVal;
              dep.notify();
          }
      });
  }
  var Biu = /** @class */ (function () {
      function Biu(options) {
          this._data = options.data;
          observer(this._data);
          new Watcher();
          console.log("render~", this._data.test);
      }
      return Biu;
  }());

  var o = new Biu({
      data: {
          test: "I am test."
      }
  });
  o._data.test = "hello,test.";

}));
//# sourceMappingURL=index.js.map
