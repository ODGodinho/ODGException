import {
    AbortException,
    Exception,
    InvalidArgumentException,
    UnknownException,
} from "~";

describe("Exception Tests", () => {
    test("Instance exception Teste", () => {
        const message1 = "anything";
        const exception = new Exception(message1);

        expect(exception.message).toEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeUndefined();
    });

    test("Teste Exception base Error", () => {
        const message1 = "message1";
        const base1 = "base1";
        // eslint-disable-next-line no-restricted-syntax
        const previousException = new Error(base1);
        const exception = new Exception(message1, previousException);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeInstanceOf(UnknownException);
        expect(exception.getPrevious()?.message).toStrictEqual(base1);
        expect(exception.getPrevious()?.stack).toStrictEqual(previousException.stack);
    });

    test("Teste Exception base string", () => {
        const message1 = "message1";
        const base1 = "base1";
        const exception = new Exception(message1, base1);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeInstanceOf(UnknownException);
        expect(exception.getPrevious()?.message).toStrictEqual(base1);
    });

    test("Teste Exception base with code", () => {
        const message1 = "message1";
        const previous = {
            code: 123,
        };
        const exception = new Exception(message1, previous);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeInstanceOf(UnknownException);
        expect(exception.getPrevious()?.message).toStrictEqual("{\"code\":123}");
        expect(exception.getPrevious()?.code).toStrictEqual(123);
    });

    test("Teste Exception base with invalid code", () => {
        const message1 = "message1";
        const messagePrevious = "messagePrevious";
        const previous = {
            message: messagePrevious,
            code: Symbol(123),
            extraProp: "extraProp",
        };
        const exception = new Exception(message1, previous);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeInstanceOf(UnknownException);
        expect(exception.getPrevious()?.message).toStrictEqual(messagePrevious);
        expect(exception.getPrevious()?.code).toBeUndefined();
        expect(exception.getPrevious()?.extraProp).toStrictEqual("extraProp");
        expect(exception.getPrevious()?.original).toStrictEqual(previous);
    });

    test("Teste Exception previous is Exception", () => {
        const message1 = "message1";
        const messagePrevious = "messagePrevious";
        const previousException = new Exception(messagePrevious);
        const exception = new Exception(message1, previousException);

        expect(exception.message).toStrictEqual(message1);
        expect(exception).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).toBeInstanceOf(Exception);
        expect(exception.getPrevious()).not.toBeInstanceOf(UnknownException);
        expect(exception.getPrevious() === previousException).toBeTruthy();
        expect(exception.getPrevious()?.message).toStrictEqual(messagePrevious);
        expect(exception.getPrevious()?.code).toBeUndefined();
        expect(exception.getPrevious()?.original).toBeUndefined();
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
        expect(exception.getPrevious()?.original).toStrictEqual(base1);
    });

    test("Teste AbortException", () => {
        try {
            AbortSignal.abort().throwIfAborted();
        } catch (error) {
            const exception = Exception.parse(error);

            expect(exception).toBeInstanceOf(AbortException);
            expect(exception).toBeInstanceOf(Exception);
            expect(exception?.original).toStrictEqual(error);
        }
    });

    test.each([
        Exception,
        UnknownException,
        AbortException,
        InvalidArgumentException,
    ])("Instance All", (MyException) => {
        expect(new MyException("test")).toBeInstanceOf(MyException);
    });
});
