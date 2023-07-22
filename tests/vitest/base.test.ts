import { Exception, UnknownException } from "~";

describe("Exception Tests", () => {
    test("Instance exception Teste", () => {
        const message1 = "anything";
        const exception = new Exception(message1);

        expect(exception.message).toEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeUndefined();
    });

    test("Teste Exception base Error", () => {
        const message1 = "message1";
        const base1 = "base1";
        const previewException = new Error(base1);
        const exception = new Exception(message1, previewException);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(UnknownException);
        expect(exception.preview?.message).toStrictEqual(base1);
        expect(exception.preview?.stack).toStrictEqual(previewException.stack);
    });

    test("Teste Exception base string", () => {
        const message1 = "message1";
        const base1 = "base1";
        const exception = new Exception(message1, base1);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(UnknownException);
        expect(exception.preview?.message).toStrictEqual(base1);
    });

    test("Teste Exception base with code", () => {
        const message1 = "message1";
        const preview = {
            code: 123,
        };
        const exception = new Exception(message1, preview);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(UnknownException);
        expect(exception.preview?.message).toStrictEqual("{\"code\":123}");
        expect(exception.preview?.code).toStrictEqual(123);
    });

    test("Teste Exception base with invalid code", () => {
        const message1 = "message1";
        const messagePreview = "messagePreview";
        const preview = {
            message: messagePreview,
            code: Symbol(123),
            extraProp: "extraProp",
        };
        const exception = new Exception(message1, preview);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(UnknownException);
        expect(exception.preview?.message).toStrictEqual(messagePreview);
        expect(exception.preview?.code).toBeUndefined();
        expect(exception.preview?.extraProp).toStrictEqual("extraProp");
        expect(exception.preview?.original).toStrictEqual(preview);
    });

    test("Teste Exception preview is Exception", () => {
        const message1 = "message1";
        const messagePreview = "messagePreview";
        const previewException = new Exception(messagePreview);
        const exception = new Exception(message1, previewException);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview).toBeInstanceOf(Exception);
        expect(exception.preview).not.toBeInstanceOf(UnknownException);
        expect(exception.preview === previewException).toBeTruthy();
        expect(exception.preview?.message).toStrictEqual(messagePreview);
        expect(exception.preview?.code).toBeUndefined();
        expect(exception.preview?.original).toBeUndefined();
    });

    test("Test getIfHasCode Not Has Code", () => {
        expect(Exception["getIfHasCode"]("")).toBe(undefined);
        expect(Exception["getIfHasCode"](void 0)).toBe(undefined);
        expect(Exception["getIfHasCode"]("123")).toBe(undefined);
        expect(Exception["getIfHasCode"]([])).toBe(undefined);
    });

    test("Teste UnknownException", () => {
        const message1 = "message2";
        const base1 = "base2";
        const exception = new UnknownException(message1, base1);

        expect(exception).toBeInstanceOf(UnknownException);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.preview?.original).toStrictEqual(base1);
    });
});
