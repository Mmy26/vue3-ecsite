<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const registerUser = () => {
  router.push("/registerUser");
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
          ><el-icon><food /></el-icon>会員登録をする</el-button
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
            <img src="/img_noodle/1.jpg" />
            <p>ハワイアン料理</p>
          </div>
          <p class="text-contents">
            アロハテーブルやウルフギャング、田中オブ東京などのハワイの有名店で修行を積んだ一流シェフによる本格的なハワイアン料理が家にいてもお手軽に楽しむことができます。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/2.jpg" />
            <p>スイーツも充実</p>
          </div>
          <p class="text-contents">
            アイランドビンテージコーヒーやボガーツカフェのアサイボウルはもちろんのこと、最近流行りのバナンのソフトクリーム、エッグスンシングスのふわふわパンケーキなど有名店のスイーツも充実しています。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/14.jpg" />
            <p>アルコールも豊富</p>
          </div>
          <p class="text-contents">
            ハワイといえばビーチでマイタイ！コナブリューイングのハワイアンコナビールなどハワイでしか飲めないアルコールも豊富にあります。
          </p>
        </div>
        <div class="top-item">
          <div class="top-item-icon">
            <img src="/img_noodle/13.jpg" />
            <p>ホテル創作料理</p>
          </div>
          <p class="text-contents">
            シェラトンワイキキ、ロイヤルハワイアン、モアナサーフライダー、アウラニに入っているレストランの創作料理も「ラクラクアロハ」なら気軽に注文できます。
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="message-wrapper">
    <div class="container">
      <div class="heading">
        <h2>さぁ、今すぐALOHAの旅に出よう！</h2>
        <h3>Let's go on an Aloha trip!</h3>
      </div>
      <RouterLink to="/itemList" class="btn message">商品一覧を見る</RouterLink>
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
  background-size: cover; /*画像の縦横比を崩すことなく、画像ができるだけ大きくなるよう拡大縮小*/
  color: white;
  text-align: center;
}
.top-wrapper h1 {
  opacity: 0.9; /* 文字の透明度を指定 */
  font-size: 45px;
  letter-spacing: 5px; /* 文字の間隔を設定 */
}
.top-wrapper p {
  opacity: 0.7; /* 文字の透明度を指定 */
  font-size: 20px;
}
.btn-wrapper {
  text-align: center; /* ボタン群の配置を真ん中揃えにする */
  margin: 40px 0;
}
.btn-wrapper p {
  margin: 10px 0;
}
.register {
  width: 150px;
  height: 50px;
}
.fab {
  margin-right: 10px;
}
/* ========================================
      top-item-wrapperの設定
     ======================================== */
.top-item-wrapper {
  padding-bottom: 80px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #f7f7f7;
  text-align: center;
  background-image: url(../img_aloha/stripe3.jpg); /*背景画像設定 */
}

.top-items {
  display: flex;
}
.top-item {
  margin: 30px;
}
.top-item-icon {
  position: relative; /* p要素を重ねるための指定(absoluteと組み合わせて使う) */
}
.top-item-icon p {
  position: absolute; /* item-iconからpを位置指定するための指定 */
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
  border-bottom: 1px solid #eee;
  padding-bottom: 80px;
  text-align: center;
  background-image: url(../img_noodle/background-img.png);
}
.message {
  padding: 1px 40px;
  background-color: #5dca88;
  cursor: pointer; /* a要素のようにマウスの乗せるとa要素のようにポインタが変わる */
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
</style>
