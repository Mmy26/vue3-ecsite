<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import { ElButton } from "element-plus";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <!-- ここにStoreProvider.vueを挿入 -->
  <RouterView />
</template>

<style></style>
