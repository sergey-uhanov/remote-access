import { Module } from '@nestjs/common';
import { DeviceControlService } from './device-control.service';
import { DeviceControlGateway } from './device-control.gateway';


@Module({
  providers: [DeviceControlGateway, DeviceControlService],
  exports: [DeviceControlGateway],
})
export class DeviceControlModule {}
