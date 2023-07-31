# TypeScript

### 类型和值
- boolean
- number
- string
- T[] / Array<T>
- [T1, T1, ...Tn]
- any
- void
- null, undefined
- never
- object

箭头函数和空对象没有key

### 条件语句
```ts
S extends P ? T : F;
```

### 类型合并
```ts
type T = P | C;
//【联合类型】如果C是P的子类型，那么可以在联合类型中将C消去
//【交叉类型】如果C是P的子类型，那么可以在联合类型中将P消去

```

### 注释
- 单行
- 多行
- 区域描述
```ts
// 单行注释
/*
 * 多行注释
 */

//#region 区域描述[可以进行折叠]
//#endregion
```

### enum 枚举
```ts
enum Direction {
  Up,
  Right,
  Down,
  Left
}

// 编译的时候为转为可双向映射的数据 在不需要双向映射的情况，可以使用const进行声明，此时只能使用string(即左 -> 右)
```

### 顶端类型
```ts
any // any 是所有类型的父类型 可以赋值给任意的类型(不包含never)
unknown // 更安全的顶端类型 只能赋值给any和unknown类型 在使用的时候需要细化成具体的类型
```

### 尾端类型
```ts
never // 是其他类型的子类型 ts只有一种尾端类型(也称为0类型，空类型)
```
应用场景
- 作为函数的返回值，表示无法返回一个值
  ```ts
  const throwError = () => {
    throw new Error('error');
  }

  const loop = () => {
    while(true) {}
  }
  ```
- 在条件类型实现类型计算
  ```ts
  type Exclude<T, U> = T extends U ? never : T;
  ```

### 元组
元组类型允许赋值给常规数据类型和只读数组类型，只读元组只能赋值给只读数组

在类型里面 元组是定长的，所以可以通过修改数组的长度，最后通过获取length 属性返回长度
```ts
type StrToArray<S> = S extends `${infer x}${infer xs}` ? [1, ...StrToArray<xs>] : [];
type StrLength<S extends string> = StrToArray<S>['length'];
```

### Object
#### Object
Object是特殊对象[Object.prototype]的类型，该类型的主要作用是描述js中几乎所有对象都共享的属性和方法
除了null和undefined外，其他的值都可以赋给Object[对于原始值类型，js会对原始值进行自动封箱操作]

#### object
object表示非原始类型
object关注点在于类型的分类，它强调是非原始类型，即对象类型。不应该关注对象包含哪些属性，不可以读取和修改object类型上的自定义属性，仅允许对象的公共属性和方法
object类型仅能赋值给三种类型：
- 顶端类型any和unknown
- Object类型
- 对象字面量

使用场景
```ts
Object.create(object /** 这里使用object类型表示比any更准确 */)
```

#### 接口
- 属性签名
- 调用签名 
  ```ts
  (ParameterList): Type
  ```
- 构造签名
  ```ts
  new (ParameterList): Type
  ```
- 方法签名
  ```ts
  interface Fns {
    PropertyName(ParameterList) => Type;
    PropertyName: (ParameterList) => Type;
    PropertyName: {(ParameterList): Type};
  }
  ```
- 索引签名
  ```ts
  interface Idx {
    [prop: string]: Type;
    [prop: number]: Type;
  }
  ```

### 类型别名
#### 递归类型别名
- 若类型别名引用的类型为接口类型、对象类型字面量、函数类型字面量和构造函数类型字面量，则允许递归引用类型别名
- 若类型别名引用的是数组类型或元组类型，则允许在元素类型中递归地引用类型别名
- 若类型别名引用的是泛型类或泛型接口，则允许在类型参数中递归的引用类型别名

#### 类型别名和接口
- 类型别名能够表示非对象类型，接口只能表示对象类型
- 接口可以继承其他的接口、类等对象类型，类型别名则不支持继承
- 接口具有声明合并的行为，类型不会

### 类
- 成员可访问性
  - public
  - protected 允许在当前类的内部和派生类的内部访问，但是不允许在当前类的外部访问
  - private 允许在当前类的内部访问，在当前类的外部以及派生类的内部不允许访问

#### 抽象类
在class关键字前面添加abstract关键字, 抽象类不能被实例化
抽象类可以继承抽象类

#### 成员可见性

#### protected
```ts
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {
    other.x = 10;
// Property 'x' is protected and only accessible through an instance of class 'Derived2'. This is an instance of class 'Base'.
  }
}
```

##### 跨实例 private
```ts
class A {
  private x = 10;
 
  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

### 泛型
表示参数之间或者参数和返回值之间的一种约束，如果不需要表示这种关系则不需要声明返回值
#### 泛型约束
类型参数的约束条件

约束类型允许引用形式类型参数列表中的其他的类型参数，但不允许直接或间接将自身作为约束类型，否则会产生编译错误

#### 基约束
- 如果参数的约束类型是另外一个参数，那么另外一个参数就是该参数的基约束
- 如果参数的约束类型是具体的类型，那么这个类型就是该参数的基约束
- 如果参数没有声明约束类型，那么参数的基约束为空对象{}，即除了undefined和null类外的其他的参数

### 映射对象类型
- 声明
```ts
{readonly [P in K]?: T}
```
- K的类型能够赋值给 string | number | symbol
- P限制在具体的值上，P则表示具体的值
- 如果P表示其中的一种，那么表示某种抽象的类型

### 装饰器
ts5.0版本
[typescript 5.0 decorator](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)


### 最佳实践
#### 泛型函数
- 尽可能的使用类型本身而不是约束
```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
 
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

- 使用更少的类型参数
- 泛型参数最少要出现两次，否则不如直接使用类型

#### 函数重载
+ 尽可能地使用函数参数的联合类型而不是函数重载

### 注意
- 不可能创建泛型枚举和泛型命名空间

### 协变和逆变
[TypeScript 中的子类型、逆变、协变是什么？](https://github.com/sl1673495/blogs/issues/54)

## TODO:
```ts
// 父类型和子类型 最返回的类型是父类型？？？


12 as const  // 几个意思???

const Three = 3 as const;


// 怎么实现UpperCase类型
// 只把第一个字符转换成大写 Capitalize
```

object 和 Object的区别 
string 和 String的区别
Function

不是很能理解这些
```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
    // 这个写法 不是很能理解
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
```


```ts
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
type V<T extends string | number> = T extends number ? IdLabel : NameLabel

function createLabel<T extends string | number>(nameOrId: T): T extends number ? IdLabel : NameLabel {  
  if (typeof nameOrId === 'string') {
    // Type '{ name: string; }' is not assignable to type 'T extends number ? IdLabel : NameLabel'.(2322)
    // 怎么解决这个问题
    return {name: nameOrId}
  }

  return {id: nameOrId}
}

const a = createLabel('aaa')
```

```ts
// 这三个结果为什么不一样
type Aa<T> = T extends infer T1 ? T1[] : boolean
type b = Aa<never>

type Aa<T> = [T] extends infer T1 ? T1[] : boolean
type b = Aa<never>

type Aa<T> = [T] extends[ infer T1] ? T1[] : boolean
type b = Aa<string | never>
```

```ts
interface T {
  history:any;
}

interface T2 {
  name:string;
}

type Fn = (cb: T2 extends T) => void;
// '?' expected.
// 原因分析 extends的操作符并不适用于这个场景，适用&
```

<!-- 原型链知识回顾 -->


2. 不同输入类型，并且返回值不同类型的函数重载怎么解决返回值的类型判断

##### 参考
[TypeScript 编程](https://juejin.cn/post/7212446354918965304)
[Typescript 类型编程，从入门到念头通达](https://juejin.cn/post/7132490947320872974)