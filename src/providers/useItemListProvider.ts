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
  const searchItemList = () => {
    return (name: string) => {
      return globalState.itemList.filter(
        (item) =>
          item.name.includes(name.toUpperCase()) || item.name.includes(name)
      );
    };
  };

  return { ...toRefs(globalState), setItemList, searchItemList };
};

type storeType = ReturnType<typeof useItemList>;
export const itemListKey: InjectionKey<storeType> = Symbol("itemList");
