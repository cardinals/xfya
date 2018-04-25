<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert
				title=""
				type="info"
				:closable="false"
				show-icon>
				用户角色管理
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
				<el-table-column :resizable="false" prop="roleId" v-if="false" header-align="center" align="center">
				</el-table-column>
				<el-table-column :resizable="false" type="index" prop="" label="序号" width="60" header-align="center" align="center">
				</el-table-column>
				<el-table-column :resizable="false" prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column :resizable="false" prop="roleLevel" label="角色等级">
				</el-table-column>
				<el-table-column :resizable="false" prop="description" label="角色说明">
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
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="角色名称：" prop="roleName">
					<el-input v-model="ruleForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="权限列表：" prop="">
					<el-select v-model="values" multiple placeholder="请选择" style="width: 100%">
						<el-option
						v-for="item in options"
						:key="item.permissionId"
						:label="item.permissionName"
						:value="item.permissionId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级：" prop="roleLevel">
					<el-radio-group v-model="ruleForm.roleLevel">
						<el-radio label="1"></el-radio>
						<el-radio label="2"></el-radio>
						<el-radio label="3"></el-radio>
						<el-radio label="4"></el-radio>
					</el-radio-group>
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
			title: '添加角色',
			tableData: [],
			ruleForm: {},
			values: [],
			options: [],
			rules: {
				roleName: [
					{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur',
					}
				],
				roleLevel: [
					{
						required: true,
						message: '请选择角色等级',
						trigger: 'change',
					}
				],
			},
		};
	},
	mounted () {
		this.initRights();
	},
	methods: {
		// 初始化角色列表
		initRights () {
			plan.remote.ajaxPost(`${BASE_URL}/role/getRoleList`, '', (back) => {
				if (back.code === 200) {
					this.tableData = back.result;
				}
			});
		},
		// 表格内按钮点击 type=1为查看
		handleClick (row, type) {
			this.ruleForm = {
				roleName: row.roleName,
				roleLevel: `${row.roleLevel}`,
				description: row.description,
				roleId: row.roleId,
			};
			if (type === 1) {
				this.openDialog(3);
			} else {
				this.openDialog(2);
			};
		},
		// 打开添加编辑弹框
		openDialog (type) {
			this.resetForm('ruleForm'); // 重置表单
			this.dialogRights = true;
			// 获取全部权限列表
			plan.remote.ajaxPost(`${BASE_URL}/permission/getPermissionList`, '', (back) => {
				if (back.code === 200) {
					this.options = back.result;
				}
			});
			if (type === 3) {
				this.isAdd = false;
				this.title = '查看角色';
				this.getPermList();
			} else if (type === 2) {
				this.isAdd = true;
				this.isEdit = true;
				this.title = '编辑角色';
				this.getPermList();
			} else {
				this.isAdd = true;
				this.isEdit = false;
				this.title = '添加角色';
				this.values = [];
				this.ruleForm = {
					roleName: '',
					roleLevel: '1',
					description: '',
					roleId: '',
				};
			};
		},
		// 当前角色的权限列表
		getPermList () {
			this.values = [];
			plan.remote.ajaxPost(`${BASE_URL}/permission/getPermissionListByRoleId/${this.ruleForm.roleId}`, '', (back) => {
				if (back.code === 200) {
					for (let i = 0; i < back.result.length; i++) {
						this.values.push(back.result[i].permissionId);
					}
				}
			});
		},
		// 提交表单
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var param = {
						'roleId': this.ruleForm.roleId,
						'roleName': this.ruleForm.roleName,
						'roleLevel': parseInt(this.ruleForm.roleLevel),
						'description': this.ruleForm.description,
						'permissionIds': this.values.join(','),
					};
					// 根据isEdit 判断是添加还是修改
					var type = this.isEdit ? 'updateRoleInfo' : 'saveRoleInfo';
					plan.remote.ajaxPost(`${BASE_URL}/role/${type}`, JSON.stringify(param), (back) => {
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
			this.$confirm('此操作将删除选择的角色， 是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				if (this.multipleSelection.length < 1) {
					this.$message.warning('请选择角色项再进行操作！');
					return;
				};
				var arr = '';
				for (let i = 0; i < this.multipleSelection.length; i++) {
					if (i === this.multipleSelection.length - 1) {
						arr += `${this.multipleSelection[i].roleId}`;
					} else {
						arr += `${this.multipleSelection[i].roleId},`;
					};
				};
				plan.remote.ajaxPost(`${BASE_URL}/role/deleteRoleInfo/${arr}`, '', (back) => {
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
