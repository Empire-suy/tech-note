### React

#### 浏览器原理

DOM Tree 文档对象模型，基本单位是node节点

Render Tree，最小单位是RenderObject

Layout

- 全局layout【字号改变，窗口Resize】
- 增量layout

绘制Painting

CSS2渲染顺序：背景色 背景图 border children outline

渲染引擎是单线程的，浏览器的主线程，网络操作由几个并行线程执行，并行链接个数是受限制的（通常是2-6个）

#### 标签属性限制

类组件

```js
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.production.min.js"></script>
  <script src="../lib/prop-types.js"></script>
  <script src="../lib/babel.js"></script>
  <script type="text/babel">
    class Person extends React.Component {
      constructor(props) {
        super(props)
      }

      static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        gender: PropTypes.string
      }

      static defaultProps = {
        age: 23,
        gender: '男'
      }
      
      render() {
        let {name, age, gender} = this.props;
        console.log('name', name)
        return (
          <ul>
            <li>姓名：{name}</li>
            <li>年龄：{age}</li>
            <li>性别: {gender}</li>
          </ul>
        )
      }
    }

    ReactDOM.render(<Person name="emire"/>, document.querySelector('#root'))
  </script>
</body>
</html>
```

函数组件

```js
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.production.min.js"></script>
  <script src="../lib/prop-types.js"></script>
  <script src="../lib/babel.js"></script>
  <script type="text/babel">
    function Person(props) {
      let {name, age, gender} = props;
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>年龄：{age}</li>
          <li>性别: {gender}</li>
        </ul>
      )
    }

    Person.propTypes = {
      name: PropTypes.string.isRequired,
      age: PropTypes.number,
      gender: PropTypes.string
    }

    Person.defaultProps = {
      age: 23,
      gender: '男'
    }
    
    ReactDOM.render(<Person name="emire"/>, document.querySelector('#root'))
  </script>
</body>
</html>

```

#### JSX语法

小写自动转换成html标签

小驼峰 =>  获取组件

表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

```jsx
// webpack配置
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D
module: {
    rules: [
        {
            test: /\.jsx$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/react']
            }
        }
    ]
}

// jsx
import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
    render() {
        return (
        	<ul>
            	<li></li>
            </ul>
        )
    }
}

render(<App />, document.querySelector('#app'));
```

#### refs

```js
// 字符串形式的不建议使用[效率比较低]

// 回调函数
// 回调函数有一个参数，为当前的元素节点 内联函数数据更新的时候会调用两次，第一次会传入一个null，第二次传入当前的节点对象
class Demo extends React.Component {
    showData = () => {
        console.log(this.input1.value)
    }

    render() {
        return (
            <div>
                <input ref={current => this.input1 = current} type="text"/>
                <button onClick={this.showData}>获取左侧的数据</button>
            </div>
            )
	}
}

ReactDOM.render(<Demo/>, document.querySelector('#root'))


// 解决重复渲染的问题，使用类绑定的方法
class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHot: true
        }
    }

    showData = () => {
        console.log(this.input1.value)
    }

    createInputRef = c => {
        console.log('!', c)
        this.input1 = c
    }

    render() {
        return (
            <div>
                <input ref={this.createInputRef} type="text"/>
                <button onClick={this.showData}>获取左侧的数据</button>
                <hr/>
                <button onClick={() => this.setState({isHot: !this.state.isHot})}>切换天气</button>
				<div>{this.state.isHot ? '炎热' : '凉爽'}</div>
			</div>
		)
	}
}

ReactDOM.render(<Demo/>, document.querySelector('#root'))


// React.creatRef
class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHot: true
        }
    }

    showData = () => {
        console.log(this.iptRef.current)     // 获取的时候需要.current获取当前的元素
    }

    iptRef = React.createRef() // 只能被一个地方使用[后面的会替换前面的]

    render() {
        return (
            <div>
                <input ref={this.iptRef} type="text"/>
                <button onClick={this.showData}>获取左侧的数据</button>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, document.querySelector('#root'))
```

#### 收集表单数据

```js
class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }

    saveFormData = dataType => {
        return event => {
            this.setState({[dataType]: event.target.value})
        }
    }

    // saveFormData = dataType => {
    //   return event => {
    //     this.setState({[dataType]: event.target.value})
    //   }
    // }

    saveFormData = (dataType, event) => {
        this.setState({[dataType]: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/*<input type="text" onChange={this.saveFormData('uname')} />
                <input type="password" onChange={this.saveFormData('pwd')} />*/}
                <input type="text" onChange={event => this.saveFormData('uname', event)}/>
                <input type="password" onChange={event => this.saveFormData('pwd', event)}/>
                <button>登录</button>
			</form>
		)
	}
}

ReactDOM.render(<Demo/>, document.querySelector('#root'))


// 高阶函数
如果一个函数符合下面2个规范中的任何一个, 那该函数就是高阶函数
	1.若A函数，接受的参数是一个函数，那么A就可以称之为高阶函数
    2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数
```

#### 虚拟DOM四类属性

**自定义属性**

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

let data = ['优酷', '腾讯', '爱奇艺'];

class Demo extends Component {
  createList() {
    return data.map((item, index) => <li key={index}>{item}</li>)
  }
  get msg() {
    return '<h1>hello world</h1>'
  }
  render() {
    return (
      <div>
        {/* 自定义属性 使用data-*进行标记 */}
        <div data-title="title"></div>
        {/* 元素属性 使用驼峰命名法, 像素单位可以省略，外面括号表示插值方法 里面是一个对象 */}
        {/* 只能在组件外部修改，不能在组件内部修改 */}
        <div style={{ backgroundColor: 'green' }}></div>
        {/* 特殊元素属性 [class, for] */}
        <div className="active"></div>
        <label htmlFor="username">label</label>
        <input id="username" />
        {/* 非元素属性 React拓展的 eg：ref,dangerouslySetInnerHTML, key */}
        {/* ref, dangerouslySetInnerHTML 跳过虚拟DOM，无法检测变化 */}
        {/* key 唯一、稳定、可预测 */}
        <div ref="ref"></div>
        <div dangerouslySetInnerHTML={{ __html: this.msg }}></div>
        <ul>
          {this.createList()}
        </ul>
      </div>
    )
  }
};

// 静态数据 外部打点添加
Demo.color = 'red';
Demo.getColor = function () {
  return this.color;
}
console.log(Demo.color, Demo.getColor())

render(<Demo></Demo>, app5);

```

**属性数据**

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'

let data = ['优酷', '腾讯', '爱奇艺'];

class Demo extends Component {
  // 2 静态数据 通过static定义
  static get num() {
    return 100;
  }
  static getNum() {
    return this.num
  }
  createList() {
    return data.map((item, index) => <li key={index}>{item}</li>)
  }
  render() {
    return (
      <ul>
        {this.createList()}
      </ul>
    )
  }
};

console.log(Demo.num, Demo.getNum())

// 1. 静态数据 外部打点添加
Demo.color = 'red';
Demo.getColor = function () {
  return this.color;
}

// 默认数据
Demo.defaultProps = {
  data: ['传递']
}

Demo.propTypes = {
  data: PropTypes.array
  // 添加属性约束条件 propTypes 需要安装 prop-types
  // data: PropTypes.array [需要传入数组数据类型]
  // data: PropTypes.array.isRequired [不能传入默认数据类型]
}

render(<Demo></Demo>, app5);

```

#### 事件

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

class Demo extends Component {
  constructor() {
    super();
    // 1.使用构造函数进行绑定，数据绑定之后无法修改
    this.clickEvent1 = this.clickEvent1.bind(this, 100, 200);
  }
  clickEvent() {
    console.log('clickEvent');
  }
  clickEvent1() {
    console.log(arguments)
  }
  get num() {
    return 100
  }
  render() {
    return (
      <div>
        {/* 这两种写法有区别 使用下面的写法，但是后期的版本使用的时文本节点绑定的方式进行绑定 */}
        <div>销量{this.num}</div>
        <div>{'销量' + this.num}</div>
        <button onClick={this.clickEvent}>点击事件</button>
        {/* 2.绑定事件的时候使用bind进行绑定[不推荐使用] */}
        <button onClick={this.clickEvent1.bind(this, 100, 200)}>点击事件</button>
        <button onClick={this.clickEvent1.bind(this, 100, false)}>点击事件</button>
        {/* 3.通过箭头函数进行绑定[传参顺序可以自定义, 推荐使用] */}
        <button onClick={e => this.clickEvent2(e, 100, false)}>点击事件</button>
        <button onClick={e => this.clickEvent2(e, 0, true)}>点击事件</button>
      </div>
    )
  }
}

render(<Demo></Demo>, app)

```

无状态组件【可以简写成函数组件】

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

/*
class Demo extends Component {
    createList() {
        return this.props.data.map((item, index) => <li key={index}>{item}</li>)
    }
    render() {
		return (
        	<ul>{this.createList()}</ul>
        )
    }
}
*/

let Demo = props => props.data.map((item, index) => <li key={index}>{item}</li>)
    
render(<Demo data={['苹果', '西瓜']}></Demo>, app);
```

有状态组件

获取属性：this.props 

获取状态：this.state

修改状态：this.setState

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

class Demo extends Component {
  constructor(props) {
    super(props);
    console.log(props.num);
    console.log(props === this.props); // true
    this.state = {
      color: 'red',
      num: props.num
    }
    // 不能直接修改状态属性 使用setState
    this.setState({key: value})
  }

  render() {
    return (
      <div>
        <h2>app6</h2>
        <p>{this.props.num}</p>
      </div>
    )
  }
}

render(<Demo num={100}></Demo>, app6);

```

**有状态组件示例**

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.state = {
      page: 0
    }
  }
  creatEle() {
    return this.props.data[this.state.page].map((item, index) => <li key={index}>{item}</li>)
  }
  changePage() {
    this.setState({page: (this.state.page + 1) % this.props.data.length ? this.state.page + 1 : 0})
    this.creatEle()
  }
  render() {
    return (
      <div>
        <button onClick={this.changePage}>换一换</button>
        <ul>{this.creatEle()}</ul>
      </div>
    )
  }
}

render(<App data={[
  [
    '1导游威胁游客不消费会影响征信热477万',
    '2广东首现新冠病毒尼日利亚突变株新460万',
    '3袖珍演员创作皮影戏版唐宫夜宴444万',
    '4央视曝光不文明游客抓海鸥拍照428万',
    '5大风降温沙尘将齐袭北方413万',
    '6英媒:梅根考虑2024年竞选美国总统399万',
    '7十大房价最低城市:一半在东北371万',
    '8武汉雷神山医院封舱后首次开放358万',
    '9陕西6岁男童遇害前轨迹334万',
    '10希腊称帕特农雕塑非英国合法获得311万'
  ],
  [
    '11中国结婚登记人数7年连降300万',
    '12女员工怀孕生子休80天假被开除289万',
    '13大兴机场通报旅客抛置物架新279万',
    '1472岁厅官退休11年被查269万',
    '15苹果新专利可扩大电池容量260万',
    '16两地出现复阳病例为何本土零新增?251万',
    '17燕郊落户放开?三河:落户房得是住宅242万',
    '18特朗普现身海湖庄园筹款活动234万',
    '19东京奥运会有可能零观众225万',
    '20上海海港宣布三人加盟217万',
  ],
  [
    '21学生分析火箭失利收到科学家回信210万',
    '22水军刷分控评 豆瓣评分还可信吗?202万',
    '23王子文说自己确实有个小孩195万',
    '24女子送男友40万礼物法官灵魂拷问189万',
    '25加拿大法院拒收孟晚舟方提交新证据182万',
    '26军事专家详解2021年度中国国防费176万',
    '27郑州准新人半夜两点起来排队领证169万'
  ]
]}></App>, app7)
```

#### 组件通信

- 父组件向子组件通信

  传递变量、属性数据、状态数据，方法

  组件之间传递方法的时候可以通过bind进行this的指向，如果父组件中没有使用bind修改this的指向，子组件使用bind绑定了this则方法this指向绑定的元素，如果父子组件同时绑定了this则指向父组件的this。直接使用箭头函数可以把this传入

- 子组件向父组件通信

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom'

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }
  render() {
    return (
      <div>
        <h1>输入：{this.state.msg}</h1>
        <Child mc={val => this.setState({msg: val})}></Child>
      </div>
    )
  }
}

class Child extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={e => this.props.mc(e.target.value)}/>
      </div>
    )
  }
}

render(<Parent></Parent>, app2)

```

- 兄弟组件之间的通信

子组件        <=>        父组件        <=>        子组件

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'

class Parent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: ''
    }
  }
  render() {
    return (
      <div>
        <div>parent</div>
        <Child method={v => this.setState({msg: v})}></Child>
        <Brother msg={this.state.msg}></Brother>
      </div>
    )
  }
}

class Child extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h2>Child</h2>
        <input type="text" onChange={e => this.props.method(e.target.value)}/>
      </div>
    )
  }
}

class Brother extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h2>Brother</h2>
        <p>msg: {this.props.msg}</p>
      </div>
    )
  }
}

render(<Parent></Parent>, document.querySelector('#app5'))
```

#### Provider / Consumer

```jsx
import React, { Component, createContext } from 'react'
import { render } from 'react-dom'

const dataContext = createContext({
  theme: 'red',
  lang: 'English'
})

let { Provider, Consumer } = dataContext;

class Root extends Component {
  render() {
    return (
      <div>
        <h2 style={{color: this.context.theme}}>根组件  {this.context.lang}</h2>
        <Provider value={({theme: 'yellow', lang: '中文'})}>
          <Child></Child>
        </Provider>
        <Brother></Brother>
      </div>
    )
  }
}

Root.contextType = dataContext

class Child extends Component {
  render() {
    let {theme, lang} = this.context;
    return (
      <div>
        <h2 style={{color: theme}}>Child  {lang}</h2>
        <Demo></Demo>
      </div>
    )
  }
}

Child.contextType = dataContext

class Demo extends Component {
  render() {
    let {theme, lang} = this.context;
    return (
      <div>
        <h2 style={{color: theme}}>Demo  {lang}</h2>
      </div>
    )
  }
}

Demo.contextType = dataContext

const Brother = props => <Consumer>{({theme, lang}) => (
  <div>
    <h2 style={{color: theme}}>Brother  {lang}</h2>
  </div>
)}</Consumer>


render(<Root/>, document.querySelector('#app6'))
```

### 生命周期

ReactDOM.unmountComponentAtNode(container)【卸载】

#### 创建期

- getDefaultProps：定义组件默认数据 defaultProps静态属性，组件尚未创建，属性值就是默认的属性数据
- getInitialState：构造函数初始化状态数据，属性数据，上下文数据，不传递props和context，this.props不等于props，this.context不等于context
- componentWillMount：组件已经有了属性数据，状态数据和上下文数据，但是不能获取虚拟DOM【可以在这个阶段发送请求，初始化插件】
- render：渲染虚拟DOM，不要在这个方法中事先业务逻辑，不能访问真实DOM
- componentDidMount：组件构建完成，已经有了属性数据，状态数据和上下文数据及虚拟DOM，这个方法中，绑定事件，发送请求、使用插件，后面4个方法this指向组件，后三个方法没有参数

#### 存在期

- componentWillReceiveProps：即将接受新的属性数据 第一个参数表示新的数据
- shouldComponentUpdate：组件是否更新，第一个参数表示新的属性数据，第二个参数表示新的状态数据，this上的数据还是旧的，必须要有返回值。True表示更新，False表示不更新，通常在这个阶段判断是否需要更新
- componentWillUpdate：组件即将更新，第一个参数表示新的属性数据，第二参数表示新的状态数据，this上的还是旧的数据
- render：渲染虚拟DOM，this上的数据已经是新的了
- componentDidUpdate：第一个参数表示旧的属性数据，第二个参数表示旧的状态数据，this上的数据已经是新的数据

属性数据、状态数据和上下文数据改变，组件会更新

如果希望在组件中，维护的数据发生改变的时候组件不更新，定义这类数据，有两种方式

- 将数据存储在组件的实例上
- 将数据存储在组件的原型上

#### 销毁期

componentWillUnmount：最后一次访问数据

侵入式类库：操作虚拟DOM对应的真实DOM【react跟踪不到】

非侵入式类库：没有操作虚拟DOM对应的真实DOM



#### 旧版本的生命周期

```js
1.初始化阶段：由ReactDOM.render()触发[初次渲染]
	1.constructor
    2.componentWillMount
    3.render()
    4.componentDidMount
    	一般这个钩子中做一些初始化的事
2.更新阶段：有组件内部this.setState()或父组件重新render触发
	1.shouldComponentUpdate
    2.componentWillUpdate()
	3.render()
	4.componentDidUpdate
3.卸载组件：由ReactDOM.unmountComponentAtNode触发
	1.componentWillUnmount
    	一般做一些收尾的事
```

#### 新版本的生命周期

```js
1.初始化阶段：由ReactDOM.render()触发[初次渲染]
	1.constructor
    2.getDerivedStateFromProps
    3.render()
    4.componentDidMount
    	一般这个钩子中做一些初始化的事
2.更新阶段：有组件内部this.setState()或父组件重新render触发
	1.getDerivedStateFromProps
    2.shouldComponentUpdate()
	3.render()
	4.getSnapshotBeforeUpdate
    5.componentDidUpdate
3.卸载组件：由ReactDOM.unmountComponentAtNode触发
	1.componentWillUnmount
    	一般做一些收尾的事
```

#### 混合

两步

- 定义混合类，继承组件基类（component）
- 定义自己的类继承混合类

#### Diffing 算法

类型相同的两个元素（组件），我们认为是同一个，通过key，props决定虚拟DOM或组件是否应该更新

比较顺序：根元素类型 => 元素属性 => 元素样式 => 组件属性 => 比较列表

不会尝试不同组件类型的子树，在不同类型的组件中切换，建议把内容改成同一类型

key要稳定，可预测，列表中唯一的特征



虚拟DOM中key的作用

当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】，随后react进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，规则如下

- 旧虚拟DOM中找到了与新虚拟DOM相同的key
  - 若虚拟DOM中内容没变，直接使用之前的真实DOM
  - 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM
- 旧虚拟DOM中未找到与新虚拟DOM相同的key
  - 根据数据创建新的真实DOM，随后渲染到页面

用index作为key可能会引发的问题

- 若对数据进行逆序添加、删除等破坏顺序操作会产生没有必要的真实DOM更新【界面效果没问题，但效率低】
- 如果结构中还包含输入类的DOM，会产生错误DOM更新【界面有问题】
- 如果不存在数据的逆序添加、删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题



#### 高阶语法

##### PureComponent

类似shouldComponentUpdate

只对类组件生效，对函数组件无效。

只对数据做浅层的比较，不做深层的比较，深层比较使用原来的shouldComponentUpdate

```jsx
import * as React from 'react'

export default class ToTop extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShow: 'none'
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', e => {
      if (scrollY > 200) {
        this.setState({isShow: ''})
      } else {
        this.setState({isShow: 'none'})
      }
    })
  }
  componentDidUpdate() {
    console.log('did update')
  }
  render() {
    let { isShow } = this.state
    return (
      <div style={{
        position: 'fixed',
        right: '20px',
        bottom: '100px',
        width: '60px',
        height: '40px',
        lineHeight: '40px',
        backgroundColor: 'pink',
        textAlign: 'center',
        fontSize: '14px',
        color: '#fff',
        cursor: 'pointer',
        display: isShow
      }}>返回顶部</div>
    )
  }
}

```

##### memo 

只能处理函数组件

返回值是一个新的组件，原来的组件不受影响，返回的新组件才能被优化。

用法：

```
memo(Comp, (currentProps, nextProps) => {})
返回值：true表示不更新，false表示更新
```

```jsx
// 无效
import * as React from 'react'

export default class ToTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: 'none'
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', e => {
      if (scrollY > 200) {
        this.setState({isShow: ''})
      } else {
        this.setState({isShow: 'none'})
      }
    })
  }
  componentDidUpdate() {
    console.log('did update')
  }
  render() {
    let { isShow } = this.state
    return (
      <div>
        <NewDemo isShow={isShow}></NewDemo>
      </div>
    )
  }
}

const Demo = props => {
  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      bottom: '100px',
      width: '60px',
      height: '40px',
      lineHeight: '40px',
      backgroundColor: 'pink',
      textAlign: 'center',
      fontSize: '14px',
      color: '#fff',
      cursor: 'pointer',
      display: props.isShow
    }}>返回顶部</div>
  ) 
}

const NewDemo = React.memo(Demo, function(prev, next) {
  console.log(...arguments);
  return prev.isShow == next.isShow
})
```

##### cloneElement

```jsx
import * as React from 'react'
import * as ReactDom from 'react-dom'

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { title, desc } = this.props
    return (
      <div>
        <h1>{title}</h1>
        <div>{desc}</div>
      </div>
    )
  }
}

Child.defaultProps = {
  title: 'Title',
  desc: 'Description'
}

class App7 extends React.Component {
  render() {
    const son = <Child/>
    return (
      <div>
        {React.cloneElement(<Child/>, {title: 'React cloneElement', desc: '以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。'})}
        <son.type {...{title: 'React cloneElement', desc: 'React.cloneElement() 几乎等同于： <element.type {...element.props} {...props}>{children}</element.type>'}}></son.type>
      </div>
    )
  }
}

ReactDom.render(<App7/>, document.querySelector('#app7'))
```

##### Fragment

`React.Fragment` 组件能够在不额外创建 DOM 元素的情况下，让 `render()` 方法中返回多个元素。

```jsx
import * as React from 'react'
import * as ReactDom from 'react-dom'

// 创建tr元素
class Tr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      data: props.data
    }
  }
  createRows() {
    return this.state.data.map(item => <React.Fragment key={item}>
      <tr>
        <Td data={item}></Td>
      </tr>
    </React.Fragment>)
  }
  render() {
    return this.createRows()
  }
}

// 创建td元素
class Td extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  createTds() {
    return this.state.data.map(item => <React.Fragment key={Date.now() + Math.random()}>
      <td>{item}</td>
    </React.Fragment>)
  }
  render() {
    return this.createTds()
  }
}

// 创建th
class Th extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  createTh() {
    return this.state.data.map(item => <React.Fragment key={item}>
      <th>{item}</th>
    </React.Fragment>)
  }
  render() {
    return this.createTh()
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: ['Mar 2021', 'Mar 2020', 'Programming Language', 'Ratings', 'Change'],
      data: [
        [1, 2, 'C', '15.33%',	'-1.00%'],
        [2, 1, 'Java', '10.45%',	'-7.33%'],
        [3, 3, 'Python', '10.31%',	'+0.20%'],
        [4, 4, 'C++', '6.52%',	'-0.27%'],
        [5, 5, 'C#', '4.97%',	'-0.35%'],
      ]
    }
  }
  render() {
    let {headers, data} = this.state
    return <div>
      <table>
        <thead>
          <tr>
            <Th data={headers}></Th>
          </tr>
        </thead>
        <tbody>
          <Tr data={data}></Tr>
        </tbody>
      </table>
    </div>
  }
}

ReactDom.render(<App/>, document.querySelector('#app9'))
```

##### 错误边界组件

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

```jsx
import * as React from 'react'
import * as ReactDom from 'react-dom'

class Demo extends React.Component {
  render() {
    // return <h1 style={{color: 'red'}}>此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state</h1>
    return <h1 style='color: red'>此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state</h1>
  }
}

class Errors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }
  render() {
    if (this.state.hasError) {
      return <h1>hasError</h1>
    }
    return <Demo/>
  }
}

ReactDom.render(<Errors/>, document.querySelector('#app10'))

```

##### componentDidCatch

阻止错误冒泡

```jsx
import * as React from 'react'
import * as ReactDom from 'react-dom'

class Demo extends React.Component {
  render() {
    // return <h1 style={{color: 'red'}}>此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state</h1>
    return <h1 style='color: red'>此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state</h1>
  }
}

class Errors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error, info) {
    console.log('=======================')
    console.log(error, info)
    console.log('=======================')
    this.setState({hasError: true})
  }
  render() {
    if (this.state.hasError) {
      return <h1>hasError</h1>
    }
    return <Demo/>
  }
}

ReactDom.render(<Errors/>, document.querySelector('#app10'))
```

##### lazy

异步加载组件，需要配合Suspence使用

```jsx
import * as React from 'react'
import * as ReactDom from 'react-dom'

// 异步加载组件
const Demo = React.lazy(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(import('./01'))
    }, 2000)
  })
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      <React.Suspense fallback={<h1>加载中...</h1>}>
        <Demo title='02 jsx'/>
      </React.Suspense>
    </div>
  }
}

ReactDom.render(<App/>, document.querySelector('#app2'))

```

##### 组件的约束性

用户与组件的表单元素交互产生的数据，如果存在元素自身就是非约束性组件，如果存在组件状态中，该组件就是约束性组件

- 非约束性组件

  ```jsx
  import * as React from 'react'
  import * as ReactDom from 'react-dom'
  
  export default class App extends React.Component {
    constructor(props) {
      super(props)
      
      this.user = React.createRef()
      this.check = React.createRef()
    }
      
    // 获取数据
    getValue() {
      console.log('=======================')
      console.log(this);
      console.log(this.user.current.value)
      console.log(this.check.current.value)
      console.log('=======================')
    }
  
    // 设置数据
    setValue() {
      this.user.current.value += '-----'
      this.check.current.checked = !this.check.current.checked
    }
  
    render() {
      return <div>
        <input type="text" ref={this.user} defaultValue='请输入用户名'/>
        <br/>
        <input type="checkbox" ref={this.check} defaultChecked/> 保存密码
        <br/>
        <input type="button" value="获取数据" onClick={() => this.getValue()}/>
        <input type="button" value="修改数据" onClick={() => this.setValue()}/>
      </div>
    }
  }
  
  ReactDom.render(<App/>, document.querySelector('#app3'))
  ```

- 约束性组件【受控组件】

  ```jsx
  import * as React from 'react'
  import * as ReactDom from 'react-dom'
  
  export default class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '请输入用户名',
        checked: true
      }
    }
  
    changeUsername(e) {
      let username = e.target.value
      if (/^\w{1,10}$/.test(username)) {
        this.setState({username})   
      }
    }
  
    getValue() {
      console.log('=======================')
      console.log(this.state.username)
      console.log(this.state.checked)
      console.log('=======================')
    }
  
    setValue() {
      this.setState({
        username: '???',
        checked: false
      })
    }
    
    render() {
      let { username, checked } = this.state
      return <div>
        <form action="#">
          <input type="text" value={username} onChange={(e) => this.changeUsername(e)}/>
          <br/>
          <input type="checkbox" checked={checked} onChange={(e) => this.setState({checked: e.target.checked})}/> 保持登录
          <br/>
          <input type="button" value="获取数据" onClick={() => this.getValue()}/>
          <input type="button" value="设置数据" onClick={() => this.setValue()}/>
        </form>
      </div>
    }
  }
  
  ReactDom.render(<App/>, document.querySelector('#app4'))
  ```

  select 选框

  ```jsx
  import * as React from 'react'
  import { render } from 'react-dom'
  
  export default class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [
          {
            label: '苹果',
            value: 'apple'
          },
          {
            label: '三星',
            value: 'sansung'
          },
          {
            label: '华为',
            value: 'huawei'
          },
          {
            label: '一加',
            value: 'onePlus'
          }
        ],
        select: []
      }
    }
    changeValue(e) {
      let select = this.state.select
      let value = e.target.value
      let index = select.findIndex(item => item == value)
      if (index > -1) {
        select.splice(index, 1)
        this.setState({select})
      } else {
        this.setState({select: [...select, value]})
      }
  
    }
    createList() {
      return this.state.data.map(item => <option value={item.value} key={item.value}>{item.label}</option>)
    }
    render() {
      let { select } = this.state
      return <div>
        {/* 单选 */}
        {/* <select value={select} onChange={e => this.setState({select: e.target.value})}>{this.createList()}</select> */}
        {/* 多选 */}
        <select value={select} multiple onChange={e => this.changeValue(e)}>{this.createList()}</select>
      </div>
    }
  }
  
  render(<App/>, document.querySelector('#app5'))
  ```

#### 高阶组件 HOC

```jsx
import * as React from 'react'
import { render } from 'react-dom'

class Demo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {msg} = this.props
    return <div>Demo: {msg}</div>
  }
}

const hocFun = (Com) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }
    // 高阶组件特殊的函数
    componentDidUpdate() {
      console.log('=======================')
      console.log('component did update')
      console.log('=======================')
    }
    render() {
      return <Com {...this.props}/>
    }
  }
}

const NewHoc = hocFun(Demo)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.input = new React.createRef()
    this.state = {
      iptVal: ''
    }
  }
  render() {
    let { iptVal } = this.state
    return (<div>
      <hr/>
      <h1>App</h1>
      <input type="text" ref={this.input} value={iptVal} onChange={e => this.setState({iptVal: e.target.value})}/>
      <Demo msg={iptVal}></Demo>
      <NewHoc msg={iptVal}/>
      <hr/>
    </div>)
  }
}

render(<App/>, document.querySelector('#app6'))
```

#### ref转发

外部可以访问内部的组件的元素

createRef创建ref对象

一个ref只能指向一个虚拟DOM

```js
import * as React from 'react'
import { render } from 'react-dom'

const ref1 = React.createRef()

// 第一种
// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state  ={

//     }
//   }
//   render() {
//     console.log('=======================')
//     console.log('ref 转发');
//     console.log(this.props)
//     console.log('=======================')
//     return (
//       <div>
//         <h1 ref={this.props.ref1}>ref转发</h1>
//       </div>
//     )
//   }
// }

// render(<App ref1={ref1}></App>, document.querySelector('#app9'));

// 第二种
// const App = props => {
//   console.log('=======================')
//   console.log('函数型组件 ref')
//   console.log(props);
//   console.log('=======================')
//   return (
//     <div>
//       <h1 ref={props.ref1}>函数型组件 ref转发</h1>
//     </div>
//   )
// }

// render(<App ref1={ref1}/>, document.querySelector('#app9'))

// 第三种
const App = props => {
  console.log('=======================')
  console.log('函数型组件 ref')
  console.log(props);
  console.log('=======================')
  return (
    <div>
      <h1 ref={props.ref2}>函数型组件 ref转发</h1>
    </div>
  )
}

const RefCom = React.forwardRef((props, ref) => {
  return <App {...props} ref2={ref}></App>
});

render(<RefCom ref={ref1}/>, document.querySelector('#app9'))

```

#### hook

```jsx
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

let App = props => {
    let [num, addNum] = useState(0)
    useEffect(() => {
        console.log(num)
    })
    return (
        <div>
            <h1>num: {num}</h1>
            <button onClick={e => addNum(++num)}>增加</button>
        </div>
    )
}

render(<App/>, document.querySelector('#app13'))
```

#### 服务端渲染

```js
let express = require('express')
let ejs = require('ejs')

let React = require('react')
let {renderToString, renderToStaticMarkup} = require('react-dom/server')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 100
        }
    }

    addNum = () => {
        this.setState({num: this.state.num + 1})
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('h1', {className: 'demo'}, 'hello ickt'),
            React.createElement('button', {onClick: e => this.addNum(e)}, 'num: ' + this.state.num)

        )
    }
}

// console.log(renderToString(React.createElement(App)))
// console.log(renderToStaticMarkup(React.createElement(App)))  // 渲染静态页面

let app = express()

app.engine('.html', ejs.__express)

app.get('/', (req, res) => {
    res.render('index.html', {
        title: 'React 05',
        seo: `
            <meta name="keywords" content="爱创课堂" />
            <meta name="description" content="前端技术培训学校" />
        `,
        content: renderToStaticMarkup(React.createElement(App))
    })
})

app.listen(3000)
```

views/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <%-seo%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%=title%></title>
</head>
<body>
    <%-content%>
</body>
</html>
```

原生是写静态模板

```js
let express = require('express')
let ejs = require('ejs')

let React = require('react')
let {renderToString, renderToStaticMarkup} = require('react-dom/server')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 100
        }
    }

    addNum = () => {
        this.setState({num: this.state.num + 1})
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('h1', {className: 'demo'}, 'hello ickt'),
            React.createElement('button', {onClick: e => this.addNum(e)}, 'num: ' + this.state.num)

        )
    }
}

// console.log(renderToString(React.createElement(App)))
// console.log(renderToStaticMarkup(React.createElement(App)))  // 渲染静态页面

let app = express()

app.engine('.html', ejs.__express)

app.get('/', (req, res) => {
    let title = 'React 05'
    let seo  = `
        <meta name="keywords" content="爱创课堂" />
        <meta name="description" content="前端技术培训学校" />
    `
    let content = renderToStaticMarkup(React.createElement(App))

    res.write(`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${seo}
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            ${content}
        </body>
        </html>`)
    res.end()
})

app.listen(3000)
```

```js
let express = require('express')
let ejs = require('ejs')

let React = require('react')
let {renderToString, renderToStaticMarkup, renderToNodeStream, renderToStaticNodeStream} = require('react-dom/server')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 100
        }
    }

    addNum = () => {
        this.setState({num: this.state.num + 1})
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('h1', {className: 'demo'}, 'hello ickt'),
            React.createElement('button', {onClick: e => this.addNum(e)}, 'num: ' + this.state.num)

        )
    }
}

// console.log(renderToString(React.createElement(App)))
// console.log(renderToStaticMarkup(React.createElement(App)))  // 渲染静态页面

let app = express()

app.engine('.html', ejs.__express)

app.get('/', (req, res) => {
    let title = 'React 05'
    let seo  = `
        <meta name="keywords" content="爱创课堂" />
        <meta name="description" content="前端技术培训学校" />
    `
    res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">`)
    res.write(seo)
    res.write(`<meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>`)
    // let stream = renderToNodeStream(React.createElement(App))
    let stream = renderToStaticNodeStream(React.createElement(App))
    stream.pipe(res, {end: false}) // 异步方法
    stream.on('data', (data) => console.log(data.toString()))
    stream.on('end', () => {
        res.write(`</body>
            </html>`)
        res.end()
    })
})

app.listen(3000)
```

#### 观察者订阅者模式发布消息

```jsx
// utils.js
export const Observer = (function() {
    let _msg = {}

    return {
        // 订阅消息
        on(type, fn) {
            if (_msg[type]) {
                _msg[type].push(fn)
            } else {
                _msg[type] = [fn]
            }
        },
        // 发布消息
        trigger(type, ...args) {
            _msg[type] && _msg[type].forEach(fn => fn(...args))
        }
    }
})()


// main.js
import React from 'react'
import { render } from 'react-dom'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { Observer } from '../utils'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 100
        }
    }

    componentDidMount() {
        Observer.on('addNum', (num) => {
            this.setState({num: this.state.num + num})
        })

        Observer.on('subNum', (num) => {
            this.setState({num: this.state.num - num})
        })
    }

    render() {
        return (
            <div>
                <h1>{`num: ${this.state.num}`}</h1>
                <Button.Group>
                    <Button type="primary" onClick={() => Observer.trigger('addNum', 3)}>增加</Button>
                    <Button type="danger" onClick={() => Observer.trigger('subNum', 2)}>减少</Button>
                </Button.Group>
            </div>
        )
    }
}

render(<App/>, document.querySelector('#app'))
```

### Redux

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { createStore } from 'redux'
import { connect, Provider} from 'react-redux'

const ADD_NUM = 'ADD_NUM'
const DELETE_NUM = 'DELETE_NUM'

// reducer
function reducer(state = 0, action) {
    switch(action.type) {
        case ADD_NUM:
            state += action.data
            break
        case DELETE_NUM:
            state -= action.data
            break
        default:;
    }

    return state
}

let store = createStore(reducer)

export class App extends Component {
    render() {
        const { num } = this.props
        return (
            <div>
                <h1>{`num: ${num}`}</h1>
                <Button.Group>
                    <DealAddNum></DealAddNum>
                    <DealDeleteNum></DealDeleteNum>
                </Button.Group>
            </div>
        )
    }
}

class AddNum extends Component {
    render() {
        const { addNum } = this.props
        return (
            <div>
                <Button type="primary" onClick={() => addNum(10)}>增加10</Button>
                <Button type="primary" onClick={() => addNum(20)}>增加20</Button>
                <Button type="primary" onClick={() => addNum(40)}>增加40</Button>
                <Button type="primary" onClick={() => addNum(60)}>增加60</Button>
            </div>
        )
    }
}

class DeleteNum extends Component {
    render() {
        const { dispatch } = this.props
        return (
            <div>
                <Button type="danger" onClick={() => dispatch({type: 'DELETE_NUM', data: 20})}>减少20</Button>
            </div>
        )
    }
}

// 拓展方法
let dealFn = connect(
    state => ({
        state,
        num: state
    }),
    dispatch => ({
        dispatch,
        addNum(num) {
            dispatch({type: 'ADD_NUM', data: num})
        }
    })
)

let DealApp = dealFn(App)
let DealAddNum = dealFn(AddNum)
let DealDeleteNum = dealFn(DeleteNum)

render(
        <Provider store={store}>
            <DealApp></DealApp>
        </Provider>,
        document.querySelector('#app')
    )

```

#### 路由

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Route, HashRouter, Switch, Redirect, Link, BrowserRouter, withRouter } from 'react-router-dom'
import { Button, Radio, Divider } from 'antd'
import 'antd/dist/antd.css'

class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radio: 'Home'
        }
    }
    render() {
        return (
            <div>
                <Button type="link">菜单</Button>
                <Divider></Divider>
                <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    value={this.state.radio}
                >
                    <Link onClick={() => this.setState({radio: 'Home'})} to="/"><Radio.Button value="Home">Home</Radio.Button></Link>
                    <Link onClick={() => this.setState({radio: 'Detail'})} to="/detail/112"><Radio.Button value="Detail">Detail</Radio.Button></Link>
                </Radio.Group>
            </div>
        )
    }
}

class Detail extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Detail</h1>
            </div>
        )
    }
}

class NotFound extends Component {
    render() {
        return (
            <div>
                <h1>NotFound</h1>
            </div>
        )
    }
}

class App extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Header></Header>
                <Switch>
                    {/* exact 精确匹配 */}
                    <Route path="/" exact component={Home} name="Home"></Route> 
                    <Route path="/detail/:id" component={Detail} name="Detail"></Route>
                    <Route path="/notFound" component={NotFound} name="nof"></Route>
                    <Redirect from="/n" to="/notFound"></Redirect> {/* 重定向 */}
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
        )
    }
}

// 获取路由数据
// 1.通过父子组件传递数据
// 2.通过Route组件渲染组件
// 3.通过withRouter 获取router对象
const NewApp = withRouter(App)
render(<HashRouter><NewApp/></HashRouter>, document.querySelector('#app'))


// render(<HashRouter><Route path="/" component={App}></Route></HashRouter>, document.querySelector('#app'))

// render(<BrowserRouter><App/></BrowserRouter>, document.querySelector('#app'))  // 需要服务端配合
```

路由和redux

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Radio, Button, Divider } from 'antd'
import { Router } from 'react-router'
import { Link, HashRouter, withRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

let defaultState = {
    route: '1'
}

// let defaultState = '1'

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_VALUE':
            state.route = action.data
            // state = action.data
            break;
        default:
            break;
    }

    return state
}

const store = createStore(reducer)

class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <h1>Home</h1>
            </>
        )
    }
}

class Header extends Component {
    render() {
        console.log(this.props);
        let { route, setRoute } = this.props
        return (
            <>
                <Button type="link">Header</Button>
                <Divider></Divider>
                <Radio.Group buttonStyle="solid" value={route}>
                    <Link to="/"><Radio.Button value="1">首页</Radio.Button></Link>
                    <Link to="/news"><Radio.Button value="2" onClick={() => {console.log('////'); setRoute('2')}}>新闻</Radio.Button></Link>
                    <Link to="/detail/12"><Radio.Button value="3">详情</Radio.Button></Link>
                </Radio.Group>
                <Radio.Group buttonStyle="solid" value={route}>
                    <Radio.Button value="1" onClick={() => {setRoute('1')}}>首页</Radio.Button>
                    <Radio.Button value="2" onClick={() => {setRoute('2')}}>新闻</Radio.Button>
                    <Radio.Button value="3" onClick={() => {setRoute('3')}}>详情</Radio.Button>
                </Radio.Group>
            </>
        )
    }
}

class News extends Component {
    render() {
        return (
            <>
                <Button type="link">News</Button>
            </>
        )
    }
}


class Detail extends Component {
    render() {
        return (
            <>
                <Button type="link">Detail</Button>
            </>
        )
    }
}


class App extends Component {
    render() {
        console.log(this.props);
        const { state } = this.props
        return (
            <>
                <h1>App</h1>
                <DealHeader route={state.route}></DealHeader>
                <Divider/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/news" exact component={News}></Route>
                    <Route path="/detail/:id" exact component={Detail}></Route>
                </Switch>
            </>
        )
    }
}

const dealFn = connect(
    state => ({state}),
    dispatch => ({
        dispatch,
        setRoute(route) {
            console.log('=======================')
            console.log(route, typeof route)
            console.log('=======================')
            dispatch({type: 'SET_VALUE', data: route})
        }
    })
)

const DealRouteApp = dealFn(App)

const DealHeader = dealFn(Header)

const RouterApp = withRouter(DealRouteApp)

// render(
//     <Provider store={store}>
//         <HashRouter><RouterApp/></HashRouter>
//     </Provider>, document.querySelector('#app'))


render(
    <HashRouter>
        <Provider store={store}>
            <RouterApp/>
        </Provider>
    </HashRouter>,
    document.querySelector('#app'))

```

##### 合并reducer

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Radio, Button, Divider } from 'antd'
import { Router } from 'react-router'
import { Link, HashRouter, withRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import { createStore, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'  // 注意模块的引入

// let defaultState = {
//     route: '1'
// }

let defaultState = '1'

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_VALUE':
            state.route = action.data
            // state = action.data
            break;
        default:
            break;
    }

    return state
}

const store = createStore(combineReducers({
    reducer,
    routerReducer
}))

class Home extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <h1>Home</h1>
            </>
        )
    }
}

class Header extends Component {
    render() {
        console.log(this.props);
        let { route, setRoute } = this.props
        return (
            <>
                <Button type="link">Header</Button>
                <Divider></Divider>
                <Radio.Group buttonStyle="solid" value={route}>
                    <Link to="/"><Radio.Button value="1">首页</Radio.Button></Link>
                    <Link to="/news"><Radio.Button value="2" onClick={() => {console.log('////'); setRoute('2')}}>新闻</Radio.Button></Link>
                    <Link to="/detail/12"><Radio.Button value="3">详情</Radio.Button></Link>
                </Radio.Group>
                <Radio.Group buttonStyle="solid" value={route}>
                    <Radio.Button value="1" onClick={() => {setRoute('1')}}>首页</Radio.Button>
                    <Radio.Button value="2" onClick={() => {setRoute('2')}}>新闻</Radio.Button>
                    <Radio.Button value="3" onClick={() => {setRoute('3')}}>详情</Radio.Button>
                </Radio.Group>
            </>
        )
    }
}

class News extends Component {
    render() {
        return (
            <>
                <Button type="link">News</Button>
            </>
        )
    }
}


class Detail extends Component {
    render() {
        return (
            <>
                <Button type="link">Detail</Button>
            </>
        )
    }
}


class App extends Component {
    render() {
        console.log(this.props);
        const { state } = this.props
        return (
            <>
                <h1>App</h1>
                <DealHeader route={state.route}></DealHeader>
                <Divider/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/news" exact component={News}></Route>
                    <Route path="/detail/:id" exact component={Detail}></Route>
                </Switch>
            </>
        )
    }
}

const dealFn = connect(
    state => ({state}),
    dispatch => ({
        dispatch,
        setRoute(route) {
            console.log('=======================')
            console.log(route, typeof route)
            console.log('=======================')
            dispatch({type: 'SET_VALUE', data: route})
        }
    })
)

const DealRouteApp = dealFn(App)

const DealHeader = dealFn(Header)

const RouterApp = withRouter(DealRouteApp)

// render(
//     <Provider store={store}>
//         <HashRouter><RouterApp/></HashRouter>
//     </Provider>, document.querySelector('#app'))


render(
    <HashRouter>
        <Provider store={store}>
            <RouterApp/>
        </Provider>
    </HashRouter>,
    document.querySelector('#app'))

```

##### redux拓展state对象

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { Button, Divider, Radio } from 'antd'
import 'antd/dist/antd.css'

const defaultValues = {
    num: 50,
    name: 'redux reducer'
}

const reducer = (state = defaultValues, action) => {
    let data = Object.assign({}, state)
    
    switch (action.type) {
        case 'ADD_NUM':
            data.num += action.data
            break 
        default:;
    }

    return data
}

const dealFn = connect(
    state => ({state}),
    dispatch => ({
        dispatch,
        setNum(type, data) {
            dispatch({type, data})
        }
    })
)

const store = createStore(reducer)

class Show extends Component {
    render() {
        return (
            <div>
                <Button type="link">数值：{this.props.num}</Button>
            </div>
        )
    }
}

class Controls extends Component {
    setNum(type, num) {
        this.props.setNum(type, num)
    }
    
    render() {
        return (
            <div>
                <Radio.Group buttonStyle="solid" defaultValue="奇幻漂流">
                    <Radio.Button value="奇幻漂流" onClick={() => this.setNum('ADD_NUM', 10)}>奇幻漂流</Radio.Button>
                    <Radio.Button value="奇门遁甲" onClick={() => this.setNum('ADD_NUM', 20)}>奇门遁甲</Radio.Button>
                    <Radio.Button value="天气之子" onClick={() => this.setNum('ADD_NUM', 30)}>天气之子</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

class App extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Show num={this.props.state.num}></Show>
                <Controls setNum={this.props.setNum}></Controls>
            </div>
        )
    }
}

const DealApp = dealFn(App)

render(<Provider store={store}><DealApp/></Provider>, document.querySelector('#app'))
```

##### state拓展action

```jsx
/*
 * 拓展属性可以灵活传递数据，但是会污染组件的属性对象
 * 动态action可以灵活传递数据，并且不会污染组件的属性对象
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import { Button, Radio, Divider, Card } from 'antd'
import reduxThunk from 'redux-thunk'
import axios from 'axios'
import 'antd/dist/antd.css'

const defaultValues = {
    num: 50,
    name: 'redux reducer'
}

const reducer = (state = defaultValues, action) => {
    switch (action.type) {
        case 'ADD_NUM':
            state.num += action.data
            break
        case 'SAVE_DATA':
            state.data = action.data
            break;
        default:;
    }

    return Object.assign({}, state)
}

// 拓展action属性
let addNum = data => ({type: 'ADD_NUM', data})
let getData = (...args) => {
    console.log(args)
    return (dispatch, getState) => {
        axios.get('/data/index.json')
            .then(({data}) => {
                console.log(data)
                dispatch({type: 'SAVE_DATA', data})
            })
    }
}

const dealFn = connect(
    state => ({state}),
    dispatch => ({
        dispatch,
    })
)

const newCreateStore = applyMiddleware(reduxThunk)(createStore)  // 使用中间件创建高阶组件
const store = newCreateStore(reducer) 

class Show extends Component {
    render() {
        const { state } = this.props
        return (
            <div>
                <Button type="link">数值：{this.props.state.num}</Button>
                <Divider></Divider>
                <Card title={state?.data?.title || null} style={{display: state?.data?.title ? 'block' : 'none'}}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Divider></Divider>
            </div>
        )
    }
}

class App extends Component {
    render() {
        const { dispatch } = this.props // 不会污染props
        console.log(this.props);
        
        return (
            <div>
                <Show state={this.props.state}></Show>
                <Radio.Group buttonStyle="solid" defaultValue="10">
                    <Radio.Button value="10" onClick={() => dispatch(addNum(10))}>加10</Radio.Button>
                    <Radio.Button value="20" onClick={() => dispatch(addNum(20))}>加20</Radio.Button>
                    <Radio.Button value="30" onClick={() => dispatch(addNum(30))}>加30</Radio.Button>
                    <Radio.Button value="4" type="danger" onClick={() => dispatch(getData())}>请求数据</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

const DealApp = dealFn(App)

render(<Provider store={store}><DealApp/></Provider>, document.querySelector('#app'))

```

#### React-native

```js
// 安装脚手架
npm i -g react-native-cli

// 手机调试 cmd =>  adb devices 
// 安装Android SDK Manager  http://tools.android-studio.org/index.php/sdk/
// 安装需要的包 并需要同意条款 注意版本号 如果后面想安装其他东西 删除 C:\Users\admin [.android  .gradle]

// 运行项目
react-native run-android

// 连接模拟器[需要知道模拟器的端口号]
adb connect 127.0.0.1:21503  // [逍遥模拟器]
adb connect 127.0.0.1:62001  // 夜神模拟器
/*
 * 如果报错：unable to load script.make sure you're either ...
 * 解决：1.react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 
 * 2: 修改文件 项目目录/android/app/build.gradle
 * project.ext.react = [
 *     bundleInDebug: true	
 * ]
 */

// 报错 [> Task :app:installDebug FAILED]
// 解决： cd .\android\ =>   ./gradlew clean  => npm cache clean --force  => 重新运行
// 连接手机[USB方式]



// 控制台打印日志
react-native log-android

// android/gradle-6.7.all.zip 无法下载
// 载然后修改android/gradle/wrapper/gradle-wrapper.properties 下的链接
distributionUrl=file\:///E:/Learning/Practice/React/native_07/android/gradle-6.7-all.zip
```

##### 样式

```js
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	title: {
		color: 'pink'
	}
})

<Text style={{color: 'skyblue'}}>color: skyblue</Text>
<Text style={styles.title}>title</Text>
// 需要添加添加样式文件
// view 不能设置字体样式
// 不能使用符合属性
```

### 脚手架

#### 目录架构

public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- %PUBLIC_URL%/代表public文件夹的路径 -->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <!-- 开始视窗 -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 配置浏览器页签 地址栏的颜色(仅支持安卓手机浏览器) -->
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!-- 用于指定网页添加到手机主屏幕后的图标 -->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!-- 应用加壳的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

reportWebVitals.js      性能分析

#### 样式模块化

将css文件名字修改为xxx.module.css

在组件中引用  import xxx from 'xxx.module.css'

使用     className={xxx.name}

```js
// index.jsx
import { Component } from 'react'
import hello from './index.module.css'

export default class Hello extends Component {
  render() {
    return (
      <div>
        <h2 className={hello.title}>Hello world.</h2>
      </div>
    )
  }
}

// index.module.css
.title {
  color: pink;
}
```

#### 跨域

使用代理，在src目录下新建setupProxy.js文件

```js
// src/setupProxy.js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:5000',
    changeOrign: true,
    pathRewrite: {
      '^/api': ''
    }
  }))
}

// 使用[会自动替换]
axios.get('http://localhost:3000/api/car')
```

#### 消息发布订阅【pubsub-js】

List/index.jsx

```jsx
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import Item from './Item'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lessons: []
    }
  }

  updateLessonState = (_, data) => {
    console.log('更新状态', data)
    let {lessons} = this.state

    switch(data.type) {
      case 'add':
        this.setState({lessons: [...lessons, {name: data.name, id: lessons.length + 1}]})
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    PubSub.subscribe('lessonState', this.updateLessonState)
  }
  
  render() {
    let { lessons } = this.state
    console.log(lessons)
    return (
      <div>
        {
          lessons.map(lesson => <Item key={lesson.id} {...lesson}/>)
        }
      </div>
    )
  }
}

```

List/Item/index.jsx

```jsx
import React, { Component } from 'react'

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lessons: []
    }
  }
  
  render() {
    let {name} = this.props
    console.log('name', name)
    return (
      <div>
        <div>课程：{name}</div>
      </div>
    )
  }
}

```

Todo/index.jsx

```jsx
  import React, { Component } from 'react'
  import PubSub from 'pubsub-js'
  import './index.less'

export default class Todo extends Component {
  addLesson = () => {
    let { value } = this.task
    PubSub.publish('lessonState', {type: 'add', name: value})
  }
  
  render() {
    return (
      <div className="todo">
        <h2>添加任务</h2>
        <div className="content">
          <input type="text" ref={c => this.task = c}/>
          <button onClick={this.addLesson}>添加</button>
        </div>
      </div>
    )
  }
}
```

#### fetch发送请求

关注分离的设计思想

```jsx
try {
    let response = await fetch('http://localhost:3002/cars')
    let data = await response.json()
    console.log('请求成功的数据: ', data)
} catch (err) {
    console.log(err)
}
```

#### 前端路由

路由需要包裹在BrowserRouter或者HashRouter里面

```jsx
import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './views/Home'
import About from './views/About'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        {/* 编写路由链接 */}
        <Link className="link-item" to="/home">Home</Link>
        <br />
        <Link className="link-item" to="/about">About</Link>

        {/* 注册路由 */}
        <div className="show">
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
        </div>
      </div>
    )
  }
}
```

一般组件和路由组件

```jsx
1.写法不同
	一般组件：<Demo />
    路由组件：<Route path="/demo" component={Demo} />
2.存放位置不同
	一般组件：components
    路由组件：pages
3.接收到的props不同
	一般组件：写组件标签时传递了什么，就能接收到什么
    路由组件：接收到三个固定的属性
    	history:
            go: ƒ go(n)
            goBack: ƒ goBack()
            goForward: ƒ goForward()
            push: ƒ push(path, state)
            replace: ƒ replace(path, state)
        location:
            pathname: "/home"
            search: ""
            state: undefined
            __proto__: Object
        match:
            params: {}
            path: "/home"
            url: "/home"
```

#### 装饰器

- 解析装饰器语法

1. 安装依赖	

   ```
   npm i @babel/plugin-proposal-decorators (yarn add @babel/plugin-proposal-decorators)
   npm i react-app-rewired customize-cra (yarn add react-app-rewired customize-cra)
   ```

2. 修改package.json

   ```js
   "scripts": {
       "start": "react-app-rewired start",
    	"build": "react-app-rewired build",
    	"test": "react-app-rewired test",
    	"eject": "react-scripts eject"
   },
   ```

3. 新建config-overrides.js

   ```js
   const { override, addDecoratorsLegacy } = require('customize-cra')
   module.exports = override(
     addDecoratorsLegacy()
   )
   ```

vscode 支持装饰器 Experimental Decorators

[react-app-rewired start 启动失败报错解决方法](https://www.cnblogs.com/tu-0718/p/12541841.html)启动报错 

yarn add react-scripts