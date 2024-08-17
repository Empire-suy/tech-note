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

#### react的setState有几种方式能正确的拿到数据

- 声明变量去存储需要修改的数据
- 使用函数的方式去修改数据
- setState的第二个参数中获取数据

#### 说说对React的理解，有哪些特征？
理解：

react是构建用户界面的JavaScript库，只提供了UI层面的解决方案。
遵循组件设计模式、声明式编程、函数式编程的概念。
使用虚拟DOM来操控实际DOM，遵循高阶组件到低阶组件的单向数据流。
react可将界面形成独立的小块，每一个小块就是一个组件，这些组件之间可通过组合，嵌套构成整个界面。

特征：

JSX语法
单向数据流
虚拟DOM
声明式编程
组件化

#### 什么是JSX

JSX 是一种 JavaScript 的语法扩展，首先在 React 中被进入，其格式比较像是模版语言，但事实上完全是在 JavaScript 内部实现的。元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素。React 主要使用 JSX 来描述用户界面，但 React 并不强制要求使用 JSX  [1] ，而 JSX 也在 React 之外的框架得到了广泛的支持，包括 Vue.js ，Solid 等。
简单理解：

JSX 就是 React 用来描述用户界面的一个模版，在这个模版里面既可以写 JS 又可以写 HTML 标签。
又或者说 JSX 其实是 React.createElement 的语法糖。

#### 函数组件和类组件的区别

- 状态管理的不同

  在Hooks出来之前，函数组件为无状态组件，不能够管理组件状态，而类组件可以通过state来管理，通过setState来进行修改。在Hooks出来之后，函数组件可以通过useStete来管理状态。

- 生命周期的不同

  函数式组件不存在生命周期，因为生命周期钩子函数都继承于React.Cpmponent。若需要使用生命周期，则改为使用类组件。但函数式组件可以通过useEffect来模拟生命周期的作用

#### 说说对受控组件和非受控组件的理解？场景？

受控组件：
接受控制的组件，组件的状态全程相应外部数据的传入。

非受控组件：
不接受控制的组件，一般情况下，只有在初始化的时候接受外部数据，再储存为自身状态。


应用场景：

受控组件：表单输入、复选框、单选框等需要实时更新UI的组件，以及需要对用户输入进行验证和处理的场景。

非受控组件：需要直接操作DOM元素的场景，比如使用第三方库或原生JavaScript来处理用户输入的组件，或者一些不需要实时更新UI的组件。


#### 说说React中的setState执行机制？
在使用setState更新数据时，更新类型分为异步更新、同步更新
异步更新

在react合成事件内同步执行的setState是异步的，如onClick等

React控制的事件处理： 当setState在React的生命周期方法或事件处理函数中被调用时，React会将多个setState调用批处理为一个更新，它们会在事件处理结束后一起被应用，并且可能会导致只有一次重新渲染。
React Hook： 使用useState hook中的更新函数时，同样也是React控制调度的，与setState有类似的表现。

同步更新
在宏任务：setTimeout，微任务：.then ，或直接在DOM元素上绑定的事件内是同步的。

setTimeout 或 setInterval 回调：当在这些函数中调用setState()时，状态更新和重渲染通常会在调用它们的下一行代码之前完成。
原生事件处理：如果你在React组件中绑定了原生事件（使用 addEventListener 方式）并在事件回调中调用setState()，React无法控制该事件处理中的状态更新，因此状态更新通常会同步发生。
异步代码：在Promise、async/await、或者其他异步API的回调中调用setState()，会导致立即更新状态并重新渲染，因为React无法控制这些情况下的状态更新和调度。

#### 说说Real DOM和Virtual DOM的区别

Real DOM：真实的DOM

Virtual DOM：虚拟DOM，指的是React等框架中的一种抽象表示，它是一个轻量级的JavaScript对象，用于表示DOM树的结构和内容。

区别：虚拟 DOM 不会进行排版与重绘操作，而真实 DOM 会频繁重排与重绘

优缺点
Real DOM 优点：易用

Real DOM 缺点：

效率低，解析速度慢，内存占用量过高性能差；
频繁操作真实 DOM，易于导致重绘与回流

Virtual DOM 优点：

简单方便:如果使用手动操作真实D0M来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难

性能方面:使用 Virtual DOM，能够有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流提高性能

跨平台:React借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行

Virtual DOM 缺点：

在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化
首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢


#### 说说React的JSX转换成真实DOM的过程？

- 使用React.createElement或JSX编写React组件，实际上所有的JSX 代码最后都会转换成React.createElement(...)，Babel帮助我们完成了这个转换的过程。
- createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象。
- ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM。

#### 说说对Fiber架构的理解？解决了什么问题？
Fiber架构是React 16中引入的新的协调引擎，它重新实现了React的核心算法。这个协调引擎负责渲染界面和计算组件变化。Fiber架构的主要目标是增强React在渲染大型应用和执行动画、手势等交互动作时的性能表现。

**理解Fiber架构**

- 任务可中断: Fibe 架构的核心特性是其工作单元的'单位任务'可以中断和恢复。即React可以按需暂停渲染更新工作，去执行更高优先级的任务，然后再返回继续之前的渲染工作。
- 增量渲染: Fiber为React提供了增量渲染的能力，即将渲染任务拆分成一系列小的工作单元，每个工作单元完成时React可以暂停处理任务，检查是否有更高优先级的工作需要完成。
- 任务优先级: Fiber允许React根据任务的类型和上下文为不同的更新设置不同的优先级。例如，动画或用户交互的更新会比其他类型的状态更新有更高的优先级。
- 更好的生命周期管理: Fiber引入了新的生命周期方法，并更新了某些旧的生命周期方法来更好地适应异步渲染。

**解决的问题**

- 避免阻塞: 在老的React版本中，正在执行的更新过程不能被中断，这会导致应用在处理大量的UI更新时出现卡顿，影响用户交互。Fiber通过使渲染任务可中断并进行任务切片来解决此问题。
- 改善动画和交互性能: 由于可以中断渲染任务，Fiber可以确保关键的用户交互和动画在需要时可以得到及时处理，从而提供更流畅的用户体验。
- 优先级调度: 在大型应用中，有些更新操作比其他操作更为紧急，Fiber通过任务优先级确保更重要的更新可以优先执行，对比之前的处理方式，这大大改善了应用的响应性能。
- 更稳健的错误处理: Fiber架构引入了错误边界（Error Boundaries），它允许组件捕获并处理子组件树中的JavaScript错误，防止整个应用崩溃。

总而言之，Fiber架构让React变得更加强大和灵活，它通过任务的可中断性和优先级调度，使得React更好地适应复杂应用的渲染需求，提供了更流畅的用户体验，并允许React开发者有更细粒度的控制组件的渲染行为。

#### React中key值有什么作用？

react也存在Diff算法，key值的存在就是用于判断元素是创建还是移动，从而减少不必要的渲染。因此key的值需要为每一个元素赋予一个确定的值。良好的key属性是优化的非常关键的一步，使用时的注意事项为：

- key应该是唯一的
- key不能使用随机数，随机数会在每次render时，重新生成一个数字
- 不能使用index作为key值，对性能没有作用

#### 说说React中diff的原理是什么？

react中diff算法遵循三个层级策略：

- tree层级

  DOM节点跨层级的操作不做优化，只会对相同层级的节点进行比较只有创建、删除操作，没有移动。

- component层级

  如果是相同类组件，则会继续向下diff运算，如果不是同一个类组件，那么直接删除这个组件下所有节点，创建新的。

- element层级

  对于比较同一层级的节点们，每个节点会在对应层级用唯一的key值作为唯一标识。element层级提供了 3 种节点操作：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）、REMOVE_NO DE（删除）。

#### 说说对React Hooks的理解?解决了什么问题?

Hook是react 16.8的新特征，可在不写class类组件的情况下，使用state以及其他react类组件的特征。解决了函数组件中无法使用状态和副作用的问题，让函数组件具有了更多类组件的特性，同时也让代码更加简洁、可读性更强、逻辑更加清晰。常见的hook如useState、useEffect等。

hooks能够更容易解决状态相关的重用问题：

- 每调用useHook一次都会生成一份独立的状态
- 通过自定义hook能够更好的封装我们的功能

编写 hooks 为函数式编程，每个功能都包裹在函数中，整体风格更清爽，更优雅hooks的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用hooks 能够解决大多数问题，并且还拥有代码复用机制。

#### 24、说说你是如何提高组件的渲染效率的？在React中如何避免不必要的render？

提高渲染效率可以使用以下方式：

- 使用shouldComponentUpdate： 确定是否可以跳过重新渲染；
- 使用PureComponent： 当 props 和 state 与之前保持一致时会跳过重新渲染；
- 使用React.memo或者useMemo来对组件进行缓存；
- 优化state和props： 尽量减少组件的state和props，只保留必要的部分。对于大型对象或数组，尽量使用不可变数据结构，或者提供一个新的对象或数组，而不是直接修改原对象或数组。这样可以避免不必要的渲染，因为React会使用浅比较来检查props和state是否发生了变化;
- 使用列表的键（key）： 当渲染列表时，确保每个列表项都有一个唯一的key。这样，React就可以准确地识别哪些项发生了变化，哪些项没有变化，从而避免不必要的渲染。
- 使用React.lazy和Suspense懒加载组件： 如果你的应用有很多大型组件，或者有一些只在特定条件下才需要的组件，你可以使用React.lazy和Suspense进行代码拆分。这样，只有当需要渲染这些组件时，才会加载它们的代码，从而减少了初始加载时间，并提高了渲染效率。
- 拆分组件：  将大型组件拆分为多个小型组件，可以提高渲染效率。 因为当父组件的状态或props发生变化时，只有与这些状态或props相关的子组件才会重新渲染，而其他子组件则不会受到影响。
- 使用context和hooks管理状态： 避免在组件树中通过props逐层传递状态，而是使用React的context和hooks来管理状态。这样，你可以将状态存储在更高级别的组件中，并通过context和hooks在需要的地方访问它，从而减少了不必要的props传递和渲染。
- 避免使用内联函数： 使用内联函数，则每次调用render函数时都会创建一个新的函数实例。

#### 说说你对redux中间件的理解？常用的中间件有哪些？实现原理？

中间件(Middleware)是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务(功能)，衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的那么如果需要支持异步操作，或者支持错误处理、日志监控，这个过程就可以用上中间件Redux 中，中间件就是放在就是在 dispatch 过程，在分发 action 进行拦截处理。其本质上一个函数，对 store.dispatch 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
有很多优秀的 redux 中间件，如:

redux-thunk：用于异步操作。
redux-logger：用于日志记录

#### 讲讲React的hooks，有什么好处？有哪些常用的hooks？

- useState：用于在函数组件中管理状态。可以用于跟踪和更新组件的内部状态，例如表单输入、开关状态、计数器等。
- useEffect：用于处理副作用操作，例如数据获取、订阅事件、DOM操作等。可以在组件渲染后执行一些操作，也可以在组件卸载前进行清理操作。
- useContext：用于在组件之间共享数据。可以创建一个全局的上下文，并在组件树中的多个组件中访问和更新该上下文。
-useReducer：用于管理复杂的状态逻辑。可以用于替代useState，特别适用于具有复杂状态转换的组件，例如有限状态机、游戏状态等。
- useCallback：用于性能优化。可以缓存函数实例，以便在依赖项不变的情况下避免不必要的函数重新创建，提高组件的性能。
- useMemo：用于性能优化。可以缓存计算结果，以便在依赖项不变的情况下避免重复计算，提高组件的性能。
- useRef：用于在函数组件中保存可变值的引用。可以用于保存DOM元素的引用、保存上一次渲染的值等。

#### 讲讲React的useState和useRef？

虽然 useRef 和 useState 都可以存储值，但它们有不同的用途：
管理状态： useState 旨在管理组件内的状态。当状态更新时，它会触发重新渲染，确保 UI 反映最新值。

访问和操作 DOM： useRef 主要用于与 DOM 交互，例如访问输入值或关注元素。它允许我们存储对 DOM 节点的引用并检索它们的属性，而无需触发重新渲染。
跨渲染保留值： useRef 在组件渲染之间维护相同的值，而 useState 在每次渲染期间初始化状态。

重新渲染行为：更新 useState 返回的值会导致组件重新渲染，同时更新使用 useRef 的 current 属性 不会触发重新渲染。

#### Hooks相对Class的优化？

- 简洁性： 使用 Hooks 可以使组件逻辑更加清晰和简洁。你可以将相关的逻辑拆分成多个独立的函数，而不必担心 Class 组件中的生命周期方法和状态管理会使代码变得复杂。
- 复用性： Hooks 可以促进逻辑的重用。你可以编写自定义的 Hook 来提取组件中共享的状态逻辑，然后在不同的组件中重用这些 Hook。这种方式比较灵活，可以更好地组织和管理代码。
- 性能优化： Hooks 可以帮助你更好地优化组件的性能。通过使用 useMemo、useCallback 等 Hook，可以避免不必要的渲染和函数重新创建，从而提高组件的性能。
- 逻辑复杂度： 对于复杂的逻辑，使用 Hooks 可以更容易地管理组件的状态和副作用。相比于 Class 组件中需要处理多个生命周期方法和可能导致状态分散的情况，Hooks 提供了更统一的方式来管理组件的状态和副作用。
- 减少样板代码： 使用 Hooks 可以减少组件中的样板代码。相比于 Class 组件中需要定义构造函数、绑定方法等，Hooks 提供了一种更简洁的方式来处理组件的逻辑。

#### setState 和 useState 的区别

- setState 是 Class 组件中用于更新状态的方法，而 useState 是函数组件中用于添加状态的 Hook。
- setState 可以传入对象或函数，并且可以在状态更新后执行回调函数，而useState 只能接收初始状态作为参数，并且每次返回一个更新状态的函数。
- 使用 useState 可以使函数组件更加简洁和易于理解，而且更符合函数式编程的思

#### React中React.Component 和 React.PureComponent的区别？

- 性能优化： React.PureComponent通过浅比较props和state来避免不必要的渲染，这可以提高组件的性能。如果组件的状态和属性在渲染之间没有变化，那么组件将不会重新渲染。
- 实现细节： React.PureComponent在内部实现了shouldComponentUpdate方法，而React.Component需要开发者自己实现或继承默认行为（总是返回true）。
- 使用场景： 当你确定组件的渲染结果只依赖于其props和state，并且这些props和state是可比较的（例如，基本类型或具有稳定引用的对象），那么使用React.PureComponent是一个好的选择。

#### redux遵循的三个原则是什么

- 单一数据源
- 状态是只读的
- 纯函数来执行修改

#### 列出redux组件？
- 在redux中，核心组件包括Action、Reducer、Store和Middleware。
Action是一个普通的JavaScript对象，用于描述发生了什么事件。它必须包含一个type属性，用于标识事件的类型。可以在Action中添加其他自定义的属性来传递数据。
- Reducer是一个纯函数，用于根据收到的Action来更新应用的状态（State）。它接收两个参数，当前的状态和收到的Action，然后返回一个新的状态。Reducer必须是纯函数，意味着给定相同的输入，它会始终返回相同的输出，而且不会有任何副作用。
- Store是用于存储应用状态的地方。它是Redux应用的唯一数据源，可以通过getState方法获取当前状态，通过dispatch方法触发Action，通过subscribe方法注册监听器来监听状态的变化。
- Middleware允许在dispatch一个Action到达reducer之前，对Action进行一些处理。它可以用来处理异步操作、日志记录、错误处理等。Middleware是通过包装store的dispatch方法来实现的。

Reducer的作用是根据收到的Action来更新应用的状态。它根据当前的状态和收到的Action返回一个新的状态。Reducer将多个小的reducer函数组合成一个根reducer函数，来管理整个应用的状态。每个reducer函数负责管理应用状态的一部分，然后根reducer将这些部分的状态合并成一个完整的应用状态。

#### 数据如何通过redux流动？
- Action 触发：
应用中的某个组件（如UI组件、网络请求、定时器等）触发一个 action。Action 是一个普通的 JavaScript 对象，必须包含一个 type 字段来描述动作类型，可以携带额外的数据作为 payload。

- Action 到达 Reducer：
Action 被传递到 Reducer。Reducer 是一个纯函数，它接收之前的状态和当前的 action，并根据 action 的类型来生成新的状态。

- State 更新：
Reducer 生成的新状态被存储在 Store 中，替换之前的旧状态。这个新的状态会被整个应用共享，成为新的“单一数据源”。

- Store 通知订阅者：
Store 发送通知给所有订阅了它的组件或监听器，告知状态发生了变化。

- 组件重新渲染：
订阅了 Store 的组件会收到状态变化的通知，从而重新渲染并展示最新的状态。这保证了应用的视图与数据保持同步。

    这个数据流程是单向的：Action 触发状态变化，Reducer 处理状态更新，Store 存储和通知，组件重新渲染。这种单向数据流的设计使得 Redux 应用具有可预测性、可维护性和可扩展性。


#### redux与mobx的区别？

Redux 和 MobX 都是用于管理应用状态的 JavaScript 库，但它们在设计理念和使用方式上有一些不同之处。


设计理念：

Redux 的设计理念是基于函数式编程的思想，它提倡使用不可变的数据结构来描述应用的状态变化，并通过纯函数来处理状态的修改和更新。
MobX 则更加倾向于面向对象的编程范式，它允许你定义可观察的状态对象，并在需要时直接修改这些对象，然后 MobX 会自动追踪状态变化并触发相关的更新。

数据流管理：

在 Redux 中，应用的状态被统一管理在一个单一的 Store 中，通过派发 Action 来触发状态的修改，然后通过纯函数的方式来处理 Action，最终更新 Store 中的状态。
而在 MobX 中，状态是分散存储在各个可观察的对象中的，当对象的状态发生改变时，相关的观察者会被自动通知并执行相应的更新。

使用方式：

Redux 更加显式和规范，需要定义 Action、Reducer、Store 等概念，并且通常需要使用中间件来处理异步操作。
MobX 则更加简单直观，只需要定义可观察的状态对象，并在需要时直接修改状态即可，不需要定义额外的概念或中间件。


性能：

Redux 的状态更新是通过纯函数来处理的，每次状态更新都会产生新的状态对象，因此需要进行深比较来判断是否需要重新渲染组件，可能会影响性能。
MobX 则采用了更加智能的方式来追踪状态变化，只会重新渲染受影响的组件，因此在某些情况下可能会更加高效。
