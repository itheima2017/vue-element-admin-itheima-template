<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebarOpened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 站内搜索 -->
      <div class="item">
        <el-tooltip effect="dark" content="搜索" placement="bottom">
          <el-button icon="el-icon-search" type="text" class="btnSearch" @click="handleBtnSearch"></el-button>
        </el-tooltip>
        <transition name="el-fade-in-linear">
          <el-autocomplete 
            ref="searchInput"
            v-model="searchVal"
            :fetch-suggestions="querySearchAsync" 
            @select="handleSelect" 
            @blur="showSearchInput = false"
            placeholder="站内搜索" 
            :trigger-on-focus="true"
            v-show="showSearchInput" ></el-autocomplete>
        </transition>
      </div>

      <!-- 用户信息 -->
      <el-dropdown class="item">
        <span class="el-dropdown-link">
          <img class="avatar" src="../../assets/bigUserHeader.png">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/itheima2017/vue-element-admin-itheima-template">
            <el-dropdown-item>
              GitHub
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'layoutNavBar',
  props: ['sidebarOpened'],
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
  },
  data() {
    return {
      searchVal: '',
      timeout: null,
      showSearchInput: false,
      restaurants: [],
      userName: '管理员'
    }
  },
  methods: {
    toggleSideBar() {
      // this.sidebarOpened = !this.sidebarOpened
      this.$emit('update:sidebarOpened', !this.sidebarOpened)
    },
    logout() {
      this.$router.push({ path: '/login' })
    },
    handleBtnSearch() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.searchVal = ''
      this.showSearchInput = false
      console.log(item)
      this.$message({
        message: `选取了 ${item.value}`,
        type: 'success'
      })
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar .item .el-input__inner {
  border: 0px;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 50px;
    .item {
      display: inline-block;
      margin-right: 10px;
      i {
        font-size: 18px;
      }
      .btnSearch {
        margin-right: 5px;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.65);
      }
      .avatar {
        width: 22px;
        vertical-align: -5px;
      }
    } 
  }
}
</style>
