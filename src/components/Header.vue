<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
import { onMounted, watch, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

//ヘッダーページを表示するかどうかを表すフラグ
const canShow = ref(true);

//routeに関するオブジェクト
const route = useRoute();

// watch((変更を検知したい変数) , ( 検知した変数が引数として入れられる ) => { 処理 } )
watch(route, (currentPage) => {
  console.log("watchが呼ばれました!");
  console.log("currentPageの値      ", currentPage.path);
  canShow.value = true;
  if (currentPage.path === "/login" || currentPage.path === "/registerUser") {
    canShow.value = false;
  }
  console.log("canShowの値   ", canShow.value);
});
</script>

<template>
  <el-header class="headerArea">
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6"
        ><el-image
          src="/img_noodle/header_logo.png"
          fit="scale-down"
          style="height: 5vh"
      /></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-space :size="20">
            <RouterLink to="/itemList" class="link"
              ><el-link type="primary">商品一覧</el-link></RouterLink
            >
            <RouterLink to="/cartList" class="link"
              ><el-link type="primary">カート</el-link></RouterLink
            >
            <RouterLink to="/registerUser" class="link"
              ><el-link type="primary">ユーザー登録</el-link></RouterLink
            >
            <RouterLink to="/login" class="link"
              ><el-link type="primary">ログイン</el-link></RouterLink
            >
            <RouterLink to="/logout" class="link"
              ><el-link type="primary">ログアウト</el-link></RouterLink
            >
            <RouterLink to="/orderHistory" class="link"
              ><el-link type="primary">注文履歴</el-link></RouterLink
            >
          </el-space>
        </div></el-col
      >
    </el-row>
  </el-header>
</template>
<style scoped>
.headerArea {
  width: 100%;
  background-color: #eee;
  height: 5vh;
  align-items: center;
}
.link {
  text-decoration: none;
  margin-top: 10px;
}
</style>
