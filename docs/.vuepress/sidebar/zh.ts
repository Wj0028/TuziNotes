import { sidebar } from 'vuepress-theme-hope';

export const Sidebar = sidebar({
	// {
	//   text: "指南",
	//   link: "/zh/guide/README.md",
	//   icon: "lightbulb",
	//   // 仅在 `/zh/guide/` 激活
	//   activeMatch: "^/zh/guide/$",
	// },
	// { text: "配置", link: "/zh/config/README.md", icon: "config" },
	// {
	//   text: "常见问题",
	//   link: "/zh/faq.md",
	//   icon: "circle-question",
	//   // 会在 `/zh/faq` 开头的路径激活
	//   // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
	//   activeMatch: "^/zh/faq",
	// },
	// '/zh/': [
	// 	'',
	// 	{
	// 		icon: 'discover',
	// 		text: '案例',
	// 		prefix: 'demo/',
	// 		link: 'demo/',
	// 		children: 'structure',
	// 	},
	// 	{
	// 		text: '文档',
	// 		icon: 'note',
	// 		prefix: 'guide/',
	// 		children: 'structure',
	// 	},
	// 	{
	// 		text: '文档',
	// 		icon: 'note',
	// 		prefix: 'guide/',
	// 		children: 'structure',
	// 	},

	// 	'slides',
	// ],

	// '/Front/': [
	// {
	// 	text: 'JavaScript',
	// 	icon: 'lightbulb',
	// 	prefix: 'js/',
	// 	children: 'structure',
	// },
	// {
	// 	text: 'Css',
	// 	icon: 'gears',
	// 	prefix: 'css/',
	// 	children: 'structure',
	// },
	// {
	// 	text: 'Html',
	// 	icon: 'signs-post',
	// 	prefix: 'html/',
	// 	children: 'structure',
	// },
	// {
	// 	text: 'Vue',
	// 	icon: 'code-compare',
	// 	prefix: 'vue/',
	// 	children: 'structure',
	// },
	// {
	// 	text: 'React',
	// 	icon: 'circle-question',
	// 	prefix: 'react/',
	// 	children: 'structure',
	// },
	// 	'js',
	// 	'ts',
	// 	'html',
	// 	'css',
	// 	'vue',
	// 	'react',
	// 	'node',
	// ],

	'/Front/': 'structure',

	'/tool/': 'structure',

	'/cookbook/': 'structure',
});
