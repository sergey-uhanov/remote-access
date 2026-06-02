import { Injectable } from '@nestjs/common';
import { CreateDeviceControlDto } from './dto/create-device-control.dto';
import { UpdateDeviceControlDto } from './dto/update-device-control.dto';

@Injectable()
export class DeviceControlService {
  create(createDeviceControlDto: CreateDeviceControlDto) {
    return 'This action adds a new deviceControl';
  }

  findAll() {
    return `This action returns all deviceControl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceControl`;
  }

  update(id: number, updateDeviceControlDto: UpdateDeviceControlDto) {
    return `This action updates a #${id} deviceControl`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceControl`;
  }
}
