<template>
	<div class="block">
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageNum"
			:page-sizes="[5, 10, 20, 50]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
export default {
	props: ['total', 'pageNum', 'pageSize'],
	methods: {
		handleSizeChange (val) {
			this.$emit('pageSize', val);
		},
		handleCurrentChange (val) {
			this.$emit('pageNum', val);
		},
	},
};
</script>

<style lang='scss'>
.el-pagination{
	text-align: center;
	padding: 10px 0;
}
</style>
