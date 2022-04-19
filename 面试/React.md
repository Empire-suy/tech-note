##### 声明周期

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

##### 何时需要使用异步组件？如何使用异步组件

- 加载大组件的时候
- 路由异步加载的时候

需要配合Suspense使用

##### 组件通信方式

1. 父组件向子组件通信 [props 绑定属性]
2. 子组件向父组件通信 [props + callback]
3. 跨级通信 [createContext Provider Consumer]

##### redux

为React提供的可预测的状态管理机制，Redux会将整个应用状态存储到一个地方，成为store，这个store里面保存一个棵状态树，组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新，组件可以派发(dispatch)行为(action)给store，而不是直接通知其他组件，其他组件可以通过订阅store中的状态更新自己的视图
