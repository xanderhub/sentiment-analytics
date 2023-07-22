import {SentimentAnalytics} from "../src/sentiment-analytics";
import {Interaction} from "../src/types/interaction";
import {InteractionRepository} from "../src/interfaces/interaction-repository";
import {Sentiment} from "../src/types/sentiment";
import {InteractionRepositoryFake} from "./fakes/interaction-repository-fake";

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

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({});
    });

    it("should return sentiment with zero in all confidence scores for single empty text segment", async function () {
        const interaction: Interaction = {segments: [{tokens: []}]};
        const interactionId: string = await interactionRepository.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0, negative: 0, neutral: 0} as Sentiment);
    });

    it("should do", async function () {
        const interaction: Interaction = {segments: [{tokens: ["Positive", "Positive", "Negative", "Neutral"]}]};
        const interactionId: string = await interactionRepository.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0.5, negative: 0.25, neutral: 0.25} as Sentiment);
    });
})
