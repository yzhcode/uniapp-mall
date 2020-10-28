
import {
	mutationsCallback,
	mutationParseParams,
	mutationSaveObj,
	actionFunTemplate,
	actionWithCallbackFunTemplate
} from '@/store/storeHelp.js';

const state = {
	scrollAd:[], 			// 顶部广告
    hotCategory: [], 		// 首页顶部的分类
    mainProductList:[], 	// 首页底部推荐
	
    productCategory:[],		// 产品分类
	
	// 其他商城展示信息
	
	timestamps:{},			// 商城数据的时间戳，可根据时间戳来判断是否加载新的信息
}

const getter = {
    getMallInfo: (state) => (key) => {
        return state[key];
    },
}

const mutations = {
    SET_MALL_INFO: (state, params) => {
		let {config, callback} = mutationParseParams(params);
		console.log('SET_MALL_INFO :>> ', config, 'callback :>> ', callback);
		mutationSaveObj(state, config);
		mutationsCallback(callback, true, '设置商城信息成功');
    }
}

const actions = {
	setMallInfo({ commit, state }, config) {
		actionFunTemplate(commit, state, config, 'SET_MALL_INFO')
	},
	
	setMallInfoWithCallback({ commit, state }, config) {
		return actionWithCallbackFunTemplate(commit, state, config, 'setMallInfo', 'SET_MALL_INFO');
	}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}