import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { User } from "@/types/User";
import { Item } from "@/types/Item";
import { reactive, toRefs, type InjectionKey } from "vue";
import { Topping } from "@/types/Topping";

type state = {
  order: Order;
};

export const useOrderStore = () => {
  // state
  const globalState = reactive<state>({
    order: new Order(
      1,
      1,
      1,
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
      [
        new OrderItem(
          1,
          1,
          1,
          3,
          "L",
          new Item(
            1,
            "noodle",
            "醤油ラーメン",
            "人気メニューです",
            500,
            650,
            "img_noodle/1.jpg",
            false,
            [
              new Topping(1, "noodle", "メンマ", 100, 200),
              new Topping(2, "noodle", "コーン", 80, 160),
            ]
          ),
          []
        ),
        new OrderItem(
          2,
          2,
          2,
          5,
          "L",
          new Item(
            2,
            "noodle",
            "味噌ラーメン",
            "人気メニューです",
            580,
            720,
            "img_noodle/2.jpg",
            false,
            [
              new Topping(3, "noodle", "キャベツ", 200, 400),
              new Topping(4, "noodle", "バター", 110, 220),
            ]
          ),
          []
        ),
      ]
    ),
  });

  // actions

  return { ...toRefs(globalState) };
};

// キーを作るためのuseOrderStoreの型
type orderStateType = ReturnType<typeof useOrderStore>;

// キーの生成
export const orderProviderKey: InjectionKey<orderStateType> = Symbol("order");
