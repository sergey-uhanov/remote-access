import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "../services/client-registry.service";

@Injectable()
export class HeartbeatHandler {
    constructor(
        private readonly registry: ClientRegistryService,
    ) {}

    handle(data: any) {
        const client = this.registry.get(data.clientId);

        if (client) {
            client.lastSeen = Date.now();
        }
    }
}