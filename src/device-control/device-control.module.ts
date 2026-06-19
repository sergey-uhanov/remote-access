import { Module } from '@nestjs/common';
import { DeviceControlGateway } from './gateway/websocket.gateway';
import { AckHandler } from './handlers/ack.handler';
import { HeartbeatHandler } from './handlers/heartbeat.handler';
import { RegisterHandler } from './handlers/register.handler';
import { ClientRegistryService } from './services/client-registry.service';
import { CommandRouterService } from './services/command-router.service';
import { HeartbeatService } from './services/heartbeat.service';
import { MessageRouterService } from './services/message-router.service';



@Module({
  providers: [
    DeviceControlGateway,
    ClientRegistryService,
    CommandRouterService,
    MessageRouterService,
    HeartbeatService,
    AckHandler,
    HeartbeatHandler,
    RegisterHandler,
  ],
  exports: [DeviceControlGateway],
})
export class DeviceControlModule {}
