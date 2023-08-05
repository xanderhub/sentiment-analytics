export class Segment {
    private readonly _tokens: string[];
    private readonly _size: number;

    constructor(tokens: string[]) {
        this._tokens = tokens;
        this._size = tokens.length;
    }
    get tokens(): string[] {
        return this._tokens;
    }

    get size(): number {
        return this._size;
    }
}
