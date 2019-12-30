
function MyPromise(fn) {
    var that = this;
    that.status = 'pending';
    that.value = undefined;
    that.onFulfilledArr = [];
    that.onRejectedArr = [];
    function resolve(value) {
        if(that.status === 'pending') {
            that.status = 'resolve'
            that.value = value    
            that.onFulfilledArr.forEach( fn => {
                fn(that.value)
            })
        }
    }
    function reject(value) {
        if(that.status === 'pending') {
            that.status = 'rejected'
            that.value = value    
            that.onRejectedArr.forEach( fn => {
                fn(that.value)
            })
        }
    }
    try{
        fn & fn(resolve, reject)
    }catch(err) {
        reject(err) // 防止调用的时候抛出错误时用到这里
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    var self = this;
    var promise2;
    if(self.status === 'pending') { // 异步
        promise2 = new MyPromise(function(resolve, reject) {
            self.onFulfilledArr.push(() => {
                var result = onFulfilled(self.value);
                resolve(result)
            })
            self.onRejectedArr.push(() => {
                var result = onRejected(self.value);
                reject(result)
            })
        })
    }
    if(self.status === 'resolve') { // 同步
        console.log('同步')
        promise2 = new myPromise(function(resolve, reject) {
            var result = onFulfilled(self.value);
            resolve(result); // 多次.then，通过return 返回值给到下一个then的参数
        })
    }
    if(self.status === 'rejected') { // 同步
        promise2 = new myPromise(function(resolve, reject) {
            var result = onRejected(self.value)
            reject(result); // 多次.then，通过return 返回值给到下一个then的参数
        })
    }
    return promise2
}

// 实际调用用例
var selfPromise = new MyPromise((resolve, reject) => {
    // resolve('成功')
    // reject('失败')
    setTimeout(function() {
        resolve('异步成功')
        // reject('异步失败')
    }, 1000)
}).then( data => {
    console.log(data)
    return '第一次then返回success值'
}, err => {
    console.log(err)
    return '第一次then返回error值'
})
selfPromise.then( need => {
    console.log(need, '2')
}, (err) => {
    console.log(err, '1')
})
