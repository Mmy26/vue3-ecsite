<script setup lang="ts">
import { provide } from "vue";
import { useOrderProvider, userOrderKey } from "./providers/useOrderProvider";
//基本的にはルートコンポーネントでprovideをかく。
//親コンポーネントで必要。第一引数はkey, 第二引数はStore。
provide(userOrderKey, useOrderProvider());
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>
