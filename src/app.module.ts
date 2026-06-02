import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceControlModule } from './device-control/device-control.module';




@Module({
  imports: [DeviceControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
