<template>
	<div class="clearfix setting">
        <div class="tip">
            <el-alert title="系统配置管理" type="info" :closable="false" show-icon>
            </el-alert>
        </div>
        <div class="con left">
            <el-tabs tab-position="left" style="height: auto;">
                <el-tab-pane label="预案系统升级"><setUpgrade /></el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            </el-tabs>
        </div>
	</div>
</template>

<script>
import setUpgrade from './setUpgrade.vue';
export default {
	name: 'setting',
	components: { setUpgrade, },
};
</script>

<style lang="scss">
    .setting {
        width:100%;
        .tip{
            margin-bottom:20px;
        }
        .con{
            width:100%;
        }
        .el-tabs--left .el-tabs__header.is-left{
            width:20% !important;
            margin-right:50px;
        }
        .el-tabs__item{
            line-height: 50px;
            height:50px;
            font-size:16px;
            font-weight: bold;
        }
    }
</style>
