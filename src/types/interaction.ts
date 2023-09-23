import {Segment} from "./segment";

export class Interaction {
    private readonly _size: number;
    private readonly _segments: Array<Segment> | undefined;

    constructor(segments?: Array<Segment>) {
        this._segments = segments;
        this._size = segments ? segments.reduce((size, segment) => size + segment.size, 0) : 0
    }

    get size(): number {
        return this._size;
    }

    get segments(): Array<Segment> | undefined {
        return this._segments;
    }
}
