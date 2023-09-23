export abstract class Segment<T> {
    private readonly _tokens: Array<T>;
    private readonly _size: number;

    protected constructor(tokens: Array<T> = []) {
        this._tokens = tokens;
        this._size = tokens.length;
    }

    get tokens(): Array<T> {
        return this._tokens;
    }

    get size(): number {
        return this._size;
    }

    public abstract getTokensAsString(): Array<string>;
}

