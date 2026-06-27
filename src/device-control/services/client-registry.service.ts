import {Injectable} from "@nestjs/common";
import {ClientInfo} from "../interfaces/client-info.interface";
import {WebSocket} from "ws";

@Injectable()
export class ClientRegistryService {
    private clients = new Map<string, ClientInfo>();

    add(client: ClientInfo) {
        this.clients.set(client.id, client);
    }

    remove(ws: WebSocket) {
        for (const [id, client] of this.clients.entries()) {

            if (client.socket === ws) {
                this.clients.delete(id);
                break;
            }
        }
    }

    removeById(id: string) {
        this.clients.delete(id);
    }

    get(id: string) {
        return this.clients.get(id);
    }

    getAll() {
        return this.clients;
    }

    findBySocket(socket: WebSocket) {
        return [...this.clients.values()]
            .find(client => client.socket == socket);
    }
}