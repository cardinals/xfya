<template>
	<header class="a_header">
		<el-menu
		:default-active="activeIndex"
		class="el-menu-demo"
		mode="horizontal"
		@select="handleSelect"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b">
		<el-menu-item index="1" @click="logout">退出</el-menu-item>
		<el-menu-item index="2">消息中心</el-menu-item>
		<el-menu-item index="3">{{$cookieStore.getCookie('loginName')}}</el-menu-item>
		<div class="handleOpen" @click="handleOpen">
			<i class="fa fa-align-justify pr-5"></i>
		</div>
		</el-menu>
	</header>
</template>

<script>
export default {
	data () {
		return {
			activeIndex: '1',
		};
	},
	methods: {
		logout () {
			this.$confirm('确定退出系统？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				plan.remote.ajaxPost(`${BASE_URL}/user/logout`, '', (back) => {
					// 响应成功回调
					this.$cookieStore.delCookie('loginName');
					this.$router.push('/login');
					this.$message.success('退出成功');
				});
			}).catch(() => {
			});
		},
		handleSelect (key, keyPath) {
			// console.log(key, keyPath);
		},
		handleOpen () {
			this.$store.state.aside = !this.$store.state.aside;
		},
	},
};
</script>

<style lang='scss'>
	.a_header{
		.el-menu--horizontal{
			border:none;
			.el-menu-item{
				height:50px;
				line-height: 50px;
				border:none;
				float:right;
			}
			.el-submenu .el-submenu__title{
				height:50px;
				line-height: 50px;
			}
			.el-menu-item.is-active{
				color:#f66;
			}
		}
		.handleOpen{
			outline: none;
			cursor: pointer;
			height:40px;
			padding-top:10px;
			padding-left:10px;
			float:left;
			color:#fff;
			font-size:26px;
		}
	}
</style>
