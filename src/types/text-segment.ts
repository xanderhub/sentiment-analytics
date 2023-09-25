import {Segment} from "./segment";

export class TextSegment extends Segment<string> {
    constructor(tokens: string[] = []) {
        super(tokens);
    }

    getTokensAsString(): string[] {
        return this.tokens;
    }
}
