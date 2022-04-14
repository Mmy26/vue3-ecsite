<script setup lang="ts">
import { onMounted, reactive, ref, inject } from "vue";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { userOrderKey } from "@/providers/useOrderProvider";

const store = inject(userOrderKey);
if (!store) {
  throw new Error("");
}

const currentItem = reactive(
  new Item(0, "", "", "", 0, 0, "", false, new Array<Topping>())
);

const router = useRouter();
console.log("created");
// 選択した商品サイズの情報
const selectItemSize = ref<string>("M");
// 選択したトッピング情報
const selectToppingList = ref<number[]>([]);
// 選択した商品の数量
const selectItemQuantity = ref<number>(1);
// 選択商品情報(トッピング情報も入る)
const selectedItem = ref(
  new Item(0, "", "", "", 0, 0, "", false, new Array<Topping>())
);

// URLからidを取得
const route = useRoute();
const itemId = route.params.id;

// APIから書品情報を取得し事前に設置した空のオブジェクトに入れる
const getToppingData = async (): Promise<void> => {
  console.log("メソッド起動");
  console.log(itemId);

  const response = await axios.get(
    `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
  );
  console.dir(JSON.stringify(response.data));
  selectedItem.value = response.data.item;
  console.dir(JSON.stringify(selectedItem.value));
};

// 非同期で上記のメソッドを実行
onMounted(getToppingData);

console.log(selectItemSize.value);

// 注文メソッド
const addItem = () => {
  console.log("call");

  //payload
  store.addOrderItem({
    selectItemSize: selectItemSize.value,
    selectOrderToppingList: selectToppingList.value,
    selectQuantity: selectItemQuantity.value,
    selectItem: selectedItem.value as Item,
  });

  console.log(selectItemSize.value);
  console.log(selectToppingList.value);
  console.log(selectItemQuantity.value);
  console.log(selectedItem.value);
  console.log(store.userOrderInfo);
  router.push("/cartlist");
};
</script>

<template>
  {{ "name:" + selectedItem.name }}<br />
  {{ "description:" + selectedItem.description }}
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
      <div>
        <span v-for="topping of selectedItem.toppingList" :key="topping.id">
          {{ topping.name
          }}<input
            type="checkbox"
            :value="topping.id"
            v-model="selectToppingList"
          />
        </span>
      </div>
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
      <div><button @click="addItem" type="button">Order</button></div>
    </div>
  </form>
</template>
<style scoped></style>
