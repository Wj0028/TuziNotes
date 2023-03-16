---
title: React18-hooks
icon: text
---

# 一、为什么使用 Hooks

## 1.1 回顾 React 复用组件的方法

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 [render props](https://zh-hans.reactjs.org/docs/render-props.html) 和 [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)。

### 1.1.1 高阶组件(hoc)

```js
// hooks/01-hoc/addProps.jsx

const addProps = (Comp) => {
	return (props) => {
		return <Comp {...props} title="hello"></Comp>;
	};
};

export default addProps;
```

```js
// hooks/01-hoc/hocComponent.jsx

import { Component } from 'react';

import addProps from './addProps';

class HocComponent extends Component {
	render() {
		return (
			<div>
				{this.props.title} - {this.props.name}
			</div>
		);
	}
}

export default addProps(HocComponent);
```

**高阶组件的缺点：**

-   难以溯源。如果原始组件 A 通过好几个 HOC 的构造，最终生成了组件 B，不知道哪个属性来自于哪个 HOC，需要翻看每个 HOC 才知道各自做了什么事情，使用了什么属性。

-   props 属性名的冲突。某个属性可能被多个 HOC 重复使用。

-   静态构建。新的组件是在页面构建之前生成，先有组件，后生成页面。

### 1.1.2 渲染属性(render props)

```js
// hooks/02-render-props/Parent.jsx

import React, { Component } from 'react';
import Child from './Child';

export default class Parent extends Component {
	state = {
		name: 'gp20',
	};

	renderFun = (title) => {
		return (
			<div>
				{title} {this.state.name}
			</div>
		);
	};

	render() {
		return <Child render={this.renderFun}></Child>;
	}
}
```

```js
// hooks/02-render-props/Child.jsx

import React, { Component } from 'react';

export default class Child extends Component {
	state = {
		title: 'hello',
	};

	render() {
		return <>{this.props.render(this.state.title)}</>;
	}
}
```

**相对高阶组件的优点：**

-   不用担心 props 的命名冲突的问题

-   可以溯源，子组件的 props 一定来自父组件。

-   是动态构建的，页面在渲染后，可以动态地决定渲染哪个组件。
-   所有能用 HOC 完成的事情，Render Props 都可以做，且更加灵活。
-   除了功能复用，还可以用作两个组件的单向数据传递。

**渲染函数和高阶组件共同的缺点：**

-   需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。

## 1.2 class 组件的问题

除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。如果不使用 [ES2022 public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields)，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。

```js
// 03-counter-sample/ClassCounter.jsx

import { Component } from 'react';

class Counter extends Component {
	state = {
		counter: 0,
	};

	handleClick = () => {
		this.setState((state) => ({
			counter: state.counter + 1,
		}));
	};

	render() {
		return (
			<>
				<div>{this.state.counter}</div>
				<button onClick={this.handleClick}>add</button>
			</>
		);
	}
}

export default Counter;
```

## 1.3 Hooks 的引入

为了解决这些问题，**Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

```js
// 03-counter-sample/HooksCounter.jsx

import React, { useState } from 'react';

export default function HooksCounter() {
	const [counter, setCounter] = useState(0);

	const handleClick = () => {
		setCounter(counter + 1);
	};

	return (
		<>
			<div>{counter}</div>
			<button onClick={handleClick}>add</button>
		</>
	);
}
```

现在，hooks 看上去也没有什么不同，只是少了几行代码而已。我们继续给类组件添加功能：

```js
// 03-counter-sample/ClassCounter.jsx

import { Component } from 'react';

class Counter extends Component {
	state = {
		counter: 0,
	};

	handleClick = () => {
		this.setState((state) => ({
			counter: state.counter + 1,
		}));
	};

	componentDidMount() {
		document.title = this.state.counter;
	}

	componentDidUpdate() {
		document.title = this.state.counter;
	}

	render() {
		return (
			<>
				<div>{this.state.counter}</div>
				<button onClick={this.handleClick}>add</button>
			</>
		);
	}
}

export default Counter;
```

再看看 Hooks 组件如何实现：

```js
// 03-counter-sample/HooksCounter.jsx

import React, { useState, useEffect } from 'react';

export default function HooksCounter() {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		document.title = counter;
	});

	const handleClick = () => {
		setCounter(counter + 1);
	};

	return (
		<>
			<div>{counter}</div>
			<button onClick={handleClick}>add</button>
		</>
	);
}
```

在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)和 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。再看一个例子。

```js
// hooks/04-custom-hooks/useCounter.js

import { useState } from 'react';

const useCounter = (defaultCounter) => {
	const [counter, setCounter] = useState(defaultCounter);

	const handleAddClick = () => {
		setCounter(counter + 1);
	};

	const handleDoubleClick = () => {
		setCounter(counter * 2);
	};

	return {
		counter,
		handleAddClick,
		handleDoubleClick,
	};
};

export default useCounter;
```

```js
// hooks/04-custom-hooks/useTitle.js

import { useEffect } from 'react';

const useTitle = (counter) => {
	useEffect(() => {
		document.title = counter;
	});
};

export default useTitle;
```

```jsx
// hooks/04-custom-hooks/Counter.js

import React from 'react';
import useCounter from './useCounter';
import useTitle from './useTitle';
import DoubleCounter from './DoubleCounter';

export default function HooksCounter() {
	const { counter, handleAddClick } = useCounter(0);
	useTitle(counter);

	return (
		<>
			<div>{counter}</div>
			<button onClick={handleAddClick}>add</button>

			<DoubleCounter></DoubleCounter>
		</>
	);
}
```

```js
// hooks/04-custom-hooks/DoubleCounter.js

import React from 'react';
import useCounter from './useCounter';
import useTitle from './useTitle';

export default function DoubleCounter() {
	const { counter, handleDoubleClick } = useCounter(1);
	useTitle(counter);

	return (
		<>
			<div>{counter}</div>
			<button onClick={handleDoubleClick}>double</button>
		</>
	);
}
```

## 1.4 不用担心

### 1.4.1 没有破坏性改动

在我们继续之前，请记住 Hook 是：

-   **完全可选的。** 你无需重写任何已有代码就可以在一些组件中尝试 Hook。
-   **100% 向后兼容的。** Hook 不包含任何破坏性改动。
-   **现在可用。** Hook 已发布于 v16.8.0。

**Hook 不会影响你对 React 概念的理解。** 恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。

### 1.4.2 渐进策略

**没有计划从 React 中移除 class。**

**最重要的是，Hook 和现有代码可以同时工作，你可以渐进式地使用他们。**

我们准备让 Hook 覆盖所有 class 组件的使用场景，但是**我们将继续为 class 组件提供支持。**在 Facebook，我们有成千上万的组件用 class 书写，我们完全没有重写它们的计划。相反，我们开始在新的代码中同时使用 Hook 和 class。

# 二、Hooks 逐个击破

## 2.1 useState

### 2.1.1 数组解构

```js
// hooks/05-useState/array-destructuring.js

const arr = [{ x: 100 }, { y: 200 }];
let [a, b] = arr;
console.log(a.x); // 100
console.log(b.y); // 200

const arr2 = [
	b,
	(args) => {
		b.y = args;
	},
];
const [state, setState] = arr2;
console.log(state); // { y: 200 }
setState(400);
console.log(b); // { y: 400 }
```

### 2.1.2 使用多个 state 变量

```js
// 声明多个 state 变量
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
```

如果你之前用过 class，你或许会试图总是在一次 `useState()` 调用中传入一个包含了所有 state 的对象。如果你愿意的话你可以这么做。这里有一个跟踪鼠标移动的组件的例子。我们在本地 state 中记录它的位置和尺寸：

```js
const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
```

**整合成一个例子：**

```jsx
// hooks/05-useState/MultipleState.jsx

import React, { useState, useEffect } from 'react';
import usePosition from './usePosition';

export default function MultipleState() {
	const [age, setAge] = useState(42);
	const [fruit, setFruit] = useState('banana');
	const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
	const { position } = usePosition();

	// const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });

	// const [position, setPosition] = useState({ left: 0, top: 0 });
	const [size, setSize] = useState({ width: 100, height: 100 });

	// useEffect (() => {
	//   function handleWindowMouseMove(e) {
	//     // 展开 「...state」 以确保我们没有 「丢失」 width 和 height
	//     // setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
	//     setPosition( position => ({ left: e.pageX, top: e.pageY }))
	//   }
	//   // 注意：这是个简化版的实现
	//   window.addEventListener('mousemove', handleWindowMouseMove)
	//   return () => window.removeEventListener('mousemove', handleWindowMouseMove)
	// }, [])

	return (
		<>
			<h1>
				{age} <button onClick={() => setAge(age + 1)}>change</button>
			</h1>
			<h1>{fruit}</h1>
			<h1>{JSON.stringify(todos)}</h1>
			{/* <h1>{ state.left } / { state.top }</h1>
      <h1>{ state.width } / { state.height }</h1> */}
			<h1>
				{position.left} / {position.top}
			</h1>
			<h1>
				{size.width} / {size.height}
			</h1>
		</>
	);
}
```

```js
// hooks/05-useState/usePosition.js

import { useState, useEffect } from 'react';

const usePosition = () => {
	const [position, setPosition] = useState({ left: 0, top: 0 });
	useEffect(() => {
		function handleWindowMouseMove(e) {
			setPosition((position) => ({ left: e.pageX, top: e.pageY }));
		}
		// 注意：这是个简化版的实现
		window.addEventListener('mousemove', handleWindowMouseMove);
		return () => window.removeEventListener('mousemove', handleWindowMouseMove);
	}, []);

	return {
		position,
	};
};

export default usePosition;
```

### 2.1.3 多状态声明的注意事项

```js
// hooks/05-useState/HooksRules.js

import React, { useState, useEffect } from 'react';
import usePosition from './usePosition';

export default function MultipleState() {
	let average = 30;

	// React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.
	if (average >= 30) {
		const [age, setAge] = useState(42);
		average = 35;
	}

	const [fruit, setFruit] = useState('banana');
	const [todos, setTodos] = useState([{ text: '学习 Hook' }]);

	return (
		<>
			<h1>
				{age} <button onClick={() => setAge(age + 1)}>change</button>
			</h1>
			<h1>{fruit}</h1>
			<h1>{JSON.stringify(todos)}</h1>
		</>
	);
}
```

> -   **不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。
>
> -   **只在 React 函数中调用 Hook，**不要在普通的 JavaScript 函数中调用 Hook。你可以：
>     -   在 React 的函数组件中调用 Hook
>     -   在自定义 Hook 中调用其他 Hook

## 2.2 useEffect

通过这个例子，我们将学到：

1. useEffect() 是个副作用函数。
2. useEffect() 函数在每次组件重新渲染时，可再次被调用。
3. 在开发环境中，开启了 React.StrictMode 模式，组件开始时被渲染两次。
4. useEffect() 通过返回函数来清理副作用。
5. useEffect() 通过传递第二个参数数组来提高渲染性能，或者说实现 watch 效果。

```jsx
// hooks/06-useEffect/Counter.jsx

import React, { useState, useEffect } from 'react';

export default function Counter() {
	const [counter, setCounter] = useState(0);
	const [title, setTitle] = useState('hello');

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log(counter);
		}, 1000);

		return () => {
			clearInterval(timer);
			console.log('组件被卸载了！');
		};
	});

	const handleAddClick = () => {
		setCounter(counter + 1);
	};

	const handleChangeTitle = () => {
		setTitle('world');
	};

	useEffect(() => {
		setCounter(50);
	}, []);

	useEffect(() => {
		console.log('title变化成：' + title);
	}, [title, counter]);

	return (
		<>
			<div>{counter}</div>
			<button onClick={handleAddClick}>add</button>
			<div>{title}</div>
			<button onClick={handleChangeTitle}>change</button>
		</>
	);
}
```

## 2.3 useRef

利用 `useRef` 就可以绕过 Capture Value 的特性。**可以认为** `ref` **在所有 Render 过程中保持着唯一引用，因此所有对** `ref` **的赋值或取值，拿到的都只有一个最终状态**，而不会在每个 Render 间存在隔离。

```jsx
// hooks/07-useRef/Temp.jsx

import React, { useState, useEffect, useRef } from 'react';

// const App = () => {
//   const [temp, setTemp] = React.useState(5);

//   const log = () => {
//     setTimeout(() => {
//       console.log("3 秒前 temp = 5，现在 temp =", temp);
//     }, 3000);
//   };

//   return (
//     <div
//       onClick={() => {
//         log();
//         setTemp(3);
//         // 3 秒前 temp = 5，现在 temp = 5
//       }}
//     >
//       xyz
//     </div>
//   );
// };

// export default App

function Temp() {
	// const [count, setCount] = useState(0);

	// useEffect(() => {
	//   document.title = `You clicked ${count} times`;
	// });

	const [count, setCount] = useState(0);
	const latestCount = useRef(count);

	useEffect(() => {
		// Set the mutable latest value
		latestCount.current = count;
		setTimeout(() => {
			// Read the mutable latest value
			console.log(`You clicked ${latestCount.current} times`);
		}, 3000);
	});

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

export default Temp;
```

可以利用 useRef 实现 componentDidUpdate。

```js
// hooks/06-useEffect/useUpdate.js

import { useEffect, useRef } from 'react';

const useUpdate = (fn) => {
	const mounted = useRef(false);
	useEffect(() => {
		if (mounted.current) {
			fn();
		} else {
			mounted.current = true;
		}
	});
};

export default useUpdate;
```

## 2.4 useReducer

useReducer 践行了 Flux/Redux 思想。使用步骤：

1、创建初始值 initialState

2、创建所有操作 reducer(state, action);

3、传给 userReducer，得到读和写 API

4、调用写 ({type: '操作类型'})

总的来说，useReducer 是 useState 的复杂版。

```jsx
// hooks/08-useReducer/ReducerDemo.jsx

import { useReducer } from 'react';

const defaultValue = {
	count: 0,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'add':
			return {
				count: state.count + 1,
			};
		case 'minus':
			return {
				count: state.count - 1,
			};

		default:
			throw new Error('unknown type');
	}
};

const ReducerDemo = () => {
	const [state, dispatch] = useReducer(reducer, defaultValue);

	return (
		<>
			<div>{state.count}</div>
			<button onClick={() => dispatch({ type: 'add' })}>add</button>
		</>
	);
};

export default ReducerDemo;
```

## 2.5 useContext

### 2.5.1 **使用方法**

1、使用 C = createContext(initial) 创建上下文

2、使用 <C.Provider> 圈定作用域

3、在作用域内使用 useContext(C)来使用上下文

```js
// hooks/09-useContext/contextCreator.js

import { createContext } from 'react';

const context = createContext(null);

export default context;
```

```jsx
// hooks/09-useContext/ContextDemo.js

import React, { useState } from 'react';
import Child1 from './Child1';
import Child2 from './Child2';
import context from './contextCreator';

export default function ContextDemo() {
	const [count, setCount] = useState(0);

	return (
		<context.Provider value={{ count, setCount }}>
			<h1>Parent</h1>
			<Child1></Child1>
			<Child2></Child2>
		</context.Provider>
	);
}
```

```jsx
// hooks/09-useContext/Child1.jsx

import React, { useContext } from 'react';
import context from './contextCreator';

export default function Child1() {
	const { count } = useContext(context);

	return <h1>Child1: {count}</h1>;
}
```

```jsx
// hooks/09-useContext/Child1.jsx

import React, { useContext } from 'react';
import context from './contextCreator';

export default function Child1() {
	const { count } = useContext(context);

	return <h1>Child1: {count}</h1>;
}
```

### 2.5.2 使用 useReducer 和 useContext 实现轻型 Redux

步骤：

1、将数据集中在一个 store 对象

2、将所有操作集中在 reducer

3、创建一个 Context

4、创建对数据的读取 API

5、将第四步的内容放到第三步的 Context

6、用 Context.Provider 将 Context 提供给所有组件

7、各个组件用 useContext 获取读写 API

```js
// books/10-liteRedux/data.js

const ajax = (path) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			switch (path) {
				case '/user':
					resolve({
						id: 1,
						name: 'Felixlu',
					});
					break;
				case '/books':
					resolve([
						{
							id: 1,
							name: 'JavaScript程序设计',
						},
						{
							id: 2,
							name: 'React深入浅出',
						},
					]);
					break;
				case '/movies':
					resolve([
						{
							id: 1,
							name: '人生大事',
						},
						{
							id: 2,
							name: '神探大战',
						},
					]);
					break;
				default:
			}
		}, 1000);
	});
};

export default ajax;
```

```js
// books/10-liteRedux/store.js

const store = {
	user: null,
	books: null,
	movies: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setUser':
			return {
				...state,
				user: action.user,
			};
		case 'setBooks':
			return {
				...state,
				books: action.books,
			};
		case 'setMovies':
			return {
				...state,
				movies: action.movies,
			};
		default:
			throw new Error('error');
	}
};

export { store, reducer };
```

```js
// books/10-liteRedux/contextCreator.js

import { createContext } from 'react';

const context = createContext(null);

export default context;
```

```jsx
// books/10-liteRedux/LiteReduxDemo.js

import React, { useReducer } from 'react';
import { store, reducer } from './store';
import context from './contextCreator';

import User from './User';
import Books from './Books';
import Movies from './Movies';

export default function LiteReduxDemo() {
	const [state, dispatch] = useReducer(reducer, store);

	const api = {
		state,
		dispatch,
	};

	return (
		<context.Provider value={api}>
			<User></User>
			<Books></Books>
			<Movies></Movies>
		</context.Provider>
	);
}
```

```jsx
// books/10-liteRedux/User.js

import React, { useEffect, useContext } from 'react';
import ajax from './data';
import context from './contextCreator';

export default function User() {
	const { state, dispatch } = useContext(context);

	useEffect(() => {
		ajax('/user').then((user) => {
			dispatch({
				type: 'setUser',
				user,
			});
		});
	}, [dispatch]);

	return <div>User：{state.user && state.user.name}</div>;
}
```

```jsx
// books/10-liteRedux/Books.js

import React, { useContext, useEffect } from 'react';
import context from './contextCreator';
import ajax from './data';

export default function Books() {
	const { state, dispatch } = useContext(context);

	useEffect(() => {
		ajax('/books').then((books) => {
			dispatch({
				type: 'setBooks',
				books,
			});
		});
	}, [dispatch]);

	return (
		<div>
			Books：
			{state.books &&
				state.books.map((book) => {
					return <span key={book.id}>{book.name}、</span>;
				})}
		</div>
	);
}
```

```jsx
// books/10-liteRedux/Movies.js

import React, { useContext, useEffect } from 'react';
import ajax from './data';
import context from './contextCreator';

export default function Movies() {
	const { state, dispatch } = useContext(context);

	useEffect(() => {
		(async () => {
			const movies = await ajax('/movies');
			dispatch({
				type: 'setMovies',
				movies,
			});
		})();
	});

	return (
		<div>
			Movies：
			{state.movies &&
				state.movies.map((movie) => {
					return <span key={movie.id}>{movie.name}、</span>;
				})}
		</div>
	);
}
```

## 2.6 useMemo & useCallback

### 2.6.1 React.memo()

先回顾一下 React.meno()：

```jsx
// hooks/11-useMemo/MemoDemo.jsx

import React, { useState } from 'react';
import Child from './Child';

export default function ReactMemo() {
	const [m, setM] = useState(0);
	const [n, setN] = useState(1);

	const handleChangeM = () => {
		setM(m + 1);
	};

	return (
		<>
			<button onClick={handleChangeM}>change m</button>
			<Child num={n}></Child>
		</>
	);
}
```

```js
// hooks/11-useMemo/Child.jsx

import React, { memo } from 'react';

export default memo(function Child(props) {
	console.log(0);
	return <div>Child Num：{props.num}</div>;
});
```

### 2.6.2 useMemo() & useCallback()

```jsx
// hooks/11-useMemo/MemoDemo.jsx
// with useMeno, useCallback

import React, { useState, useMemo, useCallback } from 'react';
import Child from './Child';

export default function MemoDemo() {
	const [m, setM] = useState(0);
	const [n, setN] = useState(1);

	const handleChangeM = () => {
		setM(m + 1);
	};

	// const handleClickChild = useMemo(() => {
	//   return () => {
	//     console.log(n)
	//   }
	// }, [n])

	// 相当于计算属性
	const doubleM = useMemo(() => {
		return m * 2;
	}, [m]);

	const handleClickChild = useCallback(() => {
		console.log(n);
	}, [n]);

	return (
		<>
			<div>{doubleM}</div>
			<button onClick={handleChangeM}>change m</button>
			<Child num={n} onClick={handleClickChild}></Child>
		</>
	);
}
```

## 2.7 useImperativeHandle

```jsx
// hooks/12-useImperativeHandle/ForwardRefDemo.jsx

import React, { useRef, forwardRef, useCallback } from 'react';

const Input = forwardRef((props, ref) => {
	return <input type="text" ref={ref} />;
});

export default function ForwardRefDemo() {
	const inputRef = useRef(null);

	const handleClick = useCallback(() => {
		inputRef.current.focus();
	}, []);

	return (
		<>
			<Input ref={inputRef}></Input>
			<button onClick={handleClick}>获取焦点</button>
		</>
	);
}
```

```jsx
// hooks/12-useImperativeHandle/UseImperativeHandleDemo.jsx

import React, { useRef, forwardRef, useCallback, useImperativeHandle } from 'react';

const Input = forwardRef((props, ref) => {
	const inputRef = useRef(null);

	useImperativeHandle(ref, () => {
		return {
			focus: () => {
				inputRef.current.focus();
			},
		};
	});

	return <input type="text" ref={inputRef} />;
});

export default function UseImperativeHanleDemo() {
	const inputRef = useRef(null);

	const handleClick = useCallback(() => {
		inputRef.current.focus();
	}, []);

	return (
		<>
			<Input ref={inputRef}></Input>
			<button onClick={handleClick}>获取焦点</button>
		</>
	);
}
```

上面这个例子中与直接转发 ref 不同，直接转发 ref 是将 React.forwardRef 中函数上的 ref 参数直接应用在了返回元素的 ref 属性上，其实父、子组件引用的是同一个 ref 的 current 对象，官方不建议使用这样的 ref 透传，而使用 useImperativeHandle 后，可以让父、子组件分别有自己的 ref，通过 React.forwardRef 将父组件的 ref 透传过来，通过 useImperativeHandle 方法来自定义开放给父组件的 current。

useImperativeHandle 的第一个参数是定义 current 对象的 ref，第二个参数是一个函数，返回值是一个对象，即这个 ref 的 current 对象，这样可以像上面的案例一样，通过自定义父组件的 ref 来使用子组件 ref 的某些方法。

useImperativeHandle 和 React.forwardRef 必须是配合使用的，这也是为什么在开头要介绍 ref 的转发。

## 2.8 useLayoutEffect

useLayoutEffect 与 useEffect 的区别：

-   `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
-   `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前

举个例子：

```jsx
import React, { useState, useLayoutEffect, useEffect } from 'react';

export default function UseLayoutEffectDemo() {
	const [state, setState] = useState('hello');

	useLayoutEffect(() => {
		let i = 0;
		while (i < 1000000000) {
			i++;
		}
		setState('world');
	}, []);

	return (
		<>
			<h1>{state}</h1>
		</>
	);
}
```

## 2.9 useDebugValue

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。

```jsx
// hooks/14-useDebugValue/UseDebugValueDemo.jsx

import React from 'react';
import useMyHook from './useMyHook';

export default function UseDebugValueDemo() {
	const { x } = useMyHook();
	return <h1>{x}</h1>;
}
```

```jsx
// hooks/14-useDebugValue/useMyHook.js

import { useDebugValue, useState } from 'react';

const useMyHook = () => {
	const [x, setX] = useState(0);

	useDebugValue('tag' + x);

	// useDebugValue(num, num => num + 1 )

	return {
		x: 100,
	};
};

export default useMyHook;
```

## 2.10 useId

```js
const id = useId();
```

`useId`是一个钩子，用于生成唯一的 ID，在服务器和客户端之间是稳定的，同时避免水化不匹配。

> 注意：
>
> `useId`不是用来生成列表中的键的。`Keys` 应该从你的数据中生成。

对于一个基本的例子，直接将 id 传递给需要它的元素。

```jsx
function Checkbox() {
	const id = useId();
	return (
		<>
			<label htmlFor={id}>Do you like React?</label>
			<input id={id} type="checkbox" name="react" />
		</>
	);
}
```

对于同一组件中的多个 ID，使用相同的 ID 附加一个后缀。

```jsx
function NameFields() {
	const id = useId();
	return (
		<div>
			<label htmlFor={id + '-firstName'}>First Name</label>
			<div>
				<input id={id + '-firstName'} type="text" />
			</div>
			<label htmlFor={id + '-lastName'}>Last Name</label>
			<div>
				<input id={id + '-lastName'} type="text" />
			</div>
		</div>
	);
}
```

> **注意：**
>
> `useId` 会生成一个包含 : token 的字符串。这有助于确保令牌是唯一的，但在 CSS 选择器或 API（如`querySelectorAll`）中不支持。
>
> `useId`支持一个`identifierPrefix`，以防止在多根应用程序中发生碰撞。要配置，请参阅 `hydrateRoot` 和 `ReactDOMServer `的选项。

## 2.11 useDeferredValue

```
const deferredValue = useDeferredValue(value);
```

`useDeferredValue` 需要接收一个值, 返回这个值的副本, 副本的更新会在值更新渲染之后进行更新, 以此来避免一些不必要的重复渲染. 打个比方页面中有输入框, 输入框下的内容依赖于输入框的值, 但是输入框是一个高频操作, 如果输入 10 次, 可能用户只想看到最终的结果那么中途的实时渲染就显得不那么重要了, 页面元素少点还好, 一旦元素过多页面就会及其的卡顿, 渲染引擎堵得死死的, 用户就会骂娘了, 此时使用 useDeferredValue 是一个很好的选择。

```jsx
// hooks/16-UseDeferredValue/UseDeferredValueDemo.jsx

import React, { useDeferredValue, useState, useMemo } from 'react';
import List from './List';

export default function UseDeferredValueDemo() {
	const [inpVal, setInpVal] = useState('');
	const deferredValue = useDeferredValue(inpVal);
	const memoList = useMemo(() => <List count={deferredValue}></List>, [deferredValue]);
	return (
		<>
			<h1>UseDeferredValue</h1>
			<input
				type="number"
				value={inpVal}
				max={200000}
				onChange={(e) => setInpVal(e.target.value)}
			/>
			{memoList}
		</>
	);
}
```

```jsx
// hooks/16-UseDeferredValue/List.jsx

import React, { useEffect, useState, memo } from 'react';

export default memo(function List({ count }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const data = [];
		data.length = +5000;
		for (let i = 0; i < data.length; i++) {
			data.fill(i + 1, i);
		}
		setData(data);
	}, [count]);

	return (
		<div>
			{data.map((item) => {
				return <p key={item}>{count}</p>;
			})}
		</div>
	);
});
```

另一个例子：

```tsx
import React, { useState, useEffect } from 'react';

const List = (props) => {
	const [list, setList] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setCount((count) => count + 1);
		setTimeout(() => {
			setList([
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
			]);
		}, 500);
	}, [props.text]);
	return [
		<p>{'我被触发了' + count + '次'}</p>,
		<ul>
			{list.map((item) => (
				<li>
					Hello:{item.name} value:{item.value}
				</li>
			))}
		</ul>,
	];
};

export default function App() {
	const [text, setText] = useState('喵爸');
	const deferredText = useDeferredValue(text, { timeoutMs: 2000 });

	const handleChange = (e) => {
		setText(e.target.value);
	};
	return (
		<div className="App">
			<input value={deferredText} onChange={handleChange} />
			<List text={text} />
		</div>
	);
}
```

和防抖动的区别：

```tsx
import React, { useState, useEffect, useDeferredValue } from 'react';
import { useDebounce } from 'ahooks';
const List = (props) => {
	const [list, setList] = useState([]);
	const [count, setCount] = useState(0);
	useEffect(() => {
		setCount((count) => count + 1);
		setTimeout(() => {
			setList([
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
				{ name: props.text, value: Math.random() },
			]);
		}, 500);
	}, [props.text]);
	return [
		<p>{'我被触发了' + count + '次'}</p>,
		<ul>
			{list.map((item) => (
				<li>
					Hello:{item.name} value:{item.value}
				</li>
			))}
		</ul>,
	];
};

export default function App() {
	const [text, setText] = useState('喵爸');
	const deferredText = useDeferredValue(text, { timeoutMs: 1000 });
	const debouncedValue = useDebounce(text, { wait: 1000 });
	const handleChange = (e) => {
		setText(e.target.value);
	};
	return (
		<div className="App">
			<input value={text} onChange={handleChange} />
			<List text={deferredText} />
			<List text={debouncedValue} />
		</div>
	);
}
```

## 2.12 useTransition

`useTransition` 又叫过渡, 他的作用就是标记非紧急更新, 这些被标记非紧急更新会在紧急更新完之后进行更新, `useTransition` 使用场景在应对渲染量很大的页面，需要及时响应某些事件的情况。

举个例子，准备一个进度条, 通过滑动进度条来显示进度条的进度并且渲染相同进度数量的 div, 如果我们不对渲染进行优化那无疑页面会很卡, 此时使用过渡配合 useMemo 来缓存页面结构, diffing 算法就会对比出少量的变化进行局部修改。

```jsx
import React, { useTransition, useState, useMemo } from 'react';

export default function UseTransition() {
	const [isPending, startTransition] = useTransition();

	const [rangeValue, setRangeValue] = useState(1);
	const [renderData, setRenderData] = useState([1]);
	const [isStartTransition, setIsStartTransition] = useState(false);

	const handleChange = (e) => {
		setRangeValue(e.target.value);
		const arr = [];
		arr.length = e.target.value;
		for (let i = 0; i <= arr.length; i++) {
			arr.fill(i, i + 1);
		}
		if (isStartTransition) {
			startTransition(() => {
				setRenderData(arr);
			});
		} else {
			setRenderData(arr);
		}
	};
	const jsx = useMemo(() => {
		return renderData.map((item, index) => {
			return (
				<div
					style={{
						width: 50,
						height: 50,
						backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
						margin: 10,
						display: 'inline-block',
					}}
					key={'item' + index}
				>
					{item}
				</div>
			);
		});
	}, [renderData]);
	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				<label>
					<input
						type="checkbox"
						checked={isStartTransition}
						onChange={(e) => {
							setIsStartTransition(e.target.checked);
						}}
					/>
					useTransition
				</label>
				<input
					type="range"
					value={rangeValue}
					min={0}
					max={10000}
					style={{ width: 120 }}
					onChange={handleChange}
				/>
				<span>进度条 {rangeValue}</span>
				<hr />
			</div>
			{jsx}
		</div>
	);
}
```

## 2.13 useSyncExternalStore

```js
const state = useSyncExternalStore(subscribe, getSnapshot);
```

React18 的 beta 版本将`useMutableSource`更新为了`useSyncExternalStore`，这个新的 api 将会对 React 的各种状态管理库产生非常大的影响，下面我来介绍`useSyncExternalStore`的用法和场景。

我们可以通过这个 api 自行设计一个 redux + react-redux 的数据方案：

**1、设计 store**

首先我们要设计一个 store，它必须有如下属性：

-   currentState:当前状态
-   subscribe:提供状态发生变化时的订阅能力
-   getSnapshot: 获取当前状态

以及改变 state 的方法，这里参考 redux，设计了 dispatch、reducer

```jsx
// hooks/18-useSyncExternalStore/store.js

const store = {
	currentState: { data: 0 },
	listeners: [],
	reducer(action) {
		switch (action.type) {
			case 'ADD':
				return { data: store.currentState.data + 1 };
			default:
				return store.state;
		}
	},
	subscribe(l) {
		store.listeners.push(l);
	},
	getSnapshot() {
		return store.currentState;
	},
	dispatch(action) {
		store.currentState = store.reducer(action);
		store.listeners.forEach((l) => l());
		return action;
	},
};
```

**2、应用 store 同步组件状态**

```jsx
// hooks/18-useSyncExternalStore/UseSyncExternalStoreDemo.jsx

import React, { useSyncExternalStore } from 'react';
import store from './store';

export default function UseSyncExternalStoreDemo() {
	const state = useSyncExternalStore(store.subscribe, () => store.getSnapshot().data);

	return (
		<div>
			<div>count: {state}</div>
			<div>
				<button onClick={() => store.dispatch({ type: 'ADD' })}>add+</button>
			</div>
		</div>
	);
}
```

## 2.14 useInsertionEffect

```jsx
useInsertionEffect(didUpdate);
```

`useInsertionEffect` 与 useLayoutEffect 相同，在所有 DOM 变更之前同步触发。在使用 useLayoutEffect 读取布局之前，使用这个函数将样式注入到 DOM 中。因为这个钩子的作用域是有限的，所以这个钩子不能访问 refs，也不能调度更新。

```jsx
import React, { useInsertionEffect, useEffect, useLayoutEffect } from 'react';

export default function UseInsertionEffect() {
	useInsertionEffect(() => {
		console.log('useInsertionEffect');
		// const style = document.createElement('style')
		// style.innerHTML = '.box { color: red }'
		// document.head.appendChild(style)
	});

	useEffect(() => {
		console.log('useEffect');
	});

	useLayoutEffect(() => {
		console.log('useLayoutEffect');
	});

	return <div className="box">UseInsertionEffect</div>;
}
```

~ The End ~
