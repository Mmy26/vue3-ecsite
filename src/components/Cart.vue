<template>
  <div></div>
</template>

<script setup lang="ts">
import { userOrderKey } from "@/providers/useOrderProvider";
import { OrderTopping } from "@/types/OrderTopping";
import { Topping } from "@/types/Topping";
import { inject, ref } from "vue";

const store = inject(userOrderKey);
if (!store) {
  throw new Error("");
}
</script>

<style scoped></style>
