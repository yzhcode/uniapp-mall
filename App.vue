<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let theme = this.$store.state.settings.theme;
			let role = this.$store.state.user.role;
			console.log('theme:', theme, '===role:',role);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
