##### 数值

1. 种类：整数(整型) | 小数(浮点数)  支持科学计数法 3.14e7
2. 进制：十进制(默认)、二进制(0b | 0B)、八进制(0o | 0O)、十六进制(0x | 0X)
3. 转换：toString(基数)
4. 精确到某个小数：toFixed(小数位)
5. NaN  not a number  需要一个数字但是本身却不是一个数字的时候就会得到一个NaN
   1. NaN参与任何的计算得到的结果都是NaN
   2. NaN != NaN
   3. isNaN(值) 检测某个数值是否为NaN
      1. 判断是否是一个数字，如果不是数字那么就返回true，否则返回false
      2. 内部存在隐式的类型转换 true => 1
      3. 空串转换为0

特殊情况

numFloat5 = .5;

如果小数点对该数据没有意义，那么会转化为整数



Null   	null（唯一）

Undefined  	 undefined（唯一）

变量的值什么时候为null，什么时候为undefined？

- 当声明一个变量，但是却没有赋值的时候，该变量的值为undefined

- 变量的值永远不会自己为null，除非我们主动指定null

##### 类型转换

+ 类型转换分为两种
  + 系统默认转换
  + 主动转换
+ 处理字符串相关类型转换的时候，只要有字符串的其他的都转为字符串
+ String()   toString() 把其他类型的数据转换为字符串
  + 原样输出
  + null、 undefined没有toString()
+ Number()       把其他类型的数据转换为数字
  + 转换不了为NaN
  + true 为1，false为0
  + null为0
  + undefined为NaN
+ Boolean()       把其他类型的数据转换为布尔值
  + 只要字符串不为空，那么就返回true，""返回true
  + 数字只要不为0，返回true
  + null为false
  + undefined 为false
+ 取整 parseInt() 
  + parseInt（“1212 str"）  1212
  + 会忽略前面的空格
  + 不能省略小数前面的0
+ parseFloa()

#### 运算符

##### 位运算符

##### 基本算术运算符

- 加法
- 减法
- 乘法
- 除法
- 模（取余数）

###### 注意点

字符串参与运算

> console.log("12" / 3);				// 4
>
> console.log("12a" / 3);			 // NaN

模元素是有符号的(结果正负跟第一个数保持一致)

> console.log(12  % 5) 				// 2
>
> console.log(-12 % 5)				-2
>
> console.log(-12 % -5)				-2
>
> console.log(12  % -5)				2

0做除数

> console.log(1  / 0)  					Infinity
>
> console.log(-1 / 0)					 -Infinity

加法运算的注意点

两个操作数都是字符串[拼接]

两个操作数都是数字

两个操作数中有一个字符串，其他类型不确定

两个操作数中既不全是字符串，也不全是数字，也没有字符串[转化为数字再进行计算]

##### 关系运算符

+ 大于
+ 大于等于
+ 小于
+ 小于等于
+ 相等 （值相等）
+ 不相等
+ 全等 （值相等，类型也要相等）
+ 不全等
+ 注意点
  + 数字比较大小
  + 字符串比较，比较的是顺序ASCII，多个字符串按位比较
  + 一个数字和一个其他类型的值比较（比较的时候尝试把其他的类型转换为数字再比较）

##### 逻辑运算符

+ 逻辑非!  

  示例： !操作数 

  规则：取反，值是一个布尔值(true | false)

+ 逻辑或||

  示例：操作数1 || 操作数2   

  规则：如果第一个操作数为真，返回第一个操作数，否则返回第二个操作数

+ 逻辑与&&

  示例：操作数1 && 操作数2

  规则：如果第一个操作数为真，直接返回第二个操作数，否则返回第一个操作数

##### 赋值运算符

+=

-=

*=

/=

%=

##### 自增自减运算符（一元运算符）

++

--

##### 条件运算符（三元运算符）

操作数1 ？操作数2  :  操作数3

规则：如果操作数1为真，那么返回操组数2，否则返回操作数3

#### 相等 ==

- 如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回`true`。
- 如果一个操作数是`null`，另一个操作数是`undefined`，则返回`true`。
- 如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
  - 当数字与字符串进行比较时，会尝试将字符串转换为数字值。
  - 如果操作数之一是Boolean，则将布尔操作数转换为1或0。
    - 如果是`true`，则转换为`1`。
    - 如果是 `false`，则转换为`0`。
  - 如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的`valueOf()`和`toString()`方法将对象转换为原始值。
- 如果操作数具有相同的类型，则将它们进行如下比较：
  - `String`：`true`仅当两个操作数具有相同顺序的相同字符时才返回。
  - `Number`：`true`仅当两个操作数具有相同的值时才返回。`+0`并被`-0`视为相同的值。如果任一操作数为`NaN`，则返回`false`。
  - `Boolean`：`true`仅当操作数为两个`true`或两个`false`时才返回`true`

```js
const arr = [];
const testObj = {};
console.log(arr === "");
console.log(arr == "");
arr.toString = () => 1;
console.log(arr === 1);
console.log(arr == 1);
arr.valueOf = () => 2;
console.log(arr == 2);
arr.valueOf = () => testObj;
console.log(arr == testObj);

// false true false true true false
// 数组、数字比较，当数组具有valueOf属性的时候返回valueOf的值[如果仅仅具有toString属性的时候，则返回toString的值]
// 当且仅当数组只有一个元素的时候返回元素作为值，如果数组有多个元素的时候返回NaN
```

#### 流程控制

##### 选择结构

###### 分支语句

if{} else if {} else {}

###### 多值选择

```html
switch (n) {

case 值:

​	语句
	break 不写有case穿透

default: (可以省略)

}
如果都不匹配，执行default后面的语句
匹配的时候使用过的是全等(===)判断
比较值为固定值的时候使用
```

##### 循环结构

###### while循环

```html
while (condition) {
	expression
	(需要提供退出条件)
}
```

###### do while循环

```
do {
	expression
} while ()
```

###### for 循环

```
for (initialization; condition; increment) {
	expression;
}
```

#### 对象

Object

对象：属性和方法  属性就是变量，方法就是函数，对象就是对变量和函数的封装

对象：键值对(key-value)的集合

遍历：for... in

```
创建
使用字面量
var person = {name: "zs"};
使用构造函数创建
var book = new Object();

删除  delete 对象.属性

```

JavaScript

JavaScript为了方便我们操作简单数据类型，为我们提供另外三种数据类型：字符串对象类型（String）数字对象类型（Number）布尔值对象类型（Boolean）

当基本数据类型的值在访问属性或者是调用方法的时候，JavaScript内部会自动的将他们转换为对象类型

值类型和引用类型-根据保存的值来划分

值类型保存的内容是具体的值，引用类型保存的是内容的地址

数据是如何存储的？

变量保存在系统的内存

JSON.parse(str) 将字符串解析成字符串

#### 函数

创建

- 直接声明 function 函数名(参数)  {... 函数体... }
- 字面量的方式创建
  - 匿名函数字面量
  - 命名函数字面量

```js
匿名函数字面量
var log = function () {
	
}
log();

命名函数字面量
var write = function t () {
	t() 【函数名只能在里面使用、递归调用】
}
write();
```

- 函数和方法的区别

  方法在对象内部创建



##### 作用域

JavaScript作用域：全局作用域 | 局部作用域

变量在全局作用域中声明，那么他就是全局变量，全局变量意味着它在全局范围内有效

变量在局部作用域中声明，那么他就是在局部变量，局部变量意味着它在局部范围内有效

作用域中变量的访问规则：现在当前作用域中查找是否存在指定的变量，如果存在那么直接使用，如果不存在就向上一层作用域查找，如果找到那么就直接使用，没有找到那么就继续想上一层查找，重复这个过程，知道找到为止或者是到最外层，都没找到那么就报错

##### 返回值

函数执行完总是会返回一个值，要么是return语句后面的值，要么为undefined

##### arguments参数

```
函数默认提供的一个隐藏参数
arguments参数用来接受函数调用时传递进来的实际参数
arguments时一个类似数组的结构，很像数组但又不是数组[伪数组]
Array.isArray()判断

function add() {
	console.log(arguments)
}
```

函数作为其他函数的参数传递时，不能加上(),加上()表示要把这个函数执行的结果作为参数传递

##### this

通常来说只想一个对象，具体指向什么对象需要看函数的调用方法

调用方法：

- 普通调用  f(); 函数中的this指向的是全局对象window
- 对象方法 obj.f();   函数中的this指向的是当前的对象

函数是特殊的对象（可以创建域 | 可以被调用）

函数的length属性：该函数形参的个数

arguments的length属性，函数调用时实参的个数

函数可以像对象一样进行操作

函数有名字，可以通过函数的name属性获取  f.name 该属性不能修改

##### 递归

递归必然有推出条件，不然就变成一个死循环

##### 函数和变量声明的提升

JavaScript的代码在执行的时候，[1]先执行预解析的操作，[2]然后再按顺序从上往下执行

如果在使用变量之前没有使用关键字声明，那么这个变量默认是全局变量

#### 数组

数组本质上是Object对象类型的数据

##### 创建

内容可以是数字、字符串、变量、布尔值、方法、对象、数组

###### 直接量

var arr = [18, 21 "蓝旗"]

###### 构造函数创建

如果只有一个参数且该参数是数字那么表示创建一个指定长度的空数组

var arr = new Array()

var arr = new Array(1, "卡卡")

+ 创建数组并指定长度

  var arr  = new Array(5)

+ 创建数组可以省略new

+ 没有传参，可以省略()

  var arr = new Array

##### 操作

###### 访问：arr[index]

###### 修改：arr[index] = value

###### 追加：arr.push()  返回更新后的数组长度值

###### 删除：arr.pop()  返回删除的元素

###### 在数组的开始位置添加元素：arr.unshift() [性能不是很好]

###### 开始的位置移除元素 arr.shift()



###### 合并 	arr.concat(arry | ele)

```
arr1.concat(arr2)  返回一个新的数组
参数是具体的数据，会push到数据并返回新的数组
如果参数中有数据也有数组，会将数组的每个元素取出并push到新的数组中
```

###### 截取 arr.slice(start, end)

```
返回一个新的数组
截取区间[start, end)

不传入参数，复制数组

只传入一个参数，从指定位置开始截取数组元素直到数组的末尾，把截取的元素返回到新的数组中

如果参数为负数：length + 参数开始向后截取
```

###### 遍历

```
for循环遍历数组
for...in循环遍历数组  会把数组原型对象上面的成员枚举出来
forEach() 没有返回值
arr.forEach(function (value, index, arrT) {});
value：当前循环对应的元素
index：当前循环对应得索引
arrT：数组本身
```

##### 插入、替换、删除

```
删除：arr.splice(start, count)
从索引为start的位置开始，删除count个元素，返回被删除元素组成的新数组

替换：arr.splice(start, 1, *item) 将start下标的元素用item替换

数组元素的插入(添加)
arr.splice(start, 0, *item) 可以插入多个数据，注意要插入索引的位置
```

##### length属性

所有 数组都有length属性，通常该值记录的是数组的长度（元素的个数）

length属性是一个可读可写的属性

修改length的值

+ 大于原数组的长度：被扩充的元素用undefined填充
+ 小于原数组的长度：删除多余的

使用length添加元素

arr[arr.length] = "元素"

##### 数组转换成字符串

arr.toString()

方法本身比较特殊 [类型	构造函数名称]

arr.toLocaleString()

将每一项转换成字符串，然后拼接在一起返回

arr.join("链接符号")

#### 数组复制

```
1.直接复制存在共享问题[引用]
2.使用slice截取整个数组的内容[返回新的数组]
3.遍历

注意：上面是浅拷贝
```

#### 排序

##### 冒泡排序

```
将大的数据放到右边
```

##### 选择排序

```
找出数组中最小的值放到数组的前端
每次比较同一个元素
```

#### 索引

indexOf  从左往右开始查找，搜索数组中是否存在指定的元素，如果存在那么就返回对应的索引，如果不存在，就返回-1

arr.indexOf(str)

lastIndexOf 从右往左

遍历数组病没循环一次就调用回到函数并将当前元素，索引，数组本身传回

#### map

arr.map(callback(value, index, arr) {

})

可以使用return返回

#### filter

遍历数组，获取当前元素，检查单签元素是否满足过滤条件，如果满足就添加到新的数组中，最后返回

arr.filter(function(value, index, array) {

​	return typeof value == "string"

})

#### some() every()

返回都是布尔类型的值

every() 如果数组中每个元素都满足断言函数就返回true

every()只要数组中有一个元素满足断言函数，就会返回true

#### 归并

第一个参数：前一个数字

第二个参数：当前的数字

第三个参数：当前的索引

第四个参数：数组本身

返回值作为下一次计算的第一个参数，最后返回一个值

arr.reduce(function(x, y, index, arr) {

​	return 返回值

})

arr.reduceRight(function(x, y, index, arr) {

​	return 返回值

})

#### 数组类型判断

Object.prototype.toString.apply(arr) [旧方法]

ES5	Array.isArray(arr)

兼容方案：

```js
function isArray(arr) {

    if (Array.isArray) {

    	return Array.isArray(arr)

    } else {

    	return Object.prototype.toString.apply(arr)

    }

}
```

#### 检查对象中是否存在指定的成员 （key）in

如果存在返回true，否则返回false

"str" in obj

#### with和eval语句

不建议使用，容易混淆，严格模式被禁用，性能不好

eval：把字符串转为js的代码并且马上执行

width：缩短作用域

```
width (obj) {
	console.log(name) // 直接
}
访问变量的时候优先去obj查找
```

#### 严格模式

兼容性问题：

严格模式是ES5推出的特性，有些老版本浏览器可能不支持严格模式。

严格模式："use strict"; 如果不支持严格模式，那么当浏览器扫描到这行字符串的时候会忽略，要写在代码作用域最前面，不然不起作用

this表现不同，普通模式指向window，严格模式指向undefined

arguments在严格模式下，形参和arguments不是同一个数据（非严格模式下是同一个数据）

arguments.callee  匿名函数调用自己（严格模式不能使用）

##### 作用域

全局作用域  对整个作用域都开启严格模式

局部作用域  对局部作用域开启严格模式

#### 字符串

##### 字符串访问

+ str.charAt(index)
+ str[index]

##### 获取字符串中指定索引对应字符的编码

str.charCodeAt(index)

str.charCodeAt()

##### 转码

String.fromCharCode(*编码)

##### 字符串拼接

+ 使用 + 

+ 使用cancat

  str.concat(*str)

+ 字符串是不可改变，字符串本身是不可以被修改

##### 搜索

str.indexOf(要查找的字符串, [start]) 	从左向右

str.lastIndexOf(要查找的字符串, [start]) 从右向左

查找字符串中是否存在指定的字符串，存在返回第一个索引的位置，如果不存在就返回-1

##### 切割

str.split(分隔符)

返回一个数组

##### 截取

+ slice(start, end)
+ substr(start, length)
+ substring(from, to)   



第一个参数为负数

str.slice()、str.substr() 后面开始截取

str.substring参数不能是负数，如果是负数设置为0

第二个参数为负数

str.slice()  从start截取到end，如果end的索引顺数小于start就返回空串

str.substr() 直接返回空字符串

str.substring(from, to) 将负数设置为0，比较大小，重新排列后截取str.substring(0, from)



url：统一资源定位符

##### 大小写转换

str.toLocaleLowerCase()

str.toLowerCase()

str.toLocalseUpperCase()

str.toUpperCase()

##### 清除字符串前后空格

str.trim()	不需要输入参数（表单输入） [ES5方法  JQuery.trim()]

##### 替换方法

str.replace(被替换的字符串、正则表达式，目标字符串) 只会处理一次

返回处理后的字符串

##### 正则表达式

字面量写法：规则/参数

构造函数创建：new RegExp(规则，参数)

构造函数直接传参 new RegExp(变量, 参数)

RegExp会自动补全 /变量/

#### Math

Math.PI  圆周率π

##### 随机数

Math.random() 0 - 1

```js
function getRandom(min, max, isFloat) {
	if (arguments.length == 1) {
        max = arguments[0];
        min = 0;
    }
    if (isFloat) {
        return parseInt(Math.random() * (max-min)) + min;
    } else {
        return parseInt(Math.random() * (max-min+1)) + min;
    }    
}
```

##### 取整 四舍五入

Math.ceil()

Math.floor()

Math.round()

##### 最大值、最小值

Math.max(*number)

Math.min(*number)

##### 三角函数

弧度 = 度数 * Math.PI / 180

Math.sin(弧度)

Math.cos(弧度)

Math.tan(弧度)

##### 绝对值

Math.abs()

##### 求幂  开平方

Math.power(n, p)

n的p次方

Math.sqrt(num)

num不能为负数  NaN

#### Date

创建对象

new Date()

返回年月日时分秒星期时区

传入参数表示格式化时间

new Date(2020, 4, 12)

new Date("2020-4-12")

new Date("2020#4#12") 

new Date(时间戳)

##### 核心API

Date.now() 得到当前的时间

Date.parse() 将时间戳转换为时间字符串

date.getxxx

date.setxxx

date.toxxxString

[2] var date = new Date(); date.xxx();

(1) date.getxxxx()   读取时间信息

date.getMonth()	0-11  	月份

 date.getYYY()    本地时间

date.getUTCYYY()   世界时间

date.getMilliseconds()  毫秒

 (2) date.setxxxx()   设置时间信息

date.setYYY()    本地时间

date.setUTCYYY()   世界时间

 (3) date.toxxxString() 字符串处理的

##### 时间输出格式

```js
date.toLocaleDateString()	"2020/4/12"
date.toISOString()			"2020-04-12T09:49:37.546Z"
date.toUTCString()			"Sun, 12 Apr 2020 09:49:37 GMT"
date.toTimeString()			"17:49:37 GMT+0800 (中国标准时间)"
date.toLocaleTimeString()	"下午5:49:37"

UNIX TIME                     纪元时间
Greenwich Mean Time           格林尼治时间
Universal Time Coordinated    世界协调时间
```

#### Bom

Browser Object Model 浏览器对象模型

默认所有的全局变量和函数都会成为window的成员

变量命名的时候要注意覆盖|污染

使用可以省略window前缀

```
var a = "isa";
console.log(window.a == a);
```

window.length  表示页面有多少个iframe标签

##### delete

删除对象的成员（属性|方法）

delete 对象.成员

返回值：true | false

不能使用delete直接删除var声明的全局变量，可以删除通过代码添加到window的成员

```
window.a = 'a';
delete window.a;  // true
```

##### window窗口的主要属性

innerWidth/innerHeight	页面可是区域的宽度和高度

outerWidth/outerHeight	window窗口的本身宽度和高度

scrollX	水平滚动条的坐标	只读

scrollY	垂直滚动条的坐标	只读

##### 滚动方法

window.scrollTo(x, y);	滚动到指定的位置

window.scrollBy(x, y);	在当前的基础上滚动多少，参数可以为负数

##### 系统弹窗

+ alert(str) 没有返回值
+ confirm（str）弹出对话框，有确定和取消按钮  返回值true（确定） | false（取消）
+ prompt(msg, default)    
  + 返回值  确定  返回输入框的内容  取消  返回null
+ printt()  打印

##### 打开浏览器窗口

window.open(url, name, options)

options 配置项

width=400,height=100,top=100

##### 关闭窗口

window.close()

##### window属性history

属性length 当前网页有多少历史记录

window.history.back()		  后退一页

window.history.forward()	前进一页

window.history.go(index)	跳转到指定页面，负数表示返回上一页

##### navigator

navigator.userAgent 获取用户浏览器的信息

##### location

window.location.search查询字符串

location属性可读可写

replace(url)

reload()

window.onload 页面加载完毕（DOM树HTML，CSS，图片资源等所有资源）后执行函数中的代码

window.onresize

##### url编码转换：encodeURI decodeURI

#### Dom

根据nodeType

ElementNode	 1

AttributeNode	2

TextNode			 3

##### 节点获取

```js
document.getElementById()
document.getElementsByClassName()
// 标签名字获取
document.getElementsByTagName()

// 根据name属性获取 主要用在表单中
document.getElementsByName()

// 选择器获取  IE8+
document.querySelectorAll(选择器)  获取页面中所有匹配的标签
document.querySelector(选择器)

元素节点也可以调用这些方法
```

##### 节点的主要属性

```
元素节点
ele.getElementById(id)
ele.nodeType   1
ele.nodeValue	null
ele.nodeName	标签（大写）
ele.tagName		标签（大写）

属性节点
ele.getAttributeNode(属性名)
attr.nodeType	2
attr.nodeValue	属性内容
attr.nodeName	属性名

文本节点
ele.childNodes[index];
attr.nodeType	3
attr.nodeValue	文本内容
attr.nodeName	#text
```

##### 节点的创建、插入

###### 节点创建

document.createElement(元素名)

document.createAttribute("属性名")

​	新创建的属性节点.nodeValue = 属性值

document.createTextNode(文本内容)

直接使用innerHTML创建元素
ele.innerHTML = "<span>span标签</span>"

###### 插入

插入到前面

父元素.insertBefore(被插入的元素，参考元素)

文本节点插入到元素节点

​	元素节点.appendChild(文本节点)

属性节点插入到元素节点

​	元素节点.setAttributeNode(属性节点)

获取标签中指定的属性节点

ele.getAttributeNode(属性名)

获取常用的属性

ele.id

ele.className

##### 节点关系

父节点：parentElementNode  parentNode

子节点：childNodes   children

上一个节点：previousSibling  previoursElementSibling

下一个节点：nextSibling  nextElementSibling

第一个 ele.firstChild  ele.firstElementChild

最后一个 ele.lastChild   ele.lastElementChild

##### 元素节点的复制、删除、检查和替换

- 复制  ele.cloneNode()  返回复制的标签 需要传参true
  - true 深复制 false浅复制（不复制文本节点，默认)
- 删除 remove() 不用
  - parent.removeChild(被删除的节点)
- 检查是否存在子节点
  - hasChildNodes()  检查是否存在节点
- 替换节点 replaceChild
  - 父元素.replaceChild(目标元素, 被替换的元素)

##### 元素节点的操作

- innerHTML  解析为节点内容
- innerText     解析为文本内容
- outerHTML 解析后替换当前的标签
- outerText 直接使用纯文本的字符串替换当前的字符串

##### 元素节点样式操作

- 通过style只可以访问和设置内联样式
- 获取指定元素元素的样式  window.getComputedStyle(ele, 伪元素)  返回一个对象 不能通过这样方式
- IE8- 获取  ele.currentStyle

##### 盒子模型

offsetWidth offfsetHeight offsetLeft offsetTop   border+padding+content  参考最近的一个定位父元素

##### 标签属性节点的操作

获取指定的属性节点 

- ele.getAttributeNode(属性).nodeValue

- ele.getAttribute(属性)

- ele.attributes.getNameItem(属性).value 

设置指定属性节点

+ ele.setAttribute(属性，属性值)
+ ele.attributes.setNameItem(属性节点)  【属性节点创建 document.createAttribute(属性名).value = 属性值】

删除

- ele.removeAttribute(属性)

- ele.attributes.removeNameItem(属性名)

##### 常见属性和自定义属性节点

- ele.classList 
- 增加  ele.classList.add(属性)
- 包含 ele.classList.contains(类名)
- 删除 ele.classList.remove(类名)
- 切换 ele.classList.toggle(类名) 【如果有就删除，没有就添加】
- 自定义属性格式   data-属性=
  - 所有的自定义属性会保存到dataset中  ele.dataset

#### 事件

事件流：事件捕获节点，目标阶段，事件冒泡阶段

##### 事件处理程序（标签）

在标签身上直接通过onclick

可以直接访问全局作用域，可以调用外部js文件中声明的函数

可以直接通过event变量来访问事件对象

this指向标签本身

注意：不推荐使用，违背分离原则

##### 事件处理程序（事件）

通过事件属性方式绑定事件，一个标签只能绑定一个同类型的事件

移除事件 将事件设置为null

##### 事件处理程序（注册监听）addEventListener

###### 添加

ele.addEventListener(type, handle, isCapture)

type 事件的类型

handle	事件处理函数

isCapturing	是捕获还是冒泡 true / false 是否是事件捕获 默认false，把事件添加到冒泡流 true添加到捕获流

可以给标签注册多个同类型的事件监听

###### 移除标签监听的事件

注意：需要移除的事件处理函数和注册时候的事件处理函数是同一个

ele.removeEventListener(type, handle)

兼容IE8-  (jquery)

attachEvent("on" + type, handle);

detachEvent("on"+type,handle)

##### UI事件

- load

- resize

- scroll

##### 鼠标事件

- click

- dblclick

- mousedown

- mouseup

- mouseenter

- mouseleave

- mouseover

进入到字标签的时候回触发out再触发over事件

###### mouseout

##### 键盘事件

- keydown
- keyup
- keypres  按下键盘的案件(字符  数字-字母)
- 触发顺序 keydown - keypress-keyup

##### 文本事件

- input 输入框内容变化的时候触发（实时）

- change 检测到输入框的value值变化的时候触发（失去焦点的时候触发）

##### 焦点事件

- focus 获得焦点事件
- blur 失去焦点事件
- ele.focus()  自动获取焦点事件

##### 其他事件

- reset
- select
- submit
- load
- document.addEventListener('DOMContentLoaded', handle)  html文档加载完毕
- readystatechange

##### 事件对象 event

兼容性问题 IE老版

```js
ele.onClick = function (e) {
	var event = e || window.event;
}
```

##### 检测鼠标按键

e.button  

- 0 左键

- 1 滚轮

- 2 右键

type

target，currentTarget事件作用在哪个标签身上

altKey

controlKey



##### 光标位置的属性

mousemove

- clientX 参考页面可视区域
- offsetX 相对于标签本身
- pageX 参考页面的原点（没有滚动等于clientX）
- screenX参考屏幕

##### 键盘按键检测

e.keyCode || e.which

##### 标签的默认行为

阻止默认行为 event.preventDefault()

##### 事件冒泡

当某个标签身上的事件触发后，该事件会按照从内到外的顺序层层向上级传递，直到根节点(document => window)

事件向上传递的时候，如果遇到相同类型的事件，事件也会触发

阻止事件冒泡：event.stopPropagation()  【在需要阻止的位置添加】

IE8-：event.cancelBubble = true

注：blur、focus、load、unload不能冒泡

##### 事件捕获

ele.addEventListener(type, handle, isCapture)

isCapture值

- false 事件添加到冒泡流
- true 事件添加到捕获流

addEventListener支持捕获流和冒泡流，onclick方法仅支持冒泡

##### 事件委托

事件委托：把事件委托位其它的标签(祖先元素)来处理 , 内部实现机制(事件冒泡)

根据event.target获取对应的点击元素

属性：target 目标(永远不变的，永远指向事件真正触发的那个标签)

#### 面向对象

- 面向过程
- 面向对象

面向对象的三大特性，封装、继承、多态

##### 创建

###### 字面量

var  book = {}

###### 内置构造函数创建对象

var book = new Object();

book.name = "悟空传"

工厂函数（函数封装批量生产）创建对象【无法分清对象】

###### 自定义构造函数创建对象

```js
function Person (name, age) {
	this.name = name;
    this.age = age;
}

var p1 = new Person("张三", 19)

与工厂模式区别
使用new调用函数
不需要new Objec创建空对象
直接使用this来设置属性和方法
函数主题不需要主动创建return
```

使用new调用一个函数的时候

默认会在函数内部创建一个空的对象

默认会把新创建的对象赋值给this

设置this的原型对象为当前构造函数相关的原型对象

默认最后把创建的对象返回

##### 自定义构造函数创建对象的返回值的问题

- 默认把新创建的对象返回
- 如果在构造函数中主动返回
  - 值类型的数据（布尔值，字符串，数字） 忽略 返回内部创建的对象
  - 引用类型的数据（数组，对象，函数）  直接返回

构造函数可以直接调用，把属性和方法都添加到window（不要以普通函数的方式调用）

构造函数的名字首字母大写

###### 构造器属性	constructor

obj.constructor   可用于判断对象是否相同

存在问题：创建大量对象，会给每个对象开辟空间，造成资源的浪费

解决：把需要共享的成员写在构造函数的原型对象中

```js
Person.prototype.fun = function () {
    代码块
}
```

###### 自定义构造函数：提供构造函数 => 设置构造函数的原型对象 => 通过new调用构造函数创建对象

##### 实例化和实例化对象

实例化对象：构造函数创建的对象

实例化：实例化的过程

###### 构造关系和原型对象的关系

- 所有的构造函数都有一个与之相关联的对象，这个对象默认是一个空对象【原型对象】
- 可以通过构造函数访问原型对象，构造函数.prototype
- 通过原型对象也可以访问构造函数 原型对象.constructor

###### 原型对象的性质

构造函数相关联的原型对象上所有成员可以被该构造函数实例化的实例对象所共享



```
实例化对象可以访问原型对象上面的成员
通过实例对象可以访问原型对象  实例对象.__proto__

访问原型对象
构造函数.prototype
实例对象.__proto__
```

##### 原型对象的访问和设置

this指向谁看函数怎么调用

以对象的方法调用  this指向的是的调用该方法的对象

##### 设置原型的方法有

- 直接在原型对象的基础上添加方法  Person.prototype = 
- 直接使用新得对象把原本的原型对象替换【构造器属性丢失】
  - 手动添加--对象.constructor = 原型对象【需要先设置原型对象再实例化】

##### 访问原型对象的方式

- 构造函数.prototype
- 实例对象.\_\_proto\_\_
- Object.getPrototypeOf()

##### 设置原型对象的方式

- 构造函数.prototype = 替换 / 构造函数.prototype.xx 修改

- 实例对象.\_\_proto\_\_ = 替换 / 实例对象.\_\_proto\__\_.xxx

- Object.setPrototypeOf(实例对象，设置的原型对象)

##### 创建对象 Object.create()

创建空的对象并设置原型对象为t  Object.create(t)

创建没有原型对象的空对象 Object.create(null)

创建对象并设置原型对象 Object.create(t, {age: {value: 18}})  创建的属性不可以修改/枚举[循环]/删除

成员   对象的属性和方法，我们统称为对象的成员。

##### 原型成员和静态方法

  \* 实例对象(p1) | 原型对象(Person.prototype/p1.__proto__)|构造函数(Person)

  *

  \* 实例成员 实例对象的属性和方法(name age showName showAge)

  \* 原型成员 原型对象的属性和方法(info showInfo)

  \* 静态成员 构造函数的属性(静态属性)和方法(静态方法) (des showDes)

  \*     构造函数本身是函数，函数是特殊的对象，因此函数也可以有属性和方法

  *

  \* 【2】访问规则

  \*  实例对象 访问 实例成员 + 原型成员

  \*  原型对象 访问 原型成员

  \*  构造函数 访问 静态成员

私有成员 私有的变量和函数，在外部不可以被访问

特权方法 可以访问私有成员的实例方法

in关键字 ： 检查对象中是否存在指定的属性(实例对象 + 原型对象)

hasOwnProperty方法在使用的时候，仅仅检查实例成员

对象.isPrototypeOf(实例对象) 检查对象是否在实例对象的原型链

实例对象 instanceof 构造函数  检查构造函数的原型对象是否在实例对象的原型链上面

###### Function和Object的关系

JavaScript所有的类型 Function Array Person Object 最基础的是Object

#### Object核心成员

Object原型对象上面的成员：Object原型对象上面所有的成员都可以被任意对象访问

Object.prototype.toString  [类型 构造函数]

valueOf 总结：如果是普通对象返回this,如果是基本包装类型的对象返回基本值，如果是日期对象，返回时间戳

```js
length: 1               期望传递的形参的个数
name: "Object"          函数的名
create:                 创建对象并且设置该对象的原型对象

isExtensible            检查该对象是否是可扩展的 添加
preventExtensions：      禁止对象扩展
isSealed：               检查该对象是否是可配置的/
seal:                    禁止对象配置
isFrozen:                检查该对象是否被冻结    不能添加|不能修改|不能删除 |不能枚举
freeze：                 冻结对象

getOwnPropertyDescriptor: 获取对象中指定属性的描述信息(对象)
getOwnPropertyDescriptors:获取对象中所有属性的描述信息(对象)
defineProperties:       定义对象的多个属性
defineProperty:         定义对象的属性

getOwnPropertyNames:      获取所有的属性名(数组)
keys：                     获取所有的属性名(数组)

values：                   获取所有的属性值(数组)
getPrototypeOf:           获取原型对象
setPrototypeOf：          设置原型对象

is:                       比较两个值是否全等(===) ES6
assign:                   混合对象(MiXin)-把多个对象合并成一个新对象  ES6

getOwnPropertyDescriptor
/*参数1：对象  参数2：属性
    configurable: true    该属性是否可配置(删除) 删除-该属性设置为false后就不能再被设置为true
    enumerable: true      该属性是否可枚举(for..in中能够被迭代)
    value: "张思睿"        该属性对应的value值
    writable: true        该属性是否是可写
*/


Object.defineProperty(targetObj,property,attributsObj)
 第一个参数：要设置的对象
 第二个参数：要设置的属性
 第三个参数：属性的描述对象(属性定义对象)

在通过属性描述对象定义属性的时候，如果缺省配置项，那么默认为false
getOwnPropertyNames 获取所有实例成员的属性名字  包含不可被枚举的属性
keys 获取所有实例成员的属性名字  仅包含能够被枚举的属性
values 获取所有可枚举的属性值

isExtentsible
preventExtensions  不能添加

isSealed 
seal 不能添加不能删除

isFrozen
freeze  不能添加，不能删除，不能修改
```

##### call  - apply的使用

```js
call - apply 的基本使用
作用： 借用其他对象的方法并且绑定方法中的this
语法： Other.fn.call(o,arg1,arg2...) | Other.fn.apply(o,[arg1,arg2...])
区别：
	[1] 如果调用函数的时候需要给函数传递参数，那么call方法以参数列表的方式处理，apply以数组处理
	[2] 形参个数不同 call(1) apply(2)
Function.prototype.call/apply

o1.showName.call(o2)  o2借用o1的shouName方法

建议：如果借用对象的方法没有参数建议使用call,如果需要传参建议使用apply
```

##### bind

获取一个绑定this的新函数

当调用bind方法的时候会根据show来生成一个新的函数，该函数中的this被绑定给bind的参数

### ES6

#### 变量和常量

```js
let
不允许重复声明
不会进行声明提升
块级作用域

const
常量初始化后不能被修改
约定：常量名字全部大写
```

#### Objec.is(a, b)

Object.is  99%全等(-0和+0 NaN)

小数相加大部分情况相等，特殊情况不等 0.1 + 0.2 ！= 0.3 0.2 + 0.4 ！=0.6

#### Object.assign

Object.assign方法 对象扩展的方法(MiXin) 混合，合并【浅拷贝，后面的会覆盖前面的】

#### 字符串模板和扩展

str.repeat(num)  重复num遍

str.includes（str）查找返回布尔

匹配字符串开始和结尾

str.startsWith()

str.endsWith()

字符串模板

```
`${str} ${name} ${anstr ? "我愿意丫" : "被拒绝了"}`
```

#### 字面量增强写法

```js
[变量]: 属性值
属性增强写法
{age}
方法：
{
	showName () {

    }
}
```

#### 函数

##### 默认参数

```js
function name (item1, item2 = value) {
	
}

函数的形参只有部分默认值，把有默认值的形参写在参数列表最后
```

##### 剩余参数rest

```js
function name (a, b, ...args) {
	console.log(args)
}

第一个、第二个实参赋给ab，剩余的实参传递给rest，rest是一个数组
```

默认参数和剩余参数会影响函数的length属性值【不会把设置了默认值的参数和剩余参数计算在内】

#### 集合
```js
let dataSet = new Set();

添加
dataSet.add(元素);

删除
dataSet.delete(元素);

清空
dataSet.clear();

应用 通过数组去重
new Set(arr);
Array.from(set)  转换为数组
```

#### 映射
特点：允许对象作为key

```js
let dataMap = new Map();

添加/修改
dataMap.set(key, value);

获取
dataMap.get(key);

删除,检查,清空
dataMap.delete(key);
dataMap.has(key);
dataMap.clear();
```

#### 类
语法糖
```js
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    showName () {
        console.log(this.name);
    }
    // 静态成员
    static showInfo () {
        console.log("info");
    }
}

let p1 = new Person("lw", 20);
```

类定义的所有的方法都是不可枚举的

#### 生成器
调用生成器函数的时候，函数并不会被马上执行，需要调用next方法开始执行
当函数执行到yield 会暂停，当函数执行到return的时候会结束
```js
function * task () {
    console.log("将要开始执行任务");
    yield "任务1";
    console.log("执行任务一");
    yield "任务1";
    console.log("执行任务一");
    return "__"
}
```

##### JSON
JavaScript字面量表示法
JSON本身是字符串，是有格式的字符串
主要用来进行客户端和服务端的数据传输

JSON内没有方法，不允许存在undefined，key为双引号

```js
// 解析 json转换为JavaScript对象 反序列化处理
JSON.parse(json);

// JavaScript对象转为json 序列化处理
JSON.stringify(obj)
```
#### symbol
独一无二，不能被修改，类似于字符串
```js
创建
Symbol类型数据的创建(标识符)
let s1 = Symbol(str)

Symbol类型数据用于对象中，作为key不能被枚举[常被用来当做私有属性]

Object.getOwnPropertyNames(o);
Object.keys(obj);

Object.getOwnPropertySymbols(o)  获取私有属性

Symbol.for方法会在全局查找是否存在指定的symbol数据，如果存在那么就直接使用该数据，如果不存在那么会创建对应的符号类型数据并且在全局登记
Symbol.for(key);
```

#### 对象拷贝
##### 浅拷贝
```js
通过for循环拷贝
for in 循环：注意验证属性是否为示例成员

通过Object.assign
Object.assign(t, o); o => t
```

##### 深拷贝
```js
1. 递归调用复制值类型的数据
let deepCopy = (target,source) =>{

    /*遍历source这个要拷贝的对象*/
    for (let key in source)
    {
      /*过滤 只拷贝source对象的实例对象*/
      if (source.hasOwnProperty(key))
      {
        /*source[key] 可能是值类型的，也可能是引用类型的*/
        if (!(typeof source[key] === "object"))
        {
          /*值类型的数据直接复制*/
          target[key] = source[key];
        }else
        {
          /*引用类型的数据 继续循环遍历*/
          target[key] = Array.isArray(source[key]) ? [] : {};
          deepCopy(target[key],source[key])
        }
      }
    }
  }
2. 深拷贝方案2
先把对象转换为JSON字符串，再序列化
let json = JSON.stringify(o);
t = JSON.parse(json);
3. 
```

#### 正则表达式
RegExp()

reg = /pattern/flags
flags的参数
g 全局匹配
i 忽略大小写
m 多行匹配 影响^$匹配的结果

```js
简单替换
正则实现trim()
str.replace(/^\s+|\s+$/g, "");

字符串中很多方法可以接受正则表达式作为参数
str.replace()
str.search()
str.match()
str.split()
```
##### 创建
```
1. 字面量创建
let reg1 = /华为/
str.replace(reg1, "")
str.text(reg1)  返回布尔值
str.match(reg1) 返回到匹配的字符的数组

2. 构造函数创建[注意转义字符]
let reg2 = new RegExp("华为", "g");
```

##### 实例属性
- reg.global 检查正则表达式中是否应用全局匹配
- reg.ignoreCase 检查正则表达式中是否应用忽略大小写
- reg.multiline 检查正则表达式中是否应用多行匹配
- reg.source 获取正则表达式本身
- reg.flags 获取应用的参数

##### 方法
###### 字符串的方法
- 替换
str.relace(reg, str1);

- str.search(reg)
搜索 返回第一个匹配文本的索引，匹配不到返回-1


- str.match(reg)
默认匹配 返回一个数组
全局匹配：返回匹配到的数据放到数组中返回
没有匹配到数据返回null

- str.split(reg) 切割字符串

###### 正则的方法
reg.test(str) 匹配返回true，否则返回false
reg.exec(str)

##### 规则和元字符
```js
/*
001 所有字母和数字都是按照字面量进行匹配,和字符串匹配等效 如/good/gi
002 字符类（只记小写字母即可）
    - .  : 除换行以外的字符
    - \w : 代表数字或字母或下划线
    - \W : 非数字字母和下划线字符
    - \d : 数字
    - \D : 非数字
    - \s : 代表一个空格
    - \S : 空格以外的字符
    注意：以上所有字符类都只是匹配“一个”字符

003 边界处理
    - \b : 匹配一个单词边界，也就是指单词和空格间的位置
    - \B : 匹配非单词边界。

004 特殊符号
    >  ^  $  .  *  +  ?  =  !  :  |  \  /  ()  []  {}
    - []: 代表任意“单个字符” ,里面的内容表示“或”的关系
        + -: 代表范围
        + ^: 代表非
        [abc]d  能够匹配到的数据可以是ad bd cd
        [a-z]\d 小写字母，后面是一个数字
        [5-9]   匹配5 6 7 8 9 这几个数字
        [^5-9]  取反

    - (): 表示分组（n是以最左边括号出现的顺序排列）
        + $1: 表示第一个分组
        + $n: 表示第n个分组（不能写在正则表达式里）
        + \n: 在正则分组后面使用，表示对第n个分组的引用(一定要写在正则表达式里)
        建议：编写的正则分组数量越少越好

    - |:  表示或者 a|b|c === [abc]

    - 锚点定位
        + ^: 表示以什么开头
        + $: 表示以什么结尾

    - 表示数量，对前一个字符计数，
        + *: 代表0个或0个以上  {0,}  可有可无
        + +: 代表1个或1个以上  {1,}  至少有一个
        + ?: 代表0个或1个     {0,1}
        + {}:
            \d{5}:    匹配5个数字
            \d{5,10}: 匹配5个到10个数字
            \d{5,}:   匹配5个或5个以上的数字
        说明:
            1）数量词*,+,{5,}，会尽可能多的去匹配结果（贪婪）
            2）在后面加一个?表示尽可能少的去匹配结果（非贪婪）
   */
```

#### 运动
##### 匀速运动
定时器 + 修改标签的样式[每次移动的距离相同] + 临界值的检查

### 网络请求
#### GET和POST
处理方式不同
 - GET请求参数以查询字符串的格式跟在URL后面
 - POST请求参数保存在请求体中进行提交

GET请求网络安全性很差，POST请求相对安全
浏览器对URL有长度和大小的限制(2KB)，GET请求有限制，文件上传只能用POST请求

#### 文件上传
- 使用POST请求
- enctype="multipart/form-data"

#### ajax
全程：Async javascript and XML

##### GET请求
```js
/*1.创建请求对象*/
let xhr = new XMLHttpRequest();
/*2.设置请求对象  GET请求参数放在请求路径上*/
xhr.open('get', '请求路径', true);
/*3.发送网络请求*/
xhr.send();
/*4.监听请求状态的改变 当网络请求的状态发生改变就会执行该函数，用于监听网络状态
[1] 请求未初始化  0
[2] 服务器连接已经建立  1
[3] 请求已经接收  2
[4] 请求处理中  3
[5] 请求已经完成，且响应已经就绪  4
*/

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            console.log(xhr.statusText);
        }
    }
}
```

##### 请求存在的问题

```js
/*
[1] IE浏览器可能存在缓存的问题[将上一次的结果返回]
    产生原因：每次请求的路径一样
    解决方案：附加参数|时间戳
[2] URL路径存在中文，需要对中文转码
    url = encodeURI(url);

上面两个问题主要存在于GET请求

[3] 请求超时
    xhr.abort(); [取消网络请求]
    定时器[在请求完成后取消]
*/
```

##### POST请求
```js
function () {
    let queryStr = 'username="张三"'
    // 创建请求对象
    let xhr = new XMLHttpRequest();
    // 设置请求对象
    xhr.open("post", url, true);
    // 设置请求头信息 [只能在这个位置设置请求头]
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // 发送请求
    xhr.send(queryStr);
    // 监听网络请求状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText, xhr.statusText);
        }
    }
}
```
##### JQuery
###### Ajax表单序列化
```js
/*获取表单的数据并且转换为查询字符串*/
$('form').serialize()

/*表单转为对象数组*/
$('form').serializeArray()
```

##### FormData
```js
let data = new FormData();
/*添加数据*/
data.set("name", "zs");

/*查询数据*/
data.append("name", "zs");

/*修改数据*/
data.set("name", "zs");

/*查询数据*/
data.get("name");

/*查询指定key对应的所有数据 返回数组*/
data.getAll("name");

/*检查是否含有某个数据*/
data.has('name');

/*删除数据*/
data.delete("name");

document.links  // 获取页面中所有的a标签
document.images // 获取所有的图片标签
document.forms  // 获取页面中所有的表单
document.forms.nameItem(name) // 根据表单的name属性获取表单
```

###### FormData的请求
```js
data = new FormData(document.forms.nameItem(name));

// GET请求
let arr = [];
data.forEach((value, key) => {
    console.log(key, value);
    arr.push(key + "=" + value);
})

let queryString = arr.join("&");
let xhr = new XMLHttpRequest();
xhr.open('get', url + queryString, true);
xhr.send();
xhr.onload = () => {
    if (xhr.status == 200) {
        console.log("success", xhr.responseText);
    }
}

// POST请求
let xhr = new XMLHttpRequest();
xhr.open('POST', url, true);
xhr.send(data)
xhr.onload = () => {
    if (xhr.satus == 200) {
        console.log("success", xhr.responseText);
    }
}
```

###### 文件上传
```js
let data = new FormData(document.forms.nameItem(name));
let xhr = new XMLHttpRequest();
// 当监听到文件上传请求就会请求执行该事件函数
xhr.upload.onprogress = (e) => {
    // e为文件上传触发的事件
    console.log((e.loaded / e.total) * 100).toFixed(2) + "%");
}
xhr.open(xhr);
xhr.open("post", url, true);
xhr.send(data);
xhr.onload = () => {
    if (xhr.status == 200) {
        console.log("success", xhr.responseText);
    }
}
```

#### XML
```js
/* 
XML 数据
xhr.responseXML [文档]
p.innerHTML 获取数据
*/
```

#### JSON
##### JSON处理
```js
1. JSON全局对象中的parse方法解析
JSON.parse(json);

JSON.parse(json, fun);
/*
第一个参数是要解析的json，第二个参数要用来过滤的函数
undefined表示该键值对将不会被解析成对象的内容
*/
let res = JSON.parse(json, (key, value) => {
    if (key == 'car') {
        return undefined;
    } else {
        return value
    }
})

JSON.stringify(obj, fn|arr, space);
/* 
参数：
    第一个参数：要转成json的对象
    第二个参数：函数或者是数组，控制转换的细节
    第三个参数：传递数字或者字符 [最多10个]
*/

JSON.stringify(obj, null, 4);
JSON.stringify(obj, null, '@@');
JSON.stringify(obj, ['height', 'age'], 4); // 只返回age和height
JSON.stringify(obj, (key, value) => {
    // 处理数据
    if (key == 'age') {
        return value * 1.5
    } else {
        return value
    }
}, 4);


2. 使用eval函数进行解析，会把字符串转为js代码并马上执行
[1]eval("var obj = " +json);  console.log(obj);
[2]包装成一个表达式
let jobj = eval('(' + json + ')');
```

#### 同源访问策略
```js
Access-Control-Allow-Origin 请求跨域
```

##### CORS 跨域

### 浏览器存储
#### cookie
##### 产生的原因
HTTP协议本身无状态的，需要解决客户端身份标识


##### 基本情况
1. 每次发送网络请求给服务器的时候，都会把当前的Cookie带上
2. Cookie用于存储数据，但是有限制[大小限制 < 4KB | 个数限制 网页 < 50[建议 < 20]  网站 < 200]
3. 在相同的域（源）数据可以共享,不能跨域，不能跨浏览器

##### 使用
```js
// 增 | 改
document.cookie = "key = value[; expires = date][;path = 路径][;domain = 域名]"
/*
参数：
expires 表示cookie的失效时间, 默认是浏览器关闭时失效(可选) 
path 访问路径, 默认为当前文件所在目录(可选), cookie只能在设置的路径及它的子目录下使用 
domain 访问域名, 限制在该域名下访问(可选), 没有设置则默认为当前域名
*/

// 查  需要获取document.cookie 进行剪切处理

// 删
document.cookie = "key = null[; expires = -1][;path = 路径]"
```


#### sessionStorage
```js
/*
H5新特性[考虑兼容性]
2M-5M
本身就是对象，可以使用对象的方法
eg: sessionStorage[key]
*/
window.sessionStorage.setItem(key, value);
window.sessionStorage.getItem(key);
window.sessionStorage.removeItem(key);
window.sessionStorage.clear();
```

#### localStorage
```js
/*20M 不会过期*/
window.localStorage.setItem(key, value);
window.localStorage.getItem(key);
window.localStorage.removeItem(key);
window.localStorage.clear();
```

### 异常捕获
```js
try {
} catch (e) {
    throw e
} finally {
    // 无论try语句中的代码是否出错，该代码块中的语句都会被执行
    // 变量清理操作 variable = null
}

let error = new Error(errorMes);
```
### 数据安全问题
#### 数据加密的常见方法
```js
[1] Base64编码
[2] 单向散列函数(哈希算法 | 消息摘要算法 | 指纹算法)
[3] 对称加密算法
[3] 非对称加密算法
[4] 证书
[5] HTTPS
```

##### Base64编码方案
```js
/*
Base64 可以把任意的数据转换成文本
编码之后可以转码，体积可能会更大 1/3
*/

window.btaoa(str)  // 编码
window.atob(加密的数据) // 解码
```

##### 单向散列函数计算
```js
加密过程单向，可以加密但是不能解密，加密速度快，性能好，对任意数据加密得到的密文都是定长的,明文相同，密文一定相同，明文不同，密文不同

经典算法
MD4 MD5
Sha1 sha256 sha512

典型应用：
    文件的完整性验证|版权验证
    云盘秒传
    文件匹配
    数据库只保存加密的密码
```

##### 对称加密
```js
加密解密使用的事同一个秘钥[安全性取决于秘钥是否安全]

[1] DES
[2] 2DES
[3] 3DES
[4] AES(高级数据加密标准)

存在的问题
[1] 秘钥对管理的问题
[2] 秘钥传输安全的问题-首次传输不安全

DES和AES算法都是块模式加密
```

##### 非对称加密
```js
/*
加密的时候使用公钥，解密的时候使用私钥
经典加密算法RSA

存在问题
1.公钥可能会被伪造[中间人攻击]
2.性能不好，效率比较低
*/
```
###### 中间人攻击解决方案
公钥 + 数字签名（第三方机构 CA == 证书）

### Promise
#### 基本使用
```js
[1]
new Promise(function (resolve, reject) {
    console.log('task');
    // 异步任务执行完成 任务成功：resolve  失败：reject
}).then(function(success) {
    // Promise函数调用resolve函数
    console.log("成功执行的函数");
}, function (error) {
    // Promise回调函数调用reject
    console.log("失败执行的函数");
})

[2]
new Promise(function (resove, reject) {
    // 异步任务
}).then(function() {
    //
}).catch(function () {
})

[3]
new Promise((resove, reject) => {
}).then(success => {
}).catch(error => {
})

Promise 状态
pending   [未完成]
fulfilled [成功]
rejected  [失败]
```

#### Promise链式调用
```js
new Promise((resove, reject) => {
})
.then(success => {
    return new Promise((resove, reject) => {
    })
}, error => {
})
.then(success => {
}, error => {
})
```

#### 并发
```js
Promise.all([
    new Promise((resove, reject) {}),
    new Promise((resove, reject) {}),
    ...
]).then(success => {}).catch(error => {})

并发任务
all数组里面都是Promise对象，全部执行完毕再执行后面的方法
如果有一个出错then的函数不会执行
如果需要传参 resolve(param) 但是success结果为数组
```

### JQuery
#### 页面监听
```js
监听页面的加载
window.onload = function () {} // 原生

$(document).ready(function () {}) // JQuery

原生方式监听N次，仅仅执行一次(覆盖), JQuery可以监听多次
原生监听所有资源加载完毕, JQuery监听DOM加载完毕

简写
$().ready(function () {})
$(function () {})
```
#### 冲突问题
```js
$在其他框架被定义，项目中使用到

(function ($) {
    // 函数体
})(jQuery)

// 重新命名JQuery

let j = jQuery.noConflict();
j(function () {})
```

#### JQuery DOM转换
```js
DOM => JQ
$(DOM)

JQ => DOM
jq[0] | jq.get(0)
```

#### 操作css
链式编程：每次调用完方法后都把正在操作的对象返回
```js
链式编程
$("#boxID").css("background","red").css("width","200px").css("height","50px");

// 通过对象来设置多个样式
$("#boxID").css({
  "background":"#ccc",
  "width":"300px",
  "height":"100px",
  "border":"1px solid red"
})
```

#### 操作class
```js
// 添加
$(sel).addClass(class);
// 如果需要设置多个class "class1 class2 ..."

// 删除
$(sel).removeClass(class);

// 检查所有选中标签中是否存在指定的样式，如果存在就返回true，否则返回false
$(sel).hasClass(class);

// 切换样式 如果存在删除，不存在添加
$(sel).toggleClass(class);

// 获取样式
$(sel).css(attribute);
```

#### 位置和宽高
```js
$(sel).offset(); // 相对于窗口的位置信息
$(sel).position(); // 相对于最近的具有定位属性的父标签的位置信息

具有的属性 left, top

$(sel).width();
$(sel).height();
// 没有传参获取属性值，有参数的时候设置属性
```

#### 内容
```js
$(sel).text(); // 获取标签的文本内容，存在子标签抽取子标签的文本拼接返回
$(sel).html(); // 会解析里面的标签
$(sel).is(":checked") // 判断是否已经勾选了
```

#### 选择器

##### 基本选择器
```js
$('#id') // ID选择器
$('.class') // 类选择器
$('tag') // 标签选择器
$("sel1, sel2, ...") // 并集选择器
$("*") // 通配符选择器
```

##### 层级选择器
```js
/*
01-子孙节点  空格
02-子节点    >
03-获取当前标签后面的第一个兄弟节点 + 
04-获取当前标签后面的所有的兄弟节点  ~
*/
```

##### 筛选选择器
```js
/*
* :first 第一个
* :last  最后一个
* :eq(index)    等于...
* :lt(index)    小于...
* :gt(index)    大于...
* :even         偶数
* :odd          奇数
* not(...)      排除...
* */
```

##### 属性选择器
```js
/*属性选择器：根据属性节点的情况来选择标签*/

/*001-拥有href属性节点*/
//$("a[href]").css("background","red");

/*002-拥有href属性节点并且值等于特定值*/
//$("a[href='http://www.baidu.com']").css("background","red");

/*003-指定属性节点值不等于某个特定值*/
//$("a[href!='http://www.baidu.com']").css("background","red");

/*004-指定属性节点值中拥有特定字符串(子串)*/
//$("a[href *='qq']").css("background","red");

/*005-指定属性节点值以特定的字符串开头*/
//$("a[href ^='http://bbs']").css("background","red");

/*006-指定属性节点值以特定的字符串结尾*/
//$("a[href $='cn']").css("background","red");

// 筛选多个属性值
$("a[href='http://bbs.baidu.com?t=3247945738923'][title]").css("background","red");
```

##### 父子节点
```js
/*001-父子关系选择器*/
var target = $(".box3");

/*A-获取父标签*/
console.log($(".box3").parent());

/*B-获取祖先节点*/
console.log($(".box3").parents());

/*C-获取祖先节点..直到某个节点*/
console.log($(".box3").parentsUntil("html"));

/*D-获取子节点*/
console.log($(".box3").children());
console.log($(".box3").children("span"));

/*002-兄弟关系选择器*/
/*A-获取当前标签的兄弟节点(前面-后面)*/
console.log($(".box3").siblings());
console.log($(".box3").siblings("div"));

/*B-后面的第一个兄弟节点*/
console.log($(".box3").next());

/*C-后面的所有兄弟节点*/
console.log($(".box3").nextAll());

/*D-后面的所有兄弟节点...直到*/
console.log($(".box3").nextUntil("p"));

/*E-前面的兄弟节点*/
$(".box3").prev("span").css("background","#80f");

/*E-前面的所有的兄弟节点*/
$(".box3").prevAll("span").css("background","#80f");

/*E-前面的所有的兄弟节点直到*/
$(".box3").prevUntil("span").css("background","#80f");

层级选择器：后代选择器( )  直接后代选择器( > ) 后面的第一个兄弟节点(+) 后面所有的兄弟节点(~)
筛选选择器：first last eq odd even not gt lt ...
属性选择器：$("a[属性名='值'][属性名]")
父子选择器：children() siblings() next() nextAll() nextUntil() prev() prevAll() prevUntil() ...
```

##### 链式调用
```js
//add() 合并
//end() 返回上一个实例对象
//addBack() 把当前的实例对象和前一个实例对象合并成一个新的对象

/*02-过滤的方法*/
$(".box1").filter(function (index,ele) {

/*
filter回调函数作用是设置过滤的条件
回调函数的执行原理：遍历JQ对象中所有的标签，没循环一次就拿到当前的标签来检查是否满足过滤条件
如果满足条件那么就保存到JQ对象中，如果不满足条件那么就不保存，最后把保存的这个JQ对象返回
*/

  return $("span",this).length == 3; // this表示当前标签[范围 默认为document]
}).css("background","red");
```

##### DOM
```js
创建标签 $("<div></div>")
插入标签 append prepend
复制标签 clone(true)
删除标签 remove()
清空标签 empty()
获取标签的角标 index()
获取或者设置指定的属性 attr(key[, vlaue])
设置节点属性 attr({key1: value1, key2: value2}) // 不区分大小写
获取或者设置标签的属性 prop(key[, value]) // JQuery1.6+才有


获取输入框的内容 val()
设置输入框的内容 val(v)
```

##### 事件
###### 事件监听
```js
// 给标签绑定多个同类型的事件
$("button").mouseenter(function () {})

// on方法绑定事件
// 第一个参数是：要绑定事件的类型，第二个参数是：事件被触发后执行的事件处理函数
$("button").on("click",function () {})
```

###### 事件注销
```js
$().off(type) 获取页面中所有的按钮并且注销这些按钮身上所有的点击事件
$().off(type,handle) 获取页面中所有的按钮并且注销这些按钮身上指定的点击事件，事件处理函数要对应
```

###### 事件触发
```js
// 触发所有选中标签中指定的事件
trigger(type)

// 触发所有选中标签中第一个标签的指定的事件 不会执行浏览器默认动作，也不会产生事件冒泡
triggerHandler(type)

// jQ事件中阻止事件冒泡  e.stopPropagation() + retrun false
```

###### 自定义事件
```js
/*自定义事件是无法触发的，只能自动触发*/
$("button").on("oooo",function () {
  console.log("尽情的嘲讽吧----");
})

$("button").triggerHandler("oooo");
```

###### 事件委托
```js
$("<li>我是新来的</li>").appendTo(".list");
$(".list").append($("<li>我是新来的</li>"));

// 事件委托
$(selParent).on(type, sel, function () {
})
```

##### 动画
###### 显示隐藏
```js
// 显示
$(sel).show(time, function () {});
// 隐藏
$(sel).hide(time, function () {});
// 切换
$(sel).toggle(time, function () {});

/*04-备注：
$().eq(index)   获取指定索引对应的标签并且包装成一个JQuery对象返回 负数倒数
$().get(index)  获取指定索引对应的标签直接返回
$().first()     获取所有选中标签中的第一个标签并且包装成JQ对象返回
$().last()      获取所有选中标签中的最后一个标签并且包装成JQ对象返回
*/
```

###### 展开收起
```js
/*
展开和收起动画实现原理：修改标签的样式(高度)*/
方法：$().slideDown(speed,fn)  $().slideUp(speed,fn) $().slideToggle(speed,fn)

$(sel).hover(f1, f2);
$(sel).hover(fn);

$(".first-list >li").hover(function () {
  $(this).children("ul").stop(true,true).slideToggle();
})
stop // 是否加入队列
```

###### 淡入淡出
```js
// 淡入淡出  调整标签的样式
$(sel).fadeIn(speed, fn);
$(sel).fadeOut(speed, fn);
$(sel).fadeTo(speed, opacity, fn);
$(sel).fadeTaggle(speed, fn);
```
###### 自定义动画
```js
$(sel).animate(style, speed, fn);
```

##### 工具方法
```js
$(sel).map(function (index, value) {});

$.map(obj|arr, function (value, index) {})

$.trim() // 去掉前后空格

// 转换为数组
$(sel).toArray();

// each 方法回调函数中的this被绑定给了当前的标签，可以直接通过this来访问 可以遍历jQuery对象 可以通过return false退出

$(sel).each(function (index, value) {})
$.each(target, fn)
```
#### jQuery核心结构
```js
/*
01-jQ实例对象的构造函数其实式 jQuery.fn.init函数而不是jQuery这个函数
02-jQuery是一个工厂函数
03-jQueery整体是一个闭包结构
*/
```

### 闭包
通过闭包可间接访问局部作用域中的私有数据
```js
var obj = (function () {
    var age = 123;
    var name = "张三";

    return {
      getAge:function() {
        return age;
      },
      setAge:function(_age){
        if (_age)
        {
          age = _age;
        }
      },
      getName:function() {
        return name;
      },
      setName:function(_name){
        if (_name)
        {
          name = _name;
        }
      },
    }
  })();
```
特点
闭包可以延长局部作用域中变量的生命周期

### 继承
JavaScript中的继承给予对象实现，区别于其他面向对象语言基于class实现，继承可以优化代码(结构 | 复用)

#### 混入式继承
```js
[浅拷贝]

for循环

Object.assign(target, orgin)
```

#### 原型式继承
```js
Target.prototype = Orign.prototype;
/*
原型式继承:设置子构造函数的原型对象等于父构造函数的原型对象
特点：子构造函数创建的实例对象可以获取父构造函数原型对象的成员
问题：无法访问到实例成员
*/
```

#### 原型链继承
```js
Target.prototype = new Orign();

/*
原型链继承：设置子构造函数的原型对象为父构造函数的实例对象
原型链继承特点：可以获取父构造函数的原型成员 + 实例成员
问题：继承来的实例成员存在共享的问题
*/
```

#### 借用构造函数继承
```js
Orign.call(this, params)
/*
借用构造函数继承：在子构造函数中通过call|apply调用父构造函数，绑定父构造函数中的this为当前的实例对象
问题：可以获取父构造函数实例对象的成员 但是无法获取到原型成员
*/
```

#### 组合继承
```js
[1] 通过借用构造函数来获取实例成员
[2] 通过原型式继承来获取原型成员
```

#### Class实现继承
```js
class Animal{
    constructor(color){
      this.color = color;
    }
    eat(){
      console.log("吃");
    }
    static log(){
      console.log("我是动物的静态方法");
    }
  }

  class Person extends Animal{
    constructor(color,name,age){
      super(color);
      this.name = name;
      this.age  = age;
    }
    sleep(){
      console.log("睡");
    }
  }

  var p1 = new Person("黑","小强",33);
  console.log(p1);

  class Dog extends Animal{
    constructor(color){
      super(color);
    }
    bite(){
      console.log("咬人");
    }
  }

  var d = new  Dog("黄");
  console.log(d);

  class Student extends Person{
    constructor(color,name,age){
      super(color,name,age)
    }
    study(){
      console.log("学习");
    }
  }

  var s = new Student("黄","黄浩",18);
  console.log(s);
```

### 设计模式
#### 工厂模式
```js
/*总结工厂模式*/
/*01-提供构造函数*/
/*02-设置构造函数的原型对象，公共的属性和方法*/
/*03-设置构造函数静态方法-工厂方法，在工厂方法内部具体的处理对象创建细节*/
/*03-1 检查是否能够生成对应的产品 */
/*03-2 通过原型式继承的方式设置原型对象共享*/
/*03-3 调用构造函数返回对应的对象*/
/*04-设置构造函数静态方法-建立合作关系*/
/*05-调用构造函数的工厂方法，传递具体信息(品牌-配置参数)*/
```

#### 单例模式
在典型面向对象语言中，在调用指定类的时候，总是返回一个对象
JavaScript语言，单例模式更多指的是有一个构造函数，每次调用该构造函数返回的都是同一个实例对象

当第一次创建对象后把对象保存起来，以后需要对象的时候总是先检查对象已经存在了，如果已经存在那么就直接返回，否则就创建一个并保存起来

```js
/*方案(3) 闭包*/
  var Person = (function () {

    var _instance = null;

    return function () {
      if (_instance)
      {
        console.log("发现对象已存在，直接返回不再新建")
        return _instance;
      }

      this.name = "默认的姓名";
      _instance = this;
      console.log("创建对象");
    }
  })();
```

#### 观察者模式
##### 观察者模型
- 发布者
- 订阅者和发布者之间需要建立关系（注册订阅者 | 添加观察者）
- 订阅者-观察者

##### 单个发布者
```js
/*订阅者：*/
  let tom  = {
    name:"tom",
    response_task:function () {
      console.log("我已经帮你订好一份外卖，五分钟到门口---tom");
    }
  }
  let jack = {
    name:"jack",
    response_task:function () {
      console.log("我已经做好了一桌满汉全席---等你哟---jack");
    }
  }

  /*发布者：订阅者列表  注册订阅者  取消订阅  发布状态*/
  let publisher = {
    name:"rose",
    user:[],
    addObserver(observer){
      this.user.push(observer);
      console.log("说明：注册了订阅者");
    },
    removeObserver(observer){
      var index = this.user.indexOf(observer);
      if (index != -1)
      {
        this.user.splice(index,1);
        console.log("说明：取消了订阅者");
      }
    },
    eat(){
      console.log("宝宝饿了----rose");
      for (let observer of this.user)
      {
        observer();
      }
    }
  }

  /*注册订阅者*/
  // publisher.addObserver(tom.response_task);
  // publisher.addObserver(jack.response_task);
  //
  // publisher.eat();
  // publisher.removeObserver(jack.response_task);
```

##### 多个发布者
```js
/*订阅者：*/
  let tom  = {
    name:"tom",
    response_task:function () {
      console.log("我已经帮你订好一份外卖，五分钟到门口---tom");
    },
    response_task_lucy:function () {
      console.log("我已经帮你订好10份外卖，五分钟到门口，需不需要一起吃---tom");
    },
  }
  let jack = {
    name:"jack",
    response_task:function () {
      console.log("我已经做好了一桌满汉全席---等你哟---jack");
    }
  }

  /*发布者：订阅者列表  注册订阅者  取消订阅  发布状态*/
  function Publisher(name,user){
    this.name = name;
    this.user = user || [];
  }
  Publisher.prototype = {
    constructor:Publisher,
    addObserver(observer){
      this.user.push(observer);
      console.log("说明：注册了订阅者");
    },
    removeObserver(observer){
      var index = this.user.indexOf(observer);
      if (index != -1)
      {
        this.user.splice(index,1);
        console.log("说明：取消了订阅者");
      }
    },
    eat(){
      console.log("宝宝饿了----"+this.name);
      for (let observer of this.user)
      {
        observer();
      }
    },
  }

  /*创建发布者对象*/
  let rose = new Publisher("rose");
  let lucy = new Publisher("lucy");

  /*注册订阅者*/
  rose.addObserver(tom.response_task);
  rose.addObserver(jack.response_task);
  lucy.addObserver(tom.response_task_lucy);

  /*发布者发布状态*/
  rose.eat();
  lucy.eat();
```

##### 多个发布状态
```js
/*订阅者：*/
  let tom  = {
    name:"tom",
    rose_eat:function () {
      console.log("已经做好一份热气腾腾的兰州拉面--tom");
    },
    rose_sleep:function () {
      console.log("晚安--tom");
    },
    jim_run:function () {
      console.log("小姐姐，带带我--tom");
    }
  }

  let jack = {
    name:"jack",
    rose_sleep:function () {
      console.log("希尔顿六楼-606--jack");
    },
    jim_run:function () {
      console.log("我在看台给你加油！--jack");
    }
  }

  let jon = {
    name:"jon",
    jim_run:function () {
      console.log("我和你一起--jon");
    }
  }

  /*发布者：订阅者列表  注册订阅者  取消订阅  发布状态*/
  function Publisher(name,user){
    this.name = name;
    this.user = user || {};
  }
  Publisher.prototype = {
    constructor:Publisher,
    addObserver(type,observer){
      this.user[type] = this.user[type] || [];
      this.user[type].push(observer);
      console.log("说明：注册了订阅者");
    },
    removeObserver(type,observer){
      var index = this.user[type].indexOf(observer);
      if (index != -1)
      {
        this.user[type].splice(index,1);
        console.log("说明：取消了订阅者");
      }
    },
    publish(type){
      for (let observer of this.user[type])
      {
        observer();
      }
    }
  }

  /*创建发布者对象*/
  let rose   = new Publisher("rose");
  rose.eat = function(){
    console.log("宝宝饿了----"+this.name);
    this.publish("eat");
  }
  rose.sleep = function(){
    console.log("宝宝困了----"+this.name);
    this.publish("sleep");
  }
  rose.tom_game = function(){
    console.log("----开黑的时候叫上我--我带你上王者---rose");
  }

  let jim = new Publisher("jim");
  jim.run = function(){
    console.log("今晚八点，运动场不见不散"+this.name);
    this.publish("run");
  }

  /*注册订阅者*/
  rose.addObserver("eat",tom.rose_eat);

  rose.addObserver("sleep",tom.rose_sleep);
  rose.addObserver("sleep",jack.rose_sleep);

  jim.addObserver("run",tom.jim_run);
  jim.addObserver("run",jack.jim_run);
  jim.addObserver("run",jon.jim_run);


  /*订阅者成为发布者*/
  Object.assign(tom, Publisher.prototype);
  tom.user = {};
  console.log(tom);
  tom.game = function () {
    console.log("我想玩游戏了--");
    this.publish("game");
  }
  tom.addObserver("game",rose.tom_game);
```

### npm
```js
npm -v 查看版本
npm version 查看node和npm等版本
npm search jquery 查看jquery这个包
npm view jquery 查看jquery这个包的基本信息
npm install jquery -g 全局安装
npm list 列出所有安装的包
npm ll   列出所有安装的包[详细]
npm update [jquery]  更新指定的包[不指定更新所有的包]

// 一次安装多个包
npm init [-y]
npm install

npm install jquery@3.2.1 [指定版本]
```

### 模块化
#### CommonJS [node.js]
```js
moduleA.js
let name = "zs";
let age = 18;

module.exports = { // 需要导出
    name,
    age
}

index.js
let moduleA = require("./moduleA.js"); // 导入

// let {name, age} = require("./moduleA.js");

console.log(moduleA.name);
```

#### ES6
```js
在需要引入的文件添加
<script src="/index.js" type="module"></script>

moduleA.js
export let name = "zs";
// export let age = 18;

export { name, age } // 一次导出多个

// export default name; // 默认导出 一个文件只能有一个

index.js
// import { name } from "./moduleA.js";

// import name from "./moduleA.js" // 可以重命名 import username from "./moduleA.js"

import * as moduleA from "./moduleA.js";
访问
console.log(moduleA.name)
```

#### require.js
```js
// 模块写路径有后缀，路径参考的基础路径是HTML页面所在的路径
// 模块写在路径无后缀，路径参考的是主模块所在的路径[引用所在的文件的相对路径]
require(["A", "B"], function() {
    // 不能保证模块的加载顺序
})

// 路径不需要写.js后缀，会自动补全
// 设置baseUrl那么它相对的 html页面所在的路径
require.config({
    baseUrl: "./src/lib",
    path: {
        "jq": "./jquery-3.4.1"
    }
})

// 将配置独立成一个文件
require(["config"], function() {
    require(["A", "B"], function() {
       
    })
})
```
