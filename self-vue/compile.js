//  vm => vue 实例
//  mvvm  虚拟DOM对象
// 真实dom非常的消耗内存 vm 将很多次的修改集中成一次真实的修改
 function Compile(el,vm) {
     this.vm = vm;
     this.el = document.querySelector(el);
     this.fragment = null;
     this.init();
}

Compile.prototype = {
    init() {
        // 接管模板去编译，显示的不是html，只是模板，从头开始处理模板
        this.fragment = this.nodeToFragment(this.el);
        this.compileElement(this.fragment);
        this.el.appendChild(this.fragment);
    },

    compileElement(el) {
        var childNodes = el.childNodes;
        [].slice.call(childNodes).forEach(
            (node) => {
                // console.log(node);
                var reg = /\{\{(.*)\}\}/;
                var text = node.textContent;
                if(this.isElementNoda(node)) {
                    // 去分析结点
                    this.Compile(node);
                } else if (this.isTextNode(node) && reg.test(text)) {
                    this.compileText(node,reg.exec(text)[1]);
                } 
                //   console.log(node,reg.exec(text)[1]);
                // console.log(text);
                // 递归
                if(node.childNodes && node.childNodes.length) {
                    this.compileElement(node);
                }
            });
    },
    isElementNoda(node) {
        return node.nodeType == 1;
    },
    isTextNode(node) {
        return node.nodeType == 3;
    },   
    Compile(node) {
        var nodeAttrs = node.attributes;
        Array.prototype.forEach.call(nodeAttrs,(attr) => {
            var attrName = attr.name;
            if(this.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if(this.isEventDirective(dir)) {
                    this.compileEvent(node,this.vm,exp,dir);
                } 
                else {
                    this.compileModel(node,this.vm,exp,dir);
                }
            }
        });
    },
    isDirective(attr) {
        return attr.indexOf('v-') === 0;
    },
    isEventDirective(dir) {
        return dir.indexOf('on:') ===0;
    },
    compileText: function(node,exp) {
        var initText = this.vm[exp];
        this.updataText(node,initText);
        new Watcher(this.vm,exp,value => {
            this.updataText(node,value);
        })
    },
    compileEvent(node,vm,exp,dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];
        if(eventType && cb) {
            node.addEventListener(eventType,cb.bind(vm),false);
        }
    },
    compileModel (node,vm,exp,dir) {
        var val = this.vm[exp];
        this.modelUpdater(node,val);
        new Watcher(this.vm,exp,value => {
            this.modelUpdater(node,value);
        });
        node.addEventListener('input',e => {
            var newValue = e.target.value;
            if(val === newValue) {
                return;
            }
            this.vm[exp] = newValue;
            val = newValue;
        })
    },
    modelUpdater(node,value,oldValue) {
        node.value = typeof value == 'undefined'?'':value;
    },
    updataText (node,value) {
        node.textContent = typeof value === 'undefined' ? '' : value
    },

    nodeToFragment: function(el) {
        // createDocumentFragment创建一个新的空白的文档片段
        // fragment是一个对空文档对象DocumentFragment 对象的引用
        var fragment = document.createDocumentFragment();
        // 新拷贝一份，模板进行html编译，将它替换原有的el.innerHTML
        //文档碎片不会留下任何痕迹
        var child = el.firstChild;
        while(child) {
            // console.log(child);
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    }
}