<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ElButton } from "element-plus";
import StoreProvider from "./StoreProvider.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <StoreProvider>
    <Header />
    <RouterView />
    <Footer />
  </StoreProvider>
</template>

<style></style>
