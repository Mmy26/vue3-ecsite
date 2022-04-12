<template>
  <div></div>
</template>

<script setup lang="ts">
import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import type { Topping } from "@/types/Topping";
import { id } from "element-plus/lib/locale";
import { reactive, ref } from "vue";

const currentItem = reactive(
  new Item(0, "", "", "", 0, 0, "", false, new Array<Topping>())
);
const checkedToppingList = reactive(Array<Topping>());
const size = ref<string>("M");
const quantity = ref<number>(1);
type items = {
  item: typeof currentItem;
  topping: typeof checkedToppingList;
  quantity: typeof quantity;
  size: typeof size;
};
</script>

<style scoped></style>
