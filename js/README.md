# js相关问答
### 1、什么是原型对象，原型链？  
```
1）用new关键字来调用的函数成为构造函数，函数名首字母一般大写  
2）每一个构造函数在被创建出的时候系统会自动给这个构造函数创建并关联一个对象，这个对象就叫做原型对象，通过prototype来访问  

通过new一个构造函数出来的对象有一个__proto__的属性指向构造函数的原型对象（Function.prototype）  
也就是Function.prototype指向原型对象

原型对象的constructor指向构造函数 
原型链实际上就是上面三者（原型，构造函数，实例）之间的关系，我们通过这层关系层层寻找对象的属性，这种关系就构成了一种链式感
```
<br />

### 2、什么是闭包，作用域链？
```
闭包是指有权访问另一个函数作用域中的变量的函数,创建闭包的最常见的方式就是在一个函数内创建另一个函数,通过另一个函数访问这个函数的局部变量  

组成部分包含两部分：1）上下文环境A，2）在A中创建函数B 。我们调用B的时候能够访问到A中的变量，这就形成了闭包  
缺点：变量常驻内容，过多使用容易早上内存溢出（解决办法：手动将函数A置为空对象null） 
优点：缓存变量，是变量局部化  
作用域：就是函数和变量的可访问范围，分为全局作用域、局部作用域、块级作用域  
作用域链：其实就是在作用域中向上的访问形成的一种链式结构
```
<br />

### 3、react原理，vue原理，小程序原理？
```
vue数据双向绑定的原理：采用数据劫持和发布/订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调用； 
```
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

### apply,call,bind的理解
```
this总是指向调用某个方法的对象，但是使用call，apply可以改变this的指向问题；  
.call(thisObjet, arg1, arg2, arg3...)  
例子：A.call(B, x,y);其实就是把A函数放到B中执行，参数为x,y；  
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
```
<br />
