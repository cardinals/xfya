<template>
	<div class="m-artHeader">
		<el-breadcrumb class="linkWay">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, $index) in breadList" :key="$index"  separator="/">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
    </div>
</template>
<script>
export default{
	created () {
		this.getBreadcrumb();
	},
	data () {
		return {
			breadlist: '', // 路由集合
		};
	},
	methods: {
		getBreadcrumb () {
			let breadNumber = typeof (this.$route.meta.breadNumber) !== 'undefined' ? this.$route.meta.breadNumber : 1; // 默认为1
			let newBread = {
				name: this.$route.name,
				path: this.$route.fullPath,
			}; // 当前页面的
			let breadList = this.$store.getters.breadListState; // 获取breadList数组
			breadList = breadList.splice(breadNumber, breadList.length - breadNumber, newBread);
			breadList = JSON.stringify(breadList);
			this.$store.commit('breadListMutations', breadList);
			this.breadList = this.$store.getters.breadListState;
		},
	},
	watch: {
		$route () {
			this.getBreadcrumb();
		},
	},
};
</script>
