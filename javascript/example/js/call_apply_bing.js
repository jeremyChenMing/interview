Function.prototype.myCall = function(context) {
    const ctx = context || window; // 是否传入绑定的this对象，没有就指向window
    ctx.fn = this;
    const arg = [...arguments].slice(1); //获取参数
    const result = ctx.fn(...arg)
    delete ctx.fn; // 删除该方法，不会对传入的对象又污染
    return result
}


Function.prototype.myApply = function(context) {
    const ctx = context || window; // 是否传入绑定的this对象，没有就指向window
    ctx.fn = this;
    var result
    if(arguments[1]){
        result = ctx.fn(...arguments[1])
    }else{
        result = ctx.fn()
    }
    delete ctx.fn; // 删除该方法，不会对传入的对象又污染
    return result
}


Function.prototype.myBind = function(context) {
    const ctx = context || window; // 是否传入绑定的this对象，没有就指向window
    const self = this;
    const arg = [...arguments].slice(1);
    return function () {
        const allArgs = arg.concat([...arguments]);
        return self.myApply(ctx, allArgs)
    }
}