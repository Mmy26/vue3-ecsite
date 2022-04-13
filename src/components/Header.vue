<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
import { onMounted, watch, ref } from "vue"
import { RouterLink, useRoute } from "vue-router";

//ヘッダーページを表示するかどうかを表すフラグ
const canShow = ref(true);

//routeに関するオブジェクト
const route = useRoute();

// watch((変更を検知したい変数) , ( 検知した変数が引数として入れられる ) => { 処理 } )
watch((route), (currentPage) => {
  console.log("watchが呼ばれました!");
  console.log("currentPageの値      ",currentPage.path)
  canShow.value = true;
  if( currentPage.path === "/login" || currentPage.path === "/registerUser"){
    canShow.value = false;
  }
  console.log("canShowの値   ", canShow.value);
});
</script>

<template>
  <el-header>
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">Title</div></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-space :size="10">
            <RouterLink to="/itemList"
              ><el-link type="primary">商品一覧</el-link></RouterLink
            >
            <RouterLink to="/registerUser"
              ><el-link type="primary">ユーザー登録</el-link></RouterLink
            >
            <RouterLink to="/cartList"
              ><el-link type="primary">カート</el-link></RouterLink
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
