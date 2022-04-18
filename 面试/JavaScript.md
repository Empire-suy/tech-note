##### 数据类型

```js
Number Boolean String BigInt Symbol Null Undefined
Object
```

##### 检测数据类型的方法

1. 检测值类型数据 使用typeof
2. 检测数据 Array.isArray()
3. instanceOf
4. Object.prototype.toString  结果格式: [object Object|Number]

##### var、let、const

1. var 没有块的概念，可以跨块访问，不能跨函数[函数级作用域]
2. let 定义的变量 只能在块作用域访问，不能跨块访问，也不能跨函数访问
3. const 定义常量， 使用时必须初始化，只能在块级租用与里访问，不能被修改
4. var 可以在相同作用域内重复声明同一个变量，let和const不行
5. let 和 const 存在变量提升但是有暂时性死区

##### 继承的方式

1. 类式（原型链）继承

   ```js
   // 原型链继承 [只继承了父类的原型属性，实例属性和静态属性没有利用到]
   function Person(name, age, sex) {
     this.name = name
     this.age = age
     this.sex = sex
   }
   
   Person.prototype.eat = function() {
     console.log('恰饭')
   }
   
   function Doctor(name, age, sex) {
     this.name = name
     this.age = age
     this.sex = sex
   }
   
   // 修改原型 继承原型属性
   Doctor.prototype = new Person()
   // 修改构造函数 [指向混乱]
   Doctor.prototype.constructor = Doctor
   
   // 新增加的原型属性放在后面增加
   Doctor.prototype.behavor = function() {
     return '救死扶伤'
   }
   
   
   let d = new Doctor('emire', 29, '男')
   let p = new Person('vampire', 299, '男')
   console.log(d)
   console.log(p)
   console.log(d.behavor())
   ```

2. 构造函数式继承（利用apply和call）

   ```js
   // 继承了实例属性 没有继承原型属性
   function Person(name, age) {
     this.name = name
     this.age = age
   }
   
   Person.prototype.showInfo = function() {
     return `${this.name} - ${this.age}`
   }
   
   function Teacher(name, age, lesson) {
     Person.call(this, name, age)
     this.lesson = lesson
   }
   
   Teacher.prototype.takeLesson = function() {
     return this.lesson
   }
   
   
   let t = new Teacher('emire', 26, 'JavaScript')
   
   console.log(t)
   console.log(t.takeLesson())
   // console.log(t.showInfo())
   ```

   组合式继承

   ```js
   // 组合式继承 解决原型属性和原型链继承的问题
   function Person(name, age) {
     this.name = name
     this.age = age
   }
   
   Person.prototype.showInfo = function() {
     return `${this.name} - ${this.age}`
   }
   
   function Teacher(name, age, lesson) {
     Person.call(this, name, age)
     this.lesson = lesson
   }
   
   Teacher.prototype = new Person()
   Teacher.prototype.constructor = Teacher
   
   Teacher.prototype.takeLesson = function() {
     return this.lesson
   }
   
   
   let t = new Teacher('emire', 26, 'JavaScript')
   
   console.log(t)
   console.log(t.takeLesson())
   console.log(t.showInfo())
   
   // 存在问题: 原型链存在空参数的问题
   ```

3. 寄生式继承

   ```js
   // 寄生式继承 [参数没有优化]
   function Person(name, age) {
     this.name = name
     this.age = age
   }
   
   Person.prototype.showInfo = function() {
     return `${this.name} - ${this.age}`
   }
   
   function Teacher(name, age, lesson) {
     this.name = name
     this.age = age
     this.lesson = lesson
   }
   
   function extend(P, C) {
     const F = function() {}
     F.prototype = P.prototype
     C.prototype = new F()
   
     return C
   }
   
   extend(Person, Teacher)
   
   Teacher.prototype.constructor = Teacher
   
   Teacher.prototype.takeLesson = function() {
     return this.lesson
   }
   
   
   let t = new Teacher('emire', 26, 'JavaScript')
   
   console.log(t)
   console.log(t.takeLesson())
   console.log(t.showInfo())
   ```

4. 组合寄生式继承

   ```js
   // 组合寄生式继承
   function Person(name, age) {
     this.name = name
     this.age = age
   }
   
   Person.prototype.showInfo = function() {
     return `${this.name} - ${this.age}`
   }
   
   function Teacher(name, age, lesson) {
     Person.call(this, name, age)
     this.lesson = lesson
   }
   
   function extend(P, C) {
     const F = function() {}
     F.prototype = P.prototype
     C.prototype = new F()
   
     // 修改原型链的构造函数的指向
     C.prototype.constructor = C
   
     return C
   }
   
   extend(Person, Teacher)
   
   Teacher.prototype.takeLesson = function() {
     return this.lesson
   }
   
   
   let t = new Teacher('emire', 26, 'JavaScript')
   
   console.log(t)
   console.log(t.takeLesson())
   console.log(t.showInfo())
   ```

5. ES5中的继承优化

    ```js
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    Person.prototype.showInfo = function() {
      console.log(this.name + '-' + this.age)
    }

    function Yellow(name, age, addr) {
      Person.call(this, name, age)
      this.addr = addr
    }

    Yellow.prototype = Object.create(Person.prototype)
    Yellow.prototype.constructor = Yellow

    Yellow.prototype.getAddr = function() {
      console.log(this.addr)
    }

    let y = new Yellow('emire', 28, 'Asia')
    console.log(y)
    ```

6. ES6中的继承

    ```js
    class Person {
      constructor(name, age) {
        this.name = name
        this.age = age
      }

      showInfo() {
        console.log(this.name + '-' + this.age)
      }
    }

    class Yellow extends Person {
      constructor(name, age, addr) {
        super(name, age)
        this.addr = addr
      }

      getAddr() {
        return this.addr
      }
    }

    let y = new Yellow('emire', 28, 'Asia')
    console.log(y)
    console.log(y.getAddr())
    y.showInfo()
    ```


