### Proxy
基本使用
```js
const proxy = new Proxy(target, handler);
```
位运算符 | : 可以将左侧操作数转为数字 'a' | 0 => Number(a) || 0

#### get, set
如果属性配置不可配置configurable或不可写writable，则该属性不能被代理，通过Proxy对象访问该属性会报错[TypeError]

#### apply

函数直接调用或使用call,apply调用，使用Reflect.apply调用会被拦截


#### has
判断对象是否具有某个属性,对in起作用[for...in...]语法无效

#### construct
拦截new命令，有两个参数：第一个为对象，第二个为参数列表，此方法必须有返回值，否则报错

#### deleteProperty
拦截delete操作，如果这个方法返回错误或者返回false，当前属性无法被delete命名删除；如果对象配置两configurable为false,会报错。

#### defineProperty
拦截Object.defineProperty操作。如果对象不可扩展(configurable)或者不可写(writable)

#### getOwnPropertyDescriptor
拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined

#### getPrototypeOf
拦截对象的原型
- Object.prototype.\_\_proto\_\_
- Object.prototype.isPrototypeOf
- Object.getPrototypeOf
- Reflect.getPrototypeOf
- instanceOf

getPrototypeOf方法返回值必须是对象或者null,否则会报错。如果对象不可扩展，getPrototypeOf方法必须返回目标对象的原型对象

#### isExtensible
拦截Object.isExtensible，返回值如果不是布尔类型的会自动转成布尔类型，而且返回值必须跟Object.isExtensible一致，否则会报错

#### ownKeys
拦截以下操作
- Object.getOwnPropertyNames
- Object.getOwnPropertySymbols
- Object.keys

在使用Object.keys的时候会自动拦截三类属性
- 目标对象不存在的属性
- 属性名为Symbol值
- 不可遍历(enumerable)的属性

ownKeys 方法返回的数组成员只能是字符串或者Symbol,如果有其他的值会报错；如过目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则会报错；如果对象是不可扩展的，ownKeys返回的数组中必须包含原对象的所有属性，且不能包含多余的属性，否则会报错。

#### preventExtensions
拦截Object.preventExtensions，该方法必须返回一个布尔值，只有当目标对象不可扩展的时候才会返回true

#### setPrototypeOf
拦截Object.setPrototypeOf，如果目标对象不可扩展，不可以改变目标对象的原型

#### Proxy.revocable
返回一个可以取消proxy的对象
```ts
const { proxy, revoke } = Proxy.revocable(target, handler)
```

### Reflect
Reflect的属性和Proxy的属性基本一样，但是更加地友好，传入的第一个参数如果不是对象会报错

#### Reflect.set
会触发Proxy.defineProperty
```ts
Reflect.set(target, property, value, receiver)
// receiver 调用时this的值
```

#### Reflect.getPrototypeOf
Object.getPrototypeOf会先将这个参数转为对象，然后在运行，Reflect.getPrototypeOf传入的如果不是对象会报错
