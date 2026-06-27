import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "../services/client-registry.service";
import {WebSocket} from "ws";
import {CommandRouterService} from "../services/command-router.service";
import {DEVISE_ID} from "../../common/constants/app.constants";

@Injectable()
export class RegisterHandler {
    constructor(
        private readonly registry: ClientRegistryService,
        private readonly commandRouterService: CommandRouterService,
    ) {
    }

    handle(ws: WebSocket, data: any) {

        this.registry.add({
            id: data.clientId,
            type: data.clientType,
            socket: ws,
            lastSeen: Date.now(),
        });
        switch (data.clientId) {
            case 'esp-32' :
                this.commandRouterService.send('frontend-admin', {type: 'esp32 is online'})
                break
            case 'frontend-admin' :
                this.registry.get(DEVISE_ID) ? this.commandRouterService.send('frontend-admin', {type: 'esp32 is online'}) : null
                break
        }
    }
}