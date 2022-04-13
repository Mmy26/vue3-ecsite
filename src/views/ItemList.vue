<script setup lang="ts">
import { itemListKey } from "@/providers/useItemListProvider";
import type { Item } from "@/types/Item";
import { inject, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const store = inject(itemListKey);
const searchItemName = ref("");
const searchItemMessage = ref("");
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
