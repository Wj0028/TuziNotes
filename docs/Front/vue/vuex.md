---
title: Vuex
---

# vuex

场景: 如果在应用中出现了大量的组件都要共享同一个状态, 可以利用状态提升的思想,将这些共享状态提升到他们共同的父级组件身上(往往找到了 App), 如果这样共享状态较多的话, 会导致 App 中维护了太多状态, 逻辑不清晰, 不方便与更新维护, 而且在 Vue3 中可以利用 provideInject 来进行数据跨层级的传递, 在 vue2 中 provideInject 传递的数据不是响应的数据, 一级一级传递又过于繁琐不科学, 那怎么办呢?

在这样的情况下就要用到 vuex(共享状态管理工具). 只能在 vue 中使用, 集中式的存储状态, 更新和使用状态都要按照 vuex 的规则来运行.

![](vuex.assets/vuex.png)

什么时候使用 vuex? vuex 之前已经有这样的状态管理的解决方案:flux -> redux 等等, 在 flux 和 redux 的概念有一点说的很好, flux 就像眼镜一样, 当你觉得需要用到的时候就可以用.

## Vuex 的使用

想要使用 vuex, 需要先创建一个 store(仓库, 管理状态): createStore

createStore 中可以传入 store 的配置项, 在其中可以配置: state/mutations/actions....

创建好 store 之后, 可以像 router 一样, 通过 app 去 use 一下, 组件内部就可以通过 this.$store 来取用

### State

可以在配置的 state 中挂载数据, 使用数据的时候 可以通过 store.state 来取用

在组件中可以通过$store 来取用数据

所有的状态都可以挂载 state 上, 保持"唯一数据源"

vuex 推荐我们在组件中, 利用计算属性来取 state 的值, 这样定义好计算属性后, 就可以非常方便使用

```js
computed: {
  count () {
    return this.$store.state.count
  }
},
```

vuex 也提供了 mapState 辅助函数, 可以帮我们方便快捷的将 state 放置到 computed 计算属性中, 返回值是一个计算属性的对象， 所以他的使用方式：

```js
{
  // computed: mapState(),
  computed: {
    // 这里做与state相关的处理
    ...mapState(),
      // 正常做组件内其他的计算属性
  },
}
```

mapState 中可以传入数组或者对象， 甚至可以在数组中放对象：

```js
// 数组中直接写入想要取到state中的数据的键名
// computed: mapState(['count', 'message']),
computed: mapState({
  // 键名为取出来使用时候的数据的名字, 可以不与state中一样, 值为函数, 函数能接收到state, 直接返回对于数据
  // num: state => state.count
  // num: 'count',
  // 常规函数, 可以使用用this上的,当前组件自身的一些数据
  num (state) {
    return state.count + this.step
  }
}),
```

> 不要将所有的状态不经思考的全部放到 vuex 中管理， 这样的话理论上可以让组件更纯粹（只去渲染数据， 不维护数据， 真正成为视图），但是在实际应用的时候会发现这样会导致逻辑更冗余更乱， 所以还是只将需要共享的状态交由 vuex 管理。

### Getters

有的时候，我们会需要根据 state 中的数据派生出一个新的数据： state.count ->-> doubleCount, 如果在组件中利用 mapState 取得 count 之后， 由组件完成派生的过程也能实现效果， 但是如果多个组件都要使用到 doubleCount， 就需要在每个组件中都写入这段派生的逻辑， 很明显不科学。

vuex 提供了 getters， 可以在 stoire 中配置，配置的时候就可以实现从 state 中派生的逻辑： state -> 派生 -> getters

创建 getters 的方法：

```js
  getters: {
    tripleCount: (state, getters) => {
      return state.count * 3
    },
    doubleCount: (state, getters) => {
      return state.count * 2
    },
    // 第一个参数为state， 第二个参数为getters， 可以取用其他的getters
    fifthCount: (state, getters) => {
      return getters.doubleCount + getters.tripleCount
    }
  },
```

在组件中取用的时候与 state 一样， 需要通过计算属性来取值， 只是需要从 this.$store.getters 来取用：

```js
computed: {
  doubleCount () {
    return this.$store.getters.doubleCount
  },
    tripleCount () {
      return this.$store.getters.tripleCount
    },
      fifthCount () {
        return this.$store.getters.fifthCount
      }
}
```

这样的话， 就可以将复杂的派生的逻辑， 放入到 getters 中实现， 组件只需要取用 getters 就可以了。

getters 的设置方法还有一种，可以将 getters 设置成一个函数, 这样就可以在使用 getters 的时候传递参数：

```js
{
	// timesCount: (state) => {
	//   return (x) => {
	//     return state.count * x
	//   }
	// },
	timesCount: (state) => (x) => state.count * x;
}

// use
store.getters.timesCount(20);
```

函数 getters 使用方式：

```js
// computed
timesCount () {
  return this.$store.getters.timesCount
}
// template
timesCount-8: {{ timesCount(8) }} <br />
```

getters 也有自己配套的 mapGetters 辅助函数，使用方式和 mapState 一样：

```js
computed: {
  ...mapGetters(['doubleCount', 'tripleCount', 'fifthCount']),
    ...mapGetters({
    timesCount: 'timesCount'
  })
}
```

### Mutations

mutations 也需要配置在 store 的配置项中, 需要以键值对的形式来存储, 键名是 mutation 的名字, 值应该为一个函数

创建好之后, 想要调用 mutation 的话, 需要通过 store 的 commit 方法来提交一个 mutation

mutation 在提交的时候, 会接收到两个参数, 第一个参数为 state, 第二个为 payload

在 mutation 方法内部就可以通过 state 来修改状态, 也可以通过 payload 来接受参数, 传递参数的方式为: commit(mutationName, payload), payload 是"载荷", 其实就是承载参数的, 如果可能传递多个参数, 使用 payload 来传递最合理.

所以说， vuex 又给出一种提交 方案， 将 mutation.type 和 mutation.payload 结合到一起：

```js
store.commit({ type, ...payload });
// 采用这样的方法的时候， 除type外，其他所有的字段都会放入到payload
```

```vue
<div>
  <button @click="$store.commit({ type: 'decrement' })">decrement</button>
  <button @click="$store.commit({ type: 'increment' })">increment</button>
  <button @click="$store.commit({ type: 'random' })">random</button>
  <button @click="$store.commit({ type: 'update', payload: { num: n } })" v-for="n in [5, 10, 20]" :key="n">update: {{ n }}</button>
</div>
```

vuex 推荐我们将 mutation 的 type 定义成常量， 这样可以避免一些因为 type 被修改，导致提交了错误的 mutation， 错误的修改了转头， 造成损失。vuex 推荐我们将这些 type 单独放到一个独立的文件， 提高整个项目的可读性

```js
// types.js
export const COUNTER_INCREMENT_TYPE = 'COUNTER_INCREMENT_TYPE';
export const COUNTER_DECREMENT_TYPE = 'COUNTER_DECREMENT_TYPE';
export const COUNTER_RANDOM_TYPE = 'COUNTER_RANDOM_TYPE';
export const COUNTER_UPDATE_TYPE = 'COUNTER_UPDATE_TYPE';
```

```js
// store
{
  mutations: {
    [COUNTER_DECREMENT_TYPE]: (state) => {
      // console.log('decrement')
      // 更改状态
      state.count--
    },
    [COUNTER_INCREMENT_TYPE]: (state) => {
      // console.log('increment')
      // 更改状态
      state.count++
    },
    [COUNTER_RANDOM_TYPE]: (state) => {
      // console.log('random')
      state.count = _.random(0, 100)
    },
    [COUNTER_UPDATE_TYPE]: (state, payload) => {
      const { title,  num } = payload
      // console.log('update:', title || num)
      state.count = num
    }
  }
}
```

```vue
<template>
	<div>
		<button @click="$store.commit({ type: COUNTER_DECREMENT_TYPE })">decrement</button>
		<button @click="$store.commit({ type: COUNTER_INCREMENT_TYPE })">increment</button>
		<button @click="$store.commit({ type: COUNTER_RANDOM_TYPE })">random</button>
		<button
			@click="$store.commit({ type: COUNTER_UPDATE_TYPE, num: n })"
			v-for="n in [5, 10, 20]"
			:key="n"
		>
			update: {{ n }}
		</button>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import * as TYPES from './types';
export default {
	name: 'Counter',
	data() {
		return {
			step: 2,
			...TYPES,
		};
	},
};
</script>
```

注意：**mutation 必须是同步函数**，(能生效， 也别这么干) 也就是说在 mutation 中不要做异步动作， 因为 mutation 中每一个动作都会被 dev-tools 捕捉，我们在做 debug 的时候， 可以方便看到整个状态是怎么变化， 如果 mutation 中存在异步逻辑， 导致 dev-tools 无法准确记录变化过程，对 debug 造成影响。

mutation 也有自己配套的 mapMutations 方法， 可以将 mutations 中的 mutation 遍历到组件的 methods 中， 到时候就可以通过 this 来调用.

```js
// script
methods: {
  ...mapMutations({
    increment: TYPES.COUNTER_INCREMENT_TYPE,
    decrement: TYPES.COUNTER_DECREMENT_TYPE,
    random: TYPES.COUNTER_RANDOM_TYPE,
    asyncRandom: TYPES.COUNTER_ASYNC_RANDOM_TYPE,
    update: TYPES.COUNTER_UPDATE_TYPE,
  })
}

// template
<div>
  <button @click="decrement">decrement</button>
<button @click="increment">increment</button>
<button @click="random">random</button>
<button @click="asyncRandom">async random</button>
<button @click="update({ num: n })" v-for="n in [5, 10, 20]" :key="n">update: {{ n }}</button>
</div>
```

### Actions

前面说道， 异步逻辑不能放在 mutations 中， 那么可以放在组件中吗？

在没有使用 vuex 之前， 组件自己承担相关各种逻辑， 在引入 vuex 之后，对应的组件，就应该减少对数据·操作相关的逻辑， 尽量保持纯粹（取用数据、渲染数据）。

那么这些与 store 中状态更改相关的异步逻辑最好防止在 vuex 提供的 actions 上。

action 的配置方法与 mutations， 本身也是一些方法的集合体

```js
{
  state: {},
  getters: {},
  mutations: {},
  actions: {
    [方法名]： 函数（方法本体）
    asyncRandom: () => {
      // 可以在这里执行异步逻辑
    }
  }
}
```

actions 中的方法如果调用？应该利用 store.dispatch 来**派发**这个**动作**:

```js
store.dispatch('asyncRandomUpdate');
```

那么在 actions 的方法中如何提交一个或者多个对应的 mutations？

actions 的方法中会接受到 context 和 payload， context 身上包含有几乎所有的 store 的 api：dispatch/commit/state/getters， 但是这个不是真正 store， 而是当前的片段中传入的“一部分 store”:

```js
actions: {
  asyncRandomUpdate ({ disptach, commit, state, getters }) {
    setTimeout(() => {
      const random = _.random(10, 30)
      // 提交mutations
      commit({ type: COUNTER_UPDATE_TYPE, num: random })
    }, 2000)
  }
}
```

从上面的代码可以看到， actions 的方法中可以派发其他 action、提交一个或者多个对应的 mutation，也可以拿到 state 和 getters 做出判断后进行分流处理（不能直接修改 state）。

当然也可以传递参数：

```js
actions: {
  asyncRandomUpdate ({ disptach, commit, state, getters }, payload) {
    setTimeout(() => {
      const random = _.random.apply(null, payload.range)
      // 提交mutations
      commit({ type: COUNTER_UPDATE_TYPE, num: random })
    }, 2000)
  }
}

store.dispatch('asyncRandomUpdate', { range: [30, 40] })
store.dispatch({
  type: 'asyncRandomUpdate',
  range: [80, 100]
})

```

在组件中也可以通过$store.dispatch 来派发动作:

```js
this.$store.dispatch({ type, ... })
```

也可以使用 mapActions 辅助函数， 使用方式和 mapMutations 一样

```js
{
  methods: {
    ...mapActions([...]),
    ...mapActions({
       ...
    }),
  }
}
```

串行 Actions， 如果在一个 actions 中要派发多个 actions， 并且要有先后顺序的调用（A 执行完成后再执行 B），就可以让对应的 action 方法返回一个 promise 对象， 因为 disptach 在派发 actions 的时候， dispatch 的返回结果其实就是 actions 的返回结果， 所以就可以通过 dispatch 来得到 actions 执行的 promise，那么就可以利用 promise 特性来串行执行。

```js
		asyncRandomUpdate ({ disptach, commit, state, getters }, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const random = _.random.apply(null, payload.range)
          // 提交mutations
          commit({ type: COUNTER_UPDATE_TYPE, num: random })
          resolve()
        }, 2000)
      })
    },
    // asyncRandomUpdateTwice ({ dispatch }, payload) {
    //   // 连续的调用asyncRandomUpdate两次
    //   dispatch({
    //     type: 'asyncRandomUpdate',
    //     range: payload.range
    //   }).finally(() => {
    //     dispatch({
    //       type: 'asyncRandomUpdate',
    //       range: payload.range
    //     })
    //   })
    // },
    async asyncRandomUpdateTwice ({ dispatch }, payload) {
      // 连续的调用asyncRandomUpdate两次
      await dispatch({
        type: 'asyncRandomUpdate',
        range: payload.range
      })
      await dispatch({
        type: 'asyncRandomUpdate',
        range: payload.range
      })
      dispatch({
        type: 'asyncRandomUpdate',
        range: payload.range
      })
    }
  }
```

### Modules

在应用越来越庞大的时候，不可能将一个应用所有需要管理的、共享的、状态都放在 store.state 中，这样会导致代码非常臃肿， 不便于维护， 也不便于多人协作， vue 提供出了 modules 概念，可以在 store 中划分模块，来进行逻辑焦点分离

Store （rootState）：modules: moduleA(state)/moduleB(state)

> 模块中的 state 需要写成函数返回对象的形式，因为模块有被复用的可能性

划分模块之后， rootState 的状态可以直接 store.state 来取用， 模块中的 state，需要通过 store.state.moduleName 来取用

但是需要注意的是，getters/actions/mutations 函数都可以获取到当前模块的相关 api， 也可以获取到 root 作用域的相关 api, 但是最终会把多个模块的 getters 之类的都挂载到 root 作用域上, 很容易出现重名覆盖的问题。

所以推荐大家，为每个模块设置 namespaced 属性为 true， 这样的话，getters 等等内容，虽然还是回直接挂载到 root 上，但是名字已经有隔离了 'moduleName/getterName'

这样使用就简单了：

1. store 中 root 的部分， 取值与之前一直， 相对于模块来说，状态等等之类的称为： rootState/rootGetters...
2. 划分模块后， 最好给模块添加 namespaced:true， 这样， geeters 的数据名字、actions 和 mutations 的 type 名字，在调用的时候都要前面添加'moduleName/',
3. 如果使用辅助函数的话，直接在辅助函数最前面参数传入对应模块的名字
4. 可以使用 createNamespacedHelper 来创建某个模块独有的辅助函数， 但是如果一个组件要使用多个模块相关 api 的时候，这个方法就有点鸡肋了。
