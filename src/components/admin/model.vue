<template>
	<div class="clearfix">
		<div class="model_left left">
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item v-for="(item, key) in dataList" :key="key" :title="item.title" :name="key">
					<el-button size="small" type="success" plain v-for="(parts, num) in item.children" :key="num"
					:class="{'active': String(key) + String(num) === selectItem}" @click="infoClick(parts.children, key, num)">{{parts.title}}</el-button>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="model_right left">
			<div class="demo-typo-box left" v-for="(item, key) in filterInfoList" :key="key" :class="{'isactive': key === selectItem2}" @click="nodeClick(item, key)">
				<img :src="getSrc(item)" alt="">
			<div class="name" :title="item.title">{{item.title}}</div></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['select'],
	data () {
		return {
			activeName: this.select ? this.select[0] : 0,
			dataList: [],
			infoList: [],
			nodeInfo: {},
			selectIndex: [],
			selectItem: null,
			selectItem2: this.select ? this.select[2] : null,
		};
	},
	mounted () {
		this.initList();
	},
	computed: {
		filterInfoList: function () {
			var infoList = this.infoList;
			return infoList.filter((item) => {
				return item.type !== 'Texture';
			});
		},
	},
	methods: {
		initList () {
			plan.remote.libraryList(null, (data) => {
				this.dataList = data;
				var select = this.select;
				if (select && select.length > 0) {
					this.infoClick(this.dataList[select[0]].children[select[1]].children, select[0], select[1]);
				} else {
					this.infoClick(this.dataList[0].children[0].children, 0, 0);
				}
			});
		},
		infoClick (data, key, num) {
			this.infoList = data;
			this.selectItem = String(key) + String(num);
			this.$set(this.selectIndex, 0, key);
			this.$set(this.selectIndex, 1, num);
		},
		nodeClick (data, index) {
			if (this.selectItem2 !== index) {
				this.selectItem2 = index;
				data.src = `${plan.remote.tableName}/resource/model/${data.id}/${data.version}/screenshot_128.jpg`;
				this.nodeInfo = data;
				// 保存索引
				this.$set(this.selectIndex, 2, this.selectItem2);
				this.nodeInfo.select = JSON.parse(JSON.stringify(this.selectIndex));
			} else {
				this.selectItem2 = null;
				this.nodeInfo = {};
			}
			this.$emit('nodeInfo', this.nodeInfo);
		},
		getSrc (item) {
			return `${plan.remote.tableName}/resource/model/${item.id}/${item.version}/screenshot_128.jpg`;
		},
	},
	watch: {
		select (newValue, oldValue) {
			if (this.select) {
				var s = this.select;
				this.infoClick(this.dataList[s[0]].children[s[1]].children, s[0], s[1]);
				this.selectItem2 = s[2];
			}
		},
	},
};
</script>

<style lang="scss">
.model_left{
	width:30%;
	.el-button+.el-button{
		margin:0;
	}
	.el-button--success.is-plain:focus, .el-button--success.active{
		background: #67c23a;
		border-color: #67c23a;
		color: #fff;
	}
}
.model_right{
	width:70%;
	max-height: 500px;
	overflow-y: auto;
	.demo-typo-box {
		height: 130px;
		width: 25%;
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
	div.isactive{
		border:1px solid #67c23a;
		&:after {
			font-family:'FontAwesome';
			content: '\f058';
			position: absolute;
			font-size: 16px;
			color: #67c23a;
			right: 10px;
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
		font-size: 14px;
		line-height: 35px;
		text-indent: 10px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
}
</style>
