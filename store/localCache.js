/*
	获取image数据
	success: 成功后点回调function success(data){}
	fail: 失败后回调 function fail(error){}
*/
function getImageCache(url, success, fail) {
	uni.getStorage({
		key: key,
		success: function(res) {
			success(res.data);
		},
		fail: function(res) {
			console.log('本地无数据，开始下载...');
			// 本地没有缓存 需要下载
			uni.downloadFile({
				url: url,
				success: res => {
					if (res.statusCode === 200) {
						console.log('下载成功');
						success(res.data);
						uni.setStorage({
							key: key,
							data: res,
							success: function() {}
						});
					}
				},
				fail: (error) => {
					fail(error);
				}
			});
		}
	});
}

module.exports = {
	getImageCache: getImageCache
}

