<template>
	<div>
		<div class="tipmsg">
			<el-alert
				title="部门结构管理"
				type="info"
				:closable="false"
				show-icon>
			</el-alert>
		</div>
		<div class="left_con left">
			<Tree :nodeData="node_data" :isType="isType" nodeName="组织机构" :isNode="node_data[0].id" v-on:nodeId="showInfo" />
		</div>
		<div class="right_con left">
			<div slot="header" class="clearfix">
				<span class="left">基本信息</span>
				<span class="right" @click="handleOpen()">编辑</span>
			</div>
			<div class="org_info">
				<p>
					<label for="">ID </label><span>{{nodeInfo.id}}</span>
				</p>
				<p>
					<label for="">部门名称： </label><span>{{nodeInfo.name}}</span>
				</p>
				<p>
					<label for="">地址： </label><span>{{nodeInfo.ads}}</span>
				</p>
				<p>
					<label for="">车辆数： </label><span>{{nodeInfo.cls}}</span>
				</p>
				<p class="location">
					<label for="">地理位置： </label><i class="el-icon-location"></i><span @click="openMap">点击设置</span>
				</p>
			</div>
		</div>
		<!-- 地图设置 -->
		<el-dialog
			title="查看-更新地理位置"
			:visible.sync="dialogVisible"
			width="70%">
			<BaseMap :nodeInfo="nodeInfo" />
		</el-dialog>
	</div>
</template>

<script>
import Tree from '../common/tree.vue';
import BaseMap from '../common/baseMap.vue';
export default {
	name: 'admin',
	components: { Tree, BaseMap, },
	data () {
		return {
			dialogVisible: false,
			isType: 4,
			node_data: [{
				label: '北京总队',
				id: 1,
				children: [{
					label: '海淀支队',
					id: 11,
					children: [{
						label: '知春里中队',
						id: 111,
					}],
				}],
			}, {
				label: '山东总队',
				children: [{
					label: '济南支队',
					id: 2,
					children: [{
						label: '章丘中队',
						id: 21,
					}],
				}, {
					label: '济宁支队',
					children: [{
						label: '曲阜中队',
						id: 211,
					}],
				}],
			}],
			nodeInfo: {
				name: '北京市消防总队',
				ads: '未知',
				cls: '未知',
			},
		};
	},
	mounted () {
		this.initTree();
	},
	methods: {
		initTree () {
			this.$http.post(BASE_URL + '/mgt/mgtHomePage', {}).then((res) => {
				// 响应成功回调
				console.log(res);
			}, (res) => {
				// 响应错误回调
				console.log(res);
			});
		},
		showInfo (data) {
			this.nodeInfo = {
				id: data.id,
				name: '北京市消防总队',
				ads: '未知',
				cls: '未知',
			};
		},
		handleOpen () {
			this.isType++;
		},
		openMap () {
			this.dialogVisible = true;
		},
	},
};
</script>

<style lang="scss" scoped>
	$color:#409EFF;
	.left{
		float:left;
	}
	.right{
		float:right;
	}
	.page-container {
		font-size: 20px;
		text-align: center;
		color: rgb(192, 204, 218);
	}
	.tipmsg{
		width:100%;
		.el-alert{
			width:100%;
		}
	}
	.left_con{
		width:35%;
		margin:10px 10% 0 2%;
		.el-tree-node__label{
			font-size:16px;
		}
	}
	.right_con{
		width:49%;
		padding:1%;
		text-align: left;
	}
	.clearfix{
		font-size:16px;
		font-weight: bold;
		line-height:55px;
		height:55px;
	}
	.clearfix .right{
		font-size:14px;
		font-weight: 100;
		color:#409EFF;
		margin-left:15px;
		cursor: pointer;
	}
	.location i,.location span{
		color:$color;
		cursor: pointer;
	}
</style>
