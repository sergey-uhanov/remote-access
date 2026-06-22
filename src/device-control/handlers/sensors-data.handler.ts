import {Injectable} from "@nestjs/common";
import {ClientRegistryService} from "../services/client-registry.service";
import {WebSocket} from "ws";
import {CommandRouterService} from "../services/command-router.service";
@Injectable()
export class SensorsDataHandler {
    constructor(
        private readonly commandRouterService: CommandRouterService,
    ) {}

    handleCheckWaterline( data: any) {
        console.log('handleCheckWaterline', data);
        this.commandRouterService.send(data.deviceId, {type:data.type})
    }
}