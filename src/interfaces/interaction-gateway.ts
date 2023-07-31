import {Interaction} from "../types/interaction";

export interface InteractionGateway {
    create(interaction: Interaction): Promise<string>;
    get(interactionId: string): Promise<Interaction>;
}
