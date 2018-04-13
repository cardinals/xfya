import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
	aside: false,
	breadListState: [
		{
			name: '首页',
			path: '/',
		}
	],
};
const mutations = {
	add (state) {
		state.count += 1;
	},
	reduce (state) {
		state.count -= 1;
	},
	breadListMutations (getters, list) {
		getters.breadListState = list;
		sessionStorage.setItem('breadListStorage', list);
	},
};
const getters = {
	breadListState () {
		return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
	},
};
export default new Vuex.Store({
	state, mutations, getters,
});
