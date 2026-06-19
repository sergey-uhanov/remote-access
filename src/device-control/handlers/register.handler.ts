import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "../services/client-registry.service";
import {WebSocket} from "ws";
@Injectable()
export class RegisterHandler {
    constructor(
        private readonly registry: ClientRegistryService,
    ) {}

    handle(ws: WebSocket, data: any) {
        console.log('register device:',data.clientId)
        this.registry.add({
            id: data.clientId,
            type: data.clientType,
            socket: ws,
            lastSeen: Date.now(),
        });
    }
}