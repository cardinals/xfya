<template>
	<div class="clearfix">
		<el-card class="box-card">
			<div slot="header" class="fix">
				<span>{{nodeName}}</span>
			</div>
			<el-tree :data="data" :props="defaultProps" :highlight-current="true" ref='tree'
			@node-click="handleNodeClick" node-key="id" :default-expanded-keys="[isNode]" :expand-on-click-node="false"
			:render-content="renderContent">
			</el-tree>
		</el-card>
		<el-dialog
			title="添加组织机构"
			:visible.sync="dialogVisible"
			width="40%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="上级部门：" prop="belong">
					<el-input v-model="ruleForm.belong" disabled></el-input>
				</el-form-item>
				<el-form-item label="部门名称：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="部门级别：" prop="lv">
					<el-radio-group v-model="ruleForm.lv">
						<el-radio label="总队"></el-radio>
						<el-radio label="支队"></el-radio>
						<el-radio label="大队"></el-radio>
						<el-radio label="中队"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm', nodeDate)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: ['nodeData', 'nodeName', 'isNode', 'noAdd'],
	data () {
		return {
			data: this.nodeData,
			nodeDate: null,
			nodeNum: null,
			lv: {
				'2': '总队',
				'1': '支队',
				'3': '大队',
				'0': '中队',
				'in': '',
			},
			defaultProps: {
				children: 'nodes',
				label: 'name',
			},
			dialogVisible: false,
			ruleForm: {
				name: '',
				belong: '',
				belongId: '',
				lv: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入部门名称',
						trigger: 'blur',
					}
				],
				lv: [
					{
						required: true,
						message: '请选择部门级别',
						trigger: 'change',
					}
				],
			},
		};
	},
	mounted () {
		this.$nextTick(() => {
			this.nodeActive();
		});
	},
	methods: {
		handleNodeClick (data) {
			this.$emit('nodeId', data.id);
			this.parentNode = data.belong;
		},
		handleClose (done) {
			this.$confirm('确认关闭？').then(() => {
				done();
			}).catch(() => {});
		},
		nodeActive () {
			this.$refs.tree.setCurrentKey(this.isNode);
		},
		// 提交表单
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var param = {
						'attach': '',
						'belong': this.ruleForm.belongId,
						'description': '',
						'jibie': this.ruleForm.lv,
						'name': this.ruleForm.name,
					};
					plan.remote.ajaxPost(`${BASE_URL}/mgt/addOrg`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							// 添加节点
							const newChild = { id: back.result, name: this.ruleForm.name, nodes: [], };
							if (!data.nodes) {
								this.$set(data, 'nodes', []);
							}
							data.nodes.push(newChild);
							this.$message.success(back.message);
							this.closeDialog('ruleForm');
						} else {
							this.$message.error(back.message);
						}
					});
				} else {
					return false;
				}
			});
		},
		// 添加或编辑部门
		append (data) {
			this.resetForm('ruleForm');
			this.dialogVisible = true;
			this.nodeDate = data;
			this.lv.in = data.lv;
			this.ruleForm = {
				name: '',
				belong: data.name,
				belongId: data.id,
				lv: this.lv[data.lv],
			};
		},
		// 删除部门
		remove (node, data) {
			this.$confirm('此操作将删除此部门，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				if (node.data.nodes.length > 0) {
					this.$message.error('请先删除下属部门！');
				} else {
					plan.remote.ajaxPost(`${BASE_URL}/mgt/delOrg/` + node.data.id, JSON.stringify({ 'orgId': node.data.id, }), (back) => {
						if (back.code === 200) {
							// 删除节点
							const parent = node.parent;
							const children = parent.data.nodes || parent.data;
							const index = children.findIndex(d => d.id === data.id);
							children.splice(index, 1);
							this.$message({
								type: 'success',
								message: '删除成功!',
							});
						} else {
							this.$message.error(back.message);
						}
					});
				}
			}).catch(() => {
			});
		},
		// 显示添加编辑按钮
		renderContent (h, { node, data, store, }) {
			if (this.noAdd) {
				return (
					<span class='custom-tree-node'>
						<span>{node.label}</span>
					</span>
				);
			} else {
				return (
					<span class='custom-tree-node'>
						<span>{node.label}</span>
						<span>
							<el-button size='mini' type='text' on-click={ () => this.append(data) }><i class="el-icon-circle-plus-outline" title="添加"></i></el-button>
							<el-button size='mini' type='text' on-click={ () => this.remove(node, data) }><i class="el-icon-circle-close-outline" title="删除"></i></el-button>
						</span>
					</span>
				);
			}
		},
		// 关闭弹框
		closeDialog (formName) {
			this.dialogVisible = false;
			this.$refs[formName].resetFields();
		},
		// 重置表单
		resetForm (formName) {
			if (this.$refs[formName] !== undefined) {
				this.$refs[formName].resetFields();
			}
		},
	},
	watch: {
		isNode () {
			this.nodeActive();
		},
	},
};
</script>

<style lang="scss">
	.page-container {
		font-size: 20px;
		text-align: center;
		color: rgb(192, 204, 218);
	}
	.fix{
		font-size:16px;
		font-weight: bold;
	}
	.el-tree-node__label{
		font-size:16px;
	}
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
