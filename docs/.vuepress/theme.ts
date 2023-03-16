import { hopeTheme } from 'vuepress-theme-hope';
import { Navbar } from './navbar/index.js';
import { Sidebar } from './sidebar/index.js';
// import { searchProPlugin } from 'vuepress-plugin-search-pro';

export default hopeTheme({
	hostname: '',

	author: {
		name: 'Tuzi',
		url: ' ',
	},

	// 默认为 GitHub. 同时也可以是一个完整的 URL
	repo: 'https://github.com/Wj0028/TuziNotes.git',
	// 自定义仓库链接文字。默认从 `repo` 中自动推断为
	// "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
	repoLabel: 'GitHub',
	// 是否在导航栏内显示仓库链接，默认为 `true`
	repoDisplay: true,

	iconAssets: 'iconfont',

	logo: '/images/Rab5.png',

	// docsDir: 'demo/theme-docs/src',

	fullscreen: true,
	locales: {
		// '/': {
		// 	// navbar
		// 	navbar: enNavbar,

		// 	// sidebar
		// 	sidebar: enSidebar,

		// 	footer: 'Default footer',

		// 	displayFooter: true,

		// 	metaLocales: {
		// 		editLink: 'Edit this page on GitHub',
		// 	},
		// },

		/**
		 * Chinese locale config
		 */
		'/': {
			// navbar
			navbar: Navbar,

			// sidebar
			sidebar: Sidebar,
			// sidebar: 'heading',

			footer: ' ',

			displayFooter: true,

			// page meta
			metaLocales: {
				editLink: '在 GitHub 上编辑此页',
			},
		},
	},

	// encrypt: {
	// 	config: {
	// 		'/demo/encrypt.html': ['1234'],
	// 		'/zh/demo/encrypt.html': ['1234'],
	// 	},
	// },
	// themeColor: {
	// 	blue: '#2196f3',
	// 	red: '#f26d6d',
	// 	// green: '#3eaf7c',
	// 	orange: '#fb9b5f',
	// },
	themeColor: {
		blue: '#2196f3',
		red: '#f26d6d',
		green: '#5c842e',
		orange: '#fb9b5f',
	},
	plugins: {
		comment: false,
		// searchProPlugin({
		//   // 索引全部内容
		//   indexContent: true,
		//   // 为分类和标签添加索引
		//   customFields: [
		//     {
		//       getter: (page) => page.frontmatter.category,
		//       formatter: "分类：$content",
		//     },
		//     {
		//       getter: (page) => page.frontmatter.tag,
		//       formatter: "标签：$content",
		//     },
		//   ],
		// }),
		// all features are enabled for demo, only preserve features you need here
		mdEnhance: {
			align: true,
			attrs: true,
			chart: true,
			codetabs: true,
			demo: true,
			// echarts: true,
			figure: true,
			flowchart: true,
			gfm: true,
			imgLazyload: true,
			imgSize: true,
			include: true,
			katex: true,
			mark: true,
			mermaid: true,
			playground: {
				presets: ['ts', 'vue'],
			},
			presentation: {
				plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
			},

			stylize: [
				{
					matcher: 'Recommended',
					replacer: ({ tag }) => {
						if (tag === 'em')
							return {
								tag: 'Badge',
								attrs: { type: 'tip' },
								content: 'Recommended',
							};
					},
				},
			],
			sub: true,
			sup: true,
			tabs: true,
			vPre: true,
			vuePlayground: true,
		},

		// uncomment these if you want a pwa
		// pwa: {
		//   favicon: "/favicon.ico",
		//   cacheHTML: true,
		//   cachePic: true,
		//   appendBase: true,
		//   apple: {
		//     icon: "/assets/icon/apple-icon-152.png",
		//     statusBarColor: "black",
		//   },
		//   msTile: {
		//     image: "/assets/icon/ms-icon-144.png",
		//     color: "#ffffff",
		//   },
		//   manifest: {
		//     icons: [
		//       {
		//         src: "/assets/icon/chrome-mask-512.png",
		//         sizes: "512x512",
		//         purpose: "maskable",
		//         type: "image/png",
		//       },
		//       {
		//         src: "/assets/icon/chrome-mask-192.png",
		//         sizes: "192x192",
		//         purpose: "maskable",
		//         type: "image/png",
		//       },
		//       {
		//         src: "/assets/icon/chrome-512.png",
		//         sizes: "512x512",
		//         type: "image/png",
		//       },
		//       {
		//         src: "/assets/icon/chrome-192.png",
		//         sizes: "192x192",
		//         type: "image/png",
		//       },
		//     ],
		//     shortcuts: [
		//       {
		//         name: "Demo",
		//         short_name: "Demo",
		//         url: "/demo/",
		//         icons: [
		//           {
		//             src: "/assets/icon/guide-maskable.png",
		//             sizes: "192x192",
		//             purpose: "maskable",
		//             type: "image/png",
		//           },
		//         ],
		//       },
		//     ],
		//   },
		// },
	},
});
