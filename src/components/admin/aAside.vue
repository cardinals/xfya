<template>
	<div id="left" :class="$store.state.aside?'close':''">
		<div class="admin-logo"></div>
		<aside class="aside">
			<el-menu :default-active="$route.path" :default-openeds="[isOpen]" router class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="$store.state.aside"
			background-color="#545c64"
			text-color="#fff">
				<el-menu-item index="/admin/org">
					<i class="fa fa-lg fa-sitemap"></i>
					<span slot="title">组织机构管理</span>
				</el-menu-item>
				<el-submenu index="/admin/user">
					<template slot="title">
						<i class="fa fa-lg fa-users"></i>
						<span>系统用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/user">用户管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/admin/user/role">用户角色管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/admin/user/rights">角色权限管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="/admin/infoPoint">
					<i class="fa fa-lg fa-flag"></i>
					<span slot="title">信息点配置</span>
				</el-menu-item>
				<el-menu-item index="/admin/setting">
					<i class="fa fa-lg fa-cogs"></i>
					<span slot="title">系统配置管理</span>
				</el-menu-item>
				<!-- <el-submenu index="/admin/setting">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span>系统配置管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/setting">预案系统升级</el-menu-item>
					</el-menu-item-group>
				</el-submenu> -->
			</el-menu>
		</aside>
	</div>
</template>

<script>
import store from '@/vuex/store';
export default {
	data () {
		return {
			isOpen: '',
		};
	},
	mounted () {
		this.handleOpen(this.$route.path);
	},
	methods: {
		handleOpen (key, keyPath) {
			var arr = key.split('/admin/');
			if (arr[1].indexOf('/') > -1) {
				var path = arr[1].split('/')[0];
				this.isOpen = `/admin/${path}`;
			} else {
				this.isOpen = key;
			}
		},
		handleClose (key, keyPath) {
			// console.log(key, keyPath);
		},
	},
	watch: {
		$route () {
			this.handleOpen(this.$route.path);
		},
	},
	store,
};
</script>

<style lang='scss' scoped>
	.admin-logo{
		width:210px;
		height:40px;
		padding-top:10px;
		background:url('/static/img/logo-admin.png') no-repeat center center;
	}
	.close .admin-logo{
		width:60px;
		background:url('/static/img/logo-small.png') no-repeat center center;
	}
	.aside{
		text-align: left;
		position: absolute;
		top: 50px;
		bottom: 0;
		width:210px;
		.el-menu{
			height:100%;
		}
		.el-menu--horizontal>.el-menu-item{
			height:50px !important;
			line-height:50px;
		}
	}
	.close .aside{
		-width:60px;
	}
	.el-menu--collapse{
		width:60px;
	}
</style>
