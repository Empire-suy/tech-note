#### 箭头函数

1. this时静态，始终指向函数声明时所在作用域下的this的值
2. 不能作为构造函数实例化对象
3. 不能使用arguments变量
4. 简写
   1. 省略小括号，当形参有且只有一个的时候
   2. 省略花括号，当代码体只要一条语句的时候，return必须省略
5. 箭头函数适合使用越this无关的回调，定时器、数组的方法回调，不适合域this有关的回调

#### Symbol

1. Symbol的值是唯一的，用来解决命名冲突
2. Symbol值不能与其他数据进行运算
3. Symbol定义的对象属性不能使用for...in 循环遍历，但是可以用Reflect.ownKeys来获取对象的所有键名
4. 创建 Symbol(属性值)          Symbol.for(属性值)
5. 不能与其他数据进行运算

#### 迭代器

可用于自定义遍历数组
工作原理：

1. 创建一个指针对象，指向当前数据结构的其实位置
2. 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
3. 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
4. 每调用next方法返回一个包含value和done属性的对象

```js
const banji = {
    name: 'emire',
    stus: [
        '柯南',
        '小哀',
        '小兰',
    ],
    [Symbol.iterator]() {
        let index = 0, _this = this;
        return {
            next: function() {
                if (index < _this.stus.length) {
                    return {value: _this.stus[index++], done: false}
                }
                return {value: undefined, done: true}
            }
        }
    }
}

for (let s of banji) {
    console.log(s)
}
```

#### 生成器

一个特殊的函数

```js
// 生成器
function getUsers() {
    console.log('get users', ...arguments)
    setTimeout(() => {
        let data = '用户数据'
        g.next(data)
    }, 1000)
}

function getOrders() {
    console.log('get orders', ...arguments)
    setTimeout(() => {
        let data = '订单数据'
        g.next(data)
    }, 1000)
}

function getGoods() {
    console.log('get goods', ...arguments)
    setTimeout(() => {
        let data = '商品数据'
        g.next(data)
    }, 1000)
}

function * gen() {
    let res = null;
    res = yield getUsers()
    console.log(res)
    res = yield getOrders()
    console.log(res)
    res = yield getGoods('pear')
    console.log(res)
}

let g = gen();
g.next()
```

#### Promise

then返回值

1. 非promise类型的属性（）
2. promise对象
3. 抛出错误（rejected）

#### set

声明

new Set()

元素个数        size

添加新的元素   add

删除元素        delete

检测                has

清空                clear

#### Number.EPSILON

```js
function equal(a, b) {
    return Math.abs(a - b) < Number.EPSILON
}

console.log(equal(0.1 + 0.2, 0.3))
```

#### Number.isFinite

判断一个数是否有限

#### Number.isNaN

检测数字是否是一个NaN

#### Number.parseInt

#### Number.parseFloat

#### Number.isInteger 

判断一个数是否为整数

#### Math.trunc

将数字的小数部分抹掉

#### Math.sign

判断一个数是正数、0、还是负数

返回1,      0          -1

#### 对象方法拓展

1. 判断两个值是否相等

   Object.is(v1, v2)

2. 对象合并

   Object.assign

3. Object.setPrototypeOf    Object.getPrototypeOf（不建议这样使用，创建的时候就设置原型对象）

#### 模块化

1. CommonJS              =>          Nodejs、Browserify
2. AMD                         =>          requireJS
3. CMD                         =>          sealJS

### ES7

#### Array.prototype.includes()

返回布尔值数据

#### 幂运算 **

### ES8

#### async      await

async函数返回的结果不是一个promise对象，则该函数返回的是一个成功的promise对象，抛出错误则返回的结果是一个失败的promise对象

返回的结果是一个promise对象则返回的结果就是返回的promise的结果

await返回的结果是promise成功的值



#### 对象拓展方法

1. Object.values()
2. *Object*.getOwnPropertyDescriptors

### ES9

#### rest参数

#### 正则扩展

##### 命名捕获分组

可以通过别名获取分组的参数，方便维护

```jsx
let str = 'https://developer.mozilla.org/zh-CN/search?q=exec'
const reg = /https:\/\/(?<host>[\w\.]*).*\?(?<params>.*)/
let res = reg.exec(str)
console.log(res)
```

##### 反向断言

```js
let str = '动态的使用innerHTML插入HTML语句比创建DOM节点更快。'

// 正向断言
let reg = /[A-Z]*(?=语)/
let res = reg.exec(str)
console.log(res)

// 反向断言
let reg1 = /(?<=入)[A-Z]*/
let res1 = reg1.exec(str)
console.log(res1)
```

##### dotAll模式

```js
let str = `
            <ul>
                <li>
                    <a>肖申克的救赎</a>
                    <p>上映日期：1994-09-10</p>
                </li>
                <li>
                    <a>阿甘正传</a>
                    <p>上映日期：1994-07-06</p>
                </li>
            </ul>
        `

const reg = /<li>.*?<a>(?<title>.*?)<\/a>.*?<p>.\D*(?<date>(\d+\-\d+\-\d+))<\/p>.*?<\/li>/gs

let result;
let data = [];
while (result = reg.exec(str)) {
    data.push({
        title: result.groups.title,
        date: result.groups.date
    })
}

console.log('获取结果：', data)
```

### ES10

#### Object.fromEntries

由二维数组或map创建对象

```js
console.log(Object.fromEntries([
    ['name', 'emire'],
    ['address', ['gz', 'sh', 'sz', 'bj']]
]))

console.log(Object.fromEntries(new Map().set('name', 'emire')))
```

#### trimStart            trimEnd

清除左边、右边的空格

#### Array.prototype.flat

数组降维

#### Array.prototype.flatMap

map和flat的结合

#### Symbol.prototype.description

```js
let s = Symbol('Javascript')
console.log(s.description)
```

### ES11

私有属性

```js
class Person {
    #weight;
    constructor(name, age, weight) {
        this.name = name;
        this.age = age;
        this.#weight = weight
    }

    intro() {
        console.log('体重', this.#weight)
    }
}

let boy = new Person('emire', 24, 55)
console.log(boy)
boy.intro()
```

#### Promise.allSettled

```js
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(400)
    }, 1200)
})

Promise.allSettled([p1, p2]).then(res => {
    console.log(res)
})

Promise.all([p1, p2]).then(res => {
    console.log(res)
})

Promise.race([p1, p2]).then(res => {
    console.log(res)
})
```

#### String.prototype.matchall

```js
let str = `
            <ul>
                <li>
                    <a>肖申克的救赎</a>
                    <p>上映日期：1994-09-10</p>
                </li>
                <li>
                    <a>阿甘正传</a>
                    <p>上映日期：1994-07-06</p>
                </li>
            </ul>
        `

const reg = /<li>.*?<a>(?<title>.*?)<\/a>.*?<p>.\D*(?<date>(\d+\-\d+\-\d+))<\/p>.*?<\/li>/gs

let result;
result = str.matchAll(reg)
console.log(...result)
```

#### 可选链操作符

?.

#### 空值合并运算符

??

#### 动态导入

import

#### globalThis

全局对象
