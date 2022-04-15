<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { inject, onMounted, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
const fits = ["fill", "contain", "cover", "none", "scale-down"];
const orderStore = inject(CartListKey);

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
const showOrderItem = ref(true);

onMounted(() => {
  currentOrderList.value = orderStore.userOrderInfo.value.orderItemList;
  currentOrder.value = orderStore.userOrderInfo.value;
  if (currentOrderList.value.length === 0) {
    showOrderItem.value = false;
  }
});
</script>

<template>
  <div class="row" v-show="showOrderItem">
    <table class="striped">
      <thead>
        <tr>
          <th class="cart-table-th">商品名</th>
          <th>サイズ、価格(税抜)、数量</th>
          <th>トッピング、価格(税抜)</th>
          <th>小計</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(orderItem, index) of currentOrderList"
          v-bind:key="orderItem.id"
        >
          <td class="cart-item-name">
            <div class="cart-item-icon">
              <!-- <img v-bind:src="orderItem.item.imagePath" />  -->
              <el-image
                style="width: 200px; height: 160px"
                :src="orderItem.item.imagePath"
              />
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
              <li v-for="topping of orderItem.orderToppingList">
                {{ topping.topping.name }}
                <span v-if="orderItem.size === 'M'"
                  >{{ topping.topping.priceM }}円</span
                >
                <span v-else>{{ topping.topping.priceL }}円</span>
              </li>
            </ul>
          </td>
          <td>
            <div class="text-center">
              {{ orderItem.getCalcSubTotalPrice().toLocaleString() }}円
            </div>
          </td>
          <td>
            <el-button
              type="primary"
              plain
              :icon="Delete"
              @click="orderStore.deleteItem(index)"
              >削除</el-button
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="row cart-total-price">
      <h4 class="page-title" v-if="currentOrder.orderItemList.length === 0">
        カートの中に商品がありません
      </h4>
      <div>消費税：{{ currentOrder.tax.toLocaleString() }}円</div>
      <div>
        ご注文金額合計：{{ currentOrder.calcTotalPrice.toLocaleString() }}円
        (税込)
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  border: solid 1px;
  margin-left: auto;
  margin-right: auto;
}
table th,
table td {
  border-style: solid; /* 線種 */
  border-width: 2px; /* 線の太さ */
  border-color: rgb(173, 172, 172);
  padding: 15px;
  text-align: center;
}
.cart-total-price {
  font-size: 30px;
  text-align: center;
}
</style>
