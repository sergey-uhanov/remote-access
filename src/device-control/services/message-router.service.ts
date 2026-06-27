import {Injectable} from "@nestjs/common";
import {AckHandler} from "../handlers/ack.handler";
import {HeartbeatHandler} from "../handlers/heartbeat.handler";
import {RegisterHandler} from "../handlers/register.handler";
import {WebSocket} from "ws";
import {SensorsDataHandler} from "../handlers/sensors-data.handler";
import {PowerDivisionManagementHandler} from "../handlers/powerDivisionManagement.handler";

@Injectable()
export class MessageRouterService {
    constructor(private readonly handleAck: AckHandler,
                private readonly handleHeartbeat: HeartbeatHandler,
                private readonly handleRegister: RegisterHandler,
                private readonly sensorsDataHandler: SensorsDataHandler,
                private readonly powerDivisionManagementHandler: PowerDivisionManagementHandler,) {
    }

    handleMessage(ws: WebSocket, data: any) {
        switch (data.type) {
            case 'register':
                return this.handleRegister.handle(ws, data);

            case 'CHECK_WATERLINE':
                return this.sensorsDataHandler.handleCheckWaterline(data);

            case 'FILTER_ON':
                return this.powerDivisionManagementHandler.handleSwitchOnSocketOne(data);

            case 'heartbeat':
                return this.handleHeartbeat.handle(data);

            case 'ack':
                return this.handleAck.handle(data);
        }
    }


}