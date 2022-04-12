import type { Item } from "@/types/Item";
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
    const response = await axios.get<Array<Item>>("urlを入れる");
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
