export abstract class Segment<T> {
    private readonly _tokens: T[];
    private readonly _size: number;

    protected constructor(tokens: T[] = []) {
        this._tokens = tokens;
        this._size = tokens.length;
    }

    get tokens(): T[] {
        return this._tokens;
    }

    get size(): number {
        return this._size;
    }

    public abstract getTokensAsString(): string[];
}


