<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert
				title=""
				type="info"
				:closable="false"
				show-icon>
				部门结构管理
			</el-alert>
		</div>
		<div class="left_con left">
			<Tree :nodeData="nodeData" nodeName="组织机构" :isNode="isNode" @nodeId="showInfo" @openEdit="handleOpen()" v-if="updateTree" />
		</div>
		<div class="right_con left">
			<div slot="header" class="fix">
				<span class="left">基本信息</span>
				<!-- <span class="right" @click="handleOpen()">编辑</span> -->
			</div>
			<div class="org_info">
				<p>
					<label for="">部门名称： </label><span>{{nodeInfo.name}}</span>
				</p>
				<p>
					<label for="">地址： </label><span>{{nodeInfo.ads ? nodeInfo.ads : "未知"}}</span>
				</p>
				<p>
					<label for="">车辆数： </label><span>{{nodeInfo.cls ? nodeInfo.cls : "未知"}}</span>
				</p>
				<p class="location">
					<label for="">地理位置： </label><span @click="openMap"><i class="el-icon-location"></i>点击设置</span>
				</p>
			</div>
		</div>
		<el-dialog
			title="编辑信息"
			:visible.sync="dialogEdit"
			width="35%">
			<el-form :model="nodeInfo" :rules="rules" ref="nodeInfo" label-width="100px" class="demo-ruleForm">
				<el-form-item label="部门名称：" prop="name">
					<el-input v-model="nodeInfo.name"></el-input>
				</el-form-item>
				<el-form-item label="地址：" prop="ads">
					<el-input v-model="nodeInfo.ads"></el-input>
				</el-form-item>
				<el-form-item label="车辆数：" prop="cls">
					<el-input v-model="nodeInfo.cls"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('nodeInfo')">取 消</el-button>
				<el-button type="primary" @click="submitForm('nodeInfo')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 地图设置 -->
		<el-dialog
			title="查看-更新地理位置"
			:visible.sync="dialogMap"
			width="70%">
			<BaseMap :info="nodeInfo.mapSite" @mapSite="updateMap" v-if='dialogMap' />
			<div class="save_btn">
				<el-button type="success" size="small" round @click="saveMapSite">保存更改</el-button><span></span>
			</div>
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
			dialogMap: false,
			dialogEdit: false,
			nodeData: [],
			isNode: '1',
			updateTree: true,
			nodeInfo: {
				id: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入部门名称',
						trigger: 'blur',
					}
				],
			},
		};
	},
	mounted () {
		this.initTree();
	},
	methods: {
		initTree (off) {
			plan.remote.ajaxPost(`${BASE_URL}/mgt/mgtHomePage`, '', (back) => {
				if (back.code === 200) {
					this.$set(this.nodeData, 0, back.result);
					var attach = back.result.attach ? JSON.parse(back.result.attach) : '';
					this.nodeInfo = {
						id: back.result.id,
						name: back.result.name,
						ads: attach ? attach.ads : '',
						cls: attach ? attach.cls : '',
						mapSite: back.result.mapSite,
					};
					if (!off) {
						this.isNode = this.nodeData[0].id;
					} else {
						this.showInfo(this.isNode);
					}
				}
			});
		},
		showInfo (id) {
			var data = { 'orgId': id, };
			plan.remote.ajaxPost(`${BASE_URL}/mgt/getOrgById/` + id, JSON.stringify(data), (back) => {
				var attach = back.result.attach ? JSON.parse(back.result.attach) : '';
				this.nodeInfo = {
					id: back.result.id,
					name: back.result.name,
					ads: attach ? attach.ads : '',
					cls: attach ? attach.cls : '',
					mapSite: back.result.mapSite,
				};
			});
		},
		// 提交地图信息
		saveMapSite () {
			var param = {
				'id': this.nodeInfo.id,
				'mapSite': this.nodeInfo.mapSite,
			};
			plan.remote.ajaxPost(`${BASE_URL}/mgt/upOrgInfo`, JSON.stringify(param), (back) => {
				if (back.code === 200) {
					this.dialogMap = false;
					this.$message.success(back.message);
				} else {
					this.$message.error(back.message);
				}
			});
		},
		// 更新地图信息
		updateMap (info) {
			this.nodeInfo.mapSite = JSON.stringify(info);
		},
		handleOpen () {
			this.dialogEdit = true;
		},
		openMap () {
			this.dialogMap = true;
		},
		// 编辑信息
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var param = {
						'id': this.nodeInfo.id,
						'attach': JSON.stringify({
							'ads': this.nodeInfo.ads,
							'cls': this.nodeInfo.cls,
						}),
						'name': this.nodeInfo.name,
					};
					plan.remote.ajaxPost(`${BASE_URL}/mgt/upOrgInfo`, JSON.stringify(param), (back) => {
						this.isNode = this.nodeInfo.id;
						this.initTree(1);
						this.closeDialog('nodeInfo');
					});
				} else {
					return false;
				}
			});
		},
		// 关闭弹框
		closeDialog (formName) {
			this.dialogEdit = false;
			this.$refs[formName].resetFields();
		},
		// 重置表单
		resetForm (formName) {
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields();
			}
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
		margin:1% 10% 0 2%;
		.el-tree-node__label{
			font-size:16px;
		}
	}
	.right_con{
		width:49%;
		padding:1%;
		text-align: left;
		.org_info > p{
			overflow: hidden;
			line-height: 40px;
			label{
				width:20%;
				text-align: right;
				float:left;
			}
			span{
				width:75%;
				margin-left:2%;
				float:left;
			}
		}
	}
	.fix{
		font-size:16px;
		font-weight: bold;
		line-height:55px;
		height:55px;
	}
	.fix .right{
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
	.save_btn{
		position: absolute;
		right:50px;
		top:40px;
	}
</style>
