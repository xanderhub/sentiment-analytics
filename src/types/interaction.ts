import {Segment} from "./segment";

export class Interaction {
    private readonly _size: number;
    private readonly _segments: Array<Segment<unknown>> | undefined;

    constructor(segments?: Array<Segment<unknown>>) {
        this._segments = segments;
        this._size = segments ? segments.reduce((size, segment) => size + segment.size, 0) : 0
    }

    get size(): number {
        return this._size;
    }

    get segments(): Array<Segment<unknown>> | undefined {
        return this._segments;
    }
}
