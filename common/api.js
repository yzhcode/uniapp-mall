/*
	网络请求接口列表，所有网络请求放这里
*/

import {POST} from '@/common/http.js'
import {GET} from '@/common/http.js'
import print from '@/common/log.js'
import store from '@/store'
// import http from '@/network/http'
// Vue.use(http)
// import md5 from 'js-md5'

export default {
	/*
		两种结构：
		haveCallbackFun: 接口中需要处理then和catch，处理完了内部的回调之后，处理外部回调
		noCallbackFun: 接口中不需要处理then和catch，只需处理内部的回调
	*/
	
	haveCallbackFun(param1, param2) {
		return POST('url',{param1:param1, param2:param2}).then(res => {
			
		}).catch(error => {
			
		});
	},
	noCallbackFun(param1, param2) {
		return new Promise((resolve, reject) => {
			POST('url',{param1:param1, param2:param2}).then(res => {
				// 处理结果
				let ret = true;
				if (ret) {
					resolve(res);
				} else {
					reject(res);
				}
				
			}).catch(error => {
				reject(error);
			});
		})
	},
	/*
		用户登录
	*/
    userLogin(username, password, logintype) {
		return new Promise((resolve, reject) => {
			POST("https://2d10f519-d95e-46d4-9fe3-2a6712914d56.bspapp.com/http/login",{
				username:username,
				password:password,
				logintype:logintype
			}).then(res => {
				print.info('API-->登录响应: ', res.data);
				if (res && res.data && res.data.result) {
					if (res.data.result === 'success') {
						print.info("API-->登录成功");
						resolve(res.data);
					} else {
						print.error('API-->登录失败: ',res.data.msg);
						reject(res.data.msg);
					}
				} else {
					print.error('API-->登录反馈数据格式错误');
					reject('登录反馈数据格式错误');
				}
				
			}).catch(error => {
				print.error("API-->",error);
				reject(error);
			});
		})
	},
	userLogout() {
		return new Promise((resolve, reject) => {
			POST("https://2d10f519-d95e-46d4-9fe3-2a6712914d56.bspapp.com/http/logout",{
				
			}).then(res => {
				print.info('API-->退出登录响应: ', res.data);
				if (res && res.data && res.data.result) {
					if (res.data.result === 'success') {
						print.info("API-->退出登录成功");
						
						store.dispatch('user/logoutWithCallback',{}).then(res => {
							console.log('API-->清空用户信息成功');
							resolve(res.data);
						}).catch(error => {
							reject(error);
						});
		
					} else {
						print.error('API-->退出登录失败: ',res.data.msg);
						reject(res.data.msg);
					}
				} else {
					print.error('API-->退出登录，反馈数据格式错误');
					reject('登录反馈数据格式错误');
				}
				
			}).catch(error => {
				print.error(error);
				reject(error);
			});
		})
	}
}


// export default {
    /**
     * @description: 用户登录
     * @param {username:用户名, password: 密码} 
     * @return {type} 
     */
  //   userLogin(username, password) {
		// let request = POST("https://2d10f519-d95e-46d4-9fe3-2a6712914d56.bspapp.com/http/login",{
		// 	username:username,
		// 	password:password,
		// 	logintype:'wx'
		// }).then(res => {
		// 	console.log('success: ', res);
		// }).catch(error => {
		// 	console.log('error: ', error);
		// })
		
        // return new Promise((resolve, reject) => {
        //     return http({
        //         url: '/Web/WaterAffairs/login?action=post',
        //         method: 'post',
        //         data: {
        //             username: username,
        //             password: md5password,
        //             cgi_type: 1
        //         }
        //     }).then(res => {
        //         var jsonData = res.data;
        //         if (jsonData.result == "success") {
        //             let data = jsonData.data;
        //             store.dispatch('user/setUserInfoWithCallback', {
        //                 'userId': data.user_id,
        //                 'name': data.username,
        //                 'role': data.role,
        //                 'roleType': data.role_type,
        //                 'lastLoginTime': data.lastlogintime
        //             }).then(res => {
        //                 console.log('设置用户成功 :>> ');
        //             }).catch(error => {
        //                 console.log('设置用户失败 :>> ');
        //             });
                    
        //             console.log('api: 登陆成功');
        //             resolve();
        //         } else {
        //             reject(jsonData.errmsg)
        //         }
        //     })
        // });
    // },

    /**
     * @description: 用户注销
     * @param {type} 
     * @return {type} 
     */
    // userLogout() {
    //     console.log("api: 开始登出...");
    //     return new Promise((resolve, reject) => {
    //         return http({
    //             url: '/Web/WaterAffairs/login_out?action=delete',
    //             method: 'get'
    //         }).then(res => {
    //             let json = res.data;

    //             console.log("api: 登出结束 >> ", json);
    //             if (json.result == "success") {
    //                 store.dispatch('user/invalidUserAttr').then(() => {
    //                     resolve(json);
    //                 });
    //             } else {
    //                 reject(json.errmsg)
    //             }
    //         })
    //     });
    // }
// }
