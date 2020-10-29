<template>
	<view style="background-color: #EEEEEE;">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">用户名</view>
					<input class="uni-input" name="username" placeholder="请输入姓名" :value="username"/>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>
					<input class="uni-input" name="password" placeholder="请输入密码" :value="password"/>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	// import {log2} from '@/common/log.js'
	// var  graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				username:'admin',
				password:'2',
				logintype:'phone',
				passwordmd5:'',
				isReLaunch:false,
				redirect:''
			}
		},
		mounted () {
			
		},
		onLoad(options) {
			this.isReLaunch = (options.isReLaunch === "true")?true:false;
			this.redirect = options.redirect;
			// log2('onLoad:',options);
			console.log('登录页加载, options:',JSON.stringify(options));
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
				this.login(e.detail.value.username, e.detail.value.password, 'phone');
			},
			formReset: function(e) {
				console.log('清空数据');
				this.username = '';
				this.password = '';
			},
			login: function(username, password, logintype) {
				// let passwordmd5 = md5(password);
				let self = this;
				this.$api.userLogin(username, password, logintype).then(res => {
					console.info('登录成功, 即将重定向页面: ',self.redirect);
					uni.switchTab({
						url:(self.redirect && self.redirect.length > 0)?self.redirect:'/pages/index/index',
						fail: (error) => {
							console.error('重定向错误:',error);
						},
						success: (response) => {
							console.debug('重定向成功');
						}
					})
					// self.loadArea();
				}).catch(err => {
					console.info('登录失败, 请重试');
				})
			}
		}
	}
</script>

<style lang="scss">
	// @import "../../common/uni.css";
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
