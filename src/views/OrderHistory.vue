<script setup lang="ts">
import { Order } from "@/types/Order";
import type { User } from "@/types/User";
import { inject, ref } from "vue";
import axios from "axios";
import { useUserProviderKey } from "@/providers/useUserProvider";
import router from "@/router";
// APIから受け取った情報を入れるインスタンス
const currentOrderList = ref<Order[]>([]);
// ログイン中のユーザーー情報（ストアから取得）
const userStore = inject(useUserProviderKey);

// キーのundefined の時のエラー回避処理
if (!userStore) {
  throw new Error("Error");
}

// ログインしていなければ、ログイン画面に遷移
if (userStore.currentUser.value.email === "") {
  router.push("/login");
}
// APIから情報取得
const getOrderData = async (): Promise<void> => {
  console.log("メソッド起動");
  const response = await axios.get(
    `"http://153.127.48.168:8080/ecsite-api/item/items/noodle"/${userStore.currentUser.value.id}`
  );
  console.dir(JSON.stringify(response.data));

  const orders = ref(response.data.orders);

  for (const order of orders) {
    currentOrderList.value.push(
      new Order(
        order.id,
        order.userId,
        order.status,
        order.totalPrice,
        order.orderDate,
        order.destinationName,
        order.destinationEmail,
        order.destinationZipcode,
        order.destinationAddress,
        order.destinationTel,
        order.deliveryTime,
        order.paymentMethod,
        userStore.currentUser.value as User,
        order.orderItemList
      )
    );
  }
};
</script>
<template>
  <h1>注文履歴</h1>
  <div v-if="currentOrderList >= 1">
    <div v-for="currentUserData of currentOrderList">
      <span>totalPrice:{{ currentUserData.calcTotalPrice }}</span>
      <div v-for="orderItem of currentUserData.orderItemList">
        <span>name:{{ orderItem.item.name }}</span>
        <span>size:{{ orderItem.size }}</span>
        <span>quantity:{{ orderItem.quantity }}</span>
        <span>image</span><img :src="orderItem.item.imagePath" />
      </div>
    </div>
  </div>
  <div v-else>注文履歴がありません</div>
</template>
<style scoped></style>
