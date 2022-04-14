import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { reactive, toRefs, type InjectionKey } from "vue";

type state = {
  order: Order;
};

export const useOrderStore = () => {
  // state
  const globalState = reactive<state>({
    order: new Order(
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
      []
    ),
  });

  // actions
  return { ...toRefs(globalState) };
};
// キーを作るためのuseOrderStoreの型
type orderStateType = ReturnType<typeof useOrderStore>;
// キーの生成
export const orderProviderKey: InjectionKey<orderStateType> = Symbol("order");
