import {Segment} from "./segment";

export class VoiceSegment extends Segment<number> {
    constructor(tokens: number[] = []) {
        super(tokens);
    }

    getTokensAsString(): string[] {
        return this.tokens.map(token => token > 75 ? "Positive" : token > 50 ? "Neutral" : "Negative");
    }
}
