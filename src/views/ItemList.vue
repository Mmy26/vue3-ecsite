<script setup lang="ts">
import { itemListKey } from "@/providers/useItemListProvider";
import type { Item } from "@/types/Item";
import { inject, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const store = inject(itemListKey);
const searchItemName = ref("");
const searchItemMessage = ref("");
const sorting = ref("");
const shouldShowSorting = ref(true);
let currentItemList = ref<Item[]>([]);
let searchItemList = ref<Item[]>([]);

if (!store) {
  throw new Error("");
}

//メソッド
onMounted(() => {
  if (store.itemList.value.length === 0) {
    store.setItemList();
    currentItemList.value = store.itemList.value;
    searchItemList.value = store.itemList.value;
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
  currentItemList.value = store.itemList.value;
  searchItemMessage.value = "";
  //おすすめ順
  if (sorting.value === "recommend") {
    currentItemList.value = store.sortByRecommendation();
  }
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
//カテゴリーごとの商品一覧のIDの配列
const pigBonesIdList: Array<number> = [61, 62, 63, 64, 66, 67, 68];
const misoIdList: Array<number> = [69, 75];
const soySauceIdList: Array<number> = [65, 66, 73];
const saltIdList: Array<number> = [78];
const seafoodIdList: Array<number> = [70, 72, 74];
const otherItemIdList: Array<number> = [71, 74, 76, 77];

const getItemlistSortByCategory = (category: string): void => {
  searchItemMessage.value = "";
  currentItemList.value = store.itemList.value;
  if (category === "all") {
    currentItemList.value = store.itemList.value;
    shouldShowSorting.value = true;
    return;
  }
  let itemIdList = Array<number>();
  if (category === "pigBones") {
    itemIdList = pigBonesIdList;
    shouldShowSorting.value = false;
  }
  if (category === "miso") {
    itemIdList = misoIdList;
    shouldShowSorting.value = false;
  }
  if (category === "soysauce") {
    itemIdList = soySauceIdList;
    shouldShowSorting.value = false;
  }
  if (category === "salt") {
    itemIdList = saltIdList;
    shouldShowSorting.value = false;
  }
  if (category === "seafood") {
    itemIdList = seafoodIdList;
    shouldShowSorting.value = false;
  }
  if (category === "other") {
    itemIdList = otherItemIdList;
    shouldShowSorting.value = false;
  }
  currentItemList.value = store.getItemListSortByCategory(itemIdList);
};
</script>

<template>
  <form method="post" class="search-form">
    <div>{{ searchItemMessage }}</div>
    <el-row>
      <el-col :span="24">
        <el-input
          autocomplete="on"
          list="searchItemList"
          class="w-100 m-2 input-bar"
          size="large"
          placeholder="キーワードを入力"
          v-model="searchItemName"
        /><el-button
          type="primary"
          :icon="Search"
          @click="searchItems(searchItemName)"
        />
        <datalist id="searchItemList">
          <div v-for="item of searchItemList" :key="item.name">
            <option :value="item.name"></option>
          </div>
        </datalist>
      </el-col>
    </el-row>
  </form>
  <select
    v-if="shouldShowSorting"
    style="display: block"
    name="order"
    v-model="sorting"
    v-on:change="sortByUser"
  >
    <option value="" hidden>並び替える</option>
    <option value="recommend">おすすめ順</option>
    <option value="name">五十音順</option>
    <option value="descPrice">値段が安い順</option>
    <option value="ascPrice">値段が高い順</option>
  </select>
  <div class="category">
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('all')"
    >
      全ての商品
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('pigBones')"
    >
      豚骨
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('miso')"
    >
      味噌
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('soysauce')"
    >
      醤油
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('salt')"
    >
      塩
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('seafood')"
    >
      魚介
    </button>
    <button
      class="btn-circle-stitch"
      type="button"
      v-on:click="getItemlistSortByCategory('other')"
    >
      その他
    </button>
  </div>

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
.input-bar {
  margin: 10px;
  width: 300px;
}
</style>
