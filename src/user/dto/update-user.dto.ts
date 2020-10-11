import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    public email: string;

    @ApiProperty()
    @IsOptional()
    public username: string;
}
