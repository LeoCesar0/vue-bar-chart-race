import { resolve } from 'path';
import { defineNuxtConfig } from 'nuxt/config';
import fs from 'fs';
import { createHash } from 'crypto';

const baseUrl = '/chart-race';

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: './src',
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/styles/utils.scss" as *; @use "@/styles/variables.scss" as *;',
				},
			},
		},
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	css: ['@/styles/global.scss', '@/styles/components.scss'],
	modules: ['@vueuse/nuxt'],
	imports: {
		dirs: ['composables/*.ts', 'composables/**/*.ts'],
	},
	alias: {
		'@': resolve(__dirname, './src'),
		assets: '/<rootDir>/assets',
		'@vendors': resolve(__dirname, './vendors'),
	},
	app: {
		baseURL: baseUrl,
		buildAssetsDir: '/assets',
		head: {
			title: 'Chart Bar Race',
		},
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		url: baseUrl,
	},
});
