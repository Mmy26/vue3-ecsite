<script setup lang="ts">

</script>

<template>
  <el-form
    ref="ruleFormRef"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Password" prop="pass">
      <el-input type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input />
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
        >Submit</el-button
      >
      <el-button>Reset</el-button>
    </el-form-item>
  </el-form>
</template>
