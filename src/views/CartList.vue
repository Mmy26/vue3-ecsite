<template>
  <div>
    <OrderItemFormList></OrderItemFormList>
    <button type="button" @click="backToItemList">商品一覧へ戻る</button>
    <div class="row order-confirm-btn">
      <button class="btn" type="button" @click="orderConfirm">
        <span>注文に進む</span>
      </button>
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
  console.log("");
  console.log("");
};
</script>

<style scoped></style>
