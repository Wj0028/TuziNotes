---
title: Vue3+Vite+Pinia
---

# 一、Vue3

## 1、引入 Vue 库

如果你想要在一个新项目里快速尝试 Vue 3：

-   通过 CDN：`<script src="https://unpkg.com/vue@next"></script>`

## 2、编写第一个 Vue3 程序

```html
<div id="counter">Counter: {{ counter }}</div>
```

```js
const Counter = {
	data() {
		return {
			counter: 0,
		};
	},
};

Vue.createApp(Counter).mount('#counter');
```

## 3、做个 TodoList

```html
<div id="todo-list-app">
	<ol>
		<todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
	</ol>
</div>
<script>
	const TodoItem = {
		props: ['todo'],
		template: `<li>{{ todo.text }}</li>`,
	};

	const TodoList = {
		data() {
			return {
				groceryList: [
					{ id: 0, text: '谈恋爱' },
					{ id: 1, text: '打游戏' },
					{ id: 2, text: '玩手机' },
				],
			};
		},
		components: {
			TodoItem,
		},
	};

	const app = Vue.createApp(TodoList);
	app.mount('#todo-list-app');
</script>
```

## 4、应用和组件实例

每个 Vue 应用都是通过用 `createApp` 函数创建一个新的**应用实例**开始的：

```js
const app = Vue.createApp({
	/* 选项 */
});
```

该应用实例是用来在应用中注册“全局”组件的。

```js
const app = Vue.createApp({});
app.component('SearchInput', SearchInputComponent);
app.directive('focus', FocusDirective);
app.use(LocalePlugin);
```

应用实例暴露的大多数方法都会返回该同一实例，允许链式：

```js
Vue.createApp({})
	.component('SearchInput', SearchInputComponent)
	.directive('focus', FocusDirective)
	.use(LocalePlugin);
```

## 5、生命周期函数

![实例的生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

beforeUnmount、unmouted 是 Vue3 调整的钩子。并且通过 app.unmount() 函数触发组件销毁。

## 6、Data Property 和方法

-   data 只能定义成一个函数。
-   防抖和节流

```html
<script src="https://unpkg.com/lodash@4.17.20/lodash.min.js"></script>
<script>
	const app = Vue.createApp({
		methods: {
			// 用 Lodash 的防抖函数
			click: _.debounce(function () {
				// ... 响应点击 ...
			}, 500),
		},
	}).mount('#app');

	app.component('save-button', {
		created() {
			// 使用 Lodash 实现防抖
			this.debouncedClick = _.debounce(this.click, 500);
		},
		unmounted() {
			// 移除组件时，取消定时器
			this.debouncedClick.cancel();
		},
		methods: {
			click() {
				// ... 响应点击 ...
			},
		},
		template: `
    <button @click="debouncedClick">
      Save
    </button>
  `,
	});
</script>
```

## 7、`v-if` 与 `v-for`

-   当 `v-if` 与 `v-for` 一起使用时，`v-if` 具有比 `v-for` 更高的优先级。

-   v-for 中的 Ref 数组

在 Vue 2 中，在 `v-for` 中使用的 `ref` attribute 会用 ref 数组填充相应的 `$refs` property。当存在嵌套的 `v-for` 时，这种行为会变得不明确且效率低下。

在 Vue 3 中，此类用法将不再自动创建 `$ref` 数组。要从单个绑定获取多个 ref，请将 `ref` 绑定到一个更灵活的函数上 (这是一个新特性)：

```html
<div v-for="item in list" :ref="setItemRef"></div>
```

-   v-for 中 key

## 8、多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```html
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">Submit</button>
```

```js
// ...
methods: {
  one(event) {
    // 第一个事件处理器逻辑...
  },
  two(event) {
   // 第二个事件处理器逻辑...
  }
}
```

## 9、按键修饰符

-   Vue2

在 Vue 2 中，`keyCodes` 可以作为修改 `v-on` 方法的一种方式。

```html
<!-- 键码版本 -->
<input v-on:keyup.13="submit" />

<!-- 别名版本 -->
<input v-on:keyup.enter="submit" />
```

此外，也可以通过全局的 `config.keyCodes` 选项定义自己的别名。

```js
Vue.config.keyCodes = {
	f1: 112,
};
```

```html
<!-- 键码版本 -->
<input v-on:keyup.112="showHelpText" />

<!-- 自定义别名版本 -->
<input v-on:keyup.f1="showHelpText" />
```

-   Vue3

从 [`KeyboardEvent.keyCode` 已被废弃](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode)开始，Vue 3 继续支持这一点就不再有意义了。因此，现在建议对任何要用作修饰符的键使用 kebab-cased (短横线) 名称。

```html
<!-- Vue 3 在 v-on 上使用按键修饰符 -->
<input v-on:keyup.page-down="nextPage" />

<!-- 同时匹配 q 和 Q -->
<input v-on:keypress.q="quit" />
```

## 10、`$attrs`包含`class`&`style`

Vue3 中，`$attrs` 现在包含了*所有*传递给组件的 attribute，包括 `class` 和 `style`。

## 11、自定义事件

-   事件名

与组件和 prop 一样，事件名提供了自动的大小写转换。如果在子组件中触发一个以 camelCase (驼峰式命名) 命名的事件，你将可以在父组件中添加一个 kebab-case (短横线分隔命名) 的监听器。

```js
this.$emit('myEvent');
```

```html
<my-component @my-event="doSomething"></my-component>
```

-   自定义事件

可以通过 `emits` 选项在组件上定义发出的事件。

```js
app.component('custom-form', {
	emits: ['inFocus', 'submit'],
});
```

当在 `emits` 选项中定义了原生事件 (如 `click`) 时，将使用组件中的事件**替代**原生事件侦听器

-   验证抛出的事件

与 prop 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，则可以对它进行验证。

要添加验证，请为事件分配一个函数，该函数接收传递给 `$emit` 调用的参数，并返回一个布尔值以指示事件是否有效。

```js
app.component('custom-form', {
	emits: {
		// 没有验证
		click: null,

		// 验证 submit 事件
		submit: ({ email, password }) => {
			if (email && password) {
				return true;
			} else {
				console.warn('Invalid submit event payload!');
				return false;
			}
		},
	},
	methods: {
		submitForm(email, password) {
			this.$emit('submit', { email, password });
		},
	},
});
```

-   v-model 参数

默认情况下，组件上的 `v-model` 使用 `modelValue` 作为 prop 和 `update:modelValue` 作为事件。我们可以通过向 `v-model` 传递参数来修改这些名称：

```html
<my-component v-model:title="bookTitle"></my-component>
```

在本例中，子组件将需要一个 `title` prop 并发出 `update:title` 事件来进行同步：

```js
app.component('my-component', {
	props: {
		title: String,
	},
	emits: ['update:title'],
	template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `,
});
```

## 12、插槽

-   插槽内容

```html
<todo-button>Add todo</todo-button>
```

```html
<!-- todo-button 组件模板 -->
<button class="btn-primary">
	<slot></slot>
</button>
```

-   渲染作用域

![Slot explanation diagram](https://v3.cn.vuejs.org/images/slot.png)

-   备用内容

    有时为一个插槽指定备用 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

```html
<button type="submit">
	<slot>Submit</slot>
</button>
```

-   具名插槽

```html
<div class="container">
	<header>
		<slot name="header"></slot>
	</header>
	<main>
		<slot></slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</div>
```

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```html
<base-layout>
	<template v-slot:header>
		<h1>Here might be a page title</h1>
	</template>

	<template v-slot:default>
		<p>A paragraph for the main content.</p>
		<p>And another one.</p>
	</template>

	<template v-slot:footer>
		<p>Here's some contact info</p>
	</template>
</base-layout>
```

-   作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。当一个组件被用来渲染一个项目数组时，这是一个常见的情况，我们希望能够自定义每个项目的渲染方式。

```js
app.component('todo-list', {
	data() {
		return {
			items: ['Feed a cat', 'Buy milk'],
		};
	},
	template: `
    <ul>
      <li v-for="( item, index ) in items">
        <slot :item="item"></slot>
      </li>
    </ul>
  `,
});
```

```html
<todo-list>
	<template v-slot:default="slotProps">
		<i class="fas fa-check"></i>
		<span class="green">{{ slotProps.item }}</span>
	</template>
</todo-list>
```

![Scoped slot diagram](https://v3.cn.vuejs.org/images/scoped-slot.png)

## 13、Provide / Inject

-   一般用法

通常，当我们需要从父组件向子组件传递数据时，我们使用 [props](https://v3.cn.vuejs.org/guide/component-props.html)。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

对于这种情况，我们可以使用一对 `provide` 和 `inject`。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。这个特性有两个部分：父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这些数据。

![Provide/inject scheme](https://v3.cn.vuejs.org/images/components_provide.png)

例如，我们有这样的层次结构：

```text
Root
└─ TodoList
   ├─ TodoItem
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```

实现不同组件的传参。

```js
// todolist组件
provide: {
	user: 'John Doe'
},
// TodoListStatistics组件
inject: ['user'],
```

要访问组件实例 property，我们需要将 `provide` 转换为返回对象的函数：

```js
// todolist组件
provide() {
  return {
  	todoLength: this.todos.length
  }
},
```

-   处理响应性

```js
app.component('todo-list', {
	// ...
	provide() {
		return {
			todoLength: Vue.computed(() => this.todos.length),
		};
	},
});

app.component('todo-list-statistics', {
	inject: ['todoLength'],
	created() {
		console.log(`Injected property: ${this.todoLength.value}`); // > 注入的 property: 5
	},
});
```

## 14、动态组件 & 异步组件

-   Vue3 对变化的总体概述：

    -   新的 `defineAsyncComponent` 助手方法，用于显式地定义异步组件

    -   Loader 函数本身不再接收 `resolve` 和 `reject` 参数，且必须返回一个 Promise

-   `<suspense>` 组件提供了另一个方案，允许将等待过程提升到组件树中处理，而不是在单个组件中。

## 15、处理边界情况

Vue3 边界情况涉及两个内容，一个是 $forceUpdate，一个是`v-once`。

## 16、$children

`$children` 实例 property 已从 Vue 3.0 中移除，不再支持。

在 2.x 中，开发者可以使用 `this.$children` 访问当前实例的直接子组件：

```js
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Change logo</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

在 3.x 中，`$children` property 已被移除，且不再支持。如果你需要访问子组件实例，我们建议使用 [$refs](https://v3.cn.vuejs.org/guide/component-template-refs.html#模板引用)。

## 17、自定义指令

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

-   `created`：在绑定元素的 attribute 或事件监听器被应用之前调用。在指令需要附加在普通的 `v-on` 事件监听器调用前的事件监听器中时，这很有用。
-   `beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用。
-   `mounted`：在绑定元素的父组件被挂载后调用。
-   `beforeUpdate`：在更新包含组件的 VNode 之前调用。

-   `updated`：在包含组件的 VNode **及其子组件的 VNode** 更新后调用。
-   `beforeUnmount`：在卸载绑定元素的父组件之前调用
-   `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次。

在 Vue 3 中，我们为自定义指令创建了一个更具凝聚力的 API。正如你所看到的，它们与我们的组件生命周期方法有很大的不同，即使钩子的目标事件十分相似。我们现在把它们统一起来了：

-   **created** - 新增！在元素的 attribute 或事件监听器被应用之前调用。
-   bind → **beforeMount**
-   inserted → **mounted**
-   **beforeUpdate**：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
-   update → 移除！该钩子与 `updated` 有太多相似之处，因此它是多余的。请改用 `updated`。
-   componentUpdated → **updated**
-   **beforeUnmount**：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
-   unbind -> **unmounted**

## 18、与自定义元素的互操作性

-   定制内置元素

    -   在普通元素上使用时，它将作为 `is` attribute 传递给 `createElement` 调用，并作为原生 attribute 渲染。这支持了自定义内置元素的用法。

        ```html
        <button is="plastic-button">点击我！</button>
        ```

        -   2.x 的行为：渲染 `plastic-button` 组件。

        -   3.x 的行为：通过调用以下函数渲染原生的 button

            ```js
            document.createElement('button', { is: 'plastic-button' });
            ```

-   使用 vue: 前缀来解决 DOM 内模板解析问题

```html
<table>
	<tr is="vue:blog-post-row"></tr>
</table>
```

## 19、组合式 API-composition-api

https://vue3js.cn/vue-composition-api/#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0

### 19.1、什么是组合式 API

<!-- ![image-20220620194238746](./images/image-20220620194238746.png) -->

### 19.2、举一个例子

**（1）应用 Vite 来构建项目**

```
npm install pnpm -g
```

```
pnpm create vite
```

**（2）options-api**

**（3）composition-api**

### 19.3、setup()

**（1）基本使用**

**（2）访问 Prop**

**（3）setup 的上下文**

**（4）与渲染函数一起使用**

### 19.4、核心

（1）ref()

（2）computed()

（3）reactive()

（4）readonly()

（5）watchEffect()

（6）watch()

### 19.5、工具

（1）isRef()

（2）unRef()

（3）toRef()

（4）toRefs()

（5）isProxy()

（6）isReactive()

（7）isReadonly()

### 19.6、声明周期钩子

-   `beforeCreate` -> 使用 `setup()`
-   `created` -> 使用 `setup()`
-   `beforeMount` -> `onBeforeMount`
-   `mounted` -> `onMounted`
-   `beforeUpdate` -> `onBeforeUpdate`
-   `updated` -> `onUpdated`
-   `beforeDestroy` -> `onBeforeUnmount`
-   `destroyed` -> `onUnmounted`

（1）onMounted()

（2）onUpdated()

（3）onUnmounted()

（4）onBeforeMount()

（5）onBeforeUpdate()

（6）onBeforeUnmount()

### 19.7、依赖注入

（1）provide()

（2）inject()

### 19.8、`<script setup>`

改造第一个例子。

## 20、**Vue Router 4.x** **组合式**API

### 20.1、在 vite 下安装 Vue Router 4.x

```
pnpm i vue-router@4
```

### 定义路由

### 20.2、引入路由

### 20.3、useRouter()，useRoute()

### 20.4、watch 路由变化

### 20.5、onBeforeRouteLeave() 守卫

### 20.6、onBeforeRouteUpdate() 守卫

## **21**、Vuex 4.x **组合式**API

### 21.1、在 vite 下安装 Vuex

```
pnpm install vuex@next --save
```

### 21.2、定义 store

### 21.3、引入 store

### 21.4、useStore()

# 二、pinia

![vuex](https://vuex.vuejs.org/vuex.png)

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages01%2F20220607%2F6d60122e82d14ef3890ea1a477cb8e60.png&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658450922&t=645adb43cad25ad8bd8548f9bc64dcd0)

pinia 中文文档：https://pinia.web3doc.top/

# 三、在 Vue3 中使用 TS

像 TypeScript 这样的类型系统可以在编译时通过静态分析检测出很多常见错误。这减少了生产环境中的运行时错误，也让我们在重构大型项目的时候更有信心。通过 IDE 中基于类型的自动补全，TypeScript 还改善了开发体验和效率。

Vue 本身就是用 TypeScript 编写的，并对 TypeScript 提供了头等的支持。所有的 Vue 官方库都提供了类型声明文件，开箱即用。

## 1、准备工作

### 1.1、使用 create-vue 创建项目

```
npm init vue@3
```

### 1.2、在 Vite 中使用 TypeScript

Vite 天然支持引入 .ts 文件。

Vite 仅执行 .ts 文件的转译工作，并不执行任何类型检查。

并假设类型检查已经被你的 IDE 或构建过程接管了。

你可以在构建脚本中运行 tsc --noEmit。

或者安装 vue-tsc 然后运行 vue-tsc --noEmit 来对你的 \*.vue 文件做类型检查。

Vite 使用 [esbuild](https://github.com/evanw/esbuild) 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。

### 1.3、常见的使用说明

-   `defineComponent()`

## 2、TS 与组合式 API

### 2.1、为组件的 prop 标注类型

### 2.2、为组件的 emit 标注类型

### 2.3、为 ref() 标注类型

### 2.4、为 reactive() 标注类型

### 2.5、为 computed() 标注类型

### 2.6、为事件处理器标注类型

### 2.7、为 project/inject 标注类型

### 2.8、为模板 ref 标注类型

# 四、Vite2

### 1、Vite 支持 Vue3 使用 JSX

### 2、在 Vite 中使用 CSS

### 3、Vite 静态资源引用

### 4、构建生产版本

### 5、环境变量和模式

### 6、腾讯云 Webify 项目部署

### 7、Vite 与 JAVA 后端集成
