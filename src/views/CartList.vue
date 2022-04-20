<template>
  <div>
    <h1>
      ショッピングカート <img class="cart" src="/img_noodle/shoppingCart.png" />
    </h1>
    <OrderItemFormList></OrderItemFormList>
    <div class="msg">{{ message }}</div>
    <div class="btn">
      <el-button
        type="warning"
        plain
        @click="backToItemList"
        button
        size="large"
        >商品一覧へ戻る</el-button
      >
      <el-button type="danger" plain @click="orderConfirm" button size="large"
        >注文に進む</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import OrderItemFormList from "@/components/OrderItemFormList.vue";
import { useUserProviderKey } from "@/providers/useUserProvider";
import { inject, ref } from "vue";
import { User } from "@/types/User";
import { CartListKey } from "@/providers/useCartProvider";
// //routerを使えるようにする
const router = useRouter();
const userStore = inject(useUserProviderKey);
const orderStore = inject(CartListKey);
const message = ref("");
if (!userStore) {
  throw new Error("");
}
if (!orderStore) {
  throw new Error("");
}
/**
 * 注文画面へ遷移する.
 */
const orderConfirm = (): void => {
  if (orderStore.userOrderInfo.value.orderItemList.length === 0) {
    message.value = "商品が入っていません";
    return;
  }
  if (userStore.currentUser.value.name === "") {
    // ログインしていなければログイン画面に遷移
    router.push("/login");
    return;
  }
  router.push("/orderConfirm");
};
/**
 * 商品一覧画面に戻る.
 */
const backToItemList = (): void => {
  router.push("/itemList");
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.btn {
  text-align: center;
}
.cart {
  height: 100px;
  width: 100px;
  margin-bottom: -35px;
  margin-left: -20px;
}
.msg{
  text-align: center;
  margin-bottom: 5px;;
}
</style>