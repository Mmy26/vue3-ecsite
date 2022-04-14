<template>
  <!-- //componensを張り付ける -->
  <div
    v-for="(orderItem, index) of store.userOrderInfo.value.orderItemList"
    :key="orderItem.id"
  >
    {{ index }}
    {{ orderItem.item.name }}
    <img :src="orderItem.item.imagePath" />
    <div>
      <span class="price">&nbsp;{{ orderItem.size }}</span
      >&nbsp;&nbsp;<span v-if="orderItem.size === 'M'"
        >{{ orderItem.item.priceM.toLocaleString() }}円</span
      >
      <span v-if="orderItem.size === 'L'"
        >{{ orderItem.item.priceL.toLocaleString() }}円</span
      >
      &nbsp;&nbsp;{{ orderItem.quantity }}個
    </div>
    トッピング:

    <div v-for="Topping of orderItem.orderToppingList" v-bind:key="Topping.id">
      {{ Topping.topping.name }}>
      <span v-if="orderItem.size === 'M'">{{ Topping.topping.priceM }}</span>
      <span v-if="orderItem.size === 'L'">{{ Topping.topping.priceL }}</span
      >円
    </div>
    <div>小計：{{ orderItem.getCalcSubTotalPrice().toLocaleString() }}</div>

    <button type="button" @click="store.deleteItem(index)">削除</button>
    <hr />
  </div>
  <div v-if="OrderInfo.orderItemList.length !== 0">
    消費税：{{ OrderInfo.tax.toLocaleString() }}円
  </div>
  <div v-if="OrderInfo.orderItemList.length !== 0">
    ご注文金額合計：{{ OrderInfo.calcTotalPrice.toLocaleString() }}円 (税込)
  </div>
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
import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";

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
