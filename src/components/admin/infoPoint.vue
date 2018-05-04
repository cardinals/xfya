<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert title="" type="info" :closable="false" show-icon>信息点设置
			</el-alert>
		</div>
		<div class="left_con left">
			<el-card class="box-card">
				<div slot="header" class="fix">
					<span>信息点列表</span>
				</div>
				<el-tree :data="pointData" :props="defaultProps" :highlight-current="true" ref='tree' :default-expand-all="true"
				@node-click="handleNodeClick" node-key="id" :default-expanded-keys="[]" :expand-on-click-node="false"
				:render-content="renderContent">
				</el-tree>
			</el-card>
		</div>
		<div class="right_con left" v-show="rightShow">
			<div slot="header" class="fix fix2">
				<span class="left">基本信息</span>
			</div>
			<div class="point_info">
				<p>
					<label for="">名字： </label><span>{{pointInfo.name}}</span>
				</p>
				<p v-show="isModel">
					<label for="">模型： </label><span><img :src="pointInfo.model.src" alt=""></span>
				</p>
				<p v-show="isTip">
					<label for="">气泡： </label><span><img :src="pointInfo.tip.src" alt=""></span>
				</p>
				<p>
					<label for="">拖拽图片： </label><span><img :src="pointInfo.photo" alt=""></span>
				</p>
				<p v-show="isColor">
					<label for="">颜色： </label><span :style="styleColor" :title="pointInfo.color"></span>
				</p>
				<p v-show="isWidth">
					<label for="">宽度： </label><span>{{pointInfo.width}}</span>
				</p>
			</div>
		</div>
		<el-dialog
			title="编辑信息"
			:visible.sync="addDialog"
			width="650px">
			<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型：" prop="type">
					<el-radio-group v-model="addInfo.type" ref="addInfotype">
						<el-radio label="点"></el-radio>
						<el-radio label="线"></el-radio>
						<el-radio label="面"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="名字：" prop="name">
					<el-input v-model="addInfo.name" ref="addInfoname"></el-input>
				</el-form-item>
				<el-form-item label="模型：" prop="model" v-show="isModel">
					<el-button size="small" class="left" type="primary" plain @click="modeldialog = true">点击选择</el-button>
					<img :src="addInfo.model.src" alt="" style="height:40px; float:left;">
				</el-form-item>
				<el-form-item label="气泡：" prop="tip" v-show="isTip">
					<el-button size="small" class="left" type="primary" plain @click="tipdialog = true">点击选择</el-button>
					<img :src="addInfo.tip.src" alt="" style="height:40px; float:left;">
				</el-form-item>
				<el-form-item label="图片：" prop="photo">
					<el-upload
					:action="action"
					list-type="picture"
					ref="upload"
					accept="image/*"
					:auto-upload="false"
					:limit="1"
					:file-list="fileList"
					:before-upload="beforeAvatarUpload"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove">
						<el-button size="small" plain type="primary">点击上传</el-button>
					</el-upload>
					<el-dialog :visible.sync="uploadVisible" :modal="false">
						<img width="100%" :src="dialogImageUrl" ref='addInfophoto' alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item v-show="isColor2" label="颜色：" prop="color">
					<el-color-picker v-model="addInfo.color" ref="addInfocolor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item v-show="isWidth2" label="宽度：" prop="width">
					<el-input v-model="addInfo.width" ref="addInfowidth"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('addInfo')">取 消</el-button>
				<el-button type="primary" @click="submitAdd('addInfo', nodeInfoData)">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="添加类型"
			:visible.sync="dialogVisible"
			width="650px">
			<el-form :model="typeNode" :rules="rules2" ref="typeNode" label-width="100px" class="demo-ruleForm">
				<el-form-item label="名字：" prop="name">
					<el-input v-model="typeNode.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('typeNode')">取 消</el-button>
				<el-button type="primary" @click="submitForm('typeNode', typeNodeData)">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="模型列表"
			:visible.sync="modeldialog"
			:before-close="closeModel"
			width="700px">
			<Model @nodeInfo="getNodeInfo" :select="addInfo.model.select" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeModel(null)">取 消</el-button>
				<el-button type="primary" @click="saveModel">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="气泡列表"
			:visible.sync="tipdialog"
			:before-close="closeTip"
			width="700px">
			<Tip @nodeInfo="getTipInfo" :selectItem="addInfo.tip.id" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeTip(null)">取 消</el-button>
				<el-button type="primary" @click="saveTip">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Model from './model.vue';
import Tip from './Tip.vue';
export default {
	components: { Model, Tip, },
	data () {
		return {
			action: `${BASE_URL}/option/uploadImg`,
			styleColor: '',
			addDialog: false,
			dialogVisible: false,
			modeldialog: false,
			tipdialog: false,
			addData: {},
			// 树形菜单
			pointInfo: {
				id: '',
				model: { src: null, },
				tip: { src: null, },
			},
			addInfo: {
				id: '',
				model: { src: null, },
				tip: { src: null, },
				type: '点',
			},
			defaultProps: {
				label: 'name',
			},
			isColor: false,
			isWidth: false,
			isColor2: false,
			isWidth2: false,
			isModel: false,
			isTip: false,
			rightShow: false,
			// 模型信息和气泡信息
			tipAdd: {},
			tipInfo: {},
			modelAdd: {},
			modelInfo: {},
			// 上传图片
			fileList: [],
			dialogImageUrl: '',
			uploadVisible: false,
			// 添加类型
			typeNode: {
				id: '',
			},
			pointData: [{
				id: 'map',
				name: '地图',
				istype: 'map',
				children: [],
			}, {
				id: 'unity',
				name: '三维',
				istype: 'unity',
				children: [],
			}],
			rules: {
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'blur',
					}
				],
			},
			rules2: {
				name: [
					{
						required: true,
						message: '请输入类型名称',
						trigger: 'blur',
					}
				],
			},
		};
	},
	computed: {
	},
	mounted () {
		this.initTree();
	},
	methods: {
		// 初始化部门列表
		initTree (off) {
			plan.remote.ajaxPost(`${BASE_URL}/option/getOptionInfoByKey/''`, '', (back3) => {
				if (back3.code === 200) {
					if (back3.result.length <= 0) {
						var param = {
							'id': '',
							'optionKey': 'map',
							'optionValue': JSON.stringify(this.pointData[0]),
						};
						plan.remote.ajaxPost(`${BASE_URL}/option/addOptionInfo`, JSON.stringify(param), (back) => {
							if (back.code === 200) {
								var params = {
									'id': '',
									'optionKey': 'unity',
									'optionValue': JSON.stringify(this.pointData[1]),
								};
								plan.remote.ajaxPost(`${BASE_URL}/option/addOptionInfo`, JSON.stringify(params), (back2) => {
									if (back2.code === 200) {
										plan.remote.ajaxPost(`${BASE_URL}/option/getOptionInfoByKey/''`, '', (back4) => {
											if (back4.code === 200) {
												for (let i = 0; i < back4.result.length; i++) {
													const element = back4.result[i];
													var jsons = JSON.parse(element.optionValue);
													jsons.id = element.id;
													if (element.optionKey === 'map') {
														this.$set(this.pointData, 0, jsons);
													} else if (element.optionKey === 'unity') {
														this.$set(this.pointData, 1, jsons);
													}
												}
											}
										});
									}
								});
							}
						});
					} else {
						for (let i = 0; i < back3.result.length; i++) {
							const element = back3.result[i];
							var jsons = JSON.parse(element.optionValue);
							jsons.id = element.id;
							if (element.optionKey === 'map') {
								this.$set(this.pointData, 0, jsons);
							} else if (element.optionKey === 'unity') {
								this.$set(this.pointData, 1, jsons);
							}
						}
					}
				}
			});
		},
		// 左边列表点击
		handleNodeClick (data, node) {
			if (!data.children) {
				this.rightShow = true;
				this.updateInfo(data);
				if (data.type === 'map' || data.typeId === 'map') {
					this.isModel = false;
					this.isTip = false;
				} else {
					this.isModel = true;
					this.isTip = true;
				};
				this.nodeInfoData = node.parent.data;
			} else {
				this.rightShow = false;
				this.nodeInfoData = data;
			};
			this.isShowColor('info');
		},
		// 更新详情
		updateInfo (data) {
			for (var i in data) {
				this.pointInfo[i] = data[i];
			};
			this.pointInfo.photo = `${BASE_URL}/img/${data.photo}`;
			this.pointInfo.model = data.model ? data.model : '';
			this.pointInfo.tip = data.model ? data.tip : '';
			this.styleColor = `width:40px;height:40px;background:${this.pointInfo.color}`;
		},
		// 弹框颜色的显示隐藏
		isShowColor (type) {
			if (type === 'info') {
				if (this.pointInfo.type === '面') {
					this.isColor = true;
					this.isWidth = true;
				} else {
					this.isColor = false;
					if (this.pointInfo.type === '线') {
						this.isWidth = true;
					} else {
						this.isWidth = false;
					}
				}
			} else {
				if (this.addInfo.type === '面') {
					this.isColor2 = true;
					this.isWidth2 = true;
				} else {
					this.isColor2 = false;
					if (this.addInfo.type === '线') {
						this.isWidth2 = true;
					} else {
						this.isWidth2 = false;
					}
				}
			}
		},
		// 选择模型的回调
		getNodeInfo (node) {
			if (node.title) {
				this.modelInfo = node;
			} else {
				this.modelInfo = '';
			}
		},
		// 取消选择
		closeModel (done) {
			this.modeldialog = false;
			this.modelInfo = '';
		},
		// 保存模型
		saveModel () {
			this.modeldialog = false;
			this.addInfo.model = this.modelInfo;
		},
		// 选择气泡的回调
		getTipInfo (node) {
			if (node.name) {
				this.tipInfo = node;
			} else {
				this.tipInfo = '';
			}
		},
		// 取消选择
		closeTip (done) {
			this.tipdialog = false;
			this.tipInfo = '';
		},
		// 保存气泡
		saveTip () {
			this.addInfo.tip = this.tipInfo;
			this.tipdialog = false;
		},
		// 添加信息点弹框
		append (data, node, isEdit) {
			if (data.istype) {
				this.dialogVisible = true;
				this.resetForm('typeNode');
				this.typeNode = {
					name: '',
				};
				this.typeNodeData = data;
			} else {
				this.addDialog = true;
				if (data.type === 'map' || data.typeId === 'map') {
					this.isModel = false;
					this.isTip = false;
				} else {
					this.isModel = true;
					this.isTip = true;
				}
				this.resetForm('addInfo');
				// 编辑信息
				if (isEdit) {
					this.isEdit = true;
					for (var i in data) {
						this.addInfo[i] = data[i];
					};
					this.addInfo.photo = `${BASE_URL}/${data.photo}`;
					this.$set(this.fileList, 0, { 'name': data.photo, 'url': `${BASE_URL}/img/${data.photo}`, });
				} else {
					// 添加信息
					this.isEdit = false;
					this.addInfo = {
						type: '点',
						id: null,
						name: '',
						model: { src: null, },
						tip: { src: null, },
						photo: '',
						color: '',
					};
					this.fileList = [];
				}
			};
		},
		// 删除信息点
		remove (node, data) {
			this.$confirm('此操作将删除此信息，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				if (node.data.children && node.data.children.length > 0) {
					this.$message.error('请先删除子节点！');
				} else {
					var parent = node.parent;
					const children = parent.data.children || parent.data;
					const index = children.findIndex(d => d.id === data.id);
					children.splice(index, 1);
					if (!parent.data.istype) {
						parent = parent.parent;
					};
					var param = {
						'id': parent.data.id,
						'optionKey': parent.data.istype,
						'optionValue': parent.data.istype === 'map' ? JSON.stringify(this.pointData[0]) : JSON.stringify(this.pointData[1]),
					};
					plan.remote.ajaxPost(`${BASE_URL}/option/upOptionById/${parent.data.id}`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							this.$message.success('删除成功');
							this.closeDialog('typeNode');
						}
					});
				}
			}).catch(() => {
			});
		},
		// 添加信息点
		submitAdd (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.addData = data;
					if (this.fileList.length > 0) {
						this.ajaxSubmit(this.fileList[0].name);
					} else {
						this.submitUpload();
					}
				};
			});
		},
		// 添加类型提交
		submitForm (formName, data) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (formName !== 'typeNode') {
						if (!this.$refs.nodeInfoname.currentValue || this.$refs.nodeInfoname.currentValue === '') {
							this.$message.error('请填写名称');
							return;
						};
					};
					const newChild = { id: this.$newGuid(), thisId: data.id, name: this.typeNode.name, type: data.istype, children: [], };
					if (!data.children) {
						this.$set(data, 'children', []);
					}
					data.children.push(newChild);
					var param = {
						'id': data.id,
						'optionKey': data.istype,
						'optionValue': data.istype === 'map' ? JSON.stringify(this.pointData[0]) : JSON.stringify(this.pointData[1]),
					};
					plan.remote.ajaxPost(`${BASE_URL}/option/upOptionById/${data.id}`, JSON.stringify(param), (back) => {
						if (back.code === 200) {
							this.$message.success('添加成功');
							this.closeDialog('typeNode');
						}
					});
				} else {
					return false;
				}
			});
		},
		// 接口更新
		ajaxSubmit (photo) {
			var data = this.addData;
			const newChild = {
				type: this.addInfo.type,
				id: this.isEdit ? this.addInfo.id : this.$newGuid(),
				thisId: data.thisId,
				typeId: data.typeId ? data.typeId : data.type,
				name: this.addInfo.name,
				model: this.addInfo.model,
				tip: this.addInfo.tip,
				photo: photo,
				color: this.addInfo.color,
				width: this.addInfo.width,
			};
			if (!data.children) {
				this.$set(data, 'children', []);
			};
			if (this.isEdit) {
				const index = data.children.findIndex(d => d.id === newChild.id);
				data.children.splice(index, 1, newChild);
			} else {
				data.children.push(newChild);
			};
			var params = {
				'id': data.thisId,
				'optionKey': data.type,
				'optionValue': data.type === 'map' ? JSON.stringify(this.pointData[0]) : JSON.stringify(this.pointData[1]),
			};
			plan.remote.ajaxPost(`${BASE_URL}/option/upOptionById/${data.thisId}`, JSON.stringify(params), (back) => {
				if (back.code === 200) {
					this.updateInfo(newChild);
					this.closeDialog('addInfo');
					this.$message.success('操作成功');
				} else {
					const index = data.children.findIndex(d => d.id === newChild.id);
					data.children.splice(index, 1);
				}
			});
		},
		// 上传前校验
		beforeAvatarUpload (file) {
			var fd = new FormData();
			fd.append('file', file);
			plan.remote.ajaxUpload(`${BASE_URL}/option/uploadImg`, fd, (back) => {
				if (back.code === 200) {
					this.ajaxSubmit(back.result);
				}
			});
			return false;
		},
		// 移除上传文件
		handleRemove (file, fileList) {
			this.fileList = fileList;
		},
		// 上传视图
		handlePictureCardPreview (file) {
			this.dialogImageUrl = file.url;
			this.uploadVisible = true;
		},
		// 上传文件
		submitUpload () {
			this.$refs.upload.submit();
		},
		// 显示添加编辑按钮
		renderContent (h, { node, data, store, }) {
			if (!data.children) {
				return (
					<span class='custom-tree-node'>
						<span>{node.label}</span>
						<span>
							<el-button size='mini' type='text' on-click={ () => this.append(data, node, 1) }><i class="el-icon-edit-outline" title="编辑"></i></el-button>
							<el-button size='mini' type='text' on-click={ () => this.remove(node, data) }><i class="el-icon-circle-close-outline" title="删除"></i></el-button>
						</span>
					</span>
				);
			} else if (data.istype) {
				return (
					<span class='custom-tree-node'>
						<span>{node.label}</span>
						<span>
							<el-button size='mini' type='text' on-click={ () => this.append(data) }><i class="el-icon-circle-plus-outline" title="添加"></i></el-button>
						</span>
					</span>
				);
			} else {
				return (
					<span class='custom-tree-node'>
						<span>{node.label}</span>
						<span>
							<el-button size='mini' type='text' on-click={ () => this.append(data, node) }><i class="el-icon-circle-plus-outline" title="添加"></i></el-button>
							<el-button size='mini' type='text' on-click={ () => this.remove(node, data) }><i class="el-icon-circle-close-outline" title="删除"></i></el-button>
						</span>
					</span>
				);
			}
		},
		// 关闭弹框
		closeDialog (formName) {
			this.addDialog = false;
			this.dialogVisible = false;
			if (formName === 'addInfo') {
				this.$refs.upload.clearFiles();
			};
		},
		// 重置表单
		resetForm (formName) {
			if (this.$refs[formName] !== undefined) {
				if (formName === 'addInfo') {
					this.$refs.upload.clearFiles();
				};
			};
		},
	},
	watch: {
		'addInfo.type': 'isShowColor',
	},
};
</script>

<style lang="scss" scoped>
	.left{
		float:left;
	}
	.right{
		float:right;
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
	}
	.right_con{
		width:49%;
		padding:1%;
		text-align: left;
		.fix2{
			line-height:55px;
			height:55px;
		}
		.point_info > p{
			overflow: hidden;
			label{
				width:180px;
				text-align: right;
				margin-right:10px;
				float:left;
				line-height: 40px;
			}
			span{
				float:left;
				line-height: 40px;
				img{
					height:50px;
				}
			}
		}
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
</style>
