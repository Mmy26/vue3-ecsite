<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { Food, DArrowRight } from "@element-plus/icons-vue";

const router = useRouter();
const registerUser = () => {
  router.push("/registerUser");
};
const moveToItemList = () => {
  router.push("/itemList");
};
</script>

<template>
  <div class="top-wrapper">
    <div class="container">
      <h1>Hello, Ramen World!</h1>
      <p>全国各地の美味しいラーメンをあなたにお届け！</p>
      <p>
        ラクラクヌードルは自宅にラーメンやまぜそばがデリバリーで届くラーメンECサイトです。
      </p>
      <div class="btn-wrapper">
        <el-button type="success" @click="registerUser" class="register"
          ><el-icon size="15px" class="icon1"><food /></el-icon
          >会員登録をする</el-button
        >
      </div>
    </div>
  </div>

  <div class="top-item-wrapper">
    <div class="container">
      <div class="heading">
        <h2>ラクラクヌードル、４つの特徴！</h2>
      </div>
      <div class="top-items">
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/7.jpg" />
            <p>豊富なメニュー</p>
          </div>
          <p class="text-contents">
            誰もが知っている有名チェーン店のラーメンはもちろん、ここでしか味わえないレアなお店のメニューも揃えています。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/17.jpg" />
            <p>原点にして頂点</p>
          </div>
          <p class="text-contents">
            名古屋発祥の名物、台湾まぜそばもご用意しています。まだ食べたことがないそこのアナタ、ぜひこの機会にお試しください。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/14.jpg" />
            <p>変わり種もあります</p>
          </div>
          <p class="text-contents">
            普段食べる機会が少ないつけ麺のような変わり種もご用意していますので、お気軽にご注文いただけます。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_topping/topping06.jpg" />
            <p>トッピングも豊富</p>
          </div>
          <p class="text-contents">
            好きなラーメンやまぜそばにお好みのトッピングを何種類もつけることができます。あなただけのオリジナルラーメンが作れてしまうかも。
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="message-wrapper">
    <div class="container">
      <div class="heading">
        <h2>さぁ、今すぐラーメンの世界へ！</h2>
        <h3>Let's go the Ramen World!</h3>
      </div>
      <el-button type="success" @click="moveToItemList" class="list"
        >商品一覧を見る<el-icon class="icon2"><d-arrow-right /></el-icon
      ></el-button>
    </div>
  </div>
</template>

<style scoped>
/* ========================================
    top-wrapperの設定
    ======================================== */
.top-wrapper {
  padding: 180px 0 100px 0; /* 上はヘッダが来るのでその分180px分空ける */
  background-image: url(../img_noodle/background-img.png); /*背景画像設定 */
  background-size: cover;
  color: white;
  text-align: center;
}
.top-wrapper h1 {
  opacity: 0.9;
  font-size: 45px;
  letter-spacing: 5px;
}
.top-wrapper p {
  opacity: 0.7;
  font-size: 20px;
}
.btn-wrapper {
  text-align: center;
  margin: 40px 0;
}
.btn-wrapper p {
  margin: 10px 0;
}
.register {
  width: 150px;
  height: 50px;
}
.icon1 {
  margin-right: 5px;
}
.fab {
  margin-right: 10px;
}
/* ========================================
      top-item-wrapperの設定
     ======================================== */
.top-item-wrapper {
  padding-top: 20px;
  padding-bottom: 40px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  background-image: url(../img_noodle/china.jpeg);
}
.top-items {
  display: flex;
}
.top-item {
  margin: 30px;
}
.top-item-icon {
  position: relative;
}
.top-item-icon p {
  position: absolute;
  top: 35%;
  width: 100%;
  color: white;
}
.top-item-icon img {
  border-radius: 30px; /* 画像を角丸にする */
  width: 200px;
  height: 200px;
  object-fit: cover;
}
/* ========================================
      message-wrapperの設定
     ======================================== */
.message-wrapper {
  padding-top: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 40px;
  text-align: center;
  background-image: url(../img_noodle/background-img.png);
}
.message {
  padding: 1px 40px;
  background-color: #5dca88;
  cursor: pointer;
  box-shadow: 1px 5px #1a7940; /* ボタンに影をつける 右1px 下5px */
}
/* メッセージクリック時の挙動の設定 */
.message:active {
  position: relative; /* messageクラスから位置を指定したいため(これがないとページの左上からの位置指定になりうまくボタンが動かない) */
  top: 5px; /* ボタンを本来の位置よりも5px分下にずらす(上を5px空ける) */
  left: 1px; /* ボタンを本来の位置よりも1px分右にずらす(左を1px空ける) */
  box-shadow: none; /* 影をなくす(これがないと影ごと右下に動く) */
}
h2 {
  filter: drop-shadow(2px 2px 0px white);
}
.icon2 {
  margin-left: 5px;
}
.list {
  width: 150px;
  height: 50px;
}
</style>
