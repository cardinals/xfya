<template>
	<div id="left" :class="$store.state.aside?'close':''">
		<div class="admin-logo"></div>
		<aside class="aside">
			<el-menu :default-active="$route.path" :default-openeds="[this.$route.path]" router class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="$store.state.aside"
			background-color="#545c64"
			text-color="#fff">
				<el-menu-item index="/admin/org">
					<i class="el-icon-location"></i>
					<span slot="title">组织机构管理</span>
				</el-menu-item>
				<el-submenu :index="$route.path">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>系统用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/rights">角色权限管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/admin/role">用户角色管理</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<el-menu-item index="/admin/user">用户管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</aside>
	</div>
</template>

<script>
import store from '@/vuex/store';
export default {
	data () {
		return {
		};
	},
	methods: {
		handleOpen (key, keyPath) {
			// console.log(key, keyPath);
		},
		handleClose (key, keyPath) {
			// console.log(key, keyPath);
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
