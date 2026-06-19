import {Injectable} from "@nestjs/common";
import {AckHandler} from "../handlers/ack.handler";
import {HeartbeatHandler} from "../handlers/heartbeat.handler";
import {RegisterHandler} from "../handlers/register.handler";
import {WebSocket} from "ws";

@Injectable()
export class MessageRouterService {
    constructor(private readonly handleAck: AckHandler,
                private readonly handleHeartbeat: HeartbeatHandler,
                private readonly handleRegister: RegisterHandler,) {
    }

    handleMessage(ws: WebSocket, data: any) {
        switch (data.type) {
            case 'register':
                return this.handleRegister.handle(ws, data);

            case 'heartbeat':
                return this.handleHeartbeat.handle(data);

            case 'ack':
                return this.handleAck.handle(data);
        }
    }


}