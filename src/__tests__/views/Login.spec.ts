export {};
import { mount, shallowMount } from "@vue/test-utils";
import Login from "../../views/Login.vue";

import ElementPlus from "element-plus";

const wrapper = shallowMount(Login, {
  global: {
    plugins: [ElementPlus],
  },
});

describe.only("views/Login.vue", () => {
  test("正常系: 入力された値がvalueと紐づいている。", async () => {
    const input = wrapper.find("input");
    await input.setValue("my@mail.com");
    
    expect(input.element.value).toBe("my@mail.com");
  });
});
