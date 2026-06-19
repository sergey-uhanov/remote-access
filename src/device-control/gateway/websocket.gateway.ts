import {WebSocketServer} from "ws";
import {Injectable, OnModuleInit} from "@nestjs/common";
import {MessageRouterService} from "../services/message-router.service";
import {ClientRegistryService} from "../services/client-registry.service";

@Injectable()
export class DeviceControlGateway implements OnModuleInit {
    private wss: WebSocketServer;

    constructor(
        private readonly router: MessageRouterService,
        private readonly clientRegistryService: ClientRegistryService,
    ) {
    }

    onModuleInit() {
        this.wss = new WebSocketServer({port: 8082});

        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const data = JSON.parse(message.toString());

                this.router.handleMessage(ws, data);
            });

            ws.on('close', () => {
                console.log('close connection ')
                this.clientRegistryService.remove(ws);
            });
        });
    }
}
