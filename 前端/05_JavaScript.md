## JavaScript

弱类型动态的脚本语言

#### Event Loop

**调用栈**

单线程执行

**消息队列（Message Queue）**

fetch、setTimeOut、setInterval，事件回调

**微任务队列（Microtask Queue）**

Promise，async await

创建的微任务队列会在调用栈执行完之后立即执行，执行过程中新加入的微任务队列也会执行

- 宏任务

```js
I/O  setTimeout  setInterval  setImmediate[node]   requestAnimationFrame
```
  
- 微任务

```js
process.nextTick[node]  MutationObserver  Promise.then  catch  finally
```

js先执行同步任务，遇到微任务将微任务压入微任务队列，遇到宏任务会将宏任务压入到宏任务队列中，当宏任务执行完毕的时候会把当前微任务队列里面的任务执行完毕，当所有的
微任务都执行完了，就接着执行下一个宏任务，期间执行的逻辑也是一样的，先执行同步任务，然后将微任务压入队列，然后执行当前的微任务，当微任务执行完之后再执行下一个宏任务
一次往复循环

##### 数据转换

```js
parseInt()     // 转成整数
parseFloat()   // 转成浮点型数据
+              // 隐式转换
```

##### 数学运算符

```js
/*
 * 纯数字字符串与数字进行除加法之外的数学运算时，能进行隐式转换
 * 特殊字符，布尔值，null与数字进行计算时，所有的数学运算都能被隐式转换
 * 非纯数字字符串和undefined，不能进行隐式转换，与任何数字进行运算得到都是NaN
 * 任何数字和NaN进行运算，得到都是NaN
 */
```

##### 比较运算符

```js
/*
 * 纯数字字符串会隐式转换成数字，true转为1，false转为0，null转为0。但是做相等和全等判断的时候，null不等于0.
 * 字符串与字符串比较，比较的不是大小，长短，比较的是字符的Unicode编码顺序。顺序靠前的小于顺序靠后的。
 * 字符编码顺序：数字，大写字母，小写字符
 * 第一个字符相同的，依次比较字符
 */

// 查看字符串的Unicode编码
'abc'.charCodeAt(0)      // 65
String.fromCharCode(97)  // a

// 数字[0-9]：48 - 57
// 字母[A-Z]：65 - 90
// 字母[a-z]：97 - 122
```

##### 逻辑运算符

```js
// !! 可以对任何数据求布尔值

// 联系
false || 100  => 100
false && 1 => false
true && 100 => 100
```

##### Math对象

```js
Math.random()    // (0, 1)之间的随机数
Math.PI          // π
Math.pow()       // 幂
Math.sqrt()      // 开方
```

##### 函数

数据类型都是function

简单数据类型赋值是值，引用数据类型赋值是地址

函数是定义会提升整个函数，函数表达式只会提升变量的声明

##### 正则

```js
// 负向类
[^0-9]

/* m 多行匹配
 * g 全局
 * i 忽略大小写
 *
 */
```

**字符集**

**边界**

```js
/* ^ 开头匹配
 * $ 结尾匹配
 * \b 单词边界
 * \B 非单词边界
 *
 */
```

**量词**

```js
/* {n}   出现n次
 * {n,m} 至少n次最多不超过m次
 * {n,}  至少n次
 * +     至少出现一次
 * *     出现0次或多次
 * ?     表示出现0或1次
 */
```

**分组**

```js
/* () 定义分组
 * | 或操作符
 * 外部捕获使用 $num
 * 内部捕获使用 \num
 * 内部捕获需要两个位置的内容一致的时候起效
 */

var str = '123*456'
console.log("======================")
console.log(str.replace(/(\d+)\*(\d+)/, (match, $1, $2) => `${$2}*${$1}`))
console.log(str.replace(/(\d+)\*(\d+)/, '$2*$1'));
console.log("======================")

var str1 = 'abc*abc'
str1.replace(/(\w+)\*(\1)/, (match, $1, $2) => {
    console.log('************');
    console.log($1, $2);
    return `${$2}*${$1}`
})

// 非捕获组 不会创建反向引用的分组
// (?=exp)  表示其后紧跟指定字符串的字符串
// (?!exp)  表示其后没有紧接字符串的字符串
console.log(str1.replace(/(alt)=("hello")/, function() {
    console.log(arguments);
}));
console.log(str1.replace(/(alt)=(?="hello")/, function() {
    console.log(arguments);
}));
console.log(str1.replace(/(alt)=(?!"hello")/, function() {
    console.log(arguments);
}));
```

**预定义类**

```js
.   [^\n\r]  除换行和回车之外的任意字符
\d  [0-9]    数字字符
\D  [^0-9]   非数字字符
\s  [\t\n\x0B\f\r]   空白符
\S  [^\t\n\x0B\f\r]  非空白符
\w  [a-zA-Z_0-9]     单词字符(字母、数字、下划线)
\W  [^a-zA-Z_0-9]    非单词字符(字母、数字、下划线)
[\u4e00-\u9fa5]      中文
```

##### 定时器

异步执行，第二个参数之后都是传入第一个回调的参数，递归调用需要清除原来的定时器

### DOM

```js
document.title
document.head
document.body

document.getElementById(id)  // 获取的元素是对象 

// 获取特殊属性 for class
ele.htmlFor
ele.className
ele.rowSpan
ele.colSpan

// 点语法 获取的对象可以继续打点
// 点语法得到的是对象 getAttribute 得到的是字符串
```

##### 事件

```js
onclick = function() {} // 多次绑定只有一个起效
ondbclick
onmouseenter, onmouseleave, onfocus, onblur, onmousedown, onmouseup
onload   // 加载完毕之后

window.addEventListener(event, function() {}) // 可以多次绑定
```

##### 样式计算

```js
// 高级浏览器
// var style = getComputedStyle(label);
// console.log("======================")
// console.log(style.getPropertyValue('font-size'))
// console.log(style.fontSize);
// console.log(style['fontSize']);
// console.log(style['font-size']);
// console.log("======================")

// ie 浏览器
var style = label.currentStyle
console.log("======================")
console.log(style)
console.log(style.fontSize)
console.log(style['fontSize'])
console.log(style['font-size'])
console.log("======================")

// 封装
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele)[prop]
    }
    return ele.currentStyle[prop]
}
```

##### 节点类型

通过nodeType判断

```js
1 元素类型  元素名称    null[值]
3 文本类型  #text     文本内容
8 注释类型  #comment  注释内容
9 文档类型  

// 获取节点
function getNodes(nodes) {
    var res = [];
    for (var item of nodes) {
        if (/\S/gm.test(item.nodeValue)) {
            res.push(item)
        }
    }

    return res;
}

// 获取父节点
child.parentNode
// 兄弟节点
node.nextSibling
node.previousSibling
```

##### 元素操作

```js
// 创建元素
document.createElement(tagName/eleString);
// 创建文本
document.createTextNode(text)

// 添加元素 [后面追加]
parent.appendChild(chid)
// 删除节点
parent.removeChild(child)

// 节点插入 [后面为null的时候同appendChild]
parent.insertBefore(newChild, oldChild | null)

// 在第一个元素前面插入
parent.prependChild(parent, child)

// 替换 [返回被替换的元素]
parent.replaceChild(newChild, oldChild)

// 节点克隆 [true：连同子节点一起复制]
node.cloneNode(bool)
```

JQuery元素操作

```js
$1.append(eleStr|$2) // 将eleStr|$2 添加到$1中
$2.appendTo($1)      // 将$2添加到$1中[$2要求是jq对象]
$1.prepend($2)       // 将$2添加到$1中的第一个
$1.prependTo($2)     // 将$1添加到$2中的第一个

$2.insertBefore($1)  // 在$1前插入$2
$2.insertAfter($1)   // 在$1后插入$2

$1.before($2)        // 在$1前面插入$2
$1.after($2)         // 在$1后面插入$2

// 包装
$(el).wrap('<div></div>')  // 给每个元素都包装一层<div></div>
$(el).wrapAll('<div></div>')  // 在最外层包装一个<div></div>

// 使用$2替换$1
$1.replaceWith($2)    
$2.replaceAll($1)

$1.empty()    // 清空$1的所有子元素
$1.remove()   // 删除$1
$1.clone(bool)    // 克隆 bool = true 拷贝事件
```

##### this

正常：谁调用指向谁

修改this指向

call

> 第一个参数是this要指向的对象，第二个参数开始是要传递的参数

apply

> 第一个参数是this要指向的对象，第二个参数是数组

上面两个绑定之后会立即执行

bind

> 第一个参数是要绑定的对象，第二个参数开始是要传入的参数
>
> 返回的是修改绑定对象的对象，不会立即执行，不会修改原来的对象

##### 事件流程

事件捕获和事件冒泡

> 捕获：一层一层往下执行，直到触发事件的元素
>
> 冒泡：一层一层往上执行，直到顶层

DOM0级事件 是处于事件冒泡阶段执行

DOM2级事件绑定

事件名称：addEventListener

```js
ele.addEventListener(type, fn, bool)     
// type 不带on的事件
// bool 表示绑定捕获阶段


// IE事件绑定 只能绑定在冒泡阶段
dom.attachEvent(type, fn)  // type：带on类型的事件


// DOM0 同时绑定多个事件
var btn = document.getElementById('btn');
btn.onclick = function() {
    console.log("======================")
    console.log('click', 1111, this)
    console.log("======================")
}

// 缓存起来
var fn = btn.onclick;
btn.onclick = function() {
    fn();
    console.log("======================")
    console.log('click', 2222, this)
    console.log("======================")
}

// DOM2 同时绑定多个事件
btn.addEventListener('click', function() {
    console.log("======================")
    console.log('addEventListener', 333)
    console.log("======================")
})
btn.addEventListener('click', function() {
    console.log("======================")
    console.log('addEventListener', 444)
    console.log("======================")
})
// this始终指向触发对象


// IE DOM0 和 DOM2级事件
// DOM0 级 只能绑定一个事件
// DOM2 级 可绑定多个事件
// 先执行DOM0级事件，再执行逆序DOM2级事件

btn.onclick = function() {
    console.log("======================")
    console.log('click', 111, this)
    console.log("======================")
}

fn = box1.onclick;
btn.onclick = function() {
    fn();
    console.log("======================")
    console.log('click', 222, this)
    console.log("======================")
}

btn.attachEvent('onclick', function() {
    console.log("======================")
    console.log('attach event', this, 111)
    console.log("======================")
})

btn.attachEvent('onclick', function() {
    console.log("======================")
    console.log('attach event', this, 222)
    console.log("======================")
})

// 移除事件 匿名函数无法移除
btn.onclick = null;
delete btn.onclick
btn.removeEventListener(type, fn, bool)
btn.detachEvent(type, fn, bool)
```

##### 事件对象

```js
offsetX  // 鼠标位于元素内部的位置，受到子元素的影响[点击的时候如果点击的是内部的子元素，则获取点击坐标在内部子元素的位置]
offsetY
clientX  // 鼠标位于浏览器视口的位置（x,y等价）
clientY
pageX    // 鼠标位于页面中的位置(layerX, layerY等价)
pageY
screenX  // 屏幕中的位置[整个屏幕中的位置]
screenY

scrollX  // 滚动的位置
scrollY

// 兼容方式
var e = e || window.event;

// 阻止冒泡
e.stopPropagation()    // 高级浏览器
e.cancelBubble = true; // IE

// 阻止默认行为
e.preventDefault();  // 高级浏览器
e.returnValue = false  // IE浏览器
// DOM0 级事件可以使用return false 阻止默认行为


// IE 示例
var sub = document.getElementById('submit');

sub.onclick = function(e) {
    var e = e || window.event;
    e.returnValue = false;
    
	//  return false;
}

// 因为各个浏览器的事件对象不一样, 把主要的时间对象的属性和方法列出来;
// bubble ：    表明事件是否冒泡
// cancelable ：  表明是否可以取消冒泡
// currentTarget ： 当前时间程序正在处理的元素, 和this一样的;
// defaultPrevented： false ，如果调用了preventDefualt这个就为真了;
// detail： 与事件有关的信息(滚动事件等等)
// eventPhase： 如果值为1表示处于捕获阶段， 值为2表示处于目标阶段，值为三表示在冒泡阶段
// target || srcElement： 事件的目标
// trusted： 为ture是浏览器生成的，为false是开发人员创建的（DOM3）
// type ： 事件的类型
// view ： 与元素关联的window， 我们可能跨iframe；
// preventDefault()    取消默认事件；
// stopPropagation() 取消冒泡或者捕获；
// stopImmediatePropagation() (DOM3)阻止任何事件的运行；
// //stopImmediatePropagation阻止 绑定在事件触发元素的 其他同类事件的callback的运行

// IE下的事件对象是在window下的，而标准应该作为一个参数, 传为函数第一个参数;
// IE的事件对象定义的属性跟标准的不同，如：
// cancelBubble 默认为false, 如果为true就是取消事件冒泡;
// returnValue 默认是true，如果为false就取消默认事件;
// srcElement, 这个指的是target, Firefox下的也是srcElement;
```

##### 快捷尺寸

```js
clientWidth, clientHeight // content + padding

offsetWidth, offsetHeight // content + padding + border

clientLeft, clientTop  //  元素边框的厚度

// JQuery
ele.width()/ ele.height()  // 宽高
ele.innerWidth(), ele.innerHeight()  // content + padding
ele.outerWidth(), ele.outerHeight()  // content + padding + border
ele.outerWidth(true), ele.outerHeight(true)  // content + padding + border + margin
```

##### 定位值

```js
ele.offsetLeft, ele.offsetTop   // 获取元素的定位值

// JQuery
$(dom).position()  // 作用同上返回一个对象
$(dom).offset()    // 获取元素距离页面之间的top和left值

// 获取具有相对定位的父元素
ele.offsetParent
```

##### 页面卷动值

```js
document.documentElement.scrollTop || document.body.scrollTop // 后面的是旧版的chrome

// 视口尺寸
document.documentElement.clientWidth
document.documentElement.clientHeight

// JQuery
$(window).scrollTop()   $(window).scrollLeft()
$(document).scrollTop()  $(document).scrollLeft()

// 视口宽度
$(window).width(), $(window).height()
// 页面宽高
$(document).width(), $(document).height()

// 滚动事件
onscroll
```

#### 鼠标滚轮事件

```
onmousewheel  // 火狐不支持，但是支持 DOMMouseScroll 事件

非火狐中 鼠标滚轮方向的事件：e.wheelDelta
往下滚动： -120的倍数，往上滚动：120的倍数

火狐中知识鼠标滚轮方向的属性：e.detail
往下滚动：3的倍数，往上滚动：-3的倍数
```

##### 键盘事件

```js
onkeydown   // 键盘按下
onkeyup     // 键盘弹起
onkeypress  // 字符输入

window.addEventListener('keyup', function(e) {
    console.log(e, e.key, e.keyCode)
})

// 设置tabindex属性的元素可以使用tab获取焦点 根据获取焦点事件和失去焦点事件可以事件进行相关操作
```

##### querySelector

querySelector，querySelectorAll     跟document.getElements....动态【插入的时候会变化】

##### 构造函数

```js
// 构造函数的四步
// 1.开辟空间
// 2.更改this指向，指向实例对象
// 3.执行构造函数语句，为this赋值
// 4.返回实例化对象
// 如果返回值是值类型的数据，结果不会有影响，返回对象类型会替换实例对象
```

##### 数组塌陷

```js
var arr = [1, 2, 3, 4, 5, 6, 7]

// 1 修改下标进行修正
for (var i = 0; i < arr.length; i++) {
    console.log(i, arr[i])
    if (arr[i] == 4) {
        arr.splice(i, 1)
        i--
    }
}

// 从后面开始遍历
for (var i = arr.length - 1; i >= 0; i--) {
    console.log(i, arr[i])
    if (arr[i] == 4) {
        arr.splice(i, 1)
    }
}
```

##### 原型

```js
js为构造函数提供了原型对象：prototype

可以存储数据和方法

每个构造函数的实例化对象都可以访问原型中的属性和方法

每个构造函数都有一个隐含的属性指向原型对象

通过__proto__属性访问原型对象

/* hasOwnProperty 判断自身是否有某个属性
 * instanceof  判断是否xxx的实例
 */

原型链：原型也是对象，所以原型对象也有原型对象，对象的数据查找的时候会在原型链上查找
最终
```

##### 安全类

```js
function Person(name, age) {
    // 判断this是不是Person类的实例化对象
    if (this instanceof Person) {
        this.name = name
        this.age = age
    } else {
        return new Person(name, age)
    }
}
```

##### 内置构造函数

```js
Object Array Function String Number Boolean Regex Error Date
Image

// 函数创建方式
// 1. 函数定义式
function func() {}

// 2.函数表达式
var func = function() {}

// 3.构造函数式 最后一个参数是函数体 其他参数为形参
// func.length 获取形参的个数
// arguments 获取实参

var func = new Function('a', 'b', 'var res = 0; return a + b')

// eval
eval('var num = 10')

// eval 和 new Function区别
new Function 定义的变量是在函数体内部定义，是局部变量
eval字符串定义的变量，在全局作用域中执行，是全局变量

// 字符串
var str = 'hello'
var str = New String('hello')
var str = String('hello')

// 数字
var num = 100
var num = new Number(100)
var num = Number(100)

// Number() 和 String() 显式数据转换

// 正则 [RegExp是安全类]
reg = /^\\w{2,6}$/ // 安全类
new RegExp('^\\w{2,6}$', 'i') // 第一个参数表示正则内容，第二个参数表示正则修饰符i, g, m

// 错误 [安全类]
var err = new Error('error')
Error('error')

// 日期
var Date()  // 日期
Date() // 日期字符串

// 获取时间戳 getTime  简便方法 日期对象前，写+
```

##### 继承

```js
// 1.构造函数式继承
function Person(name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
}

Person.prototype.getName = function () {
    return this.name
}

Person.prototype.getAge = function () {
    return this.age
}

Person.prototype.getSex = function () {
    return this.sex
}

function Student(name, age, sex, grade) {
    // 继承 只能继承属性 无法使用原型对象的方法
    Person.call(this, name, age, sex)
    // Person.apply(this, [name, age, sex])
    // Person.bind(this, name, age, sex)()

    // 原型式继承
    // this.name = name
    // this.age = age
    // this.sex = sex
    this.grade = grade

}

// 继承原型
// 方法一
// 这种方法指向同一个原型对象，修改子类 父类也会跟着修改
// Student.prototype = Person.prototype

// 方法二
// 类继承 原型式继承
// 问题
// 1.子类原型对象上出现父类构造函数的方法和属性，不需要
// 2.执行了父类的构造函数，浪费内存
// 3.constructor 属性丢失，
// 4.无法使用构造函数的储存属性
// Student.prototype = new Person()
// Student.prototype.constructor = Student

// 方法三
// 组合式继承: 属性使用构造函数继承 方法使用类继承
// 存在类继承的问题
// Student.prototype = new Person()
// Student.prototype.constructor = Student

// 方法四
// 创建一个寄生类，让寄生类的原型等于父类的原型，在实例化寄生类，赋值基于子类原型
// 问题 无法复用构造函数的存储属性
function inherit(child, parent) {
    function F() {
        this.constructor = child
    }
    F.prototype = parent.prototype
    child.prototype = new F()
    return child
}

inherit(Student, Person)

// 方法五
// 寄生组合式继承
// 方法四和方法一组合



var stu = new Student('emire', 20, '男', '大二')
var p = new Person('小明', 23, '男')

console.log(p, p.getName());
console.log(stu, stu.getName())
```

#### BOM

浏览器对象模型

##### document

DOM 浏览器对象模型 用来处理页面文档

##### location

```js
location.reload()
```

##### navigator

##### screen

### 移动端

```js
// 移动端触摸事件
touchstart
touchend
touchmove
touchcancel

// 事件顺序 touchstart touchend click
// 如果长时间不松开，click事件会被取消，取消之后touchend 不会执行


// 页面中如果有parent 其他元素设置ontouchstart 会触发这个元素设置ontouchstart 事件 [注意 有没有点击穿透的问题]
// 解决方案：阻止默认事件、使用click事件、延迟300ms执行，设置pointer-events:none，fastClick库
// 参考：https://zhuanlan.zhihu.com/p/88273680
```

##### 过渡与动画

```js
// 过渡事件
transitionstart
transitionend

// 动画事件
animationstart
animationend

// PC和移动端都可以触发 [需要浏览器支持CSS3]

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background-color: pink;
            color: #fff;
            font-weight: bold;
            line-height: 100px;
            text-align: center;
            border-radius: 50%;
            transition: all 3s;
            animation: rotate 3s linear;
        }

        @keyframes rotate {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        .bg {
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <div class="box">hello</div>
    <button id="btn">过渡</button>
    <script>
        var box = document.getElementsByClassName('box')[0]
        box.addEventListener('transitionstart', function() {
            console.log('transitionstart')
        })

        box.addEventListener('transitionend', function() {
            console.log('transitionend')
        })

        box.addEventListener('animationstart', function() {
            console.log('animationstart')
        })

        box.addEventListener('animationend', function() {
            console.log('animationend')
        })

        btn.addEventListener('click', function() {
            box.classList.toggle('bg')
        })
    </script>
</body>
</html>
```

移动端常用库 zepto.js  类似JQuery

### 模块化

```js
module transport 规范
	require|define([模块1, 模块2], function(接口1, 接口2) {return 暴露接口})
	异步

commonjs规范
	require(引入模块)
	module.exports || exports 暴露接口
    同步
```

##### require

```js
参数注入
// 默认使用module transport 规范 [异步规范]
// commonjs 同步规范

// 定义模块方式
// main.js  [导入模块]
require(['./demo'], function(demo) {
    console.log(demo)
})

// demo.js [定义模块 不能是字符串]  commonjs 规范 通过module.exports暴露接口
define(function(require, exports, module) {
    var test = require('./test')
    console.log(test)
})

// test.js
define({name: 'test'})

// 传递两个参数 [分两种情况： 1.第一个参数是字符串 2.第一个参数是数组]
// 第一个参数为字符串 表示模块的id 不能跟内置的模块名一致
// main.js
require(['./demo', 'require'], function(demo, require) {
    console.log(demo, require);
    require(['deno'])
})

// demo.js
define('deno', function(require, exports, module) {
    this.name = 'deno'
    console.log(this, arguments);
})

// 第一个参数是数组 则表示注入的模块 遵循module transpors规范
define([
    'test',
    'require',
    'exports'
], function(require, exports) {
    console.log(this, arguments)
})

// 传递三个参数
第一个表示模块的Id，第二个是数组表示模块的依赖集合，第三个是模块函数，遵循module transports 规范
```

加载具有id的模块

```js
// main.js
require(['./demo'], function() {
    console.log(this, arguments)
})

// demo.js
define(['./test', 'require'], function(test, require) {
    // 使用commonjs的规范
    require(['t1'], function(t1) {
        console.log(t1)
    })
    require(['t2'], function(t2) {
        console.log(t2)
    })
})

//test.js
define('t1', {name = 't1'})

define('t2', {name = 't2'})

// 模块中存在多个具有相同的id或者没有id的模块 前面的会覆盖后面的，不同名的模块可以共存
```

##### 定义接口

###### 基于commonjs规范定义的接口

```js
module.exports.接口  // 简写：exports.接口
module.exports = 值类型
module.exports = 对象
module.exports = 函数 // 当this指向exports的时候，可以通过this暴露接口

// module.exports 如果赋值的是一个引用类型的数据，exports 添加的属性无法添加到上面[两者指向的对象不一样]

define(function(require, exports, module) {
    exports.title = 'title'
    exports.color = 'red'
    this.display = 'block'

    module.exports = {
        bg: 'pink',
        fontSize: 16
    }

    module.exports = function() {
        console.log('exports');
    }
})
```

###### 基于module transports 规范

```js
return 值类型
return 对象
return 函数

define(['exports'], function(require, exports) {
    this.color = 'pink' // 当使用this的时候要引入exports 否则挂在到window上
    
    return {
        fontSize: 20
    }
})

// 直接使用return 返回 也可以使用exports返回[不常用]
```

##### 模块信息对象

```js
// module
exports        // 定义暴露的接口对象
id             // 模块的id 默认与uri 相同
uri            // 模块的文件路径，相对于html引入的

// 如果没有data-main 属性[直接引入], 会在路径前面加上一个./ ???
// 如果没有使用data-main属性那么文件的相对路径需要注意
```

##### 配置信息

```js
require.config({
    paths: {        // 路径简写
        'src': './components/src'
    }
})

// 配置第三方的插件
// 1.可以将插件放到入口的根目录下面 
// 2.将文件引入添加到paths中，可以直接引入  [这两种需要模块支持amd规范]
// 3.使用shim转换成模块

// main.js
require.config({
    paths: {
        mk: './m2'
    },
    shim: {
        'mk/index': {
            deps: [],
            exports: 'm'
        }
    }
})
require(['mk/index'], function(m) {
    console.log("======================")
    console.log(m)
    console.log("======================")
})


// map映射
// main.js
require.config({
    shim: {
        '../lib/v1': {
            exports: '$'
        },
        '../lib/v2': {
            exports: '$'
        }
    },
    map: {
        '../modules/h1': {
            version: '../lib/v1'
        },
        '../modules/h2': {
            version: '../lib/v2'
        },
        '*': {
            css: '../lib/css'
        }
    }
})

require(['../modules/h1', '../modules/h2'], function(v1, v2) {})

// modules 
// h1
define(['version', 'css!../css/index'], function() {
    console.log('h1', $)
    var el = document.createElement('h1');
    el.innerText = 'h1 标题'
    document.body.append(el)
})

// h2
define(['version'], function() {
    console.log('h2', $)
})

// lib
// v1.js
var $ = {
    version: 1
}

// v2.js
var $ = {
    version: 2
}


// baseUrl
// 优先级 baseUrl > data-main > require 设置了baseUrl 可以不设置data-main 在任意地方使用都是从baseUrl开始 [引用文件需要注意相对路径]

// css 插件 [require css]
/* 使用
 * 1.在map中配置 '*': {css: '../lib/css'}
 * 2.引入css文件的时候需要在开始位置加上 css!
 */
```
