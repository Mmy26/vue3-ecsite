<template>
  <div class="row">
    <table class="striped">
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
              <li>---</li>
              <li>---</li>
              <li>---</li>
            </ul>
          </td>
          <td><div class="text-center">---円</div></td>
          <td>
            <button class="btn" type="button">
              <span>削除</span>
            </button>
          </td>
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
          <td>
            <button class="btn" type="button">
              <span>削除</span>
            </button>
          </td>
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
          <td>
            <button class="btn" type="button">
              <span>削除</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row cart-total-price">
    <div>消費税：8,000円</div>
    <div>ご注文金額合計：38,000円 (税込)</div>
  </div>
  <div class="row order-confirm-btn">
    <button
      class="btn"
      type="button"
      onclick="location.href='order_confirm.html'"
    >
      <span>注文に進む</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Order } from "@/types/Order";
import type { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { reactive } from "vue";

const OrderInfo = reactive(
  new Order(
    0,
    0,
    0,
    0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    new Date(),
    0,
    new User(0, "", "", "", "", "", ""),
    new Array<OrderItem>()
  )
);
</script>

<style scoped></style>
