<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert
				title=""
				type="info"
				:closable="false"
				show-icon>
				角色权限管理
			</el-alert>
		</div>
		<div class="con">
			<el-row>
				<el-button type="success" size="small" @click="openDialog(1)"><i class="el-icon-circle-plus-outline"></i>&nbsp;添加</el-button>
				<el-button type="danger" size="small" @click="remove"><i class="el-icon-delete"></i>&nbsp;删除</el-button>
			</el-row>
			<el-table
			:data="tableData"
			ref="multipleTable"
			@selection-change="handleSelectionChange"
			border
			style="width: 100%">
				<el-table-column type="selection"  width="40" header-align="center" align="center"></el-table-column>
				<el-table-column :resizable="false" prop="permissionId" v-if="false" header-align="center" align="center">
				</el-table-column>
				<el-table-column :resizable="false" type="index" prop="" label="序号" width="60" header-align="center" align="center">
				</el-table-column>
				<el-table-column :resizable="false" prop="permissionName" label="权限名称">
				</el-table-column>
				<el-table-column :resizable="false" prop="permissionUrl" label="权限地址">
				</el-table-column>
				<el-table-column :resizable="false" prop="description" label="权限说明">
				</el-table-column>
				<el-table-column :resizable="false" label="操作" width="100" header-align="center" align="center">
					<template slot-scope="scope">
					<el-button @click="handleClick(scope.row, 1)" type="text" size="small">查看</el-button>
					<el-button @click="handleClick(scope.row, 2)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			:title="title"
			:visible.sync="dialogRights"
			width="40%">
			<el-form :model="ruleForm" :disabled="!isAdd" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="权限名称：" prop="permissionName">
					<el-input v-model="ruleForm.permissionName"></el-input>
				</el-form-item>
				<el-form-item label="权限地址：" prop="permissionUrl">
					<el-input v-model="ruleForm.permissionUrl"></el-input>
				</el-form-item>
				<el-form-item label="说明：" prop="description">
					<el-input type="textarea" v-model="ruleForm.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" v-if="isAdd">
				<el-button @click="closeDialog('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			dialogRights: false,
			multipleSelection: [],
			isAdd: true,
			isEdit: false,
			title: '添加权限',
			tableData: [],
			ruleForm: {},
			rules: {
				permissionName: [
					{
						required: true,
						message: '请输入权限名称',
						trigger: 'blur',
					}
				],
				permissionUrl: [
					{
						required: true,
						message: '请输入权限地址',
						trigger: 'blur',
					}
				],
			},
		};
	},
	mounted () {
		this.initRights();
	},
	methods: {
		// 初始化权限列表
		initRights () {
			plan.remote.ajaxPost(`${BASE_URL}/permission/getPermissionList`, '', (back) => {
				if (back.code === 200) {
					this.tableData = back.result;
				}
			});
		},
		// 表格内按钮点击 type=1为查看
		handleClick (row, type) {
			this.ruleForm = {
				permissionName: row.permissionName,
				permissionUrl: row.permissionUrl,
				description: row.description,
				permissionId: row.permissionId,
			};
			if (type === 1) {
				this.openDialog(3);
			} else {
				this.openDialog(2);
			};
		},
		// 打开添加编辑弹框
		openDialog (type) {
			this.resetForm('ruleForm');
			this.dialogRights = true;
			if (type === 3) {
				this.isAdd = false;
				this.title = '查看权限';
			} else if (type === 2) {
				this.isAdd = true;
				this.isEdit = true;
				this.title = '编辑权限';
			} else {
				this.isAdd = true;
				this.isEdit = false;
				this.title = '添加权限';
				this.ruleForm = {
					permissionName: '',
					permissionUrl: '',
					description: '',
					permissionId: '',
				};
			}
		},
		// 提交表单
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var param = {
						'permissionId': this.ruleForm.permissionId,
						'permissionName': this.ruleForm.permissionName,
						'permissionUrl': this.ruleForm.permissionUrl,
						'description': this.ruleForm.description,
					};
					// 根据isEdit 判断是添加还是修改
					var type = this.isEdit ? 'updatePermissionInfo' : 'savePermissionInfo';
					plan.remote.ajaxPost(`${BASE_URL}/permission/${type}`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							this.initRights();
							this.closeDialog('ruleForm');
							this.$message.success(back.message);
						} else {
							this.$message.error(back.message);
						}
					});
				} else {
					return false;
				}
			});
		},
		// 手动选中信息
		toggleSelection (rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange (val) {
			this.multipleSelection = val;
		},
		// 删除部门
		remove (node, data) {
			this.$confirm('此操作将删除选择的权限，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				if (this.multipleSelection.length < 1) {
					this.$message.warning('请选择权限项再进行操作！');
					return;
				};
				var arr = '';
				for (let i = 0; i < this.multipleSelection.length; i++) {
					if (i === this.multipleSelection.length - 1) {
						arr += `${this.multipleSelection[i].permissionId}`;
					} else {
						arr += `${this.multipleSelection[i].permissionId},`;
					};
				};
				plan.remote.ajaxPost(`${BASE_URL}/permission/deletePermissionInfo/${arr}`, '', (back) => {
					if (back.code === 200) {
						this.$message.success(back.message);
						this.initRights();
					} else {
						this.$message.error(back.message);
					}
				});
			}).catch(() => {
			});
		},
		// 关闭弹框
		closeDialog (formName) {
			this.dialogRights = false;
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
.tipmsg{
	width:100%;
	.el-alert{
		width:100%;
	}
}
.con{
	width:96%;
	padding:2%;
}
.el-row{
	margin-bottom:20px;
}
</style>
