import {SentimentAnalytics} from "../src/sentiment-analytics";
import {Interaction} from "../src/types/interaction";
import {InteractionGateway} from "../src/interfaces/interaction-gateway";
import {Sentiment} from "../src/types/sentiment";
import {InteractionGatewayFake} from "./fakes/interaction-gateway-fake";
import {VoiceSegment} from "../src/types/segments/voice-segment";
import {TextSegment} from "../src/types/segments/text-segment";

describe("sentiment analytics tests", () => {

    let sentimentAnalytics: SentimentAnalytics;
    let interactionGateway: InteractionGateway;

    beforeEach(() => {
        interactionGateway = new InteractionGatewayFake()
        sentimentAnalytics = new SentimentAnalytics(interactionGateway);
    });

    it("should throw error when interaction doesn't exist", async function () {
        await expect(sentimentAnalytics.analyze("NON_EXISTING_INTERACTION")).rejects.toThrow(Error);
    });

    it("should return empty result when interaction has no segments", async function () {
        const interaction: Interaction = new Interaction();
        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({});
    });

    it("should return sentiment with zero in all confidence scores for single empty text segment", async function () {
        const interaction: Interaction = new Interaction([new TextSegment()]);
        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0, negative: 0, neutral: 0} as Sentiment);
    });

    it("should return sentiment with expected confidence scores for single text segment", async function () {
        const interaction: Interaction = new Interaction([
                new TextSegment(["Positive", "Positive", "Neutral", "Negative"])
            ]);

        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0.5, negative: 0.25, neutral: 0.25} as Sentiment);
    });

    it("should return sentiment with expected confidence scores for multiple text segments", async function () {
        const interaction: Interaction = new Interaction([
                new TextSegment(["Positive", "Positive", "Neutral", "Negative"]),
                new TextSegment(["Positive", "Positive", "Positive", "Positive", "Negative", "Negative"])
            ]);

        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0.6, negative: 0.3, neutral: 0.1} as Sentiment);
    });

    it("should return sentiment with expected confidence scores for single voice segment", async function () {
        const interaction: Interaction = new Interaction([
            new VoiceSegment([78, 100, 65, 22])
        ]);

        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0.5, negative: 0.25, neutral: 0.25} as Sentiment);
    });

    it("should return sentiment with expected confidence scores for multiple voice and text segments", async function () {
        const interaction: Interaction = new Interaction([
            new VoiceSegment([78, 100, 65, 22]),
            new TextSegment(["Positive", "Positive", "Positive", "Positive", "Negative", "Negative"]),
            new TextSegment(),
            new VoiceSegment()
        ]);

        const interactionId: string = await interactionGateway.create(interaction);

        const sentimentOfInteraction: Sentiment = await sentimentAnalytics.analyze(interactionId);

        expect(sentimentOfInteraction).toEqual({positive: 0.6, negative: 0.3, neutral: 0.1} as Sentiment);
    });

})
