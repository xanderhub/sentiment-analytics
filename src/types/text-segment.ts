import {Segment} from "./segment";

export class TextSegment extends Segment<string> {
    constructor(tokens: Array<string> = []) {
        super(tokens);
    }

    getTokensAsString(): Array<string> {
        return this.tokens;
    }
}
