const data = require("../src/data");

for (const d of data) {
  describe(d.item, () => {
    test("estimated_customs is a string", () => {
      expect(typeof d.estimated_customs).toBe("string");
    });
    test("emoji is a string or null", () => {
      //   expect(typeof d.emoji).toBe("string");
      //   expect(d.emoji).toBeNull();
      expect(typeof d.emoji == "string" || d.emoji == null).toBeTruthy();
    });

    test("emoji has a name", () => {
      expect(typeof d.item).toBe("string");
    });
  });
}
