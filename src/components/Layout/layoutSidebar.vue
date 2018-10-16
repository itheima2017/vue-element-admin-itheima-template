<template>
  <scroll-bar>
    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="!sidebarOpened" 
      background-color="#001529" 
      text-color="#bfcbd9" 
      active-text-color="#fff"
      >
      <router-link to="/">
        <div class="sidebar-logo"><img src="../../assets/banner-64.png" /></div>
        <div class="sidebar-logo-mini"><img src="../../assets/logo-64.png" /></div>
      </router-link>
      <sidebar-item :routes="permission_routers" :sidebarOpened="sidebarOpened"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { constantRouterMap } from '@/router'

export default {
  name: 'layoutSidebar',
  props: ['sidebarOpened'],
  components: { SidebarItem, ScrollBar },
  data () {
    return {
      permission_routers: constantRouterMap
    }
  },
  created() {
  }
}
</script>
