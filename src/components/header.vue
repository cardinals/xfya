<template>
	<header class="i_header">
		<el-row>
			<el-col :span="8">
				<div class="logo"><a href="/"><img alt="logo" src="/static/img/logo.png"></a></div>
			</el-col>
			<el-col :span="16">
				<div class="i_nav">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-menu-item index="1"><i class="fa fa-pencil pr-5"></i>新建预案</el-menu-item>
						<el-menu-item index="2"><i class="fa fa-arrow-up pr-5"></i>导入预案</el-menu-item>
						<el-submenu index="3">
							<template slot="title"><i class="fa fa-user pr-5"></i>admin</template>
							<el-menu-item index="3-1"><i class="fa fa-file-text-o pr-5"></i>辖区预案管理</el-menu-item>
							<el-menu-item index="3-2"><i class="fa fa-sitemap pr-5"></i>部门结构管理</el-menu-item>
							<el-menu-item index="3-3"><i class="fa fa-users pr-5"></i>系统用户管理</el-menu-item>
							<el-menu-item index="3-4"><i class="fa fa-cogs pr-5"></i>系统配置管理</el-menu-item>
							<el-menu-item index="3-5"><i class="fa fa-gavel pr-5"></i>系统授权管理</el-menu-item>
							<el-menu-item index="3-6"><i class="fa fa-cloud-upload pr-5"></i>导入Word预案</el-menu-item>
						</el-submenu>
						<el-menu-item index="4"><i class="fa fa-sign-out pr-5"></i>退出</el-menu-item>
					</el-menu>
				</div>
			</el-col>
		</el-row>
	</header>
</template>

<script>
export default {
	data () {
		return {
			activeIndex: '0',
			activeIndex2: '1',
		};
	},
	methods: {
		handleSelect (key, keyPath) {
			console.log(key, keyPath);
		},
	},
};
</script>

<style lang='scss'>
	.i_header{
		border-bottom:1px solid #eaeaea;
		.logo{
			text-align: left;
			margin-left:15px;
			img{
				margin-top:5px;
			}
		}
	}
	.pr-5{
		margin-right:5px;
	}
	.el-menu--horizontal{font-family: '微软雅黑'}
	.i_nav{
		float: right;
		padding:0 15px;
		.el-menu-item{
			font-weight: 700;
		}
		.el-submenu__title{
			font-weight: 700;
		}
		.el-menu--horizontal{
			border:none;
			.el-menu-item{
				height:40px;
				line-height: 40px;
				border:none;
			}
			.el-submenu .el-submenu__title{
				height:40px;
				line-height: 40px;
			}
			.el-menu-item.is-active{
				color:#f66;
			}
		}
	}
</style>
