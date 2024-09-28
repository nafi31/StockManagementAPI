import { IsString, isNotEmpty } from "class-validator";
export class CreateClientDto {

    @IsString()
    @IsString()
    clientName: string;
}
