<template>
	<section class="main">
		<div class="left-panel">
			<div class="searchbox clearfix">
				<div id="searchbox-container">
					<div id="sole-searchbox-content" class="searchbox-content is-complete">
						<input id="sole-input" class="searchbox-content-common" type="text" name="word" autocomplete="off" maxlength="256" placeholder="搜预案"  v-model="keyword">
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
							<li v-for="(item, key) in planList" :key="key" :data-index="key" class="search-item hotel-item">
								<div class="cf mb_5">
									<div class="col-l">
										<a href="javascript:void(0)" :class="classKey(key)"></a>
									</div>
									<div class="col-r">
										<div class="img-wrap">
											<a href="javascript:void(0)" data-index="1">
												<img src="/static/img/bg.jpg" style="width:80px;height:62px;">
											</a>
										</div>
									</div>
									<div class="ml_30 mr_90">
										<div class="row">
											<span>
												<a href="javascript:void(0)" class="n-blue" :data-index="key">{{item.name}}</a>
											</span>
										</div>
										<div class="row">
											<span>{{item.planLevelId}}预案<i class="seperate">|</i>{{item.planTypeId}}</span>
										</div>
										<div class="row addr">
											<span class="n-grey" :title="item.descript">{{item.descript}}</span>
										</div>
										<div class="row">
											<a class="detail ml_5" :data-index="key">查看详情</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div id="poi_page" class="poi-page">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="pageNum"
								layout="total, sizes, prev, pager, next, jumper"
								:total="total">
							</el-pagination>
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
import BMap from 'BMap';
import Page from '../common/pagination.vue';
export default {
	components: { Page, },
	data () {
		return {
			page_type: '',
			keyword: '',
			selectItem: 0,
			planList: [],
			// 分页数据
			pageInfo: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				show: true,
			},
			city_list: [
				{
					'id': 0,
					'name': '全部',
				}, {
					'id': 2,
					'name': '朝阳中队',
				},
				{
					'id': 3,
					'name': '海淀中队',
				}
			],
			bd_list: [
				{
					'id': 0,
					'name': ['全部', '建国门', '亚运村'],
				},
				{
					'id': 1,
					'name': ['全部', '亚运村'],
				},
				{
					'id': 3,
					'name': ['全部', '建国门'],
				}
			],
			bd_list_active: null,
		};
	},
	mounted () {
		this.initMap();
		this.initPlanList();
		this.bd_list_active = this.bd_list[0].name;
	},
	methods: {
		// 初始化预案
		initPlanList (keyword) {
			var param = {
				'name': keyword, // 预案名称  选填
				'zhidui': '', // 支队名称  选填
				'pageNum': '1', // 当前页 必填
				'pageSize': '10', // 每页显示数量  必填
			};
			plan.remote.ajaxPost(`${BASE_URL}/plan/getPlanList`, JSON.stringify(param), (back) => {
				if (back.code === 200) {
					this.planList = back.result.list;
				}
			});
		},
		// 预案索引值
		classKey (key) {
			return `no no-${key + 1}`;
		},
		// 分页事件
		updatePageNum (val) {
			this.pageInfo.pageNum = val;
		},
		// 选择城市
		select_city (item, index) {
			if (index || index === 0) {
				this.selectItem = index;
			};
			this.bd_list_active = this.bd_list[index].name;
		},
		// 初始化地图
		initMap () {
			let map = new BMap.Map('content');
			let point = new BMap.Point(116.404, 39.915);
			map.centerAndZoom(point, 15);
			map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
			map.addOverlay(new BMap.Marker(point));
		},
	},
};
</script>

<style lang='scss' scoped>
.main, #content{
	width:100%;
	height:100%;
	position: relative;
}
@import '../../assets/css/map.scss';
</style>
