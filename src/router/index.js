import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/admin'
import Header from '@/components/header'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: Header
		},
		{
			path: '/admin',
			component: Admin
		}
	]
})
