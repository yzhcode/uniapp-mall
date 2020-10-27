/*
 * @Author: yzh
 * @Date: 2020-08-25 14:26:49
 * @Description: 用户信息
 */
import qs from 'qs';


function initState() {
	return {
		phoneNumber: '',	// 账号
		addressList:[],		// 收货地址
		// 订单信息
		orderList:[{
			name:'待付款',
			productList:[],
		},{
			name:'待收货',
			productList:[],
		},{
			name:'待评价',
			productList:[],
		},{
			name:'退换货',
			productList:[],
		}],
		points:0,			// 积分
		coupon:[],			// 优惠券
		collection:[],		// 产品收藏(删除的商品怎么办)
		history:[], 		// 浏览足迹(删除的商品怎么办)
		
		ShoppingCart:[],		// 购物车
	}
}

const state = initState();

const getter = {
    getUserInfo: (state) => (key) => {
        console.log('store get user :>> ', [key, state[key]]);
        return state[key];
    },
}

const mutations = {
    SET_USER_INFO: (state, config) => {
        // 遍历config，设置对应的值到state中
        console.log('store set user :>> ', config);
        for(let key in config){
            if (state.hasOwnProperty(key)) {
                let value = config[key];
                if (value) {
                    state[key] = value;
                }
            }
        }
    },
	TO_LOGIN: (state, config) => {
	    // 清空用户相关信息，跳转到登录页面
		resetUser();
		let params = qs.stringify(config, {
			arrayFormat: 'brackets'
		})
		let url = '/pages/login/login2' + '?' + params;
		console.log('重定向地址: ', url);
		let ret = true;
		
		uni.redirectTo({
			url: url,
			success: (res) => {
				console.log('重定向login成功');
				ret = true;
			},
			fail: (err) => {
				console.error('重定向login失败: ',err);
				ret = false;
			}
			
		});
		console.log('重定向结束: ', url);
		return ret;
	}
}

function resetUser() {
	
	let rawdata = initState();
	Object.assign(state, rawdata);	// 清空用户设置
	
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
	let curParam = routes[routes.length - 1].options;
	// let curRoute2  = app.$mp.page.route;
	console.log("准备去登录，当前页面:",curRoute,"--参数:",JSON.stringify(curParam));
	
	let redirect = encodeURIComponent(curRoute);
	let isReLaunch = true; // 不能返回了
	uni.reLaunch({
	   url: '/pages/login/login?isReLaunch=true&redirect =' + redirect
	});
}

function mutationsCallback(ret, obj, resolve, reject)
{
	if (ret) {
		resolve(obj);
	} else {
		reject(obj);
	}
}

const actions = {
    /**
     * @description: 
     *      设置用户信息
     *      如果通过dispatch调用，是自动异步操作，页面上不知道什么时候完成，
     *      如果需要在完成或者错误时做响应，请使用带callback的接口
     * @param {type} 
     * @return {成功返回null， 错误返回对应字符串} 
     */
    setUserInfo({ commit, state }, config) {
        commit('SET_USER_INFO', config);
    },

    /**
     * @description: 
     *      带回调setUserInfo，完成或者发生错误时，外部可以做出响应，用法举例
     *      store.dispatch('user/setUserInfoWithCallback', config).then(res => {
                store设置完成
            });
     * @param {type} 
     * @return {type} 
     */
    setUserInfoWithCallback({ commit, state }, config) {
        return new Promise((resolve, reject) => {
            commit('SET_USER_INFO', config)
            resolve(config);
        });
    },
	
	toLogin({ commit, state }, config) {
	    let ret = commit('TO_LOGIN', config);
		console.log('toLogin 完毕:',ret);
		uni.showToast({
			title:'完毕'
		})
		
	},
	toLoginWithCallback({ commit, state }, config) {
	    return new Promise((resolve, reject) => {
	        commit('SET_USER_INFO', config)
	        resolve(config);
	    });
	},
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}