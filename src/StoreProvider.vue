<script setup lang="ts">
import { provide } from "vue";
import { itemListKey, useItemList } from "@/providers/useItemListProvider";
import {
  useUserProvider,
  useUserProviderKey,
} from "./providers/useUserProvider";
import { CartListKey, useOrderProvider } from "@/providers/useCartProvider";

//基本的にはルートコンポーネントでprovideをかく。
//親コンポーネントで必要。第一引数はkey, 第二引数はStore。
provide(CartListKey, useOrderProvider());
provide(itemListKey, useItemList());
provide(useUserProviderKey, useUserProvider());
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>
