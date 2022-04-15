<script setup lang="ts">
import { Order } from "@/types/Order";
import type { User } from "@/types/User";
import { inject, onMounted, ref } from "vue";
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
console.log(userStore.currentUser.value.email);

// ログインしていなければ、ログイン画面に遷移
if (userStore.currentUser.value.email === "") {
  router.push("/login");
}
console.log(userStore.currentUser.value.id);

// APIから情報取得
const getOrderData = async (): Promise<void> => {
  const response = await axios.get(
    `http://153.127.48.168:8080/ecsite-api/order/orders/noodle/${userStore.currentUser.value.id}`
  );
  console.dir(JSON.stringify(response.data));

  const orders = response.data.orders;

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
// 非同期で上記のメソッドを実行
onMounted(getOrderData);
</script>
<template>
  <h1>注文履歴</h1>
  <div v-if="currentOrderList.length >= 1">
    <el-row :gutter="20">
      <el-col :span="1"> <!-- ここは余白--> </el-col>
      <el-col :span="2"><div class="grid-content bg-purple">番号</div></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">商品画像</div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">商品名</div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">サイズ</div></el-col
      >
      <el-col :span="3"><div class="grid-content bg-purple">数量</div></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">注文日時</div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">配達日時</div></el-col
      >
      <el-col :span="1"><!-- ここは余白--></el-col>
    </el-row>
    <div v-for="currentUserData of currentOrderList">
      <div v-for="(orderItem, i) of currentUserData.orderItemList">
        <el-row :gutter="20">
          <el-col :span="1"> <!-- ここは余白--> </el-col>
          <el-col :span="2">{{ i + 1 }}</el-col>
          <el-col :span="3"><img :src="orderItem.item.imagePath" /></el-col>
          <el-col :span="3">{{ orderItem.item.name }}</el-col>
          <el-col :span="3">{{ orderItem.size + "サイズ" }}</el-col>
          <el-col :span="3">{{ orderItem.quantity + "個" }}</el-col>
          <el-col :span="3">{{ currentUserData.orderDate }}</el-col>
          <el-col :span="3">{{ currentUserData.deliveryTime }}</el-col>
          <el-col :span="1"><!-- ここは余白--></el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div v-else>注文履歴がありません</div>
</template>
<style scoped>
bg-purple {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
