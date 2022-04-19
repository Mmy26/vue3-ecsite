<template>
  <div>
    <h2>お問い合わせありがとうございました。</h2>
    <img src="/img_noodle/noodle.png" />
    <el-button type="danger" plain @click="backToTop">トップに戻る</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const backToTop = () => {
  router.push("/");
};
</script>

<style scoped>
h2 {
  margin-top: 200px;
  text-align: center;
}
img {
  display: block;
  margin: auto;
  height: 300px;
  width: 300px;
}
.el-button {
  display: block;
  margin: auto;
  text-align: center;
}
</style>
