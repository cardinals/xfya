<template>
	<div id="index">
		<Header/>
		<div class="content">
			<div id="map">
				<Map/>
			</div>
			<div class="main">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './header.vue'
import Map from './map.vue'
export default {
	name: 'index',
	components: { Header, Map }
}
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
