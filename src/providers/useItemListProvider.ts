import type { Item } from "@/types/Item";
import axios from "axios";
import { reactive, toRefs, type InjectionKey } from "vue";

type State = {
  itemList: Array<Item>;
};

export const useItemList = () => {
  //state
  const globalState = reactive<State>({
    itemList: [],
  });

  //actions
  const setItemList = async (): Promise<void> => {
    const response = await axios.get<Array<Item>>("urlを入れる");
  };
  return { ...toRefs(globalState), setItemList };
};

type storeType = ReturnType<typeof useItemList>;
export const itemListKey: InjectionKey<storeType> = Symbol("itemList");
