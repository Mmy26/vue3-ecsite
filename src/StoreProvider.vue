<script setup lang="ts">
import { provide } from "vue";
import { itemListKey, useItemList } from "@/providers/useItemListProvider";
import { orderProviderKey, useOrderStore } from "./providers/useOrderProvider";

provide(itemListKey, useItemList());
provide(orderProviderKey, useOrderStore());
</script>

<template>
  <div><slot /></div>
</template>

<style scoped></style>
