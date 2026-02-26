import { Exception } from "~";

describe("Teste Parse", () => {
    test("Test Parse Object Functions", async () => {
        const message = "test default";

        const exception = Exception.parse({
            message,
            test() {
                return "ok";
            },
        });

        expect(exception).toHaveProperty("test");
        expect(exception.test()).toBe("ok");
    });
});
