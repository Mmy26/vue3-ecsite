import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { reactive } from "vue";

type state = {
  order: Order;
};

export const useOrderStore = () => {
  // state
  const globalState = reactive(
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
      []
    )
  );

  // actions
  /**
   * 注文者情報を更新する.
   */
  const updateOrder= ()=>{

  }
};
