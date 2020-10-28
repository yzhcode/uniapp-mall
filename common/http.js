/*
	http请求封装，包括拦截，重定向等通用操作
*/

import qs from 'qs';
import Request from 'luch-request' // 下载的插件
import store from '@/store'
import print from '@/common/log.js'

let http = new Request();
http.setConfig((config) => {
	print.log('config:', config);
	/* #ifndef H5 */
	config.baseURL = 'http://10.133.17.56:11008'; //H5不用这个，用代理
	/* #endif */
	config.header = {
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		...config.header
	}
	config.withCredentials = true
	return config
})

http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */

	// if ((config.method).toLowerCase() === 'post') {
	// 	config.data = qs.stringify(config.data, {
	// 		arrayFormat: 'brackets'
	// 	})
	// } else if ((config.method).toLowerCase() === 'get') {
	// 	config.data = {
	// 		timestamp: new Date().getTime(), //时间戳
	// 		...config.data
	// 	}
	// }

	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	return config
}, (error) => {
	return Promise.reject(error)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	print.log('response拦截：', response);
	if (response.statusCode === 200) {
		if (response.data.result == "noauth") {
			toLogin(); // 重定向到登录页面
			return Promise.reject(response);
		} else {
			return response;
		}
	} else {
		print.error('response拦截到状态错误: ', response)
		return Promise.reject(response);
	}
}, (error) => { // 请求错误做点什么。可以使用async await 做异步操作
	print.error('response拦截到错误: ', error)
	return Promise.reject(error)
});

// export default http

let toLogin = function() {
	store.dispatch('user/toLogin').then(res => {
		print.log('设置用户成功 :>> ');
	}).catch(error => {
		print.error('设置用户失败 :>> ');
	});
}

/* return Promise*/
export function POST(url, params) {
	return http.post(url, params);
}

/* return Promise*/
export function GET(url, params) {
	return http.get(url, params);
}
