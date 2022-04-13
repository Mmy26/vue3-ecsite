import { Item } from "@/types/Item";
import axios from "axios";
import { reactive, toRefs, type InjectionKey } from "vue";

type State = {
  itemList: Array<Item>;
  searchItemName: string;
  totalItemCount: number;
};

export const useItemList = () => {
  //state
  const globalState = reactive<State>({
    itemList: [],
    searchItemName: "",
    totalItemCount: 0,
  });

  //actions
  const setItemList = async (): Promise<void> => {
    const response = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/item/items/noodle"
    );
    for (const item of response.data.items) {
      globalState.itemList.push(
        new Item(
          item.id,
          item.type,
          item.name,
          item.description,
          item.priceM,
          item.priceL,
          item.imagePath,
          item.deleted,
          item.toppingList
        )
      );
    }
  };
  const searchItemList = (searchItemName: string) => {
    return globalState.itemList.filter(
      (item) =>
        item.name.includes(searchItemName.toUpperCase()) ||
        item.name.includes(searchItemName)
    );
  };
  const sortByName = () => {
    globalState.itemList.sort((before, after) => {
      return before.name.localeCompare(after.name, "ja");
    });
  };
  const sortByDescPrice = () => {
    globalState.itemList.sort((before, after) => {
      //ある順序の基準において a が b より小
      if (after.priceM > before.priceM) {
        return -1;
      }
      //その順序の基準において a が b より大
      if (after.priceM < before.priceL) {
        return 1;
      }
      // a と b が等しい場合
      return 0;
    });
  };
  const sortByAscPrice = () => {
    globalState.itemList.sort((before, after) => {
      //ある順序の基準において a が b より小
      if (after.priceM < before.priceM) {
        return -1;
      }
      //その順序の基準において a が b より大
      if (after.priceM > before.priceL) {
        return 1;
      }
      // a と b が等しい場合
      return 0;
    });
  };

  return {
    ...toRefs(globalState),
    setItemList,
    searchItemList,
    sortByName,
    sortByDescPrice,
    sortByAscPrice,
  };
};

type storeType = ReturnType<typeof useItemList>;
export const itemListKey: InjectionKey<storeType> = Symbol("itemList");
