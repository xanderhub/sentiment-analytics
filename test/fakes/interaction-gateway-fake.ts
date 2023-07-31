import {InteractionGateway} from "../../src/interfaces/interaction-gateway";
import {Interaction} from "../../src/types/interaction";
import {v4 as uuidv4} from 'uuid';

export class InteractionGatewayFake implements InteractionGateway {

    private readonly storage: Record<string, Interaction> = {};

    public async create(interaction: Interaction): Promise<string> {
        const interactionId: string = uuidv4();
        this.storage[interactionId] = interaction;
        return interactionId;
    }

    public async get(interactionId: string): Promise<Interaction> {
        return this.storage[interactionId];
    }
}
