<template>
	<header class="header">
		<el-menu
		:default-active="activeIndex"
		class="el-menu-demo"
		mode="horizontal"
		@select="handleSelect"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#ffd04b">
		<el-menu-item index="1">退出</el-menu-item>
		<el-menu-item index="2">消息中心</el-menu-item>
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
			activeIndex: '1'
		}
	},
	methods: {
		handleSelect (key, keyPath) {
			console.log(key, keyPath)
		},
		handleOpen () {
			this.$store.state.aside = !this.$store.state.aside
		}
	}
}
</script>

<style lang='scss' scoped>
.header{
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
