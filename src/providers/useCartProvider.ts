import { User } from "@/types/User";
import { Item } from "@/types/Item";
import type { Topping } from "@/types/Topping";
import { OrderTopping } from "@/types/OrderTopping";
import { OrderItem } from "@/types/OrderItem";
import { reactive, ref, toRefs, type InjectionKey } from "vue";
import { Order } from "@/types/Order";
import { Coupon } from "@/types/Coupon";

//stateの型を定義
type OrderStateType = {
  userOrderInfo: Order;
  coupon: Coupon;
  useCoupon: boolean;
};
//payloadの型を定義
type AddCartPayloadType = {
  selectItemSize: string;
  selectOrderToppingList: number[];
  selectQuantity: number;
  selectItem: Item;
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
    coupon: new Coupon(0, "", 0),
    // クーポンを使用するかのflag
    useCoupon: false,
  });
  /**
   *カートに商品を追加する.
   * @param - 追加する商品の情報
   */
  const addOrderItem = (payload: AddCartPayloadType) => {
    const orderItemList = ref(orderState.userOrderInfo.orderItemList);
    //最後に選択した商品を取得
    const latestOrderItem = orderItemList.value[orderItemList.value.length - 1];
    let newOrderItemId = ref(0);
    //もし選択した商品がある場合、その商品のidに1プラスしてidを採番する
    if (latestOrderItem !== undefined) {
      newOrderItemId.value = latestOrderItem.id + 1;
    }

    const payloadItem = ref(
      new OrderItem(
        newOrderItemId.value,
        payload.selectItem.id,
        1,
        payload.selectQuantity,
        payload.selectItemSize,
        new Item(
          payload.selectItem.id,
          payload.selectItem.type,
          payload.selectItem.name,
          payload.selectItem.description,
          payload.selectItem.priceM,
          payload.selectItem.priceL,
          payload.selectItem.imagePath,
          payload.selectItem.deleted,
          payload.selectItem.toppingList as Array<Topping>
        ),
        checkedToppingList(
          payload.selectOrderToppingList,
          payload.selectItem,
          newOrderItemId.value
        )
      )
    );
    console.log("addItem", payloadItem.value);

    orderState.userOrderInfo.orderItemList.push(payloadItem.value);
  };
  /**
   * トッピングのidとトッピングの商品名を紐づける.
   * @param selectToppingIdList
   * @returns 選択したトッピング
   */
  const checkedToppingList = (
    selectToppingIdList: Array<number>,
    selectItem: Item,
    orderItemId: number
  ): Array<OrderTopping> => {
    const selectOrderToppingList = new Array<OrderTopping>();
    let i = 0;
    for (let toppingId of selectToppingIdList) {
      const topping = ref(
        selectItem.toppingList.find((topping) => {
          return topping.id === toppingId;
        })
      );
      //トッピングを選択していない場合
      if (!topping) {
        const orderedTopping = new OrderTopping(++i, toppingId, 0, topping);
        selectOrderToppingList.push(orderedTopping);
        console.log("for文の中", orderedTopping);
        //トッピングを選択した場合
      } else {
        const orderedTopping = new OrderTopping(
          ++i,
          toppingId,
          orderItemId,
          topping.value as Topping
        );
        selectOrderToppingList.push(orderedTopping);
      }
    }
    console.log("checkedToppingList", selectOrderToppingList);

    return selectOrderToppingList;
  };
  /**
   * 商品を削除する.
   */
  const deleteItem = (index: number) => {
    orderState.userOrderInfo.orderItemList.splice(index, 1);
  };
  return {
    ...toRefs(orderState),
    checkedToppingList,
    addOrderItem,
    deleteItem,
  };
};
type UserOrderProviderType = ReturnType<typeof useOrderProvider>;
export const CartListKey: InjectionKey<UserOrderProviderType> = Symbol("order");

console.log("");
