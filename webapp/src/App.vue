<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="0" :route="{path: '/'}"><i class="el-icon-date">&nbsp;&nbsp;&nbsp;重庆邮电大学课堂点名系统</i></el-menu-item>
      <el-menu-item index="1" :route="{path: '/depart'}">班级列表</el-menu-item>
      <el-menu-item index="2" :route="{path: '/class'}">学生列表</el-menu-item>
      <el-menu-item index="3" :route="{path: '/student'}">学生详情</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
    	return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(){

      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
