<template>
  <div>
    <h1>ショッピングカート</h1>
    <OrderItemFormList></OrderItemFormList>
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

// //routerを使えるようにする
const router = useRouter();

/**
 * 注文画面へ遷移する.
 */
const orderConfirm = (): void => {
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
</style>
