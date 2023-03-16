---
title: Rtk
---

# 一、创建项目

## 1.1 构建项目，使用 TS

```sh
npx create-react-app admin-app --template typescript
```

**出现以下界面，表示项目创建成功：**

```shell
Creating a new React app in /Users/felixlu/Desktop/felixtrain/higo-admin.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...

added 1395 packages in 16s

Installing template dependencies using npm...

added 35 packages, and changed 1 package in 2s

We detected TypeScript in your project (src/App.test.tsx) and created a tsconfig.json file for you.

Your tsconfig.json has been populated with default values.

Removing template package using npm...

removed 1 package in 1s

Success! Created higo-admin at /Users/felixlu/Desktop/felixtrain/higo-admin
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd higo-admin
  npm start

Happy hacking!
```

**2、目录结构**

```
.
├── README.md
├── node_modules
│   ├── ...
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts // *.d.ts 代表ts的声明文件
│   ├── reportWebVitals.ts // 测试性能
│   └── setupTests.ts // 使用jest做为测试工具
└── tsconfig.json
```

# 二、手动初始化

## 2.1 添加 7 个文件夹

在 `src` 目录下添加 7 个文件夹。

```shell
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── api
│   ├── components
│   ├── index.css
│   ├── index.tsx
│   ├── layout
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── router
│   ├── setupTests.ts
│   ├── store
│   ├── utils
│   └── views
```

## 2.2 改造 App.tsx 文件

```tsx
import './App.css';

type AppProps = {};

function App(props: AppProps) {
	return <>hello App</>;
}

export default App;
```

# 三、安装项目模块

## 3.1 使用 craco

Create React App 配置覆盖是 create-react-app 的一个简单和可理解的配置层。

通过在你的应用程序根部添加一个单独的配置文件（如`craco.config.js`），获得 create-react-app 和自定义的所有好处，无需使用 "eject"，并自定义你的 eslint、babel、postcss 配置和更多。

你所要做的就是使用 create-react-app 创建你的应用程序，并定制配置文件。

### 3.1.1 安装

从 npm 安装最新版本的软件包。

```shell
$ yarn add @craco/craco
```

> 或者，你也可以安装最新的 alpha 版本。
>
> ```
> $ npm i @craco/craco@alpha
> ```
>
> 然而，你应该知道，这些版本是实验性的。

Create a `craco.config.js` file in the root directory and [configure CRACO](https://github.com/dilanx/craco/blob/master/packages/craco/README.md#configuration):

在项目根目录下创建一个 `craco.config.js` 配置 CRACO](https://github.com/dilanx/craco/blob/master/packages/craco/README.md#configuration):

```
higo-admin
├── node_modules
├── craco.config.js
└── package.json
```

在 `package.json` 文件的 `scripts` 部分更新对 `react-scripts` 的现有调用，以使用 `craco` CLI。

```json
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

### 3.1.2 配置

CRACO 是通过 `craco.config.ts`、`craco.config.js`、`.cracorc.ts`、`.cracorc.js` 或 `.cracorc` 文件，或 [ `package.json` 中指定的文件](https://github.com/dilanx/craco/blob/master/packages/craco/README.md#setting-a-custom-location-for-cracoconfigjs)来配置的。这个文件被分为几个部分，代表了构成默认创建 react 应用程序的主要部分。

如果同一目录下有多个配置文件，CRACO 将只使用一个。优先顺序是：

1. `package.json`
2. `craco.config.ts`
3. `craco.config.js`
4. `.cracorc.ts`
5. `.cracorc.js`
6. `.cracorc`

#### 3.1.2.1 配置文件

下面是一个 CRACO 配置文件的样本。你的最终配置文件将比这个样本短得多。请参阅 [Recipes](https://github.com/sharegate/craco/tree/master/recipes) 中的 CRACO 配置示例。

有一个模式属性，当它可用时，有两个可能的值：

-   `extends`：提供的配置将延伸 CRA 的设置（默认模式）
-   `file`：CRA 的设置将被重置，你将为该插件提供一个官方的配置文件（[postcss](https://github.com/michael-ciniawsky/postcss-load-config#postcssrc), [eslint](https://eslint.org/docs/user-guide/configuring#configuration-file-formats)），该文件将取代任何设置。

```js
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');

module.exports = {
	reactScriptsVersion: 'react-scripts' /* (默认值) */,
	style: {
		modules: {
			localIdentName: '',
		},
		css: {
			loaderOptions: {
				/* 一些 css-loader 配置选项: https://github.com/webpack-contrib/css-loader. */
			},
			loaderOptions: (cssLoaderOptions, { env, paths }) => {
				return cssLoaderOptions;
			},
		},
		sass: {
			loaderOptions: {
				/* 一些 sass-loader 配置选项: https://github.com/webpack-contrib/sass-loader. */
			},
			loaderOptions: (sassLoaderOptions, { env, paths }) => {
				return sassLoaderOptions;
			},
		},
		postcss: {
			mode: 'extends' /* (默认值) */ || 'file',
			plugins: [require('plugin-to-append')], // 在一个数组中给出的额外插件被追加到现有的配置中。
			plugins: (plugins) => [require('plugin-to-prepend')].concat(plugins), // 或者你可以使用函数变体。
			env: {
				autoprefixer: {
					/* 任何 autoprefixer 选项: https://github.com/postcss/autoprefixer#options */
				},
				stage: 3 /* 任何 valid stages: https://cssdb.org/#staging-process. */,
				features: {
					/* 任何 CSS features: https://preset-env.cssdb.org/features. */
				},
			},
			loaderOptions: {
				/* 任何 postcss-loader 配置选项: https://github.com/postcss/postcss-loader. */
			},
			loaderOptions: (postcssLoaderOptions, { env, paths }) => {
				return postcssLoaderOptions;
			},
		},
	},
	eslint: {
		enable: true /* (默认值) */,
		mode: 'extends' /* (默认值) */ || 'file',
		configure: {
			/* 任何 eslint 配置选项: https://eslint.org/docs/user-guide/configuring */
		},
		configure: (eslintConfig, { env, paths }) => {
			return eslintConfig;
		},
		pluginOptions: {
			/* 任何 eslint 插件配置选项: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
		},
		pluginOptions: (eslintOptions, { env, paths }) => {
			return eslintOptions;
		},
	},
	babel: {
		presets: [],
		plugins: [],
		loaderOptions: {
			/* 任何 babel-loader 配置选项: https://github.com/babel/babel-loader. */
		},
		loaderOptions: (babelLoaderOptions, { env, paths }) => {
			return babelLoaderOptions;
		},
	},
	typescript: {
		enableTypeChecking: true /* (默认值)  */,
	},
	webpack: {
		alias: {},
		plugins: {
			add: [] /* 任何插件数组 */,
			add: [
				plugin1,
				[plugin2, 'append'],
				[plugin3, 'prepend'] /* 指定插件是否应该被添加或预添加 */,
			] /* An array of plugins */,
			remove: [] /* 一个插件构造器名称的数组 (比如 "StyleLintPlugin", "ESLintWebpackPlugin" ) */,
		},
		configure: {
			/* 任何 webpack 配置选项: https://webpack.js.org/configuration */
		},
		configure: (webpackConfig, { env, paths }) => {
			return webpackConfig;
		},
	},
	jest: {
		babel: {
			addPresets: true /* (默认值) */,
			addPlugins: true /* (默认值) */,
		},
		configure: {
			/* 任何 Jest 配置选项: https://jestjs.io/docs/en/configuration */
		},
		configure: (jestConfig, { env, paths, resolve, rootDir }) => {
			return jestConfig;
		},
	},
	devServer: {
		/* 任何 devServer 配置选项: https://webpack.js.org/configuration/dev-server/#devserver */
	},
	devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
		return devServerConfig;
	},
	plugins: [
		{
			plugin: {
				overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => {
					return cracoConfig;
				},
				overrideWebpackConfig: ({
					webpackConfig,
					cracoConfig,
					pluginOptions,
					context: { env, paths },
				}) => {
					return webpackConfig;
				},
				overrideDevServerConfig: ({
					devServerConfig,
					cracoConfig,
					pluginOptions,
					context: { env, paths, proxy, allowedHost },
				}) => {
					return devServerConfig;
				},
				overrideJestConfig: ({
					jestConfig,
					cracoConfig,
					pluginOptions,
					context: { env, paths, resolve, rootDir },
				}) => {
					return jestConfig;
				},
			},
			options: {},
		},
	],
};
```

yarn add ts-node @types/node typescript

## 3.2 在 create-react-app 中使用 Ant Design

### 3.2.1 安装和初始化

现在从 yarn 或 npm 安装并引入 antd。

```
yarn add antd
```

修改 `src/App.js`，引入 antd 的按钮组件。

```jsx
import { Button } from 'antd';

type AppProps = {};

function App(props: AppProps) {
	return (
		<>
			<Button type="primary">Button</Button>
		</>
	);
}

export default App;
```

修改 `src/App.css`，在文件顶部引入 `antd/dist/antd.css`。

```jsx
@import '~antd/dist/antd.css';
```

好了，现在你应该能看到页面上已经有了 antd 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 create-react-app 的[官方文档](https://create-react-app.dev/docs/getting-started)。

我们现在已经把 antd 组件成功运行起来了，开始开发你的应用吧！

### 3.2.2 自定义主题

按照 [配置主题](https://ant.design/docs/react/customize-theme-cn) 的要求，自定义主题需要用到类似 [less-loader](https://github.com/webpack-contrib/less-loader/) 提供的 less 变量覆盖功能。我们可以引入 [craco-less](https://github.com/DocSpring/craco-less) 来帮助加载 less 样式和修改变量。

首先把 `src/App.css` 文件修改为 `src/App.less`，然后修改样式引用为 less 文件。

```diff
/* src/App.js */
- import './App.css';
+ import './App.less';
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
```

然后安装 `craco-less` 并修改 `craco.config.js` 文件如下。

```bash
$ yarn add craco-less
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，变量和其他配置方式可以参考 [配置主题](https://ant.design/docs/react/customize-theme-cn) 文档。修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

antd 内建了深色主题和紧凑主题，你可以参照 [使用暗色主题和紧凑主题](https://ant.design/docs/react/customize-theme-cn#使用暗色主题和紧凑主题) 进行接入。

> 同样，你可以使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) 和 [customize-cra](https://github.com/arackaf/customize-cra) 来自定义 create-react-app 的 webpack 配置。

## 3.3 安装状态管理器

根据项目需求任选其一即可

```
$ yarn add redux react-redux -S
$ yarn add redux react-redux redux-thunk -S
```

> 本项目不采用之前的状态管理模式，使用 rtk 技术：
>
> ```
> yarn add @reduxjs/toolkit redux react-redux redux-devtools -S
> ```

## 3.3 安装路由

2021 年 11 月 4 日 发布了 react-router-dom 的 v6 版本：https://reactrouter.com/

如需使用 v5 版本：https://v5.reactrouter.com/web/guides/quick-start `yarn add react-router-dom@5 -S`

> 本项目采用 V6 版本

```
yarn add react-router-dom -S
```

## 3.4 数据验证

> 思考，有没有必要安装 prop-types ?
>
> ```
> yarn add prop-types -S
> ```
>
> 本项目其实没有必要安装，因为所有的数据都是基于 ts，而 ts 需要指定类型注解

## 3.5 数据请求

```
yarn add axios -S
yarn add @types/axios -S
```

> 以前版本中需要 yarn add @types/axios -S
>
> Ts 中 @types/\* 为声明文件

## 3.6 第三方工具包

```
yarn add lodash -S
yarn add @types/lodash -S
```

Lodash 工具包，项目必装，它提供了很多实用的函数。

# 四、创建主布局文件

src/layout/Index.tsx 作为后台管理系统的主页面布局(包含左侧的菜单栏，顶部，底部等)。

https://ant-design.gitee.io/components/layout-cn/#components-layout-demo-custom-trigger

> 不要照着代码敲，直接复制即可，给 Layout 组件添加 id 为 `components-layout-demo-custom-trigger`

```tsx
// src/layout/Index.tsx
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout id="components-layout-demo-custom-trigger">
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <UserOutlined />,
							label: 'nav 1',
						},
						{
							key: '2',
							icon: <VideoCameraOutlined />,
							label: 'nav 2',
						},
						{
							key: '3',
							icon: <UploadOutlined />,
							label: 'nav 3',
						},
					]}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{
						padding: 0,
					}}
				>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed),
					})}
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}
				>
					Content
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
```

主组件引入主界面的布局文件：

```tsx
// src/App.tsx
import Layout from './layout/Index';

type Props = {};

function App(props: Props) {
	return <Layout></Layout>;
}

export default App;
```

查看浏览器，预览运行结果，发现页面并不是全屏。审查元素设置 root 以及 components-layout-demo-custom-trigger 高度为 100%。

编辑 `src/index.css`文件：

```css
#root {
	height: 100%;
}
```

在 `layout` 目录下创建 `Index.less` 文件，编辑内容：

```css
// src/layout/Index.less
#components-layout-demo-custom-trigger .trigger {
	padding: 0 24px;
	font-size: 18px;
	line-height: 64px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
	background: #fff;
}

.ant-layout {
	height: 100%;
}
```

# 五、拆分主界面

## 5.1 左侧菜单

```tsx
// src/layout/components/LayoutSideBar.tsx 左侧菜单栏组件

import React, { useState } from 'react';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';

const { Sider } = Layout;

type LayoutSideBarProps = {};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	const [collapsed] = useState(false);

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={[
					{
						key: '1',
						icon: <UserOutlined />,
						label: 'nav 1',
					},
					{
						key: '2',
						icon: <VideoCameraOutlined />,
						label: 'nav 2',
					},
					{
						key: '3',
						icon: <UploadOutlined />,
						label: 'nav 3',
					},
				]}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

## 5.2 头部

```tsx
// src/layout/components/LayoutHeader.tsx 头部组件

import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

type LayoutHeaderProps = {};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => setCollapsed(!collapsed),
			})}
		</Header>
	);
};

export default LayoutHeader;
```

## 5.3 内容

```tsx
// src/layout/components/LayoutContent.tsx 内容组件

import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

type LayoutContentProps = {};

const LayoutContent: React.FC = (props: LayoutContentProps) => {
	return (
		<Content
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
			}}
		>
			Content
		</Content>
	);
};

export default LayoutContent;
```

## 5.4 主界面

```tsx
// src/layout/Index.tsx 主界面结构

import React from 'react';
import { Layout } from 'antd';
import './Index.less';

import LayoutSideBar from './components/LayoutSideBar';
import LayoutHeader from './components/LayoutHeader';
import LayoutContent from './components/LayoutContent';

const App: React.FC = () => {
	return (
		<Layout id="components-layout-demo-custom-trigger">
			<LayoutSideBar></LayoutSideBar>
			<Layout className="site-layout">
				<LayoutHeader></LayoutHeader>
				<LayoutContent></LayoutContent>
			</Layout>
		</Layout>
	);
};

export default App;
```

## 5.5 组件引入优化

思考：主界面结构中如果有多次引入子组件，如何优化写法？

Step1: 在 `src/layout/components/ `创建 `index.ts` 文件，统一导出模块：

```tsx
// src/layout/components/index.ts 组件导出优化

// 高端写法：在js中也同样适用，引入时同时暴露出去
export { default as LayoutHeader } from './LayoutHeader';
export { default as LayoutSideBar } from './LayoutSideBar';
export { default as LayoutContent } from './LayoutContent';

// 普通写法：先引入，再统一暴露
/* import LayoutHeader from "./LayoutHeader"
import LayoutSideBar from "./LayoutSideBar"
import LayoutContent from "./LayoutContent"
export {
  LayoutHeader,
  LayoutSideBar,
  LayoutContent
} */
```

Step2：在 `src/layout/Index.tsx` 统一导入模块：

```js
// src/layout/Index.tsx 主界面结构

import React from 'react';
import { Layout } from 'antd';
import './Index.less';

import { LayoutHeader, LayoutSideBar, LayoutContent } from './components';

const App: React.FC = () => {
	return (
		<Layout id="components-layout-demo-custom-trigger">
			<LayoutSideBar></LayoutSideBar>
			<Layout className="site-layout">
				<LayoutHeader></LayoutHeader>
				<LayoutContent></LayoutContent>
			</Layout>
		</Layout>
	);
};

export default App;
```

此时点击头部的控制器，发现只有头部组件的图标在切换，但是并没有影响左侧菜单的收缩。建议使用状态管理器管理控制这个状态。

# 六、使用 RTK 来管理状态

## 6.1 RTK 使用文档

RTK 中文链接：http://cn.redux.js.org/

RTK 参考链接：http://cn.redux.js.org/tutorials/typescript-quick-start

## 6.2 创建 store

[Redux Toolkit's `configureStore` API](https://redux-toolkit.js.org/api/configureStore) 不需要任何额外的类型。 但是，你需要提取 `RootState` 类型和 `Dispatch` 类型。以便可以根据需要引用它们。从 store 本身推断这些类型，意味着它们会随着你添加更多 state slices 或修改 middleware 设置而正确更新。

因为有了这些是类型定义，可以安全地直接从你的 store 设置文件（例如 `app/store/index.ts`）导出它们，然后将它们直接导入其他文件。

```ts
// src/store/index.ts 状态管理器  定义根状态和调度
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {},
});

// ReturnValue 是TS的语法
// 返回某个值
// RootState 定义了一个 RTK 的状态的基本类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

> 构建 app 的模块用于管理 头部和 左侧菜单的共同的状态

## 6.3 定义 Hooks 类型

尽管你可以将 `RootState` 和 `AppDispatch` 类型导入每个组件, **更好的方式是创建 `useDispatch` 和 `useSelector` 钩子的类型定义，以便在你的应用程序中使用** 有几个重要的原因：

-   对于 `useSelector` ，它不需要你每次输入`(state: RootState)`
-   对于 `useDispatch` ，默认的 Dispatch 类型不知道 thunk 。为了正确调度 thunk ，你需要使用 store 中包含 thunk 中间件类型的特定自定义 `AppDispatch` 类型，并将其与 `useDispatch` 一起使用。添加一个预先输入的 `useDispatch` 钩子可以防止你忘记在需要的地方导入 `AppDispatch`。

由于这些是实际变量，而不是类型，因此将它们定义在单独的文件中很重要，例如 `app/hooks.ts`，而不是 store 设置文件。这允许你将它们导入到需要使用挂钩的任何组件文件中，并避免潜在的循环导入依赖问题。

```ts
// src/store/hooks.ts
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 6.4 创建 collapsedSlice 模块

```ts
// src/store/modules/layout.ts
import { createSlice } from '@reduxjs/toolkit';

interface LayoutState {
	collapsed: boolean;
}

const initialState: LayoutState = {
	collapsed: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		changeCollapsed(state) {
			// Emmer.js Immutable.js
			state.collapsed = !state.collapsed;
		},
	},
});

export const { changeCollapsed } = layoutSlice.actions;
export default layoutSlice.reducer;
```

## 6.5 在 store 上挂载模块

```ts
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import layout from './modules/layout';

const store = configureStore({
	reducer: {
		layout,
	},
});

// ReturnValue 是TS的语法
// 返回某个值
// RootState 定义了一个 RTK 的状态的基本类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

## 6.6 将 store 注册到根组件

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import './index.less';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
```

## 6.7 读取 collapsed 状态

```tsx
// src/layout/components/LayoutSideBar.tsx 左侧菜单栏组件

import React from 'react';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';

const { Sider } = Layout;

type LayoutSideBarProps = {};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={[
					{
						key: '1',
						icon: <UserOutlined />,
						label: 'nav 1',
					},
					{
						key: '2',
						icon: <VideoCameraOutlined />,
						label: 'nav 2',
					},
					{
						key: '3',
						icon: <UploadOutlined />,
						label: 'nav 3',
					},
				]}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

## 6.8 设置 collapsed 状态

```tsx
// src/layout/components/LayoutHeader.tsx 头部组件

import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { changeCollapsed } from '../../store/modules/layout';

const { Header } = Layout;

type LayoutHeaderProps = {};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const collapsed = useAppSelector((state) => state.layout.collapsed);
	const dispatch = useAppDispatch();

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => dispatch(changeCollapsed()),
			})}
		</Header>
	);
};

export default LayoutHeader;
```

## 6.9 永久存储 collapsed 状态

此时发现，头部的按钮可以控制左侧菜单栏了，但是刷新页面后，菜单的折叠状态并没有保存，可以通过本地存储来实现。这里给大家推荐一个好用的 localStorage 操作工具：[store2](https://github.com/nbubna/store)

```shell
yarn add store2 -S
```

-   **修改 LayoutHeader 组件**

在提交 collapsed 状态更新之前，对它做本地的永久存储

```jsx
// src/layout/components/LayoutHeader.tsx
import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { changeCollapsed } from '../../store/modules/layout';

const { Header } = Layout;

type LayoutHeaderProps = {};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const collapsed = useAppSelector((state) => state.layout.collapsed);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(changeCollapsed());
	};

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: handleClick,
			})}
		</Header>
	);
};

export default LayoutHeader;
```

-   **修改 store 的 layout.ts 切片**

从 localstorage 里读取状态，初始化 collapsed 的值。

```jsx
// src/store/modules/layout.ts
import { createSlice } from '@reduxjs/toolkit';
import store from 'store2';

interface LayoutState {
	collapsed: boolean;
}

const initialState: LayoutState = {
	collapsed: store.get('layout-storage') || false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		changeCollapsed(state) {
			// Emmer.js Immutable.js
			state.collapsed = !state.collapsed;

			// 永久存储 collapsed 状态
			store.set('layout-storage', state.collapsed);
		},
	},
});

export const { changeCollapsed } = layoutSlice.actions;
export default layoutSlice.reducer;
```

# 七、左侧菜单栏

## 7.1 antd 官方文档

官网文档：

https://ant-design.gitee.io/components/menu-cn/#components-menu-demo-sider-current

> Antd 4.20 以上版本直接实现递归
>
> antd 4.20 版本以下需要手动实现

## 7.2 设计左侧菜单栏的数据

```ts
// src/router/menu.tsx

import {
	UploadOutlined,
	HomeOutlined,
	SwitcherOutlined,
	ReconciliationOutlined,
	GiftOutlined,
	HeartOutlined,
	FilterOutlined,
	TeamOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';

export interface IMenuProps {
	label: string;
	icon?: any;
	key: string;
	children?: IMenuProps[];
}

const menus: IMenuProps[] = [
	{
		label: '系统首页',
		icon: <HomeOutlined />,
		key: '/', // 需要跳转的链接其实就是唯一表示
	},
	{
		label: '轮播图管理',
		icon: <UploadOutlined />,
		key: '/banner',
		children: [
			{
				label: '首页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/home',
			},
			{
				label: '活动页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/active',
			},
		],
	},
	{
		label: '产品管理',
		icon: <GiftOutlined />,
		key: '/pro',
		children: [
			{
				label: '产品列表',
				icon: <ReconciliationOutlined />,
				key: '/pro/list',
				children: [
					{
						label: '首页产品列表',
						icon: <HeartOutlined />,
						key: '/pro/list/home',
					},
					{
						label: '详情推荐列表',
						icon: <HeartOutlined />,
						key: '/pro/list/detail',
					},
				],
			},
			{
				label: '筛选列表',
				icon: <FilterOutlined />,
				key: '/pro/search',
			},
		],
	},
	{
		label: '账户管理',
		icon: <TeamOutlined />,
		key: '/account',
		children: [
			{
				label: '用户列表',
				icon: <UserOutlined />,
				key: '/account/userlist',
			},
			{
				label: '管理员列表',
				icon: <UserOutlined />,
				key: '/account/adminlist',
			},
		],
	},
	{
		label: '设置',
		icon: <SettingOutlined />,
		key: '/setting',
	},
];

export default menus;
```

## 7.3 渲染左侧菜单栏

```tsx
// src/layout/components/LayoutSideBar.tsx 左侧菜单栏组件

import React from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';

import menus from '../../router/menu';

const { Sider } = Layout;

type LayoutSideBarProps = {};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus} />
		</Sider>
	);
};

export default LayoutSideBar;
```

## 7.4 低版本处理

以上菜单项的设置在 `antd 4.20.0` 版本以上好使，如果在 `antd 4.20.0` 版本以下，应该使用递归组件实现。

```tsx
// src/layout/components/LayoutSideBar.tsx 左侧菜单栏组件

import React from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';

import menus, { IMenuProps } from '../../router/menu';

const { Sider } = Layout;

type LayoutSideBarProps = {};

// 菜单的渲染属性
const renderMenu = (menus: IMenuProps[]) => {
	return menus.map((item: IMenuProps) => {
		if (item.children) {
			return (
				<Menu.SubMenu title={item.label} icon={item.icon} key={item.key}>
					{renderMenu(item.children)}
				</Menu.SubMenu>
			);
		} else {
			return (
				<Menu.Item key={item.key} icon={item.icon}>
					{item.label}
				</Menu.Item>
			);
		}
	});
};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				{renderMenu(menus)}
			</Menu>
		</Sider>
	);
};

export default LayoutSideBar;
```

## 7.5 菜单渲染优化

如果左侧菜单栏数据过于庞大，每个管理项里又有很多项，需要只展开一个菜单项。

```tsx
import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';

import menus, { IMenuProps } from '../../router/menu';

const { Sider } = Layout;

type LayoutSideBarProps = {};

// 设置包含有二级菜单的数据
const rootSubmenuKeys: string[] = [];

menus.forEach((item) => {
	if (item.children) {
		rootSubmenuKeys.push(item.key);
	}
});

// 菜单的渲染属性
const renderMenu = (menus: IMenuProps[]) => {
	return menus.map((item: IMenuProps) => {
		if (item.children) {
			return (
				<Menu.SubMenu title={item.label} icon={item.icon} key={item.key}>
					{renderMenu(item.children)}
				</Menu.SubMenu>
			);
		} else {
			return (
				<Menu.Item key={item.key} icon={item.icon}>
					{item.label}
				</Menu.Item>
			);
		}
	});
};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	// 设置菜单项的展开项
	const [openKeys, setOpenKeys] = useState(['sub1']);

	// 打开其中一个菜单项时，需要做判断
	const onOpenChange = (keys: string[]) => {
		const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
			>
				{renderMenu(menus)}
			</Menu>
		</Sider>
	);
};

export default LayoutSideBar;
```

# 八、定义路由

## 8.1 路由官方文档

https://reactrouter.com/

## 8.2 创建对应的页面

```shell
├── src
│   ├── ...
│   └── views
│       ├── banner
│       │   ├── Active.tsx #活动页轮播图
│       │   ├── Index.tsx #轮播图页面
│       │   └── List.tsx #首页轮播图
│       ├── home
│       │   └── Index.tsx #系统首页
│       ├── product
│       │   ├── Filter.tsx #筛选列表
│       │   ├── Index.tsx #产品页面
│       │   └── List.tsx #产品列表
│       ├── setting
│       │   └── Index.tsx #设置页面
│       └── user
│           ├── AdminList.tsx #管理员列表
│           ├── Index.tsx #账户页面
│           └── UserList.tsx #用户列表
```

页面内容如下：

```tsx
// src/views/home/Index.tsx

type IndexProps = {};

export const Index = (props: IndexProps) => <div>系统首页</div>;
```

```tsx
// src/views/banner/Index.tsx

type IndexProps = {};

export const Index = (props: IndexProps) => (
	<div>
		<h1>轮播图管理</h1>
	</div>
);
```

```tsx
// src/views/banner/List.tsx

type ListProps = {};

export const List = (props: ListProps) => <div>首页轮播图</div>;
```

```tsx
// src/views/banner/Active.tsx

type ActiveProps = {};

export const Active = (props: ActiveProps) => <div>活动页轮播图</div>;
```

```tsx
// src/views/product/Index.tsx

type IndexProps = {};

export const Index = (props: IndexProps) => <h1>产品管理</h1>;
```

```tsx
// src/views/product/List.tsx

type ListProps = {};

export const List = (props: ListProps) => <div>产品列表</div>;
```

```tsx
// src/views/product/Filter.tsx

type FilterProps = {};

export const Filter = (props: FilterProps) => <div>筛选列表</div>;
```

```tsx
// src/views/user/Index.tsx
import { Outlet } from 'react-router-dom'; //+++
type IndexProps = {};

export const Index = (props: IndexProps) => (
	<div>
		<h1>账户列表</h1>
		<Outlet></Outlet> //+++
	</div>
);
```

```tsx
// src/views/user/UserList.tsx

type UserListProps = {};

export const UserList = (props: UserListProps) => <div>用户列表</div>;
```

```tsx
// src/views/user/AdminList.tsx

type AdminListProps = {};

export const AdminList = (props: AdminListProps) => <div>管理员列表</div>;
```

```tsx
// src/views/set/Setting.tsx

type IndexProps = {};

export const Index = (props: IndexProps) => <div>设置</div>;
```

有了二级菜单，能想到的就是使用嵌套路由。参照下面文档：

https://reactrouter.com/docs/en/v6/getting-started/overview#index-routes

## 8.3 定义菜单路由信息

V6 的路由通过 element 属性来定义匹配的组件。因此在 menus 里可以先定义一个 element 属性，值为组件的引用。

```ts
// src/router/menus.tsx
import React from 'react';

import {
	UploadOutlined,
	HomeOutlined,
	SwitcherOutlined,
	ReconciliationOutlined,
	GiftOutlined,
	HeartOutlined,
	FilterOutlined,
	TeamOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';

import { Index as Home } from '@/views/home/Index';

import { Index as Banner } from '@/views/banner/Index';
import { List as BannerList } from '@/views/banner/List';
import { Active as BannerActive } from '@/views/banner/Active';

import { Index as Pro } from '@/views/product/Index';
import { List as ProList } from '@/views/product/List';
import { Filter as ProFilter } from '@/views/product/Filter';

import { Index as User } from '@/views/user/Index';
import { UserList } from '@/views/user/UserList';
import { AdminList } from '@/views/user/AdminList';

import { Index as Setting } from '@/views/setting/Index';

export interface IMenuProps {
	label: string;
	icon?: any;
	key: string;
	children?: IMenuProps[];
	element: React.ReactNode;
}

const menus: IMenuProps[] = [
	{
		label: '系统首页',
		icon: <HomeOutlined />,
		key: '/', // 需要跳转的链接其实就是唯一表示
		element: <Home />,
	},
	{
		label: '轮播图管理',
		icon: <UploadOutlined />,
		key: '/banner',
		element: <Banner />,
		children: [
			{
				label: '首页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/home',
				element: <BannerList />,
			},
			{
				label: '活动页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/active',
				element: <BannerActive />,
			},
		],
	},
	{
		label: '产品管理',
		icon: <GiftOutlined />,
		key: '/pro',
		element: <Pro />,
		children: [
			{
				label: '产品列表',
				icon: <ReconciliationOutlined />,
				key: '/pro/list',
				element: <ProList />,
				children: [
					{
						label: '首页产品列表',
						index: true,
						icon: <HeartOutlined />,
						key: '/pro/list/home',
						element: <div>首页产品列表</div>,
					},
					{
						label: '详情推荐列表',
						icon: <HeartOutlined />,
						key: '/pro/list/detail',
						element: <div>详情推荐列表</div>,
					},
				],
			},
			{
				label: '筛选列表',
				icon: <FilterOutlined />,
				key: '/pro/filter',
				element: <ProFilter />,
			},
		],
	},
	{
		label: '账户管理',
		icon: <TeamOutlined />,
		key: '/account',
		element: <User />,
		children: [
			{
				label: '用户列表',
				icon: <UserOutlined />,
				key: '/account/userlist',
				element: <UserList />,
			},
			{
				label: '管理员列表',
				icon: <UserOutlined />,
				key: '/account/adminlist',
				element: <AdminList />,
			},
		],
	},
	{
		label: '设置',
		icon: <SettingOutlined />,
		key: '/setting',
		element: <Setting />,
	},
];

export default menus;
```

## 8.4 craco 配置路径别名

第一步：在 craco.config.ts 中添加 webpack 配置：

```tsx
const CracoLessPlugin = require('craco-less');
const { resolve } = require('path');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#1DA57A' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],

	// webpack alias 配置
	webpack: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
};

// 使他成为一个模块，不然会报错。
export {};
```

第二步：为了使 TS 文件引入时的别名路径能够正常解析，需要配置 `tsconifg.json`，在 `compilerOptions`选项里添加 path 等属性。为了防止配置被覆盖，需要单独创建一个文件 `tsconfig.path.json`，添加以下代码：

```json
// /tsconfig.path.json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

第三步：在 `tsconifg.json` 引入配置文件：

```json
// /tsconfig.json
{
	"compilerOptions": {
		"target": "es5",
		"lib": ["dom", "dom.iterable", "esnext"],
		"allowJs": true,
		"skipLibCheck": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx"
	},
	"extends": "./tsconfig.path.json", //+++
	"include": ["src"]
}
```

第四步：重新启动应用，就可以通过 `/@/...` 这种绝对路径的方式加载模块了。

## 8.5 装载路由

在根组件定义 `BrowserRouter`：

```tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## 8.6 定义路由组件

在 `menu.ts` 里定义好路由的请求路径（通过 key）和路径对应的组件（通过 element）信息以后，剩下的任务就是定义路由组件了。

我们知道，组件的内容是要在内容区域渲染的，因此，路由组件需要定义在 `LayoutContent.tsx` 文件里：

```tsx
// src/layout/components/LayoutContent.tsx

import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import menus, { IMenuProps } from '@/router/menu';

const { Content } = Layout;

type LayoutContentProps = {};

const renderRoute = (menus: IMenuProps[]) => {
	return menus.map((item) => {
		// 如果存在子路由组件，继续递归渲染
		if (item.children) {
			return (
				<Route key={item.key} path={item.key} element={item.element}>
					{renderRoute(item.children)}
				</Route>
			);
		} else {
			return <Route key={item.key} path={item.key} element={item.element} />;
		}
	});
};

const LayoutContent: React.FC = (props: LayoutContentProps) => {
	return (
		<Content
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
			}}
		>
			{/* 
          路由渲染的 Routes 组件，其他路由组件，包括子组件，都需要定义在它的下面 。
          这里使用一个渲染函数，递归渲染了路由和子路由。
          注意：这个渲染属性可以放到组件外部。
        */}
			<Routes>{renderRoute(menus)}</Routes>
		</Content>
	);
};

export default LayoutContent;
```

## 8.7 手动测试路由

可以在地址栏里数据路径，来测试路由组件是否正常，比如：

```shell
http://localhost:3000/ #系统首页
http://localhost:3000/banner #轮播图管理
http://localhost:3000/banner/home #首页轮播图
http://localhost:3000/banner/active #活动页轮播图
http://localhost:3000/pro #产品管理
http://localhost:3000/pro/list #产品列表
http://localhost:3000/pro/filter #筛选列表
http://localhost:3000/pro/list/home #首页产品列表
http://localhost:3000/pro/list/detail #详情推荐列表
http://localhost:3000/account #账户管理
http://localhost:3000/account/userlist #用户列表
http://localhost:3000/account/adminlist #管理员列表
http://localhost:3000/setting #设置
```

## 8.8 设置默认路由

参照 https://reactrouter.com/docs/en/v6/getting-started/overview#index-routes 学习默认路由。

根据渲染要求，当路由包含一层或多层子路由时，当选择父级路由时，希望能自动跳转到某个子路由（如果有多级路由，以此跳转）。此时，在路由表里标记默认打开的子路由，是个解决方案。回到 `menu.tsx` 给某些子路由添加标记：

```tsx
// src/router/menu.tsx

import React from 'react';

import {
	UploadOutlined,
	HomeOutlined,
	SwitcherOutlined,
	ReconciliationOutlined,
	GiftOutlined,
	HeartOutlined,
	FilterOutlined,
	TeamOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';

import { Index as Home } from '@/views/home/Index';

import { Index as Banner } from '@/views/banner/Index';
import { List as BannerList } from '@/views/banner/List';
import { Active as BannerActive } from '@/views/banner/Active';

import { Index as Pro } from '@/views/product/Index';
import { List as ProList } from '@/views/product/List';
import { Filter as ProFilter } from '@/views/product/Filter';

import { Index as User } from '@/views/user/Index';
import { UserList } from '@/views/user/UserList';
import { AdminList } from '@/views/user/AdminList';

import { Index as Setting } from '@/views/setting/Index';

export interface IMenuProps {
	label: string;
	icon?: any;
	key: string;
	children?: IMenuProps[];
	element: React.ReactNode;
	index?: 0 | 1; //+++ 定义值类型
}

const menus: IMenuProps[] = [
	{
		label: '系统首页',
		icon: <HomeOutlined />,
		key: '/', // 需要跳转的链接其实就是唯一表示
		element: <Home />,
	},
	{
		label: '轮播图管理',
		icon: <UploadOutlined />,
		key: '/banner',
		element: <Banner />,
		children: [
			{
				label: '首页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/home',
				element: <BannerList />,
				index: 1, //+++
			},
			{
				label: '活动页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/active',
				element: <BannerActive />,
			},
		],
	},
	{
		label: '产品管理',
		icon: <GiftOutlined />,
		key: '/pro',
		element: <Pro />,
		children: [
			{
				label: '产品列表',
				icon: <ReconciliationOutlined />,
				key: '/pro/list',
				element: <ProList />,
				index: 1, //+++
				children: [
					{
						label: '首页产品列表',
						icon: <HeartOutlined />,
						key: '/pro/list/home',
						element: <div>首页产品列表</div>,
						index: 1, //+++
					},
					{
						label: '详情推荐列表',
						icon: <HeartOutlined />,
						key: '/pro/list/detail',
						element: <div>详情推荐列表</div>,
					},
				],
			},
			{
				label: '筛选列表',
				icon: <FilterOutlined />,
				key: '/pro/filter',
				element: <ProFilter />,
			},
		],
	},
	{
		label: '账户管理',
		icon: <TeamOutlined />,
		key: '/account',
		element: <User />,
		children: [
			{
				label: '用户列表',
				icon: <UserOutlined />,
				key: '/account/userlist',
				element: <UserList />,
				index: 1, //+++
			},
			{
				label: '管理员列表',
				icon: <UserOutlined />,
				key: '/account/adminlist',
				element: <AdminList />,
			},
		],
	},
	{
		label: '设置',
		icon: <SettingOutlined />,
		key: '/setting',
		element: <Setting />,
	},
];

export default menus;
```

> **注意：**
>
> 这里 index 使用 boolean 会有问题。因为 React 在渲染属性时，具有布尔值的属性会有特殊含义。

为了配合路由表里路径跳转的定义，需要在 LayoutContent 里实现路由跳转。本项目应用的是 Router V6，代码如下：

-   算法一：

```tsx
import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import menus, { IMenuProps } from '@/router/menu';

const { Content } = Layout;

type LayoutContentProps = {};

const renderRoute = (menus: IMenuProps[]) => {
	return menus.map((item) => {
		// 如果存在子路由组件，继续递归渲染
		if (item.children) {
			if (!!item.index) {
				// v6 路由跳转，递归的路由仍然需要跳转
				return (
					<React.Fragment key={item.key}>
						<Route index element={<Navigate to={item.key} replace={true} />} />
						<Route key={item.key} path={item.key} element={item.element}>
							{renderRoute(item.children)}
						</Route>
					</React.Fragment>
				);
			} else {
				return (
					<Route key={item.key} path={item.key} element={item.element}>
						{renderRoute(item.children)}
					</Route>
				);
			}
		} else {
			if (!!item.index) {
				// v6 路由跳转
				return (
					<React.Fragment key={item.key}>
						<Route index element={<Navigate to={item.key} replace={true} />} />
						<Route path={item.key} element={item.element} />
					</React.Fragment>
				);
			} else {
				return <Route key={item.key} path={item.key} element={item.element} />;
			}
		}
	});
};

const LayoutContent: React.FC = (props: LayoutContentProps) => {
	return (
		<Content
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
			}}
		>
			{/* 
          路由渲染的 Routes 组件，其他路由组件，包括子组件，都需要定义在它的下面 。
          这里使用一个渲染函数，递归渲染了路由和子路由。
          注意：这个渲染属性可以放到组件外部。
        */}
			<Routes>{renderRoute(menus)}</Routes>
		</Content>
	);
};

export default LayoutContent;
```

-   算法二：

```tsx
import React, { Fragment } from 'react';
import { Layout } from 'antd';
import menus, { IMenuProps } from '@/router/menu';
import { Routes, Route, Navigate } from 'react-router-dom';

const { Content } = Layout;

type LayoutContentProps = {};

const renderRoute = (menus: IMenuProps[]) => {
	return (
		<>
			{menus.map((menu, index) => {
				const { key, element } = menu;
				return (
					<Fragment key={key}>
						{menu.index && (
							<Route index element={<Navigate to={key} replace={true} />}></Route>
						)}
						{menu.children ? (
							<Route path={key} element={element}>
								{renderRoute(menu.children)}
							</Route>
						) : (
							<Route path={key} element={element}></Route>
						)}
					</Fragment>
				);
			})}
		</>
	);
};

const LayoutContent: React.FC = (props: LayoutContentProps) => {
	return (
		<Content
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
			}}
		>
			{/* 
          路由渲染的 Routes 组件，其他路由组件，包括子组件，都需要定义在它的下面 。
          这里使用一个渲染函数，递归渲染了路由和子路由。
          注意：这个渲染属性可以放到组件外部。
        */}
			<Routes>{renderRoute(menus)}</Routes>
		</Content>
	);
};

export default LayoutContent;
```

> **注意：**
>
> 这里，递归的路由仍然需要跳转，这样可以实现多层路由自动重定向。

测试一下，路由重定向成功！

```
http://localhost:3000/banner -> http://localhost:3000/banner/home
http://localhost:3000/pro -> http://localhost:3000/pro/list/home
```

顺便，把 Page 404 的路由设置一下，在 `views` 里创建 404 组件：

```tsx
// @/views/error/Page404.tsx

type NotFoundProps = {};

export const Page404 = (props: NotFoundProps) => <div>页面没有找到。</div>;
```

在 LayoutContent.tsx 页面里添加路由定义：

```tsx
// @/layout/components/LayoutContent.tsx

import React from 'react';
import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import menus, { IMenuProps } from '@/router/menu';
import { Page404 } from '@/views/error/Page404';

const { Content } = Layout;

type LayoutContentProps = {};

const renderRoute = (menus: IMenuProps[]) => {
	return menus.map((item) => {
		// 如果存在子路由组件，继续递归渲染
		if (item.children) {
			if (!!item.index) {
				// v6 路由跳转，递归的路由仍然需要跳转
				return (
					<React.Fragment key={item.key}>
						<Route index element={<Navigate to={item.key} replace={true} />} />
						<Route key={item.key} path={item.key} element={item.element}>
							{renderRoute(item.children)}
						</Route>
					</React.Fragment>
				);
			} else {
				return (
					<Route key={item.key} path={item.key} element={item.element}>
						{renderRoute(item.children)}
					</Route>
				);
			}
		} else {
			if (!!item.index) {
				// v6 路由跳转
				return (
					<React.Fragment key={item.key}>
						<Route index element={<Navigate to={item.key} replace={true} />} />
						<Route path={item.key} element={item.element} />
					</React.Fragment>
				);
			} else {
				return <Route key={item.key} path={item.key} element={item.element} />;
			}
		}
	});
};

const LayoutContent: React.FC = (props: LayoutContentProps) => {
	return (
		<Content
			className="site-layout-background"
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
			}}
		>
			{/* 
          路由渲染的 Routes 组件，其他路由组件，包括子组件，都需要定义在它的下面 。
          这里使用一个渲染函数，递归渲染了路由和子路由。
          注意：这个渲染属性可以放到组件外部。
        */}
			<Routes>
				{renderRoute(menus)}
				{/* 404页面路由 */}
				<Route path="*" element={<Page404 />}></Route>
			</Routes>
		</Content>
	);
};

export default LayoutContent;
```

# 九、切换路由

目前，路由都是手工在地址栏里输入内容来测试的，是时候通过点击左侧菜单进行路由导航了。左侧菜单的展示交互逻辑，前面的课程里已经介绍过了，通过 Menu 组件的`openKeys={openKeys} onOpenChange={onOpenChange}`实现。现在通过 `onClick={changeUrl}`来实现路由的切换，`changeUrl`需要通过路由的编程式导航来完成。具体代码如下：

```tsx
// src/layout/components/LayoutSideBar.tsx 左侧菜单栏组件

import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

import menus from '../../router/menu';

const { Sider } = Layout;

// 设置包含有二级菜单的数据
const rootSubmenuKeys: string[] = [];
menus.forEach((item) => {
	if (item.children) {
		rootSubmenuKeys.push(item.key);
	}
});

type LayoutSideBarProps = {};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	const [openKeys, setOpenKeys] = useState(['sub1']);

	const onOpenChange = (keys: string[]) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	// 点击菜单切换页面
	const navigate = useNavigate();
	const changeUrl = ({ key }: { key: string }) => {
		// { item, key, keyPath, domEvent }
		navigate(key, { replace: false });
	};

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={menus}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				onClick={changeUrl}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

目前还要解决一个问题：当页面刷新时，需要保证当前二级路由是展开的，且当前路由是被选中的状态。编写一个`getSubMenu` 函数，生成类似 `['pro', 'pro/list', 'pro/list/home'] `的数组用于展开当前的 `SubMenu` 菜单项。

```tsx
// src/layout/components/SideBar.tsx 左侧菜单栏组件

import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '../../store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';

import menus from '../../router/menu';

const { Sider } = Layout;

// 设置包含有二级菜单的数据
const rootSubmenuKeys: string[] = [];
menus.forEach((item) => {
	if (item.children) {
		rootSubmenuKeys.push(item.key);
	}
});

type LayoutSideBarProps = {};

// 获取 SubMenu 菜单项 key 数组
// 根据 pathname 生成类似 ['/pro', '/pro/list', '/pro/list/home'] 的数组
const getSubMenu = (pathname: string) => {
	const pathArray = pathname.slice(1).split('/');
	const result = pathArray.reduce(
		(tempArray: string[], path: string, index: number) => {
			const tempPath = tempArray[index] + '/' + path;
			tempArray.push(tempPath);
			return tempArray;
		},
		['']
	);
	// 去掉第一个元素的空值 ['', 'xx', 'yyy']
	return result.slice(1);
};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	/*
	 * 刷新页面保留路由状态
	 */
	// 获取路由路径信息
	const { pathname } = useLocation();
	// 当前选中的菜单项 key 数组
	const [selectedKeys, setSelectedKeys] = useState([pathname]);
	// 当前展开的 SubMenu 菜单项 key 数组
	const [openKeys, setOpenKeys] = useState(getSubMenu(pathname));

	const onOpenChange = (keys: string[]) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	// 点击菜单切换页面
	const navigate = useNavigate();
	const changeUrl = ({ key }: { key: string }) => {
		// { item, key, keyPath, domEvent }
		navigate(key, { replace: false });
		// 点击左侧菜单切换选中项
		setSelectedKeys([key]);
	};

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={menus}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				selectedKeys={selectedKeys}
				onClick={changeUrl}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

# 十、面包屑导航

## 10.1 参考文档

案例项目：面包屑组件应该包含在页面的头部 https://vvbin.cn/next/#/feat/breadcrumb/flat

Antd 组件库面包屑文档： https://ant-design.gitee.io/components/breadcrumb-cn/#components-breadcrumb-demo-react-router

## 10.2 设置面包屑导航

```tsx
// src/layout/components/LayoutBreadcrumb.tsx

import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import menus, { IMenuProps } from '@/router/menu';

type BreadcrumbProps = {};

const breadcrumbNameMap: Record<string, string> = {};

/**
 * 面包屑导航映射表：
 * /: "系统首页"
 * /account: "账户管理"
 * /account/adminlist: "管理员列表"
 * /account/userlist: "用户列表"
 * /banner: "轮播图管理"
 * /banner/active: "活动页轮播图"
 * /banner/home: "首页轮播图"
 * /cart: "购物车管理"
 * /pro: "产品管理"
 * /pro/list: "产品列表"
 * /pro/list/home: "首页产品列表"
 * /pro/list/detail: "详情推荐列表"
 * /pro/filter: "筛选列表"
 * /setting: "设置"
 */
function getBreadcrumbData(menus: IMenuProps[]) {
	menus.forEach((item) => {
		if (item.children) {
			breadcrumbNameMap[item.key] = item.label;
			getBreadcrumbData(item.children);
		} else {
			breadcrumbNameMap[item.key] = item.label;
		}
	});
}
getBreadcrumbData(menus);

export const LayoutBreadcrumb = (props: BreadcrumbProps) => {
	const location = useLocation();
	const pathSnippets = location.pathname.split('/').filter((i) => i);

	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		return (
			<Breadcrumb.Item key={url}>
				<Link to={url}>{breadcrumbNameMap[url]}</Link>
			</Breadcrumb.Item>
		);
	});

	const breadcrumbItems = [
		<Breadcrumb.Item key="home">
			<Link to="/">系统首页</Link>
		</Breadcrumb.Item>,
	].concat(extraBreadcrumbItems);

	return (
		<div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	);
};
```

在头部组件引入面包屑导航组件，尽可能不动原来的布局：

```tsx
// src/layout/components/LayoutHeader.tsx

import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { LayoutBreadcrumb } from './LayoutBreadcrumb';
import store from 'store2';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeCollapsed } from '@/store/modules/layout';

const { Header } = Layout;

type LayoutHeaderProps = {};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const collapsed = useAppSelector((state) => state.layout.collapsed);
	const dispatch = useAppDispatch();

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<div className="layout-header">
				<div>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => {
							// 本地存储 collapsed 新状态
							store.set('collapsed', !collapsed);
							// 修改 collapsed 状态
							dispatch(changeCollapsed());
						},
					})}
				</div>
				<div>
					<LayoutBreadcrumb></LayoutBreadcrumb>
				</div>
				<div>退出</div>
			</div>
		</Header>
	);
};

export default LayoutHeader;
```

随之而来的问题就是，当点击面包屑导航时，地址栏的路由已经发生了跳转，但是左侧菜单栏数据效果没有实时更新，此时可以在左侧菜单栏组件监听路由的变化，执行菜单的联动更新。

```tsx
// src/layout/components/LayoutSideBar.tsx

import React, { useState, useEffect } from 'react';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '@/store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';

import menus from '@/router/menu';

const { Sider } = Layout;

// 设置包含有二级菜单的数据
const rootSubmenuKeys: string[] = [];
menus.forEach((item) => {
	if (item.children) {
		rootSubmenuKeys.push(item.key);
	}
});

type LayoutSideBarProps = {};

// 获取 SubMenu 菜单项 key 数组
// 根据 pathname 生成类似 ['pro', 'pro/list', 'pro/list/home'] 的数组
const getSubMenu = (pathname: string) => {
	const pathArray = pathname.split('/').slice(1);
	const result = pathArray.reduce(
		(subPathArray, path, index) => {
			const str = subPathArray[index] + '/' + path;
			subPathArray.push(str as never);
			return subPathArray;
		},
		['']
	);
	return result;
};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	/*
	 * 刷新页面保留路由状态
	 */
	// 获取路由路径信息
	const { pathname } = useLocation();
	// 当前选中的菜单项 key 数组
	const [selectedKeys, setSelectedKeys] = useState([pathname]);
	// 当前展开的 SubMenu 菜单项 key 数组
	const [openKeys, setOpenKeys] = useState(getSubMenu(pathname));

	const onOpenChange = (keys: string[]) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	// 监听pathname的变化，然后调整左侧菜单打开和选中的状态
	useEffect(() => {
		setSelectedKeys([pathname]);
		setOpenKeys(getSubMenu(pathname));
	}, [pathname]);

	// 点击菜单切换页面
	const navigate = useNavigate();
	const changeUrl = ({ key }: { key: string }) => {
		// { item, key, keyPath, domEvent }
		navigate(key, { replace: false });
		// 点击左侧菜单切换选中项
		setSelectedKeys([key]);
	};

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={menus}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				selectedKeys={selectedKeys}
				onClick={changeUrl}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

# 十一、快捷切换页

## 11.1 准备组件

```tsx
// src/layout/components/AppTabs.tsx
import React from 'react';

type AppTabsProps = {};

const AppTabs = (props: AppTabsProps) => (
	<div style={{ backgroundColor: '#f66', height: 40 }}></div>
);

export default AppTabs;
```

```ts
// src/layout/components/index.ts
// 高端写法( 在js中也同样适用 - 引入时同时暴露出去 )
export { default as SideBar } from './SideBar';
export { default as AppHeader } from './AppHeader';
export { default as AppMain } from './AppMain';
export { default as AppTabs } from './AppTabs';
```

```tsx
// src/layout/Index.tsx
import { Layout } from 'antd';

// import SideBar from './components/SideBar';
// import AppHeader from './components/AppHeader';
// import AppMain from './components/AppMain';
import { SideBar, AppHeader, AppMain, AppTabs } from './components';

const MainLayout = () => {
	return (
		<Layout id="components-layout-demo-custom-trigger">
			<SideBar />
			<Layout className="site-layout">
				<AppHeader />
				<AppTabs />
				<AppMain />
			</Layout>
		</Layout>
	);
};

export default MainLayout;
```

## 11.2 处理数据

> 后期 监听地址栏 从 tabsArr 中提取数据

```tsx
// src/layout/components/AppTabs.tsx
import React from 'react';
import menus, { IMenuProps } from '../../router/menu';
type AppTabsProps = {};
export interface ITabProps {
	label: string;
	key: string;
}
const tabsArr: ITabProps[] = [];
const getTabsData = (menus: IMenuProps[]) => {
	menus.forEach((item) => {
		if (item.children) {
			getTabsData(item.children);
		} else {
			tabsArr.push({
				label: item.label,
				key: item.key,
			});
		}
	});
};

getTabsData(menus);
console.log(tabsArr);
const AppTabs = (props: AppTabsProps) => (
	<div style={{ backgroundColor: '#f66', height: 40 }}></div>
);

export default AppTabs;
```

## 11.3 监听路由添加数据

```tsx
// src/layout/components/AppTabs.tsx
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import menus, { IMenuProps } from '../../router/menu';
type AppTabsProps = {};
export interface ITabProps {
	label: string;
	key: string;
}
const tabsArr: ITabProps[] = [];
const getTabsData = (menus: IMenuProps[]) => {
	menus.forEach((item) => {
		if (item.children) {
			getTabsData(item.children);
		} else {
			tabsArr.push({
				label: item.label,
				key: item.key,
			});
		}
	});
};

getTabsData(menus);
console.log(JSON.stringify(tabsArr));
/**
 *
 * [{"label":"系统首页","key":"/"},
 * {"label":"首页轮播图","key":"/banner/home"},
 * {"label":"活动页轮播图","key":"/banner/active"},
 * {"label":"产品列表","key":"/pro/list"},
 * {"label":"筛选列表","key":"/pro/search"},
 * {"label":"用户列表","key":"/account/userlist"},
 * {"label":"管理员列表","key":"/account/adminlist"},
 * {"label":"购物车管理","key":"/cart"},
 * {"label":"设置","key":"/setting"}]
 */
const AppTabs = (props: AppTabsProps) => {
	// 先准备切换的数据
	const [arr, setArr] = useState([{ key: '/', label: '系统首页' }]);
	// 选中的索引值
	const [currentIndex, setCurrentIndex] = useState(0);

	const { pathname } = useLocation();
	// 监听地址栏的变化，判断arr中有无数据
	useEffect(() => {
		// ++++++++++
		const index = arr.findIndex((item) => item.key === pathname); // 查询索引值
		if (index === -1) {
			// 相当于现在没有数据
			const item = tabsArr.find((item) => item.key === pathname)!; // 查询对象--- 基于完整的路由的数据 tabsArr
			// console.log('需要添加', item)
			// 排除一级菜单数据 /pro 这种,最后一项可能是 undefined
			item && arr.push(item); // 添加数据
			// console.log(arr)
			setArr(arr); // 修改状态
			setCurrentIndex(arr.length - 1); // 对应选中的状态
		} else {
			setCurrentIndex(index); // 对应选中的状态
		}
	}, [pathname, arr]);
	return (
		<div style={{ backgroundColor: '#f66', height: 40 }}>
			{arr.map((item, index) => {
				return (
					<Tag key={item.key} color={currentIndex === index ? '#55acee' : ''}>
						{item.label}
					</Tag>
				);
			})}
		</div>
	);
};

export default AppTabs;
```

## 11.4 点击 tab 页切换路由,关闭效果

```tsx
// src/layout/components/AppTabs.tsx
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menus, { IMenuProps } from '../../router/menu';
type AppTabsProps = {};
export interface ITabProps {
	label: string;
	key: string;
}
const tabsArr: ITabProps[] = [];
const getTabsData = (menus: IMenuProps[]) => {
	menus.forEach((item) => {
		if (item.children) {
			getTabsData(item.children);
		} else {
			tabsArr.push({
				label: item.label,
				key: item.key,
			});
		}
	});
};

getTabsData(menus);
console.log(JSON.stringify(tabsArr));
/**
 *
 * [{"label":"系统首页","key":"/"},
 * {"label":"首页轮播图","key":"/banner/home"},
 * {"label":"活动页轮播图","key":"/banner/active"},
 * {"label":"产品列表","key":"/pro/list"},
 * {"label":"筛选列表","key":"/pro/search"},
 * {"label":"用户列表","key":"/account/userlist"},
 * {"label":"管理员列表","key":"/account/adminlist"},
 * {"label":"购物车管理","key":"/cart"},
 * {"label":"设置","key":"/setting"}]
 */
const AppTabs = (props: AppTabsProps) => {
	// 先准备切换的数据
	const [arr, setArr] = useState([{ key: '/', label: '系统首页' }]);
	// 选中的索引值
	const [currentIndex, setCurrentIndex] = useState(0);

	const { pathname } = useLocation();
	// 监听地址栏的变化，判断arr中有无数据
	useEffect(() => {
		const index = arr.findIndex((item) => item.key === pathname); // 查询索引值
		if (index === -1) {
			// 相当于现在没有数据
			const item = tabsArr.find((item) => item.key === pathname)!; // 查询对象--- 基于完整的路由的数据 tabsArr
			// console.log('需要添加', item)
			arr.push(item); // 添加数据
			// console.log(arr)
			setArr(arr); // 修改状态
			setCurrentIndex(arr.length - 1); // 对应选中的状态
		} else {
			setCurrentIndex(index); // 对应选中的状态
		}
	}, [pathname, arr, currentIndex]);

	const navigate = useNavigate();
	return (
		<div style={{ backgroundColor: '#fff', height: 24 }}>
			{arr.map((item, index) => {
				return (
					<Tag
						style={{ cursor: 'pointer', userSelect: 'none' }}
						key={item.key}
						closable={currentIndex === index && index !== 0}
						color={currentIndex === index ? '#55acee' : ''}
						onClick={() => {
							navigate(item.key, { replace: false }); // 切换路由
							setCurrentIndex(index); // 设置索引
						}}
						onClose={(e) => {
							e.preventDefault(); // 阻止默认事件
							arr.splice(index, 1); // 删除当前项数据
							setArr(arr);
							setCurrentIndex(index - 1); // 选中数组的下标向前移一位
							navigate(arr[currentIndex - 1].key, { replace: false }); // 跳转路由
						}}
					>
						{item.label}
					</Tag>
				);
			})}
		</div>
	);
};

export default AppTabs;
```

# 十二、数据请求的封装

```ts
// src/uitls/request.ts

import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import store from 'store2';

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
	baseURL: isDev ? 'http://121.89.205.189:3000/admin' : 'http://121.89.205.189:3000/admin',
});

// 定义请求拦截器
instance.interceptors.request.use(
	(config) => {
		const storeUsers = store.get('higo-users');
		config.headers!.token = storeUsers && (storeUsers['X-Token'] || '');
		return config;
	},
	(error) => Promise.reject(error)
);

// 定义响应拦截器
instance.interceptors.response.use(
	(response) => {
		if (response.data.code === '10119') {
			message.warning('登录失效，请重新登录');

			// 防止后期在系统首页以及登录页来回切换
			store.remove('higo-users');

			// 如果使用hash路由，此处改为 /#/login
			window.location.href = '/login';

			// 返回
			return;
		}

		// 登录成功，放行
		return response;
	},
	(error) => Promise.reject(error)
);

//  自定义各种数据请求 axios({})
export default function request(config: AxiosRequestConfig) {
	const { url = '', method = 'GET', data = {}, headers = {} } = config;
	switch (method.toUpperCase()) {
		// 获取数据
		case 'GET':
			return instance.get(url, { params: data });

		// 添加数据
		case 'POST':
			// 表单提交 content-type = application/x-www-form-url-encoded
			if (headers['content-type'] === 'application/x-www-form-url-encoded') {
				// 转参数 URLSearchParams/第三方库qs
				const p = new URLSearchParams();
				for (const key in data) {
					p.append(key, data[key]);
				}
				return instance.post(url, p, { headers });
			}

			// 文件提交 content-type = multipart/form-data
			if (headers['content-type'] === 'multipart/form-data') {
				const p = new FormData();
				for (const key in data) {
					p.append(key, data[key]);
				}
				return instance.post(url, p, { headers });
			}

			// 默认 content-type = application/json
			return instance.post(url, data);

		// 修改数据 - 所有的数据的更新
		case 'PUT':
			return instance.put(url, data);

		// 删除数据
		case 'DELETE':
			return instance.delete(url, { data });

		// 修改数据 - 部分的数据的更新
		case 'PATCH':
			return instance.patch(url, data);

		// 默认返回实例
		default:
			return instance(config);
	}
}
```

按照思维惯性来看，此时需要请求以及渲染轮播图管理相关功能，但是试着访问后端接口，发现基本所有的借口都需要基于 `token`，那么需要首先完成登录功能。

```haskell
http://121.89.205.189:3000/admin/banner/list

{
  "code": "10119",
  "message": "token无效"
}
```

# 十三、登录页面

## 13.1 参考文档

https://ant-design.gitee.io/components/form-cn/#components-form-demo-normal-login

## 13.2 构造登录接口 API

```tsx
// src/api/user.ts

import request from '@/utils/request';

export interface IAdminParams {
	adminname: string;
	password: string;
}

export function adminLoginFn(params: IAdminParams) {
	return request({
		url: '/admin/login',
		method: 'POST',
		data: params,
	});
}
```

## 13.3 构建登录页面

```tsx
// src/views/login/Index.tsx

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IAdminParams } from '@/api/users';
import './login.less';

type IndexProps = {};

// 一定要记得把原来组件库的 userName 改成 adminname
export const Index = (props: IndexProps) => {
	const onFinish = (values: IAdminParams) => {
		console.log(values);
	};
	return (
		<div id="components-form-demo-normal-login">
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<h1>嗨购管理系统</h1>
				<Form.Item
					name="adminname"
					rules={[{ required: true, message: '请输入管理员账户!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="管理员账户"
						allowClear
					/>
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="密码"
						allowClear
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登 录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
```

给登录页面定义样式：

```less
// @/views/login/Login.less

/* 登录框设置 */
#components-form-demo-normal-login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(https://cas.1000phone.net/cas/images/login/bg.png) no-repeat center center;
	background-size: cover;
}
#components-form-demo-normal-login .login-form {
	max-width: 300px;
	background-color: #fff;
	padding: 50px;
	border-radius: 30px;
}
#components-form-demo-normal-login .login-form-forgot {
	float: right;
}
#components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
	float: left;
}
#components-form-demo-normal-login .login-form-button {
	width: 100%;
}
```

改造 `App.tsx` 创建登录的路由：

```tsx
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Index from './layout/Index';
import { Index as Login } from './views/login/Index';

import './App.less';

type AppProps = {};

const App: FC = (props: AppProps) => (
	<Routes>
		{/* 
        路由v6版本中：关键点就在于 *，代表后续的路由的设定交给 Index 组件处理
        路由v5版本中：不需要添加 *
        v5版本中使用 Switch 代替v6 中的 Routes
        v5版本中使用 component 属性代替 v6 中的 element
      */}
		<Route path="/login" element={<Login />} />
		<Route path="/*" element={<Index />} />
	</Routes>
);

export default App;
```

接下来正式通过请求登录接口，完成登录。可以使用状态管理器记录用户登录态，异步操作可以在组件里完成，也可以在状态管理器中完成。

# 十四、执行登录

使用状态管理器（RTK）管理登录信息。构建 users 状态管理模块：

```ts
// src/store/modules/users.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store2';

// 定义用户状态接口
export interface IUserState {
	loginState: boolean;
	adminname: string;
	token: string;
	role: number;
	checkedkeys: any[];
}

// 初始化状态数据，这部分数据都存在了本地
const initialState: IUserState = store.get('higo-users')
	? {
			loginState: store.get('higo-users')['loginState'],
			adminname: store.get('higo-users')['adminname'],
			token: store.get('higo-users')['X-Token'],
			role: store.get('higo-users')['role'],
			checkedkeys: store.get('higo-users')['checkedkeys'],
	  }
	: {
			loginState: false,
			adminname: '',
			token: '',
			role: 0,
			checkedkeys: [],
	  };

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		changeLoginState(state, action: PayloadAction<boolean>) {
			state.loginState = action.payload;
		},
		changeAdminName(state, action: PayloadAction<string>) {
			state.adminname = action.payload;
		},
		changeToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		changeRole(state, action: PayloadAction<number>) {
			state.role = action.payload;
		},
		changeCheckedkeys(state, action: PayloadAction<any[]>) {
			state.checkedkeys = action.payload;
		},
	},
});

export const { changeLoginState, changeAdminName, changeToken, changeRole, changeCheckedkeys } =
	userSlice.actions;

export default userSlice.reducer;
```

在 `store` 里装载 `users` 模块：

```ts
// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import layout from './modules/layout';
import users from './modules/users';

const store = configureStore({
	reducer: {
		layout,
		users,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

修改登录页面，使其具备登录功能：

```tsx
// src/views/login/Index.tsx

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IAdminParams, adminLoginFn } from '../../api/user';
import { useAppDispatch } from '../../store/hooks';
import {
	changeAdminName,
	changeCheckedkeys,
	changeLoginState,
	changeRole,
	changeToken,
} from '../../store/modules/user';

type IndexProps = {};

// 一定要记得把原来组件库的userName改成 adminname
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from 'store2';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import {
	changeAdminName,
	changeCheckedkeys,
	changeLoginState,
	changeRole,
	changeToken,
} from '@/store/modules/users';

import { IAdminParams, adminLoginFn } from '@/api/users';
import './login.less';

type IndexProps = {};

// 一定要记得把原来组件库的 userName 改成 adminname
export const Index = (props: IndexProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onFinish = (values: IAdminParams) => {
		// console.log(values)
		adminLoginFn(values).then((res) => {
			// console.log(res.data)
			switch (res.data.code) {
				case '10005':
					message.error('不存在该账户');
					break;
				case '10003':
					message.error('密码错误');
					break;
				default:
					message.success('登录成功');

					// 存储信息到本地以及状态管理器
					const result = res.data.data;
					const higoUsers = {
						loginState: true,
						adminname: result.adminname,
						'X-Token': result.token,
						role: result.role,
						checkedkeys: result.checkedkeys,
					};
					store.set('higo-users', higoUsers);

					// rtk
					dispatch(changeLoginState(true));
					dispatch(changeAdminName(result.adminname));
					dispatch(changeToken(result.token));
					dispatch(changeRole(result.role));
					dispatch(changeCheckedkeys(result.checkedkeys));

					// 要跳转到系统首页
					navigate('/', { replace: true });

					break;
			}
		});
	};
	return (
		<div id="components-form-demo-normal-login">
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<h1>嗨购管理系统</h1>
				<Form.Item
					name="adminname"
					rules={[{ required: true, message: '请输入管理员账户!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="管理员账户"
						allowClear
					/>
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="密码"
						allowClear
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登 录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
```

# 十五、前端登录验证

当前路由在登录页面，判断用户的登录状态，如果登录，则跳转到系统的首页，如果未登录，显示登录页面。

当前路由在非登录页面，判断用户的登录状态，如果登录，则显示非登录页面，如果未登录，跳转到登录页面。

修改 App.tsx 组件：

```tsx
// src/App.tsx

import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Index from './layout/Index';
import { Index as Login } from './views/login/Index';

import { useAppSelector } from './store/hooks';

import './App.less';

type AppProps = {};

const App: FC = (props: AppProps) => {
	const loginState = useAppSelector((state) => state.users.loginState);

	return (
		<Routes>
			{/* 
          路由v6版本中：关键点就在于 *，代表后续的路由的设定交给 Index 组件处理
          路由v5版本中：不需要添加 *
          v5版本中使用 Switch 代替v6 中的 Routes
          v5版本中使用 component 属性代替 v6 中的 element
        */}
			<Route path="/login" element={loginState ? <Navigate to="/" /> : <Login />} />
			<Route path="/*" element={loginState ? <Index /> : <Navigate to="/login" />} />
		</Routes>
	);
};

export default App;
```

# 十六、token 校验

封装 axios 时已经实现（请求拦截器），后台管理系统都需要请求数据，而请求数据 都需要添加 token 字段，后续讲解。

```tsx
// 定义请求拦截器
instance.interceptors.request.use(
	(config) => {
		const storeUsers = store.get('higo-users');
		config.headers!.token = storeUsers && (storeUsers['X-Token'] || '');
		return config;
	},
	(error) => Promise.reject(error)
);
```

# 十七、退出登录

## 17.1 实现退出登录

```tsx
// src/layout/components/LayoutHeader.tsx

import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';

import { LayoutBreadcrumb } from './LayoutBreadcrumb';
import store from 'store2';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeCollapsed } from '@/store/modules/layout';
import { changeLoginState } from '@/store/modules/users';

const { Header } = Layout;

type LayoutHeaderProps = {};

const renderMenu = (changeUrl: ({ key }: { key: string }) => void) => {
	return (
		<Menu
			onClick={changeUrl}
			items={[
				{
					label: '设置',
					key: '/setting',
				},
				{
					type: 'divider',
				},
				{
					label: '退出',
					key: '/logout',
				},
			]}
		/>
	);
};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const collapsed = useAppSelector((state) => state.layout.collapsed);
	const adminname = useAppSelector((state) => state.users.adminname);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const changeUrl = ({ key }: { key: string }) => {
		if (key === '/setting') {
			navigate(key, { replace: false });
		} else if (key === '/logout') {
			store.remove('higo-users');
			dispatch(changeLoginState(false));
			navigate('/login', { replace: false });
		} else {
			// 如果有其余选项，业务逻辑
		}
	};

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<div className="layout-header">
				<div>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => {
							// 本地存储 collapsed 新状态
							store.set('collapsed', !collapsed);
							// 修改 collapsed 状态
							dispatch(changeCollapsed());
						},
					})}
				</div>
				<div>
					<LayoutBreadcrumb></LayoutBreadcrumb>
				</div>
				<div>
					<Dropdown overlay={renderMenu(changeUrl)} trigger={['click']}>
						<a href="#/" onClick={(e) => e.preventDefault()}>
							<Space>
								您好：{adminname}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
};

export default LayoutHeader;
```

## 17.2 保留退出时的页面

退出登录后，再次登录发现回到了默认的*系统首页*，如何实现还在原来的页面呢？要解决这个问题，首页要拿到退出时的地址。

```tsx
// src/layout/components/LayoutHeader.tsx

import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';

import { LayoutBreadcrumb } from './LayoutBreadcrumb';
import store from 'store2';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeCollapsed } from '@/store/modules/layout';
import { changeLoginState } from '@/store/modules/users';

const { Header } = Layout;

type LayoutHeaderProps = {};

const renderMenu = (changeUrl: ({ key }: { key: string }) => void) => {
	return (
		<Menu
			onClick={changeUrl}
			items={[
				{
					label: '设置',
					key: '/setting',
				},
				{
					type: 'divider',
				},
				{
					label: '退出',
					key: '/logout',
				},
			]}
		/>
	);
};

const LayoutHeader: React.FC = (props: LayoutHeaderProps) => {
	const collapsed = useAppSelector((state) => state.layout.collapsed);
	const adminname = useAppSelector((state) => state.users.adminname);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const changeUrl = ({ key }: { key: string }) => {
		if (key === '/setting') {
			navigate(key, { replace: false });
		} else if (key === '/logout') {
			store.remove('higo-users');
			dispatch(changeLoginState(false));
			//+++
			navigate('/login?r=' + pathname, { replace: false });
		} else {
			// 如果有其余选项，业务逻辑
		}
	};

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<div className="layout-header">
				<div>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => {
							// 本地存储 collapsed 新状态
							store.set('collapsed', !collapsed);
							// 修改 collapsed 状态
							dispatch(changeCollapsed());
						},
					})}
				</div>
				<div>
					<LayoutBreadcrumb></LayoutBreadcrumb>
				</div>
				<div>
					<Dropdown overlay={renderMenu(changeUrl)} trigger={['click']}>
						<a href="#/" onClick={(e) => e.preventDefault()}>
							<Space>
								您好：{adminname}
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
};

export default LayoutHeader;
```

拿到地址后，再次退出登录，发现地址栏里有了路由的信息（`/login?r=/banner/home`）。接下来再次登录成功跳转时可以携带这个路由信息了。

> 正常思路是：在登陆时，登录成功之后携带地址跳转。但实际上程序运行时，当登录成功之后，已经修改了登录状态，状态的改变引起登录组件的二次渲染，所以真正决定跳转地址的是 `App.tsx` 组件。

```tsx
// @/App.tsx

import { FC } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';

import Index from './layout/Index';
import { Index as Login } from './views/login/Index';

import { useAppSelector } from './store/hooks';

import './App.less';

type AppProps = {};

const App: FC = (props: AppProps) => {
	const loginState = useAppSelector((state) => state.users.loginState);
	const [searchParams] = useSearchParams();

	return (
		<Routes>
			{/* 
          路由v6版本中：关键点就在于 *，代表后续的路由的设定交给 Index 组件处理
          路由v5版本中：不需要添加 *
          v5版本中使用 Switch 代替v6 中的 Routes
          v5版本中使用 component 属性代替 v6 中的 element
        */}
			<Route
				path="/login"
				element={loginState ? <Navigate to={searchParams.get('r') as string} /> : <Login />}
			/>
			<Route path="/*" element={loginState ? <Index /> : <Navigate to="/login" />} />
		</Routes>
	);
};

export default App;
```

# 十八、隐藏子菜单

*设置*路由已经放到头部，左侧菜单栏不需要显示*设置*选项了，给 `menu.tsx` 不需要出现的子路由添加 hidden 属性。

```tsx
// @/router/menu.tsx

import React from 'react';

import {
	UploadOutlined,
	HomeOutlined,
	SwitcherOutlined,
	ReconciliationOutlined,
	GiftOutlined,
	HeartOutlined,
	FilterOutlined,
	TeamOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';

import { Index as Home } from '@/views/home/Index';

import { Index as Banner } from '@/views/banner/Index';
import { List as BannerList } from '@/views/banner/List';
import { Active as BannerActive } from '@/views/banner/Active';

import { Index as Pro } from '@/views/product/Index';
import { List as ProList } from '@/views/product/List';
import { Filter as ProFilter } from '@/views/product/Filter';

import { Index as User } from '@/views/user/Index';
import { UserList } from '@/views/user/UserList';
import { AdminList } from '@/views/user/AdminList';

import { Index as Setting } from '@/views/setting/Index';

export interface IMenuProps {
	label: string;
	icon?: any;
	key: string;
	children?: IMenuProps[];
	element: React.ReactNode;
	index?: 0 | 1;
	hidden?: boolean; //+++
}

const menus: IMenuProps[] = [
	{
		label: '系统首页',
		icon: <HomeOutlined />,
		key: '/', // 需要跳转的链接其实就是唯一表示
		element: <Home />,
	},
	{
		label: '轮播图管理',
		icon: <UploadOutlined />,
		key: '/banner',
		element: <Banner />,
		children: [
			{
				label: '首页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/home',
				element: <BannerList />,
				index: 1,
			},
			{
				label: '活动页轮播图',
				icon: <SwitcherOutlined />,
				key: '/banner/active',
				element: <BannerActive />,
			},
		],
	},
	{
		label: '产品管理',
		icon: <GiftOutlined />,
		key: '/pro',
		element: <Pro />,
		children: [
			{
				label: '产品列表',
				icon: <ReconciliationOutlined />,
				key: '/pro/list',
				element: <ProList />,
				index: 1,
				children: [
					{
						label: '首页产品列表',
						icon: <HeartOutlined />,
						key: '/pro/list/home',
						element: <div>首页产品列表</div>,
						index: 1,
					},
					{
						label: '详情推荐列表',
						icon: <HeartOutlined />,
						key: '/pro/list/detail',
						element: <div>详情推荐列表</div>,
					},
				],
			},
			{
				label: '筛选列表',
				icon: <FilterOutlined />,
				key: '/pro/filter',
				element: <ProFilter />,
			},
		],
	},
	{
		label: '账户管理',
		icon: <TeamOutlined />,
		key: '/account',
		element: <User />,
		children: [
			{
				label: '用户列表',
				icon: <UserOutlined />,
				key: '/account/userlist',
				element: <UserList />,
				index: 1,
			},
			{
				label: '管理员列表',
				icon: <UserOutlined />,
				key: '/account/adminlist',
				element: <AdminList />,
				hidden: true,
			},
		],
	},
	{
		label: '设置',
		icon: <SettingOutlined />,
		key: '/setting',
		element: <Setting />,
		hidden: true, //+++
	},
];

export default menus;
```

然后在 `LayoutSideBar` 组件中引入 `lodash`，对 `menus` 做一个过滤即可：

```tsx
// @/layout/components/LayoutSideBar.tsx

import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { Layout, Menu } from 'antd';

import { useAppSelector } from '@/store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';

import menus from '@/router/menu';

const { Sider } = Layout;

// 过滤 menus，将 hidden: 1 的子菜单删掉
const menus2 = _.dropWhile(menus, { hidden: 1 });

// 设置包含有二级菜单的数据
const rootSubmenuKeys: string[] = [];
menus2.forEach((item) => {
	if (item.children) {
		rootSubmenuKeys.push(item.key);
	}
});

type LayoutSideBarProps = {};

// 获取 SubMenu 菜单项 key 数组
// 根据 pathname 生成类似 ['pro', 'pro/list', 'pro/list/home'] 的数组
const getSubMenu = (pathname: string) => {
	const pathArray = pathname.split('/').slice(1);
	const result = pathArray.reduce(
		(subPathArray, path, index) => {
			const str = subPathArray[index] + '/' + path;
			subPathArray.push(str as never);
			return subPathArray;
		},
		['']
	);
	return result;
};

const LayoutSideBar: React.FC = (props: LayoutSideBarProps) => {
	// 从 store 的 layout 模块读取状态 collapsed
	const collapsed = useAppSelector((state) => state.layout.collapsed);

	/*
	 * 刷新页面保留路由状态
	 */
	// 获取路由路径信息
	const { pathname } = useLocation();
	// 当前选中的菜单项 key 数组
	const [selectedKeys, setSelectedKeys] = useState([pathname]);
	// 当前展开的 SubMenu 菜单项 key 数组
	const [openKeys, setOpenKeys] = useState(getSubMenu(pathname));

	const onOpenChange = (keys: string[]) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	// 监听pathname的变化，然后调整左侧菜单打开和选中的状态
	useEffect(() => {
		setSelectedKeys([pathname]);
		setOpenKeys(getSubMenu(pathname));
	}, [pathname]);

	// 点击菜单切换页面
	const navigate = useNavigate();
	const changeUrl = ({ key }: { key: string }) => {
		// { item, key, keyPath, domEvent }
		navigate(key, { replace: false });
		// 点击左侧菜单切换选中项
		setSelectedKeys([key]);
	};

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				items={menus2}
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				selectedKeys={selectedKeys}
				onClick={changeUrl}
			/>
		</Sider>
	);
};

export default LayoutSideBar;
```

> 注意：低版本的 Antd 按照这个思路过滤即可。

# 十九、管理员管理

## 19.1 设计接口

```ts
// src/api/admin.ts

import request from '../utils/request';

export interface IAdminParams {
	adminname: string;
	password: string;
	role: number;
	checkedKeys: any[];
}

export function getAdminList() {
	return request({
		url: '/admin/list',
	});
}

export function addAdmin(params: IAdminParams) {
	return request({
		url: '/admin/add',
		method: 'POST',
		data: params,
	});
}

export function removeAdmin(params: { adminid: string }) {
	return request({
		url: '/admin/delete',
		method: 'POST',
		data: params,
	});
}

export function updateAdmin(params: IAdminParams) {
	return request({
		url: '/admin/update',
		method: 'POST',
		data: params,
	});
}
```

## 19.2 展示管理员列表

引入 table 组件，根据屏幕宽度自适应高度。

```tsx
// src/views/user/AdminList.tsx

import { Table, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList } from '@/api/admin';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
	checkedKeys: any[];
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button type="primary" shape="circle" icon={<EditOutlined />} />
						<Button danger shape="circle" icon={<DeleteOutlined />} />
					</Space>
				);
			},
			width: 200,
		},
	];

	// 不能把 useEffect 的回调函数定义成 async 函数
	useEffect(() => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});

		// async 的使用方法
		//;(async () => {
		//  const result = await getAdminList()
		//  setAdminList(result.data.data)
		//})()
	}, []);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Button type="primary">添加管理员</Button>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					showSizeChanger: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
			/>
		</Space>
	);
};
```

添加中文包：

```tsx
// @/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';

import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ConfigProvider locale={zhCN}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ConfigProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## 19.3 删除管理员

```tsx
import { Table, Space, Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList, removeAdmin } from '@/api/admin';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
	checkedKeys: any[];
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button type="primary" shape="circle" icon={<EditOutlined />} />
						<Popconfirm
							title="确定删除吗?"
							onConfirm={() => {
								removeAdmin({ adminid: record.adminid }).then(() => {
									loadAdminData(); // 重新获取数据
								});
							}}
							onCancel={() => {}}
							okText="确定"
							cancelText="再想想"
						>
							<Button danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Space>
				);
			},
			width: 200,
		},
	];

	// 封装了数据请求，增删改之后都要运行
	const loadAdminData = () => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});
	};

	useEffect(() => {
		loadAdminData();
	}, []);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Button type="primary">添加管理员</Button>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
			/>
		</Space>
	);
};
```

## 19.4 添加管理员

### 19.4.1 设置添加管理员的模态框

鉴于模态框内容较多，单独做一个子组件 `AdminAddAndEdit.tsx`。此时需要父子组件传递一些参数，比如模态框的打开与关闭，表单提交后父组件列表刷新等。这个表单目前还没有做权限树的设置。

```tsx
// @/views/user/AdminAddAndEdit.tsx

import { Dispatch, SetStateAction } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

type AdminAddAndEditProps = {
	modalVisible: boolean;
	// useReducer 是 useState 的底层实现
	// const [state, dispatch] = useReducer(reducer, state)
	setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const AdminAddAndEdit = (props: AdminAddAndEditProps) => {
	return (
		<Modal
			title="添加管理员"
			open={props.modalVisible}
			footer={null}
			onCancel={() => props.setModalVisible(false)}
		>
			<Form initialValues={{ role: 1 }}>
				<Form.Item
					name="adminname"
					label="管理员账户"
					rules={[
						{
							required: true,
							message: '请输入管理员账户',
						},
					]}
				>
					<Input placeholder="管理员账户" />
				</Form.Item>
				<Form.Item
					name="password"
					label="管理员密码"
					rules={[
						{
							required: true,
							message: '请输入管理员初始密码',
						},
					]}
				>
					<Input type="password" placeholder="密码" />
				</Form.Item>
				<Form.Item
					name="role"
					label="管理员角色"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select>
						<Select.Option value={1}>管理员</Select.Option>
						<Select.Option value={2}>超级管理员</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					// name="checkedkeys"
					label="管理员权限"
					rules={[
						{
							required: true,
						},
					]}
				>
					管理员权限
				</Form.Item>
				<Form.Item>
					<Button type="primary">添加</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AdminAddAndEdit;
```

在父组件里引入 modal 组件，同时定义打开关闭状态，并传递给子组件：

```tsx
// @/views/user/AdminList.tsx

import { Table, Space, Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList, removeAdmin } from '@/api/admin';

import AdminAddAndEdit from './AdminAddAndEdit';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
	checkedKeys: any[];
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const [modalVisible, setModalVisible] = useState(false); //+++

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button type="primary" shape="circle" icon={<EditOutlined />} />
						<Popconfirm
							title="确定删除吗?"
							onConfirm={() => {
								removeAdmin({ adminid: record.adminid }).then(() => {
									loadAdminData(); // 重新获取数据
								});
							}}
							onCancel={() => {}}
							okText="确定"
							cancelText="再想想"
						>
							<Button danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Space>
				);
			},
			width: 200,
		},
	];

	// 封装了数据请求，增删改之后都要运行
	const loadAdminData = () => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});
	};

	useEffect(() => {
		loadAdminData();
	}, []);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Button type="primary" onClick={() => setModalVisible(true)}>
				添加管理员
			</Button>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
			/>
			<AdminAddAndEdit modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</Space>
	);
};
```

### 19.4.2 为菜单数据添加 keyId 字段

为设置权限，需要修改 `menus`，为每条路由添加 `keyId` 字段。

```tsx
import { UploadOutlined } from '@ant-design/icons';

import { Index as Home } from '../views/home/Index';

import { Index as Banner } from '../views/banner/Index';
import { List as BannerList } from '../views/banner/List';
import { Active as BannerActive } from '../views/banner/Active';

import { Index as Pro } from '../views/pro/Index';
import { List as ProList } from '../views/pro/List';
import { Search as ProSerach } from '../views/pro/Search';

import { Index as Account } from '../views/user/Index';
import { UserList } from '../views/user/UserList';
import { AdminList } from '../views/user/AdminList';

import { Setting } from '../views/set/Setting';
import { List as Cart } from '../views/cart/Index';

export interface IMenuProps {
	keyId: string;
	label: string;
	icon?: React.ReactNode;
	key: string;
	children?: IMenuProps[];
	element: React.ReactNode;
	index?: boolean;
	hidden?: boolean;
}

const menus: IMenuProps[] = [
	{
		keyId: '0-0',
		label: '系统首页',
		icon: <UploadOutlined />,
		key: '/', // 需要跳转的链接其实就是唯一表示
		element: <Home />,
	},
	{
		keyId: '0-1',
		label: '轮播图管理',
		icon: <UploadOutlined />,
		key: '/banner',
		element: <Banner />,
		children: [
			{
				keyId: '0-1-0',
				index: true,
				label: '首页轮播图',
				icon: <UploadOutlined />,
				key: '/banner/home',
				element: <BannerList />,
			},
			{
				keyId: '0-1-1',
				label: '活动页轮播图',
				icon: <UploadOutlined />,
				key: '/banner/active',
				element: <BannerActive />,
			},
		],
	},
	{
		keyId: '0-2',
		label: '产品管理',
		icon: <UploadOutlined />,
		key: '/pro',
		element: <Pro />,
		children: [
			{
				keyId: '0-2-0',
				index: true,
				label: '产品列表',
				icon: <UploadOutlined />,
				key: '/pro/list',
				element: <ProList />,
			},
			{
				keyId: '0-2-1',
				label: '筛选列表',
				icon: <UploadOutlined />,
				key: '/pro/search',
				element: <ProSerach />,
			},
		],
	},
	{
		keyId: '0-3',
		label: '账户管理',
		icon: <UploadOutlined />,
		key: '/account',
		element: <Account />,
		children: [
			{
				keyId: '0-3-0',
				index: true,
				label: '用户列表',
				icon: <UploadOutlined />,
				key: '/account/userlist',
				element: <UserList />,
			},
			{
				keyId: '0-3-1',
				label: '管理员列表',
				icon: <UploadOutlined />,
				key: '/account/adminlist',
				element: <AdminList />,
			},
		],
	},
	{
		keyId: '0-4',
		label: '购物车管理',
		icon: <UploadOutlined />,
		key: '/cart',
		element: <Cart />,
	},
	{
		keyId: '0-5',
		label: '设置',
		icon: <UploadOutlined />,
		key: '/setting',
		element: <Setting />,
		hidden: true,
	},
];

export default menus;
```

### 19.4.3 设置管理员权限

```tsx
// @/views/user/AdminAddAndEdit.tsx

import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, Form, Input, Select, Tree } from 'antd';
import menus, { IMenuProps } from '@/router/menu';

type AdminAddAndEditProps = {
	modalVisible: boolean;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
};

interface ITreeData {
	key: string;
	title: string;
	children?: ITreeData[];
}

// 如果组件不是默认暴露，那么调用的函数放到组件中
function getTreeData(menus: IMenuProps[]) {
	const arr: ITreeData[] = [];
	menus.forEach((item) => {
		let obj: ITreeData = {
			key: '',
			title: '',
		};
		if (item.children) {
			obj = {
				key: item.keyid,
				title: item.label,
				children: getTreeData(item.children),
			};
		} else {
			obj = {
				key: item.keyid,
				title: item.label,
			};
		}
		arr.push(obj);
	});
	return arr;
}

const AdminAddAndEdit = (props: AdminAddAndEditProps) => {
	const treeData = getTreeData(menus); // 获取菜单项数据
	const [checkedKeys, setCheckedKeys] = useState(['0-0']);

	const onAdd = (values: any) => {
		values.checkedKeys = checkedKeys;
		console.log(values);
	};

	return (
		<Modal
			title="添加管理员"
			open={props.modalVisible}
			footer={null}
			onCancel={() => props.setModalVisible(false)}
		>
			<Form initialValues={{ role: 1 }} onFinish={onAdd}>
				<Form.Item
					name="adminname"
					label="管理员账户"
					rules={[
						{
							required: true,
							message: '请输入管理员账户',
						},
					]}
				>
					<Input placeholder="管理员账户" />
				</Form.Item>
				<Form.Item
					name="password"
					label="管理员密码"
					rules={[
						{
							required: true,
							message: '请输入管理员初始密码',
						},
					]}
				>
					<Input type="password" placeholder="密码" />
				</Form.Item>
				<Form.Item
					name="role"
					label="管理员角色"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select>
						<Select.Option value={1}>管理员</Select.Option>
						<Select.Option value={2}>超级管理员</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					// name="checkedkeys"
					label="角色的权限"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Tree
						checkable
						defaultExpandAll
						checkedKeys={checkedKeys}
						treeData={treeData}
						onCheck={(checkedKeys: any) => {
							setCheckedKeys(checkedKeys);
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						添加
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AdminAddAndEdit;
```

### 19.4.4 添加管理员

> 添加完毕一定要记得重置（表单，权限）

```tsx
// @/views/user/AdminAddAndEdit.tsx

import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, Form, Input, Select, Tree } from 'antd';
import menus, { IMenuProps } from '@/router/menu';
import { addAdmin } from '@/api/admin';

type AdminAddAndEditProps = {
	modalVisible: boolean;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
	loadAdminData: () => void;
};

interface ITreeData {
	key: string;
	title: string;
	children?: ITreeData[];
}

// 如果组件不是默认暴露，那么调用的函数放到组件中
function getTreeData(menus: IMenuProps[]) {
	const arr: ITreeData[] = [];
	menus.forEach((item) => {
		let obj: ITreeData = {
			key: '',
			title: '',
		};
		if (item.children) {
			obj = {
				key: item.keyid,
				title: item.label,
				children: getTreeData(item.children),
			};
		} else {
			obj = {
				key: item.keyid,
				title: item.label,
			};
		}
		arr.push(obj);
	});
	return arr;
}

const AdminAddAndEdit = (props: AdminAddAndEditProps) => {
	const treeData = getTreeData(menus); // 获取菜单项数据
	const [checkedKeys, setCheckedKeys] = useState(['0-0']);

	// 函数式组件用法 https://ant-design.gitee.io/components/form-cn/#components-form-demo-control-hooks
	const [form] = Form.useForm();

	const onAdd = (values: any) => {
		values.checkedKeys = checkedKeys;
		addAdmin(values).then(() => {
			// 模态框消失 ， 重置表单
			form.setFieldsValue({
				// 重置表单
				adminname: '',
				password: '',
				role: 1,
			});
			setCheckedKeys(['0-0']); // 重置权限
			props.setModalVisible(false); // 模态框消失
			props.loadAdminData(); // 请求新的数据
		});
	};

	return (
		<Modal
			title="添加管理员"
			open={props.modalVisible}
			footer={null}
			onCancel={() => props.setModalVisible(false)}
			getContainer={false} //Modal 添加属性 getContainer={false} ，使其挂载在当前 dom。
		>
			<Form initialValues={{ role: 1 }} onFinish={onAdd} form={form}>
				<Form.Item
					name="adminname"
					label="管理员账户"
					rules={[
						{
							required: true,
							message: '请输入管理员账户',
						},
					]}
				>
					<Input placeholder="管理员账户" />
				</Form.Item>
				<Form.Item
					name="password"
					label="管理员密码"
					rules={[
						{
							required: true,
							message: '请输入管理员初始密码',
						},
					]}
				>
					<Input type="password" placeholder="密码" />
				</Form.Item>
				<Form.Item
					name="role"
					label="管理员角色"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select>
						<Select.Option value={1}>管理员</Select.Option>
						<Select.Option value={2}>超级管理员</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					// name="checkedkeys"
					label="角色的权限"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Tree
						checkable
						defaultExpandAll
						checkedKeys={checkedKeys}
						treeData={treeData}
						onCheck={(checkedKeys: any) => {
							setCheckedKeys(checkedKeys);
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						添加
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AdminAddAndEdit;
```

从父组件传递重新加载数据的函数：

```tsx
// @/views/user/AdminList.tsx

import { Table, Space, Button, Popconfirm } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { AxiosResponse } from 'axios';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList, removeAdmin } from '@/api/admin';

import AdminAddAndEdit from './AdminAddAndEdit';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const [modalVisible, setModalVisible] = useState(false);

	const [record, setRecord] = useState<any>();
	const [type, setType] = useState('add');

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => {
								setRecord(record);
								setType('edit');
								setModalVisible(true);
							}}
						/>
						<Popconfirm
							title="确定删除吗?"
							onConfirm={() => {
								removeAdmin({ adminid: record.adminid }).then(() => {
									loadAdminData(); // 重新获取数据
								});
							}}
							onCancel={() => {}}
							okText="确定"
							cancelText="再想想"
						>
							<Button danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Space>
				);
			},
			width: 200,
		},
	];

	// 封装了数据请求，增删改之后都要运行
	const loadAdminData = () => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});
	};

	useEffect(() => {
		loadAdminData();
	}, []);

	// 添加按钮点击响应
	const onAddClick = () => {
		setModalVisible(true);
		setType('add');
	};

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Button type="primary" onClick={onAddClick}>
				添加管理员
			</Button>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
				rowSelection={rowSelection}
			/>
			<AdminAddAndEdit
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				loadAdminData={loadAdminData}
			/>
		</Space>
	);
};
```

## 19.5 管理员修改

编辑可以和添加公用同一个模态框，通过 `type` 字段控制为添加还是更新，取消模态框时要注意重置状态，更新成功时要重置状态。

```tsx
// @/views/user/AdminAddAndEdit.tsx

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, Tree, message } from 'antd';
import menus, { IMenuProps } from '@/router/menu';
import { addAdmin, updateAdmin, IAdminParams } from '@/api/admin';

type AdminAddAndEditProps = {
	modalVisible: boolean;
	setModalVisible: Dispatch<SetStateAction<boolean>>;
	loadAdminData: () => void;
	record?: any;
	type: string;
};

interface ITreeData {
	key: string;
	title: string;
	children?: ITreeData[];
}

// 如果组件不是默认暴露，那么调用的函数放到组件中
function getTreeData(menus: IMenuProps[]) {
	const arr: ITreeData[] = [];
	menus.forEach((item) => {
		let obj: ITreeData = {
			key: '',
			title: '',
		};
		if (item.children) {
			obj = {
				key: item.keyid,
				title: item.label,
				children: getTreeData(item.children),
			};
		} else {
			obj = {
				key: item.keyid,
				title: item.label,
			};
		}
		arr.push(obj);
	});
	return arr;
}

const AdminAddAndEdit = (props: AdminAddAndEditProps) => {
	const treeData = getTreeData(menus); // 获取菜单项数据
	const [checkedKeys, setCheckedKeys] = useState(['0-0']);

	// 函数式组件用法 https://ant-design.gitee.io/components/form-cn/#components-form-demo-control-hooks
	const [form] = Form.useForm();

	const onAdd = (values: any) => {
		values.checkedKeys = checkedKeys;
		addAdmin(values).then((res) => {
			// 模态框消失 ，重置表单
			form.setFieldsValue({
				// 重置表单
				adminname: '',
				password: '',
				role: 1,
			});
			setCheckedKeys(['0-0']); // 重置权限
			props.setModalVisible(false); // 模态框消失
			props.loadAdminData(); // 请求新的数据

			// 反馈信息
			if (res.data.code === '10004') {
				message.warning(res.data.message);
			} else {
				message.info(res.data.message);
			}
		});
	};

	const onUpdate = (values: IAdminParams) => {
		values.checkedKeys = checkedKeys;
		updateAdmin(values).then((res) => {
			form.setFieldsValue({
				adminname: '',
				password: '',
				role: 1,
			});
			setCheckedKeys(['0-0']);
			props.setModalVisible(false); // 模态框消失
			props.loadAdminData(); // 请求新的数据

			// 反馈信息
			if (res.data.code === '10004') {
				message.warning(res.data.message);
			} else {
				message.info(res.data.message);
			}
		});
	};

	useEffect(() => {
		if (props.type === 'edit') {
			form.setFieldsValue({
				adminname: props.record.adminname,
				role: props.record.role,
			});
			setCheckedKeys(props.record.checkedKeys);
		} else {
			form.setFieldsValue({
				// 重置表单
				adminname: '',
				password: '',
				role: 1,
			});
			setCheckedKeys(['0-0']); // 重置权限
		}
	}, [props.type, props.record, form]);

	return (
		<Modal
			title={props.type === 'add' ? '添加管理员' : '修改管理员权限'}
			open={props.modalVisible}
			footer={null}
			forceRender={true}
			onCancel={() => props.setModalVisible(false)}
			getContainer={false} //Modal 添加属性 getContainer={false} ，使其挂载在当前 dom。
		>
			<Form
				initialValues={{ role: 1 }}
				onFinish={props.type === 'add' ? onAdd : onUpdate}
				form={form}
			>
				<Form.Item
					name="adminname"
					label="管理员账户"
					rules={[
						{
							required: true,
							message: '请输入管理员账户',
						},
					]}
				>
					<Input placeholder="管理员账户" />
				</Form.Item>
				<Form.Item
					name="password"
					label="管理员密码"
					rules={[
						{
							required: true,
							message: '请输入管理员初始密码',
						},
					]}
				>
					<Input type="password" placeholder="密码" />
				</Form.Item>
				<Form.Item
					name="role"
					label="管理员角色"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select>
						<Select.Option value={1}>管理员</Select.Option>
						<Select.Option value={2}>超级管理员</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					// name="checkedkeys"
					label="角色的权限"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Tree
						checkable
						defaultExpandAll
						checkedKeys={checkedKeys}
						treeData={treeData}
						onCheck={(checkedKeys: any) => {
							setCheckedKeys(checkedKeys);
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{props.type === 'add' ? '添加' : '更新'}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AdminAddAndEdit;
```

`AdminList` 组件需要把 type 和 record 信息传递给子组件 `AdminAddAndEdit`：

```tsx
// @/views/user/AdminList.tsx

import { Table, Space, Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList, removeAdmin } from '@/api/admin';

import AdminAddAndEdit from './AdminAddAndEdit';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const [modalVisible, setModalVisible] = useState(false);

	const [record, setRecord] = useState<any>();
	const [type, setType] = useState('add');

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => {
								setRecord(record);
								setType('edit');
								setModalVisible(true);
							}}
						/>
						<Popconfirm
							title="确定删除吗?"
							onConfirm={() => {
								removeAdmin({ adminid: record.adminid }).then(() => {
									loadAdminData(); // 重新获取数据
								});
							}}
							onCancel={() => {}}
							okText="确定"
							cancelText="再想想"
						>
							<Button danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Space>
				);
			},
			width: 200,
		},
	];

	// 封装了数据请求，增删改之后都要运行
	const loadAdminData = () => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});
	};

	useEffect(() => {
		loadAdminData();
	}, []);

	// 添加按钮点击响应
	const onAddClick = () => {
		setModalVisible(true);
		setType('add');
	};

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Button type="primary" onClick={onAddClick}>
				添加管理员
			</Button>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
			/>
			<AdminAddAndEdit
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				loadAdminData={loadAdminData}
				record={record}
				type={type}
			/>
		</Space>
	);
};
```

## 19.6 批量删除

批量删除参见 Antd 文档：

https://ant-design.gitee.io/components/table-cn/#components-table-demo-row-selection-custom

```tsx
// @/views/user/AdminList.tsx

import { Table, Space, Button, Popconfirm } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { AxiosResponse } from 'axios';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getAdminList, removeAdmin } from '@/api/admin';

import AdminAddAndEdit from './AdminAddAndEdit';

type AdminListProps = {};

interface DataType {
	adminid: string;
	adminname: number;
	password: string;
	role: number;
}

export const AdminList = (props: AdminListProps) => {
	const [adminList, setAdminList] = useState([]);
	const [height] = useState(document.body.offsetHeight);

	const [current, setCurrent] = useState(1); // 页码
	const [pageSize, setPageSize] = useState(10); // 每页显示个数

	const [modalVisible, setModalVisible] = useState(false);

	const [record, setRecord] = useState<any>();
	const [type, setType] = useState('add');

	const columns: ColumnsType<DataType> = [
		{
			title: '序号',
			align: 'center',
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
			width: 100,
		},
		{
			title: '账户',
			align: 'center',
			dataIndex: 'adminname',
		},
		{
			title: '角色',
			align: 'center',
			dataIndex: 'role',
			render: (text) => {
				return text === 2 ? '超级管理员' : '管理员';
			},
			width: 200,
		},
		{
			title: '操作',
			align: 'center',
			render: (text, record, index) => {
				return (
					<Space>
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() => {
								setRecord(record);
								setType('edit');
								setModalVisible(true);
							}}
						/>
						<Popconfirm
							title="确定删除吗?"
							onConfirm={() => {
								removeAdmin({ adminid: record.adminid }).then(() => {
									loadAdminData(); // 重新获取数据
								});
							}}
							onCancel={() => {}}
							okText="确定"
							cancelText="再想想"
						>
							<Button danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Space>
				);
			},
			width: 200,
		},
	];

	// 封装了数据请求，增删改之后都要运行
	const loadAdminData = () => {
		getAdminList().then((res) => {
			setAdminList(res.data.data);
		});
	};

	useEffect(() => {
		loadAdminData();
	}, []);

	// 添加按钮点击响应
	const onAddClick = () => {
		setModalVisible(true);
		setType('add');
	};

	// 批量删除数据 // +++++++++
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中需要删除的数据
	const onSelectChange = (newSelectedRowKeys: any) => {
		// 点击选中时的数据事件
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection: TableRowSelection<DataType> = {
		// 最左侧选择框选项
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const showDeleteMoreBtn = useMemo(() => {
		// 计算属性 有选中则出现批量删除，没有选中 则不出现
		return selectedRowKeys.length;
	}, [selectedRowKeys]);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Space>
				<Button type="primary" onClick={onAddClick}>
					添加管理员
				</Button>
				{showDeleteMoreBtn > 0 ? (
					<Button
						type="primary"
						danger
						onClick={() => {
							// 保证所有的数据删除之后再刷新视图
							// 保证所有的数据都操作完，第一时间想到的是 Promise.all()
							// Promise.all 方法中参数为一个数组，数组的元素的返回值都基于 promise
							// 一个页面5给请求，保证都请求完成之后操作,请求结果 分别对应前面的5各请求
							// Promise.all([请求1， 请求2， 请求3，请求4，请求5]).then(result=> {})
							const removeArr: AxiosResponse<any, any>[] = [];
							selectedRowKeys.forEach(async (item) => {
								removeArr.push(await removeAdmin({ adminid: item }));
							});
							Promise.all(removeArr).then((res) => {
								loadAdminData();
							});
						}}
					>
						批量删除
					</Button>
				) : null}
			</Space>
			<Table
				dataSource={adminList}
				columns={columns}
				bordered
				scroll={{ y: height - 300 }}
				rowKey="adminid"
				pagination={{
					position: ['bottomRight'],
					current,
					pageSize,
					onChange: (page, pageSize) => {
						setCurrent(page);
						setPageSize(pageSize);
					},
					showTotal: (total) => {
						return <span>共有{total}条数据</span>;
					},
					showQuickJumper: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
				rowSelection={rowSelection}
			/>
			<AdminAddAndEdit
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				loadAdminData={loadAdminData}
				record={record}
				type={type}
			/>
		</Space>
	);
};
```

# 二十、首页数据统计

在首页显示统计信息，统计用户数量和产品数量：

```tsx
// src/api/homt.ts
import request from '../utils/request';

export function getShopsNum() {
	return request({
		url: '/statistic/product',
	});
}

export function getUsersNum() {
	return request({
		url: '/statistic/user',
	});
}
```

```tsx
// src/views/home/Index.tsx

import { useEffect, useState } from 'react';
import { getShopsNum, getUsersNum } from '../../api/home';
import { Row, Col, Statistic, Card } from 'antd';
import { UsergroupDeleteOutlined, ShoppingOutlined } from '@ant-design/icons';

type IndexProps = {};

export const Index = (props: IndexProps) => {
	const [shopsNum, setShopsNum] = useState(0);
	const [usersNum, setUsersNum] = useState(0);

	useEffect(() => {
		Promise.all([getShopsNum(), getUsersNum()]).then((result) => {
			setShopsNum(result[0].data.data);
			setUsersNum(result[1].data.data);
		});
	}, []);
	return (
		<>
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						<Statistic
							title="商品总数量："
							value={shopsNum}
							prefix={<ShoppingOutlined />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="用户总数量："
							value={usersNum}
							prefix={<UsergroupDeleteOutlined />}
						/>
					</Card>
				</Col>
			</Row>
		</>
	);
};
```

# 二十一、左侧菜单权限

当用户登录的时候，可以获取到该用户的 `checkedKeys` 数据，而使用这个数组可以从 `router/menu.tsx`中提取匹配的数据，然后再作用于左侧菜单栏组件（目前是直接渲染`router/menu.tsx`）
