<script setup lang="ts">
import "element-plus/theme-chalk/display.css";
import { getYear } from "date-fns";
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const displayYear = ref(getYear(new Date()));
//フッターページを表示するかどうかを表すフラグ
const canShow = ref(true);
//routeに関するオブジェクト
const route = useRoute();

watch(route, (currentPage) => {
  canShow.value = true;
  if (
    currentPage.path === "/login" ||
    currentPage.path === "/registerUser" ||
    currentPage.path === "/"
  ) {
    canShow.value = false;
  }
});
</script>

<template>
  <el-footer v-show="canShow" class="footer-area">
    <el-row class="row-bg">
      <el-col :span="24" class="img-area"
        ><img src="/img_noodle/header_logo.png"
      /></el-col>
      <el-col :span="12" class="list-area">
        <ul class="list">
          <li>
            <RouterLink to="/itemList" class="link"
              ><el-link type="danger">商品一覧</el-link></RouterLink
            >
          </li>
          <li>
            <RouterLink to="/cartList" class="link"
              ><el-link type="danger">カート</el-link></RouterLink
            >
          </li>
          <li>
            <RouterLink to="/orderHistory" class="link"
              ><el-link type="danger">注文履歴</el-link></RouterLink
            >
          </li>
        </ul>
      </el-col>
      <el-col :span="12" class="list-area">
        <ul class="list">
          <li>
            <RouterLink to="#" class="link"
              ><el-link type="danger"
                >ラクラクヌードル公式Twitter</el-link
              ></RouterLink
            >
          </li>
          <li>
            <RouterLink to="#" class="link"
              ><el-link type="danger"
                >ラクラクヌードル公式Instagram</el-link
              ></RouterLink
            >
          </li>
          <li>
            <RouterLink to="#" class="link"
              ><el-link type="danger"
                >ラクラクヌードル公式facebook</el-link
              ></RouterLink
            >
          </li>
        </ul>
      </el-col>
      <el-col :span="24">&copy;{{ displayYear }} ラクラク株式会社</el-col>
    </el-row>
  </el-footer>
</template>
<style scoped>
.row-bg {
  height: 5vh;
  text-align: center;
}
.img-area {
  text-align: left;
}
.list {
  list-style: none;
  text-align: left;
}
.link {
  text-decoration: none;
}
</style>
