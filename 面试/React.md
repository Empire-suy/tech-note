##### 生命周期

###### 旧版生命周期

mounting阶段
componentWillMount -> render -> componentDidMount

updation阶段
componentWillReceiveProps -> shouldComponentUpdate -> [true] componentWillUpdate -> componentDidUpdate

unmount阶段
componentWillUnmount

###### 新版生命周期

挂载时
static getDerivedStateFromProps -> render -> ComponentDidMount

更新时
static getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

卸载时
componentWillUnmount

##### React事件绑定原理

React并不是将click事件绑定在div的真实DOM上，而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装并交由真正的处理函数运行，这样的方式可以减少内存消耗，还可以在组件挂载销毁的时候统一订阅和移除事件。
另外冒泡到document的事件也不是原生浏览器事件，而是React自己合成的事件(SyntheticEvent)，如果不需要冒泡的话需要调用event.preventDefault

##### React事件和普通的HTML事件有什么不同

区别

- 对于事件名称命名方式，原生事件全小写，react事件采用小驼峰
- 对于事件函数处理语法，原生事件为字符串，react事件为函数

优点

- 兼容所有浏览器，更好的跨平台
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）
- 方便react统一管理和事务机制

事件执行顺序：
原生事件 -> 合成事件

#### 那些方法会触发React重新渲染？重新渲染render会做什么？

##### 触发重新渲染的方法

- setState方法被调用
- 父组件重新渲染（只要父组件重新渲染，即时子组件props没有发生变化，也会重新进行渲染）

##### 重新渲染render会做什么

- 对比新旧VNode，Diff算法
- 对新旧两棵树进行深度遍历优先，这样每个节点都会有一个标记，遍历的时候，每遍历到一个节点，就把该节点和新节点树进行对比，如果有差异就放到一个对象里面
- 遍历差异对象，根据差异的类型，根据对应规则更新VNode

##### 何时需要使用异步组件？如何使用异步组件

- 加载大组件的时候
- 路由异步加载的时候

需要配合Suspense使用

#### 对React中的Fragment的理解，他的使用场景是什么？

在React中，组件返回的元素只能有一个根元素，为了不添加多余的DOM节点，使用Fragment标签包裹所有的元素，Fragment标签不会渲染出任何元素 也可以写成<>

#### React如果获取组件中对应的DOM元素

使用ref

- 字符串格式

  ```jsx
  <p ref="info">span</p>
  ```

- 函数格式

  ```jsx
  <p ref={ele => this.info = ele}></p>
  ```

- createRef方法

  ```jsx
  this.info = createRef()
  <p ref={this.info}><p>
  ```

#### React 中可以在render访问refs吗？为什么

不行，render阶段DOM还没有生成，无法获取DOM。元素获取需要在pre-commit 或者commit阶段

#### React中如何避免不必要的render？

- shouldComponentUpdate 和 PureComponent
- 利用高阶组件
- 使用React.memo（只能用于函数组件）

#### 受控组件和非受控组件

1. 受控组件，在使用表单手机用户输入的时候，需要绑定一个onchange事件，表单状态发生变化的时候，就会触发onChange事件，更新组件的state，这种组件被称为受控组件
2. 非受控组件 没有value props（单选框和复选框对应的是checked props），通过ref获取DOM的值

#### 类组件和函数组件有什么异同？

相同点：组件是React可复用的最小代码片段，它们会返回在页面中渲染的React元素，在使用方式和最终呈现效果上都是完全一致的

不同点：

1. 开发模型不同，类组件是面向对象编程的，主打继承、生命周期等核心概念，函数式组件主要的immutable、没有副作用，引用透明等特点
2. 类组件使用shouldComponentUpdate提升性能，函数组件使用React.memo提升性能

#### React 的构造函数有什么作用？它是必须的吗？

作用

- 将对象分配给this.state 初始化本地对象
- 将事件处理程序绑定到实例上

#### React 中发起网络请求应该在哪个生命周期进行？

componentDidMount，这个生命周期是在组件已经完全挂载到网页上才会被调用执行，所以可以保证数据的加载，此外，在这个方法中调用setState，会触发重新渲染。与组件上的数据无关的加载也可以在constructor里做，但是constructor是做组件state初始化工作的，并不是做加载数据的工作，constructor也能做setState，如果加载的时间过长或者出错，页面会无法加载出来。

##### 组件通信方式

1. 父组件向子组件通信 [props 绑定属性]
2. 子组件向父组件通信 [props + callback]
3. 兄弟组件间通信（可以借助共同的父组件）
4. 跨级通信 [createContext Provider Consumer]

#### React-Router的实现原理

- 基于hash的路由：通过监听hashchange
  改变hash可以直接通过location.hash = xxx
- 基于h5的history
  history.pushState 和 replaceState等
  监听url的变化可以通过自定义事件触发实现

##### redux

为React提供的可预测的状态管理机制，Redux会将整个应用状态存储到一个地方，成为store，这个store里面保存一个棵状态树，组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新，组件可以派发(dispatch)行为(action)给store，而不是直接通知其他组件，其他组件可以通过订阅store中的状态更新自己的视图
