import { User } from "@/types/User";
import { reactive, toRefs, type InjectionKey } from "vue";

//userのstateの型
type UserState = {
  currentUser: User;
};
/**
 * ユーザー関係のStorを表すメソッド.
 * @returns ユーザーのstore
 */
export const useUserProvider = () => {
  //state
  const userState = reactive<UserState>({
    currentUser: new User(0, "", "", "", "", "", ""),
  });

  //actions

  return { ...toRefs(userState) };
};

//キーを作るためのuseUserProviderの型
type useUserStateType = ReturnType<typeof useUserProvider>;
//provide / injectの際に用いるキー
export const useUserProviderKey: InjectionKey<useUserStateType> =
  Symbol("user");
