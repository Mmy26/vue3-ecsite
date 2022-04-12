<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ElButton } from "element-plus";
import StoreProvider from "./StoreProvider.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <!-- <header>
    <el-button>I am ElButton</el-button>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
  <RouterLink to="/itemList">ItemList</RouterLink>
  <!-- </nav>
    </div>
  </header> -->

  <StoreProvider>
    <Header />
    <RouterView />
    <!-- <Footer /> -->
  </StoreProvider>
</template>

<style></style>
