import { PartialType } from '@nestjs/swagger';
import { CreateShiftmanagerDto } from './create-shiftmanager.dto';

export class UpdateShiftmanagerDto extends PartialType(CreateShiftmanagerDto) {}
