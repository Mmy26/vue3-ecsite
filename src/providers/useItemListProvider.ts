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
  /**
   * 商品一覧情報をWebAPIから取得.
   */
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
  /**
   * 商品名で部分一致検索をする.
   * @param searchItemName
   * @returns 部分一致検索で検索された商品一覧情報
   */
  const searchItemList = (searchItemName: string) => {
    return globalState.itemList.filter(
      (item) =>
        item.name.includes(searchItemName.toUpperCase()) ||
        item.name.includes(searchItemName)
    );
  };
  /**
   * おすすめ順に商品の並び替えをする.
   * @returns おすすめ順に並び替えた商品一覧
   */
  const sortByRecommendation = () => {
    const recommendationItemId = [
      70, 77, 67, 69, 74, 78, 71, 66, 76, 72, 68, 65, 75, 73, 64, 62, 61, 63,
    ];
    let recommendationItemList = Array<Item>();
    for (let id of recommendationItemId) {
      let item = globalState.itemList.find((item) => item.id === id);
      if (item !== undefined) {
        //「as 型」で強制的に型を指定する
        recommendationItemList.push(item as Item);
      }
    }
    return recommendationItemList;
  };
  /**
   * 五十音順に商品の並び替えをする.
   */
  const sortByName = () => {
    globalState.itemList.sort((before, after) => {
      return before.name.localeCompare(after.name, "ja");
    });
  };
  /**
   * 価格の低い順に商品の並び替えをする.
   */
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
  /**
   * 価格の高い順に商品の並び替えをする.
   */
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
  /**
   * 商品一覧をカテゴリー別に表示する
   * @param itemIdList
   * @returns idで絞り込んだ商品一覧
   */
  const getItemListSortByCategory = (itemIdList: Array<number>) => {
    const ItemListSortByCategory = new Array<Item>();
    for (const id of itemIdList) {
      ItemListSortByCategory.push(
        globalState.itemList.filter((item) => item.id === id)[0] as Item
      );
    }
    return ItemListSortByCategory;
  };

  return {
    ...toRefs(globalState),
    setItemList,
    searchItemList,
    sortByRecommendation,
    sortByName,
    sortByDescPrice,
    sortByAscPrice,
    getItemListSortByCategory,
  };
};

type storeType = ReturnType<typeof useItemList>;
export const itemListKey: InjectionKey<storeType> = Symbol("itemList");
