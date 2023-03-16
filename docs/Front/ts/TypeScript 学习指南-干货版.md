---
title: Typescript-Basic
icon: Typescript
---

# TypeScript 学习指南

# 一、简介

## 什么是 TypeScript

TypeScript 是 Microsoft 公司注册商标。

TypeScript 具有类型系统，且是 JavaScript 的超集。 它可以编译成普通的 JavaScript 代码。 TypeScript 支持任意浏览器，任意环境，任意系统并且是开源的。

## 安装 TypeScript

### 1、在全局环境里安装 TS

```
npm install -g typescript
```

### 2、用 tsc 命令编译 .ts 文件

app.ts 文件：

```
let title: string = '千锋教育'
```

在命令行里输入以下命令都可以将.ts 文件编译为.js 文件：

```
tsc ./src/app.ts --outFile ./dist/app.js
tsc ./src/* --outDir ./dist --watch
```

### 3、tsconfig.json 配置文件

在命令行里输入 `tsc --init`命令，创建一个 tsconfig.json 文件，在此配置文件里修改：

```
"outDir": "./dist",
"rootDir": "./src"
```

# 二、5 分钟了解 TypeScript

## 1、构建第一个 TypeScript 文件

在编辑器，将下面的代码输入到 **\*src/greeter.ts\*** 文件里。我们注意到 **\*person: string\***，表示 string 是 person 函数的参数类型注解：

```tsx
function greeter(person: string) {
	return 'Hello, ' + person;
}

let user = 'Jane User';
console.log(greeter(user));
```

## 2、类型注解

TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 greeter 函数接收一个字符串参数。 然后尝试把 greeter 的调用改成传入一个数组：

```tsx
function greeter(person: string) {
	return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(greeter(user));
```

重新编译，你会看到产生了一个错误：

```
Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似地，尝试删除 greeter 调用的所有参数。 TypeScript 会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript 提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，greeter.js 文件还是被创建了。 就算你的代码里有错误，你仍然可以使用 TypeScript。但在这种情况下，TypeScript 会警告你代码可能不会按预期执行。

## 3、接口

让我们开发这个示例应用。这里我们使用接口来描述一个拥有 firstName 和 lastName 字段的对象。 在 TypeScript 里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句。

```tsx
interface Person {
	firstName: string;
	lastName: string;
}

function greeter(person: Person) {
	return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = { firstName: 'Jane', lastName: 'User' };
console.log(greeter(user));
```

## 4、类

最后，让我们使用类来改写这个例子。 TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。让我们创建一个 Student 类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起工作。

还要注意的是，在构造函数的参数上使用 public 等同于创建了同名的成员变量。

> **\*注：\***public 修饰符会引发 `Parameter 'firstName' implicitly has an 'any' type.`，解决方法是在`tsconfig.json`文件中，添加`"noImplicitAny": false`，或者将`"strict": true`，改为`"strict": false`

```tsx
class Student {
	fullName: string;
	constructor(public firstName, public middleInitial, public lastName) {
		this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
	}
}

interface Person {
	firstName: string;
	lastName: string;
}

function greeter(person: Person) {
	return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = new Student('Jane', 'M.', 'User');
console.log(greeter(user));
```

# 三、数据类型

## 1、介绍

TypeScript 包含的最简单的数据单元有：数字，字符串，布尔值，Null 和 Undefined 等。TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。本节介绍基础类型的布尔值、数字、字符串、数组、元组、枚举、any 和 void 等。

## 2、布尔值

最基本的数据类型就是简单的`true/false`值，在 JavaScript 和 TypeScript 里叫做`boolean`。

```ts
let isDone: boolean = false;
```

## 3、数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是`number`。

```ts
let decLiteral: number = 6;
```

## 4、字符串

TypeScript 像其它语言里一样，使用`string`表示文本数据类型。 和 JavaScript 一样，可以使用双引号（"）或单引号（'）表示字符串。

```ts
let from: string = '千锋教育';
from = '好程序员';
```

也使用模版字符串，定义多行文本和内嵌表达式。 这种字符串是被反引号包围（`），并且以${ expr }这种形式嵌入表达式。

```ts
let surname: string = `Felix`;
let age: number = 37;
let sentence: string = `Hello, my name is ${surname}.

I'll be ${age + 1} years old next month.`;
```

## 5、数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，Array<元素类型>：

```ts
let list: Array<number> = [1, 2, 3];
```

## 6、元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string 和 number 类型的元组。

```ts
// 声明一个元组类型 x
let x: [string, number];
// 初始化 x
x = ['hello', 10]; // OK
// 无效的初始值
x = [10, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会出现错误：

```ts
x[3] = 'world'; // Error, '[string, number]' 未定义第 3 个元素的类型.
console.log(x[5].toString()); // Error, '[string, number]' 未定义第 5 个元素的类型.
```

## 7、枚举

enum 类型是对 JavaScript 标准数据类型的一个补充。 使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {
	Red,
	Green,
	Blue,
}
let c: Color = Color.Green;
```

默认情况下，从 0 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1 开始编号：

```ts
enum Color {
	Red = 1,
	Green,
	Blue,
}
let c: Color = Color.Green;
```

或者，全部都采用手动赋值：

```ts
enum Color {
	Red = 1,
	Green = 2,
	Blue = 4,
}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {
	Red = 1,
	Green,
	Blue,
}
let colorName: string = Color[2];
console.log(colorName); // 'Green'
```

## 8、any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用`any`类型来标记这些变量：

```ts
let notSure: any = 4;
notSure = 'maybe a string instead'; // OK 赋值了一个字符串
notSure = false; // OK 赋值了一个布尔值
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists函数在运行时可能存在
notSure.toFixed(); // okay, toFixed 函数存在 (在编译时不做检查)
```

当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```ts
let list: any[] = [1, true, 'free'];
list[1] = 100;
```

## 9、unknown

为了解决**any** 带来的问题，[TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 3.0 引入了 **unknown** 类型。
unknown 与 any 一样，也相当于关闭了 ts 的类型检测功能

```ts
let a: unknown = 666;
a = 'Semlinker'; //通过，unknown类型可以被赋任意值
a = false; //通过，unknown类型可以被赋任意值
a = 66; //通过，unknown类型可以被赋任意值
a = undefined; //通过，any类型可以被赋任意值
a = null; //通过，unknown类型可以被赋任意值
a = []; //通过，unknown类型可以被赋任意值
a = {}; //通过，unknown类型可以被赋任意值
```

但是注意下面的代码：

```ts
let a: unknown;
a = 1; //通过，unknown类型可以被赋任意值
a = 'aasd'; //通过，unknown类型可以被赋任意值
let b: number = a; //报错，因为a是unknown类型，unknown类型只能赋值给any类型和unknown类型，不能赋值给其他类型。
```

**unknown**与**any**的最大区别是：

任何类型的值可以赋值给 any，同时 any 类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给 unknown 和 any 类型，所以 unknown 实际上是一个类型安全的 any。

## 10、void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```ts
function echo(): void {
	console.log('做真实的自己，用良心做教育');
}
```

声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null：

```ts
let unusable: void = undefined;
let greeting: void = 'hello world'; // void 类型不能赋值为字符串
```

## 11、类型推断

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

### 什么是类型推断

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let lunarDay = '初一';
lunarDay = 1;
// Type '1' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let lunarDay: string = '初一';
lunarDay = 1;
```

## 12、联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

### 简单的例子

```ts
let lunarDay: string | number;
lunarDay = '初一';
lunarDay = 1;
```

联合类型使用 | 分隔每个类型。

这里的`let lunarDay: string | number`的含义是，允许 lunarDay 的类型是 string 或者 number，但是不能是其他类型。

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```ts
function getLength(something: string | number): number {
	return something.length;
}
// Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```

上例中，length 不是 string 和 number 的共有属性，所以会报错。 访问 string 和 number 的共有属性是没问题的：

```ts
function getString(something: string | number): string {
	return something.toString();
}
```

### 联合类型赋值的类型推断

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let lunarDay: string | number;
lunarDay = '初一';
console.log(lunarDay.length); // 2
lunarDay = 1;
console.log(lunarDay.length); // 编译时报错
```

上例中，第二行的 lunarDay 被推断成了 string，访问它的 length 属性不会报错。 而第四行的 lunarDay 被推断成了 number，访问它的 length 属性时就报错了。

## 13、Null 和 Undefined

`null` 是一个只有一个值的特殊类型。表示一个空对象引用。用 typeof 检测 null 返回是 `object`。 typeof 一个没有值的变量会返回 `undefined`。

null 和 undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。

在 TypeScript 中启用严格的空校验（--strictNullChecks）特性，使得 `null` 和 `undefined` 只能被赋值给 `void` 或本身对应的类型

在 tsconfig.json 中启用 --strictNullChecks

```ts
let x: number;
x = 1; // 运行正确
x = undefined; // 运行错误
x = null; // 运行错误
```

在 tsconfig.json 中启用 --strictNullChecks，需要将 x 赋值为联合类型

```ts
let x: number | null | undefined; //本身对应的类型
x = 1; // 运行正确
x = undefined; // 运行正确
x = null; // 运行正确
```

## 14、Never

never 类型表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never。

下面是一些返回 never 类型的函数：

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
	throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
	return error('Something failed');
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
	while (true) {}
}
```

# 四、函数

## 1、函数声明

在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

```js
// 函数声明（Function Declaration）
function sum(x, y) {
	return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
	return x + y;
};
```

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function sum(x: number, y: number): number {
	return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的**：

```ts
function sum(x: number, y: number): number {
	return x + y;
}
sum(1, 2, 3);

// Expected 2 arguments, but got 3.
function sum(x: number, y: number): number {
	return x + y;
}
sum(1);

// An argument for 'y' was not provided.
```

## 2、函数表达式

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```ts
let mySum = function (x: number, y: number): number {
	return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
	return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛，可以参考 [ES6 中的箭头函数][]。

## 3、用接口定义函数的形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
	(source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
	return source.search(subString) !== -1;
};
```

## 4、可选参数

前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
	if (lastName) {
		return firstName + ' ' + lastName;
	} else {
		return firstName;
	}
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**：

```ts
function buildName(firstName?: string, lastName: string) {
	if (firstName) {
		return firstName + ' ' + lastName;
	} else {
		return lastName;
	}
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

// A required parameter cannot follow an optional parameter.
```

## 5、参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**：

```ts
function buildName(firstName: string, lastName: string = 'Cat') {
	return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

此时就不受「可选参数必须接在必需参数后面」的限制了：

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
	return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```

> 关于默认参数，可以参考 [ES6 中函数参数的默认值][]。

## 6、剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```js
function push(array, ...items) {
	items.forEach(function (item) {
		array.push(item);
	});
}

let a = [];
push(a, 1, 2, 3);
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
	items.forEach(function (item) {
		array.push(item);
	});
}

let a = [];
push(a, 1, 2, 3);
```

注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 [ES6 中的 rest 参数][]。

## 7、重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string {
	if (typeof x === 'number') {
		return Number(x.toString().split('').reverse().join(''));
	} else if (typeof x === 'string') {
		return x.split('').reverse().join('');
	}
}
```

然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
	if (typeof x === 'number') {
		return Number(x.toString().split('').reverse().join(''));
	} else if (typeof x === 'string') {
		return x.split('').reverse().join('');
	}
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

# 五、接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

## 1、什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。 TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

## 2、简单的例子

```ts
interface Person {
	name: string;
	age: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
};
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。 定义的变量比接口少了一些属性是不允许的：

```ts
interface Person {
	name: string;
	age: number;
}

let tom: Person = {
	name: 'Tom',
};
// Property 'age' is missing in type '{ name: string }' but required in type 'Person'.
```

多一些属性也是不允许的：

```ts
interface Person {
	name: string;
	age: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
	gender: 'male',
};

// Type '{ name: string age: number gender: string }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见， _赋值的时候，变量的形状必须和接口的形状保持一致。_

## 3、可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
	name: string;
	age?: number;
}

let tom: Person = {
	name: 'Tom',
};
interface Person {
	name: string;
	age?: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
};
```

可选属性的含义是该属性可以不存在。

这时仍然不允许添加未定义的属性：

```ts
interface Person {
	name: string;
	age?: number;
}

let tom: Person = {
	name: 'Tom',
	age: 25,
	gender: 'male',
};

// Type '{ name: string age: number gender: string }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

## 4、任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
	name: string;
	age?: number;
	[propName: string]: any;
}

let tom: Person = {
	name: 'Tom',
	gender: 'male',
};
```

使用 [propName: string] 定义了任意属性取 string 类型的值。

## 5、只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
	readonly id: number;
	name: string;
	age?: number;
	[propName: string]: any;
}

let tom: Person = {
	id: 89757,
	name: 'Tom',
	gender: 'male',
};

tom.id = 9527;
// Cannot assign to 'id' because it is a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

## 6、interface VS type

大家使用 typescript 总会使用到 interface 和 type，二者区别：

### 相同点

#### 都可以描述一个对象或者函数

##### interface

```typescript
interface User {
	name: string;
	age: number;
}

interface SetUser {
	(name: string, age: number): void;
}
```

##### type

```typescript
type User = {
	name: string;
	age: number;
};

type SetUser = (name: string, age: number) => void;
```

#### 都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 **虽然效果差不多，但是两者语法不同**。

##### interface extends interface

```typescript
interface Name {
	name: string;
}
interface User extends Name {
	age: number;
}
```

##### type extends type

```ts
type Name = {
	name: string;
};
type User = Name & { age: number };
```

##### interface extends type

```typescript
type Name = {
	name: string;
};
interface User extends Name {
	age: number;
}
```

##### type extends interface

```ts
interface Name {
	name: string;
}
type User = Name & {
	age: number;
};
```

### 不同点

#### type 可以而 interface 不行

-   type 可以声明基本类型别名，联合类型，元组等类型

```go
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

-   type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div;
```

-   其他操作

```ts
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>; right: Tree<T> };
```

#### interface 可以而 type 不行

interface 能够声明合并

```typescript
interface User {
	name: string;
	age: number;
}

interface User {
	sex: string;
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

### 总结

一般来说，如果不清楚什么时候用 interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

# 六、类

传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 `class`。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

这一节主要介绍类的用法，下一节再介绍如何定义类的类型。

## 类的概念

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

-   类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
-   对象（Object）：类的实例，通过 `new` 生成
-   面向对象（OOP）的三大特性：封装、继承、多态
-   封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
-   继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
-   多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
-   存取器（getter & setter）：用以改变属性的读取和赋值行为
-   修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
-   抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
-   接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

## 1、ES6 中类的用法

下面我们先回顾一下 ES6 中类的用法。

### 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```js
class Animal {
  constructor(public name) {
  	this.name = name
  }
  sayHi() {
  	return `My name is ${this.name}`
  }
}

let a = new Animal('Jack')
console.log(a.sayHi()) // My name is Jack
```

### 类的继承

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```js
class Cat extends Animal {
	constructor(name) {
		super(name); // 调用父类的 constructor(name)
		console.log(this.name);
	}
	sayHi() {
		return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
	}
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

### 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```js
class Animal {
	constructor(name) {
		this.name = name;
	}
	get name() {
		return 'Jack';
	}
	set name(value) {
		console.log('setter: ' + value);
	}
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```js
class Animal {
	static isAnimal(a) {
		return a instanceof Animal;
	}
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

### 装饰器

在 ES6 里，装饰器只能装饰类。

高阶组件：

```ts
interface Instructor {
	new (...args: Array<any>): Object;
}

function addWidth<T extends Instructor>(Comp: T) {
	return class extends Comp {
		color: string;
		constructor(...args: Array<any>) {
			super(...args);
			this.color = 'red';
		}
	};
}

class Header {
	width: number;

	height: number = 100;

	constructor(...args: Array<any>) {
		this.width = args[1];
	}
}

const Header2 = addWidth(Header);
const header2 = new Header2(300, 400);
console.log(header2.width);
console.log(header2.color);
```

装饰器

```ts
interface Instructor {
	new (...args: Array<any>): Object;
}

function addWidth<T extends Instructor>(Comp: T) {
	return class extends Comp {
		color: string;
		constructor(...args: Array<any>) {
			super(...args);
			this.color = 'red';
		}
	};
}

@addWidth
class Header {
	width: number;
	color: string;

	height: number = 100;

	constructor(...args: Array<any>) {
		this.width = args[1];
		this.color = '';
	}
}

const header = new Header(300, 400);
console.log(header.width);
console.log(header.color);
```

## 2、ES7 中类的用法

ES7 中有一些关于类的提案，TypeScript 也实现了它们，这里做一个简单的介绍。

### 实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```js
class Animal {
	name = 'Jack';

	constructor() {
		// ...
	}
}

let a = new Animal();
console.log(a.name); // Jack
```

### 静态属性

ES7 提案中，可以使用 `static` 定义一个静态属性：

```js
class Animal {
	static num = 42;

	constructor() {
		// ...
	}
}

console.log(Animal.num); // 42
```

## 3、TypeScript 中类的用法

### public、private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

-   `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
-   `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
-   `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

下面举一些例子：

```ts
class Animal {
	public name;
	public constructor(name) {
		this.name = name;
	}
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
```

上面的例子中，`name` 被设置为了 `public`，所以直接访问实例的 `name` 属性是允许的。

很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 `private` 了：

```ts
class Animal {
	private name;
	public constructor(name) {
		this.name = name;
	}
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// Property 'name' is private and only accessible within class 'Animal'.
// Property 'name' is private and only accessible within class 'Animal'.
```

需要注意的是，TypeScript 编译之后的代码中，并没有限制 `private` 属性在外部的可访问性。

上面的例子编译后的代码是：

```js
var Animal = (function () {
	function Animal(name) {
		this.name = name;
	}
	return Animal;
})();
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```

使用 `private` 修饰的属性或方法，在子类中也是不允许访问的：

```ts
class Animal {
	private name;
	public constructor(name) {
		this.name = name;
	}
}

class Cat extends Animal {
	constructor(name) {
		super(name);
		console.log(this.name);
	}
}

// Property 'name' is private and only accessible within class 'Animal'.
```

而如果是用 `protected` 修饰，则允许在子类中访问：

```ts
class Animal {
	protected name;
	public constructor(name) {
		this.name = name;
	}
}

class Cat extends Animal {
	constructor(name) {
		super(name);
		console.log(this.name);
	}
}
```

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化：

```ts
class Animal {
	public name;
	private constructor(name) {
		this.name = name;
	}
}
class Cat extends Animal {
	constructor(name) {
		super(name);
	}
}

let a = new Animal('Jack');

// Cannot extend a class 'Animal'. Class constructor is marked as private.
// Constructor of class 'Animal' is private and only accessible within the class declaration.
```

当构造函数修饰为 `protected` 时，该类只允许被继承：

```ts
class Animal {
	public name;
	protected constructor(name) {
		this.name = name;
	}
}
class Cat extends Animal {
	constructor(name) {
		super(name);
	}
}

let a = new Animal('Jack');

// Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

修饰符还可以使用在构造函数参数中，等同于类中定义该属性，使代码更简洁。

```ts
class Animal {
	// public name: string
	public constructor(public name) {
		this.name = name;
	}
}
```

### readonly

只读属性关键字，只允许出现在属性声明或索引签名中。

```ts
class Animal {
	readonly name;
	public constructor(name) {
		this.name = name;
	}
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```ts
class Animal {
	// public readonly name
	public constructor(public readonly name) {
		this.name = name;
	}
}
```

### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的：

```ts
abstract class Animal {
	public name;
	public constructor(name) {
		this.name = name;
	}
	public abstract sayHi();
}

let a = new Animal('Jack');

// Cannot create an instance of an abstract class.
```

上面的例子中，我们定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。在实例化抽象类的时候报错了。

其次，抽象类中的抽象方法必须被子类实现：

```ts
abstract class Animal {
	public name;
	public constructor(name) {
		this.name = name;
	}
	public abstract sayHi();
}

class Cat extends Animal {
	public eat() {
		console.log(`${this.name} is eating.`);
	}
}

let cat = new Cat('Tom');

// Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

上面的例子中，我们定义了一个类 `Cat` 继承了抽象类 `Animal`，但是没有实现抽象方法 `sayHi`，所以编译报错了。

下面是一个正确使用抽象类的例子：

```ts
abstract class Animal {
	public name;
	public constructor(name) {
		this.name = name;
	}
	public abstract sayHi();
}

class Cat extends Animal {
	public sayHi() {
		console.log(`Meow, My name is ${this.name}`);
	}
}

let cat = new Cat('Tom');
```

上面的例子中，我们实现了抽象方法 `sayHi`，编译通过了。

## 4、类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```ts
class Animal {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	sayHi(): string {
		return `My name is ${this.name}`;
	}
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 5、interface 接口

接口实现子类继承多个父类的一个变通的实现方法。

```ts
class A {
	size: number = 100;
}

interface C {
	color: string;
	printColor(a: string): void;
}

interface D {
	pos: number;
}

class B extends A implements C, D {
	color: string = 'red';
	printColor(a: string) {}
	pos: number = 100;
}
```

# 七、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

## 1、简单的例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```ts
function createArray(length: number, value: any): Array<any> {
	let result = [];
	for (let i = 0; i < length; i++) {
		result[i] = value;
	}
	return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

这时候，泛型就派上用场了：

```ts
function createArray<T>(length: number, value: T): Array<T> {
	let result: T[] = [];
	for (let i = 0; i < length; i++) {
		result[i] = value;
	}
	return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来：

```ts
function createArray<T>(length: number, value: T): Array<T> {
	let result: T[] = [];
	for (let i = 0; i < length; i++) {
		result[i] = value;
	}
	return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

## 2、多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
	return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。

## 4、泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
	console.log(arg.length);
	return arg;
}

// Property 'length' does not exist on type 'T'.
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```ts
interface Lengthwise {
	length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
	console.log(arg.length);
	return arg;
}
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了：

```ts
interface Lengthwise {
	length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
	console.log(arg.length);
	return arg;
}

loggingIdentity(7);

// Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```

## 5、泛型接口

之前学习过接口中函数的定义，可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
	(source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
	return source.search(subString) !== -1;
};
```

当然也可以使用含有泛型的接口来定义函数的形状：

```ts
interface CreateArrayFunc {
	<T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function <T>(length: number, value: T): Array<T> {
	let result: T[] = [];
	for (let i = 0; i < length; i++) {
		result[i] = value;
	}
	return result;
};

createArray(3, 'x'); // ['x', 'x', 'x']
```

## 6、泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```ts
class GenericNumber<T> {
	zeroValue: T;
	add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
	return x + y;
};
```

此处 zeroValue，add 未赋值会出错，设置 "strictPropertyInitialization": false, 关闭提示。

# 八、TypeScript 模块

## 1、什么是模块

TypeScript 沿用了 ES6 的模块概念。模块只能在其自身的作用域内执行，而不是在全局作用域里。模块内的变量，函数，类等可以通过 export 导出，也可以通过 import 导入所需的其他模块内容。

模块更形象的叫法应该是“文件模块”，任何包含 import 或 export 的文件，都会被识别为模块。相反，若一个文件中没有 import 或 export，则该文件内容全局可见。

## 2、用法

### 2.1 导出

-   导出声明

```ts
// 导出变量
export const foo = '123';
// 导出类型
export type FooType = {
	foo: string;
};
// 导出函数
export function bar() {
	console.log(123);
}
```

-   导出语句

```ts
// 导出变量
const foo = '123';
// 导出类型
type FooType = {
	foo: string;
};
// 导出函数
function bar() {
	console.log(123);
}
export { foo, FooType, bar };
```

-   重新导出，可以通过 `as` 重命名变量并导出

```ts
const foo = '123';
export { foo as renamedFoo };
```

-   默认导出

每个模块仅能有一个默认导出，使用 `default` 关键字标记。

```ts
export default '123';
export default function Foo() {}
export default class Foo {}
```

### 2.2 导入

-   导入模块的一个变量或类型

```ts
import { foo } from './foo';
```

-   重命名导入的变量或类型

```ts
import { foo as renamedFoo } from './foo';
```

-   导入整个模块，使用 `* as` 指定一个对象，导入模块的所有输出值都赋值给该对象

```ts
import * as Foo from './foo';
```

-   只导入模块，有些模块内部可能会设置某些全局状态，供其他模块使用，在模块没有任何导出或者用户不关心其导出内容时，可以使用如下方式导入

```ts
import 'core-js'; // 一个普通的 polyfill 库
```

-   默认导入

```ts
import defaultFoo from './foo';
```

### 2.3 查找策略

> 模块查找策略相关的 TypeScript 配置：
> 开启 `moduleResolution: node` 选项，启用 Node 模式；如果使用了 `module: commonjs` 则 `moduleResolution: node` 会默认开启。

模块查找场景主要分为以下两种：

-   相对路径模块（以 . 开头，例如 _./foo_, _…/foo_ 等）
-   其他动态查找模块（如 vue， react， reactDOM 等）

#### 相对路径模块

仅按照相对路径规则查找即可：

如果文件 bar.ts 中含有 import _ as foo from './foo'，那么 foo 文件必须与 bar.ts 文件存在于相同的文件夹下。
如果文件 bar.ts 中含有 import _ as foo from '../foo'，那么 foo 文件所存在的地方必须是 bar.ts 的上一级目录。
如果文件 bar.ts 中含有 import \* as foo from '../someFolder/foo'，那么 foo 文件所在的文件夹 someFolder 必须与 bar.ts 文件所在文件夹在相同的目录下。

#### 其他动态查找模块

若导入路径不是相对路径，则模块查找与 Node 模块解析策略相似。

-   当你使用 import \* as foo from 'foo'，将会按如下顺序查找：
    -   ./node_modules/foo
    -   ../node_modules/foo
    -   ../../node_modules/foo
    -   直到系统的根目录
-   当你使用 import \* as foo from 'something/foo'，将会按照如下顺序查找：
    -   ./node_modules/something/foo
    -   ../node_modules/something/foo
    -   ../../node_modules/something/foo
    -   直到系统的根目录

#### 导入模块解析

仍然以 `import * as foo from 'foo' `为例：

-   若 foo 是一个文件，匹配。
-   否则，若 foo 是一个文件夹，且存在 foo/index.ts， 匹配。
-   否则，若 foo 是一个文件夹，且存在 package.json 文件，在该文件中指定了 types 属性且对应的文件存在，匹配。
-   否则，若 foo 是一个文件夹，且存在 package.json 文件，在该文件中指定了 main 属性且对应的文件存在，匹配。

### 2.4 模块编译

通过设置 tsconfig 编译选项 module 的值，可以把 TavaScript 模块编译成不同 JavsScript 模块类型。

-   "CommonJS"：NodeJs 模块。
-   "AMD"：Require.js 模块。
-   "System"：SystemJs 模块。
-   "UMD"：兼容多个模块加载器，或者不使用模块加载器（全局变量）。
-   "ES6"或 "ES2015"：ES6 模块。

目前比较常用的是 CommonJS，UMD 和 ES6，大部分框架或库会同时编译为这三种模式，如 Element-Plus。

### 2.5 \*.d.ts

我们在使用 TypeScript 开发的时候，有时会用到非 TypeScript 类库，它们没有自己的类型，我们在引入的时候，往往会收到 TypeScript 的报错信息，类似于 ‘无法解析对应的模块’。
那么如何搞定这种类库的类型呢，这时候就需要我们来手动声明类库暴露出来的 API 了。这类声明通常在 .d.ts 文件中定义。（这里使用 module 关键字，并且名称使用引号包裹）

```ts
declare module 'url' {
	export interface Url {
		protocol?: string;
		hostname?: string;
		pathname?: string;
	}

	export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}
```

有时候我们只是想快速使用某个类库模块，并不想去一一声明其 API 类型。可以使用如下**简写形式**：

```ts
declare module 'url';
```

简写形式下所有导出的类型都是 `any`。
