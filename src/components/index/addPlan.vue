<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert
				title="新建预案"
				type="info"
				:closable="false"
				show-icon>
			</el-alert>
		</div>
		<el-card class="box-card-con">
			<div slot="header">
				<span>填写预案信息</span>
			</div>
			<div class="text item">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
					<el-form-item label="单位名称：" prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="预案类型：" prop="planTypeId">
						<el-select v-model="ruleForm.planTypeId" placeholder="请选择" style="width: 280px">
							<el-option
							v-for="item in planTypes"
							:key="item.id"
							:label="item.name"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预案等级：" prop="planLevelId">
						<el-select v-model="ruleForm.planLevelId" placeholder="请选择" style="width: 280px">
							<el-option
							v-for="item in planLvs"
							:key="item.id"
							:label="item.name"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="辖区中队：" prop="mgezhongdui">
						<el-input v-model="ruleForm.mgezhongdui"></el-input>
					</el-form-item>
					<el-form-item label="辖区支队：" prop="mgezhidui">
						<el-input v-model="ruleForm.mgezhidui"></el-input>
					</el-form-item>
					<el-form-item label="重点单位地址：" prop="descript">
						<el-input type="textarea" v-model="ruleForm.descript"></el-input>
					</el-form-item>
					<el-form-item label="标记位置：" prop="mapSite">
						<el-card class="box-card-in">
							<div slot="header">
								<span>标记位置</span>
							</div>
							<div class="text item-in">
								<BaseMap :info="ruleForm.mapSite" @mapSite="updateMap" />
							</div>
						</el-card>
					</el-form-item>
				</el-form>
				<el-row style="text-align:center;">
					<el-button type="success" @click="save" style="width:120px">提交</el-button>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
import BaseMap from '../common/baseMap.vue';
export default {
	components: { BaseMap, },
	data () {
		return {
			ruleForm: {},
			planTypes: [],
			planLvs: [],
			rules: {
				name: [{ required: true, message: '请输入单位名称', trigger: 'blur', }],
				planTypeId: [{ required: true, message: '请选择预案类型', trigger: 'change', }],
				planLevelId: [{ required: true, message: '请选择预案等级', trigger: 'change', }],
				mgezhongdui: [{ required: true, message: '请输入辖区中队', trigger: 'blur', }],
				mgezhidui: [{ required: true, message: '请输入辖区支队', trigger: 'blur', }],
			},
		};
	},
	mounted () {
		this.init();
	},
	methods: {
		// 获取预案类型
		init () {
			plan.remote.ajaxPost(`${BASE_URL}/plan/getTypeInfo`, '', (back) => {
				if (back.code === 200) {
					this.planTypes = back.result;
				}
			});
			plan.remote.ajaxPost(`${BASE_URL}/plan/getLevInfo`, '', (back) => {
				if (back.code === 200) {
					this.planLvs = back.result;
				}
			});
		},
		// 提交
		save () {
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					var param = {
						'name': this.ruleForm.name, // 预案名称  必填
						'planTypeId': this.ruleForm.planTypeId, // 预案类型  必填
						'planLevelId': this.ruleForm.planLevelId, // 预案等级 必填
						'mgezhongdui': this.ruleForm.mgezhongdui, // 辖区中队  必填
						'mgezhidui': this.ruleForm.mgezhidui, // 辖区支队  必填
						'descript': this.ruleForm.descript, // 重点单位地址 选填
					};
					plan.remote.ajaxPost(`${BASE_URL}/plan/addPlanInfo`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							plan.remote.ajaxPost(`${BASE_URL}/plan/updatePlanMap`, JSON.stringify({ id: back.result, mapSite: this.ruleForm.mapSite, }), (data) => {
								if (data.code === 200) {
									this.$message.success('添加成功！');
									// this.resetForm('ruleForm');
								} else {
									this.$message.error('添加地图信息失败！');
								}
							});
						}
					});
				}
			});
		},
		// 更新地图信息
		updateMap (info) {
			this.ruleForm.mapSite = JSON.stringify(info);
		},
		// 重置表单
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
	},
	watch: {
	},
};
</script>

<style lang="scss" scoped>
	.clearfix{
		width:1000px;
		margin:0 auto;
		.box-card-con{
			.item{
				width:80%;
				margin:0 auto;
			}
		}
		.box-card-in{
			line-height: 0px;
			height:400px;
			.item-in{
				margin:-20px;
			}
		}
	}
	.tipmsg{
		margin:20px 0;
	}
</style>
