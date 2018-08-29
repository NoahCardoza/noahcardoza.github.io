<template>
  <div class="">
    <portal to="portal-header">
      <el-menu mode="horizontal" :router="true" :default-active="$route.path">
        <el-menu-item index="/welcome">Welcome</el-menu-item>
        <el-menu-item index="/welcome/about">About</el-menu-item>
        <el-menu-item index="/welcome/classes">Classes</el-menu-item>
        <el-menu-item index="/welcome/projects">Projects</el-menu-item>
      </el-menu>
    </portal>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
