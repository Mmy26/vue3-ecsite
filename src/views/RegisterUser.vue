<script setup lang="ts">
import { ref } from "vue";

const lastName = ref("");
const firstName = ref("");
const email = ref("");
const password = ref("");
const zipcode = ref("");
const telephone = ref("");

const registerUser = async ():Promise<void> => {
  
}

</script>

<template>
  <el-form label-width="120px" class="registerUser-area">
    <el-form-item label="姓">
      <el-input type="text" autocomplete="off" v-model="lastName" />
    </el-form-item>
    <el-form-item label="名">
      <el-input type="text" autocomplete="off" v-model="firstName" />
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input type="email" v-model="email" />
    </el-form-item>
    <el-form-item label="パスワード">
      <el-input type="password" v-model="password" />
    </el-form-item>
    <!-- <el-form-item label="確認用パスワード">
      <el-input />
    </el-form-item> -->
    <el-form-item label="郵便番号">
      <el-input type="text" v-model.number="zipcode" />
    </el-form-item>
    <el-form-item label="住所">
      <el-input type="text" />
    </el-form-item>
    <el-form-item label="電話番号">
      <el-input type="text" v-model="telephone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">Submit</el-button>
      <el-button>Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.registerUser-area {
  width: 70%;
}
</style>
