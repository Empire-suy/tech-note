# TypeScript

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

## TODO
```ts
12 as const  // 几个意思???
```

##### 参考
[TypeScript 编程](https://juejin.cn/post/7212446354918965304)