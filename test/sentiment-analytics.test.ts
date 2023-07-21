import {SentimentAnalytics} from "../src/sentiment-analytics";

describe("sentiment analytics tests", () => {

    let sentimentAnalytics: SentimentAnalytics;

    beforeEach(() => {
        sentimentAnalytics = new SentimentAnalytics();
    });

    it("should throw error when interaction doesn't exist", function () {
        expect(() => sentimentAnalytics.analyze("NON_EXISTING_INTERACTION")).toThrow(Error);
    });
})
