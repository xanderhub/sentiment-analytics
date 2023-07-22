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

        if(!interaction) {
            throw new Error("Interaction doesn't exist");
        }

        return {};
    }
}
