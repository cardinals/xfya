import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Index from '@/components/index';
import Map from '@/components/common/map';
import BaseMap from '@/components/common/baseMap';
// admin
import Admin from '@/components/admin/admin';
import Org from '@/components/admin/org';
import User from '@/components/admin/user';
import UserRights from '@/components/admin/userRights';
import UserRole from '@/components/admin/userRole';

Vue.use(Router);

export default new Router({
	mode: 'hash',
	routes: [
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/',
			name: '首页',
			component: Index,
			children: [
				{
					path: '',
					name: '地图',
					redirect: 'map',
				},
				{
					path: '/map',
					name: 'map',
					component: Map,
				}
			],
		},
		{
			path: '/admin',
			name: '首页',
			component: Admin,
			children: [
				{
					path: '',
					name: '首页',
					redirect: 'org',
				},
				{
					path: 'org',
					name: '组织机构',
					component: Org,
				},
				{
					path: 'user',
					name: '用户管理',
					component: User,
				},
				{
					path: 'rights',
					name: '用户管理',
					component: UserRights,
				},
				{
					path: 'role',
					name: '用户管理',
					component: UserRole,
				},
				{
					path: 'map',
					name: 'map',
					component: BaseMap,
				}
			],
		}
	],
});
