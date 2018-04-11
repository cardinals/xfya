<template>
	<section class="main">
		<div class="left-panel">
			<div class="searchbox clearfix">
				<div id="searchbox-container">
					<div id="sole-searchbox-content" class="searchbox-content is-complete">
						<input id="sole-input" class="searchbox-content-common" type="text" name="word" autocomplete="off" maxlength="256" placeholder="搜预案" value="">
						<div class="input-clear" title="清空" style="display: none;"></div>
						<div class="searchbox-content-button right-button loading-button cancel-button" title="清空" data-tooltip="1"></div>
					</div>
				</div>
				<div class="input-clear" title="清空" style="display: none;"></div>
				<button id="search-button" title="搜索" data-tooltip="2"></button>
			</div>
			<div id="cards-level1" class="cardlist">
				<div id="card-7" class="card animated-card" data-fold="共找到1个搜索结果" style="z-index: 100; max-height: 844px;">
					<div class="poi-wrapper">
						<div id="unlogined" style="display: none;"></div>
						<div class="poi-filter">
							<div id="caterFilter" :class="page_type">
								<ul class="toolbar clearfix">
									<li class="tool-item city-item" @click="page_type!='city-panel' ? page_type='city-panel' : page_type=''">
										<label>所有中队</label>
										<i class="icon-cater arrow"></i>
									</li>
									<li class="tool-item  tag-item  botn-line" @click="page_type!='tag-panel' ? page_type='tag-panel' : page_type=''">
										<label>预案类型</label>
										<i class="icon-cater arrow"></i>
									</li>
									<li class="tool-item  sort-item" @click="page_type!='sort-panel' ? page_type='sort-panel' : page_type=''">
										<label>等级排序</label>
										<i class="icon-cater arrow"></i>
									</li>
								</ul>
								<!-- 中队选择 -->
								<div class="select-panel-city clearfix">
									<div class="hd-list-wrap">
										<ul class="areaList hd-list">
											<li v-for="(item,$index) in city_list" :key="$index" @mouseover="select_city(false, $index) " :class="{areaItem: true, active: $index==selectItem}" data-value="全部">
												<span class="label">{{item.name}}</span>
											</li>
										</ul>
									</div>
									<div id="bsAreaList">
										<ul class="bdList bd-list">
											<ul class="bdList bd-list">
												<li v-for="(item,$index) in bd_list_active" :key="$index">
													<a data-value="area:朝阳区" class="selectItem item" href="javascript:;">{{item}}</a>
												</li>
											</ul>
										</ul>
									</div>
								</div>
								<!-- 预案类型 -->
								<div class="select-panel-tag" id="select_panel_tag">
									<div class="hotel-filter-tag">
										<dl class="clearfix">
											<dt>
												<h2>类型</h2></dt>
											<dd>
												<ul class="tag-list">
													<li>
														<a class="selectItem item" href="javascript:;">全部</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型一</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型二</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型二</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型二</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型二</a></li>
													<li>
														<a class="selectItem item" href="javascript:;">类型二</a></li>
												</ul>
											</dd>
										</dl>
									</div>
								</div>
								<!-- 等级排序 -->
								<div class="select-panel-sort" id="select_panel_sort">
									<ul>
										<li>
											<a href="javascript:;" class="selectItem item">综合排序</a></li>
										<li>
											<a href="javascript:;" class="selectItem item">评分高到低</a></li>
										<li>
											<a href="javascript:;" class="selectItem item">价格低到高</a></li>
										<li>
											<a href="javascript:;" class="selectItem item">价格高到低</a></li>
									</ul>
								</div>
							</div>
						</div>
						<ul class="poilist">
							<li data-index="1" data-searchindex="0" class="search-item hotel-item">
								<div class="cf mb_5">
									<div class="col-l">
										<a href="javascript:void(0)" class="no no-1"></a>
									</div>
									<div class="col-r">
										<div class="mt_5 h_20">
											<a href="javascript:void(0)" class="camera-icon street-pano ml_5" data-index="1">&nbsp;</a></div>
										<div class="img-wrap">
											<a href="javascript:void(0)" data-index="1">
												<img src="/static/img/bg.jpg" style="width:71px;height:58px;">
											</a>
										</div>
									</div>
									<div class="ml_30 mr_90">
										<div class="row">
											<span>
												<a href="javascript:void(0)" class="n-blue" data-index="1">青岛中心假日酒店</a>
											</span>
										</div>
										<div class="row">
											<span>五级预案<i class="seperate">|</i>人员密集型</span>
										</div>
										<div class="row addr">
											<span class="n-grey" title="青岛市黄岛区中心街666号">青岛市黄岛区中心街666号</span>
										</div>
										<div class="row">
											<a class="detail ml_5" data-index="1">查看详情</a>
										</div>
									</div>
								</div>
							</li>
							<li data-index="2" data-searchindex="0" class="search-item hotel-item">
								<div class="cf mb_5">
									<div class="col-l">
										<a href="javascript:void(0)" class="no no-2"></a>
									</div>
									<div class="col-r">
										<div class="mt_5 h_20">
											<a href="javascript:void(0)" class="camera-icon street-pano ml_5" data-index="1">&nbsp;</a></div>
										<div class="img-wrap">
											<a href="javascript:void(0)" data-index="2">
												<img src="/static/img/bg.jpg" style="width:71px;height:58px;">
											</a>
										</div>
									</div>
									<div class="ml_30 mr_90">
										<div class="row">
											<span>
												<a href="javascript:void(0)" class="n-blue" data-index="2">青岛中心假日酒店</a>
											</span>
										</div>
										<div class="row">
											<span>五级预案<i class="seperate">|</i>人员密集型</span>
										</div>
										<div class="row addr">
											<span class="n-grey" title="青岛市黄岛区中心街666号">青岛市黄岛区中心街666号</span>
										</div>
										<div class="row">
											<a class="detail ml_5" data-index="2">查看详情</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div id="poi_page" class="poi-page">
							<p class="page">
								<span class="curPage">1</span>
								<span>
									<a href="javascript:void(0)" tid="secPageNum" onclick="Instance('TANGRAM_350').toPage(2);return false;">2</a></span>
								<span>
									<a href="javascript:void(0)" onclick="Instance('TANGRAM_350').toPage(3);return false;">3</a></span>
								<span>
									<a href="javascript:void(0)" onclick="Instance('TANGRAM_350').toPage(4);return false;">4</a></span>
								<span>
									<a href="javascript:void(0)" tid="toNextPage" onclick="Instance('TANGRAM_350').toPage(2);return false;">下一页&gt;</a>
								</span>
							</p>
						</div>
						<div class="poi-no-result"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="content"></div>
	</section>
</template>

<script>
import BMap from 'BMap'
export default {
	data () {
		return {
			page_type: '',
			selectItem: 0,
			city_list: [{'id': 0, 'name': '全部'}, {'id': 2, 'name': '朝阳中队'}, {'id': 3, 'name': '海淀中队'}],
			bd_list: [{'id': 0, 'name': ['全部', '建国门', '亚运村']}, {'id': 1, 'name': ['全部', '亚运村']}, {'id': 3, 'name': ['全部', '建国门']}],
			bd_list_active: null
		}
	},
	mounted () {
		this.initMap()
		this.bd_list_active = this.bd_list[0].name
	},
	methods: {
		select_city (item, index) {
			if (index || index === 0) {
				this.selectItem = index
			}
			this.bd_list_active = this.bd_list[index].name
		},
		initMap () {
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
.main, #content{
	width:100%;
	height:100%;
	position: relative;
}
@import '../assets/map.scss';
</style>
