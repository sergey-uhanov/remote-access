import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceControlDto } from './create-device-control.dto';

export class UpdateDeviceControlDto extends PartialType(CreateDeviceControlDto) {
  id: number;
}
