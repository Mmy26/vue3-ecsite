<script setup lang="ts">
import { provide } from "vue";
import { itemListKey, useItemList } from "@/providers/useItemListProvider";
import { orderProviderKey, useOrderStore } from "./providers/useOrderProvider";
import {
  useUserProvider,
  useUserProviderKey,
} from "./providers/useUserProvider";

provide(itemListKey, useItemList());
provide(useUserProviderKey, useUserProvider());
provide(orderProviderKey, useOrderStore());
</script>

<template>
  <div><slot /></div>
</template>

<style scoped></style>
