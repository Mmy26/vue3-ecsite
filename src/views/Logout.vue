<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { useUserProviderKey } from "@/providers/useUserProvider";
import axios from "axios";
import { User } from "@/types/User";

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

//userProviderに関するオブジェクト
const userStore = inject(useUserProviderKey);

if (!userStore) {
  throw new Error("");
}
userStore.setCurrentUser(new User(0, "", "", "", "", "", ""));
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="text-color"></div>
</template>
