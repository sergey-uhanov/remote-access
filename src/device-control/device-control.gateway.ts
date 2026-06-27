import {Injectable, OnModuleInit} from '@nestjs/common';
import {WebSocket, WebSocketServer} from 'ws';
import {ClientRegistryService} from "./services/client-registry.service";

interface ClientInfo {
    id: string;
    type: 'device' | 'frontend';
    socket: WebSocket;
    lastSeen: number;
}

@Injectable()
export class DeviceControlGateway implements OnModuleInit {
    constructor(private readonly clients: ClientRegistryService) {}

    private wss: WebSocketServer;
    private heartbeatInterval: NodeJS.Timeout;

    onModuleInit() {
        this.wss = new WebSocketServer({
            port: 8082,
        });


        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const data = JSON.parse(message.toString());

                if (data.type === 'ack') {
                    this.sendCommand('frontend-admin', {
                        type: 'device_ack',
                        deviceId: data.clientId,
                        command: data.command,
                        status: data.status,
                    });

                    return;
                }

                if (data.type === 'register') {
                    this.clients.add({
                        id: data.clientId,
                        type: data.clientType,
                        socket: ws,
                        lastSeen: Date.now(),
                    });
                    if (data.clientId === 'esp-32') this.sendCommand('frontend-admin', {type: 'esp32 is online'})
                    if (data.clientId === 'frontend-admin') {
                        const esp32 = this.clients.get('esp-32');
                        if (esp32) {
                            this.sendCommand('frontend-admin', {type: 'esp32 is online'})
                        } else {
                            this.sendCommand('frontend-admin', {type: 'esp32 is offline'})
                        }

                    }


                    return;
                }
                if (data.type === 'heartbeat') {
                    const client = this.clients.get(data.clientId);
                    if (client) {
                        client.lastSeen = Date.now();
                    }

                    return;
                }
                this.sendCommand(data.deviceId, {type: data.type});

            });

            ws.on('close', () => {

              this.clients.remove(ws)
            });
        });
        this.startHeartbeatChecker();
    }

    private startHeartbeatChecker() {
        this.heartbeatInterval = setInterval(() => {
            const now = Date.now();

            for (const [id, client] of this.clients.getAll().entries()) {
                const diff = now - client.lastSeen;
                if (diff > 11000 && client.id === 'esp-32') {

                    this.sendCommand('frontend-admin', {type: 'esp32 is offline'})
                    client.socket.terminate();
                    this.clients.removeById(id);
                }
            }
        }, 10000);
    }

    sendCommand(deviceId: string, command: unknown) {
        const client = this.clients.get(deviceId);

        if (!client) {
            return;
        }

        client.socket.send(JSON.stringify(command));
    }

    onMessage(callback: (data: unknown) => void) {
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: Buffer) => {
                try {
                    callback(JSON.parse(message.toString()));
                } catch {
                    console.log('Invalid ESP32 JSON');
                }
            });
        });
    }

    onModuleDestroy() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
    }
}