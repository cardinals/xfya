<template>
	<div class="clearfix">
		<div class="tipmsg">
			<el-alert title="" type="info" :closable="false" show-icon>
				系统更新必须<span class="red">连接互联网</span>！<span class="red">并依次更新模型库，主程序</span>！
			</el-alert><br />
            <el-alert title="" type="info" :closable="false" show-icon>
				更新之前请关闭其他所有页面！更新过程中请<span class="red">勿做任何操作</span>！
			</el-alert><br />
            <el-alert title="" type="info" :closable="false" show-icon>
				更新之后请重新启动预案系统！并<span class="red">清除浏览器缓存和系统缓存</span>！
			</el-alert><br />
            <fieldset>
				<legend>更新日志</legend>
				<div class="text-right">
					<a href="/updatelog.html" class="btn btn-primary btn-sm" target="_blank"><el-button type="primary">查看更新日志</el-button></a>
				</div>
			</fieldset>
            <fieldset>
				<legend>模型库更新</legend>
				<p>当前模型库版本：20180313</p>
				<p>最新模型库版本：plan_lib_shiyong_20180313，<a href="http://plan.3dmomoda.com/version/update_lib_log.html?2018-04-25 15:19:48" target="_blank" class="red">查看更新内容</a>
				</p>
				<div class="text-right">
					<a href="javascript:;" id="updatelib" class="btn btn-primary btn-sm"><el-button type="primary">开始更新</el-button></a>
				</div>
			</fieldset>
            <fieldset>
				<legend>主程序更新</legend>
				<p>当前主程序版本：version-beta-1.9.1</p>
				<p>最新主程序版本：version-beta-1.9.1
				</p>
				<div class="text-right">
					<a href="javascript:;" class="btn btn-primary btn-sm disabled"><el-button type="primary">暂无更新</el-button></a>
				</div>
			</fieldset>
		</div>
		<div class="con">
		</div>
	</div>
</template>

<script>
import Tree from '../common/tree.vue';
import Page from '../common/pagination.vue';
export default {
	components: { Tree, Page, },
	data () {
		return {
		};
	},
	mounted () {
	},
	methods: {
	},
	watch: {
	},
};
</script>

<style lang="scss" scoped>
.red{
    color:red;
}
.tipmsg{
	width:80%;
    text-align: center;
	.el-alert{
		width:100%;
	}
    fieldset {
        padding: 10px 25px;
        margin: 15px 0px;
        border: 1px solid #dddddd;
        background-color: #fafafa;
        text-align: left;
    }
    fieldset legend {
        display: block;
        width: auto;
        padding: 3px 10px;
        margin-bottom: 0;
        font-size: 15px;
        line-height: inherit;
        color: #333;
        border: 1px solid #ddd;
        background-color: #ffffff;
    }
    .text-right {
        text-align: right;
    }
}
.con{
	width:96%;
	padding:2%;
}
</style>
