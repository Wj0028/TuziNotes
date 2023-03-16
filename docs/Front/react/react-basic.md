---
title: React-16
icon: text
---

# 一、关于 React

英文官网：https://reactjs.org/

中文官网：https://zh-hans.reactjs.org/

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。

react 在发展过程中，一直跟随原生 js 的脚步

2015 年推出了使用 react 来编写移动端的 app ---- react-native

重要版本发版时间

| 序号 | 版本号 | 发版时间            | 重要更新                   |
| ---- | ------ | ------------------- | -------------------------- |
| 1    | 16     | 2017 年 9 月 26     | 引入 es6 的类组件          |
| 2    | 16.3   | 2018 年 4 月 3 日   | 生命周期更新               |
| 3    | 16.4   | 2018 年 5 月 23 日  | 生命周期更新               |
| 4    | 16.8   | 2019 年 2 月 6 日   | 引入 react hooks           |
| 5    | 17.0   | 2020 年 10 月 20 日 | 过渡版本                   |
| 6    | 18.0   | 2022 年 3 月 29 日  | 写法改变，严格模式发生改变 |

# 二、脚手架

英文官网：https://create-react-app.dev/

中文官网：https://create-react-app.bootcss.com/

## 2.1 create-react-app 脚手架的使用

> Create React App 让你仅通过一行命令，即可构建现代化的 Web 应用。
>
> 本文档之后称之为 cra

创建项目的方式:

> 需要保证电脑安装 node 版本在 14 以上，系统在 win7 以上

```sh
# 方式1:使用npx
$ npx create-react-app react-basic
# 方式2:使用npm
$ npm init react-app react-basic
# 方式3:使用yarn
$ yarn create react-app react-basic
```

如果需要使用 ts 开发项目，创建项目时可以通过`--template typescript`指定模版

```sh
$ npx create-react-app myapp --template typescript
```

如果出现如下内容，即代表项目创建成功

```sh
Success! Created react-basic at /Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic
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

  cd react-basic
  npm start

Happy hacking!
```

## 2.2 项目目录解析

项目创建完毕生成目录结构如下：

```sh
react-basic
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js // 做性能测试
    └── setupTests.js // 测试
```

`src/reportWebVitals.js`

```js
const reportWebVitals = (onPerfEntry) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry); // 衡量视觉稳定性。为了提供一个好的用户体验，CLS应该小于0.1
			getFID(onPerfEntry); // 衡量可交互性。为了提供一个好的用户体验，FID应该在100毫秒内。
			getFCP(onPerfEntry); // 首次内容绘制
			getLCP(onPerfEntry); // 衡量加载性能。为了提供一个好的用户体验，LCP应该在2.5秒内
			getTTFB(onPerfEntry); // 到第一个字节的时间
		});
	}
};
export default reportWebVitals;
```

> react 官方文档已经给了我们性能提升的方案：https://zh-hans.reactjs.org/docs/optimizing-performance.html

打开`package.json`,发现可运行命令如下：

```json
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

`start`指令用于启动开发者服务器

`build`指令用于打包项目

`test`指令用于测试

`eject`指令用于抽离配置文件

> `cra`脚手架基于`webpack`，默认`webpack`的配置在 `node_modules `下的` react-scripts` 内部,但是一般情况下，传输代码时，不会上传 `node_modules`，那么久必须得抽离配置文件。

## 2.3 抽离配置文件

通过`npm run eject`或者`cnpm run eject` 或者`yarn eject`指令抽离配置文件

> 抽离配置文件过程中注意事项
>
> -   1.确保项目的 git 仓库是最新的
> -   2.如果不需要对于 webpack 进行配置，那么不需要抽离配置文件

```sh
Copying files into /Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic
  Adding /config/env.js to the project
  Adding /config/getHttpsConfig.js to the project
  Adding /config/modules.js to the project
  Adding /config/paths.js to the project
  Adding /config/webpack.config.js to the project
  Adding /config/webpackDevServer.config.js to the project
  Adding /config/jest/babelTransform.js to the project
  Adding /config/jest/cssTransform.js to the project
  Adding /config/jest/fileTransform.js to the project
  Adding /scripts/build.js to the project
  Adding /scripts/start.js to the project
  Adding /scripts/test.js to the project
  Adding /config/webpack/persistentCache/createEnvironmentHash.js to the project

Updating the dependencies
  Removing react-scripts from dependencies
  Adding @babel/core to dependencies
  Adding @pmmmwh/react-refresh-webpack-plugin to dependencies
  Adding @svgr/webpack to dependencies
  Adding babel-jest to dependencies
  Adding babel-loader to dependencies
  Adding babel-plugin-named-asset-import to dependencies
  Adding babel-preset-react-app to dependencies
  Adding bfj to dependencies
  Adding browserslist to dependencies
  Adding camelcase to dependencies
  Adding case-sensitive-paths-webpack-plugin to dependencies
  Adding css-loader to dependencies
  Adding css-minimizer-webpack-plugin to dependencies
  Adding dotenv to dependencies
  Adding dotenv-expand to dependencies
  Adding eslint to dependencies
  Adding eslint-config-react-app to dependencies
  Adding eslint-webpack-plugin to dependencies
  Adding file-loader to dependencies
  Adding fs-extra to dependencies
  Adding html-webpack-plugin to dependencies
  Adding identity-obj-proxy to dependencies
  Adding jest to dependencies
  Adding jest-resolve to dependencies
  Adding jest-watch-typeahead to dependencies
  Adding mini-css-extract-plugin to dependencies
  Adding postcss to dependencies
  Adding postcss-flexbugs-fixes to dependencies
  Adding postcss-loader to dependencies
  Adding postcss-normalize to dependencies
  Adding postcss-preset-env to dependencies
  Adding prompts to dependencies
  Adding react-app-polyfill to dependencies
  Adding react-dev-utils to dependencies
  Adding react-refresh to dependencies
  Adding resolve to dependencies
  Adding resolve-url-loader to dependencies
  Adding sass-loader to dependencies
  Adding semver to dependencies
  Adding source-map-loader to dependencies
  Adding style-loader to dependencies
  Adding tailwindcss to dependencies
  Adding terser-webpack-plugin to dependencies
  Adding webpack to dependencies
  Adding webpack-dev-server to dependencies
  Adding webpack-manifest-plugin to dependencies
  Adding workbox-webpack-plugin to dependencies

Updating the scripts
  Replacing "react-scripts start" with "node scripts/start.js"
  Replacing "react-scripts build" with "node scripts/build.js"
  Replacing "react-scripts test" with "node scripts/test.js"

Configuring package.json
  Adding Jest configuration
  Adding Babel preset

Running npm install...

up to date in 4s

203 packages are looking for funding
  run `npm fund` for details
Ejected successfully!
```

```sh
$ npm start
$ npm build
```

## 2.4 webpack 二次封装

### 2.4.1 集成 css 预处理器

-   **集成 less 预处理器**

```sh
$ cnpm i less less-loader -D
```

-   **集成 sass 预处理器**

```sh
$ cnpm i node-sass -D
```

-   **集成 stylus 预处理器**

```
$ cnpm i stylus stylus-loader -D
```

具体配置如下：

`React-basic/config/webpack.config.js`

```js
// style files regexes 可以搜索此关键字快速定位
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const stylusRegex = /\.stylus/;
const stylusModuleRegex = /\.module\.stylus/;

// "postcss" loader applies autoprefixer to our CSS.可以搜索此关键字快速定位
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use MiniCSSExtractPlugin to extract that CSS
// to a file, but in development "style" loader enables hot editing
// of CSS.
// By default we support CSS Modules with the extension .module.css
{
  test: cssRegex,
    exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
        modules: {
          mode: 'icss',
        },
      }),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
},
  // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
  // using the extension .module.css
  {
    test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
        modules: {
          mode: 'local',
          getLocalIdent: getCSSModuleLocalIdent,
        },
      }),
  },
    // Opt-in support for SASS (using .scss or .sass extensions).
    // By default we support SASS Modules with the
    // extensions .module.scss or .module.sass
    {
      test: sassRegex,
        exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction
              ? shouldUseSourceMap
              : isEnvDevelopment,
              modules: {
                mode: 'icss',
              },
            },
            'sass-loader'
          ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
    },
      // Adds support for CSS Modules, but using SASS
      // using the extension .module.scss or .module.sass
      {
        test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction
              ? shouldUseSourceMap
              : isEnvDevelopment,
              modules: {
                mode: 'local',
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
            'sass-loader'
          ),
      },
        {
          test: lessRegex,
            exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                  modules: {
                    mode: 'icss',
                  },
                },
                'less-loader'
              ),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
        },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                  modules: {
                    mode: 'local',
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'less-loader'
              ),
          },
     {
          test: stylusRegex,
            exclude: stylusModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                  modules: {
                    mode: 'icss',
                  },
                },
                'stylus-loader'
              ),
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
        },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: stylusModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
                  modules: {
                    mode: 'local',
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'stylus-loader'
              ),
          },
```

### 2.4.2 配置@解析别名

> vue 项目中可以使用@代替 src 目录，那么 react 中抽离配置文件之后也可以实现此功能

`react-basic/config/webpack.config.js`

```js
alias: {
  '@': path.resolve('src'), // +++++++++++++
    // Support React Native Web 搜索此关键词快速定位
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
      // Allows for better profiling with ReactDevTools
      ...(isEnvProductionProfile && {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
      ...(modules.webpackAliases || {}),
},
```

> 如果是 ts 项目，需要在`tsconfig.json`中加入如下配置
>
> ```json
> {
> 	"compilerOptions": {
> 		"target": "es6", // ts代码以es5为标准
> 		"lib": ["dom", "dom.iterable", "esnext"],
> 		"paths": {
> 			// ++++++++++
> 			"@/*": ["./src/*"]
> 		},
> 		"allowJs": true,
> 		"skipLibCheck": true,
> 		"esModuleInterop": true,
> 		"allowSyntheticDefaultImports": true,
> 		"strict": true,
> 		"forceConsistentCasingInFileNames": true,
> 		"noFallthroughCasesInSwitch": true,
> 		"module": "esnext",
> 		"moduleResolution": "node",
> 		"resolveJsonModule": true,
> 		"isolatedModules": true,
> 		"noEmit": true,
> 		"jsx": "react-jsx"
> 	},
> 	"include": [
> 		"src",
> 		"src/**/*" // ++++++++++
> 	]
> }
> ```

`src/index.js` 测试

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css'; // ++++++
import App from '@/App'; // ++++++
import reportWebVitals from '@/reportWebVitals'; // ++++++

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

如果控制台报错如下，说明@别名没有配置成功

```js
Failed to compile.

Module not found: Error: Can't resolve '@/index.css' in '/Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic/src'
ERROR in ./src/index.js 6:0-21
Module not found: Error: Can't resolve '@/index.css' in '/Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic/src'

ERROR in ./src/index.js 7:0-24
Module not found: Error: Can't resolve '@/App' in '/Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic/src'

ERROR in ./src/index.js 8:0-48
Module not found: Error: Can't resolve '@/reportWebVitals' in '/Users/wudaxun/Desktop/workspace/code/bk2207A/code/react-course/react-basic/src'

webpack compiled with 3 errors
```

如果没有错误说明配置是成功的。

> 如果不抽离配置文件，但是也需要配置别名@
>
> ```sh
> $ cnpm i @craco/craco -D
> ```
>
> 项目根目录中创建 craco 的配置文件：`craco.config.js`
>
> ```js
> const path = require('path');
> module.exports = {
> 	webpack: {
> 		alias: {
> 			'@': path.resolve(__dirname, 'src'),
> 		},
> 	},
> };
> ```
>
> 重启服务器即可生效

## 2.5 setupProxy 代理

> 即使不抽离配置文件，也是在此处配置代理

首先，`http-proxy-middleware`使用 npm 或 Yarn 安装：

```sh
$ cnpm install http-proxy-middleware -S
$ # or
$ yarn add http-proxy-middleware -S
```

接下来，创建`src/setupProxy.js`并在其中放置以下内容：

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	// ...
};
```

您现在可以根据需要注册代理了！这是使用上述内容的示例`http-proxy-middleware`：

```js
const { createProxyMiddleware } = require('http-proxy-middleware'); // 此处不使用import语法

module.exports = function (app) {
	// http://121.89.205.189:3001/api/pro/list ==> /myapi/pro/list
	app.use(
		'/myapi',
		createProxyMiddleware({
			target: 'http://121.89.205.189:3001/api',
			changeOrigin: true,
			pathRewrite: {
				'^/myapi': '',
			},
		})
	);
};
```

> **注意：**您不需要在任何地方导入此文件。当您启动开发服务器时，它会自动注册。

> **注意：**此文件仅支持 Node 的 JavaScript 语法。确保只使用受支持的语言功能（即不支持 Flow、ES 模块等）。

> **注意：**将路径传递给代理函数允许您在路径上使用通配符和/或模式匹配，这比快速路由匹配更灵活。

# 三、JSX

设想如下变量声明：

```js
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，是一个 JavaScript 的语法扩展。

JSX 可以生成 React “元素”。

> React [不强制要求](https://zh-hans.reactjs.org/docs/react-without-jsx.html)使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。

`src`文件夹下只保留`index.js`（拷贝至 src-01-basic）

## 3.1 jsx 语法详解

在下面的例子中，我们声明了一个名为 `name` 的变量，然后在 JSX 中使用它，并将它包裹在大括号中

`src/index.js`

```js
import React from 'react'; // 固定
import ReactDOM from 'react-dom/client'; // 固定

const name = <h1>阿斯顿！</h1>;
const element = <div>hello, {name} </div>;

const root = ReactDOM.createRoot(document.getElementById('root')); // 固定

root.render(element); // 固定
```

> 以上的写法属于 React18 的写法，react18 以前这么写
>
> ```js
> import React from 'react'; // 固定
> import ReactDOM from 'react-dom'; // 固定
>
> const name = <h1>阿斯顿！</h1>;
> const element = <div>hello, {name} </div>;
>
> ReactDOM.render(element, document.getElementById('root'));
> ```

> 在 JSX 语法中，你可以在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)。例如，`2+2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

在下面的示例中，我们将调用 JavaScript 函数 `formatName(user)` 的结果，并将结果嵌入到 `<div>` 元素中。

`src/index.js`

```js
import React from 'react'; // 固定
import ReactDOM from 'react-dom/client'; // 固定

function formatName(user) {
	return user.firstName + ' ' + user.lastName;
}

const user = {
	firstName: '陆',
	lastName: '荣涛',
};

// const name = <h1>阿斯顿！</h1>
// const element = <div>hello, { name } </div>

// const element = <div>hello, { formatName(user) } </div>
//  为了便于阅读，我们会将 JSX 拆分为多行。
// 同时，我们建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱。
const element = (
	<div>
		hello,
		{formatName(user)}
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root')); // 固定

root.render(element); // 固定
```

**jsx 也是一个表达式**

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX

`src/index.js`

```js
import React from 'react'; // 固定
import ReactDOM from 'react-dom/client'; // 固定

function formatName(user) {
	return user.firstName + ' ' + user.lastName;
}

const user = {
	firstName: '陆',
	lastName: '荣涛',
};

// const name = <h1>阿斯顿！</h1>
// const element = <div>hello, { name } </div>

// const element = <div>hello, { formatName(user) } </div>
//  为了便于阅读，我们会将 JSX 拆分为多行。
// 同时，我们建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱。
// const element = (
//   <div>
//     hello,
//     { formatName(user) }
//   </div>
// )

function getGreeting(user) {
	if (user) {
		return <div>hello, {formatName(user)}! </div>;
	}
	return <div> hello, stronger</div>;
}

// const element = getGreeting() // hello, stronger
const element = getGreeting(user); // hello, 陆 荣涛!

const root = ReactDOM.createRoot(document.getElementById('root')); // 固定

root.render(element); // 固定
```

> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
>
> 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

> 上述代码都没见到使用过 React 模块，但是显示却用了，为什么？

## 3.2 React.createElement

先看一个代码

`src/index.js`

```js
import React from 'react'; // 固定
import ReactDOM from 'react-dom/client'; // 固定
// 因为 JSX 语法上更接近 JavaScript 而不是 HTML，
// 所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，
// 而不使用 HTML 属性名称的命名约定。

// 例如，JSX 里的 `class` 变成了 className
// class 在React中被看做了关键字
const element = <h1 className="greeting">Hello, world!</h1>;

const root = ReactDOM.createRoot(document.getElementById('root')); // 固定

root.render(element); // 固定
```

再看一个代码：

`src/index.js`

```js
import React from 'react'; // 固定
import ReactDOM from 'react-dom/client'; // 固定
// 因为 JSX 语法上更接近 JavaScript 而不是 HTML，
// 所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，
// 而不使用 HTML 属性名称的命名约定。

// 例如，JSX 里的 `class` 变成了 className
// class 在React中被看做了关键字
// const element = (
//   <h1 className="greeting">
//     Hello, world!
//   </h1>
// );

const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!!!!');

const root = ReactDOM.createRoot(document.getElementById('root')); // 固定

root.render(element); // 固定
```

`React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
	type: 'h1',
	props: {
		className: 'greeting',
		children: 'Hello, world!',
	},
};
```

这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

# 四、组件定义

组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

## 4.1 类组件

ES6 的加入让 JavaScript 直接支持使用 class 来定义一个类，react 的创建类组件的方式就是使用的类的继承，`ES6 class`是一种使用 React 组件的写法，它使用了 ES6 标准语法来构建

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 使用es6的类实现React的类组件
// 依据es6的类的继承
// 组件的首字母必须大写
class App extends React.Component {
	// render函数是 类组件必须实现的一个 方法，同时也是react组件唯一一个必不可少的方法
	// 在render函数内部一定要返回 jsx 代码（也可以写React.createElement）
	// 如果jsx代码足够复杂，记得使用()包裹jsx代码
	// render 函数是react 类组件的生命周期的钩子函数
	render() {
		return <h1>hello react class component</h1>;
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// 以标签的形式调用组件
root.render(<App />);
```

## 4.2 函数组件

定义组件最简单的方式就是编写 JavaScript 函数

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 组件的首字母必须大写，必须返回jsx代码
// function App () {
//   doSomething....
//   return (
//     <h1>hello react function component</h1>
//   )
// }

// const App = function () {
//   doSomething....
//   return (
//     <h1>hello react function component</h1>
//   )
// }

// const App = () => {
//   doSomething....
//   return <h1>hello react function component!</h1>
// }

// 无法编写业务
const App = () => <h1>hello react function component!!</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));

// 以标签的形式调用组件
root.render(<App />);
```

## 4.3 两组组件的区别

-   组件的定义方式不同。
-   生命周期不同：类组件有，函数式组件没有。
-   副作用操作执行不同：class 组件通过生命周期函数，函数组件用 hook 的 useEffect。
-   state 的定义、读取、修改方式不同：函数组件用 hook 的 useState。
-   this： class 组件有，函数式组件没有。
-   实例： class 组件有，函数时组件没有。
-   ref 使用不同：类组件可以获取子组件实例，函数式组件不可以，因为函数式组件没有实例。

> 官方推荐使用函数式组件,以上不同点虽然现在不明白是啥意思，没有关系，会随着大家的学习印象加深。

# 五、Props

## 5.1 Props 详解

`props`是正常是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更改，但是你可以通过父组件主动重新渲染的方式来传入新的 `props`

React 非常灵活，但它也有一个严格的规则：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

> 纯函数：输入一定，输出一定确定

总的来说，在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为组件 `props` 对象的键值。

通过箭头函数创建的组件，需要通过函数的参数来接收`props`

通过类创建的组件，需要通过 `this.props`来接收

组件可以在其输出中引用其他组件。

这就可以让我们用同一组件来抽象出任意层次的细节。

按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

## 5.2 父子组件通信

### 5.2.1 构建一个父子组件

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
import App from './01-App-parent-child';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/01-App-parent-child.jsx`

```js
import React from 'react';
// ？ 为什么react中组件的首字母必须大写？
// 如果小写，被视为 html 固有的标签，而html固有标签如果没有，则不显示

const Header = () => {
	return <header>react 核心库只关注于视图层</header>;
};

class Content extends React.Component {
	render() {
		return <div>react 16.8 推出了 react hooks</div>;
	}
}

const Footer = () => {
	return <footer>react真的很简单</footer>;
};

class App extends React.Component {
	render() {
		return (
			<div>
				<Header></Header>
				<Content></Content>
				<Footer></Footer>
			</div>
		);
	}
}

export default App;
```

### 5.2.2 父组件给子组件传值

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
import App from './02-App-parent-child-value';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/02-App-parent-child-value.jsx`

```js
import React from 'react';
// 父组件在调用子组件的地方，添加自定义的属性，如果属性的值是变量，boolean类型，
// number类型，对象，数组，null，undefined, 函数，需要使用 {} 包裹

// 如果子组件是类组件，在子组件的内部，可以通过 this.props 访问到父组件传递的数据
// 如果子组件是函数式组件，函数拥有默认参数为props，可以通过 props 访问到父组件传递的数据

const Header = (props) => {
	console.log(props); // { name: 'React.js' }
	return <header>{props.name} 核心库只关注于视图层</header>;
};

class Content extends React.Component {
	render() {
		console.log(this.props); // {version: 16.8}
		return <div>react {this.props.version} 推出了 react hooks</div>;
	}
}

const Footer = ({ msg }) => {
	// 从props对象解构了msg
	return <footer>react真的很{msg}</footer>;
};

class App extends React.Component {
	render() {
		return (
			<div>
				<Header name="React.js"></Header>
				<Content version={16.8}></Content>
				<Footer msg="简单"></Footer>
			</div>
		);
	}
}

export default App;
```

### 5.2.3 父组件给子组件传值设置默认值

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
import App from './03-App-parent-child-value-default';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/03-App-parent-child-value-default.jsx`

```jsx
import React from 'react';
// 父组件在调用子组件的地方，添加自定义的属性，如果属性的值是变量，boolean类型，
// number类型，对象，数组，null，undefined, 函数，需要使用 {} 包裹

// 如果子组件是类组件，在子组件的内部，可以通过 this.props 访问到父组件传递的数据
// 如果子组件是函数式组件，函数拥有默认参数为props，可以通过 props 访问到父组件传递的数据

// 如果需要给子组件设置默认值
// 不管是类组件 还是 函数式组件，在定义组件之后，添加defaultProps属性即可
// 如果是类组件，还可以通过 类的静态属性 设置默认值

const Header = (props) => {
	console.log(props); // { name: 'React.js' }
	return <header>{props.name} 核心库只关注于视图层</header>;
};
Header.defaultProps = {
	name: 'React.js',
};

class Content extends React.Component {
	static defaultProps = {
		// 类的静态属性
		version: 16.8,
	};
	render() {
		console.log(this.props); // {version: 16.8}
		return <div>react {this.props.version} 推出了 react hooks!</div>;
	}
}
// Content.defaultProps = {
//   version: 16.8
// }

const Footer = ({ msg }) => {
	// 从props对象解构了msg
	return <footer>react真的很{msg}</footer>;
};
Footer.defaultProps = {
	msg: '简单',
};
class App extends React.Component {
	render() {
		return (
			<div>
				{/* <Header name="React.js"></Header>
        <Content version={ 16.8 }></Content>
        <Footer msg="简单"></Footer> */}
				<Header></Header>
				<Content></Content>
				<Footer></Footer>
			</div>
		);
	}
}

export default App;
```

### 5.2.4 使用 prop-types 属性验证

> 自 React v15.5 起，`React.PropTypes` 已移入另一个包中。请使用 [`prop-types` 库](https://www.npmjs.com/package/prop-types) 代替。
>
> ```sh
> $ npm i prop-types -S
> ```
>
> ```jsx
> import PropTypes from 'prop-types';
>
> MyComponent.propTypes = {
> 	// 你可以将属性声明为 JS 原生类型，默认情况下
> 	// 这些属性都是可选的。
> 	optionalArray: PropTypes.array,
> 	optionalBool: PropTypes.bool,
> 	optionalFunc: PropTypes.func,
> 	optionalNumber: PropTypes.number,
> 	optionalObject: PropTypes.object,
> 	optionalString: PropTypes.string,
> 	optionalSymbol: PropTypes.symbol,
>
> 	// 任何可被渲染的元素（包括数字、字符串、元素或数组）
> 	// (或 Fragment) 也包含这些类型。
> 	optionalNode: PropTypes.node,
>
> 	// 一个 React 元素。
> 	optionalElement: PropTypes.element,
>
> 	// 一个 React 元素类型（即，MyComponent）。
> 	optionalElementType: PropTypes.elementType,
>
> 	// 你也可以声明 prop 为类的实例，这里使用
> 	// JS 的 instanceof 操作符。
> 	optionalMessage: PropTypes.instanceOf(Message),
>
> 	// 你可以让你的 prop 只能是特定的值，指定它为
> 	// 枚举类型。
> 	optionalEnum: PropTypes.oneOf(['News', 'Photos']),
>
> 	// 一个对象可以是几种类型中的任意一个类型
> 	optionalUnion: PropTypes.oneOfType([
> 		PropTypes.string,
> 		PropTypes.number,
> 		PropTypes.instanceOf(Message),
> 	]),
>
> 	// 可以指定一个数组由某一类型的元素组成
> 	optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
>
> 	// 可以指定一个对象由某一类型的值组成
> 	optionalObjectOf: PropTypes.objectOf(PropTypes.number),
>
> 	// 可以指定一个对象由特定的类型值组成
> 	optionalObjectWithShape: PropTypes.shape({
> 		color: PropTypes.string,
> 		fontSize: PropTypes.number,
> 	}),
>
> 	// An object with warnings on extra properties
> 	optionalObjectWithStrictShape: PropTypes.exact({
> 		name: PropTypes.string,
> 		quantity: PropTypes.number,
> 	}),
>
> 	// 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
> 	// 这个 prop 没有被提供时，会打印警告信息。
> 	requiredFunc: PropTypes.func.isRequired,
>
> 	// 任意类型的必需数据
> 	requiredAny: PropTypes.any.isRequired,
>
> 	// 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
> 	// 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
> 	customProp: function (props, propName, componentName) {
> 		if (!/matchme/.test(props[propName])) {
> 			return new Error(
> 				'Invalid prop `' +
> 					propName +
> 					'` supplied to' +
> 					' `' +
> 					componentName +
> 					'`. Validation failed.'
> 			);
> 		}
> 	},
>
> 	// 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
> 	// 它应该在验证失败时返回一个 Error 对象。
> 	// 验证器将验证数组或对象中的每个值。验证器的前两个参数
> 	// 第一个是数组或对象本身
> 	// 第二个是他们当前的键。
> 	customArrayProp: PropTypes.arrayOf(function (
> 		propValue,
> 		key,
> 		componentName,
> 		location,
> 		propFullName
> 	) {
> 		if (!/matchme/.test(propValue[key])) {
> 			return new Error(
> 				'Invalid prop `' +
> 					propFullName +
> 					'` supplied to' +
> 					' `' +
> 					componentName +
> 					'`. Validation failed.'
> 			);
> 		}
> 	}),
> };
> ```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
import App from './04-App-parent-child-value-default-type';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/04-App-parent-child-value-default-type.jsx`

```js
import React from 'react';
import PropTypes from 'prop-types';
// 父组件在调用子组件的地方，添加自定义的属性，如果属性的值是变量，boolean类型，
// number类型，对象，数组，null，undefined, 函数，需要使用 {} 包裹

// 如果子组件是类组件，在子组件的内部，可以通过 this.props 访问到父组件传递的数据
// 如果子组件是函数式组件，函数拥有默认参数为props，可以通过 props 访问到父组件传递的数据

// 如果需要给子组件设置默认值
// 不管是类组件 还是 函数式组件，在定义组件之后，添加defaultProps属性即可
// 如果是类组件，还可以通过 类的静态属性 设置默认值

// 如果需要验证父组件传递的数据的 数据类型
// 需要通过第三方模块 prop-types 完成
// 不管是类组件还是函数式组件，都是在定义组件之后，完成类型的校验
// 通过 组件.propTypes 完成，写法为对象
// key值为 父组件调用子组件的时候设置的 自定义的属性名
// value 值为 PropTypes.数据类型

// 如果自定义的属性值是必须得传递的，那么通过 PropTypes.数据类型.isRequired 完成
// 如果自定义的属性值即可以是 number类型，也可以是stirng类型，
// 通过 PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]) 设置

const Header = (props) => {
	console.log(props); // { name: 'React.js' }
	return <header>{props.name} 核心库只关注于视图层</header>;
};
Header.defaultProps = {
	name: 'React.js',
};
Header.propTypes = {
	// 首字母不大写
	// name: PropTypes.string
	name: PropTypes.string.isRequired,
};

class Content extends React.Component {
	static defaultProps = {
		// 类的静态属性
		version: 16.8,
	};
	render() {
		console.log(this.props); // {version: 16.8}
		return <div>react {this.props.version} 推出了 react hooks!</div>;
	}
}
// Content.defaultProps = {
//   version: 16.8
// }

Content.propTypes = {
	// version: PropTypes.number
	version: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const Footer = ({ msg }) => {
	// 从props对象解构了msg
	return <footer>react真的很{msg}</footer>;
};
Footer.defaultProps = {
	msg: '简单',
};
Footer.propTypes = {
	// msg: PropTypes.bool // Invalid prop `msg` of type `string` supplied to `Footer`, expected `boolean`
	msg: PropTypes.string,
};
class App extends React.Component {
	render() {
		return (
			<div>
				{/* <Header name="React.js"></Header>
        <Content version={ 16.8 }></Content>
        <Footer msg="简单"></Footer> */}
				<Header></Header>
				<Content></Content>
				<Footer></Footer>
			</div>
		);
	}
}

export default App;
```

## 5.3 props.children

我们知道使用组件的时候，可以嵌套。要在自定义组件中使用嵌套结构，就需要使用 `props.children` 。

等同于 vue 中的 slot 插槽

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
import App from './05-App-props-children';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/05-App-props-children.jsx`

```jsx
import React from 'react';

const Header = (props) => {
	return <header>1 {props.children}</header>;
};

class Content extends React.Component {
	render() {
		return <div>2 {this.props.children}</div>;
	}
}

const Footer = ({ children }) => {
	return <footer>3 {children}</footer>;
};

class App extends React.Component {
	render() {
		return (
			<div>
				<Header>react 核心库只关注于视图层</Header>
				<Content>react 16.8 推出了 react hooks</Content>
				<Footer>react真的很简单</Footer>
			</div>
		);
	}
}

export default App;
```

如果需要给组件添加多个元素，并且显示在多个位置，可以如下设置：

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
import App from './06-App-mutiple-props-children';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/06-App-mutiple-props-children.jsx`

```jsx
import React from 'react';

// vue中 使用 具名插槽（<slot name=""></slot>）
// react 需要依靠 props.children 的下标
const Header = (props) => {
	console.log(props);
	return (
		<header>
			<div>这里输出1的值 {props.children[0]}</div>
			<div>这里输出2的值 {props.children[1]}</div>
			<div>这里输出3的值 {props.children[2]}</div>
		</header>
	);
};

class App extends React.Component {
	render() {
		return (
			<div>
				<Header>
					<div>1111111</div>
					<div>2222222</div>
					<div>3333333</div>
				</Header>
			</div>
		);
	}
}

export default App;
```

> 实现类似 vue 的具名插槽，需要通过 props.children 的下标去访问

## 5.4 render props 特性

> 使用 Render Props 来解决横切关注点（Cross-Cutting Concerns）

组件是 React 代码复用的主要单元，但如何将一个组件封装的状态或行为共享给其他需要相同状态的组件并不总是显而易见。

以下组件跟踪 Web 应用程序中的鼠标位置:

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
import App from './07-App-mouse-tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/07-App-mouse-tracker.jsx`

> 还没有学习状态 state 以及事件处理，这里先用

```jsx
import { Component } from 'react';

// react的事件需要使用 小驼峰 onMouseMove
// 原生js onmounsemove
// react 事件满足两个条件： 第一必须是事件，第二this指向当前的组件
class App extends Component {
	// react 类组件的初始化状态，类似于vue中的data
	state = {
		x: 0,
		y: 0,
	};

	render() {
		return (
			<div
				style={{ width: '100vw', height: '100vh', backgroundColor: '#f66' }}
				onMouseMove={(event) => {
					console.log(event);
					// 修改初始化值
					this.setState({
						x: event.clientX,
						y: event.clientY,
					});
				}}
			>
				<p>
					当前鼠标的位置在，x：{this.state.x},y: {this.state.y}
				</p>
			</div>
		);
	}
}

export default App;
```

> 当光标在屏幕上移动时，组件在 `<p>` 中显示其坐标。
>
> 现在的问题是：我们如何在另一个组件中复用这个行为？换个说法，若另一个组件需要知道鼠标位置，我们能否封装这一行为，以便轻松地与其他组件共享它？

**render prop 是一个用于告知组件需要渲染什么内容的函数 prop。**

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
import App from './08-App-render-props';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/08-App-render-props.jsx`

```jsx
import { Component } from 'react';
// 渲染属性共享组件的状态
// 在需要共享的组件（Mouse）上，添加一个render的自定义属性，该属性是一个自定义函数
// 在自定义函数的内部返回需要共享给的那个组件（Cat）
// 在需要共享的组件（Mouse）内部，通过 this.props.render() 或者 props.render() 即可调用，参数即为需要共享的状态
// 那么在定义自定义render属性的函数内部，就会接收到 参数，通过返回的组件（Cat）传递该参数即可

const Cat = ({ mounsePointer }) => {
	return (
		<div
			style={{
				position: 'fixed',
				left: mounsePointer.x,
				top: mounsePointer.y,
				backgroundColor: '#ccc',
				width: 100,
				height: 100,
			}}
		></div>
	);
};

class Mounse extends Component {
	state = { x: 0, y: 0 };

	render() {
		return (
			<div
				style={{ width: '100vw', height: '100vh', backgroundColor: '#f66' }}
				onMouseMove={(event) => {
					console.log(event);
					// 修改初始化值
					this.setState({
						x: event.clientX,
						y: event.clientY,
					});
				}}
			>
				<p>
					当前鼠标的位置在，x：{this.state.x},y: {this.state.y}
				</p>
				{this.props.render(this.state)}
			</div>
		);
	}
}
class App extends Component {
	render() {
		return (
			<div>
				{/* <Mounse></Mounse>
        <Cat ></Cat> */}
				<Mounse
					render={(mounsePointer) => {
						return <Cat mounsePointer={mounsePointer} />;
					}}
				></Mounse>
			</div>
		);
	}
}

export default App;
```

> 此案例实际上完成了 react 中子组件给父组件传值

# 六、State

`state` 是 `class`组件的内置对象，用于 class 组件内部数据更新

`state`就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用`state`的目的就是为了在不同的状态下使组件的显示不同(自己管理)

## 6.1 state 及其特点

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件

不要直接修改 state：构造函数是唯一可以给 `this.state` 赋值的地方。

state 更新可能是异步的：出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

state 更新会被合并：当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state

## 6.2 state 的定义和使用

目前 react 中的状态有两种使用方式：

### 6.2.1 es6 的类 - 构造函数

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
import App from './09-App-state-es6';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/09-App-state-es6.jsx`

```jsx
import React, { Component } from 'react';

/**
 * ES6 规定，子类必须在constructor()方法中调用super()，否则就会报错。
这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，
得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。
如果不调用super()方法，子类就得不到自己的this对象。

 ES5 的继承机制，是先创造一个独立的子类的实例对象，
 然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。
 ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，
 然后再将该对象作为子类的实例，即“继承在前，实例在后”
 */
class App extends Component {
	// es6的类 - 构造函数
	constructor(props) {
		super(props); // 调用父类的constructor(props)
		this.state = {
			// 添加子类自己的实例属性和方法,在react中 state作为初始化状态的属性
			date: new Date(),
		};
	}
	render() {
		return (
			<div>
				现在的时间是：
				{this.state.date.toLocaleDateString() + this.state.date.toLocaleTimeString()}
			</div>
		);
	}
}

export default App;
```

### 6.2.2 es7 的类 - 属性初始化器

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
import App from './10-App-state-es7';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/10-App-state-es7.jsx`

```jsx
import React, { Component } from 'react';

// 推荐写法
class App extends Component {
	state = {
		// es7 类的属性
		date: new Date(),
	};
	render() {
		return (
			<div>
				现在的时间是：
				{this.state.date.toLocaleDateString() + this.state.date.toLocaleTimeString()}！！！
			</div>
		);
	}
}

export default App;
```

## 6.3 如何正确的修改 state

`setState()` 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式.

将 `setState()` 视为*请求*而不是立即更新组件的命令。为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。

`setState()` 并不总是立即更新组件。它会批量推迟更新。这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用 `componentDidUpdate` 或者 `setState` 的回调函数（`setState(updater, callback)`），这两种方式都可以保证在应用更新后触发。

记住修改状态的三大原则：

-   不要直接修改 State

```js
state = { a: 10 };
this.state.a = 100; // ❌
```

-   state 的更新可能是异步的

```js
state = { a: 10 };
this.setState({ a: this.state.a + 1 });
this.setState({ a: this.state.a + 1 });
this.setState({ a: this.state.a + 1 });
console.log(this.state.a); // 10
```

-   state 的更新会被合并

## 6.4 this.setState()方法及其特点

`setState()` 会对一个组件的 `state` 对象安排一次更新。当 state 改变了，该组件就会重新渲染。

`setState()`可以添加两个参数,

`setState()` 的第二个参数为可选的回调函数，它将在 `setState` 完成合并并重新渲染组件后执行

### 6.4.1 传递函数

参数一为带有形式参数的 `updater` 函数：

```
this.setState((state, props) => stateChange[, callback] )
```

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
import App from './11-App-setState-function';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/11-App-setState-function.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	state = {
		count: 100,
	};
	render() {
		return (
			<div>
				{this.state.count}
				<button
					onClick={() => {
						this.setState((state, props) => {
							console.log(state, props);
							return {
								count: state.count + 1,
							};
						});
						this.setState((state, props) => {
							console.log(state, props);
							return {
								count: state.count + 1,
							};
						});
						this.setState((state, props) => {
							console.log(state, props);
							return {
								count: state.count + 1,
							};
						});
					}}
				>
					加
				</button>
			</div>
		);
	}
}

export default App;
```

> updater 函数中接收的 `state` 和 `props` 都保证为最新。updater 的返回值会与 `state` 进行浅合并。

### 6.4.2 传递对象

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
import App from './12-App-setState-object';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/12-App-setState-object.jsx`

```jsx
import React, { Component } from 'react';
// 为什么？
// const obj = { a: 100 }
// es6 中对象合并
// const newObj = Object.assign(obj, {a: 100 + 1}, {a: 100 + 1}, {a: 100 + 1})
// console.log(newObj) // { a: 101 }

class App extends Component {
	state = {
		count: 10,
	};
	render() {
		return (
			<div>
				{this.state.count}
				<button
					onClick={() => {
						this.setState({
							count: this.state.count + 1,
						});
						this.setState({
							count: this.state.count + 1,
						});
						this.setState({
							count: this.state.count + 1,
						});
						console.log(this.state.count);
					}}
				>
					加
				</button>
			</div>
		);
	}
}

export default App;
```

> 这种形式的 `setState()` 是异步的，并且在同一周期内会对多个 `setState` 进行批处理,相当于
>
> ```
> Object.assign(
>   prevState,
>   {count: this.state.count + 1},
>   {count: this.state.count + 1},
>   ...
> )
> ```
>
> 后调用的 `setState()` 将覆盖同一周期内先调用 `setState` 的值，因此商品数仅增加一次。如果后续状态取决于当前状态,建议使用 updater 函数的形式代替（前面案例已经实现）。或者在第二个参数中再继续操作。

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
import App from './13-App-setState-callback';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

`src/13-App-setState-callback.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	state = {
		count: 10,
	};
	render() {
		return (
			<div>
				{this.state.count}
				<button
					onClick={() => {
						this.setState(
							{
								count: this.state.count + 1,
							},
							() => {
								this.setState(
									{
										count: this.state.count + 1,
									},
									() => {
										this.setState({
											count: this.state.count + 1,
										});
									}
								);
							}
						);

						console.log(this.state.count); // 10
					}}
				>
					加
				</button>
			</div>
		);
	}
}

export default App;
```

> 思考题：
>
> 1.[何时以及为什么 `setState()` 会批量执行？](https://stackoverflow.com/a/48610973/458193)
>
> 2.[为什么不直接更新 `this.state`？](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

# 七、生命周期

组件的生命周期可分成三个状态：

-   Mounting(挂载)：已插入真实 DOM
-   Updating(更新)：正在被重新渲染
-   Unmounting(卸载)：已移出真实 DOM

生命周期图谱可以参考链接：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## 7.1 三个阶段

### 7.1.1 装载阶段

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

-   `constructor()`: 在 React 组件挂载之前，会调用它的构造函数。

    > 如果不需要对类组件添加初始化数据以及绑定事件，那么就不需要写 `constructor`

-   `static getDerivedStateFromProps()`: 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。

-   `render()`: render() 方法是 class 组件中唯一必须实现的方法。

-   `componentDidMount()`: 在组件挂载后（插入 DOM 树中）立即调用。

render() 方法是 class 组件中唯一必须实现的方法，其他方法可以根据自己的需要来实现。

### 7.1.2 更新阶段

每当组件的 state 或 props 发生变化时，组件就会更新。

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

-   `static getDerivedStateFromProps()`: 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
-   `shouldComponentUpdate()`:当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
-   `render()`: render() 方法是 class 组件中唯一必须实现的方法。
-   `getSnapshotBeforeUpdate()`: 在最近一次渲染输出（提交到 DOM 节点）之前调用。
-   `componentDidUpdate()`: 在更新后会被立即调用。

render() 方法是 class 组件中唯一必须实现的方法，其他方法可以根据自己的需要来实现。

### 7.1.3 卸载阶段

当组件从 DOM 中移除时会调用如下方法：

-   `componentWillUnmount()`: 在组件卸载及销毁之前直接调用。

> 项目中需要使用的最多的生命周期的钩子函数为 `render`, `componentDidMount`,`componentDidUpdate`,`componentWillUnmount`

> 详细介绍范例：https://zhuanlan.zhihu.com/p/392532496

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
import App from './14-App-LifeCycle';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root 传递是为了销毁组件
root.render(<App root={root} />);
```

`src/14-App-LifeCycle.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	// constructor (props) { // Useless constructor
	//   super(props)
	//   this.state = {}
	// }
	state = { count: 100 };
	// static getDerivedStateFromProps (props, state) { // 一般不使用
	//   // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
	//   // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
	//   // state 的值在任何时候都取决于 props
	// }

	componentDidMount() {
		// 等同于 vue中的 mounted
		// 数据请求，实例化操作，DOM操作，定时器，计时器，订阅数据变化
		// 修改状态
		this.setState({ count: this.state.count + 100 });
	}

	shouldComponentUpdate(nextProps, nextState) {
		// 可以作为react组件的性能优化的手段，但是也要慎用
		return true;
	}
	// getSnapshotBeforeUpdate(prevProps, prevState) {
	//   // 在最近一次渲染输出（提交到 DOM 节点）之前调用。
	//   // 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
	//   // 此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。
	// }

	componentDidUpdate(prevProps, prevState, snapshot) {
		// 参照vue中 updated
		// 实例化操作，DOM操作, 特定条件可以请求数据以及修改数据
		// if (this.props.userID !== prevProps.userID) {
		//   this.fetchData(this.props.userID);
		// }
	}

	componentWillUnmount() {
		// 参照vue  beforeDestory
		// 清理对象，取消订阅，消除定时器计时器
		// 当count的值等于210的时候销毁组件
	}
	render() {
		// 挂载阶段 依据初始化数据渲染数据
		// 更新阶段 当该组件的状态或者属性发生改变时触发此函数，也就输数据的改变引起视图的二次渲染
		return (
			<div>
				<p>{this.state.count}</p>
				<button
					onClick={() => {
						if (this.state.count === 210) {
							console.log('销毁组件');
							// 销毁组件
							this.props.root.unmount();
						} else {
							this.setState({ count: this.state.count + 1 });
						}
					}}
				>
					加
				</button>
			</div>
		);
	}
}

export default App;
```

## 7.2 两个时期

将应用的渲染过程分为`mount`阶段（应用首次渲染）和`update`阶段（应用状态更新），无论在`mount`阶段还是`update`阶段，都会经历两个子阶段，一个是`render`阶段，一个是`commit`阶段。

**mount 时**：
在`render`阶段会根据 jsx 对象构建新的`workInProgressFiber`树，然后将相应的`fiber`节点标记为`Placement`，表示这个`fiber`节点需要被插入到`dom`树中，然后会这些带有副作用的`fiber`节点加入一条叫做`Effect List`的链表中。
在`commit`阶段会遍历`render`阶段形成的`Effect List`，执行链表上相应`fiber`节点的副作用，比如`Placement`插入，或者执行`Passive`（useEffect 的副作用）。将这些副作用应用到真实节点上
**update 时**：
在`render`阶段会根据最新状态的 jsx 对象对比`current Fiber`，再构建新的`workInProgressFiber`树，这个对比的过程就是`diff算法`，`diff算法`又分成单节点的对比和多节点的对比，对比的过程中同样会经历收集副作用的过程，也就是将对比出来的差异标记出来，加入`Effect List`中，这些对比出来的副作用例如：`Placement`（插入）、`Update`(更新)、`Deletion`（删除）等。
在`commit`阶段同样会遍历`Effect List`，将这些 fiber 节点上的副作用应用到真实节点上。

> 参考链接: https://blog.csdn.net/bemystery/article/details/121897223

## 7.3 入门理解 React Fiber 架构

在 React 16 之前，`VirtualDOM` 的更新采用的是`Stack`架构实现的，也就是循环递归方式。不过，这种对比方式有明显的缺陷，就是一旦任务开始进行就无法中断，如果遇到应用中组件数量比较庞大，那么`VirtualDOM` 的层级就会比较深，带来的结果就是主线程被长期占用，进而阻塞渲染、造成卡顿现象。

为了避免出现卡顿等问题，我们必须保障在执行更新操作时计算时不能超过 16ms，如果超过 16ms，就需要先暂停，让给浏览器进行渲染，后续再继续执行更新计算。而`Fiber`架构就是为了支持“可中断渲染”而创建的。

在`React`中，`Fiber`使用了一种新的数据结构`fiber tree`，它可以把虚拟`dom tree`转换成一个链表，然后再执行遍历操作，而链表在执行遍历操作时是支持断点重启的，示意图如下。
![image.png](https://segmentfault.com/img/bVc1w1a)

官方介绍中，`Fiber` 被理解为是一种数据结构，但是我们也可以将它理解为是一个执行单元。

`Fiber` 可以理解为一个执行单元，每次执行完一个执行单元，`React Fiber`就会检查还剩多少时间，如果没有时间则将控制权让出去，然后由浏览器执行渲染操作。`React Fiber` 与浏览器的交互流程如下图。
![image.png](https://segmentfault.com/img/bVc1w1b)

可以看到，`React` 首先向浏览器请求调度，浏览器在执行完一帧后如果还有空闲时间，会去判断是否存在待执行任务，不存在就直接将控制权交给浏览器；如果存在就会执行对应的任务，执行完一个新的任务单元之后会继续判断是否还有时间，有时间且有待执行任务则会继续执行下一个任务，否则将控制权交给浏览器执行渲染，这个流程是循环进行的。

所以，我们可以将`Fiber` 理解为一个执行单元，并且这个执行单元必须是一次完成的，不能出现暂停。并且，这个小的执行单元在执行完后计算之后，可以移交控制权给浏览器去响应用户，从而提升了渲染的效率。

在官方的文档中，`Fibe`r 被解释为是一种数据结构，即链表结构。在链表结构中，每个` Virtual DOM` 都可以表示为一个 `fiber`，如下图所示。
![image.png](https://segmentfault.com/img/bVc1w1c)
通常，一个 `fiber`包括了` child`（第一个子节点）、`sibling`（兄弟节点）、`return`（父节点)等属性，`React Fiber` 机制的实现，就是依赖于上面的数据结构。

通过介绍，我们知道`Fiber`使用的是链表结构，准确的说是**单链表树结构**。为了放便理解 `Fiber` 的遍历过程，下面我们就看下`Fiber`链表结构。

![image.png](https://segmentfault.com/img/bVc1w1d)

在上面的例子中，每一个单元都包含了`payload`（数据）和`nextUpdate`（指向下一个单元的指针）两个元素

> 参考链接：https://segmentfault.com/a/1190000042271919

# 八、事件绑定

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

-   React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
-   使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

## 8.1 ES5 语法绑定事件

### 8.1.1 无参数的绑定

#### 8.1.1.1 方法一

-   定义函数

```
handleClick(e) { // e - 事件对象
  e.preventDefault();
  // doSomething ...
}
```

-   constructor 中绑定函数执行上下文

```
this.handleClick = this.handleClick.bind(this);
```

-   jsx 中调用

```
<button onClick={this.hanleClick} />
```

#### 8.1.1.1 方法二

-   定义函数

```
handleClick(e) { // e - 事件对象
  e.preventDefault();
  // doSomething ...
}
```

-   jsx 中调用

```
<button onClick={this.hanleClick.bind(this)} />
```

### 8.1.2 有参数的绑定

-   定义函数

```
handleClick(param1, param2, e) {
  e.preventDefault();
  // do something ...
}
```

> 注意此时无论多少个参数， e 一定放在最后

-   jsx 中调用

```
<button onClick={this.hanleClick.bind(this, 'x', 'xx')} />
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
import App from './15-App-handler-es5';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/15-App-handler-es5.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		// 中绑定函数执行上下文
		this.clickHandler1Fn = this.clickHandler1.bind(this);
	}
	clickHandler1(event) {
		// 构造函数中改变this指向 不推荐 --- 无法实现传递参数目标
		console.log(this); // undefined  ==构造函数中改变this指向==>  App实例
		console.log(event); // SyntheticBaseEvent合成事件   js原生 PointerEvent
	}

	clickHandler2(event) {
		// 推荐 ---- 可以传递参数
		console.log(this); // undefined  ===jsx代码中改变了this指向===> App实例
		console.log(event);
	}

	// 无论有多少个参数，记住，事件对象始终为最后一个参数
	clickHandler3(params1, params2, params3, event) {
		console.log(params1);
		console.log(params2);
		console.log(params3);
		console.log(event);
	}
	render() {
		return (
			<div>
				<h1>es5绑定事件以及传递参数</h1>
				<button onClick={this.clickHandler1Fn}>点击-绑定事件方法1</button>
				<button onClick={this.clickHandler2.bind(this)}>点击-绑定事件方法2 - 推荐</button>
				<button onClick={this.clickHandler3.bind(this, 'a', 'b', 'c')}>
					点击-传递参数
				</button>
			</div>
		);
	}
}

export default App;
```

## 8.2 ES6 语法绑定事件

### 8.2.1 无参数绑定

#### 8.2.1.1 方法一

-   定义函数

```
handleClick = (e) => {
  e.preventDefault();
  // do something ...
}
```

-   jsx 中调用

```
<button onClick={this.hanleClick} />
```

> 比起 es 5 中的无参数函数的绑定调用， es 6 不需要使用 bind 函数；

#### 8.2.1.2 方法二

jsx 中定义箭头函数

```
<button onClick={ () => {}} />
```

### 8.2.2 有参数绑定

#### 8.2.2.1 方法一

-   定义函数

```
handleClick = (param1, e) => {
  e.preventDefault();
  // do something ...
}
```

-   jsx 调用

```
<button onClick={this.hanleClick.bind(this, 'x')} />
```

> 有参数时，在绑定时依然要使用 bind；
> 并且参数一定要传，不然仍然存在 this 指向错误问题；

#### 8.2.2.2 方法二

-   定义函数

```
handleClick = (param1, e) => {
  // do something ...
}
```

-   jsx 调用

```
<button onClick={() => this.handleClick('c')} />
// 如果需要对 event 对象进行处理的话，需要写成下面的格式
<button onClick={(e) => this.handleClick('c', e)} />
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
import App from './16-App-handler-es6';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/16-App-handler-es6.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	clickHandler1 = (event) => {
		// 类中定义箭头函数
		console.log(this);
		console.log(event);
	};

	clickHandler3 = (params, event) => {
		console.log(params);
		console.log(this);
		console.log(event);
	};

	clickHandler4 = (params1, params2, event) => {
		console.log(params1);
		console.log(params2);
		console.log(this);
		console.log(event);
	};
	render() {
		return (
			<div>
				<h1>es6绑定事件以及传递参数</h1>
				<button onClick={this.clickHandler1}>点击-绑定事件方法1</button>
				<button
					onClick={(event) => {
						// jsx中写箭头函数
						console.log(this);
						console.log(event);
					}}
				>
					点击-绑定事件方法2
				</button>
				<button onClick={this.clickHandler3.bind(this, '参数')}>传递参数1</button>
				<button onClick={(event) => this.clickHandler4('aaa', 'bbb', event)}>
					传递参数2
				</button>
			</div>
		);
	}
}

export default App;
```

## 8.3 合成事件的特点

### 8.3.1 事件机制

-   `react`自身实现了一套事件机制，包括事件的注册、事件的存储、事件的合成及执行等。
-   `react` 的所有事件并没有绑定到具体的`dom`节点上而是绑定在了`document` 上，然后由统一的事件处理程序来派发执行。
-   通过这种处理，减少了事件注册的次数，另外`react`还在事件合成过程中，对不同浏览器的事件进行了封装处理，抹平浏览器之间的事件差异。

### 8.3.2 对合成事件的理解

（1）对原生事件的封装

> `react`会根据原生事件类型来使用不同的合成事件对象，比如: 聚焦合成事件对象`SyntheticFoucsEvent`（合成事件对象：`SyntheticEvent`是`react`合成事件的基类，定义了合成事件的基础公共属性和方法。合成事件对象就是在该基类上创建的）

（2）不同浏览器事件兼容的处理

> 在对事件进行合成时，`react`针对不同的浏览器，也进行了事件的兼容处理

### 8.3.3 事件机制的流程

#### 1、事件注册

> 在组件挂载阶段，根据组件内声明的事件类型-`onclick`，`onchange` 等，给 `document` 上添加事件 -`addEventListener`，并指定统一的事件处理程序 `dispatchEvent`。

#### 2、事件存储

> 完成事件注册后，将` react dom` ，事件类型，事件处理函数`fn`放入数组存储，组件挂载完成后，经过遍历把事件处理函数存储到 `listenerBank`(一个对象)中，缓存起来，为了在触发事件的时候可以查找到对应的事件处理方法去执行。

> 开始事件的存储，在` react` 里所有事件的触发都是通过 `dispatchEvent`方法统一进行派发的，而不是在注册的时候直接注册声明的回调，来看下如何存储的 。
> `react` 把所有的事件和事件类型以及`react` 组件进行关联，把这个关系保存在了一个` map`里，也就是一个对象里（键值对），然后在事件触发的时候去根据当前的 组件 id 和 事件类型查找到对应的 事件 fn

#### 3、事件执行

> 1、进入统一的事件分发函数(`dispatchEvent`)
> 2、结合原生事件找到当前节点对应的`ReactDOMComponent`对象
> 3、开始 事件的合成
>
> > -   根据当前事件类型生成指定的合成对象
> > -   封装原生事件和冒泡机制
> > -   在 `listenerBank`事件池中查找事件回调并合成到 `event`(合成事件结束)
>
> 4.处理合成事件内的回调事件（事件触发完成 end）

### 8.3.4 合成事件、原生事件之间的冒泡执行关系

结论：

-   原生事件阻止冒泡肯定会阻止合成事件的触发。

-   合成事件的阻止冒泡不会影响原生事件。

原因：

-   浏览器事件的执行需要经过三个阶段，`捕获阶段-目标元素阶段-冒泡阶段`。

> 节点上的原生事件的执行是在目标阶段，然而合成事件的执行是在冒泡阶段，所以原生事件会先合成事件执行，然后再往父节点冒泡，所以原生事件阻止冒泡会阻止合成事件的触发，而合成事件的阻止冒泡不会影响原生事件。

# 九、内容渲染

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

## 9.1 &&

你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
import App from './17-App-condition-yu';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/17-App-condition-yu.jsx`

```jsx
import React, { Component } from 'react';

class MainBox extends Component {
	render() {
		const unReadMessage = this.props.unReadMessage;
		return (
			<div>
				您好，还还有{unReadMessage.length > 0 && <div>{unReadMessage.length}</div>}
				封未读邮件
			</div>
		);
	}
}
// 假如有初始化的数据 proList:[],请求数据以后，得到列表数据 ， proList && proList.map() 遍历数据

const messages = ['1', '2', '3', '4'];
class App extends Component {
	render() {
		return (
			<div>
				<MainBox unReadMessage={messages} />
			</div>
		);
	}
}

export default App;
```

## 9.2 三元运算符

条件渲染的另一种方法是使用 JavaScript 的条件运算符:

```
condition ? true : false。
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
import App from './18-App-condition-san';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/18-App-condition-san.jsx`

```jsx
import React, { Component } from 'react';

const LoginButton = () => {
	return <button>登录</button>;
};

const LogoutButton = () => {
	return <button>退出</button>;
};
// class App extends Component {
//   state = {
//     loginState: true
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={ () => {
//           this.setState({
//             loginState: !this.state.loginState
//           })
//         } }>切换</button>
//         {
//           this.state.loginState ? <LogoutButton /> : <LoginButton />
//         }
//       </div>
//     );
//   }
// }
// class App extends Component {
//   state = {
//     loginState: true
//   }
//   render() {
//     if (this.state.loginState) {
//       return (
//         <div>
//           <button onClick={ () => {
//             this.setState({
//               loginState: !this.state.loginState
//             })
//           } }>切换</button>
//           <LogoutButton />
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <button onClick={ () => {
//             this.setState({
//               loginState: !this.state.loginState
//             })
//           } }>切换</button>
//           <LoginButton />
//         </div>
//       );
//     }

//   }
// }

class App extends Component {
	state = {
		loginState: true,
	};
	render() {
		// let val = null
		// if(this.state.loginState) {
		//   val = <LogoutButton />
		// } else {
		//   val = <LoginButton />
		// }
		let val = this.state.loginState ? <LogoutButton /> : <LoginButton />;
		return (
			<div>
				<button
					onClick={() => {
						this.setState({
							loginState: !this.state.loginState,
						});
					}}
				>
					切换
				</button>
				{val}
			</div>
		);
	}
}

export default App;
```

## 9.3 动态 className

Vue 中有很方便的[动态绑定](https://so.csdn.net/so/search?q=动态绑定&spm=1001.2101.3001.7020)class 属性的方式，v-bind:class,那么 react 怎么实现这样的效果呢？

> `<button class="btn btn-success btn-sm"></button>`
>
> `<button class="btn btn-danger btn-sm"></button>`
>
> `<button class="btn btn-warning btn-sm"></button>`

通过 classnames 这个插件可以实现

```sh
$ cnpm i classnames -S
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
import App from './19-App-classnames';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/19-App-classnames.jsx`

```jsx
import React, { Component } from 'react';
import classnames from 'classnames'; // cnpm i classnames -S
class App extends Component {
	render() {
		// btn-success btn-danger type
		// btn-sm btn-md btn-lg size
		const type = 'success';
		const size = 'md';
		let str = 'btn';
		type === 'success'
			? (str += ' btn-success')
			: type === 'danger'
			? (str += ' btn-danger')
			: (str += '');
		size === 'sm'
			? (str += ' btn-sm')
			: size === 'md'
			? (str += ' btn-md')
			: size === 'lg'
			? (str += ' btn-lg')
			: (str += '');
		return (
			<div>
				<button className={str}>按钮-字符串拼接</button>
				<button
					className={classnames({
						btn: true,
						'btn-success': type === 'success',
						'btn-danger': type === 'danger',
						'btn-sm': size === 'sm',
						'btn-md': size === 'md',
						'btn-lg': size === 'lg',
					})}
				>
					按钮-classnames
				</button>
			</div>
		);
	}
}

export default App;
```

> 补充：
>
> -   **css-in-js**
>
> ```
> $ cnpm i styled-components -S
> ```
>
> `src/index.js`
>
> ```jsx
> import React from 'react';
> import ReactDOM from 'react-dom/client';
>
> // 引入时，后缀名可以省略，可以在webpack中配置
> // import App from './01-App-parent-child'
> // import App from './02-App-parent-child-value'
> // import App from './03-App-parent-child-value-default'
> // import App from './04-App-parent-child-value-default-type'
> // import App from './05-App-props-children'
> // import App from './06-App-mutiple-props-children'
> // import App from './07-App-mouse-tracker'
> // import App from './08-App-render-props'
> // import App from './09-App-state-es6'
> // import App from './10-App-state-es7'
> // import App from './11-App-setState-function'
> // import App from './12-App-setState-object'
> // import App from './13-App-setState-callback'
> // import App from './14-App-LifeCycle'
> // import App from './15-App-handler-es5'
> // import App from './16-App-handler-es6'
> // import App from './17-App-condition-yu'
> // import App from './18-App-condition-san'
> // import App from './19-App-classnames'
> import App from './20-App-css-in-js';
>
> const root = ReactDOM.createRoot(document.getElementById('root'));
>
> root.render(<App root={root} />);
> ```
>
> `src/20-App-css-in-js.jsx`
>
> ```jsx
> import React, { Component } from 'react';
> import styled from 'styled-components'; // cnpm i styled-components -S
> import './20-style.css';
> const Button = styled.button`
> 	width: 200px;
> 	height: 50px;
> 	background-color: #f66;
> 	color: #fff;
> `;
> const Img = styled.img`
> 	width: 200px;
> `;
> class App extends Component {
> 	render() {
> 		return (
> 			<div>
> 				<Button>按钮-cssInJs</Button>
> 				<img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 					style={{ width: 300 }}
> 				/>
> 				<img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 					style={{ width: 300 }}
> 				/>
> 				<Img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 				/>
> 				<Img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 				/>
> 				<img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 					className="img"
> 				/>
> 				<img
> 					src="https://img2.baidu.com/it/u=1026317337,1339775897&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711"
> 					alt=""
> 					className="img"
> 				/>
> 			</div>
> 		);
> 	}
> }
>
> export default App;
> ```
>
> `src/20-style.css`
>
> ```css
> img {
> 	width: 100px;
> }
> ```
>
> -   **模块化 css**
>
> > 可以解决类似于 vue 中 scoped
>
> `src/index.js`
>
> ```jsx
> import React from 'react';
> import ReactDOM from 'react-dom/client';
>
> // 引入时，后缀名可以省略，可以在webpack中配置
> // import App from './01-App-parent-child'
> // import App from './02-App-parent-child-value'
> // import App from './03-App-parent-child-value-default'
> // import App from './04-App-parent-child-value-default-type'
> // import App from './05-App-props-children'
> // import App from './06-App-mutiple-props-children'
> // import App from './07-App-mouse-tracker'
> // import App from './08-App-render-props'
> // import App from './09-App-state-es6'
> // import App from './10-App-state-es7'
> // import App from './11-App-setState-function'
> // import App from './12-App-setState-object'
> // import App from './13-App-setState-callback'
> // import App from './14-App-LifeCycle'
> // import App from './15-App-handler-es5'
> // import App from './16-App-handler-es6'
> // import App from './17-App-condition-yu'
> // import App from './18-App-condition-san'
> // import App from './19-App-classnames'
> // import App from './20-App-css-in-js'
> import App from './21-App-module-css';
>
> const root = ReactDOM.createRoot(document.getElementById('root'));
>
> root.render(<App root={root} />);
> ```
>
> `src/21-App-module-css.jsx`
>
> ```jsx
> import React, { Component } from 'react';
> import styles from './21-style.module.css';
> class App extends Component {
> 	render() {
> 		return (
> 			<div className={styles.container}>
> 				<header className={styles.header}></header>
> 			</div>
> 		);
> 	}
> }
>
> export default App;
> ```
>
> `src/21-style.module.css`
>
> ```css
> .container {
> 	width: 100%;
> 	height: 500px;
> 	background-color: #ccc;
> }
> .header {
> 	width: 100%;
> 	height: 44px;
> 	background-color: #f66;
> }
> ```

## 9.4 动态 style

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
import App from './22-App-style';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/22-App-style.jsx`

```jsx
import React, { Component } from 'react';

class App extends Component {
	state = {
		size: 30,
		num: 900,
	};
	render() {
		const { size, num } = this.state;
		return (
			<div>
				<div style={{ fontSize: size, fontWeight: num }}>动态style</div>
			</div>
		);
	}
}

export default App;
```

# 十、列表渲染

-   map()方法、key

使用 map() 方法遍历数组

> 组件接收数组参数，每个列表元素分配一个 key，不然会出现警告 **a key should be provided for list items**，意思就是需要包含 key：

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的`id`作为元素的 key

当元素没有确定的 id 时，你可以使用他的序列号索引` index` 作为` key`

> 如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
import App from './23-App-map';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/23-App-map.jsx`

```jsx
import React, { Component } from 'react';

// // 1.如果一个数组的元素时jsx代码 - 记住给数组元素添加 key 属性
// // Each child in a list should have a unique "key" prop.
// class App extends Component {
//   render() {
//     const arr = [
//       <div key={ 1 }>item1</div>,
//       <div key={ 2 }>item2</div>,
//       <div key={ 3 }>item3</div>,
//       <div key={ 4 }>item4</div>
//     ]
//     return (
//       <div>
//         { arr }
//       </div>
//     );
//   }
// }

// 2.先遍历后渲染
// class App extends Component {
//   state = {
//     arr: ['a', 'b', 'c', 'd']
//   }
//   render () {
//     const list = []
//     // this.state.arr.forEach((item, index) => {
//     //   list.push(<li key = { index }>{ item }</li>)
//     // })
//     // for(var i = 0; i < this.state.arr.length; i++) {
//     //   list.push(<li key = { i }>{  this.state.arr[i] }</li>)
//     // }
//     // for(var i in this.state.arr) {
//     //   list.push(<li key = { i }>{  this.state.arr[i] }</li>)
//     // }
//     for (var item of this.state.arr) {
//       list.push(<li key = { item }>{  item }</li>)
//     }
//     return (
//       <ul>
//         { list }
//       </ul>
//     )
//   }
// }

// 3.边遍历边渲染
// class App extends Component {
//   state = {
//     arr: ['aa', 'bb', 'cc' ,'dd']
//   }

//   render () {
//     return (
//       <ul>
//         {
//           this.state.arr.map((item, index) => {
//             return (<li key = { index }>{ item }</li>)
//           })
//         }
//       </ul>
//     )
//   }
// }

// class App extends Component {
//   state = {
//     cityList: []
//   }
//   componentDidMount () {
//     fetch('/city/sortCity.json').then(res => res.json()).then(res => {
//       console.log(res)
//       this.setState({ cityList: res })
//     })
//   }
//   render () {
//     const { cityList } = this.state
//     return (
//       <div>
//         <h1>城市列表</h1>
//         <ul>
//           {
//             cityList && cityList.map((item) => {
//               return (<li key = { item.letter }>
//                 {
//                   item.letter
//                 }
//                 <ol>
//                   {
//                     item.data && item.data.map(itm => {
//                       return (<li key = { itm.cityId }>{ itm.name }</li>)
//                     })
//                   }
//                 </ol>
//               </li>)
//             })
//           }
//         </ul>
//       </div>
//     )
//   }
// }

class App extends Component {
	state = {
		cityList: [],
	};
	componentDidMount() {
		fetch('/city/sortCity.json')
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					cityList: res,
				});
			});
	}
	render() {
		const { cityList } = this.state;
		const arr = [];
		cityList.forEach((item) => {
			const list = [];
			item.data.forEach((itm) => {
				list.push(<p key={itm.cityId}>{itm.name}</p>);
			});
			arr.push(
				<li key={item.letter}>
					{item.letter}
					{list}
				</li>
			);
		});
		return <div>{arr}</div>;
	}
}

export default App;
```

> 接口 `http://121.89.205.189:3001/city/sortCity.json`在请求时遇到了跨域问题，可以直接在`package.json`中添加`proxy`解决
>
> ```json
> {
>     ....
>     "proxy": "http://121.89.205.189:3001"
> }
> ```
>
> > 什么时候使用`package.json`中的`proxy`解决跨域问题，什么时候用`setupProxy.js`解决跨域

# 十一、表单绑定

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称：

```html
<form>
	<label>
		名字:
		<input type="text" name="name" />
	</label>
	<input type="submit" value="提交" />
</form>
```

> 此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。

## 11.1 各种表单的绑定与取值

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
import App from './24-App-form';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`基础表单`

```JSX
import React, { Component } from 'react'

export default class App extends Component {

  render() {
    return (
      <div>
        <input type="text" name="firstName" /> +
        <input type="text" name="lastName" /> =

        <hr />
        <textarea name="note"></textarea>
        <hr />
        <select name="lesson" >
          <option value="1">1阶段</option>
          <option value="2">2阶段</option>
          <option value="3">3阶段</option>
        </select>
        <hr />
        <input type="radio"  name="sex" value="男" />男
        <input type="radio"  name="sex" value="女" />女
        <hr />
        <input type="checkbox" name="hobby" value="篮球" />篮球
        <input type="checkbox" name="hobby" value="足球" />足球
        <input type="checkbox" name="hobby" value="排球" />排球
        <input type="checkbox" name="hobby" value="网球" />网球
        <input type="checkbox" name="hobby" value="台球" />台球
        <hr />
        <input type="checkbox" /> 同意******协议
        <button onClick={() => {
        }}>获取值</button>
      </div>
    )
  }
}

```

`src/24-App-form.jsx`

```jsx
import React, { Component } from 'react';

export default class App extends Component {
	state = {
		firstName: '',
		lastName: '',
		note: '',
		lesson: '1',
		sex: '男',
		hobby: ['篮球'],
		flag: false,
	};
	// changeFirstName = (event) => {
	//   this.setState({ firstName: event.target.value })
	// }
	// changeLastName = (event) => {
	//   this.setState({ lastName: event.target.value })
	// }
	changeHandler = (event) => {
		// console.log(event.target.name)
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	// changeSexHandler = (event) => {
	//   console.log(event.target.value)
	// }

	changeHobbyHandler = (event) => {
		console.log(event.target.value, event.target.checked);
		if (event.target.checked) {
			this.setState({
				hobby: [...this.state.hobby, event.target.value],
			});
		} else {
			const arr = this.state.hobby;
			const index = arr.findIndex((item) => item === event.target.value);
			arr.splice(index, 1);
			this.setState({
				hobby: arr,
			});
		}
	};
	changeFlagHandler = () => {
		this.setState({
			flag: !this.state.flag,
		});
	};
	render() {
		return (
			<div>
				{/* <input type="text" name="firstName" onChange={ this.changeFirstName }/> + 
        <input type="text" name="lastName" onChange={ this.changeLastName }/> = */}
				<input type="text" name="firstName" onChange={this.changeHandler} /> +
				<input type="text" name="lastName" onChange={this.changeHandler} /> =
				{this.state.firstName + this.state.lastName}
				<hr />
				<textarea name="note" onChange={this.changeHandler}></textarea>
				<hr />
				<select name="lesson" onChange={this.changeHandler}>
					<option value="1">1阶段</option>
					<option value="2">2阶段</option>
					<option value="3">3阶段</option>
				</select>
				<hr />
				{/* <input type="radio" name="sex" value="男" onChange={ this.changeSexHandler }/>男
        <input type="radio" name="sex" value="女" onChange={ this.changeSexHandler }/>女 */}
				<input
					type="radio"
					checked={this.state.sex === '男'}
					name="sex"
					value="男"
					onChange={this.changeHandler}
				/>
				男
				<input
					type="radio"
					checked={this.state.sex === '女'}
					name="sex"
					value="女"
					onChange={this.changeHandler}
				/>
				女
				<hr />
				<input
					type="checkbox"
					checked={this.state.hobby.includes('篮球')}
					name="hobby"
					value="篮球"
					onChange={this.changeHobbyHandler}
				/>
				篮球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('足球')}
					name="hobby"
					value="足球"
					onChange={this.changeHobbyHandler}
				/>
				足球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('排球')}
					name="hobby"
					value="排球"
					onChange={this.changeHobbyHandler}
				/>
				排球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('网球')}
					name="hobby"
					value="网球"
					onChange={this.changeHobbyHandler}
				/>
				网球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('台球')}
					name="hobby"
					value="台球"
					onChange={this.changeHobbyHandler}
				/>
				台球
				<hr />
				<input type="checkbox" onChange={this.changeFlagHandler} /> 同意******协议
				<button
					onClick={() => {
						// console.log({
						//   firstName: this.state.firstName,
						//   lastName: this.state.lastName,
						//   note: this.state.note,
						//   lesson: this.state.lesson,
						//   sex: this.state.sex,
						//   hobby: this.state.hobby
						// })
						if (this.state.flag) {
							console.log({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								note: this.state.note,
								lesson: this.state.lesson,
								sex: this.state.sex,
								hobby: this.state.hobby,
							});
						} else {
							alert('请先勾选同意用户协议');
						}
					}}
				>
					获取值
				</button>
			</div>
		);
	}
}
```

## 11.2 受控表单以及受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
import App from './25-App-form-control';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/25-App-form-control.jsx`

```jsx
import React, { Component } from 'react';

export default class App extends Component {
	state = {
		firstName: '',
		lastName: '',
		note: '',
		lesson: '1',
		sex: '男',
		hobby: ['篮球'],
		flag: false,
	};
	changeHandler = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	changeHobbyHandler = (event) => {
		console.log(event.target.value, event.target.checked);
		if (event.target.checked) {
			this.setState({
				hobby: [...this.state.hobby, event.target.value],
			});
		} else {
			const arr = this.state.hobby;
			const index = arr.findIndex((item) => item === event.target.value);
			arr.splice(index, 1);
			this.setState({
				hobby: arr,
			});
		}
	};
	changeFlagHandler = () => {
		this.setState({
			flag: !this.state.flag,
		});
	};
	render() {
		return (
			<div>
				<input
					type="text"
					name="firstName"
					value={this.state.firstName}
					onChange={this.changeHandler}
				/>{' '}
				+
				<input
					type="text"
					name="lastName"
					value={this.state.lastName}
					onChange={this.changeHandler}
				/> ={this.state.firstName + this.state.lastName}
				<hr />
				<textarea
					name="note"
					value={this.state.note}
					onChange={this.changeHandler}
				></textarea>
				<hr />
				<select name="lesson" value={this.state.lesson} onChange={this.changeHandler}>
					<option value="1">1阶段</option>
					<option value="2">2阶段</option>
					<option value="3">3阶段</option>
				</select>
				<hr />
				{/* <input type="radio" name="sex" value="男" onChange={ this.changeSexHandler }/>男
        <input type="radio" name="sex" value="女" onChange={ this.changeSexHandler }/>女 */}
				<input
					type="radio"
					checked={this.state.sex === '男'}
					name="sex"
					value="男"
					onChange={this.changeHandler}
				/>男
				<input
					type="radio"
					checked={this.state.sex === '女'}
					name="sex"
					value="女"
					onChange={this.changeHandler}
				/>
				女
				<hr />
				<input
					type="checkbox"
					checked={this.state.hobby.includes('篮球')}
					name="hobby"
					value="篮球"
					onChange={this.changeHobbyHandler}
				/>
				篮球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('足球')}
					name="hobby"
					value="足球"
					onChange={this.changeHobbyHandler}
				/>
				足球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('排球')}
					name="hobby"
					value="排球"
					onChange={this.changeHobbyHandler}
				/>
				排球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('网球')}
					name="hobby"
					value="网球"
					onChange={this.changeHobbyHandler}
				/>
				网球
				<input
					type="checkbox"
					checked={this.state.hobby.includes('台球')}
					name="hobby"
					value="台球"
					onChange={this.changeHobbyHandler}
				/>
				台球
				<hr />
				<input type="checkbox" onChange={this.changeFlagHandler} /> 同意******协议
				<button
					onClick={() => {
						// console.log({
						//   firstName: this.state.firstName,
						//   lastName: this.state.lastName,
						//   note: this.state.note,
						//   lesson: this.state.lesson,
						//   sex: this.state.sex,
						//   hobby: this.state.hobby
						// })
						if (this.state.flag) {
							console.log({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								note: this.state.note,
								lesson: this.state.lesson,
								sex: this.state.sex,
								hobby: this.state.hobby,
							});
						} else {
							alert('请先勾选同意用户协议');
						}
					}}
				>
					获取值
				</button>
			</div>
		);
	}
}
```

> `input`、`textarea`、`select` 受控组件： value 的属性受了 `state` 的控制
>
> -   使用了受控组件，一定要写 `value` 属性以及`onChange`事件
>
> `radio`、'checkbox' 受控组件: checked 的属性受了`state`的控制
>
> 如果需要设置默认值，那么需要通过 `defaultValue` 以及`defaultChecked`设置

# 十二、状态提升

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。

## 12.1 父子组件通信

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
import App from './26-App-parent-child-value';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/26-App-parent-child-value.jsx`

```jsx
import React, { Component } from 'react';

class Child1 extends Component {
	state = { count: 1 };
	render() {
		return (
			<div>
				{this.state.count}
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>
					child1 - 加
				</button>
			</div>
		);
	}
}
class Child2 extends Component {
	state = { count: 1 };
	render() {
		return (
			<div>
				{this.state.count}
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>
					child2 - 加
				</button>
			</div>
		);
	}
}
class App extends Component {
	render() {
		return (
			<div>
				<Child1 />
				<hr />
				<Child2 />
			</div>
		);
	}
}

export default App;
```

> 我们发现 Child1 和 Child2 都是两个独立的个体，并没有实现数据共享

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
import App from './27-App-state-up';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/27-App-state-up.jsx`

```jsx
import React, { Component } from 'react';

class Child1 extends Component {
	render() {
		return (
			<div>
				{this.props.count}
				<button onClick={() => this.props.changeCount()}>child1 - 加</button>
			</div>
		);
	}
}
class Child2 extends Component {
	render() {
		return (
			<div>
				{this.props.count}
				<button onClick={() => this.props.changeCount()}>child2 - 加</button>
			</div>
		);
	}
}
class App extends Component {
	state = { count: 1 };
	changeCount = () => {
		this.setState({ count: this.state.count + 1 });
	};
	render() {
		return (
			<div>
				<Child1 count={this.state.count} changeCount={this.changeCount} />
				<hr />
				<Child2 count={this.state.count} changeCount={this.changeCount} />
			</div>
		);
	}
}

export default App;
```

## 12.2 状态提升解读

实现方式是 利用最近的共同的父级组件中，用`props`的方式传过去到两个子组件，`props`中传的是一个`setState`的方法，通过子组件触发`props`传过去的方法，进而调用父级组件的`setState`的方法，改变了父级组件的`state`，调用父级组件的`changeCount`方法，进而同时改变了两个子级组件的`changeCount`。

这是 两个有关连的**同级组件**的传值，因为`react`的单项数据流，所以不在两个组件中进行传值，而是提升到 最近的共同的父级组件中，改变父级的`state`,进而影响了两个子级组件的`render`。

> 注意如果两个组件是同级组件（这两个组件的父组件是同一个）才考虑状态提升共享数据

# 十三、组合 vs 继承

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

## 13.1 理解组件化

**组件化是 React 的核心思想**：

-   组件化提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。

-   任何的应用都会被抽象成一颗组件树。

**组件化思想的应用**：

-   有了组件化的思想，我们在之后的开发中就要充分的利用它。

-   尽可能的将页面拆分成一个个小的、可复用的组件。

-   这样让我们的代码更加方便组织和管理，并且扩展性也更强。

**React 的组件相对于 Vue 更加的灵活和多样，按照不同的方式可以分成很多类 组件**：

-   根据组件的定义方式，可以分为：函数组件(Functional Component )和类组件(Class Component)；

> vue 中有没有类组件和函数式组件？vue2 中有
>
> -   vue 中的函数式组件
>
> ```jsx
> <template functional>
>   <div>{{props.msg}}</div>
> </template>
> ```
>
> -   vue 中的类组件
>
> ```
> <template>
>   <div>hello vue</div>
> </template>
>
> class Home extends Vue {} // export default {}
> ```

-   根据组件内部是否有状态需要维护，可以分成：无状态组件(Stateless Component )和有状态组件(Stateful Component)；

-   根据组件的不同职责，可以分成：展示型组件(Presentational Component)和容器型组件(Container Component)；

这些概念有很多重叠，但是他们最主要是关注数据逻辑和 UI 展示的分离：

-   函数组件、无状态组件、展示型组件主要关注 UI 的展示；
-   类组件、有状态组件、容器型组件主要关注数据逻辑；

## 13.2 使用组合而非继承实现 React 组件化

有些组件无法提前知晓它们子组件的具体内容，建议这些组件使用一个特殊的 `children` prop 来将他们的子组件传递到渲染结果中。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
import App from './28-App-props-children';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/28-App-props-children.jsx`

```jsx
import React, { Component } from 'react';
const Header = (props) => {
	return <div>{props.children}</div>;
};

class App extends Component {
	render() {
		return (
			<div>
				<Header>
					<h1>hello React</h1>
					<div>如此强大</div>
				</Header>
			</div>
		);
	}
}

export default App;
```

少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 `children`，而是自行约定：将所需内容传入 props，并使用相应的 prop。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
import App from './29-App-props-slot';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/29-App-props-slot.jsx`

```jsx
import React, { Component } from 'react';
const Header = (props) => {
	return (
		<div>
			{props.header}
			<hr />
			{props.content}
		</div>
	);
};

class App extends Component {
	render() {
		return (
			<div>
				<Header header={<h1>hello React</h1>} content={<div>如此强大</div>}></Header>

				<Header header="11111" content="22222"></Header>
			</div>
		);
	}
}

export default App;
```

> 像 App 组件中的`header` 和`content`属性对应的之类的`React` 元素本质就是对象（`object`），所以你可以把它们当作 `props`，像其他数据一样传递。这种方法可能使你想起 vue 中“插槽”（`slot`）的概念，但在 `React` 中没有“插槽”这一概念的限制，你可以将任何东西作为 props 进行传递。

## 13.3 封装 Modal 弹窗

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
import App from './30-App-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/30-App-modal.jsx`

```jsx
import React, { Component } from 'react';

class Modal extends Component {
	render() {
		return (
			<div
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '50%',
						minHeight: 500,
						backgroundColor: '#fff',
					}}
				>
					<header>
						{this.props.header}
						<span style={{ float: 'right' }} onClick={() => this.props.onClose()}>
							×
						</span>
					</header>
					<div>{this.props.content}</div>
				</div>
			</div>
		);
	}
}

class App extends Component {
	state = {
		show: false,
	};
	render() {
		return (
			<div>
				<button onClick={() => this.setState({ show: true })}>打开模态框</button>
				{this.state.show ? (
					<Modal
						header="模态框标题"
						content="这里是一个自定义的模态框"
						onClose={() => this.setState({ show: false })}
					/>
				) : null}
			</div>
		);
	}
}

export default App;
```

> 审查元素发现 Modal 组件是渲染在原来的组件的位置的，如果想要让它渲染到不同的位置怎么办呢？

## 13.4 ReactDOM.createPortal()

普通的组件，子组件的元素将挂载到父组件的 DOM 节点中。

有时需要将元素渲染到 DOM 中的不同位置上去，这是就用到的 portal 的方法。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
import App from './31-App-modal-portal';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/31-App-modal-portal.jsx`

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Modal extends Component {
	render() {
		return ReactDOM.createPortal(
			<div
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '50%',
						minHeight: 500,
						backgroundColor: '#fff',
					}}
				>
					<header>
						{this.props.header}
						<span style={{ float: 'right' }} onClick={() => this.props.onClose()}>
							×
						</span>
					</header>
					<div>{this.props.content}</div>
				</div>
			</div>,
			document.getElementsByTagName('body')[0]
		);
	}
}

class App extends Component {
	state = {
		show: false,
	};
	render() {
		return (
			<div>
				<button onClick={() => this.setState({ show: true })}>打开模态框</button>
				{this.state.show ? (
					<Modal
						header="模态框标题"
						content="这里是一个自定义的模态框"
						onClose={() => this.setState({ show: false })}
					/>
				) : null}
			</div>
		);
	}
}

export default App;
```

> 一个 portal 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

# 十四、上下文 Context

## 14.1 理解上下文、作用及其特点

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

## 14.2 使用 React.createContext()

### 14.2.1 逐层传递数据

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
import App from './32-App-next-value';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/32-App-next-value.jsx`

```jsx
import React, { Component } from 'react';
class Third extends Component {
	render() {
		return (
			<div>
				<h3>third</h3>
				<div>{this.props.val}</div>
			</div>
		);
	}
}
const Second = (props) => {
	return (
		<div>
			<h2>second</h2>
			<Third val={props.val} />
		</div>
	);
};
const First = (props) => {
	return (
		<div>
			<h1>first</h1>
			<Second val={props.val} />
		</div>
	);
};
class App extends Component {
	render() {
		return (
			<div>
				<First val="传家宝" />
			</div>
		);
	}
}

export default App;
```

### 14.2.2 使用 Context 传值

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
// import App from './32-App-next-value'
import App from './33-App-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/33-App-context.jsx`

```jsx
import React, { Component } from 'react';
// 1.创建上下文对象
const MyContext = React.createContext();

// 3.后代获取数据
// 3.1 如果后代组件是类组件 可以通过 类的静态属性 static contextType = 上下文对象 获取祖先组件的值，然后在jsx中 通过 this.context 取值即可
// class Third extends Component {
//   static contextType = MyContext
//   render () {
//     return (
//       <div>
//         <h3>third!!</h3>
//         <div>{ this.context }</div>
//       </div>
//     )
//   }
// }
// 3.2 如果不使用 静态属性，那么可以 通过 上下文对象.Consumer 来获取数据(在其内部图片通过函数返回jsx代码，函数的默认参数就是祖先组件传递的值)
class Third extends Component {
	render() {
		return (
			<div>
				<h3>third!!</h3>
				<div>
					<MyContext.Consumer>
						{(value) => {
							return <mark>{value}</mark>;
						}}
					</MyContext.Consumer>
				</div>
			</div>
		);
	}
}
const Second = () => {
	return (
		<div>
			<h2>second</h2>
			<Third />
		</div>
	);
};
const First = () => {
	return (
		<div>
			<h1>first</h1>
			<Second />
		</div>
	);
};
class App extends Component {
	render() {
		return (
			<div>
				{/* 2.在需要传值的地方，通过 上下文 对象 的 Provider 组件以及value属性配合传递数据 */}
				<MyContext.Provider value="传家宝">
					<First />
				</MyContext.Provider>
			</div>
		);
	}
}

export default App;
```

### 14.2.3 传递多个值

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
import App from './34-App-context-mutiple-value';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/34-App-context-mutiple-value.jsx`

```jsx
import React, { Component } from 'react';
import { useContext } from 'react';
// 1.创建上下文对象
const MyContext = React.createContext();
const ColorContext = React.createContext();

// 3.后代获取数据
// 3.1 如果后代组件是类组件 可以通过 类的静态属性 static contextType = 上下文对象 获取祖先组件的值，然后在jsx中 通过 this.context 取值即可
// class Third extends Component {
//   static contextType = MyContext
//   render () {
//     return (
//       <div>
//         <h3>third!!</h3>
//         <div>{ this.context }</div>
//       </div>
//     )
//   }
// }
// 3.2 如果不使用 静态属性，那么可以 通过 上下文对象.Consumer 来获取数据(在其内部图片通过函数返回jsx代码，函数的默认参数就是祖先组件传递的值)
class Third extends Component {
	render() {
		return (
			<div>
				<h3>third!!</h3>
				<div>
					<MyContext.Consumer>
						{(value) => {
							return <mark>{value}</mark>;
						}}
					</MyContext.Consumer>
				</div>
			</div>
		);
	}
}
// 4.如果传递了多个上下文对象
// 即使为类组件，那么也不建议使用 静态属性属性，推荐使用 Consumer 嵌套来获取数据，一定要注意嵌套的规则
const Second = () => {
	return (
		<div>
			<h2>second</h2>
			<MyContext.Consumer>
				{(myval) => {
					return (
						<div>
							{myval} -
							<ColorContext.Consumer>
								{(colorVal) => {
									return <span>{colorVal}</span>;
								}}
							</ColorContext.Consumer>
						</div>
					);
				}}
			</MyContext.Consumer>
			<Third />
		</div>
	);
};
// 5.如果后代组件是函数式组件，那么可以通过 useContext 简化操作 ---- 剧透
const First = () => {
	const my = useContext(MyContext);
	const color = useContext(ColorContext);
	return (
		<div>
			<h1>first</h1>
			<div>
				{color} - {my}
			</div>
			<Second />
		</div>
	);
};
class App extends Component {
	render() {
		return (
			<div>
				{/* 2.在需要传值的地方，通过 上下文 对象 的 Provider 组件以及value属性配合传递数据 */}
				<MyContext.Provider value="传家宝">
					<ColorContext.Provider value="红色">
						<First />
					</ColorContext.Provider>
				</MyContext.Provider>
			</div>
		);
	}
}

export default App;
```

> 如果浏览器安装过 react 的开发者工具,打开之后发现上述代码，都显示为 `Context.Provider` 和 `Context.Consumer`,不好区分
>
> 加入 上下文对象的 `displayName`

### 14.2.4 displayName

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
// import App from './34-App-context-mutiple-value'
import App from './35-App-context-display';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/35-App-context-display.jsx`

```jsx
import React, { Component } from 'react';
import { useContext } from 'react';
// 1.创建上下文对象
const MyContext = React.createContext();
const ColorContext = React.createContext();
// 通过react的开发者工具查看
MyContext.displayName = 'MyContext';
ColorContext.displayName = 'ColorContext';

// 3.后代获取数据
// 3.1 如果后代组件是类组件 可以通过 类的静态属性 static contextType = 上下文对象 获取祖先组件的值，然后在jsx中 通过 this.context 取值即可
// class Third extends Component {
//   static contextType = MyContext
//   render () {
//     return (
//       <div>
//         <h3>third!!</h3>
//         <div>{ this.context }</div>
//       </div>
//     )
//   }
// }
// 3.2 如果不使用 静态属性，那么可以 通过 上下文对象.Consumer 来获取数据(在其内部图片通过函数返回jsx代码，函数的默认参数就是祖先组件传递的值)
class Third extends Component {
	render() {
		return (
			<div>
				<h3>third!!</h3>
				<div>
					<MyContext.Consumer>
						{(value) => {
							return <mark>{value}</mark>;
						}}
					</MyContext.Consumer>
				</div>
			</div>
		);
	}
}
// 4.如果传递了多个上下文对象
// 即使为类组件，那么也不建议使用 静态属性属性，推荐使用 Consumer 嵌套来获取数据，一定要注意嵌套的规则
const Second = () => {
	return (
		<div>
			<h2>second</h2>
			<MyContext.Consumer>
				{(myval) => {
					return (
						<div>
							{myval} -
							<ColorContext.Consumer>
								{(colorVal) => {
									return <span>{colorVal}</span>;
								}}
							</ColorContext.Consumer>
						</div>
					);
				}}
			</MyContext.Consumer>
			<Third />
		</div>
	);
};
// 5.如果后代组件是函数式组件，那么可以通过 useContext 简化操作 ---- 剧透
const First = () => {
	const my = useContext(MyContext);
	const color = useContext(ColorContext);
	return (
		<div>
			<h1>first</h1>
			<div>
				{color} - {my}
			</div>
			<Second />
		</div>
	);
};
class App extends Component {
	render() {
		return (
			<div>
				{/* 2.在需要传值的地方，通过 上下文 对象 的 Provider 组件以及value属性配合传递数据 */}
				<MyContext.Provider value="传家宝">
					<ColorContext.Provider value="红色">
						<First />
					</ColorContext.Provider>
				</MyContext.Provider>
			</div>
		);
	}
}

export default App;
```

## 14.3 常见应用场景解读

-   共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言
-   配合`react hooks `中的`useReducer`可以实现轻量的 `redux`

# 十五、高阶组件

高阶组件（HOC-higher order componnet）是 React 中用于复用组件逻辑的一种高级技巧。

HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**

## 15.1 理解高阶组件、作用及其特点

一个高阶组件只是一个包装了另外一个 React 组件的 组件。
这种形式通常实现为一个函数，本质上是一个类工厂。

.实现了对原有组件的`增强和优化`。

可以对原有`组件`中的 state, props 和逻辑执行增删改操作, 一般用于代码`重用`和组件`增强优化`

## 15.2 高阶组件语法详解

我们想要我们的组件通过自动注入一个版权信息

### 15.2.1 组件嵌套

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
// import App from './34-App-context-mutiple-value'
// import App from './35-App-context-display'
import App from './36-App-more-use';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/36-App-more-use.jsx`

```jsx
import React, { Component } from 'react';

localStorage.setItem('userName', '陆荣涛');

class Footer extends Component {
	render() {
		return <footer>Copyright 2011-2022 1 京ICP备12003911号-3</footer>;
	}
}

class Child1 extends Component {
	state = { userName: '' };
	componentDidMount() {
		console.log(localStorage.getItem('userName'));
		this.setState({
			userName: localStorage.getItem('userName'),
		});
	}
	render() {
		return (
			<div>
				<h1>child1-{this.state.userName}</h1>
				<Footer />
			</div>
		);
	}
}
class Child2 extends Component {
	state = { userName: '' };
	componentDidMount() {
		console.log(localStorage.getItem('userName'));
		this.setState({
			userName: localStorage.getItem('userName'),
		});
	}
	render() {
		return (
			<div>
				<h1>child2-{this.state.userName}</h1>
				<Footer />
			</div>
		);
	}
}
class App extends Component {
	render() {
		return (
			<div>
				<Child1 />
				<hr />
				<Child2 />
			</div>
		);
	}
}

export default App;
```

> 通过`Footer`组件可以复用 jsx 代码，但是其余的业务逻辑代码显得无能为力，可以同故宫高阶组件来实现

### 15.2.2 高阶组件

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-modal-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
// import App from './34-App-context-mutiple-value'
// import App from './35-App-context-display'
// import App from './36-App-more-use'
import App from './37-App-more-use-hoc';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App root={root} />);
```

`src/37-App-more-use-hoc.jsx`

```jsx
import React, { Component } from 'react';

localStorage.setItem('userName', '陆荣涛');

// class Footer extends Component {
//   render () {
//     return (
//       <footer>
//         Copyright 2011-2022 1 京ICP备12003911号-3
//       </footer>
//     )
//   }
// }

// 1.高阶组件：就是一个纯函数，将一个组件作为参数，并且返回另一个新的组件
// 2.高阶组件内部可以实现 可以复用的业务逻辑
// 3.高阶组件内可以通过 类似于 父子组件关系 传递数据
// 4.<></>表示react的空标签，同理 react常用的另一个空标签 React.Fragment
const withFooter = (OldCom) => {
	return class extends Component {
		state = { userName: '' };
		componentDidMount() {
			console.log(localStorage.getItem('userName'));
			this.setState({
				userName: localStorage.getItem('userName'),
			});
		}
		render() {
			return (
				<React.Fragment>
					<OldCom userName={this.state.userName} />
					<footer>Copyright 2011-2022 1 京ICP备12003911号-3</footer>
				</React.Fragment>
			);
		}
	};
};

class Child1 extends Component {
	render() {
		return (
			<div>
				<h1>child1-{this.props.userName}</h1>
			</div>
		);
	}
}
Child1 = withFooter(Child1);
class Child2 extends Component {
	render() {
		return (
			<div>
				<h1>child2-{this.props.userName}</h1>
			</div>
		);
	}
}
Child2 = withFooter(Child2);
class App extends Component {
	render() {
		return (
			<div>
				<Child1 />
				<hr />
				<Child2 />
			</div>
		);
	}
}

export default App;
```

## 15.3 常见应用场景解读

1.需要代码重用时, react 如果有多个组件都用到了`同一段逻辑`, 这时,就可以把共同的逻辑部分提取出来,利用高阶组件的形式将这段逻辑整合到每一个组件中, 从而减少代码的逻辑重复

2.需要组件`增强优化时`, 比如我们在项目中使用的组件有些不是自己写的, 而是从网上撸下来的,但是`第三方`写的组件可能比较复杂, 有时不能完全满足需求, 但第三方组件不易修改, 此时也可以用高阶组件,在不修改原始组件的前提下, 对组件添加满足实际开发需求的功能

3.可以对原有`组件`中的 state, props 和逻辑执行增删改操作, 一般用于代码`重用`和组件`增强优化`

4.也可以用来替换 `mixins` 混入

> 父组件和高阶组件有什么区别？
>
> -   首先从逻辑的执行流程上来看，高阶组件确实和父组件比较相像
> -   但是`高阶`组件强调的是`逻辑`的抽象。高阶组件是一个`函数`，函数关注的是逻辑；
> -   `父组件`是一个组件，组件主要关注的是`UI/DOM`。如果逻辑是与 DOM 直接相关的，那么这部分逻辑适合放到父组件中实现；
> -   如果逻辑是与 DOM 不直接相关的，那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。

# 十六、ref

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

## 16.1 ref 访问 DOM

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-model-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
// import App from './34-App-context-mutiple-value'
// import App from './35-App-context-display'
// import App from './36-App-more-use'
// import App from './37-App-more-use-hoc'
import App from './38-App-ref';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

`src/38-App-ref.jsx`

```jsx
import React, { Component } from 'react';

const Child2 = (props) => {
	return (
		<>
			<h1 ref={props.ref}>child2</h1>
		</>
	);
};
class Child1 extends Component {
	state = { count: 10 };

	clickHandler = () => {
		this.setState({ count: this.state.count + 1 });
	};

	render() {
		return (
			<>
				<h1>child1 - {this.state.count}</h1>
			</>
		);
	}
}

// 1.在严格模式下，不要使用 字符串类型的ref，它已被废弃
// 2.如果在类组件中使用ref，建议使用 createRef
// 3.通过 createRef 创建的 ref 的 current值可以获取到子组件的实例(前提条件是子组件为类组件)
// 4.不可以直接通过ref 获取函数式组件的实例（因为函数式组件没有实例）
class App extends Component {
	child1Ref = React.createRef();
	child2Ref = React.createRef();
	divRef = React.createRef();
	add = () => {
		// console.log(this.refs.child1)
		console.log(this.child1Ref.current.state);
		this.child1Ref.current.clickHandler();
	};
	// 挂载阶段，应该只执行一次，但是此处确打印了2次
	// 检查入口文件处 是否开启了严格模式（这仅适用于开发模式。生产模式下生命周期不会被调用两次。）
	// react 18版本以前没有执行2次之说
	// 如果子组件是函数式组件，调用子组件的时候，添加的ref属性 需要在 定义子组件时通过 React.forwardRef 高阶组件包裹，第二个参数就是传递的ref
	// 这样就可以在父组件中获取到子组件中的 DOM 标签
	componentDidMount() {
		console.log(this.child2Ref);
		console.log(this.divRef.current.innerHTML);
	}
	render() {
		return (
			<div>
				<button onClick={this.add}>加</button>
				{/* <Child1 ref="child1" /> */}
				<Child1 ref={this.child1Ref} />
				<Child2 ref={this.child2Ref} />
				{/* ref也可以用在DOM */}
				<div ref={this.divRef}>ref-DOM</div>
			</div>
		);
	}
}

export default App;
```

> 如果在上述案例中，在`Child2`组件中的`h1`标签上获取 父组件传递过来的 ref
>
> `<h1 ref={ props.ref }>child2</h1>`,
>
> 警告提示：ref is not a prop.
>
> 其原因是，React 将 ref 属性做了特殊处理，**当 ref 需要引用组件时，必须使用 React.forwardRef()方法二次包装**

## 16.2 详解 ref 转发

**Ref 转发是一个可选特性，其允许某些组件接收 `ref`，并将其向下传递（换句话说，“转发”它）给子组件。**

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 引入时，后缀名可以省略，可以在webpack中配置
// import App from './01-App-parent-child'
// import App from './02-App-parent-child-value'
// import App from './03-App-parent-child-value-default'
// import App from './04-App-parent-child-value-default-type'
// import App from './05-App-props-children'
// import App from './06-App-mutiple-props-children'
// import App from './07-App-mouse-tracker'
// import App from './08-App-render-props'
// import App from './09-App-state-es6'
// import App from './10-App-state-es7'
// import App from './11-App-setState-function'
// import App from './12-App-setState-object'
// import App from './13-App-setState-callback'
// import App from './14-App-LifeCycle'
// import App from './15-App-handler-es5'
// import App from './16-App-handler-es6'
// import App from './17-App-condition-yu'
// import App from './18-App-condition-san'
// import App from './19-App-classnames'
// import App from './20-App-css-in-js'
// import App from './21-App-module-css'
// import App from './22-App-style'
// import App from './23-App-map'
// import App from './24-App-form'
// import App from './25-App-form-control'
// import App from './26-App-parent-child-value'
// import App from './27-App-state-up'
// import App from './28-App-props-children'
// import App from './29-App-props-slot'
// import App from './30-App-modal'
// import App from './31-App-model-portal'
// import App from './32-App-next-value'
// import App from './33-App-context'
// import App from './34-App-context-mutiple-value'
// import App from './35-App-context-display'
// import App from './36-App-more-use'
// import App from './37-App-more-use-hoc'
// import App from './38-App-ref'
import App from './39-App-ref-forward';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

`src/39-App-ref-forward.jsx`

```jsx
import React, { Component } from 'react';

// 转发ref
const Child2 = React.forwardRef((props, ref) => {
	return (
		<>
			<h1 ref={ref}>child2</h1>
		</>
	);
});
class Child1 extends Component {
	state = { count: 10 };

	clickHandler = () => {
		this.setState({ count: this.state.count + 1 });
	};

	render() {
		return (
			<>
				<h1>child1 - {this.state.count}</h1>
			</>
		);
	}
}

// 1.在严格模式下，不要使用 字符串类型的ref，它已被废弃
// 2.如果在类组件中使用ref，建议使用 createRef
// 3.通过 createRef 创建的 ref 的 current值可以获取到子组件的实例(前提条件是子组件为类组件)
// 4.不可以直接通过ref 获取函数式组件的实例（因为函数式组件没有实例）
class App extends Component {
	child1Ref = React.createRef();
	child2Ref = React.createRef();
	divRef = React.createRef();
	add = () => {
		// console.log(this.refs.child1)
		console.log(this.child1Ref.current.state);
		this.child1Ref.current.clickHandler();
	};
	// 挂载阶段，应该只执行一次，但是此处确打印了2次
	// 检查入口文件处 是否开启了严格模式（这仅适用于开发模式。生产模式下生命周期不会被调用两次。）
	// react 18版本以前没有执行2次之说
	// 如果子组件是函数式组件，调用子组件的时候，添加的ref属性 需要在 定义子组件时通过 React.forwardRef 高阶组件包裹，第二个参数就是传递的ref
	// 这样就可以在父组件中获取到子组件中的 DOM 标签
	componentDidMount() {
		console.log(this.child2Ref);
		console.log(this.divRef.current.innerHTML);
	}
	render() {
		return (
			<div>
				<button onClick={this.add}>加</button>
				{/* <Child1 ref="child1" /> */}
				<Child1 ref={this.child1Ref} />
				<Child2 ref={this.child2Ref} />
				{/* ref也可以用在DOM */}
				<div ref={this.divRef}>ref-DOM</div>
			</div>
		);
	}
}

export default App;
```

## 16.3 使用 ref 注意事项

-   当 `ref` 属性用于 HTML 元素时，使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
-   当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
-   **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。如果非要使用，实际上是转发 ref（父组件中获取到了子组件的某个 DOM）

-   -   https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

# 十七、hooks

## 17.1 为什么使用 hooks

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 [render props](https://gitee.com/link?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Frender-props.html) 和 [高阶组件](https://gitee.com/link?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhigher-order-components.html)。

**Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

**react 18 版本以前 hooks**

-   [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks)
    -   [`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate)
    -   [`useEffect`](https://react.docschina.org/docs/hooks-reference.html#useeffect)
    -   [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)
-   [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
    -   [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
    -   [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
    -   [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
    -   [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
    -   [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
    -   [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
    -   `useDebugValue`

## 17.2 常见的 hooks

```
$ npx create-react-app react-hooks
```

### 17.2.1 useState

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './01-App-useState';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/01-App-useState1.jsx`

```jsx
import { useState } from 'react';

// useState 修改状态直接写值
const App = () => {
	// 数组的解构
	const [count, setCount] = useState(10); // 设置状态count，初始化的值为 number 10，修改状态的函数叫 setCount
	const add = () => {
		setCount(count + 1); // 修改状态函数中直接写 运算以后的结果
		setCount(count + 1);
		setCount(count + 1);
		console.log(count); // 10 说明 setCount 是一个异步操作
		// 点击加1.最终输出为11
	};
	return (
		<div>
			<div>
				{count} <button onClick={add}>加1</button>
			</div>
		</div>
	);
};

export default App;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
import App from './02-App-useState2';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/02-App-useState2.jsx`

```jsx
import { useState } from 'react';

// useState 修改状态为函数
const App = () => {
	// 数组的解构
	const [count, setCount] = useState(10); // 设置状态count，初始化的值为 number 10，修改状态的函数叫 setCount
	const add = () => {
		// setCount(count + 1) // 修改状态函数中直接写 运算以后的结果
		// setCount(count + 1)
		// setCount(count + 1)
		setCount((count) => count + 1);
		setCount((count) => count + 1);
		setCount((count) => {
			return count + 1;
		});
		console.log(count); // 10 说明 setCount 是一个异步操作
		// 点击加1.最终输出为13
	};
	return (
		<div>
			<div>
				{count} <button onClick={add}>加1</button>
			</div>
		</div>
	);
};

export default App;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
import App from './03-App-useState3';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/03-App-useState3.jsx`

```jsx
import { useEffect, useState } from 'react';

// useState 设置初始化状态的方法
const App = () => {
	const [obj, setObj] = useState({
		w: 100,
		h: 100,
		x: 0,
		y: 0,
	});

	// 剧透 useEffect
	useEffect(() => {
		// componentDidMount componentDidUpdate componentWillUnmount
		function moveHandler(event) {
			console.log(event.clientX, event.clientY);
			// setObj({ // 修改完毕发现页面中的宽高的数据丢失，并不是执行的合并的操作，而是替换操作
			//   x: event.clientX,
			//   y: event.clientY
			// })
			setObj({
				...obj,
				x: event.clientX,
				y: event.clientY,
			});
		}
		window.addEventListener('mousemove', moveHandler);
	});

	return (
		<div>
			<div>
				元素宽为{obj.w}, 高为{obj.h}
			</div>
			<div>
				元素的坐标为( {obj.x}, {obj.y})
			</div>
		</div>
	);
};

export default App;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
import App from './04-App-useState4';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/04-App-useState4`

```jsx
import { useEffect, useState } from 'react';

// useState 设置初始化状态的方法 - 拆分状态
const App = () => {
	const [rect, setRect] = useState({ w: 100, h: 100 });
	const [position, setPosition] = useState({ x: 0, y: 0 });

	// 剧透 useEffect
	useEffect(() => {
		// componentDidMount componentDidUpdate componentWillUnmount
		function moveHandler(event) {
			console.log(event.clientX, event.clientY);
			setPosition({
				x: event.clientX,
				y: event.clientY,
			});
		}
		window.addEventListener('mousemove', moveHandler);
	});

	return (
		<div>
			<div>
				元素宽为{rect.w}, 高为{rect.h}
			</div>
			<div>
				元素的坐标为( {position.x}, {position.y})
			</div>
		</div>
	);
};

export default App;
```

> -   **不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。
>
> -   **只在 React 函数中调用 Hook，**不要在普通的 JavaScript 函数中调用 Hook。你可以：
>     -   在 React 的函数组件中调用 Hook
>     -   在自定义 Hook 中调用其他 Hook
> -   如果遇到需要以对象的形式定义状态时，根据需求划分对象，因为修改状态使用的是替换

### 17.2.2 useEffect

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
import App from './05-App-useEffect';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/05-App-useEffect.jsx`

```jsx
import { useState, useEffect } from 'react';

const App = (props) => {
	const [list, setList] = useState([]);

	// 1.useEffect() 是个副作用函数, 可以执行数据的请求
	// 问题：数据改变之后，数据请求一直不停
	// useEffect(() => { // 相当于componentDidMount componentDidUpdate
	//   fetch('http://121.89.205.189:3001/api/pro/list').then(res => res.json()).then(res => {
	//     console.log(res.data) // 一直在打印 相当于一直触发 componentDidUpdate
	//     setList(res.data)
	//   })
	// })

	// 2.useEffect() 第二个参数是一个依赖项，如果设置为 空数组，表明 useEffect只会执行1次
	// useEffect(() => { // 相当于componentDidMount
	//   fetch('http://121.89.205.189:3001/api/pro/list').then(res => res.json()).then(res => {
	//     console.log(res.data) // 只打印1次
	//     setList(res.data)
	//   })
	// }, [])

	// 3. useEffect() 可以根据第二个参数的值的变化来判断是否需要再次执行
	// 相当于在vue中监听数据的变化的操作
	// const [count, setCount] = useState(10)
	// useEffect(() => { // 相当于componentDidMount componentDidUpdate
	//   fetch('http://121.89.205.189:3001/api/pro/list').then(res => res.json()).then(res => {
	//     console.log(res.data) // 只要count的值发生改变，useEffect就会重新执行
	//     setList(res.data)
	//   })
	// }, [count])

	// 4.useEffect 内返回一个函数，相当于 componentWillUnmount
	// 假设count值为17 ，销毁组件
	const [count, setCount] = useState(10);
	useEffect(() => {
		// 相当于componentDidMount componentDidUpdate componentWillUnmount(返回函数)
		fetch('http://121.89.205.189:3001/api/pro/list')
			.then((res) => res.json())
			.then((res) => {
				console.log(res.data); // 只要count的值发生改变，useEffect就会重新执行
				setList(res.data);
			});
		return () => {
			// componentWillUnmount(返回函数)
			console.log('销毁了组件'); // 每次count值改变，都会打印 ---- 状态改变会引起函数式组件的整体的重新的渲染
		};
	}, [count]);

	useEffect(() => {
		// 判断count的值
		if (count === 17) {
			props.root.unmount();
		}
	}, [count, props.root]); // 添加了useEffect中的依赖项

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>加</button>
			{count}
			<ul>{list && list.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
};

export default App;
```

> 1. useEffect() 是个副作用函数。
> 2. useEffect() 函数在每次组件重新渲染时，可再次被调用。
> 3. 在开发环境中，开启了 React.StrictMode 模式，组件开始时被渲染两次。
> 4. useEffect() 通过返回函数来清理副作用。
> 5. useEffect() 通过传递第二个参数数组来提高渲染性能，或者说实现 watch 效果。

### 17.2.3 useRef

利用 `useRef` 就可以绕过 Capture Value 的特性。**可以认为** `ref` **在所有 Render 过程中保持着唯一引用，因此所有对** `ref` **的赋值或取值，拿到的都只有一个最终状态**，而不会在每个 Render 间存在隔离。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
import App from './06-App-useRef';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/06-App-useRef.jsx`

```jsx
import { useState } from 'react';
import { useEffect } from 'react';
import { forwardRef, useRef } from 'react';

const Child = forwardRef((props, ref) => {
	// 函数式组件的 ref 转发
	return <div ref={ref}>child</div>;
});

const App = () => {
	const childRef = useRef();
	const btnRef = useRef();

	useEffect(() => {
		console.log(childRef.current);
		console.log(btnRef.current);
	}, []);

	// 发现 3秒后打印了用户输入的每一次的值
	// const [name, setName] = useState('') // 每次修改状态，都相当于重新创建了name
	// useEffect(() => {
	//   setTimeout(() => {
	//     console.log('name', name)
	//   }, 3000)
	// })

	// 发现 3秒后打印了用户输入的最终值
	const [name, setName] = useState('');
	const newName = useRef(name); // `ref` 在所有 Render 过程中保持着唯一引用
	useEffect(() => {
		newName.current = name;
		setTimeout(() => {
			console.log('newName', newName);
		}, 3000);
	});

	return (
		<div>
			<Child ref={childRef}></Child>
			<button ref={btnRef}>按钮</button>

			<input type="text" onChange={(event) => setName(event.target.value)} />
		</div>
	);
};

export default App;
```

### 17.2.4 useReducer

useReducer 践行了 Flux/Redux 思想。使用步骤：

1、创建初始值 initialState

2、创建所有操作 reducer(state, action);

3、传给 userReducer，得到读和写 API

4、调用写 ({type: '操作类型'})

总的来说，useReducer 是 useState 的复杂版。

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
import App from './07-App-useReducer';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/07-App-useReducer.jsx`

```jsx
import { useEffect } from 'react';
import { useReducer } from 'react';

// 1.创建初始化数据
const initalState = {
	count: 10,
	proList: [],
};
// 2.设置reducer ----  唯一改变数据方式就是通过reducer实现
const reducer = (state, action) => {
	// action { type, payload }
	switch (action.type) {
		case 'ADD':
			return Object.assign({}, state, { count: state.count + action.payload });
		case 'CHANGE_PRO_LIST':
			return Object.assign({}, state, { proList: action.payload });
		default:
			return state;
	}
};

// 有了useReducer，不需要useState, 但是企业项目一般不去这么使用
const App = () => {
	const [state, dispatch] = useReducer(reducer, initalState);

	useEffect(() => {
		fetch('http://121.89.205.189:3001/api/pro/list')
			.then((res) => res.json())
			.then((res) => {
				dispatch({
					type: 'CHANGE_PRO_LIST',
					payload: res.data,
				});
			});
	}, []);

	return (
		<div>
			{state.count}{' '}
			<button
				onClick={() => {
					dispatch({
						type: 'ADD',
						payload: 5,
					});
				}}
			>
				加5
			</button>
			<ul>{state.proList && state.proList.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
};

export default App;
```

> 如果遇到多个组件需要共享状态时，单纯 useReducer 就显得无能为力

### 17.2.5 useContext

1、使用 C = createContext(initial) 创建上下文

2、使用 <C.Provider> 圈定作用域

3、在作用域内使用 useContext(C)来使用上下文

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
import App from './08-App-useContext';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/08-App-useContext.jsx`

```jsx
import React, { Component, createContext } from 'react';
import { useContext } from 'react';
const MyContext = React.createContext();
const ColorContext = createContext();
MyContext.displayName = 'MyContext';
ColorContext.displayName = 'ColorContext';
const Child1 = () => {
	const my = useContext(MyContext);
	const color = useContext(ColorContext);
	return (
		<div>
			{my} - {color}
		</div>
	);
};
const Child2 = () => {
	const my = useContext(MyContext);
	const color = useContext(ColorContext);
	return (
		<div>
			{color} - {my}
		</div>
	);
};
class App extends Component {
	render() {
		return (
			<div>
				<MyContext.Provider value="传家宝">
					<ColorContext.Provider value="red">
						<Child1 />
						<Child2 />
					</ColorContext.Provider>
				</MyContext.Provider>
			</div>
		);
	}
}

export default App;
```

**使用 useReducer 和 useContext 实现轻型 Redux**

步骤：

1、将数据集中在一个 store 对象

2、将所有操作集中在 reducer

3、创建一个 Context

4、创建对数据的读取 API

5、将第四步的内容放到第三步的 Context

6、用 Context.Provider 将 Context 提供给所有组件

7、各个组件用 useContext 获取读写 API

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
// import App from './08-App-useContext';
import App from './09-App-redux';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/09-App-redux.jsx`

```jsx
import React, { Component } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext, useReducer } from 'react';

const MyContext = createContext();

const initialState = {
	bannerList: [],
	proList: [],
};

const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'CHANGE_BANNER_LIST':
			return Object.assign({}, state, { bannerList: payload });
		case 'CHANGE_PRO_LIST':
			return { ...state, proList: payload };
		default:
			return state;
	}
};

const Child1 = () => {
	const { state, dispatch } = useContext(MyContext);
	useEffect(() => {
		fetch('http://121.89.205.189:3001/api/pro/list?limitNum=15')
			.then((res) => res.json())
			.then((res) => {
				dispatch({ type: 'CHANGE_PRO_LIST', payload: res.data });
			});
	}, []);
	return (
		<div>
			{state.proList &&
				state.proList.map((item) => {
					return <p key={item.proid}>{item.proname}</p>;
				})}
		</div>
	);
};
const Child2 = () => {
	const { state } = useContext(MyContext);

	return (
		<div>
			{state.proList &&
				state.proList.map((item) => {
					return <p key={item.proid}>{item.proname}</p>;
				})}
		</div>
	);
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<MyContext.Provider value={{ state, dispatch }}>
			<Child1 />
			<hr />
			<Child2 />
		</MyContext.Provider>
	);
};

export default App;
```

> useContext + useReducer 可以实现轻型 redux，但是不适合应用于多模块管理的大型项目

### 17.2.6 useMemo

### 17.2.7 useCallback

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
// import App from './08-App-useContext';
// import App from './09-App-redux';
import App from './10-App-useCallback-useMemo';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/10-App-useCallback-useMemo.jsx`

```jsx
import React from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

// const Child = () => {
//   console.log('执行了吗')// a 的值发生改变，就会执行
//   return (
//     <div>child</div>
//   )
// }

const Child = React.memo(() => {
	// React.memo 高阶组件可以提高组件的性能
	console.log('执行了吗'); // a 的值发生改变，就会执行
	return <div>child</div>;
});

const App = () => {
	const [a, setA] = useState(10);
	const [b] = useState(100);
	const add = () => {
		setA(a + 1);
	};
	// const testHandler = () => {
	// }

	//  useCallback 以及 useMemo 可以用来 给组件事件包裹，从而提升性能
	// const testHandler = useCallback(() => { // 这个函数是必须额
	//   return (event) => { // 这里是真正函数需要执行的代码
	//   }
	// }, [b])
	const testHandler = useMemo(
		(event) => {
			// 这里是真正函数需要执行的代码
		},
		[b]
	);

	// useMemo 也可以作为计算属性而存在
	const doubleA = useMemo(() => {
		return a * 2;
	}, [a]);
	return (
		<div>
			<button onClick={add}>a + 1</button> {a} - {doubleA}
			{/* 可以通过 React.memo 高阶组件提升性能 */}
			{/* <Child b = {b}/> */}
			{/* 每次执行，testHandler 都返回一个新的引用，意味着Child组件的 handler 属性发生改变
        可以通过 useCallback 或者 useMemo 解决
      */}
			<Child b={b} handler={testHandler} />
		</div>
	);
};

export default App;
```

> useCallback 应用于 组件的事件，使用 useCallback 包裹组件
>
> useMemo 可以是计算属性， 也应用于 组件的事件，使用 useMemo 包裹组件

### 17.2.8 useImperativeHandle

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
// import App from './08-App-useContext';
// import App from './09-App-redux';
// import App from './10-App-useCallback-useMemo';
import App from './11-App-ref';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/11-App-ref.jsx`转发 ref

```jsx
import React from 'react';
import { useRef } from 'react';

// 转发refs实现
const Input1 = React.forwardRef((props, ref) => {
	return <input ref={ref} />;
});
const App = () => {
	const input1Ref = useRef();
	return (
		<div>
			<Input1 ref={input1Ref} />
			<button
				onClick={() => {
					input1Ref.current.focus();
				}}
			>
				input1 获取焦点
			</button>
		</div>
	);
};

export default App;
```

**通过透传 ref 解决问题**

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
// import App from './08-App-useContext';
// import App from './09-App-redux';
// import App from './10-App-useCallback-useMemo';
// import App from './11-App-ref';
import App from './12-App-useImperativeHandle';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/12-App-useImperativeHandle.jsx`

```jsx
import React from 'react';
import { useImperativeHandle } from 'react';
import { useRef } from 'react';

const Input1 = React.forwardRef((props, ref) => {
	const iRef = useRef();
	useImperativeHandle(ref, () => {
		// 透传ref
		return {
			abcd: () => {
				// 定义函数
				iRef.current.focus();
			},
		};
	});
	return <input ref={iRef} />;
});
const App = () => {
	const input1Ref = useRef();
	return (
		<div>
			<Input1 ref={input1Ref} />
			<button
				onClick={() => {
					input1Ref.current.abcd(); // 调用 内部自定义的 函数
				}}
			>
				input1 获取焦点
			</button>
		</div>
	);
};

export default App;
```

上面这个例子中与直接转发 ref 不同，直接转发 ref 是将 `React.forwardRef` 中函数上的 ref 参数直接应用在了返回元素的 ref 属性上，其实父、子组件引用的是同一个 ref 的 current 对象，官方不建议使用这样的 ref 透传，而使用 `useImperativeHandle` 后，可以让父、子组件分别有自己的 ref，通过 `React.forwardRef` 将父组件的 ref 透传过来，通过 `useImperativeHandle` 方法来自定义开放给父组件的 current。

`useImperativeHandle `的第一个参数是定义 current 对象的 ref，第二个参数是一个函数，返回值是一个对象，即这个 ref 的 current 对象，这样可以像上面的案例一样，通过自定义父组件的 ref 来使用子组件 ref 的某些方法。

`useImperativeHandle` 和`React.forwardRef`必须是配合使用的，这也是为什么在开头要介绍 ref 的转发。

### 17.2.9 useLayoutEffect

useLayoutEffect 与 useEffect 的区别：

-   `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
-   `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前

举个例子：

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './01-App-useState1';
// import App from './02-App-useState2';
// import App from './03-App-useState3';
// import App from './04-App-useState4';
// import App from './05-App-useEffect';
// import App from './06-App-useRef';
// import App from './07-App-useReducer';
// import App from './08-App-useContext';
// import App from './09-App-redux';
// import App from './10-App-useCallback-useMemo';
// import App from './11-App-ref';
// import App from './12-App-useImperativeHandle';
import App from './13-App-useLayoutEffect';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App root={root} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/13-App-useLayoutEffect.jsx`

```jsx
import React, { useState, useEffect, useLayoutEffect } from 'react';

function App() {
	const [state1, setState1] = useState('hello');
	const [state2, setState2] = useState('hi');

	useEffect(() => {
		let i = 0;
		while (i < 1000000000) {
			i++;
		}
		setState1('world');
	}, []);
	useLayoutEffect(() => {
		let i = 0;
		while (i < 1000000000) {
			i++;
		}
		setState2('world');
	}, []);

	return (
		<>
			<h1>{state1}</h1>
			<h1>{state2}</h1>
		</>
	);
}

export default App;
```

> 注意观察 useEffect 抖动现象
>
> useLayoutEffect 做 DOM 操作
>
> useEffect 中 副作用执行

### 17.2.10 useDebugValue

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。

```jsx
import React from 'react';
import useMyHook from './useMyHook';

export default function UseDebugValueDemo() {
	const { x } = useMyHook();
	return <h1>{x}</h1>;
}
```

```jsx
import { useState, useDebugValue } from 'react';
const useMyHook = () => {
	const [x, setX] = useState(0);
	const [num, setNum] = useState(100);

	useDebugValue('tag' + x);

	useDebugValue(num, (num) => num + 1);

	return {
		x: 100,
		num: 0,
	};
};

export default useMyHook;
```

### 17.2.11 useId

`useId`是一个钩子，用于生成唯一的 ID，在服务器和客户端之间是稳定的，同时避免 hydration 不匹配。

> 注意：
>
> `useId`不是用来生成列表中的键的。`Keys` 应该从你的数据中生成。

对于一个基本的例子，直接将 id 传递给需要它的元素。

对于同一组件中的多个 ID，使用相同的 ID 附加一个后缀。

```jsx
import React, { useId, useState } from 'react';

function UseIdDemo() {
	const userId = useId();
	const passwordId = useId();
	const id = useId();
	const [list, setList] = useState(['a', 'b', 'c']);
	return (
		<div>
			{/* <div>
        <label htmlFor='username'>用户名</label>
        <input id="username" type="text" placeholder='用户名' />
      </div> */}
			{/* <div>
        <label htmlFor={ userId }>用户名</label>
        <input id={userId} type="text" placeholder='用户名' />
      </div>
      <div>
        <label htmlFor={passwordId}>密码</label>
        <input id={passwordId} type="text" placeholder='密码' />
      </div> */}
			<div>
				<label htmlFor={id + '-user'}>用户名</label>
				<input id={id + '-user'} type="text" placeholder="用户名" />
			</div>
			<div>
				<label htmlFor={id + '-password'}>密码</label>
				<input id={id + '-password'} type="text" placeholder="密码" />
			</div>
			<ul>
				{list.map((item) => {
					// React Hook "useId" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function
					// const id = useId()
					return <li key={item}>{item}</li>;
				})}
			</ul>
		</div>
	);
}

export default UseIdDemo;
```

> **注意：**
>
> `useId` 会生成一个包含 : token 的字符串。这有助于确保令牌是唯一的，但在 CSS 选择器或 API（如`querySelectorAll`）中不支持。
>
> `useId`支持一个`identifierPrefix`，以防止在多根应用程序中发生碰撞。要配置，请参阅 `hydrateRoot` 和 `ReactDOMServer `的选项。
>
> hooks 需要在函数式组件以及自定义 hook 的顶级使用（返回 jsx 代码之前），不要在 jsx 代码中使用 hooks

### 17.2.12 useDeferredValue

`useDeferredValue` 需要接收一个值, 返回这个值的副本, 副本的更新会在值更新渲染之后进行更新, 以此来避免一些不必要的重复渲染. 打个比方页面中有输入框, 输入框下的内容依赖于输入框的值, 但是输入框是一个高频操作, 如果输入 10 次, 可能用户只想看到最终的结果那么中途的实时渲染就显得不那么重要了, 页面元素少点还好, 一旦元素过多页面就会及其的卡顿, 渲染引擎堵得死死的, 用户就会骂娘了, 此时使用 useDeferredValue 是一个很好的选择

```jsx
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

```tsx
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

### 17.2.13 useTransition

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

### 17.2.14 useSyncExternalStore

React18 的 beta 版本将`useMutableSource`更新为了`useSyncExternalStore`，这个新的 api 将会对 React 的各种状态管理库产生非常大的影响，下面我来介绍`useSyncExternalStore`的用法和场景。

我们可以通过这个 api 自行设计一个 redux + react-redux 的数据方案：

**1、设计 store**

首先我们要设计一个 store，它必须有如下属性：

-   currentState:当前状态
-   subscribe:提供状态发生变化时的订阅能力
-   getSnapshot: 获取当前状态

以及改变 state 的方法，这里参考 redux，设计了 dispatch、reducer

```jsx
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

### 17.2.15 useInsertionEffect

`useInsertionEffect` 与 useEffect 相同，在所有 DOM 变更之前同步触发。在使用 useLayoutEffect 读取布局之前，使用这个函数将样式注入到 DOM 中。因为这个钩子的作用域是有限的，所以这个钩子不能访问 refs，也不能调度更新。

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

## 17.3 自定义 hooks

以 use 开头的小驼峰式的函数

# 十八、Redux

## 18.1 理解 Flux 架构

在 2013 年，Facebook 让`React`亮相的同时推出了 Flux 框架，`React`的初衷实际上是用来替代`jQuery`的，`Flux`实际上就可以用来替代`Backbone.js`，`Ember.js`等一系列`MVC`架构的前端 JS 框架。

其实`Flux`在`React`里的应用就类似于`Vue`中的`Vuex`的作用，但是在`Vue`中，`Vue`是完整的`mvvm`框架，而`Vuex`只是一个全局的插件。

`React`只是一个 MVC 中的 V(视图层)，只管页面中的渲染，一旦有数据管理的时候，`React`本身的能力就不足以支撑复杂组件结构的项目，在传统的`MVC`中，就需要用到 Model 和 Controller。Facebook 对于当时世面上的`MVC`框架并不满意，于是就有了`Flux`, 但`Flux`并不是一个`MVC`框架，他是一种新的思想。

[![image.png](https://i.postimg.cc/52Rdsy1Z/image.png)](https://postimg.cc/4YVSdJY5)

-   View： 视图层
-   ActionCreator（动作创造者）：视图层发出的消息（比如 mouseClick）
-   Dispatcher（派发器）：用来接收 Actions、执行回调函数
-   Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒 Views 要更新页面

Flux 的流程：

1. 组件获取到 store 中保存的数据挂载在自己的状态上
2. 用户产生了操作，调用 actions 的方法
3. actions 接收到了用户的操作，进行一系列的逻辑代码、异步操作
4. 然后 actions 会创建出对应的 action，action 带有标识性的属性
5. actions 调用 dispatcher 的 dispatch 方法将 action 传递给 dispatcher
6. dispatcher 接收到 action 并根据标识信息判断之后，调用 store 的更改数据的方法
7. store 的方法被调用后，更改状态，并触发自己的某一个事件
8. store 更改状态后事件被触发，该事件的处理程序会通知 view 去获取最新的数据

## 18.2 理解 Redux 单向数据流流程

React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。有两个方面，它没涉及。

-   代码结构
-   组件之间的通信

2013 年 Facebook 提出了 Flux 架构的思想，引发了很多的实现。2015 年，Redux 出现，将 Flux 与[函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)结合一起，很短时间内就成为了最热门的前端架构。

如果你不知道是否需要 Redux，那就是不需要它

只有遇到 React 实在解决不了的问题，你才需要 Redux

简单说，如果你的 UI 层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

-   用户的使用方式非常简单
-   用户之间没有协作
-   不需要与服务器大量交互，也没有使用 WebSocket
-   视图层（View）只从单一来源获取数据

**需要使用 Redux 的项目:**

-   用户的使用方式复杂
-   不同身份的用户有不同的使用方式（比如普通用户和管理员）
-   多个用户之间可以协作
-   与服务器大量交互，或者使用了 WebSocket
-   View 要从多个来源获取数据

**从组件层面考虑，什么样子的需要 Redux：**

-   某个组件的状态，需要共享
-   某个状态需要在任何地方都可以拿到
-   一个组件需要改变全局状态
-   一个组件需要改变另一个组件的状态

**Redux 的设计思想：**

1. Web 应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面（唯一数据源）。

> 注意：flux、redux 都不是必须和 react 搭配使用的，因为 flux 和 redux 是完整的架构，在学习 react 的时候，只是将 react 的组件作为 redux 中的视图层去使用了。

<!-- ![image-20220812002936378](/public/image/redux) -->

[redux.png](https://postimg.cc/Yv0SKsjM)

## 18.3 redux 使用三大原则

-   Single Source of Truth(唯一的数据源)
-   State is read-only(状态是只读的)
-   Changes are made with pure function(数据的改变必须通过纯函数完成)

## 18.4 redux + react-redux 配合使用

> 按理来说，应该先学习 redux，再学习 redux + react-redux，但是企业项目中 一般都是 react + react-redux

react-redux 提供两个核心的 api：

-   Provider: 提供 store `<Provider store = { store }><App /></store>`

-   connect: 用于连接容器组件和展示组件

    -   Provider

        根据单一 store 原则 ，一般只会出现在整个应用程序的最顶层。

    -   connect

        语法格式为

        `connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(component)`

        一般来说只会用到前面两个，它的作用是：

        -   把`store.getState()`的状态转化为展示组件的`props`
        -   把`actionCreators`转化为展示组件`props`上的方法

只要上层中有`Provider`组件并且提供了`store`, 那么，子孙级别的任何组件，要想使用`store`里的状态，都可以通过`connect`方法进行连接。如果只是想连接`actionCreators`，可以第一个参数传递为`null`

```sh
$ cnpm i redux react-redux -S
```

### 18.4.1 创建状态管理器

`src/store/index.js`

```js
import { createStore } from 'redux';
// 唯一的数据源
// 状态是只读的
// 数据的改变必须通过纯函数完成
const reducer = (
	state = {
		// 初始化数据,只在开始时有效，以后的state都表示上次的状态
		count: 10,
		proList: [],
	},
	action
) => {
	// action 表示修改状态的标识以及参数
	// 状态是只读的，每次修改状态只能返回一个新的值 { type, payload }
	switch (action.type) {
		case 'ADD_COUNT': // 通过对象合并 实现 返回一个新的值
			return Object.assign({}, state, { count: state.count + 1 });
		case 'REDUCE_COUNT':
			return Object.assign({}, state, { count: state.count - 1 });
		case 'CHANGE_PRO_LIST': // 通过对象合并 实现 返回一个新的值
			return { ...state, proList: action.payload };
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
```

> 1.引入 createStore 方法（新版本中建议使用 rtk）
>
> 2.创建 reducer（包含初始化状态，包含了修改状态的标识，返回了新的状态（对象合并））
>
> 3.创建 store
>
> 4.暴露 store

### 18.4.2 两种使用方式

#### 18.4.2.1 纯 redux

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

store.subscribe(() => root.render(<App />));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

> 1.引入 store
>
> 3.store 发生变化时，重新渲染组件

`src/App.jsx`

```jsx
import React from 'react';
// import { conenct } from 'react-redux'
import store from './store';
console.log(store);
console.log(store.getState());
const App = () => {
	return (
		<div>
			<button
				onClick={() => {
					console.log(1);
					store.dispatch({ type: 'ADD_COUNT' });
				}}
			>
				加
			</button>
			{store.getState().count}
			<button
				onClick={() => {
					console.log(2);
					store.dispatch({ type: 'REDUCE_COUNT' });
				}}
			>
				减
			</button>
		</div>
	);
};

export default App;
```

> 1.引入 store
>
> 2.通过 store.getState() 获取状态
>
> 3.通过 store.dispatch({ type: ''}) 触发数据的改变

> **注意**:项目中基本不只使用 redux，如果只使用 redux，组件的复用性极低，推荐配合 react-redux 使用

#### 18.4.2.2 使用 react-redux

`src/store/index.js`

```jsx
import { createStore } from 'redux';

const reducer = (
	state = {
		count: 10,
		proList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'ADD_COUNT':
			return { ...state, count: state.count + 1 };
		case 'REDUCE_COUNT':
			return { ...state, count: state.count - 1 };
		case 'CHANGE_PRO_LIST':
			return { ...state, proList: payload };
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

> 使用了 react-redux 提供的组件组件 Provider 配合 store 完成传递数据

`src/App.jsx`

```jsx
import React from 'react';
import { connect } from 'react-redux';
const App = (props) => {
	console.log(props);
	return (
		<div>
			<button
				onClick={() => {
					props.add();
				}}
			>
				加
			</button>
			{props.count}
			<button
				onClick={() => {
					props.reduce();
				}}
			>
				减
			</button>
		</div>
	);
};

// mapStateToProps 和 mapDispatchToProps 的返回值在组件中 通过 props 访问即可
const mapStateToProps = (state) => {
	// mapStateToProps 函数，默认参数为state，必须含有返回值，返回的值就是App组件需要使用的状态
	return {
		count: state.count,
	};
};
const mapDispatchToProps = (dispatch) => {
	// mapDispatchToProps 函数，默认参数为dispatch，必须含有返回值，返回的值就是App组件需要使用的业务逻辑
	return {
		add() {
			dispatch({ type: 'ADD_COUNT' });
		},
		reduce() {
			dispatch({ type: 'REDUCE_COUNT' });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App); // connect() 的返回值称之为高阶组件，但是一般人们会称 connect 为高阶组件
// fn(1)(2)(3) =====> 6   函数柯里化
// function fn (a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c
//     }
//   }
// }
```

> vuex 中 可以把异步操作提取到 vuex 中的 actions 中，react 中异步操作方式会有很多，最常见的就是 redux-thunk

## 18.5 redux+react-redux 分模块使用

> 如果项目很大，或者项目划分比较明确，需要将状态管理器也分模块去处理
>
> 假设现在有一个 home 模块，管理 bannerList 以及 proList
>
> 还有一个模块 kind 模块，管理 categoryList

`src/store/modules/home.js`

```js
const reducer = (
	state = {
		bannerList: [],
		proList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_BANNER_LIST':
			return { ...state, bannerList: payload };
		case 'CHANGE_PRO_LIST':
			return { ...state, proList: payload };
		default:
			return state;
	}
};
export default reducer;
```

`src/store/modules/kind.js`

```js
const reducer = (
	state = {
		categoryList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_CATEGORY_LIST':
			return { ...state, categoryList: payload };
		default:
			return state;
	}
};
export default reducer;
```

> 整合多个 reducer 为一个，因为 有一个原则 ： 单一数据源 的原则

`src/store/index.js`

```js
import { createStore, combineReducers } from 'redux';

// 导入模块
import home from './modules/home';
import kind from './modules/kind';

const reducer = combineReducers({
	home,
	kind,
});

const store = createStore(reducer);

export default store;
```

> 入口文件处引入状态管理器

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

> 组件中使用状态管理器

`src/App.jsx`

```jsx
import React from 'react';
import Home from './views/Home';
import Kind from './views/Kind';
const App = () => {
	return (
		<div>
			<Home />
			<hr />
			<Kind />
		</div>
	);
};

export default App;
```

`src/views/Home.jsx`

```jsx
import React from 'react';

const Home = () => {
	return (
		<div>
			<h1>首页</h1>
		</div>
	);
};

export default Home;
```

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
const Home = connect(
	(state) => {
		return {
			bannerList: state.home.bannerList,
			proList: state.home.proList,
		};
	},
	(dispatch) => {
		return {
			getBannerList() {
				fetch('http://121.89.205.189:3001/api/banner/list')
					.then((res) => res.json())
					.then((res) => {
						console.log(res.data); // 只要count的值发生改变，useEffect就会重新执行
						dispatch({
							type: 'CHANGE_BANNER_LIST',
							payload: res.data,
						});
					});
			},
			getProList() {
				fetch('http://121.89.205.189:3001/api/pro/list')
					.then((res) => res.json())
					.then((res) => {
						console.log(res.data); // 只要count的值发生改变，useEffect就会重新执行
						dispatch({
							type: 'CHANGE_PRO_LIST',
							payload: res.data,
						});
					});
			},
		};
	}
)(({ bannerList, proList, getBannerList, getProList }) => {
	useEffect(() => {
		getBannerList();
		getProList();
	}, [getBannerList, getProList]);
	return (
		<div>
			<h1>首页</h1>
			<ul>
				{bannerList &&
					bannerList.map((item) => (
						<img src={item.img} key={item.bannerid} alt="" style={{ height: 60 }}></img>
					))}
			</ul>

			<ul>{proList && proList.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
});

export default Home;
```

`src/views/Kind.jsx`

```jsx
import React from 'react';

const Kind = () => {
	return (
		<div>
			<h1>分类</h1>
		</div>
	);
};

export default Kind;
```

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
const Kind = ({ categoryList, getCategoryList }) => {
	useEffect(() => {
		getCategoryList();
	}, [getCategoryList]);
	return (
		<div>
			<h1>分类</h1>
			<ul>
				{categoryList &&
					categoryList.map((item) => {
						return <li key={item}>{item}</li>;
					})}
			</ul>
		</div>
	);
};

// export default connect((state) => {
//   return {
//     categoryList: state.kind.categoryList
//   }
// }, (dispatch) => {
//   return {
//     getCategoryList () {
//       fetch('http://121.89.205.189:3001/api/pro/categorylist').then(res => res.json()).then(res => {
//         console.log(res.data) // 只要count的值发生改变，useEffect就会重新执行
//         dispatch({
//           type: 'CHANGE_CATEGORY_LIST',
//           payload: res.data
//         })
//       })
//     }
//   }
// })(Kind);
export default connect(
	({
		state: {
			kind: { categoryList },
		},
	}) => {
		return {
			categoryList,
		};
	},
	(dispatch) => {
		return {
			getCategoryList() {
				fetch('http://121.89.205.189:3001/api/pro/categorylist')
					.then((res) => res.json())
					.then((res) => {
						console.log(res.data); // 只要count的值发生改变，useEffect就会重新执行
						dispatch({
							type: 'CHANGE_CATEGORY_LIST',
							payload: res.data,
						});
					});
			},
		};
	}
)(Kind);
```

> 细心的你发现，虽然展示组件的代码变少了，但是容器组件中还有 异步相关操作，能否把这些异步操作提取出去

## 18.6 redux + react-redux + 分模块+ 异步操作

> 配合 redux 常用的异步模块 为 `redux-thunk`, `redux-saga`

### 18.6.1 redux-thunk

`src/store/modules/home.js`

```js
const reducer = (
	state = {
		bannerList: [],
		proList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_BANNER_LIST':
			return { ...state, bannerList: payload };
		case 'CHANGE_PRO_LIST':
			return { ...state, proList: payload };
		default:
			return state;
	}
};
export default reducer;
```

`src/store/modules/kind.js`

```js
const reducer = (
	state = {
		categoryList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_CATEGORY_LIST':
			return { ...state, categoryList: payload };
		default:
			return state;
	}
};
export default reducer;
```

> 整合多个 reducer 为一个，因为 有一个原则 ： 单一数据源 的原则
>
> 并且后续需要使用 异步操作，将异步操作模块 使用进来

```sh
$ cnpm i redux-thunk -S
```

`src/store/index.js`

```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

// 导入模块
import home from './modules/home';
import kind from './modules/kind';

const reducer = combineReducers({
	home,
	kind,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```

`src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/App.jsx`

```jsx
import React from 'react';
import Home from './views/Home';
import Kind from './views/Kind';
const App = () => {
	return (
		<div>
			<Home />
			<hr />
			<Kind />
		</div>
	);
};

export default App;
```

> 上一个案例 异步操作在组件，现在需要将其放到 异步操作模块中去 actionCreator

`src/store/actions/home.js`

```js
const action = {
	getBannerListAction(dispatch) {
		// 轮播图接口没有参数， 该函数的默认参数为 dispatch
		fetch('http://121.89.205.189:3001/api/banner/list')
			.then((res) => res.json())
			.then((res) => {
				dispatch({
					type: 'CHANGE_BANNER_LIST',
					payload: res.data,
				});
			});
	},
	getProListAction(params) {
		// 产品的接口有参数，此时该函数写参数，内部返回一个带有 dispatch 默认参数的函数
		return (dispatch) => {
			fetch(
				'http://121.89.205.189:3001/api/pro/list?count=' +
					params.count +
					'&limitNum=' +
					params.limitNum
			)
				.then((res) => res.json())
				.then((res) => {
					dispatch({
						type: 'CHANGE_PRO_LIST',
						payload: res.data,
					});
				});
		};
	},
};
export default action;
```

`src/store/actions/kind.js`

```jsx
const action = {
	getCategoryListAction(dispatch) {
		fetch('http://121.89.205.189:3001/api/pro/categorylist')
			.then((res) => res.json())
			.then((res) => {
				dispatch({
					type: 'CHANGE_CATEGORY_LIST',
					payload: res.data,
				});
			});
	},
};
export default action;
```

> 记住接口有无参数影响 action 的写法，还影响其调用

`src/views/Home.jsx`

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import action from '../store/actions/home';
const Home = connect(
	(state) => {
		return {
			bannerList: state.home.bannerList,
			proList: state.home.proList,
		};
	},
	(dispatch) => {
		return {
			getBannerList() {
				dispatch(action.getBannerListAction); // 因为没有参数，所以不加()
			},
			getProList() {
				dispatch(action.getProListAction({ count: 2, limitNum: 3 })); // 因为有参数，所以加()
			},
		};
	}
)(({ bannerList, proList, getBannerList, getProList }) => {
	useEffect(() => {
		getBannerList();
		getProList();
	}, [getBannerList, getProList]);
	return (
		<div>
			<h1>首页</h1>
			<ul>
				{bannerList &&
					bannerList.map((item) => (
						<img src={item.img} key={item.bannerid} alt="" style={{ height: 60 }}></img>
					))}
			</ul>

			<ul>{proList && proList.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
});

export default Home;
```

`src/views/Kind.jsx` 异步在组件

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
const Kind = ({ categoryList, getCategoryList }) => {
	useEffect(() => {
		getCategoryList();
	}, [getCategoryList]);
	return (
		<div>
			<h1>分类</h1>
			<ul>
				{categoryList &&
					categoryList.map((item) => {
						return <li key={item}>{item}</li>;
					})}
			</ul>
		</div>
	);
};

export default connect(
	(state) => {
		return {
			categoryList: state.kind.categoryList,
		};
	},
	(dispatch) => {
		return {
			getCategoryList() {
				fetch('http://121.89.205.189:3001/api/pro/categorylist')
					.then((res) => res.json())
					.then((res) => {
						console.log(res.data); // 只要count的值发生改变，useEffect就会重新执行
						dispatch({
							type: 'CHANGE_CATEGORY_LIST',
							payload: res.data,
						});
					});
			},
		};
	}
)(Kind);
```

`src/views/Kind.jsx` 异步在 store

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../store/actions/kind';
const Kind = ({ categoryList, getCategoryList }) => {
	useEffect(() => {
		getCategoryList();
	}, [getCategoryList]);
	return (
		<div>
			<h1>分类</h1>
			<ul>
				{categoryList &&
					categoryList.map((item) => {
						return <li key={item}>{item}</li>;
					})}
			</ul>
		</div>
	);
};

export default connect(
	(state) => {
		return {
			categoryList: state.kind.categoryList,
		};
	},
	(dispatch) => {
		return {
			getCategoryList() {
				dispatch(action.getCategoryListAction);
			},
		};
	}
)(Kind);
```

> 虽然引入了 redux-thunk，但是仍然可以把 异步放在组件中，具体根据项目的需求而定

### 18.6.2 redux-saga

> 先要了解解决异步操作方案：回调函数、promise、async await、generator yield

https://es6.ruanyifeng.com/#docs/generator-async

```sh
$ cnpm i redux-saga axios -S
```

`src/store/modules/home.js`

```jsx
const reducer = (
	state = {
		bannerList: [],
		proList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_BANNER_LIST':
			return { ...state, bannerList: payload };
		case 'CHANGE_PRO_LIST':
			return { ...state, proList: payload };
		default:
			return state;
	}
};

export default reducer;
```

`src/store/modules/kind.js`

```js
const reducer = (
	state = {
		categoryList: [],
	},
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_CATEGORY_LIST':
			return { ...state, categoryList: payload };
		default:
			return state;
	}
};
export default reducer;
```

`src/store/mySaga.js`

```js
// put 理解为 dispatch  call用来请求数据   takeLatest 用来分配任务
import { put, call, takeLatest } from 'redux-saga/effects';

import { getBannerList, getProList } from '../api/home';
import { getCategoryList } from '../api/kind';

// 异步函数需要写为 generator 函数,内部代码执行需要使用 yield
function* getBannerListAction() {
	const res = yield call(getBannerList);
	yield put({
		type: 'CHANGE_BANNER_LIST',
		payload: res.data.data,
	});
}

function* getProListAction(action) {
	console.log('action', action); // 这里可以传递参数 { payload: {limitNum: 4}, type: "REQUEST_PRO_LIST"}
	const res = yield call(getProList, action.payload);
	yield put({
		type: 'CHANGE_PRO_LIST',
		payload: res.data.data,
	});
}

function* getCategoryListAction() {
	const res = yield call(getCategoryList);
	yield put({
		type: 'CHANGE_CATEGORY_LIST',
		payload: res.data.data,
	});
}

// 依据组件发起的请求，自动分配需要执行的业务
function* mySaga() {
	yield takeLatest('REQUEST_BANNER_LIST', getBannerListAction);
	yield takeLatest('REQUEST_PRO_LIST', getProListAction);
	yield takeLatest('REQUEST_CATEGORY_LIST', getCategoryListAction);
}

export default mySaga;
```

`src/store/index.js`

```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import mySaga from './mySaga';

import home from './modules/home';
import kind from './modules/kind';

const reducer = combineReducers({ home, kind });

const middleware = createSagaMiddleWare();

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(mySaga); // 一定要放在 应用中间件之后

export default store;
```

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`src/views/Home.jsx`

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
const Home = ({ bannerList, proList, getBannerList, getProList }) => {
	useEffect(() => {
		getBannerList();
		getProList({ limitNum: 4 });
	}, [getBannerList, getProList]);
	return (
		<div>
			<h1>home</h1>
			<ul>
				{bannerList &&
					bannerList.map((item) => (
						<img src={item.img} key={item.bannerid} alt="" style={{ height: 60 }}></img>
					))}
			</ul>

			<ul>{proList && proList.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
};

export default connect(
	(state) => ({
		bannerList: state.home.bannerList,
		proList: state.home.proList,
	}),
	(dispatch) => ({
		getBannerList() {
			dispatch({ type: 'REQUEST_BANNER_LIST' }); // 写的对象形式
		},
		getProList(params) {
			dispatch({ type: 'REQUEST_PRO_LIST', payload: params }); // 传递参数
		},
	})
)(Home);
```

`src/views/Kind.jsx`

```jsx
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
const Kind = ({ categoryList, getCategoryList }) => {
	useEffect(() => {
		getCategoryList();
	}, [getCategoryList]);
	return (
		<div>
			<h1>Kind</h1>
			<ul>
				{categoryList &&
					categoryList.map((item) => {
						return <li key={item}>{item}</li>;
					})}
			</ul>
		</div>
	);
};

export default connect(
	({ kind: { categoryList } }) => ({
		categoryList,
	}),
	(dispatch) => {
		return {
			getCategoryList() {
				dispatch({ type: 'REQUEST_CATEGORY_LIST' });
			},
		};
	}
)(Kind);
```

# 十九、redux toolkit

https://cn.redux.js.org/

## 19.1 什么是 Redux Toolkit

https://cn.redux.js.org/redux-toolkit/overview/

**[Redux Toolkit](https://redux-toolkit.js.org/)** 是我们官方的，有观点的，开箱即用的高效 Redux 开发工具集。它旨在成为标准的 Redux 逻辑开发方式，我们强烈建议您使用它。

它包括几个实用程序功能，这些功能可以简化最常见场景下的 Redux 开发，包括配置 store、定义 reducer，不可变的更新逻辑、甚至可以立即创建整个状态的 “切片 slice”，而无需手动编写任何 action creator 或者 action type。它还包括使用最广泛的 Redux 插件，例如 Redux Thunk 用于异步逻辑，而 Reselect 用于编写选择器 selector 函数，因此你可以立即使用它们。

## 19.2 如何使用 redux-toolkit

https://cn.redux.js.org/tutorials/quick-start

```sh
$ cnpm i @reduxjs/toolkit redux react-redux redux-devtools -S
$ cnpm i axios -S
```

### 19.2.1 创建状态管理器

`src/store/index.js`

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		// 此处可以设置多模块
	},
});

export default store;
```

### 19.2.2 入口文件配置状态管理器

`src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

### 19.2.3 创建分模块切片

创建 slice 需要一个字符串名称来标识切片、一个初始 state 以及一个或多个定义了该如何更新 state 的 reducer 函数。slice 创建后 ，我们可以导出 slice 中生成的 Redux action creators 和 reducer 函数。

`src/store/modules/home.js`

```js
import { createSlice } from '@reduxjs/toolkit';

// 创建 slice 需要一个字符串名称来标识切片、一个初始 state 以及一个或多个定义了该如何更新 state 的 reducer 函数。
// slice 创建后 ，我们可以导出 slice 中生成的 Redux action creators 和 reducer 函数。
export const homeSlice = createSlice({
	name: 'home', // 一个字符串名称来标识切片
	initialState: {
		// 一个初始 state
		bannerList: [],
		proList: [],
	},
	reducers: {
		// 一个或多个定义了该如何更新 state 的 reducer 函数。
		changeBannerList(state, action) {
			state.bannerList = action.payload;
		},
		changeProList(state, action) {
			state.proList = action.payload;
		},
	},
});

console.log(homeSlice); // actions caseReducers getInitialState name reducer
// 导出 slice 中生成的 Redux action creators
export const { changeBannerList, changeProList } = homeSlice.actions;
// 导出 slice 中生成的 reducer 函数 --- 纯函数，包含组件的状态以及 action
export default homeSlice.reducer; // 类似于之前的纯函数
```

`src/store/modules/kind.js`

```js
import { createSlice } from '@reduxjs/toolkit';

export const kindSlice = createSlice({
	name: 'kind',

	initialState: {
		categoryList: [],
	},

	reducers: {
		changeCategoryList(state, action) {
			state.categoryList = action.payload;
		},
	},
});

export const { changeCategoryList } = kindSlice.actions;

export default kindSlice.reducer;
```

### 19.2.4 **整合切片**

`src/store/index.js`

```js
import { configureStore } from '@reduxjs/toolkit';

import home from './modules/home';
import kind from './modules/kind';
// 引入 reducer 函数，并将它添加到我们的 store 中。
// 通过在 reducer 参数中定义一个字段，我们告诉 store 使用这个 slice reducer 函数来处理对该状态的所有更新。
const store = configureStore({
	reducer: {
		// 此处可以设置多模块
		home,
		kind,
	},
});

export default store;
```

### 19.2.5 组件中使用状态管理器

`src/views/Home.jsx`

```jsx
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBannerList, changeProList } from '../store/modules/home';
import { getBannerList, getProList } from '../api/home';
const Home = () => {
	// 获取状态管理器的数据
	const bannerList = useSelector((state) => state.home.bannerList);
	const proList = useSelector((state) => state.home.proList);

	const dispatch = useDispatch();

	useEffect(() => {
		getBannerList().then((res) => {
			dispatch(changeBannerList(res.data.data));
		});
		getProList().then((res) => {
			dispatch(changeProList(res.data.data));
		});
	}, [dispatch]);
	return (
		<div>
			<h1>Home</h1>
			<ul>
				{bannerList &&
					bannerList.map((item) => (
						<img src={item.img} key={item.bannerid} alt="" style={{ height: 60 }}></img>
					))}
			</ul>

			<ul>{proList && proList.map((item) => <li key={item.proid}>{item.proname}</li>)}</ul>
		</div>
	);
};

export default Home;
```

> -   使用`configureStore`创建 Redux store
>
>     -   `configureStore` 接受 `reducer` 函数作为命名参数
>     -   `configureStore` 使用的好用的默认设置自动设置 store
>
> -   为 React 应用程序组件提供 Redux store
>
>     -   使用 React-Redux `<Provider>` 组件包裹你的 `<App />`
>     -   传递 Redux store 如 `<Provider store={store}>`
>
> -   使用 `createSlice` 创建 Redux "slice" reducer
>
>     -   使用字符串名称、初始状态和命名的 reducer 函数调用“createSlice”
>
>     -   Reducer 函数可以使用 Immer 来“改变”状态
>     -   导出生成的 slice reducer 和 action creators
>
> -   在 React 组件中使用 React-Redux `useSelector/useDispatch` 钩子
>
>     -   使用 `useSelector` 钩子从 store 中读取数据
>
>     -   使用 `useDispatch` 钩子获取 `dispatch` 函数，并根据需要 dispatch actions

> 此时发现，组件中的异步操作在 组件内部调用，接下来需要研究如何将异步操作从组件提取出来

## 19.3 提取异步操作

### 19.3.1 自己定义请求函数

`src/store/modules/home.js`

```js
import { createSlice } from '@reduxjs/toolkit';
import { getBannerList, getProList } from '../../api/home'; // ++++++++++++++
export const homeSlice = createSlice({
	name: 'home',
	initialState: {
		bannerList: [],
		proList: [],
	},
	reducers: {
		changeBannerList(state, action) {
			state.bannerList = action.payload;
		},
		changeProList(state, action) {
			state.proList = action.payload;
		},
	},
});

// 异步操作在状态管理器  ---- 类似于 之前使用的redux-thunk ++++++++++++++
export function getBannerListAction(dispatch) {
	getBannerList().then((res) => dispatch(changeBannerList(res.data.data)));
}
export function getProListAction(params) {
	return (dispatch) => {
		getProList(params).then((res) => dispatch(changeProList(res.data.data)));
	};
}

export const { changeBannerList, changeProList } = homeSlice.actions;

export default homeSlice.reducer;
```

### 19.3.2 使用 `createAsyncThunk` 请求数据

Redux Toolkit 的 `createAsyncThunk` API 生成 thunk，为您自动 dispatch 那些 "start/success/failure" action。

`src/store/modules/kind.js`

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoryList } from '../../api/kind';
export const kindSlice = createSlice({
	name: 'kind',
	initialState: {
		categoryList: [],
	},
	reducers: {
		changeCategoryList(state, action) {
			state.categoryList = action.payload;
		},
	},
	extraReducers: (builder) => {
		// createAsyncThunk 在这里修改状态 下面可以看作固定的写法
		builder
			.addCase(getCategoryListAction.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getCategoryListAction.fulfilled, (state, action) => {
				state.status = 'idle';
				state.categoryList = action.payload;
			})
			.addCase(getCategoryListAction.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

// createAsyncThunk 第一个参数没有实际意义，但是要有语义化含义
export const getCategoryListAction = createAsyncThunk('kind/getList', async (num) => {
	console.log('num', num);
	const res = await getCategoryList();
	return res.data.data;
});

export const { changeCategoryList } = kindSlice.actions;

export default kindSlice.reducer;
```

`src/views/Kind.jsx`

```jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryListAction } from './../store/modules/kind';
const Kind = () => {
	const categoryList = useSelector((state) => state.kind.categoryList);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategoryListAction(10000));
	}, [dispatch]);
	return (
		<div>
			<h1>Kind</h1>
			<ul>
				{categoryList &&
					categoryList.map((item) => {
						return <li key={item}>{item}</li>;
					})}
			</ul>
		</div>
	);
};

export default Kind;
```

# 二十、React Router

使用官方的教学项目

```undefined
npx create-react-app router-tutorial
```

安装 react-router 依赖

```bash
cd router-tutorial
npm add react-router-dom@6 history@5
```

react-router-dom 是浏览器端的基于 react-router 库的库，所以装了这个以后就不用再手动装 react-router 了

修改 App.js 和 index.js 到简单的样子

```js
//src/App.js
export default function App() {
	return (
		<div>
			<h1>Bookkeeper!</h1>
		</div>
	);
}
```

```js
// src/index.js
import { render } from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
```

然后启动项目,然后我们可以在基础上修改了。

```kotlin
# probably this
npm start

# or this
npm run dev

#or
yarn start
```

## 20.1 BrowserRouter

连接你的 app 到浏览器的 URL。

用 BrowserRouter 包裹在你的 App 的外面

```js
//src/index.js
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	rootElement
);
```

## 20.2 添加一些链接 Link

在`src/App.js`里添加一些链接和全局导航。

```js
import { Link } from 'react-router-dom';

export default function App() {
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav
				style={{
					borderBottom: 'solid 1px',
					paddingBottom: '1rem',
				}}
			>
				<Link to="/invoices">Invoices</Link> | <Link to="/expenses">Expenses</Link>
			</nav>
		</div>
	);
}
```

现在点击那些链接，你会发现地址栏会发生改变，也可以用前进后退在历史记录中移动

## 20.3 添加一些路由

-   `src/routes/invoices.jsx`
-   `src/routes/expenses.jsx`

```jsx
//src/routes/expenses.jsx
export default function Expenses() {
	return (
		<main style={{ padding: '1rem 0' }}>
			<h2>Expenses</h2>
		</main>
	);
}
```

```jsx
//src/routes/invoices.jsx
export default function Invoices() {
	return (
		<main style={{ padding: '1rem 0' }}>
			<h2>Invoices</h2>
		</main>
	);
}
```

接下来我们需要在 index.js 里面创建路由配置告诉 app 如何渲染不同的 url

```jsx
//src/index.js
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';

const rootElement = document.getElementById('root');
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="expenses" element={<Expenses />} />
			<Route path="invoices" element={<Invoices />} />
		</Routes>
	</BrowserRouter>,
	rootElement
);
```

## 20.4 嵌套路由

我们注意到点击链接的时候，App 中的布局消失了。只剩下 Expenses 或 Invoices 这两个路由指向的内容

嵌套路由的作用就是共享部分 UI

我们需要两步操作实现这一点

首先 index.js 里面对路由进行嵌套。这样两个组件就变成了 App 组件的子节点

```jsx
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';

const rootElement = document.getElementById('root');
render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="expenses" element={<Expenses />} />
				<Route path="invoices" element={<Invoices />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	rootElement
);
```

当路由拥有子节点的时候会发生两件事

1. 路由的 url 嵌套 (`"/" + "expenses"` and `"/" + "invoices"`)
2. 子路由组件匹配的时候也会渲染父组件共享的部分

接下来我们在 App.jsx 添加一个 Outlet 作为渲染子节点路由的地方

```jsx
//src/App.jsx
import { Outlet, Link } from 'react-router-dom';

export default function App() {
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav
				style={{
					borderBottom: 'solid 1px',
					paddingBottom: '1rem',
				}}
			>
				<Link to="/invoices">Invoices</Link> | <Link to="/expenses">Expenses</Link>
			</nav>
			<Outlet />
		</div>
	);
}
```

这下我们就可以在两个路由间切换保持共享的布局了。

## 20.5 给 Invoices 路由添加数据

我们模拟真实使用场景，给 Invoices 路由造点假数据

```jsx
// src/data.js
let invoices = [
	{
		name: 'Santa Monica',
		number: 1995,
		amount: '$10,800',
		due: '12/05/1995',
	},
	{
		name: 'Stankonia',
		number: 2000,
		amount: '$8,000',
		due: '10/31/2000',
	},
	{
		name: 'Ocean Avenue',
		number: 2003,
		amount: '$9,500',
		due: '07/22/2003',
	},
	{
		name: 'Tubthumper',
		number: 1997,
		amount: '$14,000',
		due: '09/01/1997',
	},
	{
		name: 'Wide Open Spaces',
		number: 1998,
		amount: '$4,600',
		due: '01/27/2998',
	},
];

export function getInvoices() {
	return invoices;
}
```

然后我们修改 invoices.jsx 组件，获取并且渲染数据

```jsx
//src/routes/invoices.jsx
import { Link } from 'react-router-dom';
import { getInvoices } from '../data';

export default function Invoices() {
	let invoices = getInvoices();
	return (
		<div style={{ display: 'flex' }}>
			<nav
				style={{
					borderRight: 'solid 1px',
					padding: '1rem',
				}}
			>
				{invoices.map((invoice) => (
					<Link
						style={{ display: 'block', margin: '1rem 0' }}
						to={`/invoices/${invoice.number}`}
						key={invoice.number}
					>
						{invoice.name}
					</Link>
				))}
			</nav>
		</div>
	);
}
```

## 20.6 添加一个不匹配路由

我们可以发现，当我们输入一个没有分配地址的路由的时候，会显示空白页。

实际上有一个好办法就是把这些不匹配的路由都导入一个 404 页面。

我们添加一个"\*"路由，这个路由会匹配所有没有匹配其他路由的路由

```jsx
// src/index.js
<Routes>
	<Route path="/" element={<App />}>
		<Route path="expenses" element={<Expenses />} />
		<Route path="invoices" element={<Invoices />} />
		<Route
			path="*"
			element={
				<main style={{ padding: '1rem' }}>
					<p>There's nothing here!</p>
				</main>
			}
		/>
	</Route>
</Routes>
```

## 20.7 读取 url 参数

下面我们添加一些新组件，用于显示固定年份的 invoice

```jsx
// src/routes/invoice.jsx
export default function Invoice() {
	return <h2>Invoice #???</h2>;
}
```

然后我们在 invoices 路由下面添加这个子路由

```jsx
// src/index.js
<Routes>
	<Route path="/" element={<App />}>
		<Route path="expenses" element={<Expenses />} />
		<Route path="invoices" element={<Invoices />}>
			<Route path=":invoiceId" element={<Invoice />} />
		</Route>
		<Route
			path="*"
			element={
				<main style={{ padding: '1rem' }}>
					<p>There's nothing here!</p>
				</main>
			}
		/>
	</Route>
</Routes>
```

我们刚刚创建的路由是匹配 "/invoices/2005" and "/invoices/1998"这种格式的。

然后我们还需要在 invoices.jsx 添加一个 outlet，不然显示不出来子路由的内容

然后我们在 invoice.jsx 文件中获取 url 参数

```jsx
// src/routes/invoice.jsx
import { useParams } from 'react-router-dom';

export default function Invoice() {
	let params = useParams();
	return <h2>Invoice: {params.invoiceId}</h2>;
}
```

接着我们在 data.js 里面添加一个根据年份返回对应年份数据的函数

```js
//...
export function getInvoices() {
	return invoices;
}

export function getInvoice(number) {
	return invoices.find((invoice) => invoice.number === number);
}
```

然后我们就能用这个函数获取数据并且渲染出来了。

```jsx
import { useParams } from 'react-router-dom';
import { getInvoice } from '../data';

export default function Invoice() {
	let params = useParams();
	let invoice = getInvoice(parseInt(params.invoiceId, 10));
	return (
		<main style={{ padding: '1rem' }}>
			<h2>Total Due: {invoice.amount}</h2>
			<p>
				{invoice.name}: {invoice.number}
			</p>
			<p>Due Date: {invoice.due}</p>
		</main>
	);
}
```

## 20.8 index 路由

这可能是 react router 里面最难理解的概念。

当我们浏览 invoices 路由的子路由内容，之后我们点击 invoices 路由的链接，我们发现右侧变成了空白。

我们可以添加一个 index 路由解决这个问题

```jsx
// src/index.js

<Routes>
	<Route path="/" element={<App />}>
		<Route path="expenses" element={<Expenses />} />
		<Route path="invoices" element={<Invoices />}>
			<Route
				index
				element={
					<main style={{ padding: '1rem' }}>
						<p>Select an invoice</p>
					</main>
				}
			/>
			<Route path=":invoiceId" element={<Invoice />} />
		</Route>
		<Route
			path="*"
			element={
				<main style={{ padding: '1rem' }}>
					<p>There's nothing here!</p>
				</main>
			}
		/>
	</Route>
</Routes>
```

接下来我们发现点击 invoices 路由的时候会默认显示 index 路由的内容而不是空白。

index 路由和其他路由不同的地方是它没有 path 属性，他和父路由共享同一个路径。

下面几点可以帮助你理解这个概念

-   index 路由渲染在父路由的 outlet，而且路由地址和父路由相同
-   index 路由在父路由匹配并且其他子路由不匹配的时候 匹配
-   index 路由是一个父节点默认的子节点
-   index 路由在用户还没有点击导航中的链接时渲染

## 20.9 高亮激活的链接

通常我们需要，特别是在导航列表里面，需要展示给用户当前激活的链接是哪个。

西面我们把 invoices.jsx 中的 Link 换成 NavLink

```jsx
import { NavLink, Outlet } from 'react-router-dom';
import { getInvoices } from '../data';

export default function Invoices() {
	let invoices = getInvoices();
	return (
		<div style={{ display: 'flex' }}>
			<nav
				style={{
					borderRight: 'solid 1px',
					padding: '1rem',
				}}
			>
				{invoices.map((invoice) => (
					<NavLink
						style={({ isActive }) => {
							return {
								display: 'block',
								margin: '1rem 0',
								color: isActive ? 'red' : '',
							};
						}}
						to={`/invoices/${invoice.number}`}
						key={invoice.number}
					>
						{invoice.name}
					</NavLink>
				))}
			</nav>
			<Outlet />
		</div>
	);
}
```

我们做了以下 3 件事

1. 替换 Link 为 NavLink
2. 我们用函数改变样式
3. 我们该百年了链接颜色通过 NavLink 传递过来的 isActive 属性

我们也可以利用 className 做到一样的效果。

```jsx
// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

## 20.10 搜索参数

搜索参数就类似于 url 参数，但是他们在 url 中所处的位置不同。

不是由`/`分隔，他们出现在一个`?`之后，类似于这样的形式 "/login?success=1"`or`"/shoes?brand=nike&sort=asc&sortby=price

react router 提供了 useSearchParams 用于读取和操作搜索参数。它有点像 useState，不同点是 useState 是操作内存中的数据，

而他是设置 url 搜索参数中的 state

```jsx
// routes/invoices.jsx
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data';

export default function Invoices() {
	let invoices = getInvoices();
	let [searchParams, setSearchParams] = useSearchParams();

	return (
		<div style={{ display: 'flex' }}>
			<nav
				style={{
					borderRight: 'solid 1px',
					padding: '1rem',
				}}
			>
				<input
					value={searchParams.get('filter') || ''}
					onChange={(event) => {
						let filter = event.target.value;
						if (filter) {
							setSearchParams({ filter });
						} else {
							setSearchParams({});
						}
					}}
				/>
				{invoices
					.filter((invoice) => {
						let filter = searchParams.get('filter');
						if (!filter) return true;
						let name = invoice.name.toLowerCase();
						return name.startsWith(filter.toLowerCase());
					})
					.map((invoice) => (
						<NavLink
							style={({ isActive }) => ({
								display: 'block',
								margin: '1rem 0',
								color: isActive ? 'red' : '',
							})}
							to={`/invoices/${invoice.number}`}
							key={invoice.number}
						>
							{invoice.name}
						</NavLink>
					))}
			</nav>
			<Outlet />
		</div>
	);
}
```

## 20.11 自定义行为

接着上一节的程序，

我们发现如果我们点击了过滤出来的链接，就不会保持过滤了，input 会被清空。

我们能够在点击新链接的时候保持查询字符串，只要我们组合 Navlink 和 useLocation,组成一个我们自己的 QueryNavLink

```jsx
import { useLocation, NavLink } from 'react-router-dom';

function QueryNavLink({ to, ...props }) {
	let location = useLocation();
	return <NavLink to={to + location.search} {...props} />;
}
```

类似于 `useSearchParams`, `useLocation` 也会返回一个 location 告诉我们一些信息。就类似于下面的格式

```js
{
  pathame: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}
```

## 20.12 编程式导航

有时我们需要更改 URL，

我们添加一个按钮，将 invoice 删除，然后导航到索引路由。

首先我们在 data.js 里添加下面用于删除一个 invoice 的函数

```js
export function deleteInvoice(number) {
	invoices = invoices.filter((invoice) => invoice.number !== number);
}
```

然后我们添加删除按钮

```jsx
// src/routes/invoice.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { getInvoice, deleteInvoice } from '../data';

export default function Invoice() {
	let navigate = useNavigate();
	let params = useParams();
	let invoice = getInvoice(parseInt(params.invoiceId, 10));

	return (
		<main style={{ padding: '1rem' }}>
			<h2>Total Due: {invoice.amount}</h2>
			<p>
				{invoice.name}: {invoice.number}
			</p>
			<p>Due Date: {invoice.due}</p>
			<p>
				<button
					onClick={() => {
						deleteInvoice(invoice.number);
						navigate('/invoices');
					}}
				>
					Delete
				</button>
			</p>
		</main>
	);
}
```
