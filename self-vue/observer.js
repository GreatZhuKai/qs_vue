function Observer(data) {
    // n个{{title}} -> push 数组
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data,key,data[key]);
        })
    },
    defineReactive(data,key,val) {
        var dep = new Dep();
        // 在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回这个对象
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get:function getter () {
                if(Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val;
            },
            set:function setter (newVal) {
                if(newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub (sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}
Dep.target = null;

function observe(value,vm) {
    if(!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}