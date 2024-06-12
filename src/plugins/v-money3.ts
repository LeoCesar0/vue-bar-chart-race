import { defineNuxtPlugin } from 'nuxt/app';
import money from 'v-money3';
import type { Plugin } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
	const vMoneyPlugin: Plugin = {
		install(app) {
			app.use(money);
		},
	};
	nuxtApp.vueApp.use(vMoneyPlugin);
});
