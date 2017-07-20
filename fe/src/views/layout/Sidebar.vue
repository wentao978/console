<template>
	<el-menu mode="vertical" theme="dark" :unique-opened=true :default-active="$route.path">
		<sidebar-item :routes='permission_routers'></sidebar-item>
	</el-menu>
</template>

<script>
import {
	mapGetters
} from 'vuex';
import SidebarItem from './SidebarItem';
export default {
	components: {
		SidebarItem
	},
	computed: {
		...mapGetters([
			'permission_routers'
		])
	},
	created: function() {
		//   debugger;
		// console.log(this.$store.getters.permission_routers);
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
    min-height: 100%;
    border-radius: 0;
}
</style>
