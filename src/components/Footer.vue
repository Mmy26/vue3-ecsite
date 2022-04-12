<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
</script>

<template>
  <el-header>
    <el-row class="row-bg">
      <el-col :span="24"
        ><div class="grid-content bg-purple">Footer</div></el-col
      >
    </el-row>
  </el-header>
</template>
<style scoped>
.row-bg {
  background-color: #d3dce6;
  height: 5vh;
  text-align: center;
}
</style>
