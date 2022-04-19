export {};
import ItemList from "../../views/ItemList.vue";
import { mount } from "@vue/test-utils";
import ElementPlus from "element-plus";

describe.only("商品一覧画面のテスト", () => {
  test("Mサイズの金額", () => {
    // ElementPlusもコンポーネントなので以下のように書く
    const wrapper = mount(ItemList, {
      global: {
        plugins: [ElementPlus],
      },
    });
    const element = wrapper.find("#size");
    console.log("elementの値:", element);
    expect(element.text()).toBe("500");
  });
});
