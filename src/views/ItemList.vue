<script setup lang="ts">
import { itemListKey } from "@/providers/useItemListProvider";
import { inject, onMounted } from "vue";
import { RouterLink } from "vue-router";

const store = inject(itemListKey);
if (!store) {
  throw new Error("");
}

//メソッド
onMounted(() => {
  store.setItemList();
});
</script>

<template>
  <h3 class="title">商品一覧</h3>
  <!-- gutterは間隔の幅を表す -->
  <el-row :gutter="10">
    <!-- spanはgrid数を表す(大きさは24まで) -->
    <el-col
      class="bg-purple"
      :span="8"
      v-for="item of store.itemList.value"
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
.title {
  text-align: center;
}
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
