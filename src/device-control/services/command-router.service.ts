import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "./client-registry.service";

@Injectable()
export class CommandRouterService {
    constructor(
        private readonly registry: ClientRegistryService,
    ) {}

    send(deviceId: string, payload: unknown) {
        console.log('send', deviceId);
        const client = this.registry.get(deviceId);

        if (!client) {
            console.log('no client', deviceId);
            return;
        }

        client.socket.send(JSON.stringify(payload));
    }
}