import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Admin from '@/components/admin'
import Index from '@/components/index'
import Map from '@/components/map'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [
		{
			path: '/login',
			component: Login
		},
		{
			path: '/',
			name: 'index',
			component: Index,
			children: [
				{
					path: '',
					name: 'index',
					redirect: 'map'
				},
				{
					path: '/map',
					name: 'map',
					component: Map
				}
			]
		},
		{
			path: '/admin',
			name: 'index',
			component: Admin
		}
	]
})
