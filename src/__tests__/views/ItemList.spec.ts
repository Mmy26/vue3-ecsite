export {};
import ItemList from "../../views/ItemList.vue";
import { mount } from "@vue/test-utils";
import ElementPlus from "element-plus";

describe.only("商品一覧画面のテスト", () => {
  test("inputタグのテスト", async () => {
    // ElementPlusもコンポーネントなので以下のように書く
    const wrapper = mount(ItemList, {
      global: {
        plugins: [ElementPlus],
      },
    });
    const input = wrapper.find("input");
    await input.setValue("ラーメン");
    expect(input.element.value).toBe("ラーメン");
  });

  test("クリックイベントのテスト", async () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [ElementPlus],
      },
    });
    await wrapper.get("button").trigger("click");
    const elenment = wrapper.find("#item.name");
    expect(elenment.text()).toBe("ラーメン");
  });
});
