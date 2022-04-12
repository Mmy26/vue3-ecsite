<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { format, getDate, getHours, getMonth, getYear } from "date-fns";
import { orderProviderKey } from "@/providers/useOrderProvider";
import { useUserProviderKey } from "@/providers/useUserProvider";
import axios from "axios";

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
const orderStore = inject(orderProviderKey);
const userStore = inject(useUserProviderKey);

if (!userStore) {
  throw new Error("");
}

if (!orderStore) {
  throw new Error("");
}

onMounted(() => {
  userStore.currentUser;
});

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

  const includeOrNot = (str: string): boolean => {
    return mailAddress.value.includes(str);
  };

  if (mailAddress.value === "") {
    mailAddressError.value = "メールアドレスが入力されていません";
    checkError.value = false;
  } else if (!includeOrNot("@")) {
    mailAddressError.value = "メールアドレスの形式が正しくありません";
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

  const telCheck = (): boolean => {
    let telError = true;
    let targetArray = new Array<string>();
    if (includeOrNot("-")) {
      telError = false;
    }
    // split...（）に入っている文字列で配列を区切る.
    targetArray = telephone.value.split("-");
    if (targetArray[0].length !== 3) {
      telError = false;
    } else if (targetArray[1].length !== 4) {
      telError = false;
    } else if (targetArray[2].length !== 4) {
      telError = false;
    }
    return telError;
  };

  if (telCheck()) {
    telephoneError.value = "電話番号はXXX-XXXX-XXXXの形式で入力してください";
  }

  if (telephone.value === "") {
    telephoneError.value = "電話番号が入力されていません";
    checkError.value = false;
  } else {
    telephoneError.value = "";
    checkError.value = true;
  }

  const hoursCheck = (): boolean => {
    let currentDate = new Date();
    let splitedArray = deliveryDate.value.split("-");
    let year = Number(splitedArray[0]);
    let month = Number(splitedArray[1]);
    let day = Number(splitedArray[2]);
    let targetDate = new Date(year, month - 1, day);

    return (
      targetDate <=
      new Date(
        getYear(currentDate),
        getMonth(currentDate),
        getDate(currentDate),
        getHours(currentDate) + 3
      )
    );
  };

  if (hoursCheck()) {
    deliveryDateError.value = "今から3時間後の日時をご入力ください";
    checkError.value = false;
  } else if (deliveryDate.value === "") {
    deliveryDateError.value = "配達日時を選択してください";
    checkError.value = false;
  } else {
    deliveryDateError.value = "";
    checkError.value = true;
  }

  if (checkError.value === false) {
    return;
  }

  let currentUser = userStore.currentUser;
  let currentOrder = orderStore;

  // 注文内容を送信する
  // const response = await axios.post(
  //   "http://153.127.48.168:8080/ecsite-api/order",
  //   {
  //     userId: currentUser.value.id,
  //     status: currentOrder.status,
  //     destinationName: name.value,
  //     destinationEmail: mailAddress.value,
  //     destinationZipcode: zipCode.value.replace(
  //       "-",
  //       ""
  //     ),
  //     destinationAddress: address.value,
  //     destinationTel: address.value,
  //     deliveryTime: deliveryDate.value.replaceAll("-","/")+ " " + deliveryTime.value + format(new Date(),":mm/ss"),

  //   }
  // );

  // 注文完了ページに遷移
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
            <label for="name">お名前</label>
            <input id="name" type="text" v-model="name" />
            <div>例：山田太郎</div>
          </div>
          <div>{{ nameError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="email">メールアドレス</label>
            <input id="email" type="email" v-model="mailAddress" />
            <div>例：taro@gmail.com</div>
          </div>
          <div>{{ mailAddressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
            <div>例：1600022</div>
          </div>
          <div>{{ zipCodeError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="address">住所</label>
            <input id="address" type="text" v-model="address" />
            <div>例：東京都新宿区新宿4-3-25　TOKYU REIT新宿ビル8F</div>
          </div>
          <div>{{ addressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="tel">電話番号</label>
            <input id="tel" type="tel" v-model="telephone" />
            <div>例：03-6675-3638</div>
          </div>
          <div>{{ telephoneError }}</div>
        </div>
        <div class="row order-confirm-delivery-datetime">
          <div class="input-field">
            <label for="address">配達日時</label>
            <input id="deliveryDate" type="date" v-model="deliveryDate" />
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
          <div>例：2022年/01月/01日 13時</div>
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
