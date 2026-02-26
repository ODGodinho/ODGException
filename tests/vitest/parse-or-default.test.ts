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
        // eslint-disable-next-line no-restricted-syntax
        const baseError = new Error(message);
        const newError = new UnknownException(message);

        // eslint-disable-next-line no-restricted-syntax
        newError.original = new Error(message);

        await expect((async (): Promise<never> => {
            throw UnknownException.parseOrDefault(baseError, "anything");
        })()).rejects.toThrowError(newError);
    });
});
