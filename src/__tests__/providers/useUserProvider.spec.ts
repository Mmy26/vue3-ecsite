export {};
<<<<<<< HEAD
=======
import { User } from "../../types/User";
import {
  useUserProvider,
  useUserProviderKey,
} from "../../providers/useUserProvider";
import { inject, provide } from "vue";

const MockedProvide = jest.fn(provide);
const MockedInject = jest.fn(inject);

describe("providers/useUserProvider.ts", () => {
  describe("setCurrentUserメソッドのテスト", () => {
    beforeEach(() => {
      MockedProvide(useUserProviderKey, useUserProvider());
      MockedInject(useUserProviderKey, "", true);
    });

    test("引数のユーザーがstateのcurrentUserにセットされる", () => {
      const expected = new User(1, "鈴木", "", "", "", "", "");

      useUserProvider().setCurrentUser(new User(1, "鈴木", "", "", "", "", ""));

      expect(useUserProvider().currentUser.value).toEqual(expected);
    });
  });
});
>>>>>>> develop
