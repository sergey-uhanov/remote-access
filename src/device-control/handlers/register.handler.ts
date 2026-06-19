import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "../services/client-registry.service";
import {WebSocket} from "ws";
import {CommandRouterService} from "../services/command-router.service";
@Injectable()
export class RegisterHandler {
    constructor(
        private readonly registry: ClientRegistryService,
        private readonly commandRouterService: CommandRouterService,
    ) {}

    handle(ws: WebSocket, data: any) {
        console.log('register device:',data.clientId)
        this.registry.add({
            id: data.clientId,
            type: data.clientType,
            socket: ws,
            lastSeen: Date.now(),
        });
        switch (data.type){
            case 'esp-32' : this.commandRouterService.send('frontend-admin', {type: 'esp32 is online'})
        }
    }
}