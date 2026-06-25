import {Injectable} from "@nestjs/common";
import {CommandRouterService} from "../services/command-router.service";
@Injectable()
export class PowerDivisionManagementHandler {
    constructor(
        private readonly commandRouterService: CommandRouterService,
    ) {}

    handleSwitchOnSocketOne( data: any) {
        console.log('handleSwitchOnSocketOne', data);
        this.commandRouterService.send(data.deviceId, {type:data.type})
    }
}