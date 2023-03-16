import { navbar } from 'vuepress-theme-hope';

export const Navbar = navbar([
	'/',
	// { text: '案例', icon: 'discover', link: '/demo/' },
	// {
	// 	text: '指南',
	// 	icon: 'creative',
	// 	prefix: '/guide/',
	// 	children: [
	// 		{
	// 			text: 'Bar',
	// 			icon: 'creative',
	// 			prefix: 'bar/',
	// 			children: ['baz', { text: '...', icon: 'more', link: '' }],
	// 		},
	// 		{
	// 			text: 'Foo',
	// 			icon: 'config',
	// 			prefix: 'foo/',
	// 			children: ['ray', { text: '...', icon: 'more', link: '' }],
	// 		},
	// 	],
	// },
	// {
	// 	icon: 'discover',
	// 	text: '案例',
	// 	prefix: 'demo/',
	// 	link: 'demo/',
	// 	children: [],
	// },
	// {
	// 	text: '文档',
	// 	icon: 'note',
	// 	prefix: 'note/',
	// 	children: [],
	// },
	{ text: '前端', icon: 'note', link: '/Front/' },

	// {
	// 	text: '前端',
	// 	icon: 'note',
	// 	// prefix: '/Front/',
	// 	link: '',
	// 	// children: [
	// 	// 	{
	// 	// 		text: 'Html',
	// 	// 		icon: 'config',
	// 	// 		prefix: 'html/',
	// 	// 		// children: ['ray', { text: '...', icon: 'more', link: '' }],
	// 	// 		link: '',
	// 	// 	},
	// 	// 	{
	// 	// 		text: 'Css',
	// 	// 		icon: 'creative',
	// 	// 		prefix: 'css/',
	// 	// 		link: '',
	// 	// 		// children: ['Basic', 'Code', { text: 'Code', icon: 'more', link: '' }],
	// 	// 	},
	// 	// 	{
	// 	// 		text: 'JavaScript',
	// 	// 		icon: 'creative',
	// 	// 		prefix: 'js/',
	// 	// 		link: '',
	// 	// 		// children: ['Basic', 'Code', { text: 'Code', icon: 'more', link: '' }],
	// 	// 	},
	// 	// 	{
	// 	// 		text: 'TypeScript',
	// 	// 		icon: 'config',
	// 	// 		prefix: 'ts/',
	// 	// 		// children: ['ray', { text: '...', icon: 'more', link: '' }],
	// 	// 		link: '',
	// 	// 	},
	// 	// 	{
	// 	// 		text: 'Vue',
	// 	// 		icon: 'config',
	// 	// 		prefix: 'vue/',
	// 	// 		// children: ['ray', { text: '...', icon: 'more', link: '' }],
	// 	// 		link: '',
	// 	// 	},
	// 	// 	{
	// 	// 		text: 'React',
	// 	// 		icon: 'config',
	// 	// 		prefix: 'react/',
	// 	// 		// children: ['ray', { text: '...', icon: 'more', link: '' }],
	// 	// 		link: '',
	// 	// 	},
	// 	// ],
	// },
	{
		text: 'Tool',
		icon: 'tool',
		prefix: 'tool/',
		children: [],
	},
	{
		text: 'Debug',
		icon: 'bug',
		prefix: 'debug/',
		children: [],
	},
	{
		text: '资源',
		icon: 'link',
		prefix: 'means/',
		children: [],
	},
	// {
	//   text: "V2 文档",
	//   icon: "note",
	//   link: "https://theme-hope.vuejs.press/zh/",
	// },
]);
