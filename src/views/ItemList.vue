<script setup lang="ts">
import { itemListKey } from "../providers/useItemListProvider";
import type { Item } from "../types/Item";
import { inject, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const store = inject(itemListKey);
const searchItemName = ref("");
const searchItemMessage = ref("");
const sorting = ref("");
const shouldShowSorting = ref(true);
const value = ref("");
const options = [
  {
    value: "recommend",
    label: "おすすめ順",
  },
  {
    value: "name",
    label: "五十音順",
  },
  {
    value: "descPrice",
    label: "値段が安い順",
  },
  {
    value: "ascPrice",
    label: "値段が高い順",
  },
];
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
    searchItemList.value = store.itemList.value;
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
    <el-row class="search-form">
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
  <el-select
    v-if="shouldShowSorting"
    style="display: block"
    name="order"
    v-model="sorting"
    v-on:change="sortByUser"
    placeholder="並び替える"
    size="large"
    class="select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div class="category">
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('all')"
      >全ての商品</el-button
    >
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('pigBones')"
    >
      豚骨
    </el-button>
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('miso')"
    >
      味噌
    </el-button>
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('soysauce')"
    >
      醤油
    </el-button>
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('salt')"
    >
      塩
    </el-button>
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('seafood')"
    >
      魚介
    </el-button>
    <el-button
      round
      type="danger"
      class="category-btn"
      v-on:click="getItemlistSortByCategory('other')"
    >
      その他
    </el-button>
  </div>

  <!-- gutterは間隔の幅を表す -->
  <el-row :gutter="20" class="items">
    <!-- spanはgrid数を表す(大きさは24まで) -->
    <el-col
      class="bg-purple"
      :sm="24"
      :md="12"
      :lg="8"
      v-for="item of currentItemList"
      :key="item.id"
    >
      <el-space direction="vertical" size="large">
        <el-card
          :body-style="{ padding: '30px', height: '500px' }"
          class="card"
        >
          <RouterLink :to="'/itemDetail/' + item.id">
            <img class="food" :src="item.imagePath" />
          </RouterLink>
          <RouterLink :to="'/itemDetail/' + item.id">
            <div class="name">{{ item.name }}</div>
          </RouterLink>
          <div class="size-wrapper">
            <div class="size" id="size">
              <img class="size-icon" src="/img_noodle/M_icon.png" /><span>{{
                item.formatPriceM
              }}</span
              >円(税抜)
            </div>
            <div class="size">
              <img class="size-icon" src="/img_noodle/L_icon.png" /><span>{{
                item.formatPriceL
              }}</span
              >円(税抜)
            </div>
          </div>
          <div class="description">{{ item.description }}</div>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<style scoped>
.card {
  background-color: rgb(250, 228, 222);
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
.search-form {
  text-align: center;
  margin: auto;
}
.input-bar {
  margin-top: 30px;
  margin-right: 10px;
  width: 300px;
}
.select {
  margin-left: auto;
  margin-right: 20px;
  margin-top: 10px;
  width: 200px;
}
.items {
  text-align: center;
}
.name {
  font-size: 18px;
  font-weight: bold;
}
.description {
  font-size: 13px;
}
img:hover {
  opacity: 0.7;
}
.category {
  text-align: center;
}
.category-btn {
  margin-top: 20px;
  margin-bottom: 20px;
}
.size {
  padding: 3px;
}
.size-icon {
  width: 25px;
  height: 25px;
}
.size-wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
