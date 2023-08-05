import {Sentiment} from "./types/sentiment";
import {Interaction} from "./types/interaction";
import {InteractionGateway} from "./interfaces/interaction-gateway";
import {Segment} from "./types/segment";

export class SentimentAnalytics {

    private interactionGateway: InteractionGateway

    constructor(interactionGateway: InteractionGateway) {
        this.interactionGateway = interactionGateway;
    }

    public async analyze(interactionId: string): Promise<Sentiment> {
        const interaction: Interaction = await this.interactionGateway.get(interactionId);

        if (!interaction) {
            throw new Error("Interaction doesn't exist");
        }

        if (!interaction.segments) {
            return {};
        }

        const segment = interaction.segments[0];
        const tokenFrequencyMap: Record<string, number> = this.calculateTokenFrequency(segment);

        return {
            positive: tokenFrequencyMap["Positive"] / segment.size || 0,
            neutral: tokenFrequencyMap["Neutral"] / segment.size || 0,
            negative: tokenFrequencyMap["Negative"] / segment.size || 0
        };
    }

    private calculateTokenFrequency(segment: Segment) {
        return segment.tokens.reduce((freqMap: Record<string, number>, token: string) => {
            freqMap[token] = (freqMap[token] || 0) + 1;
            return freqMap;
        }, {})
    }
}
