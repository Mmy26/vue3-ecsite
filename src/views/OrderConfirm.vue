<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { format, getDate, getHours, getMonth, getYear } from "date-fns";
import { useUserProviderKey } from "@/providers/useUserProvider";
import axios from "axios";
import { CartListKey } from "@/providers/useCartProvider";
import OrderItemFormList from "@/components/OrderItemFormList.vue";
import CreditCardPayment from "@/components/CreditCardPayment.vue";

const userName = ref("");
const mailAddress = ref("");
const zipCode = ref("");
const address = ref("");
const telephone = ref("");
const deliveryDate = ref("");
const deliveryTime = ref("1");
const paymentMethod = ref("1");

const errorMessage = ref("");
const nameError = ref("");
const mailAddressError = ref("");
const zipCodeError = ref("");
const addressError = ref("");
const telephoneError = ref("");
const deliveryDateError = ref("");
const checkError = ref(true);
const showUseCoupon = ref(true);
const couponMessage = ref("クーポンを使用する");
const couponError = ref("");
const canUseCoupon = ref(false);
const isCoupon = ref(true);

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
  if (orderStore.coupon.value.id === 0) {
    canUseCoupon.value = true;
    isCoupon.value = false;
    return;
  }
});

/**
 * ログイン中のユーザー情報を取得する.
 */
const getUserInfo = () => {
  console.log("ok");

  const userInfo = userStore.currentUser.value;
  userName.value = userInfo.name;
  mailAddress.value = userInfo.email;
  zipCode.value = userInfo.zipcode;
  address.value = userInfo.address;
  telephone.value = userInfo.telephone;
};

/**
 * クーポンを使う.
 */
const useCoupon = () => {
  if (showUseCoupon.value === true) {
    // クーポン利用の表示切り替え
    showUseCoupon.value = false;
    couponMessage.value = "クーポンを利用しない";
  } else {
    showUseCoupon.value = true;
    couponMessage.value = "クーポンを利用する";
  }
  console.log("ok");
};

/**
 * 注文する.
 */
const orderConfirm = async () => {
  // エラー処理
  if (userName.value === "") {
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
      destinationName: userName.value,
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
      orderItemFormList: currentOrder.makeOrderFormList,
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

  distinationName = userName.value;
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
    <div>
      <h1 class="page-title">注文内容確認</h1>
      <!-- table -->
      <OrderItemFormList></OrderItemFormList>
      <!-- <Form></Form> -->
      <h2 class="page-title">お届け先情報</h2>
      <div class="container">
        <div class="order-confirm-delivery-info">
          <el-button
            class="btn"
            type="danger"
            plain
            size="small"
            @click="getUserInfo"
            >ログイン情報を反映する</el-button
          >
          <div class="row">
            <div class="input-field">
              <label for="name">お名前</label>
              <el-input v-model="userName" size="small" />
              <div class="ex">例：山田太郎</div>
            </div>
            <div class="errorMessages">{{ nameError }}</div>
          </div>
          <div class="row">
            <div class="input-field">
              <label for="email">メールアドレス</label>
              <el-input v-model="mailAddress" size="small" />
              <div class="ex">例：taro@gmail.com</div>
            </div>
            <div class="errorMessages">{{ mailAddressError }}</div>
          </div>
          <div class="row">
            <div class="input-field">
              <label for="zipcode">郵便番号(ハイフンなし)</label>
              <el-input v-model="zipCode" size="small" maxlength="7" />
              <el-button type="danger" plain size="small" @click="getAddress"
                >住所検索</el-button
              >
              <div class="ex">例：1600022</div>
            </div>
            <div class="errorMessages">{{ zipCodeError }}</div>
          </div>
          <div class="row">
            <div class="input-field">
              <label for="address">住所</label>
              <el-input v-model="address" size="small" />
              <div class="ex">
                例：東京都新宿区新宿4-3-25　TOKYU REIT新宿ビル8F
              </div>
            </div>
            <div class="errorMessages">{{ addressError }}</div>
          </div>
          <div class="row">
            <div class="input-field">
              <label for="tel">電話番号</label>
              <el-input v-model="telephone" size="small" />
              <div class="ex">例：03-6675-3638</div>
            </div>
            <div class="errorMessages">{{ telephoneError }}</div>
          </div>
          <div class="row order-confirm-delivery-datetime">
            <div class="input-field">
              <label for="address">配達日時</label>
              <el-input v-model="deliveryDate" type="date" size="small" />
            </div>
            <el-radio v-model="deliveryTime" label="1" size="small"
              >10時</el-radio
            >
            <el-radio v-model="deliveryTime" label="2" size="small"
              >11時</el-radio
            >
            <el-radio v-model="deliveryTime" label="3" size="small"
              >12時</el-radio
            >
            <el-radio v-model="deliveryTime" label="4" size="small"
              >13時</el-radio
            >
            <el-radio v-model="deliveryTime" label="5" size="small"
              >14時</el-radio
            >
            <el-radio v-model="deliveryTime" label="6" size="small"
              >15時</el-radio
            >
            <el-radio v-model="deliveryTime" label="7" size="small"
              >16時</el-radio
            >
            <el-radio v-model="deliveryTime" label="8" size="small"
              >17時</el-radio
            >
            <el-radio v-model="deliveryTime" label="9" size="small"
              >18時</el-radio
            >
            <div class="ex">例：2022年/01月/01日 13時</div>
            <div class="errorMessages">{{ deliveryDateError }}</div>
          </div>
          <div class="row">
            <div class="input-field">
              <div>クーポンの利用</div>
              <div class="display-change">
                <div v-if="showUseCoupon" class="use-msg">使わない</div>
                <div v-else class="use-msg">
                  使う：{{ orderStore.coupon.value.name }}クーポン
                </div>
                <div class="ex" v-if="isCoupon">
                  ご利用可能：{{ orderStore.coupon.value.name }}クーポン
                </div>
                <div class="ex" v-else>ご利用可能：クーポンなし</div>
              </div>
              <el-button
                class="btn coupon"
                type="danger"
                plain
                size="small"
                @click="useCoupon"
                v-bind:disabled="canUseCoupon"
              >
                {{ couponMessage }}</el-button
              >
            </div>
            <div class="errorMessages">{{ couponError }}</div>
          </div>
        </div>
      </div>

      <h2 class="page-title">お支払い方法</h2>
      <div class="container">
        <div class="row order-confirm-delivery-info">
          <div class="radio">
            <el-radio v-model="paymentMethod" label="1" size="large"
              >代金引換</el-radio
            >
            <el-radio v-model="paymentMethod" label="2" size="large"
              >クレジットカード</el-radio
            >
          </div>
          <div>
            <div v-if="paymentMethod === '2'">
              <CreditCardPayment></CreditCardPayment>
            </div>
          </div>
        </div>
      </div>

      <div class="row order-confirm-btn">
        <el-button type="danger" size="large" @click="orderConfirm"
          >この内容で注文する</el-button
        >
      </div>
      <div class="errorMessages">{{ errorMessage }}</div>
    </div>
  </div>
  <!-- end container -->
</template>

<style scoped>
@import url("@/assets/css/input-check.css");

.btn {
  margin-bottom: 8px;
}
.container {
  display: flex;
  justify-content: center;
}

.coupon {
  margin-top: 8px;
}

.display-change{
  background-color: white;
  border-radius: 2px;
  padding:8px;
}

.order-confirm-btn {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 40px;
}
.order-confirm-delivery-info {
  padding: 40px;
  width: 700px;
  background-color: rgb(255, 244, 240);
}

.page-title {
  text-align: center;
  font-weight: normal;
}

.radio {
  margin-bottom: 8px;
}

.use-msg {
  font-size: 13px;
}
</style>
