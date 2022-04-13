<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"
import { ElLoading } from "element-plus";

const fullscreenLoading = ref(false);
const openFullScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'ログアウト中...   ',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
};

const router = useRouter();

onMounted(() => {
  openFullScreen();
  router.push("/login")
})
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading"></div>
</template>
