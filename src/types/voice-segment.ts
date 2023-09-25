import {Segment} from "./segment";

export class VoiceSegment extends Segment {
    constructor(tokens: number[]) {
        super(tokens.map(token => token > 75 ? "Positive" : token > 50 ? "Neutral" : "Negative"));
    }
}
