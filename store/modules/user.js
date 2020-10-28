/*
 * @Author: yzh
 * @Date: 2020-08-25 14:26:49
 * @Description: 用户信息
 */
// import qs from 'qs';
// import print from '@/common/log.js'

import {
	mutationsCallback,
	mutationParseParams,
	mutationSaveObj,
	actionFunTemplate,
	actionWithCallbackFunTemplate
} from '@/store/storeHelp.js';

function initState() {
	return {
		phoneNumber: '', // 手机号码
		username: '', // 账号
		password: '', // 密码
		loginType: '', // 登录方式

		addressList: [], // 收货地址
		// 订单信息
		orderList: [{
			name: '待付款',
			productList: [],
		}, {
			name: '待收货',
			productList: [],
		}, {
			name: '待评价',
			productList: [],
		}, {
			name: '退换货',
			productList: [],
		}],

		points: 0, // 积分
		coupon: [], // 优惠券
		collection: [], // 产品收藏(删除的商品怎么办)
		history: [], // 浏览足迹(删除的商品怎么办)

		ShoppingCart: [], // 购物车
	}
}

function resetUser() {
	let rawdata = initState();
	Object.assign(state, rawdata); // 清空用户设置
}

const state = initState();

const getter = {
	getUserInfo: (state) => (key) => {
		return state[key];
	},
}

const mutations = {
	SET_USER_INFO(state, params){
		let {
			config,
			callback
		} = mutationParseParams(params);
		console.log('SET_USER_INFO :>> ', config, 'callback :>> ', callback);
		mutationSaveObj(state, config);
		mutationsCallback(callback, true, '设置用户信息成功');
	},

	LOGOUT(state, params){
		// 获取回调key和配置
		let {
			config,
			callback
		} = mutationParseParams(params);
		console.log('LOGOUT-->config:', JSON.stringify(config), 'callback :>> ', callback);

		// 清空配置
		resetUser();

		// 开始跳转
		let redirect = config.redirect;
		let isReLaunch = config.isReLaunch ? true : false;
		if (!redirect) {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
			let curParam = routes[routes.length - 1].options;

			redirect = curRoute;//encodeURIComponent(curRoute);
		}

		let url = '/pages/login/login?isReLaunch=' + (isReLaunch ? "true" : "false");
		if (redirect) {
			url += '&redirect=/' + redirect;
		}
		
		console.log('LOGOUT-->即将重定向登录页面: ', url);
		let ret = true;
		uni.redirectTo({
			url: url,
			success: (res) => {
				console.log('LOGOUT-->重定向login成功');
				ret = true;
			},
			fail: (err) => {
				console.error('LOGOUT-->重定向login失败: ', err);
				ret = false;
			}

		});
		// 有回调则把return结果放到return缓存中
		mutationsCallback(callback, ret, ('重定向' + (ret ? "成功" : "失败") + ':' + url))
	}
}

const actions = {
	/**
     * @description: 用法
     this.$store.dispatch('user/logout',config).finally(() => {
     	console.log("完成，但不知道成功还是失败");
     });
	 或者
	 this.$store.dispatch('user/logout',config).then(res => {
	 	console.log("完成，但不知道成功还是失败");
	 });
	 
     * @param {type} 
     * @return {成功返回null， 错误返回对应字符串} 
     */
	setUserInfo({
		commit,
		state
	}, config) {
		actionFunTemplate(commit, state, config, 'SET_USER_INFO')
	},

	/**
     * @description: 
     *      带回调setUserInfo，完成或者发生错误时，外部可以做出响应，用法举例
     *      store.dispatch('user/setUserInfoWithCallback', config).then(res => {
                console.log("成功");
            }).catch(error => {
				console.log("失败");
			});
     * @param {type} 
     * @return {type} 
     */
	setUserInfoWithCallback({
		commit,
		state
	}, config) {
		return actionWithCallbackFunTemplate(commit, state, config, 'setUserInfo', 'SET_USER_INFO');
	},

	logout({
		commit,
		state
	}, config) {
		actionFunTemplate(commit, state, config, 'LOGOUT')
	},

	logoutWithCallback({
		commit,
		state
	}, config) {
		return actionWithCallbackFunTemplate(commit, state, config, 'logout', 'LOGOUT');
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
