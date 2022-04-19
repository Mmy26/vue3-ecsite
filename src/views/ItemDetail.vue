<script setup lang="ts">
import { onMounted, reactive, ref, inject } from "vue";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import axios from "axios";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { CartListKey } from "@/providers/useCartProvider";
import ToppingImg from "../components/ToppingImg.vue";
import { Coupon } from "@/types/Coupon";

const store = inject(CartListKey);
if (!store) {
  throw new Error("");
}
const currentItem = reactive(
  new Item(0, "", "", "", 0, 0, "", false, new Array<Topping>())
);
const router = useRouter();

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
// クーポン取得メッセージ
const couponMessage = ref("");
//
const canClickCoupon = ref(false);

const options = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
];

// URLからidを取得
const route = useRoute();
const itemId = route.params.id;

/**
 * APIから商品情報を取得し事前に設置した空のオブジェクトに入れる
 */
const getToppingData = async (): Promise<void> => {
  const response = await axios.get(
    `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
  );
  console.dir(JSON.stringify(response.data));
  selectedItem.value = response.data.item;
  console.dir(JSON.stringify(selectedItem.value));
};

// 非同期で上記のメソッドを実行
onMounted(getToppingData);

/**
 * クーポンを取得する.
 */
const getCoupon = () => {
  canClickCoupon.value = true;
  couponMessage.value = "クーポンを取得しました";
  store.coupon.value = new Coupon(1, "200円OFF", 200);
};

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
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <el-col :span="14" class="name">{{ selectedItem.name }}</el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <img class="itemImage" :src="selectedItem.imagePath" />
      <el-col :span="12">
        <el-col :span="4"></el-col>
        <div class="description">
          <el-col :span="16">{{ selectedItem.description }}</el-col>
        </div>
        <el-col :span="4"></el-col>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <el-col :span="14"
        >サイズ：<el-radio label="M" v-model="selectItemSize"
          ><img class="size-icon" src="/img_noodle/M_icon.png" />{{
            selectedItem.priceM.toLocaleString()
          }}円(税抜)</el-radio
        >
        <el-radio label="L" name="size" v-model="selectItemSize">
          <img class="size-icon" src="/img_noodle/L_icon.png" />{{
            selectedItem.priceL.toLocaleString()
          }}円(税抜)</el-radio
        >
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <div class="topping">
        トッピング： 1つにつき М 200円(税抜) Ｌ 300円(税抜)
      </div>
      <el-col :span="14" class="checkbox-group">
        <div v-for="topping of selectedItem.toppingList" :key="topping.id">
          <el-checkbox-group v-model="selectToppingList">
            <el-checkbox
              size="default"
              :label="topping.id"
              :value="topping.id"
              class="checkbox"
              >{{ topping.name }}&nbsp;</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <el-col :span="14">
        数量：<el-select v-model="selectItemQuantity">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /> </el-select
      ></el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"></el-col>
      <el-col class="total-price" :span="14"
        ><span>この商品の合計金額:</span>
        {{ calcSubTotal.toLocaleString() + "円(税抜)" }}</el-col
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
    <div>
      <button type="button" @click="getCoupon" v-bind:disabled="canClickCoupon">
        200OFFクーポンを取得する
      </button>
    </div>
    <div>{{ couponMessage }}</div>

    <!-- おすすめトッピングの部分 -->
    <ToppingImg />
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 30px;
}
.size-icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.itemImage {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin: 10px;
  border-radius: 30px;
}
.name {
  font-size: 30px;
  font-weight: bold;
}
.topping {
  font-weight: bold;
  margin-top: 10px;
}
.description {
  margin-top: 60px;
  margin-left: 20px;
  font-size: 20px;
}
.total-price {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
}
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-top: 10px;
}
.checkbox {
  margin-right: 10px;
}
</style>
