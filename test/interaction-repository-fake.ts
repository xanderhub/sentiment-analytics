import {InteractionRepository} from "../src/interfaces/interaction-repository";
import {Interaction} from "../src/types/interaction";

export class InteractionRepositoryFake implements InteractionRepository {
    create(interaction: Interaction): Promise<string> {
        return Promise.resolve("");
    }

    get(interactionId: string): Promise<Interaction | undefined> {
        if(interactionId === "NON_EXISTING_INTERACTION") {
            return Promise.resolve(undefined);
        }

        return Promise.resolve({});
    }
}
