#### 收集表单数据

```js
<!--
	若: <input type="text"/> 则v-model收集到的是value值，用户输入的就是value值
	若: <input type="radio"/>, 则v-model收集的是value值，且要给标签配置value值
	若：<input type="checkbox"/>
        1. 没有配置input的value属性，那么手机的就是checked (布尔值)
		2. 配置input的value属性
        	(1)v-model 的初始值是非数组，那么收集的就是checked
        	(2)v-model 的初始值数组，那么收集的就是value组成的数组
    备注: v-model的三个修饰符
		lazy: 失去焦点再收集数据
        number: 输入字符串转为有效的数字
        trim: 输入首尾空格过滤
-->
```

#### 其他内置指令

```js
v-html: html
v-cloak: 隐藏未经解析的模板
	需要配合css使用 [v-cloak] {display: none;}
v-once：
	1.v-once所在节点在初次动态渲染后，就视为静态内容
	2.以后数据的改变不会引起v-once所在结构的更新，可优化性能
v-pre:
	1.跳过所在节点的变异过程
    2.应用场景：没有使用指令语法，没有插值语法的节点，加快编译
```

#### 自定义指令

```js
// 自定义指令
1. 简写方式
	directives: {
		big(ele, binding) {
			// ele 绑定的元素 binding: 属性
		}
	}
// 简写方式是bind和update
	
2. 属性写法
	directives: {
		'm-focus': {
			bind(ele, binding) {},
			inserted(){},
			update(ele, binding) {},
		}
	}
```

### Vuex

##### 1.基础版vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  num: 0
}

const actions = {
  increaseIfOdd(context) {
    context.state.num % 2 && context.commit('increase')
  },
  increaseWait(context) {
    setTimeout(() => {
      context.commit('increase')
    }, 500)
  }
}

const mutations = {
  increase(state, palyload = 1) {
    state.num += palyload
  },
}

const getters = {
  scale10(state) {
    return state.num * 10
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

```

##### 2.使用映射的方式

```vue
<template>
  <div>
    当前计算的数据值为: {{sum}}
    <br>
    放大十倍之后的数据: {{scale10}}
    <el-divider></el-divider>
    <Count />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Count from './components/Count.vue'

export default {
  name: 'App',
  components: {
    Count
  },
  computed: {
    ...mapState({sum: 'num'}),
    ...mapGetters(['scale10'])
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>
```

```vue
<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="increase(1)">+ 1</el-button>
      <el-button type="primary" @click="decrease(-1)">- 1</el-button>
      <el-button type="primary" @click="increaseIfOdd">奇数 + 1</el-button>
      <el-button type="primary" @click="increaseWait">500ms后 + 1</el-button>
    </el-button-group>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  methods: {
    ...mapMutations({increase: 'increase', decrease: 'increase'}),
    ...mapActions(['increaseIfOdd', 'increaseWait']),
  }
}
</script>
```

##### 3. 模块化使用

info.vue

```vue
<template>
  <div>
    <div class="pb-1">鸡汤来喽</div>
    <el-divider></el-divider>
    <div>
      <div class="pb-1" v-for="item in poisonList" :key="item.id">
        {{item.text}}
      </div>
    </div>
    <el-input class="pb-1" v-model="text"></el-input>
    <el-button-group>
      <el-button type="success" @click="addPoison">添加一条鸡汤</el-button>
      <el-button type="success" @click="getPoison">随机获取一条鸡汤</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    poisonList() {
      return this.$store.state.info.list
    }
  },
  methods: {
    getPoison() {
      this.$store.dispatch('info/getPoison')
    },
    addPoison() {
      this.$store.commit('info/addPoison', {text: this.text, fn: () => this.text = ''})
    }
  }
}
</script>

<style lang="scss">
  
</style>

```

store/info.js

```js
import axios from 'axios'
import { nanoid } from 'nanoid'

export default {
  namespaced: true,
  state: {
    list: [{
      id: "0pr7Nyr8meO4om7gJTbQJ",
      text: "哀莫大于贼心不死"
    }]
  },
  getters: {

  },
  actions: {
    getPoison(context) {
      axios.get('https://api.muxiaoguo.cn/api/dujitang').then(res => {
        const {data, code} = res.data
        if (code === 200) {
          context.commit('addPoison', {text: data.comment})
        }
      })
    }
  },
  mutations: {
    addPoison(state, {text, fn}) {
      if (text?.trim()) {
        state.list.push({
          id: nanoid(),
          text
        })
        fn && fn()
      }
    }
  },
}
```

store/count.js

```js
export default {
  namespaced: true,
  state: {
    num: 0
  },
  actions: {
    increaseIfOdd(context) {
      context.state.num % 2 && context.commit('increase')
    },
    increaseWait(context) {
      setTimeout(() => {
        context.commit('increase')
      }, 500)
    }
  },
  mutations: {
    increase(state, palyload = 1) {
      state.num += palyload
    },
  },
  getters: {
    scale10(state) {
      return state.num * 10
    }
  }
}
```

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import count from './count'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    count,
    info
  }
})

```

