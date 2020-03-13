### interview
- 面试中常用到的知识点，帮助复习和巩固基础知识点，帮你茁壮成长，**不定期更新内容**
- 如有需要可以留言留下你的问题，后续会加入相关知识点及用例
- 部分知识点包含用例，位置位于```/当前readme文件/example文件夹内```

### 大纲
1. [javasript](https://github.com/jeremyChenMing/interview/tree/master/javascript)知识点
2. 目前比较流行的框架[react，vue](https://github.com/jeremyChenMing/interview/tree/master/react_vue_wxss)知识点
3. [html与css的](https://github.com/jeremyChenMing/interview/tree/master/html_css)知识点


> 让自己在成长的道路上有一些路标，记录成长的过程！ 






1. css
    - 盒子模型（box-sizing） 两种模型
    - BFC 作用/如何构成
    - 常见布局，圣杯/双飞翼， flex及各属性
    - transition/animation 
        * transition四个参数
        * animation/ @keyframes
            + animation name/duration/delay/timing-function/iteration-count/direction/animation-fill-mode
            + keyframes 百分比，from to
    - 兼容/rem换算方法


2. js
    - 数据类型（基本和引用）
    - 数据类型判断 typeof（基本除null） instanceof(判断引用类型的) Object.prototype.toString.call() => '[object XXX]'
    - 数据类型转换 隐式和显式转换/ 运算
    - 面向对象
        * 创建对象的方法（工厂、构造函数、原型、组合）
        * 原型/原型链
        * new的过程及返回类型的判断
        * 继承（原型继承、构造函数继承、组合继承） call/apply/bind的解释
        * 闭包（）
        * 作用域及作用域链
        * this指向
    - js事件机制/event loop
    - 节流和防抖
    - es6（let/const, 方法，promise, async/await）
    - 柯里化/扁平/去重/深、浅拷贝/排序
    - 接口请求（跨域、fetch/axios封装、存储-cookie、session、localstorage)

    - require/import 模块化



3. 浏览器
    - GUI和js引擎运行原理
    - web worker/web socket
    - url渲染的过程/tcp链接过程（三次握手、四次挥手）
    - http1.0, 1.1, 2.0
    - code码
    - 安全xss/csrf
    - 重绘和回流



4. react
    - 数据流特点（方式、通讯， props/state的区别）
    - 生命周期，周期内所做的事情
    - setState做了哪些事情
    - 新react的更新点在哪里(fiber)，新API有哪些（hooks，新周期）
    - diff算法，虚拟dom
    - key/ref
    - hoc/ssr
    - 性能优化（代码/打包/浏览）
    - redux/react-router




5. vue computed/mixins

* js设计模式（单例、观察者）/面向对象编程和函数式编程的理解
0. html5
    * video/audio/canvas/SVG
    * application cache(cache manifest 文件) services worker
    * web worker
    * 服务器发送事件除了websocket还有（Server-Sents）
    