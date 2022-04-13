<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
import { RouterLink } from "vue-router";
</script>

<template>
  <el-header>
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">Title</div></el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple">
          <el-space :size="10">
            <RouterLink to="/itemList"
              ><el-link type="primary">商品一覧</el-link></RouterLink
            >
            <RouterLink to="/cartList"
              ><el-link type="primary">カート</el-link></RouterLink
            >
            <RouterLink to="/registerUser"
              ><el-link type="primary">ユーザー登録</el-link></RouterLink
            >
            <RouterLink to="/login"
              ><el-link type="primary">ログイン</el-link></RouterLink
            >
            <RouterLink to="/logout"
              ><el-link type="primary">ログアウト</el-link></RouterLink
            >
          </el-space>
        </div></el-col
      >
    </el-row>
  </el-header>
</template>
<style scoped>
.row-bg {
  background-color: #d3dce6;
  height: 5vh;
}
</style>
