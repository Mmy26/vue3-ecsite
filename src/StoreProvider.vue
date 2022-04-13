<script setup lang="ts">
import { provide } from "vue";

import { useOrderProvider, userOrderKey } from "./providers/useOrderProvider";
import { itemListKey, useItemList } from "@/providers/useItemListProvider";
//基本的にはルートコンポーネントでprovideをかく。
//親コンポーネントで必要。第一引数はkey, 第二引数はStore。
provide(userOrderKey, useOrderProvider());
provide(itemListKey, useItemList());
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>
