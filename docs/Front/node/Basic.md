---
title: Basic
---

# 一、Node.js 是什么

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

Node.js® is an open-source, cross-platform JavaScript runtime environment.

### 1、特性

Node.js 可以解析 JS 代码（没有浏览器安全级别的限制）提供很多系统级别的 API，如：

-   文件的读写 (File System)
-   进程的管理 (Process)
-   网络通信 (HTTP/HTTPS)
-   ……

### 2、举例

#### 2.1 浏览器安全级别的限制

**Ajax 测试**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>browser-safe-sandbox</title>
	</head>
	<body>
		<div>browser-safe-sandbox</div>
		<script>
			const xhr = new XMLHttpRequest();
			xhr.open(
				'get',
				'https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10',
				false
			);
			xhr.send();
		</script>
	</body>
</html>
```

**浏览器预览**

```
browser-sync start --server --files **/* --directory
```

#### 2.2 文件的读写 (File System)

```js
const fs = require('fs');

fs.readFile('./ajax.png', 'utf-8', (err, content) => {
	console.log(content);
});
```

#### 2.3 进程的管理（Process）

```js
console.log(process);
```

**运行**

```
node 2.3-process.js
```

#### 2.4 网络通信（HTTP/HTTPS）

```js
const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, {
		'content-type': 'text/plain',
	});
	res.write('hello nodejs');
	res.end();
}).listen(3000);
```

# 二、Node 相关工具

### 1、NVM: Node Version Manager

**1.1 Mac 安装 nvm**

```
https://github.com/nvm-sh/nvm/blob/master/README.md
```

**1.2 Windows 安装 nvm**

```
nvm-windows
nodist
```

### 2、NPM: Node Package Manager

#### 2.1 全局安装 package

```
$ npm install forever --global (-g)
$ forever
$ npm uninstall forever --global
$ forever
```

**全局安装包的目录**

-   Mac

    ```
    /Users/felix/.nvm/versions/node/nvm各个版本/bin/
    ```

-   Windows

    ```
    C:\Users\你的用户名\AppData\Roaming\npm\node_modules
    ```

#### 2.2 本地安装 package

```
$ cd ~/desktop
$ mkdir gp-project
$ cd gp-project
$ npm install underscore
$ npm list (ls)
```

#### 2.3 package.json 初始化

```
$ pwd
$ npm init -y
$ ls
$ cat package.json
```

#### 2.4 使用 package.json

```
$ npm install underscore --save
$ cat package.json
$ npm install lodash --save-dev
$ cat package.json
$ rm -rf node_modules
$ ls
$ npm install
$ npm uninstall underscore --save
$ npm list | grep underscore
$ cat package.json
```

#### 2.5 安装指定版本的包

```
$ pwd
$ npm list
$ npm info underscore
$ npm view underscore versions
$ npm install underscore@1.8.0
$ npm list
$ npm uninstall underscore
$ npm list
```

#### 2.6 更新本地安装的包

```
$ npm info underscore
$ npm view underscore versions
$ npm install underscore@1.4.4 --save-dev
$ npm list | grep gulp
$ npm outdated //~2.0.0表示patch, ^2.0.0表示minor * 表示xx最新版本
$ npm list | grep gulp
$ npm update
```

#### 2.7 清除缓存

```
npm cache clean --force
```

#### 2.8 上传自己的包

###### 2.8.1 编写模块

保存为 index.js

```js
exports.sayHello = function () {
	return 'Hello World';
};
```

###### 2.8.2 初始化包描述文件

$ npm init package.json

```json
{
	"name": "gp19-npm",
	"version": "1.0.1",
	"description": "gp19 self module",
	"main": "index.js",
	"scripts": {
		"test": "make test"
	},
	"repository": {
		"type": "Git",
		"url": "git+https://github.com/lurongtao/gp19-npm.git"
	},
	"keywords": ["demo"],
	"author": "Felixlu",
	"license": "ISC",
	"bugs": {
		"url": "https://github.com/lurongtao/gp19-npm/issues"
	},
	"homepage": "https://github.com/lurongtao/gp19-npm#readme"
}
```

###### 2.8.3 注册 npm 仓库账号

```
https://www.npmjs.com 上面的账号
felix_lurt/qqmko09ijn
$ npm adduser
```

###### 2.8.4 上传包

```
$ npm publish
```

坑：403 Forbidden

```
查看npm源：npm config get registry
切换npm源方法一：npm config set registry http://registry.npmjs.org
切换npm源方法二：nrm use npm
```

###### 2.8.5 安装包

```
$ npm install gp19-npm
```

###### 2.8.6 卸载包

```
查看当前项目引用了哪些包 ：
npm ls
卸载包：
npm unpublish --force
```

###### 2.8.7 使用引入包

```
var hello = require('gp19-npm')
hello.sayHello()
```

#### 2.9 npm 脚本

Node 开发离不开 npm，而脚本功能是 npm 最强大、最常用的功能之一。

**一、什么是 npm 脚本？**

npm 允许在 package.json 文件里面，使用 scripts 字段定义脚本命令。

```json
{
	// ...
	"scripts": {
		"build": "node build.js"
	}
}
```

**二、执行顺序**

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

script1.js

```js
var x = 0;
console.log(x);
```

script2.js

```js
var y = 0
console.log(y)
"scripts": {
  "script1": "node script1.js",
  "script2": "node script2.js"
}
```

如果是并行执行（即同时的平行执行），可以使用 `&` 符号。

```
$ npm run script1 & npm run script2
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。

```
$ npm run script1 && npm run script2
```

**三、简写形式**

常用的 npm 脚本简写形式。

```
npm start 是 npm run start
```

#### 2.10 npm 安装 git 上发布的包

```
# 这样适合安装公司内部的git服务器上的项目
npm install git+https://git@github.com:lurongtao/gp-project.git

# 或者以ssh的方式
npm install git+ssh://git@github.com:lurongtao/gp-project.git
```

#### 2.11 cross-env 使用

##### 2.11.1 cross-env 是什么

运行跨平台设置和使用环境变量的脚本

##### 2.11.2 出现原因

当您使用 NODE_ENV=production, 来设置环境变量时，大多数 Windows 命令提示将会阻塞(报错)。（异常是 Windows 上的 Bash，它使用本机 Bash。）换言之，Windows 不支持 NODE_ENV=production 的设置方式。

##### 2.11.3 解决

cross-env 使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。这个迷你的包(cross-env)能够提供一个设置环境变量的 scripts，让你能够以 Unix 方式设置环境变量，然后在 Windows 上也能兼容运行。

##### 2.11.4 安装

npm install --save-dev cross-env

##### 2.11.5 使用

```json
{
	"scripts": {
		"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
	}
}
```

NODE_ENV 环境变量将由 cross-env 设置 打印 process.env.NODE_ENV === 'production'

### 3、NRM: npm registry manager

#### 3.1 手工切换源

##### 3.1.1 查看当前源

```
npm config get registry
```

##### 3.1.2 切换淘宝源

```
npm config set registry https://registry.npm.taobao.org
```

#### 3.2 NRM 管理源

NRM (npm registry manager)是 npm 的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。

##### 3.2.1 安装 nrm

在命令行执行命令，npm install -g nrm，全局安装 nrm。

##### 3.2.2 使用 nrm

执行命令 nrm ls 查看可选的源。 其中，带\*的是当前使用的源，上面的输出表明当前源是官方源。

##### 3.2.3 切换 nrm

如果要切换到 taobao 源，执行命令 nrm use taobao。

##### 3.2.4 测试速度

你还可以通过 nrm test 测试相应源的响应时间。

```
nrm test
```

### 4、NPX: npm package extention

npm 从 5.2 版开始，增加了 npx 命令。它有很多用处，本文介绍该命令的主要使用场景。

Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。

```
$ npm install -g npx
```

#### 4.1 调用项目安装的模块

npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了 Mocha。

```
$ npm install -D mocha
```

一般来说，调用 Mocha ，只能在项目脚本和 package.json 的 scripts 字段里面，如果想在命令行下调用，必须像下面这样。

```
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```

npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```
$ npx mocha --version
```

npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量$PATH 里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。

```
# 等同于 ls
$ npx ls
```

注意，Bash 内置的命令不在$PATH 里面，所以不能用。比如，cd 是 Bash 命令，因此就不能用 npx cd。

#### 4.2 避免全局安装模块

除了调用项目内部模块，npx 还能避免全局安装的模块。比如，create-react-app 这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

```
$ npx create-react-app my-react-app
```

上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app。

注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装 http-server 模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

```
$ npx http-server
```

#### 4.3 --no-install 参数和 --ignore-existing 参数

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install 参数。如果本地不存在该模块，就会报错。

```
$ npx --no-install http-serve
```

反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing 参数。比如，本地已经安装了 http-server，但还是想使用远程模块，就用这个参数。

```
$ npx --ignore-existing http-server
```

# 三、模块/包 与 CommonJS

### 1、模块/包分类

Node.js 有三类模块，即内置的模块、第三方的模块、自定义的模块。

#### 1.1 内置的模块

Node.js 内置模块又叫核心模块，Node.js 安装完成可直接使用。如：

```js
const path = require('path');
var extname = path.extname('index.html');
console.log(extname);
```

#### 1.2 第三方的 Node.js 模块

第三方的 Node.js 模块指的是为了实现某些功能，发布的 npmjs.org 上的模块，按照一定的开源协议供社群使用。如：

```
npm install chalk
const chalk = require('chalk')
console.log(chalk.blue('Hello world!'))
```

#### 1.3 自定义的 Node.js 模块

自定义的 Node.js 模块，也叫文件模块，是我们自己写的供自己使用的模块。同时，这类模块发布到 npmjs.org 上就成了开源的第三方模块。

自定义模块是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程、速度相比核心模块稍微慢一些，但是用的非常多。

##### 1.3.1 模块定义、接口暴露和引用接口

我们可以把公共的功能 抽离成为一个单独的 js 文件 作为一个模块，默认情况下面这个模块里面的方法或者属性，外面是没法访问的。如果要让外部可以访问模块里面的方法或者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。

m1.js：

```js
const name = 'gp19';

const sayName = () => {
	console.log(name);
};

console.log('module 1');

// 接口暴露方法一：
module.exports = {
	say: sayName,
};

// 接口暴露方法二：
exports.say = sayName;

// 错误！
exports = {
	say: sayName,
};
```

main.js：

```js
const m1 = require('./m1');
m1.say();
```

# 四、常用内置模块

这里介绍几个常用的内置模块：url, querystring, http, events, fs, stream, readline, crypto, zlib

### 1、url

#### 1.1 parse

url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

```js
const url = require('url');
const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';
const parsedStr = url.parse(urlString);
console.log(parsedStr);
```

#### 1.2 format

url.format(urlObject)

```js
const url = require('url');
const urlObject = {
	protocol: 'https:',
	slashes: true,
	auth: null,
	host: 'www.baidu.com:443',
	port: '443',
	hostname: 'www.baidu.com',
	hash: '#tag=110',
	search: '?id=8&name=mouse',
	query: { id: '8', name: 'mouse' },
	pathname: '/ad/index.html',
	path: '/ad/index.html?id=8&name=mouse',
	href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110',
};
const parsedObj = url.format(urlObject);
console.log(parsedObj);
```

#### 1.3 resolve

url.resolve(from, to)

```js
const url = require('url');
var a = url.resolve('/one/two/three', 'four');
var b = url.resolve('http://example.com/', '/one');
var c = url.resolve('http://example.com/one', '/two');
console.log(a + ',' + b + ',' + c);
```

### 2、querystring

#### 2.1 parse

querystring.parse(str[, sep[, eq[, options]]])

```js
const querystring = require('querystring');
var qs = 'x=3&y=4';
var parsed = querystring.parse(qs);
console.log(parsed);
```

#### 2.2 stringify

querystring.stringify(obj[, sep[, eq[, options]]])

```js
const querystring = require('querystring');
var qo = {
	x: 3,
	y: 4,
};
var parsed = querystring.stringify(qo);
console.log(parsed);
```

#### 2.3 escape/unescape

querystring.escape(str)

```js
const querystring = require('querystring');
var str = 'id=3&city=北京&url=https://www.baidu.com';
var escaped = querystring.escape(str);
console.log(escaped);
```

querystring.unescape(str)

```js
const querystring = require('querystring');
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com';
var unescaped = querystring.unescape(str);
console.log(unescaped);
```

### 3、http/https

#### 3.1 get

```js
var http = require('http');
var https = require('https');

// 1、接口 2、跨域
const server = http.createServer((request, response) => {
	var url = request.url.substr(1);

	var data = '';

	response.writeHeader(200, {
		'content-type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Origin': '*',
	});

	https.get(`https://m.lagou.com/listmore.json${url}`, (res) => {
		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			response.end(
				JSON.stringify({
					ret: true,
					data,
				})
			);
		});
	});
});

server.listen(8080, () => {
	console.log('localhost:8080');
});
```

#### 3.2 post：服务器提交（攻击）

```js
const https = require('https');
const querystring = require('querystring');

const postData = querystring.stringify({
	province: '上海',
	city: '上海',
	district: '宝山区',
	address: '同济支路199号智慧七立方3号楼2-4层',
	latitude: 43.0,
	longitude: 160.0,
	message: '求购一条小鱼',
	contact: '13666666',
	type: 'sell',
	time: 1571217561,
});

const options = {
	protocol: 'https:',
	hostname: 'ik9hkddr.qcloud.la',
	method: 'POST',
	port: 443,
	path: '/index.php/trade/add_item',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData),
	},
};

function doPost() {
	let data;

	let req = https.request(options, (res) => {
		res.on('data', (chunk) => (data += chunk));
		res.on('end', () => {
			console.log(data);
		});
	});

	req.write(postData);
	req.end();
}

// setInterval(() => {
//   doPost()
// }, 1000)
```

#### 3.3 跨域：jsonp

```js
const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
	let urlObj = url.parse(req.url, true);

	switch (urlObj.pathname) {
		case '/api/user':
			res.end(`${urlObj.query.cb}({"name": "gp145"})`);
			break;
		default:
			res.end('404.');
			break;
	}
});

app.listen(8080, () => {
	console.log('localhost:8080');
});
```

#### 3.4 跨域：CORS

```js
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const app = http.createServer((req, res) => {
	let data = '';
	let urlObj = url.parse(req.url, true);

	res.writeHead(200, {
		'content-type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Origin': '*',
	});

	req.on('data', (chunk) => {
		data += chunk;
	});

	req.on('end', () => {
		responseResult(querystring.parse(data));
	});

	function responseResult(data) {
		switch (urlObj.pathname) {
			case '/api/login':
				res.end(
					JSON.stringify({
						message: data,
					})
				);
				break;
			default:
				res.end('404.');
				break;
		}
	}
});

app.listen(8080, () => {
	console.log('localhost:8080');
});
```

#### 3.5 跨域：middleware（http-proxy-middware）

```js
const http = require('http');
const proxy = require('http-proxy-middleware');

http.createServer((req, res) => {
	let url = req.url;

	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
	});

	if (/^\/api/.test(url)) {
		let apiProxy = proxy('/api', {
			target: 'https://m.lagou.com',
			changeOrigin: true,
			pathRewrite: {
				'^/api': '',
			},
		});

		// http-proy-middleware 在Node.js中使用的方法
		apiProxy(req, res);
	} else {
		switch (url) {
			case '/index.html':
				res.end('index.html');
				break;
			case '/search.html':
				res.end('search.html');
				break;
			default:
				res.end('[404]page not found.');
		}
	}
}).listen(8080);
```

#### 3.6 爬虫

```js
const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

http.createServer((request, response) => {
	response.writeHead(200, {
		'content-type': 'application/json;charset=utf-8',
	});

	const options = {
		protocol: 'https:',
		hostname: 'maoyan.com',
		port: 443,
		path: '/',
		method: 'GET',
	};

	const req = https.request(options, (res) => {
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			filterData(data);
		});
	});

	function filterData(data) {
		let $ = cheerio.load(data);
		let $movieList = $('.movie-item');
		let movies = [];
		$movieList.each((index, value) => {
			movies.push({
				title: $(value).find('.movie-title').attr('title'),
				score: $(value).find('.movie-score i').text(),
			});
		});

		response.end(JSON.stringify(movies));
	}

	req.end();
}).listen(9000);
```

### 4、File System

```js
const fs = require('fs');
const fsP = require('fs').promises;

// 创建文件夹
fs.mkdir('./logs', (err) => {
	console.log('done.');
});

// 文件夹改名
fs.rename('./logs', './log', () => {
	console.log('done');
});

// 删除文件夹
fs.rmdir('./log', () => {
	console.log('done.');
});

// 写内容到文件里
fs.writeFile(
	'./logs/log1.txt',
	'hello',
	// 错误优先的回调函数
	(err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log('文件创建成功');
		}
	}
);

// 给文件追加内容
fs.appendFile('./logs/log1.txt', '\nworld', () => {
	console.log('done.');
});

// 读取文件内容
fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
	console.log(data);
});

// 删除文件
fs.unlink('./logs/log1.txt', (err) => {
	console.log('done.');
});

// 批量写文件
for (var i = 0; i < 10; i++) {
	fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
		console.log('done.');
	});
}

// 读取文件/目录信息
fs.readdir('./', (err, data) => {
	data.forEach((value, index) => {
		fs.stat(`./${value}`, (err, stats) => {
			// console.log(value + ':' + stats.size)
			console.log(value + ' is ' + (stats.isDirectory() ? 'directory' : 'file'));
		});
	});
});

// 同步读取文件
try {
	const content = fs.readFileSync('./logs/log-1.txt', 'utf-8');
	console.log(content);
	console.log(0);
} catch (e) {
	console.log(e.message);
}

console.log(1);

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
	console.log(content);
	console.log(0);
});
console.log(1);

// 异步读取文件：方法二
fs.readFile('./logs/log-0.txt', 'utf-8').then((result) => {
	console.log(result);
});

// 异步读取文件：方法三
function getFile() {
	return new Promise((resolve) => {
		fs.readFile('./logs/log-0.txt', 'utf-8', (err, data) => {
			resolve(data);
		});
	});
}

(async () => {
	console.log(await getFile());
})();

// 异步读取文件：方法四
const fsp = fsP.readFile('./logs/log-1.txt', 'utf-8').then((result) => {
	console.log(result);
});

console.log(fsP);

// watch 监测文件变化
fs.watch('./logs/log-0.txt', () => {
	console.log(0);
});
```

### 5、Crypto

```js
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret).update('I love you').digest('hex');
console.log(hash);
```

# 四、路由

```js
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	switch (req.url) {
		case '/home':
			res.write('home');
			res.end();
			break;
		case '/mine':
			res.write('mine');
			res.end();
			break;
		case '/login':
			fs.readFile('./static/login.html', function (error, data) {
				if (error) throw error;
				res.write(data);
				res.end();
			});
			break;
		case '/fulian.jpg':
			fs.readFile('./static/fulian.jpg', 'binary', function (error, data) {
				if (error) throw error;
				res.write(data, 'binary');
				res.end();
			});
			break;
		default:
			break;
	}
}).listen(8000, 'localhost', function () {
	console.log('服务器运行在： http://localhost:8000');
});
```

# 五、静态资源服务

### 5.1 readStaticFile

/modules/readStaticFile.js

```js
// 引入依赖的模块
var path = require('path');
var fs = require('fs');
var mime = require('mime');

function readStaticFile(res, filePathname) {
	var ext = path.parse(filePathname).ext;
	var mimeType = mime.getType(ext);

	// 判断路径是否有后缀, 有的话则说明客户端要请求的是一个文件
	if (ext) {
		// 根据传入的目标文件路径来读取对应文件
		fs.readFile(filePathname, (err, data) => {
			// 错误处理
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.write('404 - NOT FOUND');
				res.end();
			} else {
				res.writeHead(200, { 'Content-Type': mimeType });
				res.write(data);
				res.end();
			}
		});
		// 返回 true 表示, 客户端想要的 是 静态文件
		return true;
	} else {
		// 返回 false 表示, 客户端想要的 不是 静态文件
		return false;
	}
}

// 导出函数
module.exports = readStaticFile;
```

### 5.2 server

/server.js

```js
// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');

// 搭建 HTTP 服务器
var server = http.createServer(function (req, res) {
	var urlObj = url.parse(req.url);
	var urlPathname = urlObj.pathname;
	var filePathname = path.join(__dirname, '/public', urlPathname);

	// 读取静态文件
	readStaticFile(res, filePathname);
});

// 在 3000 端口监听请求
server.listen(3000, function () {
	console.log('服务器运行中.');
	console.log('正在监听 3000 端口:');
});
```

### 5.3 最终目录结构

![img](https://lurongtao.gitee.io/felixbooks-gp19-node.js/images/dir.jpg)

# 六、Express

基于 Node.js 平台，快速、开放、极简的 web 开发框架。

```
$ npm install express --save
```

### 一、特色

#### 1、Web 应用

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

#### 2、API

丰富的 HTTP 快捷方法和任意排列组合的 Connect 中间件，让你创建健壮、友好的 API 变得既快速又简单。

#### 3、性能

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。

### 二、安装

首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。

```
$ mkdir myapp
$ cd myapp
```

通过 npm init 命令为你的应用创建一个 package.json 文件。 欲了解 package.json 是如何起作用的，请参考 Specifics of npm’s package.json handling。

```
$ npm init
```

此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受默认设置即可，下面这个除外：

```
entry point: (index.js)
```

键入 app.js 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 index.js 文件名，只需按“回车”键即可。

接下来安装 Express 并将其保存到依赖列表中：

```
$ npm install express --save
```

如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可：

```
$ npm install express
```

> 安装 Node 模块时，如果指定了 --save 参数，那么此模块将被添加到 package.json 文件中 dependencies 依赖列表中。 然后通过 npm install 命令即可自动安装依赖列表中所列出的所有模块。

### 三、Hello world 实例

接下来，我们一起创建一个基本的 Express 应用。

注意：这里所创建是一个最最简单的 Express 应用，并且仅仅只有一个文件 — 和通过 Express 应用生成器 所创建的应用*完全不一样*，Express 应用生成器所创建的应用框架包含多 JavaScript 文件、Jade 模板和针对不同用途的子目录。

进入 myapp 目录，创建一个名为 app.js 的文件，然后将下列代码复制进去：

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
```

上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。对于其他所有路径全部返回 404 Not Found。

> req (请求) 和 res (响应) 与 Node 提供的对象完全一致，因此，你可以调用 req.pipe()、req.on('data', callback) 以及任何 Node 提供的方法。

通过如下命令启动此应用：

```
$ node app.js
```

然后在浏览器中打开 http://localhost:3000/ 并查看输出结果。

### 四、路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST 等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：

```js
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world');
});
```

#### 1、路由方法

路由方法源于 HTTP 请求方法，和 express 实例相关联。

下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：

```js
// GET method route
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
	res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
	res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
	res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
	res.send('Got a DELETE request at /user');
});
```

Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。

> 有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...

app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

```js
app.all('/secret', function (req, res, next) {
	console.log('Accessing the secret section ...');
	next(); // pass control to the next handler
});
```

#### 2、路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

Express 使用 path-to-regexp 匹配路由路径，请参考文档查阅所有定义路由路径的方法。 Express Route Tester 是测试基本 Express 路径的好工具，但不支持模式匹配。

> 查询字符串不是路由路径的一部分。

使用字符串的路由路径示例：

```js
// 匹配根路径的请求
app.get('/', function (req, res) {
	res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
	res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
	res.send('random.text');
});
```

使用字符串模式的路由路径示例：

```js
// 匹配 acd 和 abcd
app.get('/ab?cd', function (req, res) {
	res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function (req, res) {
	res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function (req, res) {
	res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function (req, res) {
	res.send('ab(cd)?e');
});
```

> 字符 ?、+、\* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

使用正则表达式的路由路径示例：

```js
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function (req, res) {
	res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function (req, res) {
	res.send('/.*fly$/');
});
```

#### 3、路由句柄

可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

使用一个回调函数处理路由：

```js
app.get('/example/a', function (req, res) {
	res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 next 对象）：

```js
app.get(
	'/example/b',
	function (req, res, next) {
		console.log('response will be sent by the next function ...');
		next();
	},
	function (req, res) {
		res.send('Hello from B!');
	}
);
```

使用回调函数数组处理路由：

```js
var cb0 = function (req, res, next) {
	console.log('CB0');
	next();
};

var cb1 = function (req, res, next) {
	console.log('CB1');
	next();
};

var cb2 = function (req, res) {
	res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);
```

混合使用函数和函数数组处理路由：

```js
var cb0 = function (req, res, next) {
	console.log('CB0');
	next();
};

var cb1 = function (req, res, next) {
	console.log('CB1');
	next();
};

app.get(
	'/example/d',
	[cb0, cb1],
	function (req, res, next) {
		console.log('response will be sent by the next function ...');
		next();
	},
	function (req, res) {
		res.send('Hello from D!');
	}
);
```

#### 4、响应方法

下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| res.download()   | 提示下载文件。                                               |
| res.end()        | 终结响应处理流程。                                           |
| res.json()       | 发送一个 JSON 格式的响应。                                   |
| res.jsonp()      | 发送一个支持 JSONP 的 JSON 格式的响应。                      |
| res.redirect()   | 重定向请求。                                                 |
| res.render()     | 渲染视图模板。                                               |
| res.send()       | 发送各种类型的响应。                                         |
| res.sendFile     | 以八位字节流的形式发送文件。                                 |
| res.sendStatus() | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

#### 5、app.route()

可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

下面这个示例程序使用 app.route() 定义了链式路由句柄。

```js
app.route('/book')
	.get(function (req, res) {
		res.send('Get a random book');
	})
	.post(function (req, res) {
		res.send('Add a book');
	})
	.put(function (req, res) {
		res.send('Update the book');
	});
```

#### 6、express.Router

可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 birds.js 的文件，内容如下：

```js
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
// 定义网站主页的路由
router.get('/', function (req, res) {
	res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function (req, res) {
	res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：

```js
var birds = require('./birds')
...
app.use('/birds', birds)
```

应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。

### 五、利用 Express 托管静态文件

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```js
app.use(express.static('public'));
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```
app.use('/static', express.static('public'))
```

现在，你就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

### 六、使用中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

-   执行任何代码。
-   修改请求和响应对象。
-   终结请求-响应循环。
-   调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：

-   应用级中间件
-   路由级中间件
-   错误处理中间件
-   内置中间件
-   第三方中间件

使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。

#### 1、应用级中间件

应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：

```js
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
	console.log('Request Type:', req.method);
	next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
	res.send('USER');
});
```

下面这个例子展示了在一个挂载点装载一组中间件。

```js
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use(
	'/user/:id',
	function (req, res, next) {
		console.log('Request URL:', req.originalUrl);
		next();
	},
	function (req, res, next) {
		console.log('Request Type:', req.method);
		next();
	}
);
```

作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。

```js
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get(
	'/user/:id',
	function (req, res, next) {
		console.log('ID:', req.params.id);
		next();
	},
	function (req, res, next) {
		res.send('User Info');
	}
);

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
	res.end(req.params.id);
});
```

如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。

```js
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get(
	'/user/:id',
	function (req, res, next) {
		// 如果 user id 为 0, 跳到下一个路由
		if (req.params.id == 0) next('route');
		// 否则将控制权交给栈中下一个中间件
		else next(); //
	},
	function (req, res, next) {
		// 渲染常规页面
		res.render('regular');
	}
);

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
	res.render('special');
});
```

#### 2、路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。

```js
var router = express.Router();
```

路由级使用 router.use() 或 router.VERB() 加载。

上述在应用级创建的中间件系统，可通过如下代码改写为路由级：

```js
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use(
	'/user/:id',
	function (req, res, next) {
		console.log('Request URL:', req.originalUrl);
		next();
	},
	function (req, res, next) {
		console.log('Request Type:', req.method);
		next();
	}
);

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get(
	'/user/:id',
	function (req, res, next) {
		// 如果 user id 为 0, 跳到下一个路由
		if (req.params.id == 0) next('route');
		// 负责将控制权交给栈中下一个中间件
		else next(); //
	},
	function (req, res, next) {
		// 渲染常规页面
		res.render('regular');
	}
);

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
	console.log(req.params.id);
	res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

### 3、错误处理中间件

> 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

```js
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
```

### 4、内置中间件

从 4.x 版本开始，, Express 已经不再依赖 Connect 了。除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。请参考 中间件列表。

**express.static(root, [options])**

express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。

参数 root 指提供静态资源的根目录。

可选的 options 参数拥有如下属性。

| 属性         | 描述                                                                            | 类型     | 缺省值       |
| ------------ | ------------------------------------------------------------------------------- | -------- | ------------ |
| dotfiles     | 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”     | String   | “ignore”     |
| etag         | 是否启用 etag 生成                                                              | Boolean  | true         |
| extensions   | 设置文件扩展名备份选项                                                          | Array    | []           |
| index        | 发送目录索引文件，设置为 false 禁用目录索引。                                   | Mixed    | “index.html” |
| lastModified | 设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。 | Boolean  | true         |
| maxAge       | 以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。                    | Number   | 0            |
| redirect     | 当路径为目录时，重定向至 “/”。                                                  | Boolean  | true         |
| setHeaders   | 设置 HTTP 头以提供文件的函数。                                                  | Function |              |

下面的例子使用了 express.static 中间件，其中的 options 对象经过了精心的设计。

```js
var options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now());
	},
};

app.use(express.static('public', options));
```

每个应用可有多个静态目录。

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

#### 5、第三方中间件

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

```
$ npm install cookie-parser
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// 加载用于解析 cookie 的中间件
app.use(cookieParser())
```

### 七、在 Express 中使用模板引擎

需要在应用中进行如下设置才能让 Express 渲染模板文件：

-   views, 放模板文件的目录，比如： app.set('views', './views')
-   view engine, 模板引擎，比如： app.set('view engine', 'ejs')

#### art-template

art-template for express 4.x.

##### 1、Install

```
npm install --save art-template
npm install --save express-art-template
```

##### 2、Example

```js
var express = require('express');
var app = express();

// view engine setup
app.engine('art', require('express-art-template'));
app.set('view', {
	debug: process.env.NODE_ENV !== 'production',
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// routes
app.get('/', function (req, res) {
	res.render('index.art', {
		user: {
			name: 'aui',
			tags: ['art', 'template', 'nodejs'],
		},
	});
});
```
