import {InteractionRepository} from "../../src/interfaces/interaction-repository";
import {Interaction} from "../../src/types/interaction";
import {v4 as uuidv4} from 'uuid';

export class InteractionRepositoryFake implements InteractionRepository {

    private storage: Record<string, Interaction> = {};

    public async create(interaction: Interaction): Promise<string> {
        const interactionId: string = uuidv4();
        this.storage[interactionId] = interaction;
        return interactionId;
    }

    public async get(interactionId: string): Promise<Interaction> {
        return this.storage[interactionId];
    }
}
