<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert
				title="人员权限管理"
				type="info"
				:closable="false"
				show-icon><br>
				<small>1：选择左侧组织结构，&nbsp;2：对选择的组织结构内的用户进行管理</small>
			</el-alert>
		</div>
		<div class="left_con left">
			<Tree :nodeData="nodeData" nodeName="组织机构" :isNode="isNode" :noAdd="1" @nodeId="showInfo" v-if="updateTree" />
		</div>
		<div class="right_con left">
			<el-card class="box-card">
				<div slot="header" class="fix">
					<span>人员列表</span>
				</div>
				<el-row>
					<el-button type="success" size="small" @click="openDialog(1)"><i class="el-icon-circle-plus-outline"></i>&nbsp;添加</el-button>
					<el-button type="danger" size="small" @click="remove"><i class="el-icon-delete"></i>&nbsp;删除</el-button>
				</el-row>
				<el-table
				:data="tableData"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
				style="width: 100%">
					<el-table-column type="selection"  width="40" header-align="center" align="center"></el-table-column>
					<el-table-column :resizable="false" prop="id" v-if="false" header-align="center" align="center">
					</el-table-column>
					<el-table-column :resizable="false" prop="username" label="姓名">
					</el-table-column>
					<el-table-column :resizable="false" prop="orgName" label="部门">
					</el-table-column>
					<el-table-column :resizable="false" :formatter="remark" label="电话">
					</el-table-column>
					<el-table-column :resizable="false" label="操作" width="100" header-align="center" align="center">
						<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页组件 -->
				<Page @pageSize="updatePageSize" @pageNum="updatePageNum" :total="pageInfo.total" :pageSize="pageInfo.pageSize" :pageNum="pageInfo.pageNum" v-if="pageInfo.show" />
			</el-card>
		</div>
		<el-dialog
			:title="title"
			:visible.sync="dialogRights"
			width="40%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名：" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="ruleForm.password" :placeholder="passwordPla"></el-input>
				</el-form-item>
				<el-form-item label="选择部门：" prop="organizationId">
					<el-select v-model="ruleForm.organizationId" placeholder="请选择" style="width: 100%">
						<el-option
						v-for="item in orgOptions"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择角色：" prop="roleId">
					<el-select v-model="ruleForm.roleId" placeholder="请选择" style="width: 100%">
						<el-option
						v-for="item in roleOptions"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门管理：" prop="orgadmin">
					<el-radio-group v-model="ruleForm.orgadmin">
						<el-radio label="是"></el-radio>
						<el-radio label="不是"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="系统管理：" prop="systemadmin">
					<el-radio-group v-model="ruleForm.systemadmin">
						<el-radio label="是"></el-radio>
						<el-radio label="不是"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="电话：" prop="remark">
					<el-input v-model="ruleForm.remark"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Tree from '../common/tree.vue';
import Page from '../common/pagination.vue';
export default {
	components: { Tree, Page, },
	data () {
		return {
			// 以上是树形结构数据
			nodeData: [],
			isNode: '',
			updateTree: true,
			// 分页数据
			pageInfo: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				show: true,
			},
			passwordPla: '大于等于6位',
			dialogRights: false,
			multipleSelection: [],
			isEdit: false,
			title: '添加用户',
			tableData: [],
			ruleForm: {},
			roleOptions: [],
			orgOptions: [],
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
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
		// 初始化部门列表
		initTree (off) {
			plan.remote.ajaxPost(`${BASE_URL}/mgt/mgtHomePage`, '', (back) => {
				if (back.code === 200) {
					this.$set(this.nodeData, 0, back.result);
					if (!off) {
						this.isNode = this.nodeData[0].id;
						this.initUser();
					} else {
						this.showInfo(this.isNode);
					};
				}
			});
		},
		// 初始化用户列表
		initUser () {
			var param = {
				'pageNum': this.pageInfo.pageNum, // 分页页码，必填
				'pageSize': this.pageInfo.pageSize, // 每页条数
				'organizationId': this.isNode, // 组织机构代码
				'realname': '', // 真实名称，查询条件
				'username': '', // 用户名
			};
			plan.remote.ajaxPost(`${BASE_URL}/user/getUserInfoList`, JSON.stringify(param), (back) => {
				if (back.code === 200) {
					back.result.total === 0 ? this.pageInfo.show = false : this.pageInfo.show = true;
					this.tableData = back.result.list;
					this.pageInfo.total = back.result.total;
				}
			});
		},
		// 分页事件
		updatePageNum (val) {
			this.pageInfo.pageNum = val;
		},
		updatePageSize (val) {
			this.pageInfo.pageSize = val;
		},
		// 组织机构点击回调
		showInfo (id) {
			this.isNode = id;
			this.initUser();
		},
		// 备注信息格式化（电话...）
		remark (data) {
			if (data.remark) {
				var info = JSON.parse(data.remark);
				return info.phone;
			};
			return '';
		},
		// 编辑用户
		handleClick (row) {
			this.ruleForm = {
				userId: row.id,
				orgadmin: row.orgadmin === 'true' ? '是' : '不是',
				systemadmin: row.systemadmin === 'true' ? '是' : '不是',
				organizationId: row.organizationId,
				username: row.username,
				password: '',
				realname: row.realname,
				remark: this.remark(row),
				roleId: row.roleId,
			};
			this.openDialog(2);
		},
		// 打开添加编辑弹框
		openDialog (type) {
			this.resetForm('ruleForm'); // 重置表单
			this.dialogRights = true;
			// 获取全部权限列表
			plan.remote.ajaxPost(`${BASE_URL}/role/getRoleList`, '', (back) => {
				if (back.code === 200) {
					this.roleOptions = back.result;
				}
			});
			// 获取所有部门列表
			plan.remote.ajaxPost(`${BASE_URL}//mgt/getAllOrg`, '', (back) => {
				if (back.code === 200) {
					this.orgOptions = back.result.orgList;
				}
			});
			this.passwordPla = '大于等于6位';
			if (type === 2) {
				this.rules.password[0].required = false;
				this.isEdit = true;
				this.title = '编辑用户';
				this.passwordPla = '不填写则密码不修改';
				this.getPermList();
			} else {
				this.rules.password[0].required = true;
				this.isEdit = false;
				this.title = '添加用户';
				this.ruleForm = {
					userId: '',
					orgadmin: '不是',
					systemadmin: '不是',
					organizationId: this.isNode,
					username: '',
					password: '',
					realname: '',
					remark: '',
					roleId: '',
				};
			};
		},
		// 当前用户的角色列表
		getPermList () {
		},
		// 提交表单
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var param = {
						'userId': this.ruleForm.userId,
						'orgadmin': this.ruleForm.orgadmin === '是' ? 'true' : 'false',
						'systemadmin': this.ruleForm.systemadmin === '是' ? 'true' : 'false',
						'organizationId': this.ruleForm.organizationId,
						'username': this.ruleForm.username,
						'password': this.ruleForm.password,
						'realname': this.ruleForm.realname,
						'remark': `{"phone":"${this.ruleForm.remark}"}`,
						'roleId': this.ruleForm.roleId,
					};
					// 根据isEdit 判断是添加还是修改
					var type = this.isEdit ? 'updateUserInfo' : 'saveUserInfo';
					plan.remote.ajaxPost(`${BASE_URL}/user/${type}`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							this.initUser();
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
			this.$confirm('此操作将删除选择的用户， 是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				if (this.multipleSelection.length < 1) {
					this.$message.warning('请选择用户项再进行操作！');
					return;
				};
				var arr = '';
				for (let i = 0; i < this.multipleSelection.length; i++) {
					if (i === this.multipleSelection.length - 1) {
						arr += `${this.multipleSelection[i].id}`;
					} else {
						arr += `${this.multipleSelection[i].id},`;
					};
				};
				plan.remote.ajaxPost(`${BASE_URL}/user/deleteUserInfo/${arr}`, '', (back) => {
					if (back.code === 200) {
						this.$message.success(back.message);
						this.initUser();
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
	watch: {
		'pageInfo.pageNum' () {
			this.initUser();
		},
		'pageInfo.pageSize' () {
			this.initUser();
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
.left_con{
	width:30%;
	margin:1% 1% 0 1%;
	.el-tree-node__label{
		font-size:16px;
	}
}
.right_con{
	width:49%;
	padding:1%;
	text-align: left;
}
.fix{
	font-size:16px;
	font-weight: bold;
}
.fix .right{
	font-size:14px;
	font-weight: 100;
	color:#409EFF;
	margin-left:15px;
	cursor: pointer;
}
.el-row{
	margin-bottom:20px;
}
</style>
