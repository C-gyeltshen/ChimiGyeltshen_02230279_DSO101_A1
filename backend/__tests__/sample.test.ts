import test from "node:test";

test('basic test', () => {
  expect(1 + 1).toBe(2);
});

function expect(arg0: number) {
    throw new Error("Function not implemented.");
}
  