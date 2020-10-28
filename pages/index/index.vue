<template>
	<view class="content">
		<u-button type="primary" @click="logout">主要按钮</u-button>
		<uni-badge class="uni-badge-left-margin" text="1" />
		<uni-badge class="uni-badge-left-margin" text="2" type="primary" />
		<uni-badge class="uni-badge-left-margin" text="34" type="success" />
		<uni-badge class="uni-badge-left-margin" text="45" type="warning" />
		<uni-badge class="uni-badge-left-margin" text="123" type="error" />
		<uni-number-box :min="0" :max="9"></uni-number-box>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<image class="logo" :src="base64image"></image>
		<image class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603703422475&di=112bea5000d86d33237395596d680479&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-cdfd24d29b4f7c5bbdf38180715f4a95_hd.jpg"></image>
	</view>
</template>

<script>
	// var localCache = require('@/store/localCache.js');
	// let Base64 = require('js-base64').Base64;

export default {
	data() {
		return {
			title: 'Hello',
			base64image:'data:image/jpeg;base64,'
		};
	},
	onLoad() {
		// this.$log.error('log--', null, undefined)
		// this.$log2('log--', 'log---')

		this.getImage();
		this.setStorex();
		this.downjson();
		
		// localCache.getImageCache()
	},
	methods: {
		logout: function() {
			this.$api.userLogout().then(res => {
				console.log('index logout 成功');
			}).catch(error => {
				console.log('index logout 失败');
			});
		},
		downjson: function() {
			uni.request({
				url:"https://tcb-dnqcygsynda9lgkf2cb0a-0a732c.service.tcloudbase.com/cloudtest",
				success: (res) => {
					console.log('json:',res.data.data);
				},
				fail: (error) => {
					console.log('error:',error);
				}
			})
		},
		
		getImage: function() {
			var self = this;
			var key = 'image'
			var url = "https://7463-tcb-dnqcygsynda9lgkf2cb0a-0a732c-1303999145.tcb.qcloud.la/images/MacBeeCurtainBackgroundDarkModeImage@3x.png";
			
			uni.downloadFile({
				url: url,
				success: res => {
				
					if (res.statusCode === 200) {
						console.log('下载成功1:',res);
						this.base64image = res.tempFilePath
						console.log('下载成功:',this.base64image);
						uni.setStorage({
							key: key,
							data: res,
							success: function() {}
						});
					}
				}
			});
			
			var aaa = uni.getStorage({
				key: key,
				success: function(res) {
					this.base64image = this.base64image + res.data
					// let base = Base64.encode(res.data);
					// console.log('本地有数据:',base);
				},
				fail: function(res) {
					console.log('本地无数据，开始下载...');
					// 本地没有缓存 需要下载
					uni.downloadFile({
						url: url,
						success: res => {
	
							if (res.statusCode === 200) {
								// this.base64image = this.base64image + res.data
								console.log('下载成功:',base);
								uni.setStorage({
									key: key,
									data: res,
									success: function() {}
								});
							}
						}
					});
				}
			});
			
			console.log('store: ',aaa);
		}
	}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
