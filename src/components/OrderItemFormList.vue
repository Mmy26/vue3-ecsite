<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { inject, onMounted, ref, watch } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import router from "@/router";
const fits = ["fill", "contain", "cover", "none", "scale-down"];
const orderStore = inject(CartListKey);
const showCoupon = ref(false);

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
  const currentCoupon = orderStore.coupon.value;
});
/**
 * 合計金額が3000円以下の場合は送料を表示する.
 */
const num = ref(3000);
const message1 = ref("");
const message2 = ref("");
const message3 = ref("");
const freeShipping = () => {
  if (num.value - currentOrder.value.calcTotalPrice < 0) {
    message1.value = "今回のご注文は送料無料";
    return message1.value;
  } else {
    message2.value =
      "あと" + (num.value - currentOrder.value.calcTotalPrice) + "円で送料無料";

    return message2.value;
  }
};
/**
 * 送料を表示する.
 */
const ShippingMessage = () => {
  if (num.value - currentOrder.value.calcTotalPrice > 0) {
    message3.value = "410";
    return message3.value;
  } else {
    return 0;
  }
};
/**
 * 合計金額に送料を追加する.
 */
const calculation = () => {
  if (num.value - currentOrder.value.calcTotalPrice > 0) {
    return currentOrder.value.calcTotalPrice + 410;
  } else {
    return currentOrder.value.calcTotalPrice;
  }
};
/**
 * 商品の内容を編集する.
 * @param 添字
 */
const changeItem = (index: number) => {
  router.push(`/itemDetail2/${currentOrderList.value[index].itemId}`);
  orderStore.deleteItem(index);
};

const pass = ref(location.pathname);

// クーポン利用のボタンが押下される度発火
watch(orderStore.useCoupon, () => {
  orderStore.useCoupon.value;
});
</script>

<template>
  <div class="row" v-show="showOrderItem">
    <table class="striped t-line">
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
              type="success"
              plain
              :icon="Edit"
              @click="changeItem(index)"
              >編集</el-button
            >
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
      <div v-if="currentOrder.orderItemList.length >= 1">
        <el-row :gutter="0" class="tax">
          <el-col :span="6"></el-col>
          <el-col :span="6" class="left"> 消費税： </el-col>
          <el-col :span="6" class="right">
            <div>{{ currentOrder.tax.toLocaleString() }}円</div></el-col
          >
          <el-col :span="6"></el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="6"></el-col>
          <el-col :span="6" class="left"> 送料：</el-col>
          <el-col :span="6" class="right">
            <div>{{ ShippingMessage() }}円</div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="6"></el-col>
          <el-col :span="6" class="left coupon"> クーポン使用：</el-col>
          <el-col :span="6" class="right coupon">
            <div v-if="orderStore.useCoupon.value === true">
              -{{ orderStore.coupon.value.price }}円
            </div>
            <div v-else>-0円</div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>

        <el-row :gutter="0" class="total-price">
          <el-col :span="6"></el-col>
          <el-col :span="6" class="left"> ご注文金額合計：</el-col>
          <el-col :span="6" class="right">
            <div v-if="orderStore.useCoupon.value === true">
              {{ calculation() - orderStore.coupon.value.price }}円 (税込)
            </div>
            <div v-else>{{ calculation() }}円 (税込)</div>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <div class="shipping">{{ freeShipping() }}</div>
        <!-- <div v-if="pass === '/cartlist'"> -->
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
  font-size: 20px;
  text-align: center;
}
.t-line tr:nth-child(odd) td {
  /* background-color: #fdeaea; */
  background-color: white;
}
.t-line tr:nth-child(even) td {
  background-color: #efefef;
}
.shipping {
  color: red;
  font-size: 20px;
  margin-bottom: 20px;
}
.total-price {
  font-size: 25px;
}

.left {
  text-align: right;
}
.right {
  text-align: left;
}
.tax {
  margin-top: 20px;
}

.coupon {
  color: rgb(145, 145, 145);
  font-size: 15px;
}
</style>
