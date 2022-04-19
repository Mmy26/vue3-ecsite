import { useUserProvider } from "../../providers/useUserProvider";
import { User } from "../../types/User";

export {};
describe("providers/useUserProvider.ts", () => {
  describe("setCurrentUserのテスト", () => {
    test("引数のUserがstateのcurrentUserにセットされる", () => {
      const expected = new User(0, "", "", "", "", "", "");
    });
    useUserProvider().setCurrentUser(new User(0, "", "", "", "", "", ""));
    expect(useUserProvider().currentUser).toEqual(expect);
  });
});
