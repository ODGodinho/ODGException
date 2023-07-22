import { Exception } from "..";

export class UnknownException extends Exception {

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

}
