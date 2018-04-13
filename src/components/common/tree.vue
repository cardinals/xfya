<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{nodeName}}</span>
			</div>
			<el-tree :data="data" :props="defaultProps" :highlight-current="true"
			@node-click="handleNodeClick" node-key="id" :default-expanded-keys="[isNode]" :expand-on-click-node="false"
			:render-content="renderContent">
			</el-tree>
		</el-card>
		<el-dialog
			title="添加组织机构"
			:visible.sync="dialogVisible"
			width="50%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="上级部门" prop="region">
					<el-input v-model="ruleForm.region"></el-input>
				</el-form-item>
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="部门级别" prop="resource">
					<el-radio-group v-model="ruleForm.resource">
					<el-radio label="总队"></el-radio>
					<el-radio label="支队"></el-radio>
					<el-radio label="大队"></el-radio>
					<el-radio label="中队"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetForm('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm', node_date)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
let id = 1000;
export default {
	props: ['nodeData', 'nodeName', 'isNode', 'isType'],
	data () {
		return {
			data: this.nodeData,
			node_date: null,
			node_num: null,
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			dialogVisible: false,
			ruleForm: {
				name: '',
				region: '',
				resource: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur',
					}
				],
				region: [
					{
						required: true,
						message: '请选择活动区域',
						trigger: 'change',
					}
				],
				resource: [
					{
						required: true,
						message: '请选择活动资源',
						trigger: 'change',
					}
				],
			},
		};
	},
	methods: {
		handleNodeClick (data) {
			console.log(data);
			this.$emit('nodeId', data);
		},
		handleClose (done) {
			this.$confirm('确认关闭？').then(() => {
				done();
			}).catch(() => {});
		},
		// 提交表单
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
					// 添加节点
					const newChild = { id: id++, label: '新增节点', children: [], };
					if (!data.children) {
						this.$set(data, 'children', []);
					}
					data.children.push(newChild);
					this.resetForm('ruleForm');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 重置表单
		resetForm (formName) {
			this.dialogVisible = false;
			this.$refs[formName].resetFields();
		},
		append (data, type) {
			this.dialogVisible = true;
			this.node_date = data;
			if (type !== 2) {
				this.ruleForm = {
					name: '1',
					region: '1',
					resource: '1',
				};
			} else {
				this.ruleForm = {
					name: '',
					region: '',
					resource: '',
				};
			};
		},
		remove (node, data) {
			this.$confirm('此操作将删除此部门, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
				this.$message({
					type: 'success',
					message: '删除成功!',
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除',
				});
			});
		},
		renderContent (h, { node, data, store, }) {
			return (
				<span class='custom-tree-node'>
					<span>{node.label}</span>
					<span>
						<el-button size='mini' type='text' on-click={ () => this.append(data, 2) }>添加</el-button>
						<el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
					</span>
				</span>
			);
		},
	},
	watch: {
		'isType': 'append',
	},
};
</script>

<style lang="scss">
	.page-container {
		font-size: 20px;
		text-align: center;
		color: rgb(192, 204, 218);
	}
	.clearfix{
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
