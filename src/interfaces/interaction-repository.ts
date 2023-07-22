import {Interaction} from "../types/interaction";

export interface InteractionRepository {
    create(interaction: Interaction): Promise<string>;
    get(interactionId: string): Promise<Interaction>;
}
