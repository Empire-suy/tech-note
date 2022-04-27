##### MVVM的理解

视图模型双向绑定，是Model-View-ViewModel的缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。以前是操作DOM结构更新视图，现在是数据驱动视图。


##### Vue响应式数据原理

拦截属性的获取 - 进行依赖收集 - 拦截属性更新的操作，对相关依赖进行通知

initData [初始化用户传入的data数据] => new Observer [将数据进行观测] => this.walk(value) [对对象进行处理] => defineReactive [循环对象属性定义响应式变化] => Object.defineProperty [使用Object.defineProperty重新定义数据]

#### Vue2 数据劫持的原理

数据劫持的核心是defineReactive函数，里面主要使用的是Object.defineProperty来对对象访问器getter和setter进行劫持，数据变更的时候set函数里面可以通知视图进行更新
在使用Object.defineProperty进行数据劫持的时候，对象和数组是分开的:对象是遍历对象属性之后进行递归劫持的，数组是重写数组的原型方法。

#### Vue2 数据劫持的缺陷

1. 使用的api Object.defineProperty 实现，所以不兼容ie8以下
2. Vue2数据劫持无法检测数组和对象的变化，只会劫持一开始存在的data选项中的数据。新增的属性或者元素可以通过Vue.$set进行绑定

##### Vue如何检测数组变化

[push pop shift unshift sort splice reverse]
vue对数组的原型方法进行了重写，使用函数劫持的方式，重写了数组的方法
vue将data中的数组，进行了原型链重写，通过原型链指向了自己定义的数组原型方法，这样数组在调用这些api的时候，可以通知依赖更新

#### Vue3 数据劫持的优势

- 可以直接监听对象，Object.defineProperty 需要遍历对象属性进行监听
- Proxy可以监听对象新增的属性和方法，Object.defineProperty 只能监听一开始存在的属性，新增的属性需要手动的Observer
- 可以直接监听数组的变化，Object.defineProperty无法监听数组的变化
- Proxy有多达13中拦截方法
- Proxy返回的是一个新对象，可以只操作新对象达到目的

##### Vue为什么使用异步更新

如果每次更新都对当前组件进行重新渲染，性能消耗比较大，为了更好的性能，Vue会在本轮数据更新之后，再去异步更新视图

dep.notify() [通知watcher进行更新操作] => subs[i].update() [一次调用watcher的update] => queueWatcher [将watcher去重放到队列中] => nextTick(flushSchedulerQueue) [异步清空watcher队列]

##### nextTick 实现原理

原理：事件循环 使用宏任务和微任务定义一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列，所以这个nextTick方法就是异步方法

原理: 
nextTick(cb) [调用nextTick 传入cb] => callbacks.push(cb) [将回调函数存入数组中] => timerFunc [调用timerFunc 1.尝试采用Promise调用；2.尝试采用MutationObserver回调；3.尝试采用setImmediate回调 (仅支持IE10以上)；4.采用setTimeout 执行nextTick中传入的方法] => 返回promise

##### computed的特点

computed是一个具有缓存功能的watcher，只有当依赖的属性发生变化时才会更新视图

initComputed => new Watcher [lazy: true, 默认 dirty: true, 默认watcher不执行] => defineComputed [将属性定义到实例上] => createComputedGetter [创建getter当取值时会执行该方法] => 当用户取值的时候 => 返回上次的值 [dirty为false] / watcher.evaluate [dirty为true 计算结果，计算式会进行依赖手机dirty改为false]

##### watcher中的deep怎么实现

如果当前监控的值是数组类型，会对对象中的每一项进行求值，此时会将当前的watcher存入到对应属性的依赖中，这样数组中对象发生变化时也会通知数据更新

三种watcher执行顺序
computed-watcher(监听的属性改变，当其他需要读取该属性的时候才会更新，具有lazy属性) => normal-watcher(监听的属性发生变化，会触发定义好的回调函数) => render-watcher(每个组件都有一个render-watcher data/computed属性改变的时候，调用该watcher更新视图)

#### watch能监听computed的属性吗

##### Vue组件的声明周期

- beforeCreate 在实例初始化之后，数据观测之前被调用
- created  实例已经创建完, 数据观测(data observer)，属性和方法的运算，watch/event事件回调，这里没有$el
- beforeMount 挂载之前被掉用，相关的render函数首次被掉用 template
- mounted el 被新创建的vm.$el 替换 并挂载到实例上后掉用该钩子
- beforeUpdate
- updated 
- deforeDestory 实例仍可以用
- destoryed Vue 实例销毁后调用，Vue实例指示的所有东西都会被解绑，所有的事件监听器都会被移除，所有的子实例被销毁，该钩子在服务端渲染期间不被调用

###### 每个生命周期可以做的事

- created 实例已经创建完成，可以进行数据，资源的请求
- mounted 实例已经挂载完成，可以做一下DOM操作
- beforeUpdate 可以在这里进一步更改状态，不会触发重新渲染的过程
- updated 可以执行依赖于DOM的操作，但是尽量避免更改状态，有可能死循环
- beforeDestory 可以执行一些优化操作，清空定时器，接触绑定事件

##### v-if 和 v-show的区别

##### v-for 和 v-if 不能同时使用

v-for 优先级比 v-if高,连着使用性能比较低，也可以使用计算属性

##### Vue组件通信的方式

- props/$emit 父子组件通信
- $emit/$on 自定义事件 兄弟组件通信
- Event Bus 跨级组件通信 Vue.prototype.$bus = new Vue() 自定义事件
- Vuex 跨级组件通信

##### 组件中的data为什么是一个函数

组件被多次复用的话，也会创建多个实例，但是这些实例用的都是同一个构造函数，如果data是对象的，这将导致不同实例直接的data冲突，使用函数可以避免这样。

##### keep-alive的实现

Vue.js内部将DOM节点抽象成一个个VNode节点，keep-alive组件的缓存也是基于VNode节点而不是直接存储DOM，它将满足条件的组件在cache对象中缓存起来，在需要重新渲染的时候再从VNode节点从cache对象取出并渲染

##### Vuex

Vuex是Vue的一个状态管理库
有State、Getter、Mutation、Action和Module

#### Vue3

##### Vue3 生命周期

setup()  onBeforeMount onMounted onBeforeUpdate onUpdated onBeforeUnmount onUnmounted

##### 响应式原理使用Proxy 代替 Object.defineProperty

对数组无法实现深层次监听，因为组件每次渲染都是将data里的数据通过defineProperty进行响应式或者双向绑定，后面新添加的属性不会绑定，也就不会触发更新渲染，但是Proxy可以做到即时是后面新增加的属性也可以监听
Proxy 配合 Reflect

#### Vue3 有什么新特性

Vue2 的组织代码的形式叫做Options API，而Vue3 最大的特点是Composition API，
setup是Composition API的入口函数，是在beforeCreate声明周期函数之前执行的，还提供了ref函数定义响应式数据，reactive函数定义多个数据的响应式

#### vue模板（template）里为什么不能使用多个头结点？

#### vuex为什么同时设计mutation和action？只设计一个行不行？

#### mounted拿到数据后可以直接获取dom吗

#### vue的生命周期中使用async/await是否阻塞

#### 你会怎么实现监听sessionStorage发生变化触发页面更新

#### vue的slot插槽一般是如何使用的
