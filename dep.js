class Dep {
  constructor() {
    this.subscribers = []; // 存储依赖（观察者）
  }

  // 添加依赖（观察者）
  depend() {
    if (Dep.target && !this.subscribers.includes(Dep.target)) {
      this.subscribers.push(Dep.target);
    }
  }

  // 通知所有依赖进行更新
  notify() {
    this.subscribers.forEach(sub => sub.update());
  }
}

// 全局变量，用于保存当前正在处理的依赖
Dep.target = null;

class Watcher {
  constructor(cb) {
    this.cb = cb; // 回调函数
    this.value = this.get(); // 初始化时获取属性值
  }

  // 获取属性值，并收集依赖
  get() {
    Dep.target = this;
    this.cb();
    Dep.target = null;
  }

  // 更新依赖
  update() {
    this.value = this.get();
  }
}

class Vue {
  constructor(options) {
    this._data = options.data;
    this._proxyData(this._data);
  }

  _proxyData(data) {
    for (let key in data) {
      let dep = new Dep(); // 创建属性的依赖收集器
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          dep.depend(); // 收集依赖
          return data[key];
        },
        set(newValue) {
          if (newValue !== data[key]) {
            data[key] = newValue;
            dep.notify(); // 设置属性值时触发依赖更新
          }
        }
      });
    }
  }
}

// 使用示例
const vm = new Vue({
  data: {
    name: 'John',
    age: 25
  }
});

// 创建 Watcher 实例，观察 name 属性
const watcher = new Watcher(() => {
  console.log('Name changed:', vm.name);
});

console.log(watcher)
// // 修改 name 属性的值
// vm.name = 'Doe'; // 输出：Name changed: Doe
// VM1956:78 Name changed: John
// VM1956:78 Name changed: Doe
// 'Doe'
// vm.name = 'wiu'
// VM1956:78 Name changed: wiu
// 'wiu'