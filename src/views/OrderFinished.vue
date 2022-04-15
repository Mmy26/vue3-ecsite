<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const backToItemList = () => {
  router.push("/itemList");
};

const orderHistory = () => {
  router.push("/orderHistory");
};
</script>

<template>
  <div class="back-img">
    <div class="img-position">
      <img src="/img_noodle/background.png" />
    </div>
    <div class="msg">
      <h2>ご注文ありがとうございました。</h2>
      <p>またのご注文をお待ちしております。</p>
      <div class="button">
        <div>
          <el-button type="danger" plain @click="backToItemList"
            >商品一覧に戻る</el-button
          >
          <el-button type="danger" plain @click="orderHistory"
            >注文履歴を見る</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-img {
  position: relative;
}

.msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

img {
  margin-top: 50px;
  width: 600px;
  text-align: center;
}

.img-position{
  text-align: center;
}

h2 {
  text-align: center;
}

p {
  text-align: center;
  margin-bottom: 30px;
}

.button {
  display: flex;
  justify-content: center;
}
</style>
