<template>
  <div></div>
</template>

<script setup lang="ts">
import { userOrderKey } from "@/providers/useOrderProvider";
import { inject, ref } from "vue";

const store = inject(userOrderKey);
if (!store) {
  throw new Error("");
}
</script>

<style scoped></style>
