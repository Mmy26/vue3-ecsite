<script setup lang="ts">
import { onMounted, reactive, ref, inject } from "vue";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import axios from "axios";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { CartListKey } from "@/providers/useCartProvider";

const store = inject(CartListKey);
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

/**
 * APIから商品情報を取得し事前に設置した空のオブジェクトに入れる
 */
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

/**
 小計金額の計算（変更され都度反映される）.
 * @returns - 小計金額
 */
const calcSubTotal = computed(() => {
  if (selectItemSize.value === "M") {
    return (
      (selectedItem.value.priceM + selectToppingList.value.length * 200) *
      selectItemQuantity.value
    );
  } else {
    return (
      (selectedItem.value.priceL + selectToppingList.value.length * 300) *
      selectItemQuantity.value
    );
  }
});

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

  router.push("/cartlist");
};
</script>

<template>
  <!-- 今だけ境界線がわかるようにborderをつけました。 -->
  <el-row :gutter="20" class="border">
    <el-col :span="2"></el-col>
    <el-col :span="20"><span>商品詳細</span></el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="2"></el-col>
    <el-col :span="10">
      <img class="itemImage" :src="selectedItem.imagePath"
    /></el-col>
    <el-col :span="10">
      <el-row :gutter="20"></el-row>
      <el-row :gutter="20">
        <el-col :span="24">{{ selectedItem.name }}</el-col>
        <el-col :span="24">{{ selectedItem.description }}</el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14"
      ><div>サイズ</div>
      <span>M</span>
      <input
        type="radio"
        value="M"
        name="size"
        v-model="selectItemSize"
        selected />
      <span>L</span>
      <input type="radio" value="L" name="size" v-model="selectItemSize"
    /></el-col>
    <el-col :span="5"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14"
      ><div>トッピング： 1つにつき М 200円(税抜) Ｌ 300円(税抜)</div>
      <span v-for="topping of selectedItem.toppingList" :key="topping.id">
        {{ topping.name
        }}<input
          type="checkbox"
          :value="topping.id"
          v-model="selectToppingList"
        /> </span
    ></el-col>
    <el-col :span="5"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14"
      ><div>数量:</div>
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
      </select></el-col
    >
    <el-col :span="5"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14"
      ><span>この商品の合計金額:</span>
      {{ "税抜" + calcSubTotal.toLocaleString() + "円" }}</el-col
    >
    <el-col :span="5"></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14"
      ><el-button type="primary" plain @click="addItem"
        >カートに追加</el-button
      ></el-col
    >
    <el-col :span="5"></el-col>
  </el-row>
</template>
<style scoped>
.itemImage {
  width: 300px;
  height: 300px;
}
</style>
