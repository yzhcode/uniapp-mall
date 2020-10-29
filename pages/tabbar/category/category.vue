<template>
	<view>
		<u-button type="primary" @click="logout">触发没有登录</u-button>
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
					console.log('分类 logout 成功');
				}).catch(error => {
					console.log('分类 logout 失败');
				});
			},
		}
	}
</script>

<style>

</style>
