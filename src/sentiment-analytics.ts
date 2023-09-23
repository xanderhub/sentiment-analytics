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

        const tokenFrequencyMap: Record<string, number> = this.calculateTokenFrequency(interaction.segments);

        return {
            positive: tokenFrequencyMap["Positive"] / interaction.size || 0,
            neutral: tokenFrequencyMap["Neutral"] / interaction.size || 0,
            negative: tokenFrequencyMap["Negative"] / interaction.size || 0
        };
    }

    private calculateTokenFrequency(segments: Array<Segment>): Record<string, number> {
        return segments.flatMap(segment => segment.tokens)
            .reduce((freqMap: Record<string, number>, token: string) => {
                freqMap[token] = (freqMap[token] || 0) + 1;
                return freqMap;
            }, {});
    }
}
