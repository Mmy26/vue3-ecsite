<script setup lang="ts">
import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { ref } from "vue";
import axios from "axios";
// APIから受け取った情報を入れるインスタンス
const currentOrderList = ref<Order[]>([]);
// ログイン中のユーザーー情報（ストアから取得）
const currentUser = ref<User>(new User(0, "", "", "", "", "", ""));

// APIから情報取得
const getOrderData = async (): Promise<void> => {
  console.log("メソッド起動");
  const response = await axios.get(
    `"http://153.127.48.168:8080/ecsite-api/item/items/noodle"/1`
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
        currentUser.value as User,
        order.orderItemList
      )
    );
  }
};
</script>
<template></template>
<style scoped></style>
