import { UnknownException } from "~";

describe("Test Default Exception", () => {
    test("Test UnknownException", async () => {
        const message = "test default";
        await expect((async (): Promise<never> => {
            throw UnknownException.parseOrDefault(undefined, message);
        })()).rejects.toThrowError(new UnknownException(message));
    });

    test("Test Error", async () => {
        const message = "ok";
        await expect((async (): Promise<never> => {
            throw UnknownException.parseOrDefault(new Error(message), "anything");
        })()).rejects.toThrowError(new UnknownException(message));
    });
});
