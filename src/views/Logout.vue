<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import axios from "axios";

const fullscreenLoading = ref(false);
const openFullScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "ログアウト中...   ",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 1500);
};

const router = useRouter();

onMounted(async (): Promise<void> => {
  await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
  openFullScreen();
  router.push("/login");
});
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"></div>
</template>
