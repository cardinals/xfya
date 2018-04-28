import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Index from '@/components/index';
// common
import Map from '@/components/common/map';
import BaseMap from '@/components/common/baseMap';
// admin
import Admin from '@/components/admin/admin';
import Org from '@/components/admin/org';
import InfoPoint from '@/components/admin/infoPoint';
import User from '@/components/admin/user';
import UserList from '@/components/admin/userList';
import UserRights from '@/components/admin/userRights';
import UserRole from '@/components/admin/userRole';
import Setting from '@/components/admin/setting';
import SetUpgrade from '@/components/admin/setUpgrade';

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
					name: '系统用户管理',
					component: User,
					children: [
						{
							path: '',
							name: '用户管理',
							component: UserList,
						},
						{
							path: 'rights',
							name: '权限管理',
							component: UserRights,
						},
						{
							path: 'role',
							name: '角色管理',
							component: UserRole,
						}
					],
				},
				{
					path: 'setting',
					name: '系统配置管理',
					component: Setting,
					children: [
						{
							path: '',
							name: '预案系统升级',
							component: SetUpgrade,
						},
						{
							path: 'rights',
							name: '权限管理',
							component: UserRights,
						},
						{
							path: 'role',
							name: '角色管理',
							component: UserRole,
						}
					],
				},
				{
					path: 'infoPoint',
					name: '信息点配置',
					component: InfoPoint,
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
