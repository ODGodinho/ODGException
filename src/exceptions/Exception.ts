export class Exception extends Error {

    public readonly preview?: Error | Exception;

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: number | string,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.preview = Exception.convertToError(preview);
        Error.apply(this, [ message ]);
    }

    public static convertToError(exception: unknown): Error | Exception | undefined {
        if (!exception) return undefined;

        if (exception instanceof Exception || exception instanceof Error) {
            return exception;
        }

        return new Exception(String(exception));
    }

}
