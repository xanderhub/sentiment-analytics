export class Segment {
    private readonly _tokens: Array<string>;
    private readonly _size: number;

    constructor(tokens: Array<string> = []) {
        this._tokens = tokens;
        this._size = tokens.length;
    }
    get tokens(): Array<string> {
        return this._tokens;
    }

    get size(): number {
        return this._size;
    }
}
