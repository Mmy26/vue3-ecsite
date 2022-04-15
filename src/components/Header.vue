<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import "element-plus/theme-chalk/display.css";
import { onMounted, watch, ref, inject } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { CaretBottom } from "@element-plus/icons-vue";

const orderStore = inject(CartListKey);
if (!orderStore) {
  throw new Error("");
}
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
    <el-row class="row-bg">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <RouterLink to="/top"
          ><el-image
            src="/img_noodle/header_logo.png"
            fit="scale-down"
            style="height: 5vh"
        /></RouterLink>
      </el-col>

      <el-col :xs="20" :sm="18" :md="14" :lg="13" :xl="13" class="listArea"
        ><div class="grid-content bg-purple">
          <el-space :size="20">
            <RouterLink to="/itemList" class="link"
              ><el-link type="danger">商品一覧</el-link></RouterLink
            >
            <RouterLink to="/cartList" class="link"
              ><el-link type="danger"> カート </el-link>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-icon class="el-icon--right"><caret-bottom /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item class="clearfix">
                      商品数
                      <el-badge
                        class="mark"
                        :value="
                          orderStore.userOrderInfo.value.orderItemList.length
                        "
                      />
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </RouterLink>

            <RouterLink to="/registerUser" class="link"
              ><el-link type="danger">ユーザー登録</el-link></RouterLink
            >
            <RouterLink to="/login" class="link"
              ><el-link type="danger">ログイン</el-link></RouterLink
            >
            <RouterLink to="/logout" class="link"
              ><el-link type="danger">ログアウト</el-link></RouterLink
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
  height: 5vh;
  align-items: center;
}
.link {
  text-decoration: none;
  margin-top: 10px;
}
.listArea {
  text-align: right;
}
.el-dropdown {
  margin-top: 4px;
}
</style>
