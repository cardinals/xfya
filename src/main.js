// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Ele from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueResource from 'vue-resource';
import {getCookie, setCookie, delCookie} from '../static/js/util';
Vue.prototype.$cookieStore = {
	getCookie,
	setCookie,
	delCookie,
};

Vue.config.productionTip = false;

Vue.use(Ele);
Vue.use(VueResource);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App,
	},
	methods: {
		checkLogin () {
			//	检查是否存在cookie
			if (!this.$cookieStore.getCookie('loginName')) {
				//	如果没有登录状态则跳转到登录页
				this.$router.push('/login');
			} else {
				//	否则跳转到登录后的页面
				// this.$router.push('/');
			}
		},
	},
	created () {
		this.checkLogin();
	},
	watch: {
		'$route': 'checkLogin',
	},
	template: '<App/>',
});
