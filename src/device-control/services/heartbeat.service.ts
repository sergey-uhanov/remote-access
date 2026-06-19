import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {ClientRegistryService} from "./client-registry.service";
import {CommandRouterService} from "./command-router.service";

@Injectable()
export class HeartbeatService implements OnModuleInit, OnModuleDestroy {
    private interval: NodeJS.Timeout;

    constructor(
        private readonly registry: ClientRegistryService,
        private readonly commandRouter: CommandRouterService,
    ) {}

    onModuleInit() {
        this.interval = setInterval(() => {
            this.checkClients();
        }, 10000);
    }

    private checkClients() {
        const now = Date.now();

        for (const [id, client] of this.registry.getAll()) {
            if (now - client.lastSeen > 11000) {

                this.commandRouter.send(
                    'frontend-admin',
                    { type: 'esp32 is offline' },
                );

                client.socket.terminate();

                this.registry.removeById(id);
            }
        }
    }

    onModuleDestroy() {
        clearInterval(this.interval);
    }
}