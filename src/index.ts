/**
 * Dep订阅器 Watcher（Dep.target）订阅对象
 */
interface Sub {
  update: Function;
}

class Dep {
  static target: any;
  subs: Sub[];
  constructor() {
    this.subs = [];
  }

  addSub(sub: Sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

Dep.target = null;

class Watcher {
  constructor() {
    Dep.target = this;
  }

  update() {
    console.log("视图更新啦～");
  }
}

function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}

export default class Biu {
  _data: any;
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    new Watcher();
    console.log("render~", this._data.test);
  }
}
