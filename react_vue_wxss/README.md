Vue
====
### vue原理  
1. **原理**：它是一个精简的MVVM框架，通过双向数据绑定链接View和Model层，视图层的变动自动反应在Model上，反之亦然。而实现这这个方式，需要三个模块的支持：  
    * **Observer**
        - 能够对数据对象进行监听，如有变动，拿到最新值通知订阅者
    * **Compile**
        - 对每个元素节点的指令进行扫描和解析，根据指令模版替换数据，以及绑定相应的更新函数
    * **Watcher**
        - 作为链接二者的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定相应的回调函数，从而更新试图

> vue数据双向绑定的原理(_也即是Observer_)：采用数据劫持和发布/订阅者模式的方式，通过```Object.defineProperty()```来劫持各个属性的```setter```，```getter```，在数据变动时发布消息给订阅者，触发相应的监听回调用；   

<br />


React
====
### React原理
react采用单项数据流动， 作为一个mvc中的V（视图层），内部通过虚拟Dom进行diff运算，在更新需要更新的试图，相比较传统前端操作dom性能和体验要好很多。

### 虚拟DOM，为什么能提高性能  
- 虚拟dom是react使用js实现了一套dom结构
- 首先操作真是DOM的耗费的性能代价太大，而js操作对象会很快，而虚拟dom是js和真是dom中间加了一个缓存，通过diff算法，找出变化的dom节点，然后在更新真实的dom，从而提高性能

### react中keys和refs的作用
1. **keys**  
    - keys是react用于追踪哪些列表中的元素被修改、被添加、或者被移除的辅助标识。在diff算法中会借助此元素来判断该元素是新创建的还是被移动而来的元素，从而减少不必要元素被渲染
2. **refs**  
    - refs是react提供给我们安全访问DOM元素的, 使用方法如下：
    ```javascript
    1）回调函数 
        ref={ node => this.node = node}
    2）React.createRef()
        通过.current找到真是的dom
    ```

### react的事件机制
> react自己实现了一套事件机制，将浏览器的原生事件封装为合成事件```SyntheticEvent```，与原生事件相同的接口，不过他们屏蔽了底层浏览器的细节差异，抹平了浏览器之间的兼容问题。这些事情其实并没有附着到元素上，而是通过事件代理的方式，将所有事件统一绑定到了顶层（document），这样在更新dom的时候就不用考虑如何去处理附着在dom上的事件监听了，减少了内存的消耗，最终达到优化的目的。  
> 另外冒泡到document上的事件也不是原生浏览器事件，而是react的合成事件，因此要阻止冒泡的话需要采用```event.preventDefault```



### react的Fiber概念
> Fiber的本质上是一个虚拟的堆栈帧，按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的条件下去分段计算更新  
> Fiber的出现主要是针对react更新渲染的第一阶段，以后的更新阶段包括：  
    * ```reconcilier:``` 虚拟dom进行diff算法的对比，一旦进行就无法中断，如果有大量的计算就会一直占用主线程，导致交互和动画的卡顿现象  
    * ```commit:``` 把diff算法的结果element放到任务队列里，然后更新dom  
```javascript
1) Reconcilier阶段包括：  
componentWillMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate

2) Commit
componentDidMount
componentDidUpdate
componentWillUnmount

// 因为reconcilier阶段是可以被打断的（Fiber调和运算的作用），所以这里的生命周期可能会执行多次，从而引起bug，因此新的版本除了shouldComponentUpdate外，其他的周期都应该避免使用，也因此引进了新的API  
// getDerivedStateFromProps 代替了 componentWillReceiveProps, 会在初始化和update时调用  
// getSnapshotBeforeUpdate 代替了 componentWillUpdate, 会在update后，dom更新前调用
```

小程序
====
### 小程序原理