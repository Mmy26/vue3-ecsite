import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import type { OrderItem } from "@/types/OrderItem";
import { reactive, ref, toRefs, type InjectionKey } from "vue";
import type { type } from "os";
//stateの型を定義
type OrderStateType = {
  userOrderInfo: Order;
};
//state
export const useOrderProvider = () => {
  const orderState = reactive<OrderStateType>({
    userOrderInfo: new Order(
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
      Array<OrderItem>()
    ),
  });

  /**
   * カートに商品を入れる
   */
  //選択されたトッピング
  const selectToppingList = ref([]);
  // 選択された商品のサイズ
  const selectItemSize = ref<string>("M");
  // 選択された商品のオーダー数量
  const selectQuantity = ref<number>(1);
  // 選択された商品
  const selectItem = ref(
    new Item(0, "", "", "", 0, 0, "", false, new Array<Topping>())
  );

  const orderItem = () => {
    const orderItemList = ref(orderState.userOrderInfo.orderItemList);
    //最後に選択した商品を取得
    const latestOrderItem = orderItemList.value[orderItemList.value.length - 1];
    let newOrderItemId = ref(0);
    //もし選択した商品がある場合、その商品のidに1プラスしてidを採番する
    if (latestOrderItem !== undefined) {
      newOrderItemId.value = latestOrderItem.id + 1;
    }
    console.dir(JSON.stringify(latestOrderItem));

    // const orderItem = new OrderItem(
    //     newOrderItemId.value,
    //     selectItem.value.id,
    //     1,
    //     selectQuantity.value,
    //     selectItemSize.value,
    //     new Item(
    //         selectItem.value.id,
    //         selectItem.value.type,
    //         selectItem.value.name,
    //         selectItem.value.description,
    //         selectItem.value.priceM,
    //         selectItem.value.priceL,
    //         selectItem.value.imagePath,
    //         selectItem.value.deleted,
    //         selectItem.value.toppingList
    //     ),//トッピングのidとトッピングの商品名を紐づける
    //     selectToppingList(selectToppingList.value)

    // )
  };

  const putInCart = () => {
    let orderItem = orderState.userOrderInfo.orderItemList.length;
    let orderItemList = ref<OrderItem[]>([]);
  };

  return { ...toRefs(orderState) };
};
type UserOrderProviderType = ReturnType<typeof useOrderProvider>;
export const userOrderKey: InjectionKey<UserOrderProviderType> =
  Symbol("order");

console.log("");
