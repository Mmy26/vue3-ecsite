<script setup lang="ts">
import "element-plus/theme-chalk/display.css";


</script>

<template>
   <el-header>
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6"
        ><div class="grid-content bg-purple">Title</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-space :size="10">
            <span>MyPage</span>
            <span>About</span>
            <span>Contact</span>
          </el-space>
        </div></el-col
      >
    </el-row>
  </el-header>
</template>
<style scoped>
.row-bg{
  background-color: #d3dce6;
  height: 5vh;
}

</style>
