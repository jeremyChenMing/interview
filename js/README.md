js相关问答
===
### 什么是原型对象，原型链？ 

* 构造函数
    - 用new关键字来调用的函数成为构造函数，函数名首字母一般大写  
* 原型对象
    - 每一个构造函数在被创建出的时候系统会自动给这个构造函数创建并关联一个对象，这个对象就叫做原型对象，通过prototype来访问

```javascript
function Child(name, age) {
    this.name = name
    this.age = age
}
var obj = new Child('jeremy', 30);
obj.__proto === Child.prototype // true 都指向原型队形
// 通过new一个构造函数出来的对象有一个__proto__的属性指向构造函数的原型对象
Child.prototype.constructor --> function Child(){} // 原型对象的constructor指向构造函数 
obj.__proto__.constructor === function Child(){} // true
obj.__proto__.__proto__ === Object.prototype // true
Object.prototype.__proto__ // null 顶层

查找属性，如果本身没有，则会去__proto__中查找，也就是构造函数的显式原型中查找，如果构造函数中也没有该属性，因为构造函数也是对象，也有__proto__，那么会去它的显式原型中查找，一直到null
```
>原型链实际上就是上面三者（原型，构造函数，实例）之间的关系，我们通过这层关系层层寻找对象>的属性，这种关系就构成了一种链式感，也可以定义为查找对象属性的关系。

<br />

### 什么是闭包，作用域链？  
>闭包是指有权访问另一个函数作用域中的变量的函数,创建闭包的最常见的方式就是在一个函数内创建另一个函数,通过另一个函数访问这个函数的局部变量。  
> 组成部分包含两部分：1）上下文环境A，2）在A中创建函数B 。我们调用B的时候能够访问到A中的变量，这就形成了闭包  

> 缺点：变量常驻内存，过多使用容易造成内存溢出（解决办法：手动将函数A置为空对象null）  
> 优点：缓存变量，使变量局部化  
> 作用域：就是函数和变量的可访问范围，分为全局作用域、局部作用域、块级作用域  
> 作用域链：其实就是在作用域中向上的访问形成的一种链式结构  

<br />

### 事件循环(event loop)
```
它是js执行事件顺序，分为三个部分：执行栈、webAPI、队列（callback queue）；首先执行所有的同步任务，当遇到异步任务时，调用webAPI，将任务放在队列里，当执行栈中的任务为空的时候，事件循环机制就会按照顺序从队列里取出任务放在执行栈中执行。  
异步任务分为宏任务（setTimeout,setInterval,script）和微任务(promise.then,process.nextTick);  
微任务总是执行在同步任务之后，宏任务之前
```
<br />

### 对promise的理解
```
promise是一种异步编程的解决方案，解决了回掉嵌套太多导致代码臃肿，降低可读性。es6提供了这个API，并纳入标准。  
简单说promise就是一个容器，里面存储着某个未来才会结束的事件（通常是异步）    
promise本身包含三种状态：pending，fulfilled，rejected，状态只能从pending--->fulfilled, pending--->rejected，不可逆；  
promise有.then的方法，返回也是一个promise对象，可以进行链式调用  
缺点：一旦创建无法取消，如果不设置回调，promise内部抛出错误，不会反应到外部，当处于pending状态时，无法得知目前进展到哪个阶段了。
```
<br />

### async/await、 */generator
```
async/await：es7方法，用同步的思维解决异步问题，相比与promise的优势在于处理.then的链式调用，能是代码更加的清晰，缺点是可能会导致性能问题，因为await会阻塞代码。 返回的是一个promise。   

*/generator函数：es6方法，也是用来解决异步编程的问题，通过*标记这是一个generator函数，内部通过yield来暂停代码，通过.next()来恢复执行，执行.next()返回的是一个对象{value: 值， down: 是否结束}  

async相比generator相比多了内部的执行器，其次是await的后面可以跟promise及其他原始类型的数据，yield后面只能跟thunk函数和promise  
```

### apply,call,bind的理解
```javascript
this总是指向调用某个方法的对象，但是使用call，apply可以改变this的指向问题；  
.call(thisObjet, arg1, arg2, arg3...)  
例子：A.call(B, x,y);其实就是把A函数放到B中执行，参数为x,y；  apply和call一样，只是传参的方式不一样，后者用[x,y]  
function myfunc1(){
    this.name = 'Lee';
    this.myTxt = function(txt) {
        console.log( 'i am',txt );
    }
}
function myfunc2(){
    myfunc1.call(this);
}
var myfunc3 = new myfunc2();
myfunc3.myTxt('Geing'); // i am Geing
console.log (myfunc3.name);	// Lee  

区别：前二者是立即执行，bind返回的是函数，所以需要手动触发A.bind(B)();  
```
a）手写call,apply 
```javascript
Function.prototype.myCall = function (ctx) {
    // console.log(ctx); // 指向data
    // console.log(this); // 指向say函数
    // console.log(arguments); // 参数（第一个是ctx，后面的可以多传一些）
    var ctx = ctx || window;
    ctx.fn = this;
    var arg = [...arguments].slice(1); // 获取后面的参数
    var result = ctx.fn(...arg); // 没有返回值
    delete ctx.fn;
    return result;
}
Function.prototype.myApply = function (context) {
    var context = context || window;
    context.fn = this;
    var result;
    if(arguments[1]) { // 表示apply后面的那个数组参数
        result = context.fn(...arguments[1]);  
    }else{
        result = context.fn()
    }
    delete context.fn;
    return result
}  
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```
<br />

### 对webpack的理解
```
它是一个模块加载兼打包的一个工具，他能把各种资源当作模块来加载；  
两大特色是code spliting和tree shaking  
前者：代码分割，按需加载chunks，后者：通过对比把没有用的代码通过插件的方式清除掉  

```

### Common JS、AMD、CMD、UMD的区别
- Common js是服务端模块的规范，NodeJS采用了这个规范，规范规定一个单独的文件就是一个模块，加载模块需要使用require方法，返回内部exports对象。
    + 其次CommonJS加载模块是同步了，只有加载完成才能执行后面的操作，但是浏览器环境要从服务器上加载模块，必须采用异步模式，所以就有了AMD CMD  
- AMD，使用时需要针对js采用对应的函数库也就是requireJS，主要解决的问题包括：
    + 多个js文件可能有依赖的关系，被依赖的文件需要早于依赖它的文件加载到浏览器中  
    + js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长  
- CMD，同AMD一样，需要seaJS来运行，同AMD的区别是CMD推崇就近依赖，只在用到某个模块的时候在区require，而AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块  
- UMD，是AMD和CommonJS的组合