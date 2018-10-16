<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebarOpened}">
		<layout-sidebar class="sidebar-container" :sidebarOpened="sidebarOpened"></layout-sidebar>
		<div class="main-container">
			<layout-navbar :sidebarOpened.sync="sidebarOpened"></layout-navbar>
			<layout-app-main></layout-app-main>
      <div class="bottom">
        <p>
          <a href="https://github.com/itheima2017/vue-element-admin-itheima-template" target="_blank">
            <svg-icon icon-class="github"></svg-icon>
          </a>
        </p>
        <p>Copyright<svg-icon icon-class="copyright"></svg-icon> 2018 传智研究院出品</p>
      </div>
		</div>
	</div>
</template>

<script>
import layoutNavbar from '@/components/Layout/layoutNavbar'
import layoutSidebar from '@/components/Layout/layoutSidebar'
import layoutAppMain from '@/components/Layout/layoutAppMain'

export default {
  name: 'layout',
  components: {
    layoutNavbar,
    layoutSidebar,
    layoutAppMain
  },
  data () {
    return {
      sidebarOpened: true
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
.bottom {
  p {
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
  }
}
</style>
