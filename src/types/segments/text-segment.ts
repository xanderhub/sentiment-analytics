import {Segment} from "./segment";

export class TextSegment extends Segment<string> {

    getTokensAsString(): string[] {
        return this.tokens;
    }
}
