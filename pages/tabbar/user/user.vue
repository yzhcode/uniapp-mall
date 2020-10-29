<template>
	<view>
		<u-button type="primary" @click="logout">退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout: function() {
				this.$api.userLogout().then(res => {
					console.log('我的 logout 成功');
				}).catch(error => {
					console.log('我的 logout 失败');
				});
			},
		}
	}
</script>

<style>

</style>
