<template>
	<div class="clearfix">
		<div id="tip_search">
			<el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" @keyup.enter.native="search">
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</div>
		<div class="tip_con left">
			<div class="demo-typo-box left" v-for="(item, key) in dataList" :key="key" :class="{'active': key === selectItem}" @click="nodeClick(item, key)">
				<img :src="getSrc(item)" alt="">
				<div class="name" :title="item.name">{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import pointStyle from '../../assets/js/pointStyle';
export default {
	props: ['nodeData', 'nodeName', 'isNode', 'noAdd'],
	data () {
		return {
			activeName: 0,
			dataList: [],
			infoList: [],
			nodeInfo: {},
			keyword: '',
			selectItem: null,
		};
	},
	mounted () {
		this.initList();
	},
	computed: {
	},
	methods: {
		initList () {
			this.dataList = pointStyle;
		},
		// 点击选项
		nodeClick (data, index) {
			if (this.selectItem !== index) {
				this.selectItem = index;
				this.nodeInfo = data;
			} else {
				this.selectItem = null;
				this.nodeInfo = {};
			}
			this.$emit('nodeInfo', this.nodeInfo);
		},
		// 图片路径
		getSrc (item) {
			return item.src;
		},
		// 搜索
		search (e) {
			if (!this.keyword) {
				this.dataList = pointStyle;
				return;
			};
			this.selectItem = null;
			this.dataList = pointStyle.filter((item) => {
				return item.name.indexOf(this.keyword) !== -1;
			});
		},
	},
	watch: {
	},
};
</script>

<style lang="scss">
#tip_search{
	margin-bottom:10px;
	.el-input{
		width:230px;
	}
}
.tip_con{
	width:100%;
	max-height: 450px;
	overflow-y: auto;
	.demo-typo-box {
		height: 80px;
		width: 10%;
		position: relative;
		border: 1px solid #eaeefb;
		font-size: 40px;
		color: #1f2d3d;
		text-align: center;
		line-height: 70px;
		padding-bottom: 36px;
		box-sizing: border-box;
		display: inline-block;
	}
	div.active{
		border:1px solid #67c23a;
		&:after {
			font-family:'FontAwesome';
			content: '\f058';
			position: absolute;
			font-size: 14px;
			color: #67c23a;
			right: 2px;
			top: -20px;
			display: block;
			z-index: 2;
		}
	}
	.demo-typo-box img {
		width:100%;
		max-height:90px;
	}
	.demo-typo-box .name {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 35px;
		font-size: 10px;
		line-height: 35px;
		text-indent: 10px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}
</style>
