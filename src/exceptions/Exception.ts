import { UnknownException } from "..";

type ParseObjectType = Record<number | string | symbol, unknown>;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-magic-numbers
type EmptyType = "" | 0 | false | null | undefined | void;

export type ParserException = (newException: Exception, original: unknown) => Exception;

export class Exception extends Error {

    [Error: string]: unknown;

    public static readonly $parsers = new Set<ParserException>();

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
        this.preview = UnknownException.parse(preview);
        Error.apply(this, [ message ]);
    }

    public static parse<T extends ParseObjectType>(exception?: T): (Exception & T);

    public static parse<T extends EmptyType>(exception?: T | undefined): undefined;

    public static parse<T>(exception?: T | undefined): Exception | undefined;

    /**
     * Parse error to Exception
     *
     * @template {any} T Type of exception
     * @param {T | undefined} exception Possible exception
     * @returns {Exception | (Exception & T) | undefined}
     */
    public static parse<T>(exception?: T): Exception | (Exception & T) | undefined {
        if (!exception) return;

        if (exception instanceof Exception) return exception;

        let newException: Exception | Exception & T | undefined;
        if (typeof exception === "object") newException = this.parseObject(
            exception as Record<string, unknown>,
        );

        newException ||= new this(Exception.messageToString(exception));
        newException.original = exception;

        for (const callback of this.$parsers) {
            newException = callback(newException, exception);
        }

        return newException;
    }

    /**
     * Parse error to Exception
     *
     * @memberof Exception
     * @param {unknown} exception Possible exception
     * @param {string} message Message Default Exception
     * @returns {Exception | UnknownException}
     */
    public static parseOrDefault(exception: unknown, message: string): Exception | UnknownException {
        return this.parse(exception) ?? new this(message, exception);
    }

    /**
     * If Possible exception has prop with code return it
     *
     * @memberof Exception
     * @param {unknown} exception Possible Exception
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

    private static parseObject<T extends Record<string, unknown>>(exception: T): Exception & T {
        const newException = new UnknownException("");

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

        return newException as Exception & T;
    }

}
