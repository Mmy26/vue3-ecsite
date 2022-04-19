export {};
import { User } from "../../types/User";
import { useUserProvider } from "../../providers/useUserProvider";

describe("providers/useUserProvider.ts", () => {
  describe("setCurrentUserメソッドのテスト", () => {
    test("setCurrentUserが呼ばれているかどうかを確かめる", () => {});

    test("引数のユーザーがstateのcurrentUserにセットされる", () => {
      const expected = new User(1, "鈴木", "", "", "", "", "");
      const aaa = useUserProvider().setCurrentUser(
        new User(1, "鈴木", "", "", "", "", "")
      );
      expect(aaa).toEqual(expected);
    });
  });
});
