import * as userModel from "./userModel"
// @ponicode
describe("userModel.default.get", () => {
    test("0", async () => {
        await userModel.default.get("a1969970175")
    })

    test("1", async () => {
        await userModel.default.get(12)
    })

    test("2", async () => {
        await userModel.default.get(56784)
    })

    test("3", async () => {
        await userModel.default.get(12345)
    })

    test("4", async () => {
        await userModel.default.get("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("5", async () => {
        await userModel.default.get(-Infinity)
    })
})
