function resolvePromise(promise, val, resolve, reject) {

    if (promise === val) {
        return reject(new TypeError('Chaining cycle detected forpromise'))
    }
    var called;
    if (val !== null && (typeof val === 'object' || typeof val === 'function')) {
        try {
            var then = val.then;
            if (typeof then === 'function') {
                then.call(val, success => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise, success, resolve, reject);
                }, error => {
                    if (called) return;
                    called = true;
                    reject(error)
                })
            } else {
                resolve(val)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(error)
        }
    } else {

        resolve(val)
    }
}

function MyPromise(fn) {
    var that = this;
    that.status = 'pending'
    that.onFulfilledArr = [];
    that.onRejectedArr = [];
    that.value = undefined
    that.error = undefined

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'fulfilled'
            that.value = value;
            that.onFulfilledArr.forEach(fn => {
                fn()
            })
        }
    }

    function reject(error) {
        if (that.status === 'pending') {
            that.status = 'rejected'
            that.error = error

            that.onRejectedArr.forEach(fn => {
                fn()
            })
        }
    }
    try {
        fn && fn(resolve, reject)
    } catch (err) {
        reject(err)
    }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    };
    var self = this;
    var promise2;
    promise2 = new MyPromise(function (resolve, reject) {
        if (self.status === 'pending') {
            self.onFulfilledArr.push(() => {
                var result = onFulfilled(self.value);
                resolvePromise(promise2, result, resolve, reject)
            })
            self.onRejectedArr.push(() => {
                var result = onRejected(self.error);
                resolvePromise(promise2, result, resolve, reject)
            })
        }
        if (self.status === 'fulfilled') {
            onFulfilled(self.value)
            resolve()
        }
        if (self.status === 'rejected') {
            onRejected(self.error)
            reject()
        }
    })
    return promise2
}
MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let n = 0; n < promises.length; n++) {
            promises[n].then(resolve, reject)
        }
    })
}
MyPromise.all = function (promises) {
    let arr = [];
    let i = 0;

    function processData(index, data, resolve) {
        arr[index] = data;
        i++;
        if (i == promises.length) {
            resolve(arr);
        };
    };
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data, resolve);
            }, reject);
        };
    });
}

new MyPromise(function (resolve, reject) {
    // resolve('成功！')
    // reject('失败')
    setTimeout(function () {
        resolve('异步成功！')
        // reject('异步失败！')
    }, 1000)
}).then(first => {
    console.log(first, '第一次then-success')
    return new Promise(function (resolve, reject) {
        resolve('123456')
    })
}, error => {
    // console.log(error, '第一次then---error')
    // return '第一error'
}).then(second => {
    console.log(second, '第二次then -- success')
}, err => {
    // console.log(err, '第二次then---err')
})




let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success!!!')
    }, 3000)
})

let p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('failed!!!')
    }, 2000)
})

MyPromise.race([p1, p2]).then((result) => {
    console.log(result)
}).then(data => {
    console.log(data)
})
MyPromise.all([p1,p2]).then( data => {
    console.log(data)
})