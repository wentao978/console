<template>
	<div class="head">
		<span class="jl-title fl">{{ $t('head.title') }}</span>
		<Hamburger class="hamburger-container fl" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<img class="user-avatar" :src="avatar">
				<i class="el-icon-caret-bottom" />
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<el-dropdown-item><span @click="logout" style="display:block;">{{$t('login.logout')}}</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
import {
	mapGetters
} from 'vuex';
import Hamburger from 'components/Hamburger';
export default {
	components: {
		Hamburger
	},
	computed: {
		...mapGetters([
			'sidebar',
			'avatar'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('ToggleSideBar')
			return false;
		},
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				window.sessionStorage.removeItem('isReload')
				//  console.log(this.$route,111)
				window.location.reload(); // 为了重新实例化vue-router对象 避免bug
			});
		}
	},
	created: function() {
		//   debugger;
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.head {
    width: 100%;
    z-index: 10;
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(47,64,80,1);
}
.hamburger-container {
    line-height: 40px;
    height: 40px;
    padding: 14px 10px 0;
    color: #fff;
}
.avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }
        .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
        }
    }
}
@-webkit-keyframes hue {
    from {
        -webkit-filter: hue-rotate(0deg);
    }

    to {
        -webkit-filter: hue-rotate(-360deg);
    }
}
.jl-title {
    display: flex;
    transition: transform 1s;
    font: bold 24px/60px 'Microsoft Yahei';
    color: #18A689;
    -webkit-animation: hue 60s infinite linear;
    -webkit-background-clip: text;
    background-image: -webkit-linear-gradient(top,#18A689,#11ED31);
    -webkit-text-fill-color: transparent;
    padding-left: 20px;
}
</style>
