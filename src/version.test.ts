import pkg from "../package.json";
import { npmVersion } from "./version";

describe("version", () => {
  describe("npmVersion", () => {
    it("matches package.json version", () => {
      expect(npmVersion).toBe(pkg.version);
    });
  });
});
