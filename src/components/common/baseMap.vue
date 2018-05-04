<template>
	<section class="main">
		<div id="content"></div>
	</section>
</template>

<script>
import BMap from 'BMap';
export default {
	data () {
		return {
			mapSite: {
				lng: '116.404',
				lat: '39.915',
			},
		};
	},
	props: ['info'],
	mounted () {
		this.initMap();
	},
	methods: {
		initMap () {
			// 如果有位置信息
			if (this.info) {
				var nodeMapSite = JSON.parse(this.info);
				this.mapSite = {
					lng: nodeMapSite[0],
					lat: nodeMapSite[1],
				};
			} else {
				this.mapSite = {
					lng: '116.404',
					lat: '39.915',
				};
			};
			let map = new BMap.Map('content');
			let point = new BMap.Point(this.mapSite.lng, this.mapSite.lat);
			map.centerAndZoom(point, 15);
			map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
			// var icon = new BMap.Icon('/static/img/markers_new2_4ab0bc5.png', new BMap.Size(21, 32), {
			// 	imageOffset: new BMap.Size(-227, -189),
			// });
			var mkr = new BMap.Marker(point, {
				// icon: icon,注释的为自定义图片标注
			});
			map.addOverlay(mkr);
			// mkr.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
			mkr.enableDragging();
			mkr.addEventListener('dragend', (e) => {
				this.mapSite = {
					lng: e.point.lng,
					lat: e.point.lat,
				};
				this.$emit('mapSite', [this.mapSite.lng, this.mapSite.lat]);
			});
		},
	},
	watch: {
		'info': 'initMap',
	},
};
</script>

<style lang='scss' scoped>
	.main, #content{
		width:100%;
		height:520px;
		position: relative;
	}
</style>
