<script setup lang="ts">
import { onMounted, ref } from "vue";
type ToppingDataType = {
  id: number;
  name: string;
  imgPath: string;
  remarks: string;
};
const toppingDataList = ref<Array<ToppingDataType>>([
  {
    id: 1,
    name: "バター",
    imgPath: "/img_topping/topping01.jpg",
    remarks: "コクをプラス！",
  },
  {
    id: 2,
    name: "のり",
    imgPath: "/img_topping/topping02.jpg",
    remarks: "磯の香りがたまらない！",
  },
  {
    id: 3,
    name: "追い飯",
    imgPath: "/img_topping/topping03.jpg",
    remarks: "スープとの相性バツグン!",
  },
  {
    id: 4,
    name: "チャーシュー",
    imgPath: "/img_topping/topping04.jpg",
    remarks: "ガッツリ感をプラス！",
  },
  {
    id: 5,
    name: "メンマ",
    imgPath: "/img_topping/topping05.jpg",
    remarks: "当店自慢のメンマ！",
  },
  {
    id: 6,
    name: "煮たまご",
    imgPath: "/img_topping/topping06.jpg",
    remarks: "トッピングの王道！",
  },
]);

let selectToppingDataList = ref(new Array<ToppingDataType>());

const setSelectToppingData = () => {
  let num1 = 0;
  let num2 = 0;
  let num3 = 0;
  do {
    const randomNum1 = Math.floor(Math.random() * 6);
    const randomNum2 = Math.floor(Math.random() * 6);
    const randomNum3 = Math.floor(Math.random() * 6);
    num1 = randomNum1;
    num2 = randomNum2;
    num3 = randomNum3;
  } while (num1 === num2 || num2 === num3 || num3 === num1);
  selectToppingDataList.value = [
    toppingDataList.value[num1],
    toppingDataList.value[num2],
    toppingDataList.value[num3],
  ];
};
onMounted(() => {
  setSelectToppingData();
});
</script>

<template>
  <h2 class="title">おすすめのトッピング</h2>
  <el-row :gutter="10">
    <el-col :span="3"></el-col>
    <el-col
      :span="6"
      v-for="toppingData of selectToppingDataList"
      class="center"
    >
      <div class="toppingArea">
        <h2 class="toppingTitle">{{ toppingData.name }}</h2>
        <el-image
          style="width: 200px; height: 200px"
          :src="toppingData.imgPath"
          fit="contain"
          class="center toppingImg"
        />
        <p class="center">{{ toppingData.remarks }}</p>
      </div>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>

<style scoped>
.title {
  text-align: center;
}
.toppingTitle {
  text-align: center;
}
.center {
  text-align: center;
}
.toppingArea {
  padding-top: 5px;
  width: 100%;
  height: 100%;
  background-color: #eee;
  box-shadow: 2px 2px 2px 2px lightgray;
  border-radius: 5px;
}
</style>
