<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { format, getDate, getHours, getMonth, getYear } from "date-fns";
import { useUserProviderKey } from "@/providers/useUserProvider";
import axios from "axios";
import { CartListKey } from "@/providers/useCartProvider";
import OrderItemFormList from "@/components/OrderItemFormList.vue";
import CreditCardPayment from "@/components/CreditCardPayment.vue";

const name = ref("");
const mailAddress = ref("");
const zipCode = ref("");
const address = ref("");
const telephone = ref("");
const deliveryDate = ref("");
const deliveryTime = ref("10");
const paymentMethod = ref("1");

const errorMessage = ref("");
const nameError = ref("");
const mailAddressError = ref("");
const zipCodeError = ref("");
const addressError = ref("");
const telephoneError = ref("");
const deliveryDateError = ref("");
const checkError = ref(true);

const router = useRouter();
const orderStore = inject(CartListKey);
const userStore = inject(useUserProviderKey);

if (!userStore) {
  throw new Error("");
}

if (!orderStore) {
  throw new Error("");
}

onMounted(() => {
  userStore.currentUser;
  orderStore.userOrderInfo.value;
});

/**
 * 注文する.
 */
const orderConfirm = async () => {
  // エラー処理
  if (name.value === "") {
    nameError.value = "名前が入力されていません";
    checkError.value = false;
  } else {
    nameError.value = "";
    checkError.value = true;
  }

  // ある文字列を含むか
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

  // 電話番号の表記チェック
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

  // 配達日時のチェック
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
  let currentOrder = orderStore.userOrderInfo.value;

  // 注文内容を送信する
  const response = await axios.post(
    "http://153.127.48.168:8080/ecsite-api/order",
    {
      userId: currentUser.value.id,
      status: currentOrder.status,
      totalPrice: currentOrder.calcTotalPrice,
      destinationName: name.value,
      destinationEmail: mailAddress.value,
      destinationZipcode: zipCode.value.replace("-", ""),
      destinationAddress: address.value,
      destinationTel: telephone.value,
      deliveryTime:
        deliveryDate.value.split("-").join("/") +
        " " +
        deliveryTime.value +
        format(new Date(), ":mm:ss"),
      paymentMethod: paymentMethod.value,
      orderItemFormList: currentOrder.orderItemList,
    }
  );

  console.log(JSON.stringify(response));

  let {
    distinationName,
    distinationEmail,
    distinationZipcode,
    distinationAddress,
    distinationTel,
  } = orderStore.userOrderInfo.value;

  if (response.data.status !== "success") {
    // 失敗ならエラーメッセージを出す
    errorMessage.value = "注文できませんでした";
    return;
  }

  distinationName = name.value;
  distinationEmail = mailAddress.value;
  distinationZipcode = zipCode.value;
  distinationAddress = address.value;
  distinationTel = telephone.value;

  // 注文完了ページに遷移
  router.push("/orderFinished");
  console.log("注文されました");
};

/**
 * APIで郵便番号から住所を取得する.
 */
const getAddress = async () => {
  if (zipCode.value === "") {
    zipCodeError.value = "郵便番号が入力されていません";
    checkError.value = false;
    return;
  }
  zipCodeError.value = "";
  checkError.value = true;

  const response = await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
    params: {
      zipcode: zipCode.value,
    },
  });
  const data = response.data.results[0];
  address.value = data.address1 + data.address2 + data.address3;
};
</script>

<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文内容確認</h1>
      <!-- table -->
      <OrderItemFormList></OrderItemFormList>
      <h2 class="page-title">お届け先情報</h2>
      <div class="order-confirm-delivery-info">
        <div class="row">
          <div class="input-field">
            <label for="name">お名前</label>
            <input id="name" type="text" v-model="name" />
            <div class="ex">例：山田太郎</div>
          </div>
          <div class="errorMessages">{{ nameError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="email">メールアドレス</label>
            <input id="email" type="email" v-model="mailAddress" />
            <div class="ex">例：taro@gmail.com</div>
          </div>
          <div class="errorMessages">{{ mailAddressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <button class="btn" type="button" @click="getAddress">
              <span>住所検索</span>
            </button>
            <div class="ex">例：1600022</div>
          </div>
          <div class="errorMessages">{{ zipCodeError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="address">住所</label>
            <input id="address" type="text" v-model="address" />
            <div class="ex">
              例：東京都新宿区新宿4-3-25　TOKYU REIT新宿ビル8F
            </div>
          </div>
          <div class="errorMessages">{{ addressError }}</div>
        </div>
        <div class="row">
          <div class="input-field">
            <label for="tel">電話番号</label>
            <input id="tel" type="tel" v-model="telephone" />
            <div class="ex">例：03-6675-3638</div>
          </div>
          <div class="errorMessages">{{ telephoneError }}</div>
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
              value="10"
              v-model="deliveryTime"
            />
            <span>10時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="11"
              v-model="deliveryTime"
            />
            <span>11時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="12"
              v-model="deliveryTime"
            />
            <span>12時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="13"
              v-model="deliveryTime"
            />
            <span>13時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="14"
              v-model="deliveryTime"
            />
            <span>14時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="15"
              v-model="deliveryTime"
            />
            <span>15時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="16"
              v-model="deliveryTime"
            />
            <span>16時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="17"
              v-model="deliveryTime"
            />
            <span>17時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="18"
              v-model="deliveryTime"
            />
            <span>18時</span>
          </label>
          <div class="ex">例：2022年/01月/01日 13時</div>
          <div class="errorMessages">{{ deliveryDateError }}</div>
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

      <div class="order-confirm-delivery-info">
        <div v-if="paymentMethod === '2'">
          <CreditCardPayment></CreditCardPayment>
        </div>
      </div>

      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="orderConfirm">
          <span>この内容で注文する</span>
        </button>
      </div>
      <div class="errorMessages">{{ errorMessage }}</div>
    </div>
    <!-- end container -->
  </div>
</template>

<style scoped>
@import url("@/assets/css/input-check.css");
</style>
