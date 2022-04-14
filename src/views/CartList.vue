<template>
  <!-- //componensを張り付ける -->
  <OrderItemFormList></OrderItemFormList>
  <button class="btn" type="button" @click="backToItemList">
    <span>商品一覧へ戻る</span>
  </button>
  <div class="row order-confirm-btn">
    <button class="btn" type="button" @click="orderConfirm">
      <span>注文に進む</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import OrderItemFormList from "@/components/OrderItemFormList.vue";

const store = inject(CartListKey);
if (!store) {
  throw new Error("");
}
//routerを使えるようにする
const router = useRouter();

//注文内容
const OrderInfo = ref(
  new Order(
    0,
    0,
    0,
    0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    new Date(),
    0,
    new User(0, "", "", "", "", "", ""),
    new Array<OrderItem>()
  )
);

/**
 * ショッピングカート一覧を表示させる.
 */
onMounted(() => {
  OrderInfo.value = store.userOrderInfo.value;
  console.log(OrderInfo.value);
});
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
};
</script>

<style scoped></style>
