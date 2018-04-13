<template>
	<div id="admin" :class="$store.state.aside?'close':''">
		<div class="content">
			<aAside/>
			<div class="main">
				<aHeader/>
				<div class="br_nav">
					<breadCrumb />
				</div>
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import aHeader from './aHeader.vue';
import aAside from './aAside.vue';
import breadCrumb from './breadcrumb.vue';
export default {
	name: 'admin',
	components: { aHeader, aAside, breadCrumb, },
};
</script>

<style lang="scss" scoped>
	#admin{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.main {
		position: absolute;
		top: 0;
		left: 210px;
		right: 0;
		bottom: 0;
		transition: all .3s
	}
	.close .main{
		left:60px;
	}
	.br_nav{
		padding:16px 10px;
	}
</style>
