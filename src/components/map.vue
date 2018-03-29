<template>
	<div id="content"></div>
</template>

<script>
import BMap from 'BMap'
export default {
	data () {
		return {}
	},
	mounted () {
		this.initMap()
	},
	methods: {
		initMap: function () {
			let map = new BMap.Map('content')
			let point = new BMap.Point(116.404, 39.915)
			map.centerAndZoom(point, 15)
			map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
			map.addOverlay(new BMap.Marker(point))
		}
	}
}
</script>

<style lang='scss' scoped>
#content{
	width:100%;
	height:100%;
}
</style>
