<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const mailAddress = ref("");
const zipCode = ref("");
const address = ref("");
const telephone = ref("");
const deliveryDate = ref("");
const deliveryTime = ref("10時");
const paymentMethod = ref(1);

const nameError = ref("");
const mailAddressError = ref("");
const zipCodeError = ref("");
const addressError = ref("");
const telephoneError = ref("");
const deliveryDateError = ref("");
const checkError = ref(true);
const router = useRouter();

/**
 * 注文する.
 */
const order = () => {
  // エラー処理
  if (name.value === "") {
    nameError.value = "名前が入力されていません";
    checkError.value = false;
  } else {
    nameError.value = "";
    checkError.value = true;
  }

  if (mailAddress.value === "") {
    mailAddressError.value = "メールアドレスが入力されていません";
    checkError.value = false;
  } else {
    mailAddressError.value = "";
    checkError.value = true;
  }

  if (zipCode.value === "") {
    zipCodeError.value = "郵便番号が入力されていません";
    checkError.value = false;
  } else {
    zipCodeError.value = "";
    checkError.value = true;
  }

  if (address.value === "") {
    addressError.value = "住所が入力されていません";
    checkError.value = false;
  } else {
    addressError.value = "";
    checkError.value = true;
  }

  if (telephone.value === "") {
    telephoneError.value = "電話番号が入力されていません";
    checkError.value = false;
  } else {
    telephoneError.value = "";
    checkError.value = true;
  }

  if (deliveryDate.value === "") {
    deliveryDateError.value = "適切な日時が設定されていません";
    checkError.value = false;
  } else {
    deliveryDateError.value = "";
    checkError.value = true;
  }

  if (checkError.value === false) {
    return;
  }

  router.push("/orderFinished");
};
</script>

<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文内容確認</h1>
      <!-- table -->
      <div class="row">
        <table class="striped" border="1">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img src="img/1.jpg" />
                </div>
                <span>ハワイアンパラダイス</span>
              </td>
              <td>
                <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円
                &nbsp;&nbsp;1個
              </td>
              <td>
                <ul>
                  <li>ピーマン300円</li>
                  <li>オニオン300円</li>
                  <li>あらびきソーセージ300円</li>
                </ul>
              </td>
              <td><div class="text-center">3,280円</div></td>
            </tr>
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img src="img/1.jpg" />
                </div>
                <span>ハワイアンパラダイス</span>
              </td>
              <td>
                <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円
                &nbsp;&nbsp;1個
              </td>
              <td>
                <ul>
                  <li>ピーマン300円</li>
                  <li>オニオン300円</li>
                  <li>あらびきソーセージ300円</li>
                </ul>
              </td>
              <td><div class="text-center">3,280円</div></td>
            </tr>
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img src="img/1.jpg" />
                </div>
                <span>ハワイアンパラダイス</span>
              </td>
              <td>
                <span class="price">&nbsp;Ｌ</span>&nbsp;&nbsp;2,380円
                &nbsp;&nbsp;1個
              </td>
              <td>
                <ul>
                  <li>ピーマン300円</li>
                  <li>オニオン300円</li>
                  <li>あらびきソーセージ300円</li>
                </ul>
              </td>
              <td><div class="text-center">3,280円</div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <div>消費税：8,000円</div>
        <div>ご注文金額合計：38,000円 (税込)</div>
      </div>

      <h2 class="page-title">お届け先情報</h2>
      <div class="order-confirm-delivery-info">
        <div class="row">
          <div class="input-field">
            <input id="name" type="text" v-model="name" />
            <label for="name">お名前</label>
          </div>
          <div>{{ nameError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <input id="email" type="email" v-model="mailAddress" />
            <label for="email">メールアドレス</label>
          </div>
          <div>{{ mailAddressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
          <div>{{ zipCodeError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
          </div>
          <div>{{ addressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <input id="tel" type="tel" v-model="telephone" />
            <label for="tel">電話番号</label>
          </div>
          <div>{{ telephoneError }}</div>
        </div>
        <div class="row order-confirm-delivery-datetime">
          <div class="input-field">
            <input id="deliveryDate" type="date" v-model="deliveryDate" />
            <label for="address">配達日時</label>
          </div>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="10時"
              v-model="deliveryTime"
            />
            <span>10時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="11時"
              v-model="deliveryTime"
            />
            <span>11時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="12時"
              v-model="deliveryTime"
            />
            <span>12時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="13時"
              v-model="deliveryTime"
            />
            <span>13時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="14時"
              v-model="deliveryTime"
            />
            <span>14時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="15時"
              v-model="deliveryTime"
            />
            <span>15時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="16時"
              v-model="deliveryTime"
            />
            <span>16時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="17時"
              v-model="deliveryTime"
            />
            <span>17時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="18時"
              v-model="deliveryTime"
            />
            <span>18時</span>
          </label>
          <div>{{ deliveryDateError }}</div>
        </div>
      </div>

      <h2 class="page-title">お支払い方法</h2>
      <div class="row order-confirm-payment-method">
        <span>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="1"
              v-model="paymentMethod"
            />
            <span>代金引換</span>
          </label>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="2"
              v-model="paymentMethod"
            />
            <span>クレジットカード</span>
          </label>
        </span>
      </div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="order">
          <span>この内容で注文する</span>
        </button>
      </div>
    </div>
    <!-- end container -->
  </div>
</template>

<style scoped></style>
