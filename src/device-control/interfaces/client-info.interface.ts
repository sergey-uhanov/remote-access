import {WebSocket} from "ws";

export interface ClientInfo {
    id: string;
    type: 'device' | 'frontend';
    socket: WebSocket;
    lastSeen: number;
}