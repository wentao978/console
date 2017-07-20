<template>
	<el-menu class="navbar" mode="horizontal">
		<!-- <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger> -->
		<levelbar></levelbar>
		<!-- <ErrLog v-if="log.length>0" class="errLog-container" :logsList="log"></ErrLog> -->
		<!-- <el-dropdown class="avatar-container" trigger="click">
	            <div class="avatar-wrapper">
	                <img class="user-avatar" :src="avatar">
	                <i class="el-icon-caret-bottom"/>
	            </div>
	            <el-dropdown-menu class="user-dropdown" slot="dropdown">
	                <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
	            </el-dropdown-menu>
	        </el-dropdown> -->
	</el-menu>
</template>

<script>
import {
	mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
// import Hamburger from 'components/Hamburger';
// import ErrLog from 'components/ErrLog';
// import errLogStore from 'store/errLog';

export default {
	components: {
		Levelbar,
		// Hamburger,
		// ErrLog
	},
	data() {
		return {
			//log: errLogStore.state.errLog
		}
	},
	computed: {
		...mapGetters([
			'sidebar',
			'name',
			'avatar'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('ToggleSideBar')
		},
		logout() {
			//  debugger;
			this.$store.dispatch('LogOut').then(() => {
				//   debugger;
				//   console.log(this,1)
				// window.location.reload();// 为了重新实例化vue-router对象 避免bug
			});
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
}
</style>
