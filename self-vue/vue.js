function Vue(options) {
    this.data = options.data || {};
    this.methods = options.methods || {};
    Object.keys(this.data).forEach(
        key => {
            this.proxyKeys(key);
        });
        observe(this.data);
        // options.mounted.call(this);
        new Compile(options.el,this);
        // mounted发生的最佳时期
        // 生命周期函数，在相应时刻发生的事件钩子
        options.mounted.call(this);
}

Vue.prototype = {
    proxyKeys (key) {
        // console.log(key);
        var self = this;
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function getter() {
                console.log(`您在获取${key}`);
                return self.data[key];
            },
            set:function setter (newVal) {
                self.data[key] = newVal;
                console.log(`您设置了${key}值为${newVal}`);
            }
        });
    }
}