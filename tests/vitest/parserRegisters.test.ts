import { Exception } from "~";

function myParse(exception: Exception): Exception {
    exception.test = 123;

    return exception;
}

function myParse2(exception: Exception): Exception {
    exception.test = Number(exception.test) + 123;

    return exception;
}

describe("Teste $parsers Code", () => {
    test("Test one parse", async () => {
        Exception.$parsers.add(myParse);

        const exception = Exception.parse("example")!;

        expect(exception).toHaveProperty("test");
        expect(exception.test).toBe(123);
    });

    test("Test parse removed", async () => {
        Exception.$parsers.delete(myParse);
        const exception = Exception.parse("example")!;

        expect(exception).not.toHaveProperty("test");
    });

    test("Test one parse", async () => {
        Exception.$parsers.add(myParse);
        Exception.$parsers.add(myParse2);

        const exception = Exception.parse("example")!;

        expect(exception).toHaveProperty("test");
        expect(exception.test).toBe(246);
    });
});
