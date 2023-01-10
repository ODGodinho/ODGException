import { Exception } from "./Exception";

export class UnknownException extends Exception {

    /**
     * Parse error to Exception
     *
     * @param {Error | Exception | unknown} exception Possible exception
     * @param {string} message Message Default Exception
     * @returns {Exception | UnknownException}
     * @memberof Exception
     */
    public static parseOrDefault(exception: unknown, message: string): Exception | UnknownException {
        return this.parse(exception) ?? new this(message, exception);
    }

}
