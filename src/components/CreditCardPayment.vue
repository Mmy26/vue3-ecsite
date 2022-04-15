<script setup lang="ts">
import { CartListKey } from "@/providers/useCartProvider";
import axios from "axios";
import { inject, ref } from "vue";

const card_num = ref("");
const card_exp_year = ref("2022");
const card_exp_month = ref("1");
const card_name = ref("");
const card_cvv = ref("");
const errorMessageOfCreditCardNumber = ref("");
const errorMessageOfCreditCardNumber2 = ref("");
const errorMessageOfExpiry = ref("");
const errorMessageOfCardName = ref("");
const errorMessageOfCardCvv = ref("");
const errorMessageOfNotNumber = ref("");
const message = ref("");
const checkError = ref(true);

const orderStore = inject(CartListKey);
if (!orderStore) {
  throw new Error("");
}

const checkCredit = async () => {
  let currentOrder = orderStore.userOrderInfo.value;

  // エラーチェック
  if (card_num.value === "") {
    errorMessageOfCreditCardNumber.value =
      "クレジットカード番号を入力してください";
    checkError.value = false;
  } else {
    errorMessageOfCreditCardNumber.value = "";
    checkError.value = true;
  }

  if (card_exp_year.value === "" || card_exp_month.value === "") {
    errorMessageOfExpiry.value = "クレジットカードの有効期限を入力してください";
    checkError.value = false;
  } else {
    errorMessageOfExpiry.value = "";
    checkError.value = true;
  }

  if (card_name.value === "") {
    errorMessageOfCardName.value = "クレジットカードの名義人を入力してください";
    checkError.value = false;
  } else {
    errorMessageOfCardName.value = "";
    checkError.value = true;
  }

  if (card_cvv.value === "") {
    errorMessageOfCardCvv.value = "セキュリティコードを入力してください";
    checkError.value = false;
  } else {
    errorMessageOfCardCvv.value = "";
    checkError.value = true;
  }

  if (checkError.value === false) {
    return;
  }

  let orderNum = "";
  // 注文IDの生成
  for (let i = 0; i < 7; i++) {
    let num = Math.floor(Math.random() * 10) + 11;
    let str = String(num);
    orderNum += str;
  }
  console.log(orderNum);

  const response2 = await axios.post(
    "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment",
    {
      user_id: currentOrder.userId,
      order_number: orderNum,
      amount: currentOrder.calcTotalPrice,
      card_number: card_num.value,
      card_exp_year: card_exp_year.value,
      card_exp_month: card_exp_month.value,
      card_name: card_name.value,
      card_cvv: card_cvv.value,
    }
  );
  console.log(JSON.stringify(response2));

  if (typeof card_num.value !== "number") {
    errorMessageOfCreditCardNumber2.value =
      "クレジットカード番号は数字で入力してください";
    checkError.value = false;
  } else {
    errorMessageOfCreditCardNumber2.value = "";
    checkError.value = true;
  }

  if (String(card_num.value).length !== 16) {
    errorMessageOfCreditCardNumber.value =
      "クレジットカード番号の桁数が間違っています";
    checkError.value = false;
  } else {
    errorMessageOfCreditCardNumber.value = "";
    checkError.value = true;
  }

  if (response2.data.error_code === "E-01") {
    errorMessageOfExpiry.value = "有効期限がきれています";
    checkError.value = false;
  } else {
    errorMessageOfExpiry.value = "";
    checkError.value = true;
  }

  if (response2.data.error_code === "E-02") {
    errorMessageOfCardCvv.value = "セキュリティーコードが間違っています";
    checkError.value = false;
  } else {
    errorMessageOfCardCvv.value = "";
    checkError.value = true;
  }

  if (response2.data.error_code === "E-03") {
    errorMessageOfNotNumber.value =
      "セキュリティーコードは数字で入力してください";
    checkError.value = false;
  } else {
    errorMessageOfNotNumber.value = "";
    checkError.value = true;
  }
};
</script>

<template>
  <div class="row">
    <div class="errorMessages">
      {{ errorMessageOfCreditCardNumber }}
    </div>
    <div class="errorMessages">
      {{ errorMessageOfCreditCardNumber2 }}
    </div>
    <div class="input-field">
      <label for="creditCardNumber">クレジットカード番号</label>
      <el-input v-model.number="card_num" size="small" maxlength="16" />
      <div class="ex">例：1234 1234 5678 5678</div>
    </div>
  </div>
  <div class="row">
    <div class="errorMessages">
      {{ errorMessageOfExpiry }}
    </div>
    <div class="col s10 expiry">
      <span class="expiry2"> 有効期限： </span>
      <el-select v-model="card_exp_month" size="small">
        <el-option label="1" value="1" />
        <el-option label="2" value="2" />
        <el-option label="3" value="3" />
        <el-option label="4" value="4" />
        <el-option label="5" value="5" />
        <el-option label="6" value="6" />
        <el-option label="7" value="7" />
        <el-option label="8" value="8" />
        <el-option label="9" value="9" />
        <el-option label="10" value="10" />
        <el-option label="11" value="11" />
        <el-option label="12" value="12" /> </el-select
      >月
      <el-select v-model="card_exp_year" size="small">
        <el-option label="2022" value="2022" />
        <el-option label="2023" value="2023" />
        <el-option label="2024" value="2024" />
        <el-option label="2025" value="2025" />
        <el-option label="2026" value="2026" />
        <el-option label="2027" value="2027" />
        <el-option label="2028" value="2028" />
        <el-option label="2029" value="2029" />
        <el-option label="2030" value="2030" />
        <el-option label="2031" value="2031" />
        <el-option label="2032" value="2032" />
        <el-option label="2033" value="2033" /> </el-select
      >年
      <div class="ex">例：01月/2022年</div>
    </div>
  </div>
  <div class="row">
    <div class="errorMessages">
      {{ errorMessageOfCardName }}
    </div>
    <div class="input-field">
      <label for="card_name">カード名義人</label>
      <el-input v-model="card_name" size="small" />
    </div>
    <div class="ex">例：TARO YAMADA</div>
  </div>
  <div class="row">
    <div class="errorMessages">
      {{ errorMessageOfCardCvv }}
    </div>
    <div class="errorMessages">
      {{ errorMessageOfNotNumber }}
    </div>
    <div class="input-field">
      <label for="card_cvv">セキュリティーコード</label>
      <el-input v-model.number="card_cvv" size="small" />
    </div>
    <div class="ex">例：123</div>
  </div>
  <div>
    <el-button type="danger" plain size="small" @click="checkCredit"
      >クレジットカードが利用できるか確認する</el-button
    >
  </div>
  <div>{{ message }}</div>
</template>

<style scoped>
@import url("@/assets/css/input-check.css");
</style>
