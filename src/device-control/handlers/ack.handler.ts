import {Injectable} from "@nestjs/common";
import {CommandRouterService} from "../services/command-router.service";

@Injectable()
export class AckHandler {
    constructor(
        private readonly commandService: CommandRouterService,
    ) {}

    handle(data: any) {
        this.commandService.send('frontend-admin', {
            type: 'device_ack',
            deviceId: data.clientId,
            command: data.command,
            status: data.status,
            message: data.message,
        });
    }
}