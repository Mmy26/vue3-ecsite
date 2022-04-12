<script setup lang="ts">
import { reactive, ref } from "vue";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import axios from "axios";
console.log("created");
// 選択した商品サイズの情報
const selectItemSize = ref<string>("");
// 選択したトッピング情報
const selectToppingList = ref([]);
// 選択した商品の数量
const selectItemQuantity = ref<number>(1);
// 選択商品情報(トッピング情報も入る)
const selectedItem = ref(
  new Item(0, "", "", "", 200, 300, "", false, new Array<Topping>())
);
const itemId = ref<number>(1);

// APIから取得したトッピング情報(表示の際に使用)
const toppingData = ref([]);
const getToppingData = async (): Promise<void> => {
  const response = await axios.get(
    `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
  );
  console.dir(JSON.stringify(response));
};

console.log(selectItemSize.value);

// 注文メソッド
const addItem = () => {
  console.log(selectItemSize.value);
  console.log(selectToppingList.value);
  console.log(selectItemQuantity.value);
  console.log(selectedItem.value);
};
</script>
<template>
  <form action="">
    <div>
      <span>M</span>
      <input
        type="radio"
        value="M"
        name="size"
        v-model="selectItemSize"
        selected
      />
      <span>L</span>
      <input type="radio" value="L" name="size" v-model="selectItemSize" />
    </div>

    <div>
      <span>Topping</span>
      <input type="checkbox" value="1" v-model="selectToppingList" />
    </div>
    <div>
      <span>Quantity</span>
      <select name="" id="" v-model="selectItemQuantity">
        <option value="" disabled>選択して下さい</option>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <div><button @click="addItem()" type="button">Order</button></div>
    </div>
  </form>
</template>
<style scoped></style>
