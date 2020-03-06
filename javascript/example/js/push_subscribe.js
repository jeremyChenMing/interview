// 简单实现发布订阅者

// 封装
// 进行封装，就可以为每个对象进行初始化的操作了
var event = {
    list: [],
    listen: function (key, fn) {
        if (!this.list[key]) {
            // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
            this.list[key] = [];
        }
        this.list[key].push(fn); // 订阅消息添加到缓存列表
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments); // 取出消息类型名称
        var fns = this.list[key]; // 取出该消息对应的回调函数的集合

        // 如果没有订阅过该消息的话，则返回
        if (!fns || fns.length === 0) {
            return;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); // arguments 是发布消息时附送的参数
        }
    },
    remove: function (key, fn) {
        var fns = this.list[key];
        // 如果key对应的消息没有订阅过的话，则返回
        if (!fns) {
            return false;
        }
        // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
        if (!fn) {
            fn && (fns.length = 0);
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
}
var initEvent = function (obj) {
    for (var n in event) {
        obj[n] = event[n]
    }
}

const shoeObj = {}; // 定义发布者
initEvent(shoeObj); // 初始化对象

// 订阅消息
shoeObj.listen('red', function (size) {
    console.log('red 大小', size)
})
shoeObj.listen('blue', function (size) {
    console.log('blue--大小', size)
})

// 加入key是为了订阅哪一种就触发哪一种，否则的话都将会触发的
shoeObj.trigger('red', 43);
shoeObj.trigger('blok', 40);


// 为此我们需要完整的封装一个
var Event = (function () {
    var list = {},
        listen,
        trigger,
        remove;
    listen = function (key, fn) {
        if (!list[key]) {
            list[key] = [];
        }
        list[key].push(fn);
    };
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = list[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    remove = function (key, fn) {
        var fns = list[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var i = fns.length - 1; i >= 0; i--) {
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();
// 测试代码如下：
Event.listen("color",function(size) {
    console.log("尺码为:"+size); // 打印出尺码为42
});
Event.trigger("color",42);


// 实际应用：假如页面有一个按钮，每次点击按钮后，div会显示此按钮点击的总次数
// <button id="count">点将我</button>
// <div id="showcount"></div>

// a.js 负责点击时间和发布消息
var a = (function () {
    var count = 0;
    var btn = document.getElementById('count')
    btn.onclick = function () {
        Event.trigger('count', ++count)
    }
})()

// b.js 负责监听这个消息
var a = (function () {
    var div = document.getElementById('showcount')
    btn.onclick = function () {
        Event.listen('count', function (count) {
            div.innerText = count
        })
    }
})()