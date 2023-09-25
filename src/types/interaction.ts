import {Segment} from "./segment";

export class Interaction {
    private readonly _size: number;
    private readonly _segments?: Segment<unknown>[];

    constructor(segments?: Segment<unknown>[]) {
        this._segments = segments;
        this._size = segments ? segments.reduce((totalSize, segment) => totalSize + segment.size, 0) : 0;
    }

    get size(): number {
        return this._size;
    }

    get segments(): Segment<unknown>[] | undefined {
        return this._segments;
    }
}
