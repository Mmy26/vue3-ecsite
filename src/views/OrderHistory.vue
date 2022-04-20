<script setup lang="ts">
import { Order } from "@/types/Order";
import type { User } from "@/types/User";
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";
import { RouterLink } from "vue-router";
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
  ElNotification({
    title: "Error",
    message: "ログインしてください",
    type: "error",
  });
  router.push("/login");
}

// APIから情報取得
const getOrderData = async (): Promise<void> => {
  const response = await axios.get(
    `http://153.127.48.168:8080/ecsite-api/order/orders/noodle/${userStore.currentUser.value.id}`
  );

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
  //オブジェクトの昇順ソート
  currentOrderList.value.sort(function (a, b) {
    return b.orderDate < a.orderDate ? -1 : 1;
  });
};

// 非同期で上記のメソッドを実行
onMounted(getOrderData);
</script>
<template>
  <h1><img class="icon" :src="'/img_noodle/9654.png'" />注文履歴</h1>
  <div class="container" v-if="currentOrderList.length >= 1">
    <el-row :gutter="20">
      <el-col :span="1"> <!-- ここは余白--> </el-col>

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
      <el-col :span="2"
        ><div class="grid-content bg-purple">支払方法</div></el-col
      >
      <el-col :span="1"><!-- ここは余白--></el-col>
    </el-row>
    <hr class="border" />
    <div class="orderList" v-for="(currentUserData, i) of currentOrderList">
      <div v-for="(orderItem, l) of currentUserData.orderItemList">
        <el-row :gutter="20">
          <el-col :span="1"> <!-- ここは余白--> </el-col>

          <el-col :span="3"
            ><RouterLink :to="'/itemDetail/' + orderItem.itemId">
              <img class="food" :src="orderItem.item.imagePath" /> </RouterLink
          ></el-col>
          <el-col :span="3">{{ orderItem.item.name }}</el-col>
          <el-col :span="3">{{ orderItem.size + "サイズ" }}</el-col>
          <el-col :span="3">{{ orderItem.quantity + "個" }}</el-col>
          <el-col :span="3">{{
            new Date(currentUserData.orderDate).toLocaleDateString()
          }}</el-col>
          <el-col :span="3">{{
            new Date(currentUserData.deliveryTime).toLocaleString()
          }}</el-col>
          <el-col :span="2" v-if="currentUserData.paymentMethod === 1">{{
            "現金支払"
          }}</el-col>
          <el-col :span="2" v-else>{{ "クレジット支払" }}</el-col>
          <el-col :span="1"><!-- ここは余白--></el-col>
        </el-row>
        <hr class="listBorder" />
      </div>
    </div>
  </div>
  <div class="container" v-else>注文履歴がありません</div>
</template>
<style scoped>
h1 {
  padding-left: 50px;
}
.icon {
  width: 100px;
}
bg-purple {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.food {
  width: 150px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
}
.food:hover {
  opacity: 0.7;
  color: white;
}
.border {
  border-width: 3px;
}
.listBorder {
  border-color: rgba(253, 230, 20, 0.433);
}
.orderList {
  box-shadow: 5px 5px 5px rgba(200, 199, 199, 0.231);
}
</style>
