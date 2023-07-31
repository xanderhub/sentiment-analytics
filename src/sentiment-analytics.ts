import {Sentiment} from "./types/sentiment";
import {Interaction} from "./types/interaction";
import {InteractionGateway} from "./interfaces/interaction-gateway";

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

        const tokenFrequencyMap: Record<string, number> = {};

        interaction.segments[0].tokens.forEach(token => tokenFrequencyMap[token] = (tokenFrequencyMap[token] || 0) + 1);

        const segmentSize: number = interaction.segments[0].tokens.length;

        const positive: number = tokenFrequencyMap["Positive"] / segmentSize || 0;
        const neutral: number = tokenFrequencyMap["Neutral"] / segmentSize || 0;
        const negative: number = tokenFrequencyMap["Negative"] / segmentSize || 0;

        return {positive: positive, negative: negative, neutral: neutral};
    }
}
