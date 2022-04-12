<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import StoreProvider from "./StoreProvider.vue";
</script>

<template>
  <Header />
  <!-- ここにStoreProvider.vueを挿入 -->
  <StoreProvider><RouterView /></StoreProvider>
  <!--  -->
  <Footer />
</template>

<style></style>
