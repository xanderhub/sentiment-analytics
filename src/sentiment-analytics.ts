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

        return {positive: 0, negative: 0, neutral: 0};
    }
}
