<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import "element-plus/theme-chalk/display.css";
import { onMounted, watch, ref, inject } from "vue";
import { CaretBottom } from "@element-plus/icons-vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useUserProviderKey } from "@/providers/useUserProvider";

const orderStore = inject(CartListKey);
if (!orderStore) {
  throw new Error("");
}
//ヘッダーページを表示するかどうかを表すフラグ
const canShow = ref(true);

//ログインしているかどうかを表すフラグ
const isLogin = ref(false);

//routeに関するオブジェクト
const route = useRoute();

const userStore = inject(useUserProviderKey);
if (!userStore) {
  throw new Error("");
}

// watch((変更を検知したい変数) , ( 検知した変数が引数として入れられる ) => { 処理 } )
watch(route, () => {
  isLogin.value = false;
  if (userStore.currentUser.value.id !== 0) {
    isLogin.value = true;
  }
});

const router = useRouter();

/**
 * トップページに戻る.
 */
const backToTop = () => {
  router.push("/");
};
</script>

<template>
  <el-header class="headerArea" v-show="canShow">
    <el-row class="row-bg">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="logo">
          <el-image
            src="/img_noodle/header_logo.png"
            fit="scale-down"
            style="height: 5vh"
            @click="backToTop"
          /></div
      ></el-col>

      <el-col :xs="20" :sm="18" :md="14" :lg="13" :xl="13" class="listArea"
        ><div class="grid-content bg-purple">
          <RouterLink to="/itemList" class="link"
            ><el-link type="danger"
              >&nbsp;&nbsp;商品一覧&nbsp;&nbsp;</el-link
            ></RouterLink
          >
          <RouterLink to="/cartList" class="link" v-show="isLogin"
            ><el-link type="danger">&nbsp;&nbsp;カート&nbsp;&nbsp;</el-link>
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
            ><el-link type="danger"
              >&nbsp;&nbsp;ユーザー登録&nbsp;&nbsp;</el-link
            ></RouterLink
          >
          <RouterLink to="/login" class="link" v-show="!isLogin"
            ><el-link type="danger"
              >&nbsp;&nbsp;ログイン&nbsp;&nbsp;</el-link
            ></RouterLink
          >
          <RouterLink to="/logout" class="link" v-show="isLogin"
            ><el-link type="danger"
              >&nbsp;&nbsp;ログアウト&nbsp;&nbsp;</el-link
            ></RouterLink
          >
          <RouterLink to="/orderHistory" class="link" v-show="isLogin"
            ><el-link type="danger"
              >&nbsp;&nbsp;注文履歴&nbsp;&nbsp;</el-link
            ></RouterLink
          >
          <RouterLink to="/inquiryForm" class="link"
            ><el-link type="danger">&nbsp;&nbsp;お問い合わせ&nbsp;&nbsp;</el-link></RouterLink
          >
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
  margin-top: 10px;
}

.el-dropdown {
  margin-top: 4px;
}

.logo {
  cursor: pointer;
}

.logo:hover {
  opacity: 0.7;
}
</style>
