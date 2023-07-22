import {SentimentAnalytics} from "../src/sentiment-analytics";
import {Interaction} from "../src/types/interaction";
import {InteractionRepository} from "../src/interfaces/interaction-repository";
import {Sentiment} from "../src/types/sentiment";
import {InteractionRepositoryFake} from "./interaction-repository-fake";

describe("sentiment analytics tests", () => {

    let sentimentAnalytics: SentimentAnalytics;
    let interactionRepository: InteractionRepository;

    beforeEach(() => {
        interactionRepository = new InteractionRepositoryFake()
        sentimentAnalytics = new SentimentAnalytics(interactionRepository);
    });

    it("should throw error when interaction doesn't exist", async function () {
        await expect(sentimentAnalytics.analyze("NON_EXISTING_INTERACTION")).rejects.toThrow(Error);
    });

    it("should return empty result when interaction has no segments", async function () {
        const interaction: Interaction = {};

        const interactionId: string = await interactionRepository.create(interaction);

        const sentimentOfInteraction: Partial<Sentiment> = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({});
    });
})
