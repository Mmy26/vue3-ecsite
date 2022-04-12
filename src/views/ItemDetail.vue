<script setup lang="ts">
import { ref } from "vue";
</script>
<template>
  <form action="">
    <div>
      <span>M</span>
      <input type="radio" value="M" name="size" />
      <span>L</span>
      <input type="radio" value="L" name="size" />
    </div>
    <div>
      <span>Topping</span>
      <input type="checkbox" value="1" />
    </div>
    <div>
      <span>Quantity</span>
      <select name="" id="">
        <option value="" disabled>選択して下さい</option>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <div><button type="button">Order</button></div>
    </div>
  </form>
</template>
<style scoped></style>
