import {Sentiment} from "./types/sentiment";
import {Interaction} from "./types/interaction";
import {InteractionRepository} from "./interfaces/interaction-repository";

export class SentimentAnalytics {

    private interactionRepository: InteractionRepository

    constructor(interactionRepository: InteractionRepository) {
        this.interactionRepository = interactionRepository;
    }

    public async analyze(interactionId: string): Promise<Sentiment> {
        const interaction: Interaction = await this.interactionRepository.get(interactionId);

        if (!interaction) {
            throw new Error("Interaction doesn't exist");
        }

        if (!interaction.segments) {
            return {};
        }

        let frequencyMap: Record<string, number> = {};
        let interactionSize: number = 0;

        interaction.segments.forEach(segment =>
            segment.tokens.forEach(token => {
                frequencyMap[token] = (frequencyMap[token] || 0) + 1;
                interactionSize++;
            }));

        return {
            positive: (frequencyMap["Positive"] / interactionSize) || 0,
            negative: (frequencyMap["Negative"] / interactionSize) || 0,
            neutral: (frequencyMap["Neutral"] / interactionSize) || 0
        };
    }
}
