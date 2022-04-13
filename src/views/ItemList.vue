<script setup lang="ts">
import { itemListKey } from "@/providers/useItemListProvider";
import type { Item } from "@/types/Item";
import { inject, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const store = inject(itemListKey);
const searchItemName = ref("");
const searchItemMessage = ref("");
const sorting = ref("sort");
let currentItemList = ref<Item[]>([]);

if (!store) {
  throw new Error("");
}

//メソッド
onMounted(() => {
  if (store.itemList.value.length === 0) {
    store.setItemList();
    currentItemList.value = store.itemList.value;
  } else {
    currentItemList.value = store.itemList.value;
  }
});
const searchItems = (searchItemName: string) => {
  currentItemList.value = store.searchItemList(searchItemName);
  searchItemMessage.value = "";
  if (currentItemList.value.length === 0 || searchItemName === "") {
    currentItemList.value = store.itemList.value;
    searchItemMessage.value = "該当する商品がありません";
  }
};
const sortByUser = () => {
  searchItemMessage.value = "";
  //五十音順
  if (sorting.value === "name") {
    store.sortByName();
    //料金低い順
  } else if (sorting.value === "descPrice") {
    store.sortByDescPrice();
    //料金高い順
  } else if (sorting.value === "ascPrice") {
    store.sortByAscPrice();
  }
};
</script>

<template>
  <form method="post" class="search-form">
    <input id="searchItem" class="search-name-input" v-model="searchItemName" />
    <button
      class="btn search-btn"
      type="button"
      @click="searchItems(searchItemName)"
    >
      <span>検&nbsp;&nbsp;索</span>
    </button>
  </form>
  <select
    style="display: block"
    name="order"
    v-model="sorting"
    v-on:change="sortByUser"
  >
    <option value="sort">並び替える</option>
    <option value="name">五十音順</option>
    <option value="descPrice" v-on:change="sortByUser">値段が安い順</option>
    <option value="ascPrice" v-on:change="sortByUser">値段が高い順</option>
  </select>

  <div>{{ searchItemMessage }}</div>

  <!-- gutterは間隔の幅を表す -->
  <el-row :gutter="10">
    <!-- spanはgrid数を表す(大きさは24まで) -->
    <el-col
      class="bg-purple"
      :span="8"
      v-for="item of currentItemList"
      :key="item.id"
    >
      <RouterLink :to="'/itemDetail/' + item.id">
        <div>{{ item.name }}</div>
      </RouterLink>
      <div>{{ item.description }}</div>
      <div>{{ item.priceM }}円</div>
      <div>{{ item.priceL }}円</div>
      <RouterLink :to="'/itemDetail/' + item.id">
        <img :src="item.imagePath" />
      </RouterLink>
    </el-col>
  </el-row>
</template>

<style scoped>
.bg-purple {
  background: #d3dce6;
  border: solid black 1px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 20vh;
}
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>
