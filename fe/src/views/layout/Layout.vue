<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<div class="head">
			<app-header></app-header>
		</div>
		<div class="sidebar-wrapper">
			<Sidebar class="sidebar-container" />
		</div>
		<div class="main-container">
			<Navbar/>
			<App-main/>
		</div>
	</div>
</template>

<script>
import {
	Navbar,
	Sidebar,
	AppMain,
	AppHeader
} from 'views/layout';

export default {
	name: 'layout',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		AppHeader
	},
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar;
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.head {
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
}
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
        .sidebar-wrapper {
            transform: translate(-140px, 0);
            .sidebar-container {
                transform: translate(132px, 0);
            }
            // &:hover {
            //     transform: translate(0, 0);
            //     .sidebar-container {
            //         transform: translate(0, 0);
            //     }
            // }
        }
        .main-container {
            margin-left: 40px;
        }
    }
    .sidebar-wrapper {
        width: 180px;
        position: fixed;
        height: calc(100% - 60px);
        top: 60px;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow-x: hidden;
        transition: all 0.28s ease-out;
        @include scrollBar;
    }
    .sidebar-container {
        transition: all 0.28s ease-out;
    }
    .main-container {
        height: calc(100% - 60px);
        transition: all 0.28s ease-out;
        margin-left: 180px;
        padding-top: 60px;
    }
}
// @media screen and (max-width: 768px){
//     .sidebar-wrapper {
//         transform: translate3d(-180px,0,0);
//     }
//     .app-wrapper .main-container{
//         margin-left: 0px;
//     }
// }
</style>
