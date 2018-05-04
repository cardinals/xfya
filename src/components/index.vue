<template>
	<div id="index">
		<Header/>
		<div class="content">
			<div id="map">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './common/header.vue';
export default {
	name: 'index',
	components: { Header, },
};
</script>

<style lang='scss' scoped>
	#map {
		position: absolute;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
