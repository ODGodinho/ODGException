import { UnknownException } from "..";

export class Exception extends Error {

    [Error: string]: unknown;

    public readonly preview?: Exception;

    /**
     * Content original exception
     *
     * @type {unknown}
     * @memberof Exception
     */
    public original?: unknown;

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: number | string,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.preview = Exception.parse(preview);
        Error.apply(this, [ message ]);
    }

    /**
     * Parse error to Exception
     *
     * @param {Error | Exception | unknown} exception Possible exception
     * @returns {Exception | undefined}
     * @memberof Exception
     */
    public static parse(exception?: unknown): Exception | undefined {
        if (!exception) return undefined;

        if (exception instanceof Exception) return exception;

        let newException: Exception;
        if (typeof exception === "object") newException = this.parseObject(exception as Record<string, unknown>);

        newException ||= new UnknownException(Exception.messageToString(exception));
        newException.original = exception;

        return newException;
    }

    /**
     * If Possible exception has prop with code return it
     *
     * @memberof Exception
     * @param {Exception | Error | unknown} exception Possible Exception
     * @returns {number | string | undefined}
     */
    private static getIfHasCode(exception: unknown): number | string | undefined {
        if (!exception || typeof exception !== "object") return undefined;

        if ("code" in exception) {
            return typeof exception.code === "string" || typeof exception.code === "number"
                ? exception.code
                : undefined;
        }

        return undefined;
    }

    /**
     * Convert error message to string
     *
     * @memberof Exception
     * @param {unknown} message Message of exception
     * @returns {string}
     */
    private static messageToString(message: unknown): string {
        if (typeof message === "string") return message;

        return JSON.stringify(message);
    }

    private static parseObject(exception: Record<string, unknown>): Exception {
        const newException = new UnknownException("");
        newException.original = exception;

        for (const key in exception) {
            if (Object.prototype.hasOwnProperty.call(exception, key)) {
                newException[key] = exception[key];
            }
        }

        newException.message = "message" in exception
            ? Exception.messageToString(exception.message)
            : Exception.messageToString(exception);
        newException.code = this.getIfHasCode(exception);
        newException.stack = "stack" in exception ? Exception.messageToString(exception.stack) : undefined;
        newException.original = exception;

        return newException;
    }

}
