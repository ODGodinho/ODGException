import { Exception, UnknownException } from "../../src/index";

describe("Exception Tests", () => {
    test("Instance exception Teste", () => {
        const message1 = "anything";
        const exception = new Exception(message1);

        expect(exception.message).toEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
    });

    test("Teste Exception base Error", () => {
        const message1 = "message1";
        const base1 = "base1";
        const exception = new Exception(message1, new Error(base1));

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(Error);
        expect(exception.preview?.message).toStrictEqual(base1);
    });

    test("Teste Exception base string", () => {
        const message1 = "message1";
        const base1 = "base1";
        const exception = new Exception(message1, base1);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(Exception);
        expect(exception.preview?.message).toStrictEqual(base1);
    });

    test("Teste UnknownException", () => {
        const message1 = "message2";
        const base1 = "base2";
        const exception = new UnknownException(message1, base1);

        expect(exception).toBeInstanceOf(UnknownException);
        expect(exception).toBeInstanceOf(Exception);
    });
});
