<template>
  <div class="form">
    <h1>お問い合わせフォーム</h1>
    <p>
      下記フォーマットにご記入いただき、「入力内容の確認」ボタンを押して内容をご確認のうえ、送信してください。
    </p>
    <p>お問い合わせの内容によっては、お時間を頂戴する場合がございます。</p>
    <p>
      提案やご紹介のメールに対しましては、お返事を差し上げられない場合がございます。
    </p>
    <div style="margin: 20px" />
    <h2>お問い合わせ内容</h2>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="  お問い合わせの種類">
        <el-radio v-model="radio1" label="1" size="large"
          >商品や販売店についてのお問い合わせ</el-radio
        >
        <el-radio v-model="radio1" label="2" size="large"
          >その他のお問い合わせ</el-radio
        >
      </el-form-item>
      <el-form-item label="件名（必須）">
        <div class="errorMessages">{{ titleError }}</div>
        <el-input v-model="input" placeholder="件名を入力してください" />
      </el-form-item>
      <el-form-item label="お問い合わせ内容（必須）">
        <div class="errorMessages">{{ textareaError }}</div>
        <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="お問い合わせ内容を入力してください"
        />
      </el-form-item>
      <h2>お客様情報</h2>
      <el-button class="btn" type="danger" plain @click="getUserInfo"
        >ログイン情報を反映する</el-button
      >
      <el-form-item label="お名前（必須）">
        <div class="errorMessages">{{ nameError }}</div>
        <el-input v-model="userName" placeholder="例：山田太郎" />
      </el-form-item>
      <el-form-item label="メールアドレス（必須）">
        <div class="errorMessages">{{ mailAddressError }}</div>
        <el-input v-model="mailAddress" placeholder="例：taro@gmail.com" />
      </el-form-item>
      <el-button type="primary" plain v-on:click="errorCheck"
        >入力内容を送信する</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useUserProviderKey } from "@/providers/useUserProvider";
import { inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const radio1 = ref("1");
const radio2 = ref("2");
const input = ref("");
const textarea = ref("");
const userName = ref("");
const mailAddress = ref("");
const errorMessage = ref("");
const checkError = ref(true);
const nameError = ref("");
const mailAddressError = ref("");
const titleError = ref("");
const textareaError = ref("");
const userStore = inject(useUserProviderKey);
const labelPosition = ref("top");
const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
/**
 * ログイン中のユーザー情報を取得する.
 */
const getUserInfo = () => {
  const userInfo = userStore?.currentUser.value;
  userName.value = userInfo?.name as string;
  mailAddress.value = userInfo?.email as string;
};
/**
 * エラー処理とフォームの送信.
 */
const errorCheck = () => {
  // 件名のエラーチェック
  if (input.value === "") {
    titleError.value = "件名を入力してください    ";
  } else {
    titleError.value = "";
  }
  //お問い合わせ内容のエラーチェック
  if (textarea.value === "") {
    textareaError.value = "お問い合わせ内容を入力してください";
  } else {
    textareaError.value = "";
  }
  //名前のエラーチェック
  if (userName.value === "") {
    nameError.value = "名前が入力されていません";
    // checkError.value = false;
  } else {
    nameError.value = "";
    // checkError.value = true;
  }
  // ある文字列を含むか
  const includeOrNot = (str: string): boolean => {
    return mailAddress.value.includes(str);
  };
  //メールアドレスのエラーチェック
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
  if (checkError.value === false) {
    return;
  }
  //お問い合わせ完了画面に遷移
  router.push("/inquiryComplete");
};
</script>

<style scoped>
.form {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 75px;
}
.el-form {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.errorMessages {
  color: red;
}
</style>
