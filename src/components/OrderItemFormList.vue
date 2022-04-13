<script setup lang="ts">
import { orderProviderKey } from "@/providers/useOrderProvider";
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { inject, onMounted, ref } from "vue";

const orderStore = inject(orderProviderKey);

if (!orderStore) {
  throw new Error("");
}

let currentOrderList = ref<OrderItem[]>([]);
let currentOrder = ref<Order>(
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
    []
  )
);

onMounted(() => {
  currentOrderList.value = orderStore.order.value.orderItemList;
  currentOrder.value = orderStore.order.value;
});
</script>

<template>
  <div class="row">
    <table class="striped" border="1">
      <thead>
        <tr>
          <th class="cart-table-th">商品名</th>
          <th>サイズ、価格(税抜)、数量</th>
          <th>トッピング、価格(税抜)</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="orderItem of currentOrderList" v-bind:key="orderItem.id">
          <td class="cart-item-name">
            <div class="cart-item-icon">
              <img v-bind:src="orderItem.item.imagePath" />
            </div>
            <span>{{ orderItem.item.name }}</span>
          </td>
          <td>
            <span class="price">&nbsp;{{ orderItem.size }}</span
            ><span v-if="orderItem.size === 'M'"
              >&nbsp;&nbsp;{{ orderItem.item.priceM }}円</span
            ><span v-else>&nbsp;&nbsp;{{ orderItem.item.priceL }}円</span>
            &nbsp;&nbsp;{{ orderItem.quantity }}個
          </td>
          <td>
            <ul>
              <li v-for="topping of orderItem.item.toppingList">
                {{ topping.name }}
                <span v-if="orderItem.size === 'M'"
                  >{{ topping.priceM }}円</span
                >
                <span v-else>{{ topping.priceL }}円</span>
              </li>
            </ul>
          </td>
          <td>
            <div class="text-center">
              {{ orderItem.getCalcSubTotalPrice().toLocaleString() }}円
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row cart-total-price">
    <div>消費税：{{ currentOrder.tax.toLocaleString() }}円</div>
    <div>
      ご注文金額合計：{{ currentOrder.calcTotalPrice.toLocaleString() }}円
      (税込)
    </div>
  </div>
</template>

<style scoped></style>
