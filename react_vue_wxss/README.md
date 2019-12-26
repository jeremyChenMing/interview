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

### 受控组件与非受控组件
1. 受控组件：每当表单的状态发生变化，都会被写入到组件的state中，这种组件就被称为受控组件。
> 默认值存储在state中，每当表单值发生变化，调用onChange事件处理，使用setState触发渲染
2. 非受控组件：一个表单组件没有value props就可以称为非受控组件，通常需要添加ref prop来访问渲染后的底层DOM元素
3. 区别：非受控组件状态并不会受到应用状态的控制，应用中也多了局部的组件状态，而受控组件的值来源与state

### 虚拟DOM，为什么能提高性能  
- 虚拟dom是react使用js实现了一套dom结构
- 首先操作真是DOM的耗费的性能代价太大，而js操作对象会很快，而虚拟dom是js和真是dom中间加了一个缓存，通过diff算法，找出变化的dom节点，然后在更新真实的dom，从而提高性能  
- diff算法经过两个阶段：
    + diff: 计算虚拟DOM树转换为真实DOM树
    + patch: 将差异更新到真实的DOM节点
> diff算法: react diff算法的差异查找的实质是对两个js对象的差异查找，基于三个策略:  
> 1. Web UI中的DOM节点跨层级的移动操作特别少，可以忽略不计（tree diff)
> 2. 拥有同类的两个组件将会生成相似的树形结构，不同类型的两个组件将会生成不同类型的树形结构（component diff)
> 3. 对于同一层级的一组节点，可以通过唯一的id进行区分（element diff）

> 原则上1来讲，对树的每一层遍历，如果组件不存在了则直接销毁
> 原则上2来讲，同一类的组件继续比较，也可以手动写shouldComponentUpdate，不同类型的组件直接替换
> 原则上3来讲，比较复杂，例如key的比较


### JSX是如何解析的
1. JSX是react的语法糖，它将Dom看成是一个对象（标签名，属性，子元素）。通过ReactDom.render将dom树插入到页面的某个特定元素上（#root）  
![jsx](img/jsx.png)  
> jsx是javascript语言的一种语法扩展
> jsx是描述你的组件长什么样子，在编译时会编程相应的js对象描述
> react-dom负责把这个用来描述UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上  


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

### react事件注册和分发 !!!
> 根据react事件机制，事件并没有绑定在元素上，而是通过事件代理的方式，绑定到了document上，这样再次更新的时候相应的事件将不在注册
> 事件分发主要是通过dispatchEvent进行，从事件触发组件开始，向父元素遍历  
![event](img/event.png)  



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
### react通信方式有哪些  
- 父子通信
    + 父传子用props，子传父调用父给子的方法  
- 兄弟组件通信
    + 公用父组件，数据取自父级的state作为兄弟的props用
- 跨多层级组件通信  
    + 可以使用context使用  
    ```javascript
    const ctx = React.createContext()
    class Parent extends React.Component {
        render () {
            return (
                // value 就是传入 Context 中的值
                <ctx.Provider value='yck'>
                    <Child />
                </ctx.Provider>
            )
        }
    }
    class Child extends React.Component {
        render () {
            return (
                <ctx.Consumer>
                    // 取出值
                    {context => (
                        name is { context }
                    )}
                </ctx.Consumer>
            );
        }
    }
    // 或者使用useContext
    function Box() {
        const value = useContext(ctx); // 只能用在函数组件中
        return(
            <div>
                {value} ---
            </div>
        )
    }
    ```
### HOC是什么  
+ HOC俗称高阶组件：就是一个函数，接收一个组件作为参数，并返回一个新的组件
> 作用就是提高组件的复用性，将不同组件需要公用的方法抽取出来，达到共用的效果
> 常见的HOC有redux中的connect()(wrapperComponent), antd中Form.create()等


### React的生命周期mount(挂载)和update(更新)描述下

![16版本后的生命周期图](img/life.jpg)


### react中的isBatchingUpdates、Transaction
这两个概念主要是处在setState中，也是react更细DOM最终要的一环，setState最终是通过enqueueUpdate执行state更新的，  
- isBatchingUpdates：标志者react是否处在一个批量更新的状态，其值是一个布尔值。
- Transaction：事务，类似react终的一个中间件，保证数据的一致性。  
setState的更新流程如下图：
![progress](img/progress.jpeg)  
1. partialState可以是object || function，它会产生新的state以一种Object.assign（）的方式跟旧state进行合并
2. enqueueState做了两件事：将新的state放进数组里，用enqueueUpdate来处理将要更新的实例（_instance)
3. 是否处于批量创建/更新组件的过程（```batchingStrategy.isBatchingUpdates```）,如果=false,则处理调用```batchingStrategy.batchedUpdates```去执行 update state事务，如果=true,则将当前的组件放在dirtyComponents数组中，所以不是每一次的setState都会更新组件。
4. 如果当前事务正在更新过程中，则使用enqueueUpdate将当前组件放在dirtyComponents里，如果当前不在更新过程的话，则执行更新事务。
5. transaction对象暴露了一个perform的方法，用来执行anyMethod，在anyMethod执行的前，需要先执行所有wrapper的initialize方法，在执行完后，要执行所有wrapper的close方法。


### ssr(sever slide rendering)  
1. 即服务端渲染，可以优化首屏的加载速度，优化搜索引擎爬虫爬取页面  
2. 借助react的属性renderToString || renderToStaticMarkup这个API来实现，流程如下图  
![ssr](img/ssr.png)  
> 区别在于前者渲染的时候带有data-reactid，而后者没有



### 性能的优化
- shouldComponentUpdate, 针对这个周期进行重写，返回布尔值从而进行是否继续更新  
- 针对复杂数据的结构，可以在上述周期中使用immutable库来产生不可变对象，一旦数据变动就会生成新的对象，这样前后对比就会很方便，从而提高性能  
- 如果只是浅比较，可以使用pureComponent，或者hook函数中的react.mome()  
- 使用production版本的react.js  
- 使用key来帮助react识别列表中自组件的最小变化，不建议使用index，因为每次index会变




小程序
====
### 小程序原理