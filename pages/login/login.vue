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
	
	// var  graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				username:'admin',
				password:'2',
				passwordmd5:'',
				isReLaunch:false,
				redirect:''
			}
		},
		mounted () {
			
		},
		onLoad(options) {
			this.isReLaunch = options.isReLaunch;
			this.redirect = options.redirect;
			console.log('onLoad:',options);
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
				this.login(e.detail.value.username, e.detail.value.password);
			},
			formReset: function(e) {
				console.log('清空数据');
				this.username = '';
				this.password = '';
			},
			login: function(username, password) {
				// let passwordmd5 = md5(password);
				let configdata = {username: username, password: password, cgi_type:1};
				let self = this;
				this.$api.userLogin(username, password).then(res => {
					
					uni.showToast({
						title:'登录成功'
					});
					uni.redirectTo({
						url:(self.redirect && self.redirect.length > 0)?self.redirect:'/pages/index/index',
						fail: (error) => {
							console.log('重定向错误:',error);
						},
						success: (response) => {
							console.log('重定向成功');
						}
					})
					// self.loadArea();
				}).catch(err => {
					
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
