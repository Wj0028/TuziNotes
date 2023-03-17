import { defineUserConfig } from 'vuepress';
import { hopeTheme } from 'vuepress-theme-hope';
import theme from './theme.js';

export default defineUserConfig({
	// theme: hopeTheme({

	// }),
	base: '/tuzinotes/',
	head: [
		// 设置 favor.ico，docs/.vuepress/public 下
		['link', { rel: 'icon', href: '/images/Rab4.png' }],
	],
	locales: {
		'/': {
			lang: 'zh-CN',
			title: '吃兔子的鱼香肉丝',
			description: '吃鱼香肉丝的🐇 HOME',
		},
	},

	theme,

	// Enable it with pwa
	// shouldPrefetch: false,
});
// .vuepress/config.ts
// import { defineUserConfig } from "vuepress";
// import { hopeTheme } from "vuepress-theme-hope";

// export default defineUserConfig({

// });
