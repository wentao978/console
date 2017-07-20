module.exports = {
	//root: true,
	parser: 'espree',
	"parserOptions": { //这是个对象，表示你想使用的额外的语言特性
		"ecmaVersion": 6, //你想要使用的 ECMAScript 版本
		"sourceType": "module", //设置为 "script" (默认) 或 "module"
		"ecmaFeatures": {
			"globalReturn ": true, //允许在全局作用域下使用 return 语句
			"impliedStrict": true, //impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
			"experimentalObjectRestSpread": true, //启用对实验性的 object rest/spread properties 的支持
			"jsx": true //启用 JSX
		}
	},
	env: {
		browser: true,
		node: true
	},
	extends: 'eslint:recommended',
	// required to lint *.vue files
	plugins: ['html'],
	// check if imports actually resolve
	'settings': {
		'import/resolver': {
			'webpack': {
				'config': 'build/webpack.base.conf.js'
			}
		}
	},
	"globals": {
		"Promise": false //变量不应被重写（只读）
	},
	// add your custom rules here
	'rules': {
		"no-cond-assign": [
			"error", "always"
		], //禁止在条件语句中出现赋值操作符,如:if (user.jobTitle = "manager") {}
		"no-console": process.env.NODE_ENV === "production"
			? "error"
			: "off", //allow是个字符串数组，包含允许使用的console 对象的方法
		"no-constant-condition": [
			"error", {
				"checkLoops": false
			}
		], //禁止在条件中使用常量表达式 如: if (false) {doSomethingUnfinished();}
		"no-control-regex": "error", //禁止在正则表达式中使用控制字符(特殊字符、不可见的字符) 如:var pattern1 = /\x1f/;
		"no-debugger": process.env.NODE_ENV === "production"
			? "error"
			: "off", //禁用 debugger , debugger 语句用于告诉 JavaScript 执行环境停止执行并在代码的当前位置启动调试器。 如:function isTruthy(x) { debugger; return Boolean(x);}
		"no-dupe-args": "error", //禁止在 function 定义中出现重复的参数 如:function foo(a, b, a) {}
		"no-dupe-keys": "error", //禁止对象字面量中出现重复的 key  如:var foo = {bar: "baz",bar: "qux"};
		"no-duplicate-case": "error", //禁止出现重复的 case 标签  如:switch (a) { case 1: break; case 1: break;}
		"no-empty": "warn", //给出警告 , 禁止出现空语句块  如:if (foo) {}
		"no-ex-assign": "error", //禁止对 catch 子句中的异常重新赋值 如:try {} catch (e) {e = 10;}
		"no-extra-boolean-cast": "warn", //给出警告，禁止不必要的布尔类型转换 如:if (Boolean(foo)) { // ...}
		"no-extra-parens": "off", //关闭规则，--fix 禁止冗余的括号 如: ((function foo() {return 1;})())
		"no-extra-semi": "warn", //给出警告，禁止不必要的分号 如:var x = 5;;
		"no-func-assign": "warn", //禁止对 function 声明重新赋值 如:function foo() {}  foo = bar;
		"no-inner-declarations": "warn", //给出警告，禁止在嵌套的语句块中出现变量或 function 声明 如: if (test) {function doSomethingElse () { }}
		"no-invalid-regexp": "warn", //给出警告，禁止在 RegExp 构造函数中出现无效的正则表达式 如: RegExp('[')
		"no-irregular-whitespace": [
			"warn", {
				"skipTemplates": true
			}
		], //给出警告，禁止不规则的空白,"skipStrings": true (默认) 允许在字符串字面量中出现任何空白字符 如: function thing() /*<NBSP>*/{return 'test';}
		"no-obj-calls": "error", //禁止将全局对象当作函数进行调用 如: var math = Math();
		"no-prototype-builtins": "off", //关闭规则，禁止直接使用 Object.prototypes 的内置属性 如: var hasBarProperty = foo.hasOwnProperty("bar");
		"no-regex-spaces": "warn", //给出警告，禁止正则表达式字面量中出现多个空格 如: var re = /foo   bar/;
		"no-sparse-arrays": "warn", //给出警告，禁用稀疏数组 如:var items = [,,];
		"no-template-curly-in-string": "warn", //给出警告，禁止在普通字符串中使用 ${variable} 插入变量 如:"Hello ${name}!";
		"no-unexpected-multiline": "warn", //给出警告，禁止使用令人困惑的多行表达式 如:var foo = bar  (1 || 2).baz();
		"no-unreachable": "error", //禁止在 return、throw、continue 和 break 语句后出现不可达代码 (no-unreachable) 如: function fn() {x = 1; return x; x = 3;  // this will never execute}
		"no-unsafe-finally": "error", //禁止在 finally 语句块中出现控制流语句, JavaScript 暂停 try 和 catch 语句块中的控制流语句，直到 finally 语句块执行完毕。如: (() => {try {throw new Error("Try");  // error is thrown but suspended until finally block ends} finally {return 3;  // 3 is returned before the error is thrown, which we did not expect}})();  > 3
		"no-unsafe-negation": "error", // --fix 禁止否定符号在变量左侧 如: if (!key in object) {}
		"use-isnan": "error", //要求调用 isNaN()检查 NaN 如: if (foo == NaN) {}
		"valid-jsdoc": "warn", //给出警告，强制使用有效的 JSDoc 注释
		"valid-typeof": "error", //强制 typeof 表达式与有效的字符串进行比较 如: typeof foo === "strnig"

		"accessor-pairs": "off", //强制getter/setter成对出现在对象中
		"array-callback-return": "off", //强制数组方法的回调函数中有 return 语句
		"block-scoped-var": "off", //把 var 语句看作是在块级作用域范围之内
		"curly": "warn", //给出warn警告，强制所有控制语句使用一致的括号风格
		"eqeqeq": "error", //要求使用 === 和 !==
		"no-case-declarations": "warn", //给出警告,禁止在 case 或 default 子句中出现词法声明 如: switch (foo) {case 1:let x = 1; break;}
		"no-empty-function": "error", //禁止出现空函数
		"no-empty-pattern": "warn", //给出警告，禁止使用空解构模式 如: var {} = foo;
		"no-fallthrough": "warn", //给出警告，禁止 case 语句落空 无break
		"no-octal": "error", //禁用八进制字面量 如: var num = 071;   // 57
		"no-redeclare": "error", //禁止重新声明变量 如: var a = 3; var a = 10;
		"no-self-assign": "error", //禁止自身赋值  如: foo = foo;
		"no-self-compare": "error", //禁止自身比较 如: if (x === x) { //...}
		"no-throw-literal": "error", //禁止抛出异常字面量 如: throw "error"; throw 0; throw "an " + err;
		"no-unused-labels": "warn", //禁用未使用过的标签 如: A: var foo = 0;
		"no-useless-concat": "warn", //给出警告，禁止不必要的字符串字面量或模板字面量的连接 如: var a = `some` + `string`; var a = '1' + `0`;
		"no-useless-escape": "warn", //给出警告，禁用不必要的转义字符 如: "\'";  '\"';
		"no-with": "error", //禁用 with 语句  with (point) {r = Math.sqrt(x * x + y * y);  // is r a member of point?}
		"radix": [
			"warn", "as-needed"
		], //要求必须有基数  "as-needed"禁止提供基数"warn"0 如: var num = parseInt("071", 10); var num = parseInt("071", 8);

		"no-delete-var": "error", //禁止删除变量 如: var x; delete x;
		"no-shadow-restricted-names": "error", //禁止覆盖受限制的标识符 如: function NaN(){};  var undefined;
		"no-undef": "warn", //禁用未声明的变量 如: b = 10;
		"no-unused-vars": "warn", //给出警告，禁止未使用过的变量 如: 声明了，但是没用到
		"global-require": "off", //要求 require() 出现在顶层模块作用域中 如: var fs = require("fs");
		"handle-callback-err": "warn", //给出警告,要求回调函数中有容错处理  如: function loadData (err, data) { if (err) { console.log(err.stack); } doSomething();}
		"computed-property-spacing": [
			"error", "never"
		], //禁止或强制在计算属性中使用空格  如: obj[foo] obj['foo']
		"no-mixed-spaces-and-tabs": "warn", //禁止使用 空格 和 tab 混合缩进

		"arrow-parens": [
			"warn", "as-needed"
		], //要求箭头函数的参数使用圆括号 () => {}; a => {}; (a, b, c) => a;
		"constructor-super": "warn", //验证构造函数中 super() 的调用
		"no-class-assign": "error", //不允许修改类声明的变量 如: class A { } A = 0;
		"no-const-assign": "error", //不允许改变用const声明的变量 const a = 0; ++a;
		"no-dupe-class-members": "error", //不允许类成员中有重复的名称 class Foo {  bar() { }  bar() { } }
		"no-new-symbol": "error", //Symbol对象不能使用 new 操作符 如: var foo = new Symbol("foo");
		"no-this-before-super": "error", //在构造函数中禁止在调用super()之前使用this或super class A extends B { constructor() {super();this.a = 0;  // OK, this is after `super()`. }}
		"no-var": "warn", //给出警告,要求使用 let 或 const 而不是 var
		"prefer-template": "warn", //给出警告,建议使用模板而非字符串连接  var str = "Hello, " + name + "!";
		"require-yield": "error", //要求 generator 函数内有 yield function* foo() { yield 5; return 10;}
	}
}
