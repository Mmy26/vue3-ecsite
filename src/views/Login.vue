<script setup lang="ts">
import { inject, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { RouterLink } from "vue-router";
import { useUserProviderKey } from "../providers/useUserProvider";
import { User } from "../types/User";
import { CartListKey } from "../providers/useCartProvider";

//email
const email = ref("");
//emailのエラー文
const emailError = ref("");
//パスワード
const password = ref("");
//パスワードエラー文
const passwordError = ref("");
//ルーティング関係のオブジェクト
const router = useRouter();
//userProviderに関するオブジェクト
const userStore = inject(useUserProviderKey);
// userCartProviderに関するオブジェクト
const cartStore = inject(CartListKey);

// if (!userStore) {
//   throw new Error("");
// }

// if (!cartStore) {
//   throw new Error("");
// }

/**
 * ログインをするメソッド.
 */
const loginUser = async (): Promise<void> => {
  /////////////バリデーションの記述///////////////
  /**
    // エラーチェック
    let hasError = false;
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
     */
  //////////////////バリデーション終了//////////////////////
  try {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: email.value,
        password: password.value,
      }
    );
    if (response.data.status === "success") {
      ElNotification({
        title: "Success",
        message: "ログイン成功！",
        type: "success",
      });
      userStore?.setCurrentUser(
        new User(
          response.data.responseMap.user.id,
          response.data.responseMap.user.name,
          response.data.responseMap.user.email,
          response.data.responseMap.user.password,
          response.data.responseMap.user.zipcode,
          response.data.responseMap.user.address,
          response.data.responseMap.user.telephone
        )
      );
      if (cartStore?.userOrderInfo.value.orderItemList.length !== 0) {
        router.push("/orderConfirm");
        return;
      }
      router.push("/itemList");
    } else {
      ElNotification({
        title: "Error",
        message: "ログインに失敗しました。。。",
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <h1 class="title" id="title">ログイン</h1>
  <el-row :gutter="20">
    <el-col :span="24" class="center">
      <el-form label-width="120px" class="loginUser-area">
        <el-form-item label="E-mail">
          <el-input type="email" id="email" v-model="email" />
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
        <el-form-item>
          <el-button type="danger" v-on:click="loginUser">Sign In</el-button
          >&nbsp;&nbsp;
          <RouterLink to="/registerUser" class="link"
            ><el-link type="danger">ユーザー登録に戻る</el-link></RouterLink
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.loginUser-area {
  width: 70%;
}
.error {
  color: red;
}
.link {
  text-decoration: none;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  text-align: center;
  margin-top: 10vh;
}
</style>
