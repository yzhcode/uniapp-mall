<template>
	<view class="content">
		<u-button type="primary">主要按钮</u-button>
		<uni-badge class="uni-badge-left-margin" text="1" />
		<uni-badge class="uni-badge-left-margin" text="2" type="primary" />
		<uni-badge class="uni-badge-left-margin" text="34" type="success" />
		<uni-badge class="uni-badge-left-margin" text="45" type="warning" />
		<uni-badge class="uni-badge-left-margin" text="123" type="error" />
		<uni-number-box :min="0" :max="9"></uni-number-box>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
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
