<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
<<<<<<< HEAD
  <header>
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
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/itemDetail">itemDetail</RouterLink>
      </nav>
    </div>
  </header>

=======
  <Header />
  <!-- ここにStoreProvider.vueを挿入 -->
>>>>>>> origin/develop
  <RouterView />
  <!--  -->
  <Footer />
</template>

<style></style>
