<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

//姓
const lastName = ref("");
//名
const firstName = ref("");
//名前のエラー文
const nameError = ref("");
//email
const email = ref("");
//emailのエラー文
const emailError = ref("");
//パスワード
const password = ref("");
//パスワードエラー文
const passwordError = ref("");
//郵便番号
const zipcode = ref("");
//zipcodeのエラー文
const zipcodeError = ref("");
//電話番号
const telephone = ref("");
//電話番号のエラー文
const telephoneError = ref("");
//住所
const address = ref("");
//住所エラー文
const addressError = ref("");
//ルーティング関係のオブジェクト
const router = useRouter();

/**
 * ユーザー登録をするメソッド.
 */
const registerUser = async (): Promise<void> => {
  /////////////バリデーションの記述///////////////
  /**
    // エラーチェック
    let hasError = false;
    // 名前のエラー
    if (lastName.value === "" || firstName.value === "") {
      nameError.value = "姓または名が入力されていません";
      hasError = true;
    } else {
      nameError.value = "";
    }
    // メールアドレスのエラー
    if (email.value === "") {
      emailError.value = "メールアドレスが入力されていません";
      hasError = true;
    } else if (email.value.indexOf("@") === -1) {
      emailError.value = "メールアドレスの形式が不正です";
      hasError = true;
    } else {
      emailError.value = "";
    }
    // 郵便番号のエラー
    if (zipcode.value === "") {
      zipcodeError.value = "郵便番号が入力されていません";
      hasError = true;
    } else if (zipcode.value !== "") {
      if (zipcode.value.includes("-")) {
        zipcodeError.value = "郵便番号は「-(ハイフン)」なしの形式で入力してください";
        hasError = true;
      } else {
        zipcodeError.value = "";
      }
    }
    // 住所のエラー
    if (address.value === "") {
      addressError.value = "住所が入力されていません";
      hasError = true;
    } else {
      addressError.value = "";
    }
    // 電話番号のエラー
    if (telephone.value === "") {
      telephoneError.value = "電話番号が入力されていません";
      hasError = true;
    } else if (telephone.value !== "") {
      if (!telephone.value.includes("-")) {
        telephoneError.value =
          "電話番号は「-(ハイフン)」アリの形式で入力してください";
        hasError = true;
      } else {
        telephoneError.value = "";
      }
    }
    // パスワードのエラー
    if (password.value === "") {
      passwordError.value = "パスワードが入力されていません";
      hasError = true;
    } else if (password.value.length < 8 || password.value.length > 16) {
      passwordError.value = "パスワードは8文字以上16文字以内で設定してください";
      hasError = true;
    } else {
      passwordError.value = "";
    }
    // 確認用パスワードのエラー
    // if (this.password !== this.confirmationPassword) {
    //   this.confirmationPasswordError =
    //     "パスワードと確認用パスワードが不一致です";
    //   hasError = true;
    // } else {
    //   this.confirmationPasswordError = "";
    // }
    // 1つでもエラーがある場合は処理を終了する
    if (hasError === true) {
      return; //処理終了のreturn
    } */
  //////////////////バリデーション終了//////////////////////
  try {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user",
      {
        name: lastName.value + firstName.value,
        email: email.value,
        password: password.value,
        zipcode: zipcode.value,
        address: address.value,
        telephone: telephone.value,
      }
    );
    if (response.data.status === "success") {
      ElNotification({
        title: "Success",
        message: "登録できました！ログインしてください。",
        type: "success",
      });
      router.push("/login");
    } else {
      ElNotification({
        title: "Error",
        message: "登録に失敗しました。。。",
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 入力フォームをリセットするメソッド.
 */
const resetButton = () => {
  lastName.value = "";
  firstName.value = "";
  email.value = "";
  password.value = "";
  zipcode.value = "";
  address.value = "";
  telephone.value = "";
};
/**
 * (後から消すメソッド.)
 */
const test = () => {
  lastName.value = "鈴木";
  firstName.value = "太朗";
  email.value = "ex111@example.com";
  password.value = "password";
  zipcode.value = "1112222";
  address.value = "東京都";
  telephone.value = "00011112222";
};
</script>

<template>
  <h1 class="title">ユーザー登録</h1>
  <el-row :gutter="20">
    <el-col :span="4"></el-col>
    <el-col :span="20" class="center">
      <el-form label-width="120px" class="registerUser-area">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓">
              <el-input
                type="text"
                autocomplete="off"
                v-model="lastName"
              /> </el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="名">
              <el-input type="text" autocomplete="off" v-model="firstName" />
              <span class="error">
                {{ nameError }}
              </span>
            </el-form-item></el-col
          >
        </el-row>
        <el-form-item label="E-mail">
          <el-input type="email" v-model="email" />
          <span class="error">
            {{ emailError }}
          </span>
        </el-form-item>
        <el-form-item label="パスワード">
          <el-input type="password" v-model="password" />
          <span class="error">
            {{ passwordError }}
          </span>
        </el-form-item>
        <!-- <el-form-item label="確認用パスワード">
      <el-input />
    </el-form-item> -->
        <el-form-item label="郵便番号">
          <el-input type="text" v-model.number="zipcode" />
          <span class="error">
            {{ zipcodeError }}
          </span>
        </el-form-item>
        <el-form-item label="住所">
          <el-input type="text" v-model="address" />
          <span class="error">
            {{ addressError }}
          </span>
        </el-form-item>
        <el-form-item label="電話番号">
          <el-input type="text" v-model="telephone" />
          <span class="error">
            {{ telephoneError }}
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" v-on:click="registerUser"
            >Sign Up</el-button
          >
          <el-button v-on:click="resetButton" plain type="danger">Reset</el-button>
          <el-button v-on:click="test"
            >テスト(メールアドレスは変更してください。)</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.registerUser-area {
  width: 70%;
}
.error {
  color: red;
}
.center {
  margin: 20px auto;
}
.title {
  text-align: center;
  margin-top: 10vh;
}
</style>
