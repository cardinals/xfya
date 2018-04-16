<template>
    <div>
		<div class="tipmsg">
			<el-alert
				title="角色权限管理"
				type="info"
				:closable="false"
				show-icon>
			</el-alert>
		</div>
		<div class="left_con left">
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
	</div>
</template>

<style lang="scss" scoped>
</style>
