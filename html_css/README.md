
# ---html----
超文本标记语言
### doctype
```javascript
<!DOCTYPE html> // 为了指示浏览器关于页面使用哪个HTML版本进行编写的指令（html表示html5
// 不区分大校区doctype
```
### meta  
可选属性：http-equiv、name，必须属性：content
```javascript
'http-equiv': content-type、expires、refresh、set-cookie
'name': author、description、keywords、generator、revised、others  

<meta charset='utf-8' /> // 申明编码   utf-8 || GBK
<meta name="keywords" content="HTML,ASP,PHP,SQL" /> // 关键字  
<meta name="description" content="150 words" /> // 描述  

<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>  
// `width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边  

<meta name="apple-mobile-web-app-capable" content="yes" />
// 启用 WebApp 全屏模式

<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
// 隐藏状态栏/设置状态栏颜色：只有在开启WebApp全屏模式时才生效。content的值为default | black | black-translucent 

// renderer 使用哪个浏览器内核
<meta name="renderer" content="webkit" /> //默认webkit内核 
<meta name="renderer" content="ie-comp" /> //默认IE兼容模式 
<meta name="renderer" content="ie-stand" /> //默认IE标准模式
<meta name="renderer" content="webkit|ie-comp|ie-stand"/>





// 优先使用IE最新版本和Chrome
// 告知浏览器采用何种版本渲染当前页面
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> // 关于X-UA-Compatible
<meta http-equiv="X-UA-Compatible" content="IE=6" />// 使用IE6
<meta http-equiv="X-UA-Compatible" content="IE=7" />// 使用IE7
<meta http-equiv="X-UA-Compatible" content="IE=8" />// 使用IE8

// 用于设定网页的到期时间，过期后网页必须到服务器重新传输
<meta http-equiv="expires" content="Sunday 22 July 2016 16:30 GMT" />
// 用于指定缓存机制在整个请求中必须服从的指令
<meta http-equiv="cache-control" content="no-cache">
```
### style， link 
定义HTML文档的样式信息(style)  
* type='text/css' 规定样式表为MIME类型
用于链接外部的样式表(link)  
* href:文档的位置
* ref: 定义文档与被链接文档之间的关系   

> ref是relationship的缩写 stylesheet是样式表单 也就是css中ss的缩写
```javascript
<link rel="stylesheet" type="text/css" href="theme.css"> 
``` 

### script
定义文档脚本  
- src：外链脚本
- type：规定脚本类型
- async：规定异步执行脚本
- defer：规定当前页面已完成解析后，执行脚本
```javascript
<script type="text/javascript">代码区域</script>
```

### 易忘使用标签 
1. sub：定义下表
2. sup：定义上表
3. ins: 插入文字（底边有横线）
4. del: 删除文字（中间有横线）
### 易忘记标签 table、iframe、form
```javascript
<table border="1">
    <caption>Monthly savings</caption> // 表格标题
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
// width: 规定表格宽度
// border: 边框宽度
// cellpadding: 单元边缘与其内容之间的空白
// cellspacing: 单元格之间的空白

// td 属性 colspan / rowspan合并单元格



<form action="MAILTO:someone@w3school.com.cn" method="post" enctype="text/plain">

<h3>这个表单会把电子邮件发送到 W3School。</h3>
姓名：<br />
<input type="text" name="name" value="yourname" size="20">
<br />
电邮：<br />
<input type="text" name="mail" value="yourmail" size="20">
<br />
内容：<br />
<input type="text" name="comment" value="yourcomment" size="40">
<br /><br />
<input type="submit" value="发送">
<input type="reset" value="重置">

</form>
// name: 表单名称
// action: 提交的地址
// method: 提交方式 get/post   
// enctype: application/x-www-form-urlencoded、 multipart/form-data、 text/plain



<iframe src="http://www.runoob.com"></iframe> 
// src：网页地址
// width/height：宽度/高度
// frameborder：是否显示边框
```











# ---CSS----

### 盒子模型
1. 标准的和IE的区别在于width的包含范围不同
    - 标准：width = content
    - IE： width = content + padding + border  
2. 所以有了box-sizing：border-box（IE盒子模型）、content-box（标准盒子模型）padding-box（算content + padding）的出现，常用IE标准盒子模型  

3. body元素对象取值：clientWidth,offsetWidth,scrollWidth,clientLeft等  
用例可以参考[body.html](example/body.html) 

4. 盒子模型图  
![BOX](img/box.png) 

### link标签和import标签的区别  
- link属于html标签，而@import是css提供的
- 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载
- link是html标签，因此没有兼容性，而@import只有IE5以上才能识别
- link方式样式的权重高于@import的  

### click在ios上有300ms延迟，原因及如何解决？
1. 增加meta信息，禁止缩放
```javascript
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```
2. FastClick：是一个轻量库，实现的原理为在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉 


### css中: 和 :: 的区别
1. 伪类  - :link, :hover等
2. 伪元素- ::before, ::after
> 伪类可以独立于文档的元素来分配样式，而且可以给任何元素，伪元素所控制的内容和元素控制的内容是一样的，但是伪元素不存在dom中 

### css预处理语言sass、less
1. sass做的比较专业，复杂，稳定
2. less只是对css做了一些扩展，体积小
> 区别在于实现方式不同，less基于js，sass基于ruby实现的  
> less使用@符号，sass使用$符号  



### 布局
1. 双飞翼布局和圣杯布局
    - 都是标准的解决左右固定宽，中间内容自适应布局需求，不同点在于中间的自适应的宽度问题，圣杯布局中间宽度为总屏幕宽，而双飞翼布局多套了一层div，用marigin去解决宽度，所以宽度是总宽减去双翼的宽度，大概如下图：![img](img/layout1.png) 
2. flex来实现圣杯布局是比较方便的
3. 定位来实现圣杯布局 

### transition: 过渡动画
1. 包含四个属性值
    - transition-property: 属性
    - transition-duration: 时间
    - transition-timing-function: 速度曲线 linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier(n,n,n,n)「cubic-bezier函数」
    - transition-delay: 延迟
    ```js
    transition: width .2s ease-in ;
        <!-- 钩子函数transitionend, 标示动画结束时运行 -->
        var div = document.getElementById('div')
        document.addEventListener('transitionend', function () {
            console.log('123')
        })
    ```
### animation / keyframes
1. 包含属性
    - animation-name: 动画名称，对应的@keyframes
    - animation-duration: 时间
    - animation-time-function: 速度曲线 linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier(n,n,n,n)「cubic-bezier函数」
    - animation-delay: 延迟
    - animation-iteration-count: 动画播放次数 n/infinite 对应的次数和无限次， 默认1次
    - animation-direction: 对应动画是否轮流反向播放 normal/alternate 正常播放/轮流反向播放
    - animation-fill-mode: 属性规定动画在播放之前或者之后，其动画效果是否可见 none/forwards/backwards/both 不改变默认/当动画完成保持最后一个属性值/在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义/向前和向后填充模式都被应用
    ```js
        // 切记不可以写0，一定要加单位
        animation:animate 5s ease infinite 3s alternate; 
        @keyframes animate {
            0% {
                width: 100px;
            }

            50% {
                width: 300px;
            }

            100% {
                width: 150px;
            }
        }
        @keyframes mymove {
            from {
                left: 0px;
            }

            to {
                left: 200px;
            }
        }

        <!-- 动画结束时跳用 -->
        var div = document.getElementById('div')
        document.addEventListener('animationend', function () {
            console.log('123')
        })
    ```
    - animation-fill-mode
    ```js
        .box {
            width: 100px;
            height: 100px;
            background-color: cyan;
            transform: translateY(0);
        }

        .box.on{
            animation: move 1s 2s;
            animation-fill-mode: both;
        }

        @keyframes move {
            from {
                transform: translateY(-50px)
            }

            to {
                transform: translateY(50px)
            }
        }
        // forwards 标示动画会停留在结束的那一刻
        // backwards 表示在有delay时才起作用，当初始状态-delay结束之间，动画会停留在第一帧，也就是上面的-50px，初始状态就是指没有transform属性时的状态（0px）
        // both就是上面两个的和
    ``` 


### rem设计原理  

### 常见的兼容